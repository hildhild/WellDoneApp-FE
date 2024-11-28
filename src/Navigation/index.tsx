import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { RootScreens, Onboarding1Container, Onboarding2Container, Onboarding3Container, Onboarding4Container, Onboarding5Container } from "@/Screens";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.ONBOARDING1]: undefined;
  [RootScreens.ONBOARDING2]: undefined;
  [RootScreens.ONBOARDING3]: undefined;
  [RootScreens.ONBOARDING4]: undefined;
  [RootScreens.ONBOARDING5]: undefined;

};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
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
          name={RootScreens.ONBOARDING4}
          component={Onboarding4Container}
        />
        <RootStack.Screen
          name={RootScreens.ONBOARDING5}
          component={Onboarding5Container}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
