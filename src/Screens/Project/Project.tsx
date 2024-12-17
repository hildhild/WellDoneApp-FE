import { i18n, LocalizationKey } from "@/Localization";
import { IProjectList } from "@/Services/projects";
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
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootScreens } from "..";
import ProjectCardContainer from "./ProjectCard/ProjectCardContainer";
export interface IProjectProps {
  data: IProjectList | undefined;
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onNavigate: (screen: RootScreens) => void;
}

export const Project = (props: IProjectProps) => {
  const { data, isLoading } = props;
  const filteredProjects = data?.filter((project) =>
    project.name.toLowerCase().includes(props.search.toLowerCase())
  );
  return (
    <View className="flex align-center justify-center bg-neutral-100">
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
                Danh sách Dự án (
                {filteredProjects ? filteredProjects.length : 0})
              </Text>
              {filteredProjects?.map((project) => (
                <ProjectCardContainer
                  key={project.id}
                  project={project}
                  bgColor={generatePastelColor()}
                  onNavigate={props.onNavigate}
                />
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};
