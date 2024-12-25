import { RootStackParamList } from "@/Navigation";
import {
  GetProjectListResponse,
  useGetProjectListMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { RootScreens } from "..";
import { Project } from "./Project";

type ProjectScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;

export const useProjectList = (token: string) => {
  const [data, setData] = useState<GetProjectListResponse[] | undefined>(undefined);
  const [getProjectList, { isLoading }] = useGetProjectListMutation();
  const dispatch = useDispatch();
  const refetch = useSelector((state: any) => state.project.refetch);

  const fetchRecentProject = useCallback(async () => {
    try {
      const response = await getProjectList({ token });
      if ("data" in response && Array.isArray(response.data)) {
        const project: GetProjectListResponse[] = response.data;
        setData(project);
      }
    } catch (error) {
      Toast.error(renderErrorMessageResponse(String(error)));
      console.error(error);
    }
  }, [getProjectList, token, dispatch]);

  useEffect(() => {
    fetchRecentProject();
  }, [fetchRecentProject, refetch]);

  return { data, isLoading, fetchRecentProject };
};

export const ProjectContainer = ({
  navigation,
}: ProjectScreenNavigatorProps) => {
  const [search, setSearch] = useState("");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const token = useSelector((state: RootState) => state.profile.token);
  const { data: ProjectList, isLoading, fetchRecentProject } = useProjectList(token);

  return (
    <Project
      data={ProjectList}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
      onNavigate={onNavigate}
      fetchRecentProject={fetchRecentProject}  
    />
  );
};
