"use client";

import { MessageCircle, Calendar, Users, Shield, Clock, CheckCircle } from "lucide-react";

const actions = [
  {
    icon: MessageCircle,
    label: "Идэвхтэй чат",
    count: 3,
    color: "bg-blue-500",
    description: "Оюутадтай ярилцаж байна",
  },
  {
    icon: Shield,
    label: "Нэргүй чат",
    count: 2,
    color: "bg-purple-500",
    description: "Нэргүй зөвлөгөө өгөж байна",
  },
  {
    icon: Calendar,
    label: "Өнөөдрийн цаг",
    count: 5,
    color: "bg-green-500",
    description: "Товлосон уулзалт",
  },
  {
    icon: Users,
    label: "Хүлээж буй",
    count: 7,
    color: "bg-orange-500",
    description: "Хариу хүлээж буй оюутад",
  },
];

const PsychologistActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-2">Өнөөдрийн ажил</h3>
      <p className="text-gray-600 mb-6">Таны идэвхтэй үйл ажиллагаа</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, i) => (
          <button
            key={i}
            className={`p-4 rounded-xl text-white ${action.color} hover:opacity-90 transition-all transform hover:scale-105`}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col items-start text-left">
                <action.icon className="w-6 h-6 mb-2" />
                <span className="font-medium text-lg">{action.label}</span>
                <span className="text-sm opacity-90 mt-1">{action.description}</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                <span className="font-bold text-xl">{action.count}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">Өнөөдөр 12 оюутантай ажилласан</span>
        </div>
        <p className="text-green-600 text-sm mt-1">Дундаж хариу өгөх хугацаа: 15 минут</p>
      </div>
    </div>
  );
};

export default PsychologistActions;
