import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Button } from "native-base";
import { RootScreens } from "..";

export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  return (
    <ImageBackground source={require('assets/bg1.png')}>
      <View className="flex items-center justify-end w-full h-full">
        <Text className='text-xl text-white font-bold'>{i18n.t(LocalizationKey.WELCOME)}</Text>
        <Button onPress={() => props.onNavigate(RootScreens.MAIN)}>
          {i18n.t(LocalizationKey.START)}
        </Button>
      </View>
    </ImageBackground>
  );
};
