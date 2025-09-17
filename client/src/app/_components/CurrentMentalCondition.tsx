"use client";

import React, { useState } from "react";
import { MoodSelector } from "./MoodSelector";
import LoginSignupPrompt from "./LoginSignupPrompt";

export const CurrentMentalCondition = () => {
  const [step, setStep] = useState<"welcome" | "auth">("welcome");

  const handleWelcomeNext = () => {
    setStep("auth");
  };

  return (
    <div className="max-w-[600px] mx-auto mt-10  bg-white rounded-2xl shadow-lg p-6">
      {step === "welcome" && <MoodSelector onSelect={handleWelcomeNext} />}
      {step === "auth" && <LoginSignupPrompt />}
    </div>
  );
};
