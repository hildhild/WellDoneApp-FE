import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from "react-native";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { removeToken } from "@/Store/reducers";
import { Toast } from "toastify-react-native";

const MyIcon = Icon as unknown as React.ComponentType<any>;

type MenuItem = {
  iconName: string;
  title: string;
  pressFunc: () => void;
};

export const Other = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeToken());
    props.onNavigate(RootScreens.LOGIN);
    Toast.success("Đăng xuất thành công");
  }

  const otherMenus: MenuItem[][]= [
    [
      {
        iconName: "user",
        title: "Tài khoản",
        pressFunc: () => props.onNavigate(RootScreens.ACCOUNT)

      },
      {
        iconName: "bell",
        title: "Thông báo",
        pressFunc: () => props.onNavigate(RootScreens.NOTIFICATION)
      },
    ],
    [
      {
        iconName: "globe",
        title: "Ngôn ngữ",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
      {
        iconName: "moon-o",
        title: "Chủ đề",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
    ],
    [
      {
        iconName: "download",
        title: "Xuất dữ liệu",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
      {
        iconName: "refresh",
        title: "Đồng bộ dữ liệu",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
    ],
    [
      {
        iconName: "question-circle",
        title: "Trợ giúp",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
      {
        iconName: "file-text",
        title: "Điều khoản bảo mật",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
      {
        iconName: "check-circle",
        title: "Chính sách bảo mật",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
      {
        iconName: "star",
        title: "Đánh giá ứng dụng",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
      {
        iconName: "info-circle",
        title: "Giới thiệu",
        pressFunc: () => props.onNavigate(RootScreens.MAIN)
      },
    ],
    [
      {
        iconName: "sign-out",
        title: "Đăng xuất",
        pressFunc: handleLogout
      },
    ],
  ]

  return (
    <View className="bg-neutral-300 w-full h-full relative">
      <View className="bg-white w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Khác</Text>
      </View>
      {
        otherMenus.map((menu, index) => <View key={index}>
          {
            menu.map((submenu, index) => <Pressable key={index} className="relative bg-white w-full h-[47px] flex-row flex items-center px-10 border-b-[1px] border-neutral-300" onPress={submenu.pressFunc}>
              <MyIcon name={submenu.iconName} size={25} color={`${submenu.title === "Đăng xuất" ? "#DC2626" : "#65A30D"}`}/>
              <Text className={`absolute left-24 text-2xl ${submenu.title === "Đăng xuất" ? "text-[#DC2626]" : "text-black"}`}>{submenu.title}</Text>
            </Pressable>)
          }
          <View className="bg-neutral-300 h-5"></View>
        </View>)
      }
    </View>
    
  );
};