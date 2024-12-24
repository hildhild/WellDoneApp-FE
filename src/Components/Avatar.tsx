import { generatePastelColor } from "@/Utils/Funtions/generate";
import React, { memo } from "react";
import { View, Text } from "react-native";

interface AvatarProps {
  name: string;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, width = 32, height = 32 }) => {
  const getInitials = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName.length === 1) {
      return trimmedName.toUpperCase();
    }
    const nameParts = trimmedName.split(" ");
    const initials = nameParts[0].slice(0, 1).toUpperCase();
    return initials;
  };

  return (
    <View
      className="rounded-full flex items-center justify-center border-[0.5px] border-neutral-300"
      style={{
        width: width ?? 32,
        height: height ?? 32,
        backgroundColor: generatePastelColor(),
      }}
    >
      <Text className={`text-neutral-900 ${width > 50 ? "text-3xl" : "text-xl"} font-bold`}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

export default memo(Avatar);
