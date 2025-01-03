import { LoadingProcess } from "@/Components";
import Avatar from "@/Components/Avatar";
import AvatarStack from "@/Components/AvatarStack";
import MembersModal from "@/Components/MembersModal";
import {
  GetMemOfProjectResponse,
  GetProjectListResponse,
} from "@/Services/projects";
import { generateDate } from "@/Utils/Funtions/generate";
import { renderStatusLabel } from "@/Utils/Funtions/render";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { memo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

interface ProjectCardProps {
  isDeleteProjectLoading: boolean;
  listMember: GetMemOfProjectResponse;
  project: GetProjectListResponse;
  bgColor: string;
  onNavigate: () => void;
  onDelete: (id: number) => void;
}

const widthOfListMember = (length : number) => {
  if (length === 1) return "w-[46px]"
  else if (length === 2) return "w-[78px]";
  else if (length === 3) return "w-[110px]";
  else if (length === 4) return "w-[142px]";
  else if (length === 5) return "w-[174px]";
  else return "w-[230px]";

}

const ProjectCard: React.FC<ProjectCardProps> = ({
  isDeleteProjectLoading,
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
      <LoadingProcess isVisible={isDeleteProjectLoading} />
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
      <View className="flex-row justify-end">
        {renderStatusLabel(project.status)}
      </View>
      <View className="flex-row items-center justify-between mb-1">
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
      </View>

      <Text className="text-body-large-regular text-gray-700 mb-2">
        {project.description}
      </Text>

      <Pressable onPress={() => setOpenModal(true)} className={`${widthOfListMember(listMember.length)}`}>
        <AvatarStack
          users={flatMembersList.split(",")}
          maxVisible={5}
          display="row"
        />
      </Pressable>
      {openModal && (
        <MembersModal
          projectName={project.name}
          members={listMember}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </View>
  );
};

export default memo(ProjectCard);
