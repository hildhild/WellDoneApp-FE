import React from "react";
import { Onboarding2 } from "./Onboarding2";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type Onboarding2ScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING2
>;

export const Onboarding2Container = ({
  navigation,
}: Onboarding2ScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Onboarding2 onNavigate={onNavigate} />;
};
