import { LoadingProcess } from '@/Components';
import { ScrollView } from 'native-base';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyIcon = Icon as unknown as React.ComponentType<any>;

interface DocumentProps {
  isUpload: boolean;
  setIsUpload: (value: boolean) => void;
  fileUpload: any;
  setFileUpload: (file: any) => void;
  isLoading: boolean;
  onPickDocument: () => void;
  onUploadFile: () => void;
  onGetFile: () => void;
  onNavigateBack: () => void;
}

export const Document: React.FC<DocumentProps> = ({
  isUpload,
  setIsUpload,
  fileUpload,
  setFileUpload,
  isLoading,
  onPickDocument,
  onUploadFile,
  onGetFile,
  onNavigateBack,
}) => {
  const getFileTypeColor = (mimeType: string) => {
    switch (mimeType) {
      case 'application/pdf':
        return 'bg-[#F0463C]';
      case 'application/txt':
        return 'bg-[#454140]';
      default:
        return 'bg-[#5991F8]';
    }
  };

  const getFileTypeLabel = (mimeType: string) => {
    switch (mimeType) {
      case 'application/pdf':
        return 'pdf';
      case 'application/txt':
        return 'txt';
      default:
        return 'docs';
    }
  };

  return (
    <KeyboardAvoidingView
      className="bg-[#F8FBF6] w-full h-full relative"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Modal animationType="fade" transparent={true} visible={isUpload}>
        <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
          <View className="bg-white w-[90%] p-4 rounded-2xl">
            <View className="mb-3">
              <View className="w-full flex-col justify-center items-center mb-3">
                <Text className="font-bold text-2xl mb-5">Upload Document</Text>
                <Text className="text-red-500 font-semibold">
                  Note: File name must not contain accents
                </Text>
                <View>
                  {fileUpload ? (
                    <View className="w-full gap-3 flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                      <Text className="font-semibold w-[80%]">{fileUpload.name}</Text>
                      <View className="flex-row gap-3 items-center">
                        <View className={`rounded-full p-2 ${getFileTypeColor(fileUpload.mimeType)}`}>
                          <Text className="text-xs text-white font-semibold">
                            {getFileTypeLabel(fileUpload.mimeType)}
                          </Text>
                        </View>
                      </View>
                      <Pressable onPress={() => setFileUpload(null)}>
                        <MyIcon name="trash" size={25} />
                      </Pressable>
                    </View>
                  ) : (
                    <View className="w-full h-[100px] flex justify-center items-center">
                      <Text className="text-xl">No file uploaded</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View className="w-full flex-row gap-3 justify-end items-center">
              <Pressable
                className="!rounded-xl !bg-gray-300 px-5 py-3"
                onPress={() => setIsUpload(false)}
              >
                <Text className="text-black font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                className="!rounded-xl px-5 py-3 bg-blue-600"
                onPress={onPickDocument}
              >
                <Text className="text-white font-semibold">Upload</Text>
              </Pressable>
              <Pressable
                className="!rounded-xl px-5 py-3 bg-lime-600"
                onPress={onUploadFile}
              >
                <Text className="text-white font-semibold">Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingProcess isVisible={isLoading} />
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">
          Documents
        </Text>
      </View>
      <Pressable
        className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
        onPress={onNavigateBack}
      >
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>
      <Pressable
        className="z-50 absolute right-5 bottom-10 w-16 h-16 flex justify-center items-center rounded-full bg-lime-900"
        onPress={() => setIsUpload(true)}
      >
        <MyIcon name="plus" size={30} color="#fff" />
      </Pressable>
      <ScrollView className="w-full p-6">
        <Pressable onPress={onGetFile} className="p-8 bg-lime-500 mb-5">
          <Text>Download</Text>
        </Pressable>
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
              <Text className="ml-5 text-xl font-semibold">
                Project_Plan_V1.docx
              </Text>
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