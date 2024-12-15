import { RootStackParamList } from "@/Navigation";
import { ErrorHandle, ErrorResponse, useSignUpMutation } from "@/Services/users";
import { setUser } from "@/Store/reducers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { RootScreens } from "../..";
import SignUp from "./SignUp";
import { Toast } from "toastify-react-native";
import {
  renderErrorMessageResponse,
  renderSuccessMessageResponse,
} from "@/Utils/Funtions/render";

export interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignUpScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SIGNUP
>;

const SignUpContainer = ({ navigation }: SignUpScreenNavigatorProps) => {
  const dispatch = useDispatch();
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();

  const handleSignUp = useCallback(
    async (formData: SignUpForm) => {
      const signUpData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      try {
        const response = await signUp(signUpData).unwrap();
        if ("verificationEmailSent" in response) {
          dispatch(setUser({ email: formData.email }));
          if (response.message) {
            Toast.success(
              renderSuccessMessageResponse(response.message),
              "top"
            );
          }
          onNavigate(RootScreens.VERIFY_MAIL);
        } else {
          Toast.error(renderErrorMessageResponse(response.message), "top");
        }
      } catch (err) {
        if (err && typeof err === "object" && "data" in err) {
          const errorData = err as ErrorHandle;
          Toast.error(renderErrorMessageResponse(String(errorData.data.message)), "top");
        }
      }
    },
    [dispatch, navigation, signUp]
  );
  

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return (
    <SignUp
      onNavigate={onNavigate}
      onSignUp={handleSignUp}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};

export default memo(SignUpContainer);
