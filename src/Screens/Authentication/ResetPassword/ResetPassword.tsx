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
}
const ResetPassword: FC<ResetPasswordProps> = ({
  onNavigate,
  onResetPassword,
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

      <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
        <AntDesign name="lock" size={16} color="black" />

        <TextInput
          placeholder="Xác nhận mật khẩu"
          secureTextEntry={!passwordVisible}
          className="flex-1 text-neutral-700 text-body-base-regular"
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={16}
            color="black"
          />
        </TouchableOpacity>
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
          onPress={handleSubmit(onResetPassword)}
        >
          <Text className="text-neutral-100 text-body-base-bold text-center">
            Đặt lại mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(ResetPassword);
