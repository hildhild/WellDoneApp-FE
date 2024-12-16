import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { IFeedItemProps } from "./FeedItemContainer";

const FeedItem = (props: IFeedItemProps & { bgColor: string }) => {
  return (
    <View
      style={{
        backgroundColor: props.bgColor,
      }}
      className="p-4 rounded-lg w-40 mr-4 relative border-solid border border-neutral-300 rounded-2xl"
    >
      <Image
        source={require("assets/Group Rectangle.png")}
        className="absolute top-2 right-2 w-16 h-16"
      />
      <Text className="text-neutral-900 font-bold mt-10 text-body-base-regular">{props.name}</Text>
      <Text className="text-neutral-600 text-body-base-medium">{props.project}</Text>
      <TouchableOpacity className="mt-2 flex-row items-center">
        <Text className="text-black">Xem thêm</Text>
        <FontAwesome5 name="arrow-alt-circle-right" size={20} color="black" style={{ position: 'absolute', right: 1 }} />
      </TouchableOpacity>
    </View>
  );
};

export default FeedItem;
