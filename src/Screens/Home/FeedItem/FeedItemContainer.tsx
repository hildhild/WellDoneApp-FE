import { RootScreens } from "@/Screens";
import {
  NotificationItem,
  useGetNotificationsMutation,
} from "@/Services/notification";
import { mockData } from "@/Utils/constant";
import { generatePastelColor } from "@/Utils/Funtions/generate";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import FeedItem from "./FeedItem";
interface FeedItemContainerProps {
  onNavigate: (screen: RootScreens) => void;
}
const FeedItemContainer = ({ onNavigate }: FeedItemContainerProps) => {
  const [feedItems, setFeedItems] = useState<
    (NotificationItem & { bgColor: string })[]
  >([]);
  const [getNotification] = useGetNotificationsMutation();

  const fetchFeedItems = useCallback(async () => {
    //const mockData = await getNotification()
    const itemsWithColors = mockData.map((item) => ({
      ...item,
      bgColor: generatePastelColor(),
    }));
    setFeedItems(itemsWithColors);
  }, []);

  useEffect(() => {
    fetchFeedItems();
  }, [fetchFeedItems]);

  return (
    <ScrollView horizontal className="flex-row">
      {feedItems.map((item) => (
        <FeedItem key={item.id} {...item} onNavigate={onNavigate} />
      ))}
    </ScrollView>
  );
};

export default memo(FeedItemContainer);
