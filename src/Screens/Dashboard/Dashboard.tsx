import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";
import { useGetProjectListMutation } from "@/Services/projects";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { useGetMyTaskMutation } from "@/Services/task";
import { LoadingProcess } from "@/Components";
import { setCurTask, setProjectId } from "@/Store/reducers";

export interface IDashboardProps {
  onNavigate: (screen: RootScreens) => void;
}

const MyIcon = Icon as unknown as React.ComponentType<any>;

export const Dashboard = (props: IDashboardProps) => {
  const [getProjectsApi] = useGetProjectListMutation();
  const [getMyTaskApi] = useGetMyTaskMutation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const [projectList, setProjectList] = useState<any>([]);
  const [myTaskList, setMyTaskList] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const getProjectList = async () => {
    const res = await getProjectsApi({
      token: accessToken
    }
    ).unwrap();
    if (Array.isArray(res)) {
      setProjectList(res.filter(project => ["NOT_STARTED", "IN_PROGRESS"].includes(project.status)));
    } else {
      Toast.error("Lỗi")
    }
  }

  const getMyTasks = async () => {
    const res = await getMyTaskApi(accessToken).unwrap();
    if (Array.isArray(res)) {
      setMyTaskList(res.filter(project => ["TODO", "IN_PROGRESS"].includes(project.status)));
    } else {
      Toast.error("Lỗi")
    }
  }

  useEffect(() => {
    getProjectList();
    getMyTasks();
  }, [])

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getProjectList();
      getMyTasks();
      setRefreshing(false);
    }, 2000); 
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View className="bg-[#F8FBF6] w-full h-full relative">
          <View className="w-full h-24 pb-4 flex justify-end items-center">
            <Text className="text-2xl font-bold px-10 text-center text-black">Bảng điều khiển</Text>
          </View>
          <ScrollView 
            className="px-5 py-3"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className="bg-lime-100 rounded-xl p-4 mb-8">
              <Text className="font-semibold text-lg mb-3">Nhiệm vụ hiện tại</Text>
              <View className="flex flex-row border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text className="text-sm">Mã</Text></View>
                <View className="w-[50%]"><Text className="text-sm">Tiêu đề</Text></View>
                <View className="w-[25%]"><Text className="text-sm text-center">Trạng thái</Text></View>
                <View className="w-[10%]"><Text className="text-sm text-center">P</Text></View>
              </View>
              {
                myTaskList.map((task: any) => 
                  <Pressable key={task.id} className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3" onPress={()=> {
                    dispatch(setCurTask(task));
                    props.onNavigate(RootScreens.TASK_DETAIL);
                  }}>
                    <View className="w-[15%]"><Text>{task.id}</Text></View>
                    <View className="w-[50%]"><Text>{task.title}</Text></View>
                    <View className={`w-[25%] rounded-full flex-row justify-center ${task.status === "TODO" ? "bg-gray-100" : "bg-blue-100"}`}><Text className={`text-sm font-semibold ${task.status === "TODO" ? "text-gray-600" : "text-blue-600"}`}>{task.status === "TODO" ? "Mới" : "Đang làm"}</Text></View>
                    <View className="w-[10%] flex-row justify-center"><MyIcon name={task.priority === "HIGH" ? "angle-up" : task.priority === "LOW" ? "angle-down" : "minus"} size={20} color={task.priority === "HIGH" ? "red" : task.priority === "blue" ? "angle-down" : "#fdc609"} /></View>
                  </Pressable>
                )
              }
              {
                myTaskList.length === 0
                &&
                <View className="w-full flex items-center justify-center p-8">
                  <Text className="text-gray-400 font-semibold">Không có nhiệm vụ</Text>
                </View>
              }
            </View>
            <View className="bg-lime-100 rounded-xl p-4 mb-32">
              <Text className="font-semibold text-lg mb-3">Dự án hiện tại</Text>
              <View className="flex flex-row border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[40%]"><Text className="text-sm">Dự án</Text></View>
                <View className="w-[40%]"><Text className="text-sm">Nhóm</Text></View>
                <View className="w-[20%]"><Text className="text-sm text-center">Trạng thái</Text></View>
              </View>
              {
                projectList.map((project: any) => 
                <Pressable key={project.id} className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3" onPress={()=>{
                  dispatch(setProjectId({id: project.id}));
                  props.onNavigate(RootScreens.PROJECTDETAIL);
                }}>
                  <View className="w-[40%]"><Text className="font-semibold">{project.name}</Text></View>
                  <View className="w-[40%]"><Text>{project.userGroups.length > 1 ? project.userGroups[0].name + ",..." : project.userGroups[0].name}</Text></View>
                  <View className={`w-[20%] rounded-full flex-row justify-center ${project.status === "NOT_STARTED" ? "bg-gray-100" : "bg-blue-100"}`}><Text className={`text-sm font-semibold ${project.status === "NOT_STARTED" ? "text-gray-600" : "text-blue-600"}`}>{project.status === "NOT_STARTED" ? "Mới" : "Đang làm"}</Text></View>
                </Pressable>
                )
              }
              {
                projectList.length === 0
                &&
                <View className="w-full flex items-center justify-center p-8">
                  <Text className="text-gray-400 font-semibold">Không có dự án</Text>
                </View>
              }
            </View>
          </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
