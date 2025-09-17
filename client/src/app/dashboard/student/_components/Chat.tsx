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

interface User {
  id: string;
  name: string;
  role: "student" | "psychologist";
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
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [waitingForMatch, setWaitingForMatch] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
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
    newSocket.on("roomJoined", ({ messages: roomMessages }) => {
      setMessages(roomMessages);
    });

    // Handle new messages
    newSocket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle typing indicators
    newSocket.on(
      "userTyping",
      ({ isTyping: typing }: { isTyping: boolean }) => {
        setIsTyping(typing);
      }
    );

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
      // Stop typing indicator
      socket.emit("typing", { roomId, isTyping: false });
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);

    if (socket && roomId) {
      // Clear existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Send typing indicator
      socket.emit("typing", { roomId, isTyping: true });

      // Set timeout to stop typing indicator
      const timeout = setTimeout(() => {
        socket.emit("typing", { roomId, isTyping: false });
      }, 1000);

      setTypingTimeout(timeout);
    }
  };

  if (waitingForMatch) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              🌟 Чат өрөө үүсгэж байна...
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="space-y-2">
              <p className="text-gray-600">
                {userRole === "student"
                  ? "🧠 Сэтгэлзүйчтэй холбож байна..."
                  : "👨‍🎓 Сурагчтай холбож байна..."}
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  💬 Чат өрөө бэлэн болсны дараа та бүх төрлийн асуулт асууж,
                  санаа бодлоо хуваалцаж болно!
                </p>
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
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="font-semibold">{otherUser?.name}</h3>
              <p className="text-xs text-gray-500">
                {otherUser?.role === "psychologist" ? "Сэтгэлзүйч" : "Сурагч"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Connection status */}
        <div
          className={`px-4 py-2 text-xs ${
            isConnected
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isConnected ? "🟢 Холбогдсон" : "🔴 Холболт тасарсан"}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-sm">Чат өрөө бэлэн боллоо!</p>
              <p className="text-xs mt-1">🌟 Та юу ч асууж, ярилцаж болно</p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.senderId === userId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === userId ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString("mn-MN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    бичиж байна...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="💭 Энд мессеж бичээрэй... (Control + Command + Space дарж emoji нэмж болно! 😊)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={500}
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-500">
                💡 Та юу ч асууж, санаа бодлоо хуваалцаж болно
              </p>
              <div className="flex space-x-1 text-sm">
                <button
                  type="button"
                  onClick={() => handleTyping(newMessage + " 😊")}
                  className="hover:bg-gray-100 px-1 rounded"
                >
                  😊
                </button>
                <button
                  type="button"
                  onClick={() => handleTyping(newMessage + " 😢")}
                  className="hover:bg-gray-100 px-1 rounded"
                >
                  😢
                </button>
                <button
                  type="button"
                  onClick={() => handleTyping(newMessage + " 😰")}
                  className="hover:bg-gray-100 px-1 rounded"
                >
                  😰
                </button>
                <button
                  type="button"
                  onClick={() => handleTyping(newMessage + " 🤔")}
                  className="hover:bg-gray-100 px-1 rounded"
                >
                  🤔
                </button>
                <button
                  type="button"
                  onClick={() => handleTyping(newMessage + " ❤️")}
                  className="hover:bg-gray-100 px-1 rounded"
                >
                  ❤️
                </button>
              </div>
            </div>
            <span className="text-xs text-gray-400">
              {newMessage.length}/500
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
