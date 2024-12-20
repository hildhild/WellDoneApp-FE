import React from "react";
import { GroupDetail } from "./GroupDetail";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type GroupDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.GROUP_DETAIL
>;

export const GroupDetailContainer = ({
  navigation,
}: GroupDetailScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <GroupDetail onNavigate={onNavigate} />;
};
