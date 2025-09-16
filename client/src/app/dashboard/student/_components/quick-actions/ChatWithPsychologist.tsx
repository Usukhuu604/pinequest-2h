"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import Chat from "../Chat";

const ChatWithPsychologist = () => {
  const [showChat, setShowChat] = useState(false);

  const handleClick = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer p-4 rounded-xl text-white bg-blue-500 hover:opacity-90 flex flex-col items-start w-full"
      >
        <MessageCircle className="w-6 h-6 mb-2" />
        <span className="font-medium">Сэтгэлзүйчтэй чатлах</span>
      </button>

      {showChat && (
        <Chat
          userId="student_123" // In production, get this from auth/context
          userName="Оюутан" // In production, get this from auth/context
          userRole="student"
          onClose={handleCloseChat}
        />
      )}
    </>
  );
};

export default ChatWithPsychologist;
