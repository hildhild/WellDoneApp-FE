import { UserStatus } from "@/Utils/constant";
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
  status: UserStatus
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
const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse | ErrorResponse, SignUpRequest>({
      query: (signUpData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signUpData,
      }),
    }),
    verifyEmail: build.mutation<VerifyEmailResponse | ErrorResponse, VerifyEmailRequest>({
      query: (verifyData) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: verifyData,
      }),
    }),
    resendVerifyEmail: build.mutation<ResendVerifyEmailResponse | ErrorResponse, ResendVerifyEmailRequest>({
      query: (email) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: email,
      }),
    }),
    logIn: build.mutation<LogInResponse | LogInResponseError, LogInRequest>({
      query: (logInData) => ({
        url: "/auth/login",
        method: "POST",
        body: logInData,
      }),
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
      }),
    }),
    resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (resetPasswordData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetPasswordData,
      }),
    }),
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useLogInMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyGetUserQuery,
} = userApi;
