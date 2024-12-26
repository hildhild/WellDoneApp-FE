import AvatarStack from "@/Components/AvatarStack";
import MembersModal from "@/Components/MembersModal";
import { RootScreens } from "@/Screens";
import { GetMemOfProjectResponse, Project } from "@/Services/projects";
import { Task } from "@/Services/task";
import { setCurProject, setCurTask, setProjectId } from "@/Store/reducers";
import { renderPriorityIcon, renderStatusLabel } from "@/Utils/Funtions/render";
import {
  AntDesign,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { FC, memo, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

const MyIcon = Icon as unknown as React.ComponentType<any>;

interface IProjectDetailProps {
  listMember: GetMemOfProjectResponse;
  onNavigate: (screen: RootScreens) => void;
  project: Project;
  taskList: Task[];
  onRefresh: () => void;
  refreshing: boolean;
}

const ProjectDetail: FC<IProjectDetailProps> = (props: IProjectDetailProps) => {
  const { listMember, onNavigate, project, taskList, onRefresh, refreshing } = props;
  const flatGroupsList = listMember.map((member) => member.name).join(", ");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurProject(project));
  }, [project]);

  return (
    <View className="bg-white h-full mt-8 px-4">
      <View className="flex-row justify-between items-center p-4 bg-neutral-100">
        {/* <TouchableOpacity onPress={() => {onNavigate(RootScreens.MAIN); dispatch(setProjectId({id: null}))}}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          className="w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
          onPress={() => {onNavigate(RootScreens.MAIN); dispatch(setProjectId({id: null}))}}
        >
          <MyIcon name="chevron-left" size={15} color="#000" />
        </TouchableOpacity>
        <Text className="text-heading4 font-bold">Chi tiết Dự án</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(setProjectId({ id: project.id }));
            onNavigate(RootScreens.PROJECTEDIT);
          }}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="p-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-col">
            <Text className="text-body-small-regular text-neutral-500">Tên dự án</Text>
            <Text className="text-heading4 font-bold text-center mt-2">{project.name}</Text>
          </View>

          {renderStatusLabel(project.status)}
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="flex-row items-center bg-primary-500 p-2 w-28 text-neutral-100 text-body-small-regular rounded-lg mt-4"
            onPress={() => onNavigate(RootScreens.STATISTIC)}
          >
            <Foundation name="graph-bar" size={24} color="black" />
            <Text> Thống kê</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-body-small-regular text-neutral-500 mt-4">Thành viên</Text>
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <AvatarStack users={flatGroupsList.split(",")} display="row" />
        </TouchableOpacity>
        {openModal && (
          <MembersModal
            projectName={project.name}
            members={listMember}
            closeModal={() => setOpenModal(false)}
          />
        )}

        <Text className="text-body-small-regular text-neutral-500 mt-4">Mô tả dự án</Text>
        <Text className="text-body-large-regular text-neutral-900">{project.description}</Text>

        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-body-small-regular text-neutral-500">Tasks</Text>
            <TouchableOpacity onPress={() => {onNavigate(RootScreens.ADD_TASK); dispatch(setProjectId({ id: project.id }));}}>
              <Text className="text-body-small-regular text-neutral-500">Thêm nhiệm vụ</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="py-4">
            {taskList.map((task) => (
              <Pressable
                key={task.id}
                className="flex-row items-center bg-lime-100 py-3 px-2 rounded-xl mb-2"
                onPress={() => {
                  dispatch(setCurTask(task));
                  onNavigate(RootScreens.TASK_DETAIL);
                }}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-2`}
                >
                  {task.status === "DONE" && (
                    <AntDesign name="checkcircle" size={25} color="green" />
                  )}
                  {(task.status === "IN_PROGRESS" || task.status === "TODO") && (
                    <AntDesign name="checkcircleo" size={25} color="black" />
                  )}
                </View>

                <View className="flex-1">
                  <View className="flex-col">
                    <Text className="font-medium text-neutral-900">{task.title}</Text>
                    <Text className="text-sm text-neutral-500">#{task.id}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="flag-outline" size={20} color="black" />
                    <Text className="text-sm text-neutral-500">{new Date(task.dueDate).toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh",})}</Text>
                  </View>
                </View>
                <AvatarStack
                  users={task.assignees.map((member) => member.name)}
                  maxVisible={2}
                  display="row"
                />
                <View className="mr-2"></View>
                {renderPriorityIcon(task.priority)}
              </Pressable>
            ))}
            {
              taskList.length === 0 
              &&
              <Text className="text-center text-lg text-gray-500 font-semibold">Không có nhiệm vụ</Text>
            }
            <View className="mb-16"></View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(ProjectDetail);
