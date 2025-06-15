"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

const TestPage = () => {
  const handleClick = () => {
    const toastId = toast.loading("Loading...");
    console.log(toastId);
    // setTimeout(() => {
    //   toast.dismiss(toastId);
    // }, 3000);
  };

  return (
    <div>
      <div>Test Page</div>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};

export default TestPage;
