import { RootStackParamList } from "@/Navigation";
import {
  GetProjectListResponse,
  useGetProjectListMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "..";
import { Project } from "./Project";
type ProjectScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
const useProjectList = (token: string) => {
  const [data, setData] = useState<GetProjectListResponse[] | undefined>(
    undefined
  );
  const [getProjectList, { isLoading }] = useGetProjectListMutation();
  const dispatch = useDispatch();

  const fetchRecentProject = useCallback(async () => {
    try {
      const response = await getProjectList({ token });
      if ("data" in response && Array.isArray(response.data)) {
        const project: GetProjectListResponse[] = response.data;
        setData(project);
      } else {
        Toast.error("Unexpected response format");
      }
    } catch (error) {
      Toast.error(renderErrorMessageResponse(String(error)));
      console.error(error);
    }
  }, [getProjectList, token, dispatch]);

  useEffect(() => {
    fetchRecentProject();
  }, [fetchRecentProject]);

  return { data, isLoading };
};

export const ProjectContainer = ({
  navigation,
}: ProjectScreenNavigatorProps) => {
  const [search, setSearch] = useState("");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const token = useSelector((state: RootState) => state.profile.token);
  const { data: ProjectList, isLoading } = useProjectList(token);

  return (
    <>
      {ProjectList?.length === 0 ? (
        <View className="flex justify-center items-center h-full">
          <Text className="p-16 text-center ">
            Hiện tại bạn không có dự án nào. Tạo dự án ngay~!🔥🌸👇👇
          </Text>
          <TouchableOpacity
            className=" w-16 h-16 bg-primary-600 rounded-lg p-2 flex justify-center items-center"
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
