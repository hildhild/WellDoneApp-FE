import React from "react";
import { Onboarding4 } from "./Onboarding4";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type Onboarding4ScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING4
>;

export const Onboarding4Container = ({
  navigation,
}: Onboarding4ScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding4 onNavigate={onNavigate} />;
};
