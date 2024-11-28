import React, { FC, memo } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ForgotPasswordForm } from "./ForgotPasswordContainer";
import { RootScreens } from "@/Screens";
interface ForgotPasswordProps {
  onNavigate: (screen: RootScreens) => void;
  onForgotPassword: (formData: ForgotPasswordForm) => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  onNavigate,
  onForgotPassword,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

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
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center bg-neutral-200 rounded-lg px-4 py-3 mb-4">
              <AntDesign name="mail" size={16} color="black" />
              <TextInput
                placeholder="Nhập email đã đăng ký"
                className="flex-1 text-neutral-700 text-body-base-regular"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
      </View>
      <View className="flex-row mt-6 w-full">
        <TouchableOpacity
          className="bg-neutral-100 border-neutral-400 rounded-lg px-6 py-3 flex-1 mr-3 max-w-[112px] !border"
          onPress={() => onNavigate(RootScreens.LOGIN)}
        >
          <Text className="text-gray-400 text-body-base-bold text-center">Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary-600 rounded-lg px-6 py-3 flex-1 max-w-[225px]"
          onPress={handleSubmit(onForgotPassword)}
        >
          <Text className="text-neutral-100 text-body-base-bold text-center">
            Lấy lại mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default memo(ForgotPassword);
