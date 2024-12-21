import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { GetDetailProjectResponse, useGetDetailProjectMutation } from "@/Services/projects";
import { RootState } from "@/Store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import ProjectDetail from "./ProjectDetail";

type ProjectDetailScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.PROJECTDETAIL
>;

const ProjectDetailContainer: FC<ProjectDetailScreenNavigatorProps> = ({
  navigation,
}) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const id = useSelector((state: RootState) => state.project.id);
  const token = useSelector((state: RootState) => state.profile.token);
  const [projectInfo, setProjectInfo] = useState<GetDetailProjectResponse>();
  const [getDetailProject, { isLoading }] =
    useGetDetailProjectMutation();
  const fetchProjectInfo = async () => {
      if (id) {
        const response = await getDetailProject({
          projectId: id,
          token: token,
        }).unwrap();
        if (response) {
          if ("name" in response) {
            setProjectInfo(response);
          } else {
            Toast.error("Không tìm thấy dự án", "center");
          }
        }
        else[
          Toast.error("Không tìm thấy dự án", "center")
        ]
      } else {
        Toast.error("Không tìm thấy dự án", "center");
      }
    };

    useEffect(() => {
      fetchProjectInfo();
    }
    ,[fetchProjectInfo]);
  
return (
  <>
    {isLoading ? (
      <Text>Loading...</Text>
    ) : id ? (
      <ProjectDetail onNavigate={onNavigate} project={projectInfo} />
    ) : (
      <View>
        <Text>Không tìm thấy dự án</Text>
      </View>
    )}
  </>
);
};

export default ProjectDetailContainer;
