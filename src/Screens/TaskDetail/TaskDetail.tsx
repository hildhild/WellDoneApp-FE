import React, { useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setGroupList } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { StyleSheet } from 'react-native';
import { useAddGroupMutation, useGetGroupsMutation, User } from "@/Services/group";
import { LoadingProcess } from "@/Components";
import * as DocumentPicker from 'expo-document-picker';
import { useGetFileMutation, useUploadFileMutation } from "@/Services/document";
import { Task } from "@/Services/task";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyIonicons = Ionicons as unknown as React.ComponentType<any>;

const MyIcon = Icon as unknown as React.ComponentType<any>;

export const TaskDetail = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [uploadFileApi, {isLoading: uploadLoading}] = useUploadFileMutation();
  const [getFileApi, {isLoading: getLoading}] = useGetFileMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const task = useSelector((state: any) => state.task.curTask);
  // const [task, setTask] = useState<Task>(  {
  //   "id": 4,
  //   "title": "Ngủ",
  //   "description": "string",
  //   "dueDate": "2024-12-22T10:39:07.067Z",
  //   "priority": "MEDIUM",
  //   "status": "TODO",
  //   "createdAt": "2024-12-22T16:26:14.810Z",
  //   "updatedAt": "2024-12-22T16:26:14.810Z",
  //   "createdById": 9,
  //   "projectId": 6,
  //   "assignees": [
  //     {
  //       "id": 9,
  //       "name": "Lê Đình Huy",
  //       "email": "huy.ledinh@hcmut.edu.vn",
  //       "dateofbirth": "2030-12-20T08:53:19.000Z",
  //       "updatedAt": "2024-12-23T07:52:30.849Z",
  //       "role": "Leader"
  //     }
  //   ],
  //   "createdBy": {
  //     "id": 9,
  //     "name": "Lê Đình Huy",
  //     "dateofbirth": "2030-12-20T08:53:19.000Z",
  //     "email": "huy.ledinh@hcmut.edu.vn",
  //     "password": "$2b$10$lwQBXZakcg6eqaXwQoyXEeaSYfh4sXmDfKBBJti0qSHk5KNQPKOAu",
  //     "createdAt": "2024-12-16T02:12:02.818Z",
  //     "updatedAt": "2024-12-23T07:52:30.849Z",
  //     "isActive": true,
  //     "isEmailVerified": true,
  //     "verificationCode": null,
  //     "verificationCodeExpiresAt": null,
  //     "status": "OFFLINE",
  //     "passwordResetCode": null,
  //     "passwordResetCodeExpiresAt": null
  //   },
  //   "project": {
  //     "id": 6,
  //     "name": "WellDone",
  //     "description": "string",
  //     "startDate": "2024-12-22T01:39:34.345Z",
  //     "endDate": "2024-12-22T01:39:34.345Z",
  //     "status": "NOT_STARTED",
  //     "createdAt": "2024-12-22T01:39:51.790Z",
  //     "updatedAt": "2024-12-22T01:39:51.790Z"
  //   }
  // })

  const [curMember, setCurMember] = useState<any>({
    "id": null ,
    "name": "",
    "email": "",
    "dateofbirth": "",
    "updatedAt": "",
    "role": ""
  });
  const [isViewInfo, setIsViewInfo] = useState<boolean>(false);

  const pickDocument = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: '*/*', 
        copyToCacheDirectory: true, 
      });

      if (!result.cancel) {
        const file = result.assets[0];
        if (!["application/pdf", "application/docs", "application/txt"].includes(file.mimeType)) {
          Toast.error("Chỉ chấp nhận pdf, txt và docs")
        } else {
          setFileUpload(file);
        }
        console.log('File picked:', result);
      } else {
        console.log(result);
        console.log('User canceled file selection.');
      }
    } catch (error) {
      // console.error('Error picking document:', error);
      Toast.error("Vui lòng tải tệp lên")
    }
  };

  const handleUploadFile = async () => {
    if (fileUpload) {
      try {
        console.log(fileUpload.type, fileUpload.mimeType)
        const response = await uploadFileApi({
          data: {
            file:  {
              uri: fileUpload.uri,
              name: fileUpload.name,
              type: fileUpload.mimeType,
            },
            task_id: 4
          },
          token: accessToken
        }).unwrap();
        if ("id" in response) {
          Toast.success(`Tải lên thành công ${response.id}`);
          setIsUpload(false);
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
    } else {
      Toast.error("Vui lòng tải tệp lên")
    }
  }


  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isUpload}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="mb-3">
              <View className="w-full flex-col justify-center items-center mb-3">
                <Text className="font-bold text-2xl mb-5">Tải tài liệu lên</Text>
                <View className="h-[100px]">
                  {
                    fileUpload
                    ?
                    <View className="w-full gap-3 flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                      <Text className="font-semibold w-[80%]">{fileUpload.name}</Text>
                      <View className="flex-row gap-3 items-center">
                        <View className={`rounded-full p-2 ${fileUpload.mimeType === "application/pdf" ? "bg-[#F0463C]" : fileUpload.mimeType === "application/txt" ? "bg-[#454140]" : "bg-[#5991F8]"}`}>
                          <Text className="text-xs text-white font-semibold">{fileUpload.mimeType === "application/pdf" ? "pdf" : fileUpload.mimeType === "application/txt" ? "txt" : "docs"}</Text>
                        </View>
                      </View>
                      <Pressable onPress={() => setFileUpload(null)}>
                        <MyIcon name="trash" size={25}/>
                      </Pressable>
                    </View>
                    :
                    <View className="w-full h-[100px] flex justify-center items-center">
                      <Text className="text-xl">Chưa tải lên tệp nào</Text>
                    </View>
                  }
                </View>
              </View>
            </View>
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setIsUpload(false)}>
                <Text className="text-black font-semibold">Hủy bỏ</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3 bg-blue-600" onPress={pickDocument}>
                <Text className="text-white font-semibold">Tải lên</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3 bg-lime-600" onPress={handleUploadFile}>
                <Text className="text-white font-semibold">Xác nhận</Text>
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
      <LoadingProcess isVisible={uploadLoading}/>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Chi tiết nhiệm vụ</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <Pressable className="absolute right-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="trash" size={25} color="red" />
      </Pressable>
      <Pressable className="z-50 absolute right-5 bottom-10 w-16 h-16 flex justify-center items-center rounded-full bg-lime-500" onPress={()=>setIsUpload(true)}>
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
                  <Text className={`text-lg font-bold ${mem.id === task.createdById ? "text-red-500" : "text-[#30411A]"}`}>{mem.name}</Text>
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
