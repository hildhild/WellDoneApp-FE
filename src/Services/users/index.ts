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

export interface SignUpResponse extends Response {}
export interface VerifyEmailResponse extends Response {}
export interface ResendVerifyEmailResponse extends Response {}
export interface ForgotPasswordResponse extends Response {}
export interface ResetPasswordResponse extends Response {}

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
export interface UserInformation {
  id: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
}

export interface LogInResponse extends Response {
  access_token: string;
  expires_at: string;
  user: UserInformation;
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
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (signUpData) => ({
        url: "/auth/signup",
        method: "POST",
        body: signUpData,
      }),
    }),
    verifyEmail: build.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (verifyData) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: verifyData,
      }),
    }),
    resendVerifyEmail: build.mutation<
      ResendVerifyEmailResponse,
      ResendVerifyEmailRequest
    >({
      query: (email) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: email,
      }),
    }),
    logIn: build.mutation<LogInResponse, LogInRequest>({
      query: (logInData) => ({
        url: "/auth/login",
        method: "POST",
        body: logInData,
      }),
    }),
    forgotPassword: build.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
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
