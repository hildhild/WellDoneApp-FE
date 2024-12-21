import { i18n, LocalizationKey } from "@/Localization";
import { GetProjectList } from "@/Services/projects";
import { generatePastelColor } from "@/Utils/Funtions/generate";
import { StatusBar } from "expo-status-bar";
import { Heading, HStack, Spinner } from "native-base";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootScreens } from "..";
import ProjectCardContainer from "./ProjectCard/ProjectCardContainer";
export interface IProjectProps {
  data: GetProjectList | undefined;
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onNavigate: (screen: RootScreens) => void;
}

export const Project = (props: IProjectProps) => {
  const { data, isLoading } = props;

  return (
    <View className="flex align-center justify-center bg-neutral-100 relative">
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
          <View className="bg-white h-full pt-8 px-4">
            <View className="flex-row justify-center items-center mb-4">
              <Image
                className="w-28 h-28"
                source={require("assets/dark-logo.png")}
              />
              <Text className="text-body-large-bold font-bold text-neutral-800 ml-2">
                WELLDONE
              </Text>
            </View>

            <View className="flex-row items-center bg-lime-100 p-2 rounded-lg mb-4">
              <AntDesign name="search1" size={16} color="gray" />
              <TextInput
                placeholder="Tìm kiếm dự án của bạn"
                className="text-neutral-800 text-body-base-bold flex-1"
                value={props.search}
                onChangeText={props.setSearch}
              />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
              <Text className="text-heading3 font-bold text-neutral-800 mb-4">
                Danh sách Dự án ({data?.length})
              </Text>
              {data?.map((project) => (
                <ProjectCardContainer
                  key={project.id}
                  project={project}
                  bgColor={generatePastelColor()}
                  onNavigate={props.onNavigate}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              className="w-16 h-16 absolute bottom-[100px] right-5 bg-primary-600 rounded-full p-2 flex justify-center items-center"
              onPress={() => props.onNavigate(RootScreens.PROJECTCREATE)}
            >
              <AntDesign name="plus" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
