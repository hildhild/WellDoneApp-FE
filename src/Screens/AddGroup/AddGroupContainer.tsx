import React from "react";
import { AddGroup } from "./AddGroup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type AddGroupScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ADD_GROUP
>;

export const AddGroupContainer = ({
  navigation,
}: AddGroupScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <AddGroup onNavigate={onNavigate} />;
};
