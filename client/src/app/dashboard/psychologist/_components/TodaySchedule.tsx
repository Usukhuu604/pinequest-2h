"use client";

import { Clock, AlertCircle, CheckCircle } from "lucide-react";

const appointments = [
  {
    id: 1,
    student: "А.Анхбаяр",
    time: "09:00 - 09:50",

    status: "Баталгаажсан",
    notes: "Суралцах стресс",
  },

  {
    id: 5,
    student: "Д.Дулгуун",
    time: "15:00 - 15:50",

    status: "Шинэ хүсэлт",
    notes: "Нийгэмд дасан зохицох",
  },
];

const TodaySchedule = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Баталгаажсан":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Яаралтай":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "Шинэ хүсэлт":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Баталгаажсан":
        return "bg-green-50 border-green-200";
      case "Яаралтай":
        return "bg-red-50 border-red-200";
      case "Шинэ хүсэлт":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-yellow-50 border-yellow-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Өнөөдрийн хуваарь</h3>
          <p className="text-gray-600">2025.09.17 • 5 уулзалт</p>
        </div>
      </div>

      <div className="space-y-3">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`p-4 rounded-lg border ${getStatusColor(
              appointment.status
            )} hover:shadow-sm transition-all`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(appointment.status)}
                  <span className="font-medium">{appointment.student}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700">{appointment.notes}</p>
              </div>

              <div className="flex flex-col space-y-1">
                {appointment.status === "Шинэ хүсэлт" && (
                  <>
                    <button className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                      Зөвшөөрөх
                    </button>
                    <button className="px-3 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">
                      Татгалзах
                    </button>
                  </>
                )}
                {appointment.status === "Баталгаажсан" && (
                  <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                    Нээх
                  </button>
                )}
                {appointment.status === "Яаралтай" && (
                  <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 animate-pulse">
                    Яаралтай
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
