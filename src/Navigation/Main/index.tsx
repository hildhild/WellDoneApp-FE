import React from "react";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardContainer, GroupContainer, HomeContainer, OtherContainer, ProjectContainer } from "@/Screens";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Navbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View className="absolute bottom-0 w-full bg-lime-600 h-24 pb-5 rounded-t-3xl flex flex-row">
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable 
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              className="w-[20%] flex justify-center items-center"
            >
              <Icon name={label} size={25} color={isFocused ? "#fff" : "#A3A3A3"}/>
            </Pressable>
          );
        }
      )}
    </View>
  );
}

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props: BottomTabBarProps) => <Navbar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="home" component={HomeContainer} />
      <Tab.Screen name="folder" component={ProjectContainer} />
      <Tab.Screen name="dashboard" component={DashboardContainer} />
      <Tab.Screen name="group" component={GroupContainer} />
      <Tab.Screen name="bars" component={OtherContainer} />
    </Tab.Navigator>
  );
};
