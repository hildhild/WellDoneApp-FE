import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import {
  GetDetailProjectResponse,
  useGetDetailProjectMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProjectDetail from "./ProjectDetail";
import { useProjectMembers } from "@/Screens/Home";

type ProjectDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROJECTDETAIL
>;

const ProjectDetailContainer: FC<ProjectDetailScreenNavigatorProps> = ({
  navigation,
}) => {
  const { id: projectId } = useSelector((state: RootState) => state.project);
  const { token } = useSelector((state: RootState) => state.profile);

  const [projectInfo, setProjectInfo] =
    useState<GetDetailProjectResponse | null>(null);
  const [getDetailProject, { isLoading }] = useGetDetailProjectMutation();
  const listMember = useProjectMembers(projectId, token);
  const onNavigate = (screen: RootScreens) => navigation.navigate(screen);

  const fetchProjectInfo = async () => {
    if (projectId && token) {
      const response = await getDetailProject({ projectId, token }).unwrap();
      if ("name" in response) {
        setProjectInfo(response);
      }
    }
  };

  useEffect(() => {
    fetchProjectInfo();
  }, [projectId, token, getDetailProject]);

  const renderContent = () => {
    if (isLoading) return (
      <>
        <View className="flex justify-center items-center h-full">
          <Text className="p-16 text-center ">
            Loading...
          </Text>
        </View>
      </>
    );

    if (projectInfo) {
      return <ProjectDetail listMember={listMember || []} onNavigate={onNavigate} project={projectInfo} />;
    }

    return (
      <>
        <View className="flex justify-center items-center h-full">
          <Text className="p-16 text-center ">
            Không tìm thấy dự án. Vui lòng thử lại.
          </Text>
        </View>
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default ProjectDetailContainer;
