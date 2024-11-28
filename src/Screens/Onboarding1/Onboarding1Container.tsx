import React from "react";
import { Onboarding1 } from "./Onboarding1";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type Onboarding1ScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING1
>;

export const Onboarding1Container = ({
  navigation,
}: Onboarding1ScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding1 onNavigate={onNavigate} />;
};
