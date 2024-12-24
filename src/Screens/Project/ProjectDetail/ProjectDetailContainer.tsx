import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import {
  GetDetailProjectResponse,
  useGetDetailProjectMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProjectDetail from "./ProjectDetail";
import { useProjectMembers } from "@/Screens/Home";
import { useGetProjectTaskMutation, Task } from "@/Services/task";

type ProjectDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROJECTDETAIL
>;

const ProjectDetailContainer: FC<ProjectDetailScreenNavigatorProps> = ({
  navigation,
}) => {
  const { id: projectId } = useSelector((state: RootState) => state.project);
  const { token } = useSelector((state: RootState) => state.profile);

  const [projectInfo, setProjectInfo] = useState<GetDetailProjectResponse | null>(null);
  const [taskList, setTaskList] = useState<Task[] | null>(null);
  const [getDetailProject, { isLoading }] = useGetDetailProjectMutation();
  const [getTaskList, { isLoading: isTaskFetchingLoading }] = useGetProjectTaskMutation();
  const listMember = useProjectMembers(projectId, token);
  const onNavigate = (screen: RootScreens) => navigation.navigate(screen);

  const [refreshing, setRefreshing] = useState(false);

  const fetchProjectInfo = useCallback(async () => {
    if (projectId && token) {
      const response = await getDetailProject({ projectId, token }).unwrap();
      if ("name" in response) {
        setProjectInfo(response);
      }
    }
  }, [projectId, token, getDetailProject]);

  const fetchTaskList = useCallback(async () => {
    if (projectId && token) {
      const response = await getTaskList({ projectId, token }).unwrap();
      if (Array.isArray(response) && response.length > 0) {
        setTaskList(response);
      }
    }
  }, [projectId, token, getTaskList]);

  useEffect(() => {
    fetchProjectInfo();
    fetchTaskList();
  }, [projectId, token, fetchProjectInfo, fetchTaskList]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProjectInfo();
    fetchTaskList();
    setRefreshing(false);
  }, [fetchProjectInfo, fetchTaskList]);

  const renderContent = () => {
    if (isLoading || isTaskFetchingLoading)
      return (
        <View className="flex justify-center items-center h-full">
          <Text className="p-16 text-center">Loading...</Text>
        </View>
      );
    if (projectInfo && listMember) {
      return (
        <ProjectDetail
          taskList={taskList ? taskList : []}
          listMember={listMember}
          onNavigate={onNavigate}
          project={projectInfo}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      );
    }

    return (
      <View className="flex justify-center items-center h-full">
        <Text className="p-16 text-center">Không tìm thấy dự án. Vui lòng thử lại.</Text>
      </View>
    );
  };

  return <>{renderContent()}</>;
};

export default ProjectDetailContainer;
