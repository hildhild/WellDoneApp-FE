import { RootScreens } from "@/Screens";
import { CreateProjectResponse, GroupCreateProject } from "@/Services/projects";
import { setProjectId } from "@/Store/reducers";
import React, { FC, memo, useCallback } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import ProjectCard from "./ProjectCard";
import { useDeleteProjectMutation } from "@/Services/projects";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { Toast } from "toastify-react-native";
interface IProjectCardContainerProps {
  project: CreateProjectResponse;
  bgColor: string;
  onNavigate: (screen: RootScreens) => void;
}

const ProjectCardContainer: FC<IProjectCardContainerProps> = ({
  project,
  bgColor,
  onNavigate,
}) => {
  const dispatch = useDispatch();
  const [deleteProject] = useDeleteProjectMutation();
  const token = useSelector((state: RootState) => state.profile.token);
  const handleDeleteProject = useCallback(
    async (projectId: number) => {
      const response = await deleteProject({
        projectId: projectId,
        token: token,
      });
      if (!response) {
        Toast.success("Delete project successfully");
      }
    },
    [deleteProject, token]
  );
  const handleDelete = (projectId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            handleDeleteProject(projectId);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleAvatarStackClick = (users: GroupCreateProject[]) => {
    console.log("Clicked on Avatar Stack. Show member list modal", users);
  };

  const handleNavigate = () => {
    dispatch(setProjectId({ id: project.id }));
    onNavigate(RootScreens.PROJECTDETAIL);
  };
  return (
    <ProjectCard
      project={project}
      bgColor={bgColor}
      onNavigate={handleNavigate}
      onDelete={handleDelete}
      onAvatarStackClick={() => handleAvatarStackClick(project.groups)}
    />
  );
};

export default memo(ProjectCardContainer);
