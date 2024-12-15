import { RootScreens } from "@/Screens";
import { Response } from "@/Services";
import { EMAIL_PATTERN } from "@/Utils/constant";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { FC, memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ForgotPasswordForm } from "./ForgotPasswordContainer";
interface ForgotPasswordProps {
  onNavigate: (screen: RootScreens) => void;
  onForgotPassword: (formData: ForgotPasswordForm) => void;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | Response | undefined;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  onNavigate,
  onForgotPassword,
  isLoading,
  isError,
  error,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    onForgotPassword(data);
  };
  return (
    <View className="flex-1 bg-white items-center px-5 pt-12">
      <Text className="text-center text-neutral-900 text-heading4 mb-8">
        Quên mật khẩu
      </Text>
      <Text className="text-center text-neutral-600 text-body-base-regular mb-8">
        Nhập email của bạn để lấy lại mật khẩu nhé !
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
      </View>
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
            {isLoading ? "Đang gửi reset code..." : "Lấy lại mật khẩu"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default memo(ForgotPassword);
