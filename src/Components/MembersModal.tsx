import React, { memo } from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";
import { Member } from "@/Services/projects";
interface ProjectModalProps {
  projectName: string;
  members: Member[];
  closeModal: () => void;
}

const MembersModal: React.FC<ProjectModalProps> = ({ projectName, members, closeModal }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true} 
      onRequestClose={closeModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-neutral-100 w-4/5 rounded-lg p-5 max-h-4/5">
          <View className="mb-5 items-center">
            <Text className="text-xl font-bold text-center">{projectName}</Text>
          </View>

          <ScrollView className="flex-1 mb-5">
            {members.map((member) => (
              <View key={member.id} className="flex-row items-center mb-4">
                <Avatar name={member.name} width={40} height={40} />

                <View className="ml-3 flex-1">
                  <Text className="text-body-base-bold">{member.name}</Text>
                  <Text className="text-body-small-regular text-neutral-600">{member.email}</Text>
                </View>

                <Text className="text-body-small-regular text-neutral-600 ml-auto">{member.role}</Text>
              </View>
            ))}
          </ScrollView>
          <View className="flex-row justify-center">
            <TouchableOpacity onPress={closeModal} className="bg-primary-500 px-4 py-2 rounded-lg">
              <Text className="text-neutral-100 text-body-base-bold">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(MembersModal);
