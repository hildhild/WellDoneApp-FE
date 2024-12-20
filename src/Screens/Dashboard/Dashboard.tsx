import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";

export interface IDashboardProps {
  onNavigate: (screen: RootScreens) => void;
  data: User | undefined;
  isLoading: boolean;
}

export const Dashboard = (props: IDashboardProps) => {
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
            <Text className="text-2xl font-bold px-10 text-center text-black">Bảng điều khiển</Text>
          </View>
          <ScrollView className="px-6 py-3">
            <View className="bg-lime-100 rounded-xl p-4 mb-8">
              <Text className="font-semibold text-lg mb-3">Nhiệm vụ của tôi</Text>
              <View className="flex flex-row border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text className="text-sm">Mã</Text></View>
                <View className="w-[75%]"><Text className="text-sm">Tiêu đề</Text></View>
                <View className="w-[10%]"><Text className="text-sm">P</Text></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text>WD-1</Text></View>
                <View className="w-[75%]"><Text>Thêm trang dự án</Text></View>
                <View className="w-[10%]"><Icon name="angle-double-up" size={20} color="red" /></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text>WD-1</Text></View>
                <View className="w-[75%]"><Text>Thêm trang dự án</Text></View>
                <View className="w-[10%]"><Icon name="angle-double-up" size={20} color="red" /></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text>WD-1</Text></View>
                <View className="w-[75%]"><Text>Thêm trang dự án</Text></View>
                <View className="w-[10%]"><Icon name="angle-double-up" size={20} color="red" /></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text>WD-1</Text></View>
                <View className="w-[75%]"><Text>Thêm trang dự án</Text></View>
                <View className="w-[10%]"><Icon name="angle-double-up" size={20} color="red" /></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]"><Text>WD-1</Text></View>
                <View className="w-[75%]"><Text>Thêm trang dự án</Text></View>
                <View className="w-[10%]"><Icon name="angle-double-up" size={20} color="red" /></View>
              </View>
            </View>
            <View className="bg-lime-100 rounded-xl p-4 mb-32">
              <Text className="font-semibold text-lg mb-3">Dự án tham gia</Text>
              <View className="flex flex-row border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[80%]"><Text className="text-sm">Dự án</Text></View>
                <View className="w-[20%]"><Text className="text-sm">Vị trí</Text></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]">
                  <Image
                    className="w-[35px] h-[35px] object-cover rounded-full border-[1px] border-black"
                    source={require('assets/dark-logo.png')}
                  />
                </View>
                <View className="w-[65%]"><Text>Fintech Mobile App UI</Text></View>
                <View className="w-[20%]"><Text className="font-semibold">Leader</Text></View>
              </View>
              <View className="flex flex-row items-center justify-center border-b-[0.5px] border-neutral-300 py-3">
                <View className="w-[15%]">
                  <Image
                    className="w-[35px] h-[35px] object-cover rounded-full border-[1px] border-black"
                    source={require('assets/dark-logo.png')}
                  />
                </View>
                <View className="w-[65%]"><Text>Fintech Mobile App UI</Text></View>
                <View className="w-[20%]"><Text className="font-semibold">Leader</Text></View>
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
