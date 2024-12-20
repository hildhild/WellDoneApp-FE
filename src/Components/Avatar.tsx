import React, { memo } from "react";
import { View, Text } from "react-native";

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts[0].slice(0, 2).toUpperCase();
    return initials;
  };

  return (
    <View className="bg-neutral-100 border border-neutral-300 rounded-full flex items-center justify-center w-8 h-8">
      <Text className="text-neutral-900 text-caption-regular">
        {getInitials(name)}
      </Text>
    </View>
  );
};

export default memo(Avatar);
