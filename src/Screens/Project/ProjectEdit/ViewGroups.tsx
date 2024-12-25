import CheckBox from "@/Components/CheckBox";
import { RootScreens } from "@/Screens";
import { Group } from "@/Services/group";
import { RootState } from "@/Store";
import { AntDesign } from "@expo/vector-icons";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProjectListItem,
  GetProjectListResponse,
  useGetProjectListMutation,
} from "@/Services/projects";
import { Toast } from "toastify-react-native";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { useProjectList } from "../ProjectContainer";

interface IViewGroupsProps {
  listGroupId: number[];
  closeModal: () => void;
  handleSave: (listGroupName: number[]) => void;
  onNavigate: (screen: RootScreens) => void;
}

interface GroupWithSelected extends Group {
  selected: boolean;
}

const ViewGroups: FC<IViewGroupsProps> = (props: IViewGroupsProps) => {
  const groupList = useSelector((state: RootState) => state.group.groupList);
  const filteredGroupList = groupList.filter(
    (group: Group) => group.role === "Leader"
  );

  const project = useSelector((state: RootState) => state.project.projectList);
  const [data, setData] = useState<GetProjectListItem[] | undefined>(project);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.profile.token);

  const [refreshing, setRefreshing] = useState(false);
  const groupsInProjects = project.flatMap((p) => p.groups.map((g) => g.id));
  const availableGroups = filteredGroupList.filter(
    (group) => !groupsInProjects.includes(group.id)
  );
  const checkGroup = (groupId: number) => {
    return props.listGroupId.includes(groupId);
  };
  const transformedGroups: GroupWithSelected[] = availableGroups.map(
    (group) => ({
      ...group,
      selected: checkGroup(group.id),
    })
  );

  const [groups, setGroups] = useState<GroupWithSelected[]>(transformedGroups);

  const toggleSelection = (id: number) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, selected: !group.selected } : group
      )
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await useProjectList(token);
      if (response) {
        setData(response.data);
        setRefreshing(false);
      }
    } catch (error) {
      Toast.error(renderErrorMessageResponse(String(error)));
    }
  }, []);

  // if (!groups || groups.length === 0) {
  //   return (
  //     <Modal animationType="slide" transparent={false} visible={true}>
  //       <View className="flex justify-center items-center h-full">
  //         <Text className="p-16 text-center">
  //           Hiện tại bạn chưa thuộc nhóm nào. Tạo nhóm ngay~!🔥🌸👇👇
  //         </Text>
  //         <TouchableOpacity
  //           className=" w-16 h-16 bg-primary-600 rounded-lg p-2 flex justify-center items-center"
  //           onPress={() => props.onNavigate(RootScreens.ADD_GROUP)}
  //         >
  //           <AntDesign name="plus" size={30} color="#fff" />
  //         </TouchableOpacity>
  //       </View>
  //     </Modal>
  //   );
  // }

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View className="flex-1 justify-center items-center bg-neutral-300 bg-opacity-50">
        <View className="bg-neutral-100 rounded-[35px] w-4/5 p-4 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-body-small-bold text-neutral-500">
              Chọn nhóm
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="mb-3"
          >
            {groups.map((item) => (
              <View key={item.id} className="p-3 bg-[#FBFCFB]">
                <CheckBox
                  isChecked={item.selected}
                  onPress={() => toggleSelection(item.id)}
                  title={item.name + " " + "#" + item.id}
                />
              </View>
            ))}
          </ScrollView>
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
              className="w-28 h-11 rounded-lg items-center justify-center bg-primary-600"
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
