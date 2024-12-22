import Avatar from "@/Components/Avatar";
import AvatarStack from "@/Components/AvatarStack";
import MembersModal from "@/Components/MembersModal";
import {
  CreateProjectResponse,
  GetMemOfProjectResponse,
} from "@/Services/projects";
import { generateDate } from "@/Utils/Funtions/generate";
import { renderStatusLabel } from "@/Utils/Funtions/render";
import React, { memo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface ProjectCardProps {
  listMember: GetMemOfProjectResponse;
  project: CreateProjectResponse;
  bgColor: string;
  onNavigate: () => void;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  listMember,
  project,
  bgColor,
  onNavigate,
  onDelete,
}) => {
  const flatMembersList = listMember.map((member) => member.name).join(", ");
  const [openModal, setOpenModal] = useState(false);
  return (
    <View
      style={{ backgroundColor: bgColor }}
      className="rounded-lg p-4 mb-4 shadow-md"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Avatar name={project.name} width={70} height={70} />
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
            Từ {generateDate(project.startDate)} đến{" "}
            {generateDate(project.endDate)}
          </Text>
        </View>
        {renderStatusLabel(project.status)}
      </View>

      <Text className="text-body-large-regular text-gray-700 mb-2">
        {project.description}
      </Text>

      <View className="w-[170px]">
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <AvatarStack
            users={flatMembersList.split(",")}
            maxVisible={5}
            display="row"
          />
        </TouchableOpacity>
      </View>
      {openModal && (
        <MembersModal
          projectName={project.name}
          members={listMember}
          closeModal={() => setOpenModal(false)}
        />
      )}

      <View className="flex-col ml-auto mt-4 items-end">
        <Progress.Bar
          progress={project.progress ?? 0 / 100}
          width={50}
          height={2}
          borderRadius={100}
          unfilledColor="#e5e5e5"
          color="#0a0a0a"
        />
      </View>
    </View>
  );
};

export default memo(ProjectCard);
