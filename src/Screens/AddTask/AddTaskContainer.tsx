import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurGroupProjectId,
  toggleRefetch,
  toggleRefetchProject,
} from "@/Store/reducers";
import { Toast } from "toastify-react-native";
import { ErrorHandle } from "@/Services";
import AddTask, { AddTaskForm } from "./AddTask";
import { useAddTaskMutation } from "@/Services/task";
import {
  useGetMemOfProjectMutation,
  useGetProjectListMutation,
} from "@/Services/projects";
import {
  renderErrorMessageResponse,
  renderSuccessMessageResponse,
} from "@/Utils/Funtions/render";
import { RootState } from "@/Store";

type AddTaskScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ADD_TASK
>;

export const AddTaskContainer: FC<AddTaskScreenNavigatorProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.profile.token);
  const curGroupProjectId = useSelector(
    (state: RootState) => state.group.curGroupProjectId
  );

  const [selectedUsers, setSelectedUsers] = useState<
    { name: string; id: number }[]
  >([]);
  const [userList, setUserList] = useState<any>([]);
  const [projectList, setProjectList] = useState<any>([]);

  const [addTaskApi] = useAddTaskMutation();
  const [getProjectsApi] = useGetProjectListMutation();
  const [getProjectMemberApi] = useGetMemOfProjectMutation();
  const projectId = useSelector((state: RootState) => state.project.id);

  const handleCreateTask = async (formData: AddTaskForm) => {
    try {
      const response = await addTaskApi({
        data: {
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate.toISOString(),
          priority: formData.priority,
          status: formData.status,
          assigneeIds: formData.assigneeIds,
          projectId: formData.projectId,
        },
        token: accessToken,
      }).unwrap();

      if ("id" in response) {
        Toast.success(
          renderSuccessMessageResponse("Thêm nhiệm vụ thành công"),
          "top"
        );
        if (curGroupProjectId) {
          dispatch(toggleRefetch());
        } else {
          dispatch(toggleRefetchProject());
        }
        dispatch(setCurGroupProjectId(null));
        navigation.goBack();
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          renderErrorMessageResponse(String(errorData.data.message)),
          "top"
        );
      }
    }
  };

  const getProjectList = async () => {
    try {
      const response = await getProjectsApi({
        token: accessToken,
      }).unwrap();

      if (Array.isArray(response)) {
        setProjectList(
          response.map((project: any) => ({
            label: project.name,
            value: project.id,
          }))
        );
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          renderErrorMessageResponse(String(errorData.data.message)),
          "top"
        );
      }
    }
  };

  const getProjectMember = async (projectId: number) => {
    try {
      const response = await getProjectMemberApi({
        projectId,
        token: accessToken,
      }).unwrap();

      if (Array.isArray(response)) {
        setUserList(
          response.map((user: any) => ({
            label: user.name,
            value: user.id,
          }))
        );
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          renderErrorMessageResponse(String(errorData.data.message)),
          "top"
        );
      }
    }
  };

  const handleProjectChange = async (projectId: number) => {
    await getProjectMember(projectId);
    setSelectedUsers([]);
  };

  useEffect(() => {
    const initializeData = async () => {
      await getProjectList();
      if (curGroupProjectId) {
        await getProjectMember(curGroupProjectId);
      }
    };

    initializeData();
  }, []);

  return (
    <AddTask
      projectList={projectList}
      userList={userList}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      onCreateTask={handleCreateTask}
      isLoading={false}
      initialProjectId={curGroupProjectId}
      handleProjectChange={handleProjectChange}
      initialProjectID={projectId}
    />
  );
};

export default AddTaskContainer;
