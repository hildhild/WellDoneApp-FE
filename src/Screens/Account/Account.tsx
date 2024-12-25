import React, { useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import Entypo from "react-native-vector-icons/Entypo";
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/Services/profile";
import { removeToken, setProfile } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { renderErrorMessageResponse } from "@/Utils/Funtions/render";
import Avatar from "@/Components/Avatar";

const MyIcon = Icon as unknown as React.ComponentType<any>;
const MyEntypo = Entypo as unknown as React.ComponentType<any>;


export const Account = (props: {
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
          dispatch(setProfile({id: profile.id, name: profileData.name, dateOfBirth: profileData.dateOfBirth.toISOString(), email: profileData.email}));
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

  const handleChangeDateOfBirth = (event: DateTimePickerEvent, selectedDate: Date | undefined): void => {
    if (selectedDate) {
      setProfileData({...profileData, dateOfBirth: selectedDate}); 
    }
  };

  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>

      {/* <Modal
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
      </Modal> */}
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Tài khoản</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <ScrollView>
        <View className="w-full flex justify-end items-center p-6">
          {/* <Image
            className="w-[100px] h-[100px] object-cover rounded-full border-[1px] border-black mb-3"
            source={require('assets/dark-logo.png')}
          /> */}
          <Avatar name={profile.name} width={100} height={100}/>
          <Text className="font-bold text-xl mt-3">{profile.name}</Text>
          <Text className="text-[#ababab] text-lg">{profile.email}</Text>
          <View className="w-full mb-4">
              <Text className="mb-3 font-semibold text-neutral-500">Họ và tên:</Text>
              <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                <TextInput
                  placeholder="Họ và tên"
                  editable={editable}
                  className="flex-1 text-neutral-700 text-body-base-regular"
                  value={profileData.name}
                  onChangeText={(name) => setProfileData({...profileData, name: name})}
                />
              </View>
              <Text className="mb-3 font-semibold text-neutral-500">Ngày sinh:</Text>
              <View className={`flex-row items-center justify-between bg-lime-100 rounded-lg ${editable ? "py-2" : "py-4"} px-4 mb-4`} >
                {
                  editable
                  ?
                  <DateTimePicker
                    value={profileData.dateOfBirth}
                    mode="date" 
                    display="default"
                    onChange={handleChangeDateOfBirth}
                    themeVariant="light"
                    minimumDate={new Date()}
                    className="ml-[-550px]"
                  />
                  :
                  <TextInput
                    placeholder="Ngày sinh"
                    editable={false}
                    className="flex-1 text-neutral-700 text-body-base-regular"
                    value={profileData.dateOfBirth.toLocaleDateString()}
                  />
                }
                
                <MyIcon name="calendar" size={20}/>
              </View>
              
              <Text className="mb-3 font-semibold text-neutral-500">Email:</Text>
              <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                <TextInput
                  placeholder="Email"
                  editable={false}
                  className="flex-1 text-neutral-700 text-body-base-regular"
                  value={profileData.email}
                />
              </View>
              <View className="flex w-full justify-center items-center">
                <Button className="w-[180px] !rounded-full mb-5 !bg-lime-300" onPress={handleEditProfile}>
                  <Text className="text-black font-semibold">{!editable ? "Chỉnh sửa" : "Lưu"}</Text>
                </Button>
              </View>
              <Text className="mb-3 font-semibold text-neutral-500">{isChangePassword ? "Mật khẩu hiện tại" : "Đổi mật khẩu:"}</Text>
              {
                  isChangePassword
                  &&
                  <>
                    <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                      <TextInput
                        placeholder="Mật khẩu hiện tại"
                        editable={isChangePassword}
                        secureTextEntry={!passwordVisible}
                        className="flex-1 text-neutral-700 text-body-base-regular"
                        value={changePasswordData.curPassword}
                        onChangeText={(curPassword) => setChangePasswordData({...changePasswordData, curPassword: curPassword})}
                      />
                      <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      >
                        <MyEntypo
                          name={passwordVisible ? "eye" : "eye-with-line"}
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text className="mb-3 font-semibold text-neutral-500">Mật khẩu mới:</Text>
                    <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                      <TextInput
                        placeholder="Mật khẩu mới"
                        editable={isChangePassword}
                        secureTextEntry={!passwordVisible}
                        className="flex-1 text-neutral-700 text-body-base-regular"
                        value={changePasswordData.newPassword}
                        onChangeText={(newPassword) => setChangePasswordData({...changePasswordData, newPassword: newPassword})}
                      />
                      <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      >
                        <MyEntypo
                          name={passwordVisible ? "eye" : "eye-with-line"}
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text className="mb-3 font-semibold text-neutral-500">Xác nhận mật khẩu:</Text>
                    <View className="flex-row items-center bg-lime-100 rounded-lg p-4 mb-4">
                      <TextInput
                        placeholder="Xác nhận mật khẩu"
                        editable={isChangePassword}
                        secureTextEntry={!passwordVisible}
                        className="flex-1 text-neutral-700 text-body-base-regular"
                        value={changePasswordData.rePassword}
                        onChangeText={(rePassword) => setChangePasswordData({...changePasswordData, rePassword: rePassword})}
                      />
                      <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      >
                        <MyEntypo
                          name={passwordVisible ? "eye" : "eye-with-line"}
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                }
              <View className="flex w-full justify-center items-center">
                <Button className="w-[180px] !rounded-full mb-5 !bg-lime-300" onPress={handleChangePassword}>
                  <Text className="text-black font-semibold">{!isChangePassword ? "Đổi mật khẩu" : "Lưu"}</Text>
                </Button>
              </View>
          </View>
        </View>
      </ScrollView>
      
    </KeyboardAvoidingView>
    
  );
};
