import { API } from "../base";

export interface User {
  "id": number,
  "name": string,
  "dateofbirth": string | null,
  "email": string,
  "password": string,
  "createdAt": string,
  "updatedAt": string,
  "isActive": boolean,
  "isEmailVerified": boolean,
  "verificationCode": string | null,
  "verificationCodeExpiresAt": string | null,
  "status": string,
  "passwordResetCode": string | null,
  "passwordResetCodeExpiresAt": string | null
}

export interface Member {
  user: User,
  role: string
}

export interface Group {
  id: number,
  role: string,
  name: string,
  description: string | null,
  createdAt: string,
  updatedAt: string,
  user: Member []
}

export interface Response {
  data: Data
  status: number
}

export interface Data {
  error: string
  message: string
  statusCode: number
}

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
  error: string
  statusCode: number
}

export interface UpdateGroupRequest {
  data: {
    name: string,
    description: string,
  },
  token: string,
  groupId: number
}

export interface UpdateGroupResponse {
  "id": number,
  "name": string,
  "createdAt": string,
  "updatedAt": string,
  "description": string,
  "user_id_create": number,
  "projectId": number | null,
  "project": number | null
}

export interface AddGroupRequest {
  data: {
    name: string,
    description: string,
    list_user_members: number[]
  },
  token: string,
}

export interface AddGroupResponse {
  "name": string,
  "description": string,
  "user_id_create": number,
  "projectId": number | null,
  "id": number,
  "createdAt": string,
  "updatedAt": string
}

export interface ChangePasswordResponse {}

export interface DeleteGroupRequest {
  groupId: number,
  token: string
}

const groupApi = API.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.mutation<Group[] | ErrorResponse, string>({
      query: (token) => ({
        url: "/groups",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateGroup: build.mutation<UpdateGroupResponse | ErrorResponse, UpdateGroupRequest>({
      query: (updateData) => ({
        url: `/groups/${updateData.groupId}`,
        method: "PATCH",
        body: updateData.data,
        headers: {
          Authorization: `Bearer ${updateData.token}`,
        },
      }),
    }),
    addGroup: build.mutation<AddGroupResponse | ErrorResponse, AddGroupRequest>({
      query: (addData) => ({
        url: `/groups`,
        method: "POST",
        body: addData.data,
        headers: {
          Authorization: `Bearer ${addData.token}`,
        },
      }),
    }),
    deleteGroup: build.mutation<undefined | ErrorResponse, DeleteGroupRequest>({
      query: (deleteData) => ({
        url: `/groups/${deleteData.groupId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${deleteData.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGroupsMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useAddGroupMutation
} = groupApi;
