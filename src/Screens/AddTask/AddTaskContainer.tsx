import React from "react";
import { AddTask } from "./AddTask";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type AddTaskScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ADD_TASK
>;

export const AddTaskContainer = ({
  navigation,
}: AddTaskScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <AddTask onNavigate={onNavigate} />;
};
