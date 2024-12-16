import React from "react";
import { API } from "..";
export interface GetNotificationsResponse extends NotificationList {}
export type NotificationList = NotificationItem[];

export interface NotificationItem {
  id: string;
  task_code: string;
  task_name: string;
  task_description: string;
  date_time: string;
  project_parent_name: string;
  member: NotiMember;
}

export interface NotiMember {
  name: string;
  avatar: string;
}

const notificationApi = API.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.mutation<GetNotificationsResponse, undefined>({
      query: (id) => ({
        url: "/notifications/" + id,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsMutation } = notificationApi;
