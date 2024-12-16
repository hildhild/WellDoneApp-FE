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
  error: string
  statusCode: number
}

export interface SignUpResponse {
    message: string
    verificationEmailSent: boolean
    user: UserSignUpInformation
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
    dateOfBirth: string,
  }
  token: string
}
  
export interface UserSignUpInformation {
  name: string
  email: string
  isEmailVerified: boolean
  verificationCodeExpiresAt: string
  dateofbirth: string
  group_id: string
  joined_at: string
  role: string
  passwordResetCode: string
  passwordResetCodeExpiresAt: string
  id: number
  createdAt: string
  updatedAt: string
  isActive: boolean
  status: string
}
export interface VerifyEmailResponse {
  message: string
  user: UserVerifyEmailResponse
}
export interface UserVerifyEmailResponse {
  id: number
  email: string
  name: string
  isEmailVerified: boolean
}

export interface ResendVerifyEmailResponse {
  message: string
  verificationEmailSent: boolean
}
export interface ForgotPasswordResponse{
  message: string
}
export interface ResetPasswordResponse{
  message: string 
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface ResendVerifyEmailRequest {
  email: string;
}
export interface LogInRequest {
  email: string;
  password: string;
}

export interface LogInResponseError {
  message: string
  statusCode: number
}
export interface LogInResponse {
  access_token: string
  expires_at: string
  user: UserInformation
}

export interface UserInformation {
  id: number
  email: string
  name: string
  isEmailVerified: boolean
}

export interface ForgotPasswordRequest {
  email: string;
}
export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
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
  }),
  overrideExisting: true,
});

export const {
  useGetProfileMutation,
} = profileApi;
