import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getFileTypeColor, getFileTypeLabel } from "@/Utils/Funtions/utils";

interface ModalUploadProps {
  isUpload: boolean;
  setIsUpload: (value: boolean) => void;
  fileUpload: any;
  setFileUpload: (file: any) => void;
  onPickDocument: () => void;
  onUploadFile: () => void;
}

export const MyIcon = Icon as unknown as React.ComponentType<any>;

const ModalUpload: React.FC<ModalUploadProps> = ({
  isUpload,
  setIsUpload,
  fileUpload,
  setFileUpload,
  onPickDocument,
  onUploadFile,
}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={isUpload}>
      <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
        <View className="bg-neutral-100 w-[90%] p-4 rounded-2xl">
          <View className="mb-3">
            <View className="w-full flex-col justify-center items-center mb-3">
              <Text className="text-heading4 mb-5">Tải tài liệu</Text>
              <Text className="text-danger-600">
                Lưu ý: Tên file không được chứa ký tự đặc biệt hoặc có dấu
              </Text>
              <View>
                {fileUpload ? (
                  <View className="w-full gap-3 flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3">
                    <Text className="text-body-base-bold w-[80%]">{fileUpload.name}</Text>
                    <View className="flex-row gap-3 items-center">
                      <View
                        className={`rounded-full p-2 ${getFileTypeColor(fileUpload.mimeType)}`}
                      >
                        <Text className="text-body-small-bold text-neutral-100">
                          {getFileTypeLabel(fileUpload.mimeType)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => setFileUpload(null)}>
                      <MyIcon name="trash" size={25} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="w-full h-[100px] flex justify-center items-center">
                    <Text className="text-body-base-regular text-center">Chưa có file nào được upload! Upload ngay ~! 🔥🌸👇👇</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="w-full flex-row gap-3 justify-end items-center">
            <TouchableOpacity
              className="!rounded-xl !bg-gray-300 px-5 py-3"
              onPress={() => setIsUpload(false)}
            >
              <Text className="text-black font-semibold">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="!rounded-xl px-5 py-3 bg-blue-600"
              onPress={onPickDocument}
            >
              <Text className="text-white font-semibold">Upload file</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="!rounded-xl px-5 py-3 bg-lime-600"
              onPress={onUploadFile}
            >
              <Text className="text-white font-semibold">Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpload;