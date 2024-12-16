import { RootScreens } from "@/Screens";
import { NotificationItem } from "@/Services/notification";
import { mockData } from "@/Utils/constant";
import { generatePastelColor } from "@/Utils/Funtions/generate";
import React, { memo, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import FeedItem from "./FeedItem";
interface FeedItemContainerProps {
  onNavigate: (screen: RootScreens) => void;
}
const FeedItemContainer = ({ onNavigate }: FeedItemContainerProps) => {
  const [feedItems, setFeedItems] = useState<(NotificationItem & { bgColor: string })[]>([]);

  useEffect(() => {
    const fetchFeedItems = async () => {
      const itemsWithColors = mockData.map(item => ({
        ...item,
        bgColor: generatePastelColor(),
      }));
      setFeedItems(itemsWithColors);
    };

    fetchFeedItems();
  }, []);

  return (
    <ScrollView horizontal className="flex-row">
      {feedItems.map(item => (
        <FeedItem key={item.id} {...item} onNavigate={onNavigate} />
      ))}
    </ScrollView>
  );
};

export default memo(FeedItemContainer);
