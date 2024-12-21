import ProjectCreate from "./ProjectCreate";
import { ProjectEditForm } from "../ProjectEdit/ProjectEditContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import React, { FC, memo, useCallback } from "react";
import { useCreateProjectMutation } from "@/Services/projects";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
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
  const [createProject] = useCreateProjectMutation();
  const token = useSelector((state: RootState) => state.profile.token);
  const handleCreateProject = useCallback(async (formData: ProjectCreateForm) => {
    const response = await createProject({
      token: token,
      data: {
        name: formData.project_name,
        description: formData.project_description,
        startDate: formData.project_start_date,
        endDate: formData.project_end_date,
        status: formData.project_status,
        groups: formData.project_group_member,
      },
    });
    if (response) {
      onNavigate(RootScreens.PROJECTDETAIL);
    }
  },[createProject]);
  return (
    <ProjectCreate
      onNavigate={onNavigate}
      onCreateProject={handleCreateProject}
    />
  );
};
export default memo(ProjectCreateContainer);
