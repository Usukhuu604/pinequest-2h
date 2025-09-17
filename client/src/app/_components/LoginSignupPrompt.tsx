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
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="bg-white  p-8 w-full max-w-md flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Welcome to PineQuest
        </h2>

        <div className="flex gap-6 justify-center">
          <Button
            onClick={handleConnect}
            className="text-xl font-semibold px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-transform duration-150"
          >
            👨‍🎓 Сурагч
          </Button>
          <Button
            onClick={handleCounselor}
            className="text-xl font-semibold px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md hover:scale-105 hover:from-green-600 hover:to-green-800 transition-transform duration-150"
          >
            🧑‍⚕️ Сэтгэлзүйч
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPrompt;
