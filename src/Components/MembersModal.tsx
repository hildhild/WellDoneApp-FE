import { Member } from "@/Services/projects";
import React, { memo } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";
import { renderRoleLabel } from "@/Utils/Funtions/render";

interface ProjectModalProps {
  projectName: string;
  members: Member[];
  closeModal: () => void;
}

const MembersModal: React.FC<ProjectModalProps> = ({
  projectName,
  members,
  closeModal,
}) => {
  const renderItem = ({ item }: { item: Member }) => (
    <View key={item.id} className="flex-row items-center mb-4">
      <Avatar name={item.name} width={40} height={40} />
      <View className="ml-3 flex-1">
        <Text className="text-body-base-bold">{item.name}</Text>
        <Text className="text-body-small-regular text-neutral-600">
          {item.email}
        </Text>
      </View>
      {renderRoleLabel(item.role)}
    </View>
  );

  if (projectName === "" || members.length === 0) {
    return (
      <>
        <View className="flex-row justify-center items-center h-full">
          <Text className="text-neutral-100">
            Không tìm thấy thành viên để hiển thị!
          </Text>
        </View>
      </>
    );
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={closeModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-neutral-100 w-4/5 rounded-lg p-5 max-h-4/5">
          <View className="mb-5 items-center">
            <Text className="text-xl font-bold text-center">{projectName}</Text>
          </View>

          <FlatList
            data={members}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ marginBottom: 5 }}
          />

          <View className="flex-row justify-center">
            <TouchableOpacity
              onPress={closeModal}
              className="bg-primary-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-neutral-100 text-body-base-bold">Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(MembersModal);
