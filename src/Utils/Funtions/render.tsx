import { Response } from "@/Services";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | Response | undefined
) => {
  if (error && "data" in error && error.data) {
    if (typeof error.data === "object" && "message" in error.data) {
      return (error.data as { message: string }).message;
    }
  }

  if (error && "message" in error) {
    return error.message;
  }
  return "Đã xảy ra lỗi, vui lòng thử lại!";
};
