import { RootScreens } from "@/Screens";
import React, { FC, memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { SignUpForm } from "./SignUpContainer";
interface SignUpProps {
  onNavigate: (screen: RootScreens) => void;
  onSignUp: (formData: SignUpForm) => void;
}

const SignUp: FC<SignUpProps> = ({ onNavigate, onSignUp }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data: any) => {
    onSignUp(data);
  };

  return (
    <View className="flex-1 bg-white items-center px-5 pt-12">
      <Text className="text-center text-neutral-900 text-heading4 mb-8">
        Hãy bắt đầu nào!
      </Text>
      <Text className="text-center text-neutral-600 text-body-base-regular mb-8">
        Tạo tài khoản trên WellDone để sử dụng tất cả các tính năng nhé!
      </Text>
      <View className="w-full mb-4">
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
              <AntDesign name="user" size={16} color="black" />
              <TextInput
                placeholder="Họ và tên"
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
              <AntDesign name="user" size={16} color="black" />
              <TextInput
                placeholder="Tên tài khoản"
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
              <AntDesign name="mail" size={16} color="black" />
              <TextInput
                placeholder="Email"
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
              <AntDesign name="lock" size={16} color="black" />

              <TextInput
                placeholder="Mật khẩu"
                secureTextEntry={!passwordVisible}
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={value}
                onChangeText={onChange}
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
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
              <AntDesign name="lock" size={16} color="black" />

              <TextInput
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={!passwordVisible}
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={value}
                onChangeText={onChange}
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
          )}
        />
      </View>
      <TouchableOpacity
        className="bg-primary-600 rounded-lg w-52 h-14 py-2 px-4 mb-5 justify-center"
        onPress={handleSubmit(onSubmit)}
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
