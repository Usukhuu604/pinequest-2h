"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send, X, UserX, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

interface AnonymousChatProps {
  onClose: () => void;
}

const AnonymousChat = ({ onClose }: AnonymousChatProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState<string>("");
  const [otherUser, setOtherUser] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [waitingForMatch, setWaitingForMatch] = useState(true);
  const [anonymousId] = useState(() => `anon_${Math.random().toString(36).substr(2, 9)}`);
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
      // Join with anonymous info
      newSocket.emit("join", {
        userId: anonymousId,
        name: "Нэргүй оюутан",
        role: "student",
        isAnonymous: true,
      });
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
  }, [anonymousId, onClose]);

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
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold">Нэргүй чат хүлээж байна...</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="space-y-2">
              <p className="text-gray-600">Сэтгэлзүйчтэй холбож байна...</p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-purple-700">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Таны хувийн мэдээлэл нууцлагдсан</span>
                </div>
                <p className="text-xs text-purple-600 mt-1">Та нэргүй хэрэглэгчээр харагдах болно</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] h-[600px] max-w-[90vw] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-purple-50">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <div>
              <h3 className="font-semibold flex items-center space-x-2">
                <span>Нэргүй ярилцлага</span>
                <UserX className="w-4 h-4 text-purple-500" />
              </h3>
              <p className="text-xs text-purple-600">
                {otherUser?.name || "Сэтгэлзүйч"} - Таны хувийн мэдээлэл нуугдсан
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anonymous notice */}
        <div className="px-4 py-2 bg-purple-100 border-b">
          <div className="flex items-center space-x-2 text-purple-700">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium">
              🔒 Нууцлалын горим идэвхжсэн - Та "Нэргүй оюутан" нэрээр харагдаж байна
            </span>
          </div>
        </div>

        {/* Connection status */}
        <div className={`px-4 py-2 text-xs ${isConnected ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {isConnected ? "🟢 Аюулгүй холбогдсон" : "🔴 Холболт тасарсан"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <p className="text-sm">Нэргүй ярилцлага эхэлж байна...</p>
              <p className="text-xs mt-1">Таны хувийн мэдээлэл хамгаалагдсан</p>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === anonymousId ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.senderId === anonymousId ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-center space-x-1 mb-1">
                  <UserX className="w-3 h-3 opacity-70" />
                  <span className="text-xs opacity-70">{msg.senderId === anonymousId ? "Та" : "Сэтгэлзүйч"}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.senderId === anonymousId ? "text-purple-100" : "text-gray-500"}`}>
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
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-purple-50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Нэргүй мессеж бичнэ үү..."
              className="flex-1 px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button type="submit" disabled={!newMessage.trim()} className="px-4 bg-purple-500 hover:bg-purple-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-purple-600 mt-1 flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Таны хувийн мэдээлэл хамгаалагдсан</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AnonymousChat;
