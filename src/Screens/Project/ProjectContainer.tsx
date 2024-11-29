import { Project } from "./Project";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const ProjectContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Project data={data} isLoading={isLoading} />;
};
