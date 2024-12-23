import React, { useState } from "react";
import { View, Text, Pressable, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Button, ScrollView } from "native-base";
import { RootScreens } from "..";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Toast } from "toastify-react-native";
import { useDispatch, useSelector } from "react-redux";
import { setGroupList } from "@/Store/reducers";
import { ErrorHandle } from "@/Services";
import { StyleSheet } from 'react-native';
import { useAddGroupMutation, useGetGroupsMutation, User } from "@/Services/group";
import { LoadingProcess } from "@/Components";
import * as DocumentPicker from 'expo-document-picker';
import { useGetFileMutation, useUploadFileMutation } from "@/Services/document";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const MyIcon = Icon as unknown as React.ComponentType<any>;

export const Document = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const navigation = useNavigation();
  const accessToken = useSelector((state: any) => state.profile.token);
  const dispatch = useDispatch();
  const [uploadFileApi, {isLoading: uploadLoading}] = useUploadFileMutation();
  const [getFileApi, {isLoading: getLoading}] = useGetFileMutation();
  const [fileUpload, setFileUpload] = useState<any | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);


  const blobToBase64 = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString().split(',')[1];
        if (base64) {
          resolve(base64);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Error reading blob'));
      };
      reader.readAsDataURL(blob);
    });
  };
  

  const downloadBlob = async (blob: any, filename: string) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const base64 = await blobToBase64(blob);
  
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      console.log('File saved to:', fileUri);
  
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        console.log("share");
      } else {
        console.log('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  
  

  const pickDocument = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: '*/*', 
        copyToCacheDirectory: true, 
      });

      if (!result.cancel) {
        const file = result.assets[0];
        if (!["application/pdf", "application/docs", "application/txt"].includes(file.mimeType)) {
          Toast.error("Chỉ chấp nhận pdf, txt và docs")
        } else {
          setFileUpload(file);
        }
        console.log('File picked:', result);
      } else {
        console.log(result);
        console.log('User canceled file selection.');
      }
    } catch (error) {
      // console.error('Error picking document:', error);
      Toast.error("Vui lòng tải tệp lên")
    }
  };

  const handleUploadFile = async () => {
    if (fileUpload) {
      try {
        console.log(fileUpload.type, fileUpload.mimeType)
        const response = await uploadFileApi({
          data: {
            file:  {
              uri: fileUpload.uri,
              name: fileUpload.name,
              type: fileUpload.mimeType,
            },
            task_id: 4
          },
          token: accessToken
        }).unwrap();
        if ("id" in response) {
          Toast.success(`Tải lên thành công ${response.id}`);
          setIsUpload(false);
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
    } else {
      Toast.error("Vui lòng tải tệp lên")
    }
  }

  const handleGetFile = async () => {
    try {
      console.log(1);
      const response = await getFileApi({
        documentId: 20,
        token: accessToken
      }).unwrap();
      console.log(2);
      if (response instanceof Blob) {
        const url = URL.createObjectURL(response);
        console.log("url: " , url)

        downloadBlob(response, "file.pdf");
        Toast.success("Tải xuống thành công");
        console.log(response);
      }
      console.log(3)
    } catch (err) {
      console.log("lỗi", err, typeof(err));
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err as ErrorHandle;
        Toast.error(
          String(errorData.data.message),
          "top"
        );
        // Toast.error("Lỗi tải xuống")
      }
    }
  }


  return (
    <KeyboardAvoidingView className="bg-[#F8FBF6] w-full h-full relative" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isUpload}
        >
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="mb-3">
              <View className="w-full flex-col justify-center items-center mb-3">
                <Text className="font-bold text-2xl mb-5">Tải tài liệu lên</Text>
                <View className="h-[100px]">
                  {
                    fileUpload
                    ?
                    <View className="w-full gap-3 flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                      <Text className="font-semibold w-[80%]">{fileUpload.name}</Text>
                      <View className="flex-row gap-3 items-center">
                        <View className={`rounded-full p-2 ${fileUpload.mimeType === "application/pdf" ? "bg-[#F0463C]" : fileUpload.mimeType === "application/txt" ? "bg-[#454140]" : "bg-[#5991F8]"}`}>
                          <Text className="text-xs text-white font-semibold">{fileUpload.mimeType === "application/pdf" ? "pdf" : fileUpload.mimeType === "application/txt" ? "txt" : "docs"}</Text>
                        </View>
                      </View>
                      <Pressable onPress={() => setFileUpload(null)}>
                        <MyIcon name="trash" size={25}/>
                      </Pressable>
                    </View>
                    :
                    <View className="w-full h-[100px] flex justify-center items-center">
                      <Text className="text-xl">Chưa tải lên tệp nào</Text>
                    </View>
                  }
                </View>
              </View>
            </View>
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable className="!rounded-xl !bg-gray-300 px-5 py-3" onPress={()=>setIsUpload(false)}>
                <Text className="text-black font-semibold">Hủy bỏ</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3 bg-blue-600" onPress={pickDocument}>
                <Text className="text-white font-semibold">Tải lên</Text>
              </Pressable>
              <Pressable className="!rounded-xl px-5 py-3 bg-lime-600" onPress={handleUploadFile}>
                <Text className="text-white font-semibold">Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingProcess isVisible={uploadLoading || getLoading}/>
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">Tài liệu</Text>
      </View>
      <Pressable className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400" onPress={() => navigation.goBack()}>
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <Pressable className="z-50 absolute right-5 bottom-10 w-16 h-16 flex justify-center items-center rounded-full bg-lime-900" onPress={()=>setIsUpload(true)}>
        <MyIcon name="plus" size={30} color="#fff" />
      </Pressable>
      <ScrollView className="w-full p-6">
        {/* <Text>File đã tải lên:</Text>
        {
          fileUpload 
          && (
          <Text style={{ marginTop: 20 }}>
            Selected File: {fileUpload.name} ({fileUpload.size} bytes)
          </Text>
        )} */}
        {/* <Text>{fileUpload?.uri}</Text> */}
        {/* <Pressable onPress={handleUploadFile} className="p-8 bg-lime-500 mb-5"><Text>Tải lên</Text></Pressable> */}
        <Pressable onPress={handleGetFile} className="p-8 bg-lime-500 mb-5"><Text>Tải xuống</Text></Pressable>
        <View className="rounded-2xl bg-white overflow-hidden">
          <View className="bg-lime-500 flex-row py-3 px-5 justify-between items-center">
            <View className="flex-row gap-3 items-center">
              <MyIcon name="calendar" size={20} color="#fff" />
              <Text className="text-white">19/07/2022</Text>
            </View>
            <View className="flex-row gap-6 items-center">
              <MyIcon name="info-circle" size={25} color="#fff" />
              <MyIcon name="trash" size={25} color="#fff" />
            </View>
          </View>
          <View className="px-5">
            <View className="flex-row items-center border-b-[1px] border-gray-300 py-5 px-3">
              <MyIcon name="dot-circle-o" size={25} color="#24A19C" />
              <Text className="ml-5 text-xl font-semibold">Project_Plan_V1.docx</Text>
            </View>
            <View className="p-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-5">
                <View className="flex-row items-center">
                  <MyIcon name="clock-o" size={20} color="#65A30D" />
                  <Text className="text-lime-600 ml-3">08.30 PM</Text>
                </View>
                <View className="flex-row items-center">
                  <MyIcon name="download" size={20} color="#65A30D" />
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