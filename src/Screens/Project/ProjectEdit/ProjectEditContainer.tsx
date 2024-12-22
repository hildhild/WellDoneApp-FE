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
import { renderSuccessMessageResponse } from "@/Utils/Funtions/render";

// Type for the form data when editing the project
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
  const [projectInfo, setProjectInfo] =
    useState<GetDetailProjectResponse | null>(null);

  const { id: projectId } = useSelector((state: RootState) => state.project);
  const token = useSelector((state: RootState) => state.profile.token);

  const [editProject, { isLoading: isEditing, error: editError }] =
    useEditProjectMutation();
  const [getDetailProject] = useGetDetailProjectMutation();

  const handleEditProject = async (formData: ProjectEditForm) => {
    try {
      const response = await editProject({
        token,
        id: projectId!,
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
        Toast.success(renderSuccessMessageResponse(), "top");
        dispatch(setProjectId({ id: projectId! }));
        navigation.navigate(RootScreens.PROJECTDETAIL);
      }
    } catch (err) {
      Toast.error(String(err), "center");
    }
  };

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
  }, [fetchProjectInfo]);

  const renderContent = () => {
    if (isEditing) return <Text>Loading...</Text>;

    if (!projectId || !projectInfo)
      return (
        <>
          <View className="flex justify-center items-center h-full">
            <Text className="p-16 text-center ">
              Không tìm thấy dự án. Vui lòng thử lại.
            </Text>
          </View>
        </>
      );

    return (
      <ProjectEdit
        project={projectInfo}
        onNavigate={navigation.navigate}
        onEditProject={handleEditProject}
        isLoading={isEditing}
        isError={editError !== undefined}
        error={editError}
      />
    );
  };

  return <>{renderContent()}</>;
};

export default ProjectEditContainer;
