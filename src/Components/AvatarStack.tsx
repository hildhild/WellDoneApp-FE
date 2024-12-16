import React, { memo } from "react";
import { View, Image, Text } from "react-native";

interface AvatarStackProps {
  users: { name: string; avatar: string }[];
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
          className="bg-white border-2 border-neutral-100 rounded-full"
          style={{
            width: 32,
            height: 32,
            zIndex: visibleUsers.length + index,
          }}
        >
          <Image
            className="w-full h-full rounded-full"
            source={typeof user.avatar === "string" ? { uri: user.avatar } : user.avatar}
          />
        </View>
      ))}

      {remainingCount > 0 && (
        <>
          <View
            className="bg-neutral-100 rounded-full flex items-center justify-center"
            style={{ width: 32, height: 32, marginTop: -7 }}
          >
            <Text className="text-neutral-900 text-xs">...</Text>
          </View>

          <View
            className="bg-neutral-900 border-white rounded-full flex items-center justify-center"
            style={{ width: 32, height: 32, marginTop: -7 }}
          >
            <Text className="text-neutral-100 text-xs">{`${remainingCount}+`}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default memo(AvatarStack);
