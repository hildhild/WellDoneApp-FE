import ProjectCreate from "./ProjectCreate";
import { ProjectEditForm } from "../ProjectEdit/ProjectEditContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import React, { FC } from "react";
export interface ProjectCreateForm extends ProjectEditForm {}

type ProjectCreateScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROJECTCREATE
>;

const ProjectCreateContainer: FC<ProjectCreateScreenNavigatorProps> = ({
  navigation,
}) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const handleCreateProject = (formData: ProjectCreateForm) => {
    console.log(formData);
  };
  return (
    <ProjectCreate
      onNavigate={onNavigate}
      onCreateProject={handleCreateProject}
    />
  );
};
export default ProjectCreateContainer;
