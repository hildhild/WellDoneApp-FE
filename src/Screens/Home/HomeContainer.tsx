import { RootStackParamList } from "@/Navigation";
import { data } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { RootScreens } from "..";
import { Home } from "./Home";
import { useGetDetailProjectMutation } from "@/Services/projects";
type HomeScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const [getDetailProject, { isLoading }] = useGetDetailProjectMutation();

  const fetchRecentProject = useCallback(async () => {
    //  const response =  await getDetailProject({ id: userId });
  }, [getDetailProject]);
  return <Home onNavigate={onNavigate} data={data} isLoading={isLoading} />;
};
