import { Response } from "@/Services";
import { getErrorMessage } from "@/Utils/Funtions/render";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { FC, memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { RootScreens } from "../../";
import { ResetPasswordForm } from "./ResetPasswordContainer";

interface ResetPasswordProps {
  onNavigate: (screen: RootScreens) => void;
  onResetPassword: (formData: ResetPasswordForm) => void;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | Response | undefined;
}

const ResetPassword: FC<ResetPasswordProps> = ({
  onNavigate,
  onResetPassword,
  isLoading,
  isError,
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit = (data: ResetPasswordForm) => {
    onResetPassword(data);
  };

  return (
    <View className="flex-1 bg-white items-center px-5 pt-12">
      <Text className="text-center text-neutral-900 text-heading4 mb-8">
        Đặt lại mật khẩu
      </Text>

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
      {errors.password && (
        <Text className="text-danger-400">{errors.password.message}</Text>
      )}
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
      {errors.confirmPassword && (
        <Text className="text-danger-400">
          {errors.confirmPassword.message}
        </Text>
      )}
      <Text className="text-neutral-600 text-body-base-regular mb-8">
        Nhập mã xác thực đã được gửi đến email của bạn
      </Text>
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row justify-between w-full max-w-xs mb-6">
            {new Array(6).fill("").map((_, index) => (
              <TextInput
                key={index}
                value={value ? value[index] : ""}
                onChangeText={(inputValue) => {
                  const newCode = value ? value.split("") : [];
                  newCode[index] = inputValue;
                  onChange(newCode.join(""));
                }}
                maxLength={1}
                keyboardType="numeric"
                className="h-14 w-14 border-2 border-neutral-300 rounded-md text-center text-xl font-bold"
              />
            ))}
          </View>
        )}
      />
      {isError && (
        <Text className="text-danger-400 mb-4">{getErrorMessage(error)}</Text>
      )}
      <View className="flex-row mt-6 w-full">
        <TouchableOpacity
          className="bg-neutral-100 border-neutral-400 rounded-lg px-6 py-3 flex-1 mr-3 max-w-[112px] !border"
          onPress={() => onNavigate(RootScreens.LOGIN)}
        >
          <Text className="text-gray-400 text-body-base-bold text-center">
            Hủy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary-600 rounded-lg px-6 py-3 flex-1 max-w-[225px]"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-neutral-100 text-body-base-bold text-center">
            {isLoading ? "Đang đặt lại mật khẩu..." : "Đặt lại mật khẩu"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ResetPassword);
