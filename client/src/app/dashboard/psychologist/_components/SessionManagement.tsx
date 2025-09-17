"use client";

import { useState } from "react";
import { Calendar, Check, X, Clock, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SessionChat from "../../_components/SessionChat";

interface SessionRequest {
  id: string;
  studentName: string;
  studentId: string;
  requestedDate: string;
  requestedTime: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const SessionManagement = () => {
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([
    {
      id: "req_1",
      studentName: "Болор",
      studentId: "student_123",
      requestedDate: "2024-01-15",
      requestedTime: "14:00",
      notes: "Сургуулийн стресстэй холбоотой асуудал",
      status: "pending",
      createdAt: "2024-01-14T10:30:00Z",
    },
    {
      id: "req_2",
      studentName: "Энхжин",
      studentId: "student_456",
      requestedDate: "2024-01-16",
      requestedTime: "10:00",
      notes: "",
      status: "pending",
      createdAt: "2024-01-14T14:20:00Z",
    },
  ]);

  const [approvedTime, setApprovedTime] = useState<{ [key: string]: string }>(
    {}
  );
  const [activeChat, setActiveChat] = useState<SessionRequest | null>(null);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleApprove = (requestId: string) => {
    const finalTime = approvedTime[requestId];

    setSessionRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved" as const,
              requestedTime: finalTime || req.requestedTime,
            }
          : req
      )
    );

    // Clear the approved time selection
    setApprovedTime((prev) => ({ ...prev, [requestId]: "" }));

    console.log("Session approved:", requestId, "Time:", finalTime);
  };

  const handleReject = (requestId: string) => {
    setSessionRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" as const } : req
      )
    );

    console.log("Session rejected:", requestId);
  };

  const pendingRequests = sessionRequests.filter(
    (req) => req.status === "pending"
  );
  const approvedRequests = sessionRequests.filter(
    (req) => req.status === "approved"
  );

  if (activeChat) {
    return (
      <SessionChat
        sessionId={activeChat.id}
        studentName={activeChat.studentName}
        therapistName="Д. Мөнхбат"
        currentUserRole="therapist"
        onBack={() => setActiveChat(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            🔔 Шинэ хүсэлтүүд ({pendingRequests.length})
          </h2>
        </div>
        <div className="p-4 space-y-4">
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Шинэ хүсэлт байхгүй байна
            </p>
          ) : (
            pendingRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 bg-yellow-50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{request.studentName}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(request.createdAt).toLocaleDateString(
                          "mn-MN"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{request.requestedDate}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{request.requestedTime}</span>
                    </div>
                  </div>
                </div>

                {request.notes && (
                  <div className="mb-3 p-2 bg-white rounded border-l-4 border-blue-400">
                    <p className="text-sm text-gray-700">{request.notes}</p>
                  </div>
                )}

                {/* Time Selection for Approval */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⏰ Боломжтой цагаа сонгоно уу:
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setApprovedTime((prev) => ({
                            ...prev,
                            [request.id]: time,
                          }))
                        }
                        className={`px-2 py-1 text-xs rounded border ${
                          approvedTime[request.id] === time
                            ? "bg-green-500 text-white border-green-500"
                            : time === request.requestedTime
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {time}
                        {time === request.requestedTime && " (хүсэлт)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleApprove(request.id)}
                    disabled={!approvedTime[request.id]}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Зөвшөөрөх
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    variant="outline"
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Татгалзах
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;
