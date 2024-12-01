import { RootStackParamList } from "@/Navigation";
import { useSignUpMutation } from "@/Services/users";
import { setUser } from "@/Store/reducers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
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

const SignUpContainer = ({ navigation }: SignUpScreenNavigatorProps) => {
  const dispatch = useDispatch();
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();

  const handleSignUp = useCallback(
    async (formData: SignUpForm) => {
      const signUpData = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      };
      try {
        const response = await signUp(signUpData).unwrap();
        if (response) {
          dispatch(
            setUser({
              email: formData.email,
            })
          );
          onNavigate(RootScreens.VERIFY_MAIL);
        }
      } catch (err) {
        console.log("An error occurred:", err);
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
