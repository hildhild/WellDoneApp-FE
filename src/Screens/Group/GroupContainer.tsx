import { Group } from "./Group";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const GroupContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Group data={data} isLoading={isLoading} />;
};
