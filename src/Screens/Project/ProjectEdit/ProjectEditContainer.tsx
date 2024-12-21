import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import {
  GetDetailProjectResponse,
  useEditProjectMutation,
  useGetDetailProjectMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { setProjectId } from "@/Store/reducers";
import { Status } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import ProjectEdit from "./ProjectEdit";

export interface ProjectEditForm {
  project_name: string;

  project_description: string;

  project_group_member: number[];

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
  const [projectInfo, setProjectInfo] = useState<GetDetailProjectResponse>();
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const [editProject, { isLoading, isError, error }] = useEditProjectMutation();
  const [getDetailProject] = useGetDetailProjectMutation();

  const project = useSelector((state: RootState) => state.project);
  const token = useSelector((state: RootState) => state.profile.token);
  const handleEditProject = async (formData: ProjectEditForm) => {
    try {
      const response = await editProject({
        token: token,
        id: project.id!,
        data: {
          name: formData.project_name,
          description: formData.project_description,
          startDate: formData.project_start_date,
          endDate: formData.project_end_date,
          status: formData.project_status,
          groups: formData.project_group_member,
        },
      }).unwrap();
      if (response) {
        Toast.success("Edit project successfully", "top");
        dispatch(setProjectId({ id: project.id! }));
        onNavigate(RootScreens.PROJECTDETAIL);
      }
    } catch (err) {
      Toast.error(String(err), "center");
    }
  };

  const fetchProjectInfo = async () => {
    if (project.id) {
      const response = await getDetailProject({
        projectId: project.id,
        token: token,
      }).unwrap();
      if (response) {
        if ("name" in response) {
          setProjectInfo(response);
        } else {
          Toast.error("Không tìm thấy dự án", "center");
        }
      } else {
        Toast.error("Không tìm thấy dự án", "center");
      }
    } else {
      Toast.error("Không tìm thấy dự án", "center");
    }
  };

  useEffect(() => {
    fetchProjectInfo();
  }, [fetchProjectInfo]);

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : project.id ? (
        <ProjectEdit
          project={projectInfo}
          onNavigate={onNavigate}
          onEditProject={handleEditProject}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      ) : (
        <View>
          <Text>Không tìm thấy dự án</Text>
        </View>
      )}
    </>
  );
};

export default ProjectEditContainer;
