import React, { FC, memo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "../..";
import ForgotPassword from "./ForgotPassword";

export interface ForgotPasswordForm {
  email: string;
}

type ForgotPasswordScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.FORGOT_PASSWORD
>;

export const ForgotPasswordContainer = ({
  navigation,
}: ForgotPasswordScreenNavigatorProps) => {
  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    console.log("Received form data in ForgotPasswordContainer:", formData);
    navigation.navigate(RootScreens.RESET_PASSWORD);
  };

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <ForgotPassword onNavigate={onNavigate} onForgotPassword={handleForgotPassword} />;
};
