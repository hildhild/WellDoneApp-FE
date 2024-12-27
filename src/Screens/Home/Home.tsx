import Avatar from "@/Components/Avatar";
import AvatarStack from "@/Components/AvatarStack";
import { i18n, LocalizationKey } from "@/Localization";
import {
  CreateProjectResponse,
  GetMemOfProjectResponse,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { setProjectId } from "@/Store/reducers";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Heading, HStack, Spinner } from "native-base";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import { useDispatch, useSelector } from "react-redux";
import { RootScreens } from "..";
import FeedItemContainer from "./FeedItem/FeedItemContainer";
import MembersModal from "@/Components/MembersModal";

export interface IHomeProps {
  listMember: GetMemOfProjectResponse | null;
  onNavigate: (screen: RootScreens) => void;
  data: CreateProjectResponse | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { listMember, data, isLoading, onNavigate } = props;
  const flatGroupsList = listMember?.map((item) => item.name).join(", ");
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.profile.name);
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <View className="bg-neutral-100 pt-8 h-full px-5">
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <>
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Image
                className="w-28 h-28"
                source={require("assets/dark-logo.png")}
              />
              <Text className="text-body-large-bold font-bold text-neutral-800 ml-[-20px]">
                WellDone
              </Text>
            </View>

            <TouchableOpacity onPress={() => onNavigate(RootScreens.ACCOUNT)}>
              <Avatar name={name} width={60} height={60} />
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-lg mb-8">
            <View className="flex-row justify-between">
              <Text className="text-heading4 font-bold mb-4 p-4">Bảng tin</Text>
              <TouchableOpacity
                className="mt-4"
                onPress={() => onNavigate(RootScreens.NOTIFICATION)}
              >
                <MaterialCommunityIcons
                  name="arrow-top-right-thin-circle-outline"
                  size={32}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
              <FeedItemContainer onNavigate={onNavigate} />
            </View>
          </View>
          <View className="rounded-lg mb-8">
            <Text className="text-heading4 font-bold p-4">Dự án gần đây</Text>
            {
              data 
              ?
              <View className="p-4 flex-row items-center rounded-2xl border border-neutral-300 bg-neutral-900">
              <Image
                source={require("assets/Group Rectangle.png")}
                className="absolute top-2 right-2 w-32 h-32"
              />
              <View className="flex-1">
                <Text className="text-warning-100 font-bold text-body-large-semibold mb-4 p-4">
                  {data?.name}
                </Text>
                <View className="flex-row items-center space-x-4 p-4">
                  <Text className="text-neutral-100 text-body-base-bold ml-2 mb-4">
                    {data?.description}
                  </Text>
                </View>
                <View className="flex-row items-center space-x-4 p-2">
                  <TouchableOpacity
                    className="bg-primary-200 w-[155px] px-4 py-2 rounded-3xl mb-4 flex-row justify-between items-center"
                    onPress={() => {
                      if (data?.id) {
                        dispatch(setProjectId({ id: data.id }));
                        onNavigate(RootScreens.PROJECTDETAIL);
                      }
                    }}
                  >
                    <Text className="text-center text-neutral-900 text-body-base-regular ">
                      Đi đến dự án
                    </Text>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => setOpenModal(true)}>
                <AvatarStack
                  users={flatGroupsList ? flatGroupsList.split(",") : []}
                />
              </TouchableOpacity>
              {openModal && (
                <MembersModal
                  projectName={data?.name ?? ""}
                  members={listMember ?? []}
                  closeModal={() => setOpenModal(false)}
                />
              )}
            </View>
            :
            <View className="p-4 flex-row items-center rounded-2xl justify-between">
              <Text className="text-lg font-semibold text-gray-500">Không có dự án</Text>
              <Pressable onPress={()=>onNavigate(RootScreens.PROJECTCREATE)}>
                <Text className="text-lg font-semibold text-lime-500">Tạo mới</Text>
              </Pressable>
            </View>
            }
            
          </View>
        </>
      )}
    </View>
  );
};
