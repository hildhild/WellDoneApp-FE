import { i18n, LocalizationKey } from "@/Localization";
import { GetProjectListResponse } from "@/Services/projects";
import { generatePastelColor } from "@/Utils/Funtions/generate";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Heading, HStack, Spinner } from "native-base";
import React, { useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootScreens } from "..";
import ProjectCardContainer from "./ProjectCard/ProjectCardContainer";
import { LoadingProcess } from "@/Components";

export interface IProjectProps {
  data: GetProjectListResponse[] | undefined;
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onNavigate: (screen: RootScreens) => void;
  fetchRecentProject: () => void;
}

export const Project = (props: IProjectProps) => {
  const { data, isLoading, search, setSearch, onNavigate, fetchRecentProject } =
    props;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecentProject();
    setRefreshing(false);
  };

  return (
    <View className="flex align-center justify-center bg-neutral-100 relative h-full">
      <LoadingProcess isVisible={isLoading} />
      <StatusBar style="auto" />
      <>
        <View className="bg-white h-full pt-8 px-5">
          <View className="flex-row justify-center items-center mb-4">
            <Image
              className="w-28 h-28"
              source={require("assets/dark-logo.png")}
            />
            <Text className="text-body-large-bold font-bold text-neutral-800 ml-[-20px]">
              WellDone
            </Text>
          </View>

          <View className="flex-row items-center bg-lime-100 py-3 px-5 rounded-full mb-4">
            <AntDesign name="search1" size={16} color="gray" />
            <TextInput
              placeholder="Tìm kiếm dự án của bạn"
              className="text-neutral-800 text-body-base-bold flex-1 ml-3"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            className="mb-20"
          >
            <Text className="text-2xl font-bold text-neutral-800 mb-4">
              Danh sách Dự án ({data?.length})
            </Text>
            {data?.length === 0 ? (
              <Text className="text-lg text-neutral-500 font-semibold py-5">
                Không có dự án nào để hiển thị
              </Text>
            ) : (
              data?.map((project) => (
                <ProjectCardContainer
                  key={project.id}
                  project={project}
                  bgColor={generatePastelColor()}
                  onNavigate={onNavigate}
                />
              ))
            )}
          </ScrollView>

          <TouchableOpacity
            className="w-16 h-16 absolute bottom-[100px] right-5 bg-primary-600 rounded-full p-2 flex justify-center items-center"
            onPress={() => onNavigate(RootScreens.PROJECTCREATE)}
          >
            <AntDesign name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};
