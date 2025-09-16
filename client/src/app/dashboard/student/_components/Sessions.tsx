"use client";
import { MessageCircle, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Card from "./Card";

const Sessions = () => {
  const [showHistory, setShowHistory] = useState(false);

  const sessions = [
    {
      id: 1,
      therapist: "Anonymous Chat",
      date: "Yesterday, 3:30 PM",
      type: "Anonymous Support",
      status: "completed",
    },
  ];

  return (
    <Card>
      <div className="flex items-center justify-center ">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center text-lg font-semibold text-blue-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
          Өмнөх уулзалтууд
          {showHistory ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </button>
      </div>

      {showHistory && (
        <div className="space-y-3 mt-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{session.therapist}</h4>
                <p className="text-sm text-gray-600">{session.type}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {session.date}
                </div>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Sessions;
