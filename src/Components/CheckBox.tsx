import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  title: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onPress, title }) => {
  const iconName = isChecked ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View className="flex-row items-center mt-1 mx-2">
      <Pressable onPress={onPress} className="mr-2">
        <MaterialCommunityIcons name={iconName} size={24} color="#65A30D" />
      </Pressable>
      <Text className="text-body-base-regular text-neutral-900">{title}</Text>
    </View>
  );
};

export default memo(CheckBox);
