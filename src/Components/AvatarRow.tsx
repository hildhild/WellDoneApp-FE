import React, { memo } from "react";
import { View, Image, Text } from "react-native";

interface AvatarRowProps {
  users: { name: string; avatar: string }[];
  maxVisible?: number;
}

const AvatarRow: React.FC<AvatarRowProps> = ({ users, maxVisible = 3 }) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);

  return (
    <View className="flex flex-row items-center space-y-[-3] rounded-full">
      {visibleUsers.map((user, index) => (
        <View
          key={index}
          className="rounded-full bg-white border-2 border-neutral-100"
          style={{
            width: 32,
            height: 32,
            marginTop: index > 0 ? -7 : 0,
            zIndex: visibleUsers.length + index,
          }}
        >
          <Image
            className="w-full h-full rounded-full"
            source={
              typeof user.avatar === "string"
                ? { uri: user.avatar }
                : user.avatar
            }
          />
        </View>
      ))}

      <View
        className="rounded-full bg-neutral-100 flex items-center justify-center"
        style={{ width: 32, height: 32, marginTop: -7 }}
      >
        <Text className="text-neutral-900 text-xs">...</Text>
      </View>
      {remainingCount > 0 && (
        <View
          className="rounded-full bg-neutral-900 border border-white flex items-center justify-center"
          style={{ width: 32, height: 32, marginTop: -7 }}
        >
          <Text className="text-neutral-100 text-xs">
            {`${remainingCount}+`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(AvatarRow);
