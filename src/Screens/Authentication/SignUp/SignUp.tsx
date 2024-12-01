import { RootScreens } from "@/Screens";
import { Response } from "@/Services";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/Utils/constant";
import { getErrorMessage } from "@/Utils/Funtions/render";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { FC, memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { SignUpForm } from "./SignUpContainer";

interface SignUpProps {
  onNavigate: (screen: RootScreens) => void;
  onSignUp: (formData: SignUpForm) => void;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | Response | undefined;
}

const SignUp: FC<SignUpProps> = ({
  onNavigate,
  onSignUp,
  isLoading,
  isError,
  error,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>({
    mode: "onSubmit",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const password = watch("password");

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
          rules={{ required: "Họ và tên là bắt buộc" }}
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
        {errors.fullName && (
          <Text className="text-danger-400 ">{errors.fullName.message}</Text>
        )}

        <Controller
          control={control}
          name="username"
          rules={{ required: "Tên tài khoản là bắt buộc" }}
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
        {errors.username && (
          <Text className="text-danger-400 ">{errors.username.message}</Text>
        )}

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
          <Text className="text-danger-400 ">{errors.email.message}</Text>
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
          <Text className="text-danger-400 ">{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Xác nhận mật khẩu là bắt buộc",
            validate: (value) =>
              value === password || "Mật khẩu xác nhận không khớp",
          }}
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
          <Text className="text-danger-400 ">
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="bg-primary-600 rounded-lg w-52 h-14 py-2 px-4 mb-5 justify-center"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text className="text-center text-neutral-100 font-bold text-body-base-bold">
          {isLoading ? "Đang gửi mã code..." : "Đăng ký"}
        </Text>
      </TouchableOpacity>

      {isError && error && (
        <Text className="text-danger-400 mb-4 ">{getErrorMessage(error)}</Text>
      )}
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
