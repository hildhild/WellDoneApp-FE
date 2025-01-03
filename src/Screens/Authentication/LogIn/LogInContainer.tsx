import { RootStackParamList } from "@/Navigation";
import { ErrorHandle, useLogInMutation } from "@/Services";
import { useGetProfileMutation, useGetUserListMutation } from "@/Services/profile";
import { setGroupList, setProfile, setProjectList, setToken, setUserList } from "@/Store/reducers";
import {
  renderErrorMessageResponse,
  renderSuccessMessageResponse,
} from "@/Utils/Funtions/render";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "../..";
import LogIn from "./LogIn";
import { useGetGroupsMutation } from "@/Services/group";
import { useGetProjectListMutation } from "@/Services/projects";

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
  const [getUserList] = useGetUserListMutation();
  const [getGroups] = useGetGroupsMutation();
  const [getProjectsApi] = useGetProjectListMutation();
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
              id: profileResponse.id,
              name: profileResponse.name,
              dateOfBirth: profileResponse.dateofbirth,
              email: profileResponse.email,
            })
          );
        }
        try {
          const groupsResponse = await getGroups(
            response.access_token
          ).unwrap();
          if (Array.isArray(groupsResponse)) {
            dispatch(
              setGroupList(groupsResponse)
            );
          }
        } catch (err) {
          if (err && typeof err === "object" && "data" in err) {
            const errorData = err as ErrorHandle;
            if (String(errorData.data.message) === "Groups not found"){
              dispatch(
                setGroupList([])
              );
            }
            else {
              Toast.error(
                String(errorData.data.message),
                "top"
              );
            }
          }
        }
        const userListRes = await getUserList(
          response.access_token
        ).unwrap();
        if (Array.isArray(userListRes)) {
          dispatch(
            setUserList(userListRes)
          );
        }
        const projectListRes = await getProjectsApi(
          {
            token: response.access_token
          }
        ).unwrap();
        if (Array.isArray(projectListRes)) {
          dispatch(
            setProjectList(projectListRes)
          );
        }
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          String(errorData.data.message),
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
