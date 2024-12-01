import { RootStackParamList } from "@/Navigation";
import { useResetPasswordMutation } from "@/Services";
import { RootState } from "@/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootScreens } from "../../";
import ResetPassword from "./ResetPassword";

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
          if (response) {
            onNavigate(RootScreens.LOGIN);
          }
        }
      } catch (err) {
        console.log("An error occurred:", err);
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
