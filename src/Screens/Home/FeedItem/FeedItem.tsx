import { RootScreens } from "@/Screens";
import { NotificationItem } from "@/Services/notification";
import { setId } from "@/Store/reducers";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface IFeedItemParams{
  bgColor: string
  onNavigate: (screen: RootScreens) => void;
}

const FeedItem = (props: NotificationItem & IFeedItemParams) => {
  const dispatch = useDispatch()

  return (
    <View
      style={{
        backgroundColor: props.bgColor,
      }}
      className="p-4 w-40 mr-4 relative border-solid border border-neutral-300 rounded-2xl flex-col justify-between"
    >
      <Image
        source={require("assets/Group Rectangle.png")}
        className="absolute top-2 right-2 w-16 h-16"
      />
      <>
        <Text className="text-neutral-900 font-bold mt-10 text-body-base-regular">
          {props.task_name}
        </Text>
        <Text className="text-neutral-600 text-body-base-medium">
          {props.project_parent_name}
        </Text>
      </>
      <TouchableOpacity
        className="mt-2 flex-row items-center"
        onPress={() => dispatch(setId({ id: props.id })) && props.onNavigate(RootScreens.NOTIFICATION)}
      >
        <Text className="text-black">Xem thêm</Text>
        <FontAwesome5
          name="arrow-alt-circle-right"
          size={20}
          color="black"
          style={{ position: "absolute", right: 1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(FeedItem);
