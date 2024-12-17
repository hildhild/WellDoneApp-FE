import { RootStackParamList } from "@/Navigation";
import { ProjectList } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootScreens } from "..";
import { Project } from "./Project";
type ProjectScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const ProjectContainer = ({
  navigation,
}: ProjectScreenNavigatorProps) => {
  const [search, setSearch] = useState("");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return (
    <Project
      data={ProjectList}
      isLoading={false}
      search={search}
      setSearch={setSearch}
      onNavigate={onNavigate}
    />
  );
};
