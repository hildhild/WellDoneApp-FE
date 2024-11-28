import React from "react";
import { Onboarding3 } from "./Onboarding3";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type Onboarding3ScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING3
>;

export const Onboarding3Container = ({
  navigation,
}: Onboarding3ScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding3 onNavigate={onNavigate} />;
};
