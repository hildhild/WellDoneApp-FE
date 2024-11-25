import React, { FC, memo } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { RootScreens } from "@/Screens";
import AntDesign from "react-native-vector-icons/AntDesign";
interface SignUpProps {
  onNavigate: (screen: RootScreens) => void;
}
const SignUp: FC<SignUpProps> = ({ onNavigate }) => {
  return (
    <View className="flex-1 bg-white items-center px-5 pt-12">
      \
      <Text className="text-center text-neutral-700 text-body-base-medium mb-8">
        Đăng ký tài khoản WellDone của bạn
      </Text>
      <View className="w-full mb-4">
        <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
          <AntDesign name="user" size={16} color="black" />
          <TextInput
            placeholder="Tên tài khoản"
            className="flex-1 text-neutral-700 text-body-base-regular"
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
          <AntDesign name="mail" size={16} color="black" />
          <TextInput
            placeholder="Email"
            className="flex-1 text-neutral-700 text-body-base-regular"
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3">
          <AntDesign name="lock" size={16} color="black" />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            className="flex-1 text-neutral-700 text-body-base-regular"
          />
        </View>
      </View>
      <TouchableOpacity
        className="bg-primary-600 rounded-lg w-52 h-14 py-2 px-4 mb-5 justify-center"
        onPress={() => onNavigate(RootScreens.MAIN)}
      >
        <Text className="text-center text-neutral-100 font-bold text-body-base-bold">
          Đăng ký
        </Text>
      </TouchableOpacity>
      <View className="flex-row">
        <Text className="text-neutral-700 text-body-base-medium">
          Đã có tài khoản?{" "}
        </Text>
        <TouchableOpacity onPress={() => onNavigate(RootScreens.LOGIN)}>
          <Text className="text-neutral-700 text-body-base-bold">
            Đăng nhập ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(SignUp);