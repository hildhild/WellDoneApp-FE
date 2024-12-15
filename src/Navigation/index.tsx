import {
  AccountContainer,
  DashboardContainer,
  GroupContainer,
  Onboarding1Container,
  Onboarding2Container,
  Onboarding3Container,
  OtherContainer,
  ProjectContainer,
  RootScreens,
} from "@/Screens";
import ForgotPasswordContainer from "@/Screens/Authentication/ForgotPassword/ForgotPasswordContainer";
import LogInContainer from "@/Screens/Authentication/LogIn/LogInContainer";
import ResetPasswordContainer from "@/Screens/Authentication/ResetPassword/ResetPasswordContainer";
import SignUpContainer from "@/Screens/Authentication/SignUp/SignUpContainer";
import VerificationContainer from "@/Screens/Authentication/Verification/VerificationContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import ToastManager from "toastify-react-native";
import { MainNavigator } from "./Main";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.FORGOT_PASSWORD]: undefined;
  [RootScreens.RESET_PASSWORD]: undefined;
  [RootScreens.ONBOARDING1]: undefined;
  [RootScreens.ONBOARDING2]: undefined;
  [RootScreens.ONBOARDING3]: undefined;
  [RootScreens.VERIFY_MAIL]: undefined;
  [RootScreens.ACCOUNT]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const getTabBarStyle = (route: any) => {
  const routeName = route.state?.routes[route.state.index]?.name ?? "";
  if (routeName === "Account") {
    return { display: "flex" }; // Hiển thị tab bar
  }
  return { display: "none" }; // Ẩn tab bar
};

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <ToastManager width="auto" style={{ paddingRight: 20 }} />
      <StatusBar />
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={RootScreens.ONBOARDING1}
      >
        <RootStack.Screen
          name={RootScreens.ONBOARDING1}
          component={Onboarding1Container}
        />
        <RootStack.Screen
          name={RootScreens.ONBOARDING2}
          component={Onboarding2Container}
        />
        <RootStack.Screen
          name={RootScreens.ONBOARDING3}
          component={Onboarding3Container}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LogInContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.SIGNUP}
          component={SignUpContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.FORGOT_PASSWORD}
          component={ForgotPasswordContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.RESET_PASSWORD}
          component={ResetPasswordContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.VERIFY_MAIL}
          component={VerificationContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.ACCOUNT}
          component={AccountContainer}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
