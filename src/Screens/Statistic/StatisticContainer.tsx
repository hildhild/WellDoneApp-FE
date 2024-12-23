import React from "react";
import { Statistic } from "./Statistic";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type StatisticScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.STATISTIC
>;

export const StatisticContainer = ({
  navigation,
}: StatisticScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Statistic onNavigate={onNavigate} />;
};
