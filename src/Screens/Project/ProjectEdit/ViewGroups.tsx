import { RootState } from "@/Store";
import React, { FC, memo, useEffect, useState } from "react";
import { FlatList, Modal, TouchableOpacity, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CheckBox from "@/Components/CheckBox";

interface IViewGroupsProps {
  listGroupId: number[];
  closeModal: () => void;
  handleSave: (listGroupName: string[]) => void;
}

const ViewGroups: FC<IViewGroupsProps> = (props: IViewGroupsProps) => {
  const groupList = useSelector((state: RootState) => state.group.groupList);
  const checkGroup = (groupId: number) => {
    return props.listGroupId.includes(groupId);
  };

  const transformedGroupList = groupList.map((group) => ({
    id: group.id.toString(),
    name: group.name,
    selected: checkGroup(group.id),
  }));

  const [groups, setGroups] = useState(transformedGroupList);

  const toggleSelection = (id: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, selected: !group.selected } : group
      )
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View className="flex-1 justify-center items-center bg-neutral-300 bg-opacity-50">
        <View className="bg-neutral-100 rounded-[35px] w-4/5 p-4 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-body-small-bold text-neutral-500">
              Chọn nhóm
            </Text>
          </View>
          <FlatList
            data={groups}
            keyExtractor={(item) => item.id}
            className="mb-3"
            renderItem={({ item }) => (
              <View className="p-3 bg-[#FBFCFB]">
                <CheckBox
                  isChecked={item.selected}
                  onPress={() => toggleSelection(item.id)}
                  title={item.name + " " + "#" + item.id + ""}
                />
              </View>
            )}
          />
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-neutral-100 border-neutral-300 border rounded-lg w-28 h-11 items-center justify-center"
              onPress={() => {
                props.closeModal();
              }}
            >
              <Text className="text-body-base-semibold text-neutral-700">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className=" w-28 h-11 rounded-lg items-center justify-center bg-primary-600"
              onPress={() => {
                props.handleSave(
                  groups
                    .filter((group) => group.selected)
                    .map((group) => group.id)
                );
              }}
            >
              <Text className="text-body-base-semibold text-neutral-100">Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ViewGroups);
