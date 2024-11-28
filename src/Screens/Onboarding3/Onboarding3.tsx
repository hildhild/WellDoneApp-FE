import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from "react-native";
import { Button } from "native-base";
import { RootScreens } from "..";

export const Onboarding3 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <View className="bg-white flex items-center justify-center w-full h-full">
      <Text className="text-4xl font-bold px-10 text-center">Bắt đầu hành trình cùng WellDone!</Text>
      <Image
        className="w-[300px] h-[300px] object-cover"
        source={require('assets/dark-logo.png')}
      />
      <Button className="w-[300px] !rounded-full mb-5 !bg-lime-600" onPress={() => props.onNavigate(RootScreens.LOGIN)}>
        <Text className="text-white font-semibold">Đăng nhập</Text>
      </Button>
      <Button className="w-[300px] !rounded-full !bg-white !border-lime-600 border-[1px] !text-lime-600" onPress={() => props.onNavigate(RootScreens.SIGNUP)}>
        <Text className="text-lime-600 font-semibold">Đăng ký</Text>
      </Button>
    </View>
    
  );
};
