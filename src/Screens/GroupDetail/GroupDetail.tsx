import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, useWindowDimensions, StyleSheet } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, setCurGroup, setCurTask, setGroupList, toggleRefetch } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { Tab, TabView } from '@rneui/themed';
import { LoadingProcess, SemiCircleProgress } from "@/Components";
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Dimensions } from "react-native";
import {
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { current } from "@reduxjs/toolkit";
import { Member, useAddMemberMutation, useDeleteMemberMutation, useGetGroupsMutation, User } from "@/Services/group";
import { Dropdown } from 'react-native-element-dropdown';
import { Task, useGetGroupTaskMutation } from "@/Services/task";
import Avatar from "@/Components/Avatar";

const MyIcon = Icon as unknown as React.ComponentType<any>;
const MyIonicons = Ionicons as unknown as React.ComponentType<any>;

const GroupGeneral = (props: {taskList: Task[]}) => {
  const curGroup = useSelector((state: any) => state.group.curGroup);
  const taskCount = props.taskList.length;
  const doneTaskCount = props.taskList.filter((task: any) => task.status === "DONE").length;
  const toDoTaskCount = props.taskList.filter((task: any) => task.status === "TODO").length;
  const inProgressTaskCount = props.taskList.filter((task: any) => task.status === "IN_PROGRESS").length;
  const lowTaskCount = props.taskList.filter((task: any) => task.priority === "LOW").length;
  const mediumTaskCount = props.taskList.filter((task: any) => task.priority === "MEDIUM").length;
  const highTaskCount = props.taskList.filter((task: any) => task.priority === "HIGH").length;


  const chartConfig = {
    backgroundGradientFrom: "#F8FBF6",
    backgroundGradientTo: "#F8FBF6",
    color: (opacity = 1) => `rgba(63, 98, 18, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false 
  };

  const screenWidth = Dimensions.get("window").width;

  const priorityData = {
    labels: ["Thấp", "Trung bình", "Cao"],
    datasets: [
      {
        data: [lowTaskCount, mediumTaskCount, highTaskCount],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
        strokeWidth: 2 
      }
    ],
  };

  const statusData = [
    {
      name: "Mới",
      population: toDoTaskCount,
      color: "gray",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Đang làm",
      population: inProgressTaskCount,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Xong",
      population: doneTaskCount,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  return (
    <ScrollView className="w-full h-full">
      <Text className="text-xl text-[#3F6212] font-semibold mb-3">Mô tả nhóm</Text>
      <Text className="text-xl mb-5">{curGroup.description}</Text>
      {/* <Text className="text-2xl text-[#3F6212] font-semibold mb-3">Tháng 10</Text> */}
      {/* <View className="mb-5">
        <Text className="text-xl text-[#3F6212] font-semibold">Nhiệm vụ đã hoàn thành</Text>
        <View className="w-full flex items-center p-7">
          <SemiCircleProgress
            percentage={parseFloat((doneTaskCount/taskCount*100).toFixed(1))}
            progressColor={"#3F6212"}
            interiorCircleColor= "#F8FBF6"
            progressWidth= {30}
          >
            <Text style={{ fontSize: 32, color: "black" }}>{parseFloat((doneTaskCount/taskCount*100).toFixed(1))}%</Text>
          </SemiCircleProgress>
        </View>
      </View> */}
      <View className="mb-5">
        <Text className="text-xl text-[#3F6212] font-semibold mb-3">Trạng thái nhiệm vụ</Text>
        <PieChart
          data={statusData}
          width={screenWidth}
          height={150}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          absolute
          paddingLeft="0"
        />
      </View>
      <View className="mb-8">
        <Text className="text-xl text-[#3F6212] font-semibold mb-3">Độ ưu tiên nhiệm vụ</Text>
        <BarChart
          data={priorityData}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          yAxisLabel=""
          yAxisSuffix=""
        />
      </View>
    </ScrollView>
  )
};

const GroupMember = () => {
  const curGroup = useSelector((state: any) => state.group.curGroup);
  const [isViewInfo, setIsViewInfo] = useState<boolean>(false);
  const [curMember, setCurMember] = useState<any>({
    "id": null ,
    "name": "",
    "email": "",
    "dateofbirth": "",
    "updatedAt": "",
    "role": ""
  });
  const [deleteMemberApi, {isLoading: deleteLoading}] = useDeleteMemberMutation();
  const [addMemberApi, {isLoading: addLoading}] = useAddMemberMutation();
  const [getGroups, {isLoading: getLoading}] = useGetGroupsMutation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  // const [refetch, setRefect] = useState<boolean>(false);
  const refetch = useSelector((state: any) => state.group.refetch);
  const [deleteMember, setDeleteMember] = useState<boolean>(false);
  const [addMember, setAddMember] = useState<boolean>(false);
  const userList = useSelector((state: any) => state.userList.userList).map((user: User) => {
    return {
      label: user.name,
      value: user.id
    };
  });
  const [selectedUsers, setSelectedUsers] = useState<{name: string, id: number}[]>([]);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);


  const getGroupList = async () => {
    const groupsResponse = await getGroups(
      accessToken
    ).unwrap();
    if (Array.isArray(groupsResponse)) {
      dispatch(
        setGroupList(groupsResponse)
      );
      dispatch(
        setCurGroup(groupsResponse.filter(group => group.id === curGroup.id)[0])
      );
    }
    else if (groupsResponse.message === "Group not found") {
      dispatch(
        setGroupList([])
      );
    } else {
      Toast.error("Lỗi")
    }
  }

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // Đánh dấu lần render đầu tiên đã hoàn thành
    } else {
      getGroupList();
    }
  }, [refetch])

  const handleDeleteMember = async () => {
    setDeleteMember(false);
    try {
      const res = await deleteMemberApi({
        token: accessToken,
        groupId: curGroup.id,
        userId: curMember.id
      }).unwrap();
      if (!res) {
        // setRefect(!refetch);
        dispatch(toggleRefetch());
        Toast.success("Xóa thành công");
      } 
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          String(errorData.data.message),
          "top"
        );
      }
    }
  }

  const handleAddMember = async () => {
    setAddMember(false);
    try {
      const res = await addMemberApi({
        data: {
          list_user_members: selectedUsers.map((user: any) => {return user.id;})
        },
        token: accessToken,
        groupId: curGroup.id
      }).unwrap();
      if ("id" in res) {
        dispatch(toggleRefetch());
        Toast.success("Thêm thành viên thành công");
      } 
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        setAddMember(true);
        const errorData = err as ErrorHandle;
        Toast.error(
          String(errorData.data.message),
          "top"
        );
      }
    }
  }

  return (
    <ScrollView className="w-full h-full">
      <LoadingProcess isVisible={addLoading || getLoading || deleteLoading} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={addMember}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="mb-3">
              <View className="w-full flex-col justify-center items-center mb-3">
                <Text className="font-bold text-2xl mb-5">Thêm thành viên</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={userList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Chọn thành viên"
                  searchPlaceholder="Tìm kiếm..."
                  onChange={item => {
                    setSelectedUsers([...selectedUsers, {name: item.label, id: item.value}]);
                  }}
                  renderLeftIcon={() => (
                    <MyIcon color="black" name="search" size={15} />
                  )}
                />
                <ScrollView className="h-[300px]">
                  {
                    selectedUsers.map((user: any, index: number) => 
                      <View key={index} className="w-full flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                        <Text className="font-semibold">{user.name}</Text>
                        <View className="flex-row gap-3 items-center">
                          <View className="rounded-full p-2 bg-lime-200">
                            <Text className="text-xs text-lime-800 font-semibold">Thành viên</Text>
                          </View>
                          <Pressable onPress={() => setSelectedUsers((prevUsers) => prevUsers.filter((userItem) => userItem.id !== user.id))}>
                            <MyIcon name="trash" size={20}/>
                          </Pressable>
                        </View>
                      </View>
                    )
                  }
                  {
                    selectedUsers.length === 0
                    &&
                    <View className="w-full h-[300px] flex justify-center items-center">
                      <Text className="text-xl">Chưa chọn thành viên nào</Text>
                    </View>
                  }
                </ScrollView>
              </View>
            </View>
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setAddMember(false)}>
                <Text className="text-black font-semibold">Hủy bỏ</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3 bg-lime-600" onPress={handleAddMember}>
                <Text className="text-white font-semibold">Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteMember}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="mb-3">
              <View className="w-full flex-col justify-center items-center mb-3">
                <Text className="font-bold text-2xl mb-5">Xóa thành viên</Text>
                <Text className="text-xl text-center">Bạn có chắc chắn muốn xóa thành viên {curMember.name} không?</Text>
              </View>
            </View>
            
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setDeleteMember(false)}>
                <Text className="text-black font-semibold">Hủy bỏ</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3" style={{ backgroundColor: "red"}} onPress={handleDeleteMember}>
                <Text className="text-white font-semibold">Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isViewInfo}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="w-full flex-row justify-center mb-3">
              <Text className="font-bold text-2xl">Thông tin thành viên</Text>
            </View>
            <View className="mb-3">
              <Text className="mb-2 font-semibold text-neutral-500 text-lg">Họ và tên</Text>
              <TextInput
                editable={false}
                className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                value={curMember?.name}
              />
              <Text className="mb-2 font-semibold text-neutral-500 text-lg">Vai trò</Text>
              <TextInput
                editable={false}
                className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                value={curMember?.role ? curMember.role === "Leader" ? "Nhóm trưởng" : "Thành viên" : ""}
              />
              <Text className="mb-2 font-semibold text-neutral-500 text-lg">Ngày sinh</Text>
              <TextInput
                editable={false}
                className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                value={curMember?.dateofbirth ? new Date(curMember.dateofbirth).toLocaleDateString() : ""}
              />
              <Text className="mb-2 font-semibold text-neutral-500 text-lg">Email</Text>
              <TextInput
                editable={false}
                className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                value={curMember?.email}
              />
            </View>
            
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setIsViewInfo(false)}>
                <Text className="text-black font-semibold">Đóng</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {
        curGroup.role === "Leader"
        &&
        <Pressable className="w-full flex flex-row justify-center gap-4 items-center bg-[#4D7C0F] p-3 rounded-xl mb-5" onPress={()=>setAddMember(true)}>
          <MyIonicons name="person-add-outline" color="white" size={25}/>
          <Text className="text-white text-lg font-semibold">Thêm thành viên</Text>
        </Pressable>
      }
      <View className="w-full flex-row justify-end mb-4">
        <Text className="text-[#2C6E35] font-semibold text-lg">Tổng số: {curGroup.user.length}</Text>
      </View>
      {
        curGroup?.user.map((mem: Member) => 
          <View className="bg-[#A0D683] rounded-xl py-2 px-4 mb-8" key={mem.id}>
            <View className="flex flex-row mb-3 items-center">
              <View className="w-[15%]">
                <Avatar name={mem.name} width={40} height={40}/>
              </View>
              <View className="w-[85%]">
                <Text className="text-lg font-bold text-[#30411A]">{mem.name}</Text>
                <Text className=" text-[#30411A]">{mem.role === "Leader" ? "Nhóm trưởng" : "Thành viên"}</Text>
              </View>
            </View>
            <View className="flex-row gap-3 justify-end items-center">
              <Pressable className="w-[47%] flex flex-row gap-1 justify-center items-center bg-[#4D7C0F] p-2 rounded-xl" onPress={()=>{setIsViewInfo(true); setCurMember(mem);}}>
                <MyIonicons name="information-circle-outline" color="white" size={20}/>
                <Text className="text-[#fff] font-semibold">Xem thông tin</Text>
              </Pressable>
              {
                curGroup.role === "Leader" && mem.role !== "Leader"
                &&
                <Pressable className="w-[10%] flex justify-center items-center" onPress={()=>{setDeleteMember(true); setCurMember(mem);}}>
                  <MyIcon name="trash" color="red" size={30}/>
                </Pressable>
              }
            </View>
          </View>
        )
      }
    </ScrollView>
  )
};

const GroupTask = (props: {taskList: Task[], onNavigate: (string: RootScreens) => void;}) => {
  const dispatch = useDispatch();
  
  return (
    <ScrollView className="w-full h-full">
      <Pressable className="w-full flex flex-row justify-center gap-4 items-center bg-[#4D7C0F] p-3 rounded-xl mb-5">
        <MyIonicons name="add-circle-outline" color="white" size={25}/>
        <Text className="text-white text-lg font-semibold">Thêm nhiệm vụ</Text>
      </Pressable>
      <View className="w-full flex-row justify-end mb-4">
        <Text className="text-[#2C6E35] font-semibold text-lg">Tổng số: {props.taskList.length}</Text>
      </View>
      {
        props.taskList.map((task: any) => 
          <View key={task.id} className="bg-[#A0D683] rounded-xl py-2 px-4 mb-8">
            <View className="flex flex-row mb-3 items-center">
              {
                task.priority === "LOW"
                ?
                <View className="w-[15%]">
                  <MyIcon name="angle-down" size={35} color="blue" />
                </View>
                :
                task.priority === "HIGH" 
                ?
                <View className="w-[15%]">
                  <MyIcon name="angle-up" size={35} color="red" />
                </View>
                :
                <View className="w-[15%]">
                  <MyIcon name="minus" size={35} color="#fdc609" />
                </View>
              }
              <View className="w-[75%]">
                <Text className="text-lg font-bold text-[#30411A]">{task.title}</Text>
                <Text className=" text-[#30411A]">Hạn: {new Date(task.dueDate).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh",})}</Text>
              </View>
              <Pressable className="w-[10%] flex items-end" onPress={() => {dispatch(setCurTask(task)); props.onNavigate(RootScreens.TASK_DETAIL);}}>
                <MyIonicons name="information-circle-outline" size={30} color="lime-900" />
              </Pressable>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="font-semibold text-[#30411A]">{task.assignees.length > 1 ? task.assignees[0].name + ",..." : task.assignees[0].name}</Text>
              {
                task.status === "TODO"
                ?
                <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-gray-100">
                  <MyIcon name="circle" size={10} color="#757575"/>
                  <Text className="text-gray-600 font-semibold">Mới</Text>
                </View>
                :
                task.status === "IN_PROGRESS" 
                ?
                <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-blue-100">
                  <MyIcon name="circle" size={10} color="#1E88E5"/>
                  <Text className="text-blue-600 font-semibold">Đang làm</Text>
                </View>
                :
                <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-[#64b44a]">
                  <MyIcon name="circle" size={10} color="#347928"/>
                  <Text className="text-[#347928] font-semibold">Xong</Text>
                </View>
              }
            </View>
          </View>
        )
      }
      
    </ScrollView>
)};

export const GroupDetail = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const curGroup = useSelector((state: any) => state.group.curGroup);
  const [getGroupTaskApi, {isLoading}] = useGetGroupTaskMutation();
  const [taskList, setTaskList] = useState<Task[]>([])
  const refetch = useSelector((state: any) => state.group.refetch);

  const getGroupTask = async () => {
    const res = await getGroupTaskApi(
      {
        groupId: curGroup.id,
        token: accessToken
      }
    ).unwrap();
    if (Array.isArray(res)) {
      setTaskList(res)
    }
  }

  useEffect(()=> {
    getGroupTask();
  }, [refetch])

  const [index, setIndex] = useState(0);

  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <LoadingProcess isVisible={isLoading} />
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Chi tiết nhóm</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <View className="w-full p-6">
          <View className="w-full mb-5">
            <Text className="text-2xl font-semibold text-[#347928] mb-2">Dự án: {curGroup.projectName ? curGroup.projectName : "Chưa tham gia"}</Text>
            <Text className="text-2xl font-semibold text-[#347928]">Nhóm: {curGroup.name}</Text>
          </View>
          <View className="h-[600px] overflow-hidden">
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              className="h-12 mb-5 border-[1px] border-[#D0D5DD] rounded-xl overflow-hidden"
              indicatorStyle={{
                backgroundColor: 'transparent',
              }}
            >
              <Tab.Item
                title="Tổng quan"
                titleStyle={{ 
                  fontSize: 14, 
                  padding: 0,
                  color: "#344054",
                  fontWeight: 600,
                }}
                buttonStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 5
                }}
                containerStyle={(active) => ({
                  backgroundColor: active ? "#A0D683" : undefined,
                  flex: 1,
                })}
              />
              <Tab.Item
                title="Thành viên"
                titleStyle={{ 
                  fontSize: 14, 
                  padding: 0,
                  color: "#344054",
                  fontWeight: 600,
                }}
                buttonStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 5
                }}
                containerStyle={(active) => ({
                  backgroundColor: active ? "#A0D683" : undefined,
                  flex: 1,
                })}
              />
              <Tab.Item
                title="Nhiệm vụ"
                titleStyle={{ 
                  fontSize: 14, 
                  padding: 0,
                  color: "#344054",
                  fontWeight: 600,
                }}
                buttonStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 5
                }}
                containerStyle={(active) => ({
                  backgroundColor: active ? "#A0D683" : undefined,
                  flex: 1,
                })}
              />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={{ width: '100%' }}>
                <GroupGeneral taskList={taskList}/>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <GroupMember/>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <GroupTask taskList={taskList} onNavigate={props.onNavigate}/>
              </TabView.Item>
            </TabView>
          </View>
      </View>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 50,
    padding: 15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 10
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});