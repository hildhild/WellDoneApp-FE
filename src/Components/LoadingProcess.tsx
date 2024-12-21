import React from "react";
import { View, Modal, ActivityIndicator } from "react-native";



export const LoadingProcess = (props: {
  isVisible: boolean
}) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      >
      <View className="flex justify-center items-center w-full h-full bg-[#00000090]">
        <View className="bg-white w-[90%] p-4 rounded-2xl">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </View>
    </Modal>
  );
};
