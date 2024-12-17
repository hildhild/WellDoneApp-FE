import { RootScreens } from '@/Screens';
import { IProjectListItem, ProjectMember } from '@/Services/projects';
import { setProjectId } from '@/Store/reducers';
import React, { FC, memo } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import ProjectCard from './ProjectCard';

interface IProjectCardContainerProps {
  project: IProjectListItem;
  bgColor: string;
  onNavigate: (screen: RootScreens) => void;
}

const ProjectCardContainer: FC<IProjectCardContainerProps> = ({ project, bgColor, onNavigate }) => {
  const dispatch = useDispatch();

  const handleDelete = (projectId: string) => {
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
            console.log(`Project ${projectId} deleted.`);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleAvatarStackClick = (users: ProjectMember[]) => {
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
      onAvatarStackClick={() => handleAvatarStackClick(project.members)}
    />
  );
};

export default memo(ProjectCardContainer);
