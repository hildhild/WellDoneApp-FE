import CheckBox from "@/Components/CheckBox";
import { RootScreens } from "@/Screens";
import { Group } from "@/Services/group";
import { RootState } from "@/Store";
import { AntDesign } from "@expo/vector-icons";
import React, { FC, memo, useCallback, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
interface IViewGroupsProps {
  listGroupId: number[];
  closeModal: () => void;
  handleSave: (listGroupName: number[]) => void;
  onNavigate: (screen: RootScreens) => void;
}

const ViewGroups: FC<IViewGroupsProps> = (props: IViewGroupsProps) => {
  const groupList = useSelector((state: RootState) => state.group.groupList);
  const filteredGroupList = groupList.filter(
    (group: Group) => group.role === "Leader"
  );
  const checkGroup = (groupId: number) => {
    return props.listGroupId.includes(groupId);
  };

  const transformedGroupList = filteredGroupList.map((group: Group) => ({
    id: group.id,
    name: group.name,
    selected: checkGroup(group.id),
  }));

  const [groups, setGroups] = useState(transformedGroupList);

  const toggleSelection = (id: number) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, selected: !group.selected } : group
      )
    );
  };

  if (!groups || groups.length === 0) {
    return (
      <>
        <Modal animationType="slide" transparent={false} visible={true}>
          <View className="flex justify-center items-center h-full">
            <Text className="p-16 text-center ">
              Hiện tại bạn chưa thuộc nhóm nào. Tạo nhóm ngay~!🔥🌸👇👇
            </Text>
            <TouchableOpacity
              className=" w-16 h-16 bg-primary-600 rounded-lg p-2 flex justify-center items-center"
              onPress={() => props.onNavigate(RootScreens.ADD_GROUP)}
            >
              <AntDesign name="plus" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  }

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
            keyExtractor={(item) => item.id.toString()}
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
              <Text className="text-body-base-semibold text-neutral-700">
                Hủy
              </Text>
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
              <Text className="text-body-base-semibold text-neutral-100">
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ViewGroups);
