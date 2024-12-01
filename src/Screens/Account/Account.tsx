import React, { useState } from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable, TouchableOpacity, TextInput } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Controller } from "react-hook-form";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Toast } from "toastify-react-native";


export const Account = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const [editable, setEditable] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleEditProfile = () => {
    setEditable(!editable);
    if (editable) {
      Toast.success("Chỉnh sửa thành công");
    }
  }

  const handleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
    if (isChangePassword) {
      Toast.success("Đổi mật khẩu thành công");
    }
  }


  return (
    <View className="bg-[#F8FBF6] w-full h-full relative">
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Tài khoản</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <ScrollView>
        <View className="w-full flex justify-end items-center p-6">
          <Image
            className="w-[100px] h-[100px] object-cover rounded-full border-[1px] border-black mb-3"
            source={require('assets/dark-logo.png')}
          />
          <Text className="font-bold text-xl">Lê Đình Huy</Text>
          <Text className="text-[#ababab] text-lg">huy.ledinh@hcmut.edu.vn</Text>
          <View className="w-full mb-4">
              <Text className="mb-3 font-semibold text-neutral-500">Họ và tên:</Text>
              <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                <TextInput
                  placeholder="Họ và tên"
                  editable={editable}
                  className="flex-1 text-neutral-700 text-body-base-regular"
                  // value={value}
                  // onChangeText={onChange}
                />
              </View>
              <Text className="mb-3 font-semibold text-neutral-500">Tên tài khoản:</Text>
              <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                <TextInput
                  placeholder="Tên tài khoản"
                  editable={editable}
                  className="flex-1 text-neutral-700 text-body-base-regular"
                  // value={value}
                  // onChangeText={onChange}
                />
              </View>
              <Text className="mb-3 font-semibold text-neutral-500">Email:</Text>
              <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                <TextInput
                  placeholder="Email"
                  editable={editable}
                  className="flex-1 text-neutral-700 text-body-base-regular"
                  // value={value}
                  // onChangeText={onChange}
                />
              </View>
              <View className="flex w-full justify-center items-center">
                <Button className="w-[180px] !rounded-full mb-5 !bg-lime-300" onPress={handleEditProfile}>
                  <Text className="text-black font-semibold">{!editable ? "Chỉnh sửa" : "Lưu"}</Text>
                </Button>
              </View>
              <Text className="mb-3 font-semibold text-neutral-500">Mật khẩu:</Text>
              <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                <TextInput
                  placeholder="Mật khẩu"
                  editable={isChangePassword}
                  secureTextEntry={!passwordVisible}
                  className="flex-1 text-neutral-700 text-body-base-regular"
                  // value={value}
                  // onChangeText={onChange}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Entypo
                    name={passwordVisible ? "eye" : "eye-with-line"}
                    size={16}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {
                  isChangePassword
                  &&
                  <>
                    <Text className="mb-3 font-semibold text-neutral-500">Xác nhận mật khẩu:</Text>
                    <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                      <TextInput
                        placeholder="Xác nhận mật khẩu"
                        editable={isChangePassword}
                        secureTextEntry={!passwordVisible}
                        className="flex-1 text-neutral-700 text-body-base-regular"
                        // value={value}
                        // onChangeText={onChange}
                      />
                      <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      >
                        <Entypo
                          name={passwordVisible ? "eye" : "eye-with-line"}
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                }
              <View className="flex w-full justify-center items-center">
                <Button className="w-[180px] !rounded-full mb-5 !bg-lime-300" onPress={handleChangePassword}>
                  <Text className="text-black font-semibold">{!isChangePassword ? "Đổi mật khẩu" : "Lưu"}</Text>
                </Button>
                
              </View>
          </View>
        </View>
      </ScrollView>
      
    </View>
    
  );
};
