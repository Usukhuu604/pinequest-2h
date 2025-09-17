"use client";

import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "student" | "therapist";
  timestamp: string;
}

interface SessionChatProps {
  sessionId: string;
  studentName: string;
  therapistName: string;
  currentUserRole: "student" | "therapist";
  onBack: () => void;
}

const SessionChat = ({
  studentName,
  therapistName,
  currentUserRole,
  onBack,
}: SessionChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Сайн байна уу? Өнөөдөр ямар байдал?",
      sender: "therapist",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      text: "Сайн байна. Сургуулийн асуудлаар зөвлөгөө авмаар байна.",
      sender: "student",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: currentUserRole,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // TODO: Send to server via Socket.io
    console.log("Sending message:", message);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const otherPersonName =
    currentUserRole === "student" ? therapistName : studentName;

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b bg-blue-50">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h3 className="font-medium">{otherPersonName}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <span>{isConnected ? "Онлайн" : "Офлайн"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === currentUserRole
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] ${
                message.sender === currentUserRole
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              } rounded-lg px-3 py-2`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === currentUserRole
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`${otherPersonName}-д мессеж бичих...`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={1000}
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-1">
          {newMessage.length}/1000 тэмдэгт
        </p>
      </div>
    </div>
  );
};

export default SessionChat;
