import { RootScreens } from "@/Screens";
import { Response } from "@/Services";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/Utils/constant";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import HeaderBackground from "assets/icons/LogIn/HeaderBackground";
import React, { FC, memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { LogInForm } from "./LogInContainer";

interface LogInProps {
  onNavigate: (screen: RootScreens) => void;
  onLogIn: (formData: LogInForm) => void;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | Response | undefined;
}

const LogIn: FC<LogInProps> = ({
  onNavigate,
  onLogIn,
  isLoading,
  isError,
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    onLogIn(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 bg-white items-center px-5 pt-12">
          <HeaderBackground className="w-32 h-32 mb-8" />
          <Image
            className="w-64 h-64"
            source={require("assets/dark-logo.png")}
          />
          <Text className="text-center text-neutral-700 text-body-base-medium mb-8">
            Đăng nhập vào tài khoản WellDone của bạn
          </Text>

          <View className="w-full mb-4">
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email là bắt buộc",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Email không hợp lệ",
                },
              }}
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
            {errors.email && (
              <Text className="text-danger-400">{errors.email.message}</Text>
            )}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Mật khẩu là bắt buộc",
                pattern: {
                  value: PASSWORD_PATTERN,
                  message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
                },
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              }}
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
            {errors.password && (
              <Text className="text-danger-400">{errors.password.message}</Text>
            )}
          </View>

          <TouchableOpacity className="self-end mb-5">
            <Text
              className="text-body-small-bold text-neutral-700"
              onPress={() => onNavigate(RootScreens.FORGOT_PASSWORD)}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary-600 rounded-lg w-52 h-14 py-2 px-4 mb-5 justify-center"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text className="text-center text-neutral-100 font-bold text-body-base-bold">
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row">
            <Text className="text-neutral-700 text-body-base-medium">
              Chưa có tài khoản?{" "}
            </Text>
            <TouchableOpacity onPress={() => onNavigate(RootScreens.SIGNUP)}>
              <Text className="text-neutral-700 text-body-base-bold">
                Đăng ký ngay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default memo(LogIn);
