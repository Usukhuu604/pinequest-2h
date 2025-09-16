"use client";

import { HelpCircle } from "lucide-react";
import { useState } from "react";
import AnonymousChat from "../AnonymousChat";

const AnonymousQuestion = () => {
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
        className="cursor-pointer p-4 rounded-xl text-white bg-purple-500 hover:opacity-90 flex flex-col items-start w-full"
      >
        <HelpCircle className="w-6 h-6 mb-2" />
        <span className="font-medium">Нэрээ нууцлан ярилцах</span>
      </button>

      {showChat && <AnonymousChat onClose={handleCloseChat} />}
    </>
  );
};

export default AnonymousQuestion;
