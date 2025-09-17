"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import MessageBoard from "../MessageBoard";

const ChatWithPsychologist = () => {
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
        className="cursor-pointer p-4 rounded-xl text-white bg-blue-500 hover:opacity-90 flex flex-col items-start w-full"
      >
        <MessageCircle className="w-6 h-6 mb-2" />
        <span className="font-medium">Сэтгэлзүйчид мессеж илгээх</span>
      </button>

      {showMessageBoard && (
        <MessageBoard
          userId="student_123"
          userName="Сурагч"
          isAnonymous={false}
          onClose={handleCloseMessageBoard}
        />
      )}
    </>
  );
};

export default ChatWithPsychologist;
