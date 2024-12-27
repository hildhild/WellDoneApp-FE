import { RootStackParamList } from "@/Navigation";
import {
  CreateProjectResponse,
  GetMemOfProjectResponse,
  useGetMemOfProjectMutation,
  useGetProjectListMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { setProjectId } from "@/Store/reducers";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "..";
import { Home } from "./Home";
import { LoadingProcess } from "@/Components";

type HomeScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;

const useRecentProject = (token: string) => {
  const [data, setData] = useState<CreateProjectResponse | undefined>(
    undefined
  );
  const [getProjectList, { isLoading }] = useGetProjectListMutation();
  const dispatch = useDispatch();

  const fetchRecentProject = useCallback(async () => {
    try {
      const response = await getProjectList({ token });
      if ("data" in response && Array.isArray(response.data)) {
        const project = response.data[0];
        setData(project);
        if (project?.id) {
          dispatch(setProjectId({ id: project.id }));
        }
      }
    } catch (error) {
      Toast.error(renderErrorMessageResponse(String(error)));
      console.error(error);
    }
  }, [getProjectList, token, dispatch]);

  useEffect(() => {
    fetchRecentProject();
  }, [fetchRecentProject]);

  return { data, isLoading, fetchRecentProject };
};

export const useProjectMembers = (projectID: number | null, token: string) => {
  const [listMember, setListMember] = useState<GetMemOfProjectResponse | null>(
    null
  );
  const [getMemOfProject] = useGetMemOfProjectMutation();
  const refetch = useSelector((state: any) => state.project.refetch);

  useEffect(() => {
    const fetchMemOfProject = async () => {
      if (projectID === null) return;

      try {
        const response = await getMemOfProject({ projectId: projectID, token });

        if ("data" in response && Array.isArray(response.data)) {
          setListMember(response.data);
        }
      } catch (error) {
        Toast.error(renderErrorMessageResponse(String(error)));
        console.error(error);
      }
    };

    fetchMemOfProject();
  }, [getMemOfProject, projectID, token, refetch]);

  return listMember;
};

export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const token = useSelector((state: RootState) => state.profile.token);
  const { data, isLoading, fetchRecentProject } = useRecentProject(token);
  const [projectID, setProjectID] = useState<number | null>(null);
  const listMember = useProjectMembers(projectID, token);
  const [refreshing, setRefreshing] = useState(false);
  const refetch = useSelector((state: any)=>state.project.refetch);

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecentProject();
    setRefreshing(false);
  };

  useEffect(()=>{
    fetchRecentProject();
  }, [])

  useEffect(() => {
    if (data) {
      setProjectID(data.id);
    }
  }, [data]);

  // if (isLoading) {
  //   return (
  //     <View className="flex justify-center items-center h-full">
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  //  else if (!data) {
  //   return (
  //     <View className="flex justify-center items-center h-full">
  //       <Text className="p-16 text-center">
  //         Hiện tại bạn không có dự án nào. Tạo dự án ngay~!🔥🌸👇👇
  //       </Text>
  //       <TouchableOpacity
  //         className=" w-16 h-16 bg-primary-600 rounded-lg p-2 flex justify-center items-center"
  //         onPress={() => onNavigate(RootScreens.PROJECTCREATE)}
  //       >
  //         <AntDesign name="plus" size={30} color="#fff" />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <LoadingProcess isVisible={isLoading}/> */}
      <Home
        onNavigate={onNavigate}
        listMember={listMember}
        data={data}
        isLoading={isLoading}
      />
    </ScrollView>
  );
};
