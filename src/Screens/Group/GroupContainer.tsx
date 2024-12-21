import { Group } from "./Group";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";


type GroupScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const GroupContainer = ({ navigation }: GroupScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Group onNavigate={onNavigate}/>;
};
