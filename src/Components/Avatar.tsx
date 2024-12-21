import { generatePastelColor } from "@/Utils/Funtions/generate";
import React, { memo } from "react";
import { View, Text } from "react-native";

interface AvatarProps {
  name: string;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, width, height }) => {
  const getInitials = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName.length === 1) {
      return trimmedName.toUpperCase();
    }
    const nameParts = trimmedName.split(" ");
    const initials = nameParts[0].slice(0, 2).toUpperCase();
    return initials;
  };

  return (
    <View
      className="border border-neutral-300 rounded-full flex items-center justify-center"
      style={{
        width: width ?? 32,
        height: height ?? 32,
        backgroundColor: generatePastelColor(),
      }}
    >
      <Text className="text-neutral-900 text-caption-regular">
        {getInitials(name)}
      </Text>
    </View>
  );
};

export default memo(Avatar);
