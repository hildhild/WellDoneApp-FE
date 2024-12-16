// FeedItemContainer.tsx
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import FeedItem from "./FeedItem";

export interface IFeedItemProps {
  name: string;
  project: string;
  id: string;
}

const generatePastelColor = () => {
  const r = Math.floor((Math.random() * 127) + 127);
  const g = Math.floor((Math.random() * 127) + 127);
  const b = Math.floor((Math.random() * 127) + 127);
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
};

const FeedItemContainer = () => {
  const [feedItems, setFeedItems] = useState<(IFeedItemProps & { bgColor: string })[]>([]);

  useEffect(() => {
    const fetchFeedItems = async () => {
      const response = [
        { id: "1", name: "Design Homepage", project: "Website Redesign" },
        { id: "2", name: "Develop Backend API", project: "Mobile App Development" },
        { id: "3", name: "Data Migration Script", project: "Database Migration" }
      ];
      const itemsWithColors = response.map(item => ({
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
        <FeedItem key={item.id} {...item} />
      ))}
    </ScrollView>
  );
};

export default FeedItemContainer;
