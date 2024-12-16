import { Group } from "./Group";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { data } from "@/Utils/constant";


type GroupScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const GroupContainer = ({ navigation }: GroupScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const [userId, setUserId] = useState("9");

  const [fetchOne, { isSuccess, isLoading, isFetching, error }] = useLazyGetUserQuery();
  
  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Group onNavigate={onNavigate} data={data} isLoading={isLoading} />;
};
