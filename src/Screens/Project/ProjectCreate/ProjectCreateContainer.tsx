import ProjectCreate from "./ProjectCreate";
import { ProjectEditForm } from "../ProjectEdit/ProjectEditContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import React, { FC, memo, useCallback } from "react";
import { useCreateProjectMutation } from "@/Services/projects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import { Toast } from "toastify-react-native";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { ErrorHandle } from "@/Services";
import { setProjectId } from "@/Store/reducers";
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
  const dispatch = useDispatch();
  const handleCreateProject = useCallback(
    async (formData: ProjectCreateForm) => {
      try {
        console.log(formData);
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
        }).unwrap();
        console.log(response);
        if (response && "id" in response) {
          dispatch(setProjectId({ id: response.id }));
          onNavigate(RootScreens.PROJECTDETAIL);
        }
      } catch (err) {
        console.log(err);
        if (err && typeof err === "object" && "data" in err) {
          const errorData = err as ErrorHandle;
          Toast.error(
            renderErrorMessageResponse(String(errorData.data.message)),
            "top"
          );
        }
      }
    },
    [createProject]
  );
  return (
    <ProjectCreate
      onNavigate={onNavigate}
      onCreateProject={handleCreateProject}
    />
  );
};
export default memo(ProjectCreateContainer);
