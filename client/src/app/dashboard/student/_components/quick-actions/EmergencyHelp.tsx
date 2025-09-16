"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

const EmergencyHelp = () => {
  const [showNumbers, setShowNumbers] = useState(false);

  const handleClick = () => {
    setShowNumbers(!showNumbers);
  };

  if (showNumbers) {
    return (
      <div className="p-2 rounded-xl text-white bg-red-400 flex flex-col items-start w-full">
        <div className="text-sm space-y-2 w-full">
          <div onClick={handleClick} className="bg-white text-red-600 p-1.5 px-2 rounded cursor-pointer">
            <span className="font-[600]">🚨 108</span> - Хүүхдийн тусламжийн үйлчилгээ
          </div>
          <div onClick={handleClick} className="bg-white text-red-600 p-1.5 px-2 rounded cursor-pointer">
            <span className="font-[600]">🚨 107</span> - Гэр бүлийн хүчирхийлэлтэй тэмцэх
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-4 rounded-xl text-white bg-red-500 hover:opacity-90 flex flex-col items-start w-full"
    >
      <Phone className="w-6 h-6 mb-2" />
      <span className="font-medium">Яаралтай тусламж</span>
    </div>
  );
};

export default EmergencyHelp;
