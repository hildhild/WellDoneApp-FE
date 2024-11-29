import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from "react-native";
import { Button } from "native-base";
import { RootScreens } from "@/Screens";
import { isAction } from "@reduxjs/toolkit";
import Icon from "react-native-vector-icons/FontAwesome";

type MenuItem = {
  iconName: string;
  title: string;
  navigateTo: RootScreens;
  isActive: boolean; 
};


export const Navbar = (props: {
  page: string
  onNavigate: (string: RootScreens) => void;
}) => {
  const menus: MenuItem[] = [
    {
      iconName: "home",
      title: "Tổng quan",
      navigateTo: RootScreens.MAIN,
      isActive: props.page === "Tổng quan"
    },
    {
      iconName: "folder",
      title: "Dự án",
      navigateTo: RootScreens.MAIN,
      isActive: props.page === "Dự án"
    },
    {
      iconName: "dashboard",
      title: "Bảng điều khiển",
      navigateTo: RootScreens.MAIN,
      isActive: props.page === "Bảng điều khiển"
    },
    {
      iconName: "group",
      title: "Nhóm",
      navigateTo: RootScreens.MAIN,
      isActive: props.page === "Nhóm"
    },
    {
      iconName: "bars",
      title: "Khác",
      navigateTo: RootScreens.MAIN,
      isActive: props.page === "Khác"
    }
  ]

  return (
    <View className="absolute bottom-0 w-full bg-lime-600 h-24 pb-5 rounded-t-3xl flex flex-row">
      {
        menus.map(menu => 
          <Pressable className="w-[20%] flex justify-center items-center" key={menu.title} onPress={() => {props.onNavigate(menu.navigateTo)}}>
            <Icon name={menu.iconName} size={25} color={menu.isActive ? "#fff" : "#A3A3A3"}/>
            {/* <Text className={`text-[9px] ${menu.isActive ? "text-[#fff]" : "text-[#A3A3A3]"} mt-2 text-center`}>{menu.title}</Text> */}
          </Pressable>
        )
      }
    </View>
  );
};
