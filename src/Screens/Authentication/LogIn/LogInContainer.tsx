import { RootStackParamList } from "@/Navigation";
import { useLogInMutation } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootScreens } from "../..";
import LogIn from "./LogIn";

export interface LogInForm {
  email: string;
  password: string;
}

type LogInScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;
export const LogInContainer = ({ navigation }: LogInScreenNavigatorProps) => {
  const [logIn, { isLoading, isError, error }] = useLogInMutation();
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const handleLogIn = async (formData: LogInForm) => {
    try {
      const response = await logIn({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      if (response) {
        onNavigate(RootScreens.MAIN);
      }
    } catch (err) {
      console.log("Error logging in:", err);
    }
  };

  return (
    <LogIn
      onNavigate={onNavigate}
      onLogIn={handleLogIn}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};
