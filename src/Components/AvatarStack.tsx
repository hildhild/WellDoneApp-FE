import React, { memo } from "react";
import { View, Text } from "react-native";
import Avatar from "./Avatar";

interface AvatarStackProps {
  users: string[];
  maxVisible?: number;
  display?: "col" | "row";
}

const AvatarStack: React.FC<AvatarStackProps> = ({
  users,
  maxVisible = 3,
  display = "col",
}) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);
  if (visibleUsers.length === 0) {
    return <View className="text-xs">No members</View>;
  }
  return (
    <View
      className={`p-2 bg-neutral-100 rounded-full ${
        display === "col"
          ? "flex-col items-center space-y-[-7]"
          : "flex-row items-center space-x-[-7]"
      }`}
    >
      {visibleUsers.map((user, index) => (
        <View
          key={index}
          style={{
            zIndex: visibleUsers.length + index,
            marginTop: -7,
          }}
        >
          <Avatar name={user} />
        </View>
      ))}

      {remainingCount > 0 && (
        <>
          <View className="bg-neutral-100 rounded-full flex items-center justify-center w-8 h-8">
            <Text className="text-neutral-900 text-caption-regular">...</Text>
          </View>

          <View className="bg-neutral-900 border-white rounded-full flex items-center justify-center w-8 h-8 mt-[-7]">
            <Text className="text-neutral-100 text-caption-regular">{`${remainingCount}+`}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default memo(AvatarStack);
