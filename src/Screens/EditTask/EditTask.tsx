
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurGroupProjectId, setCurTask, setProjectList, toggleRefetch } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Group, Member, useAddGroupMutation, useGetGroupsMutation, User } from "@/Services/group";
import { LoadingProcess } from "@/Components";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Project, useGetMemOfProjectMutation, useGetProjectListMutation } from "@/Services/projects";
import { useAddTaskMutation, useEditTaskMutation } from "@/Services/task";

const MyIcon = Icon as unknown as React.ComponentType<any>;

export const EditTask = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [userList, setUserList] = useState<any>([])
  // const projectList = useSelector((state: any) => state.project.projectList).map((project: Project) => {
  //   return {
  //     label: project.name,
  //     value: project.id
  //   };
  // });
  const [projectList, setProjectList] = useState<any>([]);
  const [editTaskApi, {isLoading: editLoading}] = useEditTaskMutation();
  const [getProjectsApi, {isLoading: getLoading}] = useGetProjectListMutation();
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const curGroupProjectId = useSelector((state: any) => state.group.curGroupProjectId);
  const task = useSelector((state: any) => state.task.curTask);
  const [formData, setFormData] = useState<any>({
    "title": task.title,
    "description": task.description,
    "dueDate": new Date(task.dueDate),
    "priority": task.priority,
    "status": task.status,
    "assigneeIds": task.assignees.map((user: any) => user.id),
    "projectId": curGroupProjectId ? curGroupProjectId : task ? task.projectId : curGroupProjectId
  }
  );
  const [selectedUsers, setSelectedUsers] = useState<{name: string, id: number}[]>(task ? task.assignees.map((user: any) => {
    return {
      name: user.name,
      id: user.id
    };
  }): []);
  const [getProjectMemberApi, {isLoading: getMemberLoading}] = useGetMemOfProjectMutation();

  const handleEditTask = async () => {
    try {
      const response = await editTaskApi({
        data: formData,
        token: accessToken,
        taskId: task.id
      }).unwrap();
      if ("id" in response) {
        Toast.success("Chỉnh sửa thành công");
        dispatch(
          toggleRefetch()
        );
        dispatch(setCurGroupProjectId(null));
        dispatch(setCurTask(response));
        navigation.goBack();
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

  const handleChangeDueDate = (event: DateTimePickerEvent, selectedDate: Date | undefined): void => {
    if (selectedDate) {
      setFormData({...formData, dueDate: selectedDate}); 
    }
  };

  const getProjectMember = async (projectId: number) => {
    try {
      const response = await getProjectMemberApi({
        projectId: projectId,
        token: accessToken
      }).unwrap();
      if (Array.isArray(response)) {
        setUserList(response.map((user: any) => {
          return {
            label: user.name,
            value: user.id
          };
        }));
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

  const getProjectList = async () => {
    try {
      const response = await getProjectsApi({
        token: accessToken
      }).unwrap();
      if (Array.isArray(response)) {
        setProjectList(response.map((user: any) => {
          return {
            label: user.name,
            value: user.id
          };
        }));
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

  useEffect(()=> {
    getProjectList();
    if (curGroupProjectId) {
      getProjectMember(curGroupProjectId);
    } else if (task) {
      getProjectMember(task.projectId);
    }
  }, [])


  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <LoadingProcess isVisible={getMemberLoading}/>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openDatePicker}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] py-3">
            <DateTimePicker
              value={formData.dueDate}
              mode="datetime" 
              display="spinner"
              onChange={handleChangeDueDate}
              themeVariant="light"
            />
            <View className="w-full flex justify-center items-center">
              <Button className="!rounded-full !bg-lime-300" onPress={()=>setOpenDatePicker(false)}>
                <Text className="text-black font-semibold">Xong</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingProcess isVisible={editLoading || getLoading}/>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Chỉnh sửa nhiệm vụ</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <Pressable className="absolute right-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={handleEditTask}>
        <MyIcon name="save" size={20} color="#000" />
      </Pressable>
      <ScrollView className="w-full p-6">
        <View className="mb-3">
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg">Tên nhiệm vụ</Text>
          <TextInput
            editable
            placeholder="Nhập tên nhiệm vụ"
            className=" text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
            value={formData.title}
            onChangeText={(name) => setFormData({...formData, title: name})}
          />
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg">Mô tả nhiệm vụ</Text>
          <TextInput
            editable
            placeholder="Nhập mô tả nhiệm vụ"
            multiline
            className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
            value={formData.description}
            onChangeText={(description) => setFormData({...formData, description: description})}
          />
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg">Dự án</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={projectList}
            value={formData.projectId}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn dự án"
            searchPlaceholder="Tìm kiếm..."
            onChange={item => {
              setFormData({...formData, projectId: parseInt(item.value)});
              getProjectMember(parseInt(item.value));
            }}
            renderLeftIcon={() => (
              <MyIcon name="folder" size={20} color="#84cc16"/>
            )}
          />
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">Thành viên</Text>
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
              if (selectedUsers.filter((user: any) => user.id === item.value).length > 0) {
                Toast.error("Thành viên đã được chọn")
              } else {
                setSelectedUsers([...selectedUsers, {name: item.label, id: item.value}]);
                setFormData({...formData, assigneeIds: [...formData.assigneeIds, item.value]});
            }}}
            renderLeftIcon={() => (
              <MyIcon name="users" size={20} color="#84cc16"/>
            )}
          />
          {
            selectedUsers.map((user: any) => 
              <View key={user.id} className="flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                <Text className="font-semibold">{user.name}</Text>
                <View className="flex-row gap-3 items-center">
                  <Pressable onPress={() => { 
                    setSelectedUsers((prevUsers) => prevUsers.filter((userItem: any) => userItem.id !== user.id));
                    setFormData({...formData, assigneeIds: formData.assigneeIds.filter((id: number) => id !== user.id)});
                  }}>
                    <MyIcon name="trash" size={20}/>
                  </Pressable>
                </View>
              </View>
            )
          }
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">Trạng thái</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[
              {
                label: "Mới",
                value: "TODO"
              },
              {
                label: "Đang làm",
                value: "IN_PROGRESS"
              },
              {
                label: "Xong",
                value: "DONE"
              }
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn trạng thái"
            onChange={item => {
              setFormData({...formData, status: item.value});
            }}
            renderLeftIcon={() => (
              <MyIcon color="#84cc16" name="line-chart" size={20} />
            )}
            value={formData.status}
          />
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">Độ ưu tiên</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[
              {
                label: "Cao",
                value: "HIGH"
              },
              {
                label: "Trung bình",
                value: "MEDIUM"
              },
              {
                label: "Thấp",
                value: "LOW"
              }
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn độ ưu tiên"
            onChange={item => {
              setFormData({...formData, priority: item.value});
            }}
            renderLeftIcon={() => (
              <MyIcon color="#84cc16" name="sort-amount-desc" size={20} />
            )}
            value={formData.priority}
          />
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">Hạn</Text>
          <View className="mb-16 text-neutral-700 text-body-base-regular rounded-xl p-4 border-[1px] border-gray-300 bg-white flex-row" >
              <TextInput
                placeholder="Ngày sinh"
                editable={false}
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={formData.dueDate.toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false, // Sử dụng định dạng 24 giờ
                })}
                onPress={() => {setOpenDatePicker(true)}}
              />
            <Pressable onPress={() => {setOpenDatePicker(true)}}>
              <MyIcon name="calendar" size={20}/>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  dropdown: {
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