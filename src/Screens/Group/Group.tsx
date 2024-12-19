import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";
import { AvatarRow } from "@/Components";

export interface IGroupProps {
  onNavigate: (screen: RootScreens) => void;
  data: User | undefined;
  isLoading: boolean;
}

export const Group = (props: IGroupProps) => {
  const { data, isLoading } = props;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View className="bg-[#F8FBF6] w-full h-full relative">
          <View className="w-full h-24 pb-4 flex justify-end items-center">
            <Text className="text-2xl font-bold px-10 text-center text-black">Nhóm</Text>
          </View>
          <ScrollView className="px-6 py-3">
            <Pressable className="w-full flex justify-center items-center bg-[#4D7C0F] p-3 rounded-xl mb-5"><Text className="text-white text-lg font-semibold">Thêm nhóm</Text></Pressable>
            <View className="bg-[#DCFCE7] rounded-xl p-5 mb-8">
              <View className="flex flex-row mb-5 items-center">
                <View className="w-[40%]">
                  <Image
                    className="w-[60px] h-[60px] object-cover rounded-full border-[1px] border-black"
                    source={require('assets/dark-logo.png')}
                  />
                </View>
                <View className="w-[60%]">
                  <Text className="text-[#2C6E35] font-semibold mb-3">Đang thực hiện: 12</Text>
                  <Text className="text-[#2C6E35] font-semibold">Thành viên: 8</Text>
                </View>
              </View>
              <Text className="font-semibold text-2xl mb-4">Frontend Team</Text>
              <Text className="text-xl font-extralight mb-3">Our team is responsible for implementing the user interface (UI) of web applications.</Text>
              <View className="mb-4">
                <AvatarRow
                  users={
                    data?.members?.map((member) => ({
                      name: member.name,
                      avatar: member.avatar,
                    })) || []
                  }
                />
              </View>
              <View className="flex flex-row gap-[6%]">
                <Pressable className="w-[47%] flex justify-center items-center bg-[#A0D683] p-3 rounded-xl" onPress={()=>props.onNavigate(RootScreens.GROUP_DETAIL)}><Text className="text-[#2C6E35] text-lg font-semibold">Chi tiết</Text></Pressable>
                  <Pressable className="w-[47%] flex justify-center items-center bg-[#A0D683] p-3 rounded-xl"><Text className="text-[#2C6E35] text-lg font-semibold">Chỉnh sửa</Text></Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
