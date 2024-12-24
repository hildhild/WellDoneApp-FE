import React from "react";
import { EditTask } from "./EditTask";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type EditTaskScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.EDIT_TASK
>;

export const EditTaskContainer = ({
  navigation,
}: EditTaskScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <EditTask onNavigate={onNavigate} />;
};
