"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LoginSignupPrompt = () => {
  const router = useRouter();

  const handleConnect = () => {
    router.push("/dashboard/student");
  };
  const handleCounselor = () => {
    router.push("/dashboard/psychologist");
  };
  return (
    <div className="flex justify-between items-center text-center">
      <Button onClick={handleConnect} className="text-3xl">
        Student
      </Button>
      <Button onClick={handleCounselor} className="text-3xl">
        Psychologist
      </Button>
    </div>
  );
};

export default LoginSignupPrompt;
