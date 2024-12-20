import React, { FC, memo, useState, useEffect } from "react";
import { View, Text, Modal, Pressable, FlatList, Switch } from "react-native";

const groupData = [
  { id: "1", name: "Frontend Team #1", selected: true },
  { id: "2", name: "Backend Team #2", selected: true },
  { id: "3", name: "Leader Team #3", selected: false },
  { id: "4", name: "QC/QA Team #4", selected: false },
  { id: "5", name: "UX/UI Team #5", selected: false },
];

interface GroupData{
    id: string;
    name: string;
}

interface IViewGroupsProps {
  listGroupName: GroupData[];
  closeModal: () => void;
  handleSave: (listGroupName: string[]) => void;
}

const ViewGroups: FC<IViewGroupsProps> = (props: IViewGroupsProps) => {
  const [groups, setGroups] = useState(groupData);

  const toggleSelection = (id: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, selected: !group.selected } : group
      )
    );
  };
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
        <View className="bg-white rounded-lg w-4/5 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Chọn nhóm</Text>
            <Pressable onPress={() => console.log("Add group")}>
              <Text className="text-green-500">Thêm nhóm</Text>
            </Pressable>
          </View>
          <FlatList
            data={groups}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center py-2">
                <View className="flex-row items-center">
                  <Switch
                    value={item.selected}
                    onValueChange={() => toggleSelection(item.id)}
                    thumbColor={item.selected ? "#22C55E" : "#E5E7EB"}
                    trackColor={{ false: "#E5E7EB", true: "#A7F3D0" }}
                  />
                  <Text className="ml-2">{item.name}</Text>
                </View>
                <Pressable onPress={() => console.log("Edit group", item.name)}>
                  <Text className="text-gray-500">✏️</Text>
                </Pressable>
              </View>
            )}
          />
          <View className="flex-row justify-between mt-4">
            <Pressable
              className="bg-gray-300 rounded-lg px-4 py-2"
              onPress={() => {
                props.closeModal();
              }}
            >
              <Text className="text-center text-gray-700">Hủy</Text>
            </Pressable>
            <Pressable
              className="bg-green-500 rounded-lg px-4 py-2"
              onPress={() => {
                props.handleSave(
                  groups
                    .filter((group) => group.selected)
                    .map((group) => group.name)
                );
              }}
            >
              <Text className="text-center text-white">Lưu</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ViewGroups);
