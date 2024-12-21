import { RootStackParamList } from "@/Navigation";
import { ProjectList } from "@/Utils/constant";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { RootScreens } from "..";
import { Project } from "./Project";
import { useGetProjectListMutation } from "@/Services/projects";
type ProjectScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const ProjectContainer = ({
  navigation,
}: ProjectScreenNavigatorProps) => {
  const [search, setSearch] = useState("");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const [getProjectList, { isLoading }] = useGetProjectListMutation();

  useEffect(() => {
    const fetchProjectList = async () => {
      //  const response =  await getProjectList({ id: userId });
    };
    fetchProjectList();
  }, [getProjectList]);

  return (
    <Project
      data={ProjectList}
      isLoading={isLoading}
      search={search}
      setSearch={setSearch}
      onNavigate={onNavigate}
      onCreateProject={() => {
        console.log("Create Project");
      }}
    />
  );
};
