import React, { memo } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import HeaderBackground from "assets/LogIn/HeaderBackground";
import LogoWellDone from "assets/LogoWellDone";
import AntDesign from "react-native-vector-icons/AntDesign";

const LogIn = () => {
  return (
    <View className="flex-1 bg-white items-center px-5 pt-12">
      <HeaderBackground className="w-32 h-32 mb-8" />
      <LogoWellDone className="w-32 h-32 mb-8" />
      <Text className="text-center text-neutral-700 text-body-base-medium mb-8">
        Đăng nhập vào tài khoản WellDone của bạn
      </Text>

      <View className="w-full mb-4">
        <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
          <AntDesign name="user" size={16} color="black" />
          <TextInput
            placeholder="Tên tài khoản"
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

      <TouchableOpacity className="self-end mb-5">
        <Text className="text-body-small-bold text-neutral-700">Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-primary-600 rounded-lg w-52 h-14 py-2 px-4 mb-5 justify-center">
        <Text className="text-center text-neutral-100 font-bold text-body-base-bold">
          Đăng nhập
        </Text>
      </TouchableOpacity>

      
      <View className="flex-row">
        <Text className="text-neutral-700 text-body-base-medium">Chưa có tài khoản? </Text>
        <TouchableOpacity>
          <Text className="text-neutral-700 text-body-base-bold">Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(LogIn);
