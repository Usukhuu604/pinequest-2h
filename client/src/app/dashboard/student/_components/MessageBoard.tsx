"use client";

import { useState } from "react";
import { Send, X, MessageSquare, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageBoardProps {
  userId: string;
  userName: string;
  isAnonymous?: boolean;
  onClose: () => void;
}

const MessageBoard = ({
  userId,
  userName,
  isAnonymous = false,
  onClose,
}: MessageBoardProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual GraphQL mutation call
      const messageData = {
        content: message.trim(),
        authorId: isAnonymous ? `anonymous_${Date.now()}` : userId,
        authorName: isAnonymous ? "Нэргүй сурагч" : userName,
        isAnonymous,
      };

      console.log("Saving message:", messageData);

      // TODO: Call GraphQL mutation
      // const result = await createStudentMessage({ variables: { input: messageData } });

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting message:", error);
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw]">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              ✅ Мессеж амжилттай илгээгдлээ!
            </h3>
            <p className="text-gray-600 mb-4">
              {isAnonymous
                ? "🔒 Таны нэргүй мессежийг сэтгэлзүйч удахгүй харах болно."
                : "💬 Таны мессежийг сэтгэлзүйч удахгүй харах болно."}
            </p>
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-700">
                💡 Сэтгэлзүйч хариулт өгсний дараа та notification авах болно.
              </p>
            </div>
            <Button onClick={onClose} className="w-full">
              Хаах
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] h-[500px] max-w-[90vw] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            isAnonymous ? "bg-purple-50" : "bg-blue-50"
          }`}
        >
          <div className="flex items-center space-x-2">
            {isAnonymous ? (
              <>
                <Shield className="w-6 h-6 text-purple-500" />
                <div>
                  <h3 className="font-semibold">🔒 Нэргүй мессеж илгээх</h3>
                  <p className="text-xs text-purple-600">
                    Таны хувийн мэдээлэл нууцлагдсан
                  </p>
                </div>
              </>
            ) : (
              <>
                <User className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">
                    💬 Сэтгэлзүйчид мессеж илгээх
                  </h3>
                  <p className="text-xs text-blue-600">Таны нэр: {userName}</p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div
          className={`p-4 border-b ${
            isAnonymous ? "bg-purple-25" : "bg-blue-25"
          }`}
        >
          <div className="flex items-start space-x-2">
            <MessageSquare
              className={`w-5 h-5 mt-0.5 ${
                isAnonymous ? "text-purple-500" : "text-blue-500"
              }`}
            />
            <div className="text-sm">
              <p
                className={`font-medium ${
                  isAnonymous ? "text-purple-700" : "text-blue-700"
                }`}
              >
                📝 Та доор асуултаа бичээрэй:
              </p>
              <ul
                className={`mt-1 text-xs ${
                  isAnonymous ? "text-purple-600" : "text-blue-600"
                } space-y-1`}
              >
                <li>• Та юу ч асууж, санаа бодлоо хуваалцаж болно</li>
                <li>• Сэтгэлзүйч таны мессежийг харж хариулт өгөх болно</li>
                <li>• Control + Command + Space дарж emoji нэмж болно</li>
                {isAnonymous && (
                  <li>• 🔒 Таны хувийн мэдээлэл хамгаалагдсан</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isAnonymous
                  ? "🔒 Нэргүй мессежээ бичээрэй... Та юу ч асууж, санаа бодлоо хуваалцаж болно! 😊"
                  : "💭 Мессежээ энд бичээрэй... Та юу ч асууж, санаа бодлоо хуваалцаж болно! 😊"
              }
              className={`w-full h-full resize-none p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                isAnonymous
                  ? "border-purple-200 focus:ring-purple-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              maxLength={1000}
              disabled={isSubmitting}
            />
          </div>

          {/* Quick Emoji Buttons */}
          <div className="flex items-center space-x-2 my-3">
            <span className="text-xs text-gray-500">Хурдан emoji:</span>
            <div className="flex space-x-1">
              {["😊", "😢", "😰", "🤔", "❤️", "😴", "😡", "🤗"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setMessage(message + emoji)}
                  className={`hover:bg-gray-100 px-2 py-1 rounded text-sm ${
                    isAnonymous ? "hover:bg-purple-100" : "hover:bg-blue-100"
                  }`}
                  disabled={isSubmitting}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                {message.length}/1000 тэмдэгт
              </span>
              {isAnonymous && (
                <div className="flex items-center space-x-1 text-xs text-purple-600">
                  <Shield className="w-3 h-3" />
                  <span>Нууцлагдсан</span>
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={!message.trim() || isSubmitting}
              className={`px-6 ${
                isAnonymous
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Илгээж байна...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Мессеж илгээх</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageBoard;
