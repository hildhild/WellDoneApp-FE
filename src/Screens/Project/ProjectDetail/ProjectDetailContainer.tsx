import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { RootState } from "@/Store";
import { dataa } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import ProjectDetail from "./ProjectDetail";
import { useGetDetailProjectMutation } from "@/Services/projects";

type ProjectDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROJECTDETAIL
>;

const ProjectDetailContainer: FC<ProjectDetailScreenNavigatorProps> = ({
  navigation,
}) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const id = useSelector((state: RootState) => state.project.id);
  const [getProjectDetail, { error, isLoading }] =
    useGetDetailProjectMutation();
  if (!id)
    return (
      <View>
        <Text>No project available</Text>
      </View>
    );
  const fetchProjectDetail = async () => {
    if (id) {
      const response = await getProjectDetail({ projectId: id });
    }
  };
  return <ProjectDetail onNavigate={onNavigate} project={dataa} />;
};

export default ProjectDetailContainer;
