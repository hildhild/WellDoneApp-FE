import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, useWindowDimensions, StyleSheet } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/Services/profile";
import { removeToken, setCurGroup, setGroupList, setProfile } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { Tab, TabView } from '@rneui/themed';
import { SemiCircleProgress } from "@/Components";
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Dimensions } from "react-native";
import {
  LineChart,
} from "react-native-chart-kit";
import { current } from "@reduxjs/toolkit";
import { Member, useAddMemberMutation, useDeleteMemberMutation, useGetGroupsMutation, User } from "@/Services/group";
import { Dropdown } from 'react-native-element-dropdown';

const GroupGeneral = () => {
  const curGroup = useSelector((state: any) => state.group.curGroup);

  const chartConfig = {
    backgroundGradientFrom: "#F8FBF6",
    backgroundGradientTo: "#F8FBF6",
    color: (opacity = 1) => `rgba(63, 98, 18, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false 
  };
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    datasets: [
      {
        data: [20, 45, 28, 80],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Nhiệm vụ"] // optional
  };

  return (
    <ScrollView className="w-full h-full">
      <Text className="text-2xl text-[#3F6212] font-semibold mb-3">Mô tả nhóm</Text>
      <Text className="text-xl mb-5">{curGroup.description}</Text>
      <Text className="text-2xl text-[#3F6212] font-semibold mb-3">Tháng 10</Text>
      <View className="mb-5">
        <Text className="text-xl text-[#3F6212] font-semibold">Nhiệm vụ đã hoàn thành</Text>
        <View className="w-full flex items-center p-7">
          <SemiCircleProgress
            percentage={35}
            progressColor={"#3F6212"}
            interiorCircleColor= "#F8FBF6"
            progressWidth= {30}
          >
            <Text style={{ fontSize: 32, color: "black" }}>35%</Text>
          </SemiCircleProgress>
        </View>
        <Text className="text-lg text-[#3F6212] font-semibold mb-2">Thời hạn</Text>
        <ProgressBar progress={0.5} color="#3F6212" className="mb-2"/>
        <View className="flex flex-row justify-between">
          <Text className="text-lime-800 font-semibold">01/10/2024</Text>
          <Text className="text-lime-800 font-semibold">31/10/2024</Text>
        </View>
      </View>
      <View>
        <Text className="text-xl text-[#3F6212] font-semibold mb-3">Tiến độ</Text>
        <View className="flex flex-row justify-between mb-2">
          <Text>Tổng 30 nhiệm vụ</Text>
          <Text className="text-[#868686]">Tháng trước 50 nhiệm vụ</Text>
        </View>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
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
  const [deleteMemberApi] = useDeleteMemberMutation();
  const [addMemberApi] = useAddMemberMutation();
  const [getGroups] = useGetGroupsMutation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [refetch, setRefect] = useState<boolean>(false);
  const [deleteMember, setDeleteMember] = useState<boolean>(false);
  const [addMember, setAddMember] = useState<boolean>(false);
  const userList = useSelector((state: any) => state.userList.userList).map((user: User) => {
    return {
      label: user.name,
      value: user.id
    };
  });
  const [selectedUsers, setSelectedUsers] = useState<{name: string, id: number}[]>([]);


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
    getGroupList();
  }, [refetch])

  const handleDeleteMember = async () => {
    try {
      const res = await deleteMemberApi({
        token: accessToken,
        groupId: curGroup.id,
        userId: curMember.id
      }).unwrap();
      if (!res) {
        Toast.success("Xóa thành công");
        setDeleteMember(false);
        setRefect(!refetch);
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
    try {
      const res = await addMemberApi({
        data: {
          list_user_members: selectedUsers.map((user: any) => {return user.id;})
        },
        token: accessToken,
        groupId: curGroup.id
      }).unwrap();
      if ("id" in res) {
        Toast.success("Thêm thành viên thành công");
        setAddMember(false);
        setRefect(!refetch);
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

  return (
    <ScrollView className="w-full h-full">
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
                    <Icon color="black" name="search" size={15} />
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
                            <Icon name="trash" size={20}/>
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
          <Ionicons name="person-add-outline" color="white" size={25}/>
          <Text className="text-white text-lg font-semibold">Thêm thành viên</Text>
        </Pressable>
      }
      {
        curGroup?.user.map((mem: Member) => 
          <View className="bg-[#A0D683] rounded-xl py-2 px-4 mb-8" key={mem.id}>
            <View className="flex flex-row mb-3 items-center">
              <View className="w-[15%]">
                <Image
                  className="w-[40px] h-[40px] object-cover rounded-full border-[1px] border-black"
                  source={require('assets/dark-logo.png')}
                />
              </View>
              <View className="w-[85%]">
                <Text className="text-lg font-bold text-[#30411A]">{mem.name}</Text>
                <Text className=" text-[#30411A]">{mem.role === "Leader" ? "Nhóm trưởng" : "Thành viên"}</Text>
              </View>
            </View>
            <View className="flex-row gap-3 justify-end items-center">
              <Pressable className="w-[47%] flex flex-row gap-1 justify-center items-center bg-[#4D7C0F] p-2 rounded-xl" onPress={()=>{setIsViewInfo(true); setCurMember(mem);}}>
                <Ionicons name="information-circle-outline" color="white" size={20}/>
                <Text className="text-[#fff] font-semibold">Xem thông tin</Text>
              </Pressable>
              {
                curGroup.role === "Leader" && mem.role !== "Leader"
                &&
                <Pressable className="w-[10%] flex justify-center items-center" onPress={()=>{setDeleteMember(true); setCurMember(mem);}}>
                  <Icon name="trash" color="red" size={30}/>
                </Pressable>
              }
            </View>
          </View>
        )
      }
    </ScrollView>
  )
};

const GroupTask = () => {
  
  return (
    <ScrollView className="w-full h-full">
      <Pressable className="w-full flex flex-row justify-center gap-4 items-center bg-[#4D7C0F] p-3 rounded-xl mb-5">
        <Ionicons name="add-circle-outline" color="white" size={25}/>
        <Text className="text-white text-lg font-semibold">Thêm nhiệm vụ</Text>
      </Pressable>
      <View className="bg-[#A0D683] rounded-xl py-2 px-4 mb-8">
        <View className="flex flex-row mb-3 items-center">
          <View className="w-[15%]">
            <Icon name="angle-double-up" size={35} color="red" />
          </View>
          <View className="w-[75%]">
            <Text className="text-lg font-bold text-[#30411A]">Design new dashboard UI.</Text>
            <Text className=" text-[#30411A]">Hạn: 3/12/2024</Text>
          </View>
          <View className="w-[10%] flex items-end">
            <Ionicons name="information-circle-outline" size={25} color="lime-900" />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Text className="font-semibold text-[#30411A]">Alice Johnson</Text>
          <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-[#64b44a]">
            <Icon name="circle" size={10} color="#347928"/>
            <Text className="text-[#347928] font-semibold">Hoàn thành</Text>
          </View>
        </View>
      </View>
    </ScrollView>
)};

export const GroupDetail = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const curGroup = useSelector((state: any) => state.group.curGroup);

  const [index, setIndex] = useState(0);

  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Chi tiết nhóm</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <View className="w-full p-6">
          <View className="w-full mb-5">
            <Text className="text-3xl font-semibold text-[#347928] mb-2">Dự án: Chưa tham gia</Text>
            <Text className="text-3xl font-semibold text-[#347928]">Nhóm: {curGroup.name}</Text>
          </View>
          <View className="h-[600px] overflow-hidden">
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              className="h-12 mb-3 border-[1px] border-[#D0D5DD] rounded-xl overflow-hidden"
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
                <GroupGeneral/>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <GroupMember/>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <GroupTask/>
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