"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

interface ChatProps {
  userId: string;
  userName: string;
  userRole: "student" | "psychologist";
  onClose: () => void;
}

const Chat = ({ userId, userName, userRole, onClose }: ChatProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState<string>("");
  const [otherUser, setOtherUser] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [waitingForMatch, setWaitingForMatch] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      // Join with user info
      newSocket.emit("join", { userId, name: userName, role: userRole });
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Handle room creation
    newSocket.on("roomCreated", ({ roomId: newRoomId, otherUser: other }) => {
      setRoomId(newRoomId);
      setOtherUser(other);
      setWaitingForMatch(false);
      newSocket.emit("joinRoom", newRoomId);
    });

    // Handle room joined
    newSocket.on("roomJoined", ({ roomId: joinedRoomId, messages: roomMessages }) => {
      setMessages(roomMessages);
    });

    // Handle new messages
    newSocket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle user leaving
    newSocket.on("userLeft", (message: string) => {
      alert(message);
      onClose();
    });

    return () => {
      newSocket.close();
    };
  }, [userId, userName, userRole, onClose]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socket && roomId) {
      socket.emit("sendMessage", { roomId, message: newMessage.trim() });
      setNewMessage("");
    }
  };

  if (waitingForMatch) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Чат хүлээж байна...</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {userRole === "student" ? "Сэтгэлзүйчтэй холбож байна..." : "Оюутантай холбож байна..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] h-[600px] max-w-[90vw] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="font-semibold">{otherUser?.name}</h3>
              <p className="text-xs text-gray-500">{otherUser?.role === "psychologist" ? "Сэтгэлзүйч" : "Оюутан"}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Connection status */}
        <div className={`px-4 py-2 text-xs ${isConnected ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {isConnected ? "🟢 Холбогдсон" : "🔴 Холболт тасарсан"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.senderId === userId ? "text-blue-100" : "text-gray-500"}`}>
                  {new Date(msg.timestamp).toLocaleTimeString("mn-MN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Мессеж бичнэ үү..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" disabled={!newMessage.trim()} className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
