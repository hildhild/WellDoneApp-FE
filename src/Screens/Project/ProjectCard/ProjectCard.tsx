// ProjectCard.jsx
import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AvatarStack from "@/Components/AvatarStack";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
import { renderStatusLabel } from "@/Utils/Funtions/render";
import { generateDate } from "@/Utils/Funtions/generate";
import { IProjectListItem } from "@/Services/projects";

interface ProjectCardProps {
  project: IProjectListItem;
  bgColor: string;
  onNavigate: () => void;
  onDelete: (id: string) => void;
  onAvatarStackClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  bgColor,
  onNavigate,
  onDelete,
  onAvatarStackClick,
}) => {
  return (
    <View
      style={{ backgroundColor: bgColor }}
      className="rounded-lg p-4 mb-4 shadow-md"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Image
          source={require("assets/Switch.png")}
          className="w-16 h-16 mr-2"
        />
        <View className="flex-row">
          <TouchableOpacity onPress={onNavigate}>
            <MaterialCommunityIcons
              name="arrow-top-right-thin-circle-outline"
              size={32}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="ml-2"
            onPress={() => onDelete(project.id)}
          >
            <FontAwesome name="trash-o" size={32} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center mb-1">
        <Text className="text-heading4 font-bold text-neutral-800">
          {project.name}
        </Text>
      </View>

      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          <AntDesign name="calendar" size={16} color="gray" />
          <Text className="ml-2 text-body-base-bold text-gray-500">
            Từ {generateDate(project.start_date)} đến {generateDate(project.end_date)}
          </Text>
        </View>
        {renderStatusLabel(project.status)}
      </View>

      <Text className="text-body-large-regular text-gray-700 mb-2">
        {project.description}
      </Text>

      <View className="w-[170px]">
        <TouchableOpacity onPress={onAvatarStackClick}>
          <AvatarStack users={project.members} maxVisible={5} display="row" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-col ml-auto mt-4 items-end">
        <Progress.Bar
          progress={project.progress / 100}
          width={50}
          height={2}
          borderRadius={100}
          unfilledColor="#e5e5e5"
          color="#0a0a0a"
        />
        <Text className="text-right text-xs text-gray-600 mt-2">
          {project.sum_hours_until_now} hours
        </Text>
      </View>
    </View>
  );
};

export default memo(ProjectCard);
