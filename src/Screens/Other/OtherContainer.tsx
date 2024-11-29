import React from "react";
import { Other } from "./Other";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type OtherScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

export const OtherContainer = ({
  navigation,
}: OtherScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return <Other onNavigate={onNavigate}/>;
};
