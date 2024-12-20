import React, { FC, useState } from "react";
import ProjectEdit from "./ProjectEdit";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import { Status, dataa } from "@/Utils/constant";
import {
  IProjectDetail,
  useEditProjectMutation,
  useGetDetailProjectMutation,
} from "@/Services/projects";
import { setProjectId } from "@/Store/reducers";
import { Toast } from "toastify-react-native";
import { View } from "react-native";

export interface ProjectEditForm {
  project_name: string;

  project_description: string;

  //project_group_member: string[];

  project_status: Status;

  project_sum_hours: number;

  project_start_date: string;

  project_end_date: string;
}

type ProjectEditScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROJECTEDIT
>;

const ProjectEditContainer: FC<ProjectEditScreenNavigatorProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const [projectInfo, setProjectInfo] = useState<IProjectDetail>(dataa);
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const [editProject, { isLoading, isError, error }] = useEditProjectMutation();
  const [getDetailProject] = useGetDetailProjectMutation();

  const project = useSelector((state: RootState) => state.project);

  const handleEditProject = async (formData: ProjectEditForm) => {
    try {
      const response = await editProject(formData).unwrap();
      if (response) {
        Toast.success("Edit project successfully", "top");
        dispatch(setProjectId({ id: project.id || "" }));
        onNavigate(RootScreens.PROJECTDETAIL);
      }
    } catch (err) {
      Toast.error(String(err), "center");
    }
  };
  if (!project.id) return <View>Cannot fetch project with id</View>;
  const fetchProjectInfo = async () => {
    if (project.id) {
      const response = await getDetailProject({
        projectId: project.id,
      }).unwrap();
      if (response) {
        setProjectInfo(response);
      }
    } else {
      throw new Error("Project ID is null");
    }
  };
  return (
    <ProjectEdit
      project={projectInfo}
      onNavigate={onNavigate}
      onEditProject={handleEditProject}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default ProjectEditContainer;
