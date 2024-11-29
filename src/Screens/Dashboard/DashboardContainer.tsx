import { Dashboard } from "./Dashboard";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const DashboardContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Dashboard data={data} isLoading={isLoading} />;
};
