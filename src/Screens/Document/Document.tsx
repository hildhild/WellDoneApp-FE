import React, { useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setGroupList } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAddGroupMutation, useGetGroupsMutation, User } from "@/Services/group";
import { LoadingProcess } from "@/Components";


export const Document = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState<{name: string, id: number}[]>([]);
  const [groupData, setGroupData] = useState<{name: string, description: string}>({
    name: "",
    description: ""
  });
  const userList = useSelector((state: any) => state.userList.userList).map((user: User) => {
    return {
      label: user.name,
      value: user.id
    };
  });
  const [addGroupApi, {isLoading: addLoading}] = useAddGroupMutation();
  const [getGroups, {isLoading: getLoading}] = useGetGroupsMutation();

  const handleCreateGroup = async () => {
    try {
      const response = await addGroupApi({
        data: {
          name: groupData.name,
          description: groupData.description,
          list_user_members: selectedUsers.map((user: any) => {return user.id;})
        },
        token: accessToken
      }).unwrap();
      if ("id" in response) {
        Toast.success("Thêm thành công");
        const groupsResponse = await getGroups(
          accessToken
        ).unwrap();
        if (Array.isArray(groupsResponse)) {
          dispatch(
            setGroupList(groupsResponse)
          );
          navigation.goBack();
        }
        else if (groupsResponse.message === "Group not found") {
          dispatch(
            setGroupList([])
          );
        } else {
          Toast.error("Lỗi")
        }
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
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <LoadingProcess isVisible={addLoading || getLoading}/>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Tài liệu</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <Pressable className="absolute right-5 bottom-10 w-16 h-16 flex justify-center items-center rounded-full bg-lime-900" onPress={() => navigation.goBack()}>
        <Icon name="plus" size={30} color="#fff" />
      </Pressable>
      <ScrollView className="w-full p-6">
        <View className="rounded-2xl bg-white overflow-hidden">
          <View className="bg-lime-500 flex-row py-3 px-5 justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <Icon name="calendar" size={20} color="#fff" />
              <Text className="text-white">19/07/2022</Text>
            </View>
            <View className="flex-row gap-6 items-center">
              <Icon name="info-circle" size={25} color="#fff" />
              <Icon name="trash" size={25} color="#fff" />
            </View>
          </View>
          <View className="px-5">
            <View className="flex-row items-center border-b-[1px] border-gray-300 py-5 px-3">
              <Icon name="dot-circle-o" size={25} color="#24A19C" />
              <Text className="ml-5 text-xl font-semibold">Project_Plan_V1.docx</Text>
            </View>
            <View className="p-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-5">
                <View className="flex-row items-center">
                  <Icon name="clock-o" size={20} color="#65A30D" />
                  <Text className="text-lime-600 ml-3">08.30 PM</Text>
                </View>
                <View className="flex-row items-center">
                  <Icon name="download" size={20} color="#65A30D" />
                  <Text className="text-lime-600 ml-3">2</Text>
                </View>
              </View>
              <View>
                <Text className="font-semibold">Lê Đình Huy</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    padding: 15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 10
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});