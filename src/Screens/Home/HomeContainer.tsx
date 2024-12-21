import { RootStackParamList } from "@/Navigation";
import { dataa } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { RootScreens } from "..";
import { Home } from "./Home";
import { useGetDetailProjectMutation } from "@/Services/projects";
import { useDispatch, useSelector } from "react-redux";
import { setProjectId } from "@/Store/reducers";
import { RootState } from "@/Store";
type HomeScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const [getDetailProject, { isLoading }] = useGetDetailProjectMutation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.profile.token);
  const fetchRecentProject = useCallback(async () => {
    const response =  await getDetailProject();
  }, [getDetailProject]);
  dispatch(setProjectId({ id:  }));
  return <Home onNavigate={onNavigate} data={dataa} isLoading={isLoading} />;
};
