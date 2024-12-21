import { RootStackParamList } from "@/Navigation";
import { GetProjectList, useGetProjectListMutation } from "@/Services/projects";
import { RootState } from "@/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootScreens } from "..";
import { Project } from "./Project";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
type ProjectScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const ProjectContainer = ({
  navigation,
}: ProjectScreenNavigatorProps) => {
  const [search, setSearch] = useState("");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const [getProjectList, { isLoading }] = useGetProjectListMutation();
  const token = useSelector((state: RootState) => state.profile.token);
  const [ProjectList, setProjectList] = useState<GetProjectList>([]);
  useEffect(() => {
    const fetchProjectList = async () => {
      if (search === "") {
        const response = await getProjectList({ token: token });
        if (response && Array.isArray(response)) {
          setProjectList(response);
        } else {
          setProjectList([]);
        }
      }
    };
    fetchProjectList();
  }, [getProjectList]);

  return (
    <>
      {ProjectList.length === 0 ? (
        <View>
          <Text>Hiện tại bạn không có dự án nào. Tạo dự án ngay~!🔥🌸👇👇</Text>
          <TouchableOpacity
            className="w-32 h-32 bg-primary-600 rounded-lg p-2 flex justify-center items-center"
            onPress={() => onNavigate(RootScreens.PROJECTCREATE)}
          >
            <AntDesign name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <Project
          data={ProjectList}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
};
