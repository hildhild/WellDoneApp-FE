import { RootStackParamList } from "@/Navigation";
import { ErrorHandle, useLogInMutation } from "@/Services";
import { renderErrorMessageResponse, renderSuccessMessageResponse } from "@/Utils/Funtions/render";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store"; // Import SecureStore
import React, { memo } from "react";
import { Toast } from "toastify-react-native";
import { RootScreens } from "../..";
import LogIn from "./LogIn";

export interface LogInForm {
  email: string;
  password: string;
}

type LogInScreenNavigatorProps = NativeStackScreenProps<RootStackParamList, RootScreens.LOGIN>;

const LogInContainer = ({ navigation }: LogInScreenNavigatorProps) => {
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
      if ("access_token" in response) {
        await SecureStore.setItemAsync("access_token", response.access_token);
        await SecureStore.setItemAsync("user", JSON.stringify(response.user));

        Toast.success(renderSuccessMessageResponse("Đăng nhập thành công !~🔥🌸"));
        onNavigate(RootScreens.MAIN);
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(renderErrorMessageResponse(String(errorData.data.message)), "top");
      }
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

export default memo(LogInContainer);
