import { Priority } from "@/Utils/constant";
import { API } from "../base";
import { User } from "../group";

export interface Response {
  data: Data
  status: number
}

export interface Data {
  error: string
  message: string
  statusCode: number
}
////

export interface ErrorHandle {
  data: {
    error: string;             
    message: string[];           
    statusCode: number;        
  };
  status: number;   
}

export interface ErrorResponse{
  message: string 
  error?: string
  statusCode: number
}

export interface Assignee {
  "id": number,
  "name": string,
  "email": string,
  "dateofbirth": string,
  "updatedAt": string,
  "role": string
}

export interface Task {
  "id": number,
  "title": string,
  "description": string,
  "dueDate": string,
  "priority": Priority,
  "status": string,
  "createdAt": string,
  "updatedAt": string,
  "createdById": number,
  "projectId": number,
  "assignees": Assignee [],
  "createdBy": User,
  "project": {
    "id": number,
    "name": string,
    "description": string,
    "startDate": string,
    "endDate": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string
  }
  
}

export interface getGroupTaskRequest{
  groupId: number,
  token: string
}

export interface getProjectTaskRequest{
  projectId: number,
  token: string
}

export interface deleteTaskRequest {
  taskId: number,
  token: string
}


const taskApi = API.injectEndpoints({
  endpoints: (build) => ({
    getMyTask: build.mutation<Task[] | ErrorResponse, string>({
      query: (token) => ({
        url: "/tasks/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getGroupTask: build.mutation<Task[] | ErrorResponse, getGroupTaskRequest>({
      query: (request) => ({
        url: `/tasks/group/${request.groupId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }),
    }),
    getProjectTask: build.mutation<Task[] | ErrorResponse, getProjectTaskRequest>({
      query: (request) => ({
        url: `/tasks/project/${request.projectId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }),
    }),
    deleteTask: build.mutation<undefined | ErrorResponse, deleteTaskRequest>({
      query: (request) => ({
        url: `/tasks/${request.taskId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyTaskMutation,
  useGetGroupTaskMutation,
  useGetProjectTaskMutation,
  useDeleteTaskMutation
} = taskApi;
