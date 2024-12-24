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
        <TouchableOpacity onPress={() => onNavigate(RootScreens.MAIN)}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={32}
            color="black"
          />
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
            <TouchableOpacity onPress={() => onNavigate(RootScreens.ADD_TASK)}>
              <Text className="text-body-small-regular text-neutral-500">Thêm nhiệm vụ</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4">
            {taskList.map((task) => (
              <Pressable
                key={task.id}
                className="flex-row items-center bg-neutral-100 py-3 rounded-lg mb-2"
                onPress={() => {
                  dispatch(setCurTask(task));
                  onNavigate(RootScreens.TASK_DETAIL);
                }}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-4`}
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
                    <Text className="text-sm text-neutral-500">{task.dueDate}</Text>
                  </View>
                </View>
                <AvatarStack
                  users={task.assignees.map((member) => member.name)}
                  maxVisible={2}
                  display="row"
                />
                {renderPriorityIcon(task.priority)}
              </Pressable>
            ))}
            <View className="mb-16"></View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(ProjectDetail);
