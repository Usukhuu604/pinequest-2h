"use client";

import { HelpCircle } from "lucide-react";
import { useState } from "react";
import MessageBoard from "../MessageBoard";

const AnonymousQuestion = () => {
  const [showMessageBoard, setShowMessageBoard] = useState(false);

  const handleClick = () => {
    setShowMessageBoard(true);
  };

  const handleCloseMessageBoard = () => {
    setShowMessageBoard(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer p-4 rounded-xl text-white bg-purple-500 hover:opacity-90 flex flex-col items-start w-full"
      >
        <HelpCircle className="w-6 h-6 mb-2" />
        <span className="font-medium">Нэрээ нууцлан мессеж илгээх</span>
        <span className="text-xs text-purple-100 mt-1">
          Таны хувийн мэдээлэл нууцлагдсан
        </span>
      </button>

      {showMessageBoard && (
        <MessageBoard
          userId="anonymous_user"
          userName="Нэргүй сурагч"
          isAnonymous={true}
          onClose={handleCloseMessageBoard}
        />
      )}
    </>
  );
};

export default AnonymousQuestion;
