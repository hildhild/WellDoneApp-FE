import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from 'react-native-vector-icons/FontAwesome';
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
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Task, useGetProjectTaskMutation } from "@/Services/task";
import { BarChart, PieChart } from "react-native-chart-kit";

const MyIcon = Icon as unknown as React.ComponentType<any>;

export const Statistic = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [uploadFileApi, {isLoading: uploadLoading}] = useUploadFileMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const project = useSelector((state: any) => state.project.curProject)
  const [getProjectTaskApi, {isLoading}] = useGetProjectTaskMutation();
  const [taskList, setTaskList] = useState<Task[]>([])
  const doneTaskCount = taskList.filter((task: any) => task.status === "DONE").length;
  const toDoTaskCount = taskList.filter((task: any) => task.status === "TODO").length;
  const inProgressTaskCount = taskList.filter((task: any) => task.status === "IN_PROGRESS").length;
  const lowTaskCount = taskList.filter((task: any) => task.priority === "LOW").length;
  const mediumTaskCount = taskList.filter((task: any) => task.priority === "MEDIUM").length;
  const highTaskCount = taskList.filter((task: any) => task.priority === "HIGH").length;

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
  
  
  const getProjectTask = async () => {
    const res = await getProjectTaskApi(
      {
        projectId: project.id,
        token: accessToken
      }
    ).unwrap();
    if (Array.isArray(res)) {
      setTaskList(res)
    }
  }

  useEffect(()=> {
    getProjectTask();
  }, [])
  
  

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
      <LoadingProcess isVisible={isLoading}/>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Thống kê</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <ScrollView className="w-full p-6">
        <Text className="text-2xl font-semibold text-[#3F6212] mb-5">Dự án: {project.name}</Text>
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
    </KeyboardAvoidingView>
    
  );
};