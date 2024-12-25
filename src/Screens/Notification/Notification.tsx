import { NotificationList } from "@/Services/notification";
import { RootState } from "@/Store";
import { mockData } from "@/Utils/constant";
import React, { memo, useEffect, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { RootScreens } from "..";
import Icon from "react-native-vector-icons/FontAwesome";

const MyIcon = Icon as unknown as React.ComponentType<any>;
interface NotificationProps {
  onNavigate: (screen: RootScreens) => void;
}

const Notification = (props: NotificationProps) => {
  const { id } = useSelector((state: RootState) => state.notification);
  const [notifications, setNotifications] = useState<NotificationList>([]);
  const [highlightedId, setHighlightedId] = useState<string | null>("");
  const highlightAnimation = new Animated.Value(1);
  useEffect(() => {
    const fetchNotifications = async () => {
      //const mockData = await getNotification()
      setNotifications(mockData);
      if (id) {
        setHighlightedId(id);
        startHighlightAnimation();
      }
    };
    fetchNotifications();
  }, [highlightedId]);

  const startHighlightAnimation = () => {
    highlightAnimation.setValue(1);
    Animated.sequence([
      Animated.timing(highlightAnimation, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(highlightAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="bg-neutral-100 h-full p-4 mt-8">
      <View className="flex-row items-center justify-center mb-8 py-2">
        {/* <TouchableOpacity onPress={() => props.onNavigate(RootScreens.MAIN)}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity> */}
        <TouchableOpacity
            className="absolute left-5 top-0 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
            onPress={() => {props.onNavigate(RootScreens.MAIN);}}
          >
            <MyIcon name="chevron-left" size={15} color="#000" />
          </TouchableOpacity>
        <Text className="text-heading4 font-bold ml-auto mr-auto">
          Thông báo
        </Text>
      </View>

      <ScrollView>
        {notifications.map((item) => {
          const isHighlighted = item.id === highlightedId;

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.notificationCard,
                isHighlighted && { transform: [{ scale: highlightAnimation }] },
              ]}
              className="bg-white rounded-lg p-4 mb-4 flex-row items-center shadow border border-neutral-300"
            >
              <Image
                source={
                  typeof item.member.avatar === "string"
                    ? { uri: item.member.avatar }
                    : item.member.avatar
                }
                className="w-12 h-12 rounded-full mr-4"
              />

              <View className="flex-1">
                <Text className="text-neutral-900 font-bold">
                  {item.task_name}
                </Text>
                <Text className="text-neutral-600">
                  {item.task_description}
                </Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {new Date(item.date_time).toLocaleString()}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    transform: [{ scale: 1 }],
  },
});

export default memo(Notification);
