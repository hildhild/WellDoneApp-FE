import { RootStackParamList } from "@/Navigation";
import {
  CreateProjectResponse,
  useGetProjectListMutation,
} from "@/Services/projects";
import { RootState } from "@/Store";
import { setProjectId } from "@/Store/reducers";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootScreens } from "..";
import { Home } from "./Home";
type HomeScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const [getProjectList, { isLoading }] = useGetProjectListMutation();
  const [data, setData] = useState<CreateProjectResponse | undefined>(
    undefined
  );
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.profile.token);
  const fetchRecentProject = useCallback(async () => {
    const response = await getProjectList({ token });
    if (response && Array.isArray(response)) {
      setData(response[0]);
      dispatch(setProjectId({ id: response[0].id }));
    }
  }, [getProjectList, token]);

  useEffect(() => {
    fetchRecentProject();
  }, [fetchRecentProject]);
  return <Home onNavigate={onNavigate} data={data} isLoading={isLoading} />;
};
