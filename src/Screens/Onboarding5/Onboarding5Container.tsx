import React from "react";
import { Onboarding5 } from "./Onboarding5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type Onboarding5ScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING5
>;

export const Onboarding5Container = ({
  navigation,
}: Onboarding5ScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding5 onNavigate={onNavigate} />;
};
