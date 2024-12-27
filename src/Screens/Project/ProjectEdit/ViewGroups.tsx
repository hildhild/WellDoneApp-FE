import CheckBox from "@/Components/CheckBox";
import { RootScreens } from "@/Screens";
import { Group } from "@/Services/group";
import { RootState } from "@/Store";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { AntDesign } from "@expo/vector-icons";
import React, { FC, memo, useCallback, useEffect, useState, useMemo } from "react";
import {
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { useProjectList } from "../ProjectContainer";
import { LoadingProcess } from "@/Components";

interface IViewGroupsProps {
  isVisible: boolean;
  listGroupId?: number[];
  closeModal: () => void;
  handleSave: (listGroupName: number[]) => void;
  onNavigate: (screen: RootScreens) => void;
}

interface GroupWithSelected extends Group {
  selected: boolean;
}

const ViewGroups: FC<IViewGroupsProps> = (props: IViewGroupsProps) => {
  const groupList = useSelector((state: RootState) => state.group.groupList);
  const filteredGroupList = useMemo(() => 
    groupList.filter((group: Group) => group.role === "Leader"),
    [groupList]
  );
  
  const token = useSelector((state: RootState) => state.profile.token);
  const { data: project, isLoading: isProjectLoading } = useProjectList(token);

  const [refreshing, setRefreshing] = useState(false);
  const [groups, setGroups] = useState<GroupWithSelected[]>([]);

  const groupsInProjects = useMemo(() => 
    project?.flatMap((p) => p.groups.map((g) => g.id)) ?? [],
    [project]
  );

  const availableGroups = useMemo(() => 
    filteredGroupList.filter(group => !groupsInProjects.includes(group.id) ||(props.listGroupId && props.listGroupId.includes(group.id))),
    [filteredGroupList, groupsInProjects]
  );

  useEffect(() => {
    if (project && !isProjectLoading) {
      const transformedGroups: GroupWithSelected[] = availableGroups.map((group) => ({
        ...group,
        selected: props.listGroupId?.includes(group.id) || false,
      }));
      setGroups(transformedGroups);
    }
  }, [project, isProjectLoading, availableGroups, props.listGroupId]);

  const toggleSelection = useCallback((id: number) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === id ? { ...group, selected: !group.selected } : group
      )
    );
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await useProjectList(token);
      if (response) {
        setRefreshing(false);
      }
    } catch (error) {
      Toast.error(renderErrorMessageResponse(String(error)));
    } finally {
      setRefreshing(false);
    }
  }, [token]);

  return (
    <>
      <LoadingProcess isVisible={isProjectLoading} />
      <Modal animationType="fade" transparent={true} visible={props.isVisible}>
        <View className="flex-1 justify-center items-center bg-[#00000090] bg-opacity-50">
          {
            groups.length === 0
            ?
            <View className="bg-neutral-100 rounded-[35px] w-4/5 p-8 shadow-lg items-center relative">
              <TouchableOpacity className="absolute right-5 top-5" onPress={props.closeModal}>
                <AntDesign name="close" size={25} color="#000" />
              </TouchableOpacity>
              <Text className="text-center mb-4 mt-8">
                Bạn chưa có nhóm hoặc nhóm của bạn đã được gán cho những dự án khác.
                Hãy tạo mới ngay!🔥🌸
              </Text>
              <TouchableOpacity
                className="w-16 h-16 bg-primary-600 rounded-lg p-2 flex justify-center items-center"
                onPress={() => {
                  props.closeModal();
                  props.onNavigate(RootScreens.ADD_GROUP);
                }
                }
              >
                <AntDesign name="plus" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            :
            <View className="bg-neutral-100 rounded-[35px] w-4/5 p-4 shadow-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-body-small-bold text-neutral-500">
                  Chọn nhóm
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.closeModal();
                    props.onNavigate(RootScreens.ADD_GROUP);
                  }
                  }
                >
                  <Text className="font-semibold text-lime-600 text-sm">Thêm nhóm</Text>
                </TouchableOpacity>
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
                  onPress={props.closeModal}
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
          }
        </View>
      </Modal>
    </>
    
  );
};

export default memo(ViewGroups);