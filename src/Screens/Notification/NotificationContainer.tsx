import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { memo } from "react";
import { RootScreens } from "..";
import Notification from "./Notification";
type NotificationScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.NOTIFICATION
>;
const NotificationContainer = ({
  navigation,
}: NotificationScreenNavigatorProps) => {

const onNavigate = (screen: RootScreens) => {
  navigation.navigate(screen);
};

  return <Notification onNavigate={onNavigate} />;
};
export default memo(NotificationContainer);
