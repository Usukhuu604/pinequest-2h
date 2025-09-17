"use client";

import { useState } from "react";
import { Send, X, MessageSquare } from "lucide-react";
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
        authorName: isAnonymous ? "Anonymous Student" : userName,
        isAnonymous,
      };

      console.log("Saving message:", messageData);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting message:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[400px] max-w-[90vw]">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Message sent!</h3>
            <p className="text-gray-600 mb-4">
              A counselor will respond to you soon.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] max-w-[90vw] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">
            {isAnonymous ? "Send Anonymous Message" : "Send Message"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
          <div className="flex-1 mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What&apos;s on your mind?
            </label>
            <textarea
              id="message"
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
            <div className="text-xs text-gray-500 mt-1">
              {message.length}/500 characters
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {isAnonymous && (
              <div className="text-sm text-gray-600">
                Your identity will remain private
              </div>
            )}
            <div className="ml-auto">
              <Button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className="px-6"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageBoard;
