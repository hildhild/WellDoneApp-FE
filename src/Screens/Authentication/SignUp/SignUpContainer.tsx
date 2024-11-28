import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootScreens } from "../..";
import SignUp from "./SignUp";

export interface SignUpForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignUpScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SIGNUP
>;

export const SignUpContainer = ({ navigation }: SignUpScreenNavigatorProps) => {
  const handleSignUp = (formData: SignUpForm) => {
    console.log("Received form data in SignUpContainer:", formData);
    navigation.navigate(RootScreens.LOGIN);
  };

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <SignUp onNavigate={onNavigate} onSignUp={handleSignUp} />;
};
