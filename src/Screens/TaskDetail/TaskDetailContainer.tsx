import React from "react";
import { TaskDetail } from "./TaskDetail";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type TaskDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.TASK_DETAIL
>;

export const TaskDetailContainer = ({
  navigation,
}: TaskDetailScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <TaskDetail onNavigate={onNavigate} />;
};
