"use client";

import { Clock, User, MessageSquare, Calendar, MoreHorizontal } from "lucide-react";

const sessions = [
  {
    id: 1,
    student: "Оюутан #A001",
    type: "Нэргүй зөвлөгөө",
    status: "Идэвхтэй",
    time: "14:30",
    duration: "25 мин",
    priority: "urgent",
    lastMessage: "Би үнэхээр санаа зовж байна...",
  },
  {
    id: 2,
    student: "Б.Батбаяр",
    type: "Товлосон уулзалт",
    status: "Хүлээж байна",
    time: "15:00",
    duration: "50 мин",
    priority: "normal",
    lastMessage: "Өмнөх сессийн талаар ярилцъя",
  },
  {
    id: 3,
    student: "Оюутан #A045",
    type: "Нэргүй чат",
    status: "Шинэ мессеж",
    time: "15:30",
    duration: "12 мин",
    priority: "high",
    lastMessage: "Тусламж хэрэгтэй байна",
  },
  {
    id: 4,
    student: "С.Сарангэрэл",
    type: "Дахин уулзалт",
    status: "Баталгаажсан",
    time: "16:00",
    duration: "45 мин",
    priority: "normal",
    lastMessage: "Би бэлэн байна",
  },
];

const ActiveSessions = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500 bg-red-50";
      case "high":
        return "border-l-orange-500 bg-orange-50";
      default:
        return "border-l-green-500 bg-green-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Идэвхтэй":
        return "bg-green-100 text-green-800";
      case "Хүлээж байна":
        return "bg-yellow-100 text-yellow-800";
      case "Шинэ мессеж":
        return "bg-blue-100 text-blue-800";
      case "Баталгаажсан":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Идэвхтэй сессүүд</h3>
          <p className="text-gray-600">Өнөөдрийн ажлын хуваарь</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
              session.priority
            )} hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">{session.student}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{session.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {session.time} • {session.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-700 italic">"{session.lastMessage}"</p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">Нээх</button>
                {session.status === "Хүлээж байна" && (
                  <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                    Эхлүүлэх
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700">
        + Шинэ сесс нэмэх
      </button>
    </div>
  );
};

export default ActiveSessions;
