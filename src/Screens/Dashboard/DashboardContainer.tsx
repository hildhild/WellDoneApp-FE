import { Dashboard } from "./Dashboard";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type DashboardScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const DashboardContainer = ({ navigation }: DashboardScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Dashboard onNavigate={onNavigate}/>;
};
