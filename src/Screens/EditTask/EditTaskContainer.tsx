import { RootStackParamList } from "@/Navigation";
import { ErrorHandle } from "@/Services";
import {
  useGetMemOfProjectMutation,
  useGetProjectListMutation,
} from "@/Services/projects";
import { useEditTaskMutation } from "@/Services/task";
import {
  setCurGroupProjectId,
  setCurTask,
  toggleRefetch,
  toggleRefetchProject,
} from "@/Store/reducers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "..";
import { EditTask } from "./EditTask";
import { FormData } from "./EditTask";

type EditTaskScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.EDIT_TASK
>;

interface User {
  id: number;
  name: string;
}

export const EditTaskContainer = ({
  navigation,
}: EditTaskScreenNavigatorProps) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.profile.token);
  const curGroupProjectId = useSelector(
    (state: any) => state.group.curGroupProjectId
  );
  const task = useSelector((state: any) => state.task.curTask);

  const [userList, setUserList] = useState<
    Array<{ label: string; value: number }>
  >([]);
  const [projectList, setProjectList] = useState<
    Array<{ label: string; value: number }>
  >([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    task?.assignees.map((user: any) => ({
      name: user.name,
      id: user.id,
    })) || []
  );

  const [editTaskApi, { isLoading: editLoading }] = useEditTaskMutation();
  const [getProjectsApi, { isLoading: getLoading }] =
    useGetProjectListMutation();
  const [getProjectMemberApi, { isLoading: getMemberLoading }] =
    useGetMemOfProjectMutation();

  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate || "",
      priority: task?.priority || "MEDIUM",
      status: task?.status || "TODO",
      assigneeIds: task?.assignees.map((user: any) => user.id) || [],
      projectId: curGroupProjectId || task?.projectId || 0,
    },
  });

  const projectId = watch("projectId");

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
        Toast.error(String(errorData.data.message), "top");
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
        Toast.error(String(errorData.data.message), "top");
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await editTaskApi({
        data: {
          ...data,
          dueDate: data.dueDate,
        },
        token: accessToken,
        taskId: task.id,
      }).unwrap();

      if ("id" in response) {
        Toast.success("Chỉnh sửa thành công");
        if (curGroupProjectId) {
          dispatch(toggleRefetch());
        } else {
          dispatch(toggleRefetchProject());
        }
        dispatch(setCurGroupProjectId(null));
        dispatch(setCurTask(response));
        navigation.goBack();
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(String(errorData.data.message), "top");
      }
    }
  };

  const handleUserSelection = (user: { label: string; value: number }) => {
    const isUserSelected = selectedUsers.some(
      (selected) => selected.id === user.value
    );
    if (isUserSelected) {
      Toast.error("Thành viên đã được chọn");
      return;
    }

    const newUser = { name: user.label, id: user.value };
    setSelectedUsers([...selectedUsers, newUser]);
    const currentAssigneeIds = watch("assigneeIds");
    setValue("assigneeIds", [...currentAssigneeIds, user.value]);
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
    const currentAssigneeIds = watch("assigneeIds");
    setValue(
      "assigneeIds",
      currentAssigneeIds.filter((id) => id !== userId)
    );
  };

  useEffect(() => {
    getProjectList();
    if (projectId) {
      getProjectMember(projectId);
    }
  }, [projectId]);

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return (
    <EditTask
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      userList={userList}
      projectList={projectList}
      selectedUsers={selectedUsers}
      onUserSelection={handleUserSelection}
      onUserRemove={handleRemoveUser}
      isLoading={editLoading || getLoading || getMemberLoading}
      onNavigate={onNavigate}
      onBack={() => navigation.goBack()}
    />
  );
};
