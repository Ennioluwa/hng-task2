"use client";

import EmptyState from "@/components/EmptyState";
import { FC, useEffect } from "react";

interface errorProps {
  error: Error;
}

const Error: FC<errorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="Uh oh" subtitle="Something went wrong" />;
};

export default Error;
