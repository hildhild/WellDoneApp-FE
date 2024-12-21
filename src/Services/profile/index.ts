import { API } from "../base";
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
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

export interface GetProfileResponse {
  id: number,
  name: string,
  dateofbirth: string,
  email: string,
  group_id: any,
  joined_at: any,
  role: any,
  updatedAt: string
}

export interface UpdateProfileResponse {
  id: number,
  name: string,
  dateofbirth: string,
  email: string,
  group_id: any,
  joined_at: any,
  role: any,
  updatedAt: string
}

export interface UpdateProfileRequest {
  data: {
    name: string,
    dateofbirth: string,
  },
  token: string
}

export interface ChangePasswordResponse {}

export interface ChangePasswordRequest {
  data: {
    password: string,
    newPassword: string,
  },
  token: string
}

const profileApi = API.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.mutation<GetProfileResponse | ErrorResponse, string>({
      query: (token) => ({
        url: "/auth/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProfile: build.mutation<UpdateProfileResponse | ErrorResponse, UpdateProfileRequest>({
      query: (updateData) => ({
        url: "/auth/updateProfile",
        method: "PATCH",
        body: updateData.data,
        headers: {
          Authorization: `Bearer ${updateData.token}`,
        },
      }),
    }),
    changePassword: build.mutation<undefined | ErrorResponse, ChangePasswordRequest>({
      query: (changePasswordData) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: changePasswordData.data,
        headers: {
          Authorization: `Bearer ${changePasswordData.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProfileMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = profileApi;
