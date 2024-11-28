import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from "react-native";
import { Button } from "native-base";
import { RootScreens } from "..";

export const Onboarding2 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <Pressable onPress={() => props.onNavigate(RootScreens.MAIN)}>
      <ImageBackground source={require('assets/bg1.png')}  resizeMode="cover" className="flex items-center justify-center w-full h-full">
        <Image
            className="w-[400px] h-[400px] object-cover"
            source={require('assets/light-logo.png')}
          />
          
          <Text className='text-xl text-white font-bold'>Hello</Text>
          <Button onPress={() => props.onNavigate(RootScreens.MAIN)}>
            {i18n.t(LocalizationKey.START)}
          </Button>
      </ImageBackground>
    </Pressable>
    
  );
};
