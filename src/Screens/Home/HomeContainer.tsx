import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { ProjectDetail } from "@/Services/projects";

type HomeScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;
export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const [userId, setUserId] = useState("9");
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  const [fetchOne, { isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  const data: ProjectDetail = {
    id: 1,
    name: "Green sky Website Dev",
    members: [
      {
        id: 101,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Project Manager",
        avatar: require('assets/Switch.png'),
      },
      {
        id: 102,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Developer",
        avatar: require('assets/Switch.png'),
      },
      {
        id: 103,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "Designer",
        avatar: require('assets/Switch.png'),
      },
      {
        id: 104,
        name: "Bob Brown",
        email: "bob.brown@example.com",
        role: "Tester",
        avatar: require('assets/Switch.png'),
        
      },
      {
        id: 105,
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        role: "Developer",
        avatar: require('assets/Switch.png'),
      },
    ],
    description: "A sample project to demonstrate JSON structure.",
    documents: [
      {
        id: 201,
        name: "Project Plan",
        type: "PDF",
        url: "http://example.com/project-plan.pdf",
      },
      {
        id: 202,
        name: "Requirements Document",
        type: "Word",
        url: "http://example.com/requirements.docx",
      },
    ],
    tasks: [
      {
        id: 301,
        name: "Develop Feature A",
        priority: "High",
        status: "In Progress",
        task_code: "FA-123",
        members: [
          {
            id: 102,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Developer",
            avatar: require('assets/Switch.png'),
          },
        ],
        description: "Develop the initial version of Feature A.",
        task_diary: {
          created_at: "2024-12-10T08:00:00Z",
          last_accessed: "2024-12-15T14:30:00Z",
        },
        comments: [
          {
            id: 401,
            message: "Task started, initial setup completed.",
            poster_id: 102,
            poster_name: "Jane Smith",
            created_at: "2024-12-10T09:00:00Z",
            replies: [
              {
                id: 501,
                message: "Good progress, keep going!",
                poster_id: 101,
                poster_name: "John Doe",
                created_at: "2024-12-11T10:00:00Z",
              },
            ],
          },
          {
            id: 402,
            message: "Feature A implemented, testing next.",
            poster_id: 102,
            poster_name: "Jane Smith",
            created_at: "2024-12-14T16:00:00Z",
            replies: [],
          },
        ],
      },
    ],
  };

  return <Home onNavigate={onNavigate} data={data} isLoading={isLoading} />;
};
