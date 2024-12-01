import React from "react";
import { Account } from "./Account";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type AccountScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ACCOUNT
>;

export const AccountContainer = ({
  navigation,
}: AccountScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Account onNavigate={onNavigate} />;
};
