import React from "react";
import QueryProvider from "./query-client-provider";
import { Toaster } from "sonner";

const GlobalProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
};

export default GlobalProvidersWrapper;
