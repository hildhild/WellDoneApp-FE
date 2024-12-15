import { RootStackParamList } from "@/Navigation";
import { ErrorHandle, useResetPasswordMutation } from "@/Services";
import { RootState } from "@/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootScreens } from "../../";
import ResetPassword from "./ResetPassword";
import { Toast } from "toastify-react-native";
import {
  renderErrorMessageResponse,
  renderSuccessMessageResponse,
} from "@/Utils/Funtions/render";

type ResetPasswordScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.RESET_PASSWORD
>;
export interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
  code: string;
}

const ResetPasswordContainer = ({
  navigation,
}: ResetPasswordScreenNavigatorProps) => {
  const { email } = useSelector((state: RootState) => state.user);
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const handleResetPassword = useCallback(
    async (formData: ResetPasswordForm) => {
      try {
        if (email) {
          const response = await resetPassword({
            email: email,
            newPassword: formData.password,
            code: formData.code,
          }).unwrap();
          if (!("error" in response)) {
            Toast.success(
              renderSuccessMessageResponse(response.message),
              "center"
            );
            onNavigate(RootScreens.LOGIN);
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
    },
    [resetPassword]
  );

  return (
    <ResetPassword
      onNavigate={onNavigate}
      onResetPassword={handleResetPassword}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default memo(ResetPasswordContainer);
