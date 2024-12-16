import { RootStackParamList } from "@/Navigation";
import { ErrorHandle, useLogInMutation } from "@/Services";
import { useGetProfileMutation } from "@/Services/profile";
import { setProfile, setToken } from "@/Store/reducers";
import {
  renderErrorMessageResponse,
  renderSuccessMessageResponse,
} from "@/Utils/Funtions/render";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
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

const LogInContainer = ({ navigation }: LogInScreenNavigatorProps) => {
  const [logIn, { isLoading, isError, error }] = useLogInMutation();
  const [getProfile] = useGetProfileMutation();
  const dispatch = useDispatch();
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
        Toast.success(
          renderSuccessMessageResponse("Đăng nhập thành công !~🔥🌸")
        );
        onNavigate(RootScreens.MAIN);
        dispatch(setToken(response.access_token));
        const profileResponse = await getProfile(
          response.access_token
        ).unwrap();
        if ("name" in profileResponse) {
          dispatch(
            setProfile({
              name: profileResponse.name,
              dateOfBirth: profileResponse.dateofbirth,
              email: profileResponse.email,
            })
          );
        }
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          renderErrorMessageResponse(String(errorData.data.message)),
          "top"
        );
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
