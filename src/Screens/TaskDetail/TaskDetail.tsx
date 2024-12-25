import React, { useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurTask, setGroupList, toggleRefetch, toggleRefetchProject } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { StyleSheet } from 'react-native';
import { useAddGroupMutation, useGetGroupsMutation, User } from "@/Services/group";
import { LoadingProcess } from "@/Components";
import * as DocumentPicker from 'expo-document-picker';
import { useGetFileMutation, useUploadFileMutation } from "@/Services/document";
import { Task, useDeleteTaskMutation } from "@/Services/task";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyIonicons = Ionicons as unknown as React.ComponentType<any>;

const MyIcon = Icon as unknown as React.ComponentType<any>;

export const TaskDetail = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [deleteTaskApi, {isLoading: deleteLoading}] = useDeleteTaskMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const task = useSelector((state: any) => state.task.curTask);
  const [deleteTask, setDeleteTask] = useState<boolean>(false);

  const [curMember, setCurMember] = useState<any>({
    "id": null ,
    "name": "",
    "email": "",
    "dateofbirth": "",
    "updatedAt": "",
    "role": ""
  });
  const [isViewInfo, setIsViewInfo] = useState<boolean>(false);

  const handleDeleteTask = async () => {
    setDeleteTask(false);
    try {
      const res = await deleteTaskApi({
        token: accessToken,
        taskId: task.id
      }).unwrap();
      if (!res) {
        Toast.success("Xóa thành công");
        dispatch(
          toggleRefetch()
        );
        dispatch(toggleRefetchProject());
        dispatch(setCurTask(null));
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



  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteTask}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="mb-3">
              <View className="w-full flex-col justify-center items-center mb-3">
                <Text className="font-bold text-2xl mb-5">Xóa nhiệm vụ</Text>
                <Text className="text-xl text-center">Bạn có chắc chắn muốn xóa nhiệm vụ số {task.id} không?</Text>
              </View>
            </View>
            
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setDeleteTask(false)}>
                <Text className="text-black font-semibold">Hủy bỏ</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3" style={{ backgroundColor: "red"}} onPress={handleDeleteTask}>
                <Text className="text-white font-semibold">Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingProcess isVisible={deleteLoading}/>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Chi tiết nhiệm vụ</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => {
        navigation.goBack();
        dispatch(setCurTask(null));
      }}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <Pressable className="absolute right-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={()=>setDeleteTask(true)}>
        <MyIcon name="trash" size={25} color="red" />
      </Pressable>
      <Pressable className="z-50 absolute right-5 bottom-10 w-16 h-16 flex justify-center items-center rounded-full bg-lime-500" onPress={()=>props.onNavigate(RootScreens.EDIT_TASK)}>
        <MyIcon name="pencil" size={30} color="#fff" />
      </Pressable>
      <ScrollView className="w-full p-6">
        <View className="mb-2 w-full flex-row justify-between items-center">
          <Text className="text-lg text-neutral-500">Nhiệm vụ</Text>
          <View className="flex-row gap-3">
            {
              task.priority === "HIGH"
              ?
              <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-red-100">
                <MyIcon name="angle-up" size={15} color="#E53935"/>
                <Text className="text-red-600 font-semibold">Cao</Text>
              </View>
              :
              task.priority === "LOW" 
              ?
              <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-blue-100">
                <MyIcon name="angle-down" size={15} color="#1E88E5"/>
                <Text className="text-blue-600 font-semibold">Thấp</Text>
              </View>
              :
              <View className="px-5 flex flex-row gap-1 justify-center items-center py-2 rounded-full bg-yellow-100">
                <MyIcon name="minus" size={15} color="#C88B08"/>
                <Text className="text-yellow-600 font-semibold">Trung bình</Text>
              </View>
            }
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
        <Text className="text-3xl font-bold mb-5">{task.title}</Text>
        <Text className="text-lg text-neutral-500 mb-2">Mã nhiệm vụ</Text>
        <Text className="font-semibold mb-5 text-xl">{task.id}</Text>
        <Text className="text-lg text-neutral-500 mb-2">Dự án</Text>
        <Text className="font-semibold mb-5 text-xl">{task.project.name}</Text>
        <View className="flex-row items-center gap-2 mb-5">
          <MyIcon name="calendar" size={20} color="gray"/>
          <Text className="text-gray-500 text-lg ml-2">Hạn:</Text>
          <Text className="text-gray-500 font-semibold text-lg">{new Date(task.dueDate).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh",})}</Text>
        </View>
        <Text className="text-lg text-neutral-500 mb-2">Thành viên</Text>
        {
          task.assignees.map((mem: any) => 
            <View className="bg-[#A0D683] rounded-xl py-2 px-4 mb-3" key={mem.id}>
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className={`text-lg font-bold ${mem.id === task.createdById ? "text-red-500" : "text-[#30411A]"}`}>{mem.name.slice(0,20)}{mem.name.length > 20 && "..."}</Text>
                </View>
                <Pressable className="flex flex-row gap-1 justify-center items-center bg-[#4D7C0F] p-2 rounded-xl" onPress={()=>{setIsViewInfo(true); setCurMember(mem);}}>
                  <MyIonicons name="information-circle-outline" color="white" size={20}/>
                  <Text className="text-[#fff] font-semibold">Xem thông tin</Text>
                </Pressable>
              </View>
            </View>
          )
        }
        <Text className="text-lg text-neutral-500 mb-2 mt-2">Mô tả nhiệm vụ</Text>
        <Text className="font-light mb-5 text-2xl">{task.description}</Text>
        <Text className="text-lg text-neutral-500 mb-2">Nhật ký nhiệm vụ</Text>
        <View className="flex-row items-center justify-between">
          <Text className="font-light">Thời gian tạo</Text>
          <Text className="font-semibold text-lg">{new Date(task.createdAt).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh",})}</Text>
        </View>
        <View className="flex-row items-center justify-between mb-8">
          <Text className="font-light">Chỉnh sửa lần cuối</Text>
          <Text className="font-semibold text-lg">{new Date(task.updatedAt).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh",})}</Text>
        </View>
        <View className="flex-row items-center justify-between mb-32">
          <Text className="text-lg text-neutral-500">Tài liệu</Text>
          <Pressable className="bg-lime-600 rounded-xl flex-row justify-center items-center px-3 py-2 gap-3" onPress={()=>props.onNavigate(RootScreens.DOCUMENT)}>
            <MyIcon name="eye" color="white" size={15}/>
            <Text className="font-semibold text-lg text-white">Xem</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};
