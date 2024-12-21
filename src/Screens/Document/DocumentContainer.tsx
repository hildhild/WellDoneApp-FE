import React from "react";
import { Document } from "./Document";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type DocumentScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DOCUMENT
>;

export const DocumentContainer = ({
  navigation,
}: DocumentScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Document onNavigate={onNavigate} />;
};
