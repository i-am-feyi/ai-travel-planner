import Header from "@/components/header";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
