import {
  AccountContainer,
  DashboardContainer,
  GroupContainer,
  GroupDetailContainer,
  Onboarding1Container,
  Onboarding2Container,
  Onboarding3Container,
  OtherContainer,
  ProjectContainer,
  AddGroupContainer,
  RootScreens,
  DocumentContainer
} from "@/Screens";
import ForgotPasswordContainer from "@/Screens/Authentication/ForgotPassword/ForgotPasswordContainer";
import LogInContainer from "@/Screens/Authentication/LogIn/LogInContainer";
import ResetPasswordContainer from "@/Screens/Authentication/ResetPassword/ResetPasswordContainer";
import SignUpContainer from "@/Screens/Authentication/SignUp/SignUpContainer";
import VerificationContainer from "@/Screens/Authentication/Verification/VerificationContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import ToastManager from "toastify-react-native";
import { MainNavigator } from "./Main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import NotificationContainer from "@/Screens/Notification/NotificationContainer";
import ProjectDetailContainer from "@/Screens/Project/ProjectDetail/ProjectDetailContainer";
import ProjectEditContainer from "@/Screens/Project/ProjectEdit/ProjectEditContainer";
import ProjectCreateContainer from "@/Screens/Project/ProjectCreate/ProjectCreateContainer";

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
  [RootScreens.NOTIFICATION]: undefined;
  [RootScreens.PROJECTDETAIL]: undefined;
  [RootScreens.PROJECTEDIT]: undefined;
  [RootScreens.GROUP_DETAIL]: undefined;
  [RootScreens.ADD_GROUP]: undefined;
  [RootScreens.PROJECTCREATE]: undefined;
  [RootScreens.DOCUMENT]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// const getTabBarStyle = (route: any) => {
//   const routeName = route.state?.routes[route.state.index]?.name ?? "";
//   if (routeName === "Account") {
//     return { display: "flex" }; // Hiển thị tab bar
//   }
//   return { display: "none" }; // Ẩn tab bar
// };

// @refresh reset
const ApplicationNavigator = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    useState<boolean>(false);
  const accessToken = useSelector((state: any) => state.profile.token);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem("onboardingCompleted");
      if (completed === "true") {
        setIsOnboardingCompleted(true);
      }
    };
    checkOnboarding();
  }, []);

  return (
    <NavigationContainer>
      <ToastManager width="auto" style={{ paddingRight: 20 }} />
      <StatusBar />
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          isOnboardingCompleted
            ? RootScreens.ONBOARDING3
            : accessToken
            ? RootScreens.MAIN
            : RootScreens.ONBOARDING1
        }
      >
        {!isOnboardingCompleted && (
          <>
            <RootStack.Screen
              name={RootScreens.ONBOARDING1}
              component={Onboarding1Container}
            />
            <RootStack.Screen
              name={RootScreens.ONBOARDING2}
              component={Onboarding2Container}
            />
          </>
        )}

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
        <RootStack.Screen
          name={RootScreens.NOTIFICATION}
          component={NotificationContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.PROJECTDETAIL}
          component={ProjectDetailContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.PROJECTEDIT}
          component={ProjectEditContainer}
        />
        <RootStack.Screen
          name={RootScreens.GROUP_DETAIL}
          component={GroupDetailContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.ADD_GROUP}
          component={AddGroupContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.PROJECTCREATE}
          component={ProjectCreateContainer}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.DOCUMENT}
          component={DocumentContainer}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
