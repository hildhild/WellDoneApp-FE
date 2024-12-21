import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Platform, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Button } from "native-base";
import { ErrorHandle, User } from "@/Services";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";
import { AvatarRow } from "@/Components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import { Group as GroupType, useDeleteGroupMutation, useGetGroupsMutation, useUpdateGroupMutation } from "@/Services/group";
import { Toast } from "toastify-react-native";
import { setCurGroup, setGroupList } from "@/Store/reducers";

export interface IGroupProps {
  onNavigate: (screen: RootScreens) => void;
  data: User | undefined;
  isLoading: boolean;
}

export const Group = (props: IGroupProps) => {
  const { data, isLoading } = props;
  const [editGroup, setEditGroup] = useState<boolean>(false);
  const [deleteGroup, setDeleteGroup] = useState<boolean>(false);
  const [refetch, setRefect] = useState<boolean>(false);
  const groupList = useSelector((state: RootState) => state.group.groupList);
  const [groupGeneral, setGroupGeneral] = useState<any>({
    id: null,
    name: "",
    description: ""
  });
  const [updateGroupApi] = useUpdateGroupMutation();
  const [deleteGroupApi] = useDeleteGroupMutation();
  const accessToken = useSelector((state: RootState) => state.profile.token);
  const [getGroups] = useGetGroupsMutation();
  const dispatch = useDispatch();

  const getGroupList = async () => {
    const groupsResponse = await getGroups(
      accessToken
    ).unwrap();
    if (Array.isArray(groupsResponse)) {
      dispatch(
        setGroupList(groupsResponse)
      );
    }
    else if (groupsResponse.message === "Group not found") {
      dispatch(
        setGroupList([])
      );
    } else {
      Toast.error("Lỗi")
    }
  }

  useEffect(() => {
    getGroupList();
  }, [refetch])


  const handleEditGroup = async () => {
    try {
      const res = await updateGroupApi({
        data: {
          name: groupGeneral.name,
          description: groupGeneral.description
        },
        token: accessToken,
        groupId: groupGeneral.id
      }).unwrap();
      if ("id" in res) {
        Toast.success("Chỉnh sửa thành công");
        setEditGroup(false);
        setRefect(!refetch);
      } else {
  
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          String(errorData.data.message),
          "top"
        );
      }
    }
  }

  const handleDeleteGroup = async () => {
    try {
      const res = await deleteGroupApi({
        token: accessToken,
        groupId: groupGeneral.id
      }).unwrap();
      if (!res) {
        Toast.success("Xóa thành công");
        setDeleteGroup(false);
        setRefect(!refetch);
      } else {
  
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          String(errorData.data.message),
          "top"
        );
      }
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View className="bg-[#F8FBF6] w-full h-full relative">
          <Modal
            animationType="fade"
            transparent={true}
            visible={editGroup}
            >
            <Pressable className="flex justify-center items-center w-full h-full bg-[#00000090]" onPress={() => Keyboard.dismiss()}>
              <View className="bg-white w-[90%] p-4 rounded-2xl">
                <View className="w-full flex-row justify-center mb-3">
                  <Text className="font-bold text-2xl">Chỉnh sửa nhóm</Text>
                </View>
                <View className="mb-3">
                  <Text className="mb-2 font-semibold text-neutral-500 text-lg">Tên nhóm</Text>
                  <TextInput
                    editable
                    placeholder="Nhập tên nhóm"
                    className=" text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                    value={groupGeneral.name}
                    onChangeText={(newName) => setGroupGeneral({...groupGeneral, name: newName})}
                  />
                  <Text className="mb-2 font-semibold text-neutral-500 text-lg">Mô tả nhóm</Text>
                  <TextInput
                    editable
                    placeholder="Nhập mô tả nhóm"
                    multiline
                    className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                    value={groupGeneral.description}
                    onChangeText={(newDes) => setGroupGeneral({...groupGeneral, description: newDes})}
                  />
                </View>
                
                <View className="w-full flex-row gap-3 justify-end items-center">
                  <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setEditGroup(false)}>
                    <Text className="text-black font-semibold">Hủy bỏ</Text>
                  </Pressable>
                  <Pressable className="!rounded-xl !bg-lime-300 px-5 py-3" onPress={handleEditGroup}>
                    <Text className="text-black font-semibold">Lưu</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={deleteGroup}
            >
            <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
              <View className="bg-white w-[90%] p-4 rounded-2xl">
                <View className="mb-3">
                  <View className="w-full flex-col justify-center items-center mb-3">
                    <Text className="font-bold text-2xl mb-5">Xóa nhóm</Text>
                    <Text className="text-xl text-center">Bạn có chắc chắn muốn xóa nhóm {groupGeneral.name} không?</Text>
                  </View>
                </View>
                
                <View className="w-full flex-row gap-3 justify-end items-center">
                  <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setDeleteGroup(false)}>
                    <Text className="text-black font-semibold">Hủy bỏ</Text>
                  </Pressable>
                  <Pressable className="!rounded-xl px-5 py-3" style={{ backgroundColor: "red"}} onPress={handleDeleteGroup}>
                    <Text className="text-white font-semibold">Xóa</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <View className="w-full h-24 pb-4 flex justify-end items-center">
            <Text className="text-2xl font-bold px-10 text-center text-black">Nhóm</Text>
          </View>
          <ScrollView className="px-6 py-3">
            <Pressable className="w-full flex justify-center items-center bg-[#4D7C0F] p-3 rounded-xl mb-5" onPress={()=>props.onNavigate(RootScreens.ADD_GROUP)}><Text className="text-white text-lg font-semibold">Thêm nhóm</Text></Pressable>
            <View className="w-full flex-row justify-end mb-4">
              <Text className="text-[#2C6E35] font-semibold text-lg">Tổng số: {groupList.length}</Text>
            </View>
            {
              groupList.map((group: GroupType)=> 
                <View className="bg-[#DCFCE7] rounded-xl p-5 mb-8" key={group.id}>
                  <View className="flex flex-row mb-5 items-center">
                    <View className="w-[40%]">
                      <Image
                        className="w-[60px] h-[60px] object-cover rounded-full border-[1px] border-black"
                        source={require('assets/dark-logo.png')}
                      />
                    </View>
                    <View className="w-[60%]">
                      {/* <Text className="text-[#2C6E35] font-semibold mb-3">Đang thực hiện: 12</Text> */}
                      <Text className="text-[#2C6E35] font-semibold mb-3">Thành viên: {group.user.length}</Text>
                      <Text className="text-[#2C6E35] font-semibold">Vai trò: {group.role === "Leader" ? "Nhóm trưởng" : "Thành viên"}</Text>
                    </View>
                  </View>
                  <Text className="font-semibold text-2xl mb-4">{group.name}</Text>
                  <Text className="text-xl font-extralight mb-3">{group.description}</Text>
                  <View className="mb-4 flex-row">
                    {
                      group.user.slice(0,2).map((user, index) => <Text key={user.id}>{index !== group.user.length-1 ? user.name + ", " : user.name}</Text>)
                    }
                    {
                      group.user.length > 2
                      ? 
                      <Text>...</Text>
                      :
                      <></>
                    }
                  </View>
                  <View className="flex flex-row gap-[3%] justify-end">
                    <Pressable className="w-[42%] flex justify-center items-center bg-[#A0D683] p-3 rounded-xl" onPress={()=>{props.onNavigate(RootScreens.GROUP_DETAIL); dispatch(setCurGroup(group))}}><Text className="text-[#2C6E35] text-lg font-semibold">Chi tiết</Text></Pressable>
                    {
                      group.role === "Leader"
                      &&
                      <>
                        <Pressable className="w-[42%] flex justify-center items-center bg-[#A0D683] p-3 rounded-xl" onPress={()=>{setEditGroup(true); setGroupGeneral({id: group.id, name: group.name, description: group.description})}}><Text className="text-[#2C6E35] text-lg font-semibold">Chỉnh sửa</Text></Pressable>
                        <Pressable className="w-[10%] flex justify-center items-center" onPress={()=>{setDeleteGroup(true); setGroupGeneral({id: group.id, name: group.name, description: group.description})}}>
                          <Icon name="trash" color="red" size={30}/>
                        </Pressable>
                      </>
                    
                    }
                    
                  </View>
                </View>
              )
            }
            <View className="mb-24"></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
