import React, { useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/Services/profile";
import { removeToken, setGroupList, setProfile } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAddGroupMutation, useGetGroupsMutation, User } from "@/Services/group";

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


export const AddGroup = (props: {
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
  const [addGroupApi] = useAddGroupMutation();
  const [getGroups] = useGetGroupsMutation();


  // const handleEditProfile = async () => {
  //   if (editable){
  //     try {
  //       const response = await updateProfile({
  //         data: {
  //           name: profileData.name,
  //           dateofbirth: profileData.dateOfBirth.toISOString(),
  //         },
  //         token: accessToken
  //       }).unwrap();
  //       if ("name" in response) {
  //         Toast.success("Chỉnh sửa thành công")
  //         dispatch(setProfile({name: profileData.name, dateOfBirth: profileData.dateOfBirth.toISOString(), email: profileData.email}));
  //         setEditable(false);
  //       }
  //     } catch (err) {
  //       if (err && typeof err === "object" && "data" in err) {
  //         const errorData = err as ErrorHandle;
  //         Toast.error(
  //           renderErrorMessageResponse(String(errorData.data.message)),
  //           "top"
  //         );
  //       }
  //     }
  //   } else {
  //     setEditable(true);
  //   }
  // }

  // const handleChangePassword = async () => {
  //   if (isChangePassword) {
  //     if (changePasswordData.rePassword !== changePasswordData.newPassword){
  //       Toast.error("Mật khẩu không khớp");
  //     } else {
  //       try {
  //         const response = await changePassword({
  //           data: {
  //             password: changePasswordData.curPassword,
  //             newPassword: changePasswordData.newPassword,
  //           },
  //           token: accessToken
  //         }).unwrap();
  //         if (response === null || response === undefined){
  //           Toast.success("Đổi thành công, vui lòng đăng nhập lại")
  //           setEditable(false);
  //           dispatch(removeToken());
  //           props.onNavigate(RootScreens.LOGIN);
  //         }
  //       } catch (err) {
  //         if (err && typeof err === "object" && "data" in err) {
  //           const errorData = err as ErrorHandle;
  //           Toast.error(
  //             renderErrorMessageResponse(String(errorData.data.message)),
  //             "top"
  //           );
  //         }
  //       }
  //     }
  //   } else {
  //     setIsChangePassword(true);
  //   }
  // }
  const handleCreateGroup = async () => {
    try {
      const response = await addGroupApi({
        data: {
          name: groupData.name,
          description: groupData.description,
          list_user_members: userList.map((user: any) => user.id)
        },
        token: accessToken
      }).unwrap();
      if ("name" in response) {
        navigation.goBack()
        Toast.success("Thêm thành công")
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
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Thêm nhóm</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <ScrollView className="w-full p-6">
        <View className="mb-3">
          <Text className="text-xl text-[#3F6212] font-semibold mb-3">Thông tin chung</Text>
          <Text className="mb-2 font-semibold text-neutral-500 text-lg">Tên nhóm</Text>
          <TextInput
            editable
            placeholder="Nhập tên nhóm"
            className=" text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
            value={groupData.name}
            onChangeText={(name) => setGroupData({...groupData, name: name})}
          />
          <Text className="mb-2 font-semibold text-neutral-500 text-lg">Mô tả nhóm</Text>
          <TextInput
            editable
            placeholder="Nhập mô tả nhóm"
            multiline
            className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
            value={groupData.description}
            onChangeText={(description) => setGroupData({...groupData, description: description})}
          />
        </View>
        <View>
          <Text className="text-xl text-[#3F6212] font-semibold mb-3">Thêm thành viên</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={userList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn thành viên"
            searchPlaceholder="Tìm kiếm..."
            onChange={item => {
              setSelectedUsers([...selectedUsers, {name: item.label, id: item.value}]);
            }}
            renderLeftIcon={() => (
              <Icon color="black" name="search" size={15} />
            )}
          />
          {
            selectedUsers.map((user: any) => 
              <View key={user.id} className="flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                <Text className="font-semibold">{user.name}</Text>
                <View className="flex-row gap-3 items-center">
                  <View className="rounded-full p-2 bg-lime-200">
                    <Text className="text-xs text-lime-800 font-semibold">Thành viên</Text>
                  </View>
                  <Pressable onPress={() => setSelectedUsers((prevUsers) => prevUsers.filter((userItem) => userItem.id !== user.id))}>
                    <Icon name="trash" size={20}/>
                  </Pressable>
                </View>
              </View>
            )
          }
          <Pressable className="mt-5 w-full flex justify-center items-center bg-lime-600 p-3 rounded-xl" onPress={handleCreateGroup}><Text className="text-white text-lg font-semibold">Xác nhận</Text></Pressable>
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