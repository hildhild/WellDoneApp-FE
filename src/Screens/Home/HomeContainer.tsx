import { RootStackParamList } from "@/Navigation";
import { useLazyGetUserQuery } from "@/Services";
import { data } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { RootScreens } from "..";
import { Home } from "./Home";
type HomeScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const [userId, setUserId] = useState("9");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const [fetchOne, { isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);


  return <Home onNavigate={onNavigate} data={data} isLoading={isLoading} />;
};
