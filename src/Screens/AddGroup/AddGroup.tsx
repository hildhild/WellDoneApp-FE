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
import { removeToken, setProfile } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import { TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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
  const [editable, setEditable] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const profile = useSelector((state: any) => state.profile);
  const [profileData, setProfileData] = useState<{name: string, dateOfBirth: Date, email: string}>({
    name: profile.name,
    dateOfBirth: new Date(profile.dateOfBirth),
    email: profile.email
  });
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [changePasswordData, setChangePasswordData] = useState<{curPassword: string, newPassword: string, rePassword: string}>({
    curPassword: "",
    newPassword: "",
    rePassword: ""
  })
  const [value, setValue] = useState<string | null>(null);


  const handleEditProfile = async () => {
    if (editable){
      try {
        const response = await updateProfile({
          data: {
            name: profileData.name,
            dateofbirth: profileData.dateOfBirth.toISOString(),
          },
          token: accessToken
        }).unwrap();
        if ("name" in response) {
          Toast.success("Chỉnh sửa thành công")
          dispatch(setProfile({name: profileData.name, dateOfBirth: profileData.dateOfBirth.toISOString(), email: profileData.email}));
          setEditable(false);
        }
      } catch (err) {
        if (err && typeof err === "object" && "data" in err) {
          const errorData = err as ErrorHandle;
          Toast.error(
            renderErrorMessageResponse(String(errorData.data.message)),
            "top"
          );
        }
      }
    } else {
      setEditable(true);
    }
  }

  const handleChangePassword = async () => {
    if (isChangePassword) {
      if (changePasswordData.rePassword !== changePasswordData.newPassword){
        Toast.error("Mật khẩu không khớp");
      } else {
        try {
          const response = await changePassword({
            data: {
              password: changePasswordData.curPassword,
              newPassword: changePasswordData.newPassword,
            },
            token: accessToken
          }).unwrap();
          if (response === null || response === undefined){
            Toast.success("Đổi thành công, vui lòng đăng nhập lại")
            setEditable(false);
            dispatch(removeToken());
            props.onNavigate(RootScreens.LOGIN);
          }
        } catch (err) {
          if (err && typeof err === "object" && "data" in err) {
            const errorData = err as ErrorHandle;
            Toast.error(
              renderErrorMessageResponse(String(errorData.data.message)),
              "top"
            );
          }
        }
      }
    } else {
      setIsChangePassword(true);
    }
  }

  const handleChangeDateOfBirth = (event: any, selectedDate: Date) => {
    if (selectedDate) {
      setProfileData({...profileData, dateOfBirth: selectedDate}); 
    }
  };

  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openDatePicker}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] py-3">
            <DateTimePicker
              value={profileData.dateOfBirth}
              mode="date" 
              display="spinner"
              onChange={handleChangeDateOfBirth}
              themeVariant="light"
            />
            <View className="w-full flex justify-center items-center">
              <Button className="!rounded-full !bg-lime-300" onPress={()=>setOpenDatePicker(false)}>
                <Text className="text-black font-semibold">Xong</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
            // value={changePasswordData.newPassword}
            // onChangeText={(newPassword) => setChangePasswordData({...changePasswordData, newPassword: newPassword})}
          />
          <Text className="mb-2 font-semibold text-neutral-500 text-lg">Mô tả nhóm</Text>
          <TextInput
            editable
            placeholder="Nhập mô tả nhóm"
            multiline
            className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
            // value={changePasswordData.newPassword}
            // onChangeText={(newPassword) => setChangePasswordData({...changePasswordData, newPassword: newPassword})}
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
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn thành viên"
            searchPlaceholder="Tìm kiếm..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <Icon color="black" name="search" size={15} />
            )}
          />
          <View className="flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
            <Text className="font-semibold">Lisa Blackpink</Text>
            <View className="flex-row gap-3 items-center">
              <View className="rounded-full p-2 bg-lime-200">
                <Text className="text-xs text-lime-800 font-semibold">Thành viên</Text>
              </View>
              <Pressable>
                <Icon name="trash" size={20}/>
              </Pressable>
            </View>
          </View>
          <Pressable className="mt-5 w-full flex justify-center items-center bg-lime-600 p-3 rounded-xl"><Text className="text-white text-lg font-semibold">Xác nhận</Text></Pressable>
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