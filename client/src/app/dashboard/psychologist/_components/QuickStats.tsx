"use client";

import { TrendingUp, Users, MessageCircle, Star, Clock, Calendar } from "lucide-react";

const stats = [
  {
    label: "Нийт оюутан",
    value: "142",
    change: "+12",
    changeType: "increase",
    icon: Users,
    period: "Энэ сард",
  },
  {
    label: "Идэвхтэй чат",
    value: "23",
    change: "+5",
    changeType: "increase",
    icon: MessageCircle,
    period: "Өнөөдөр",
  },
  {
    label: "Дундаж үнэлгээ",
    value: "4.8",
    change: "+0.2",
    changeType: "increase",
    icon: Star,
    period: "5-аас",
  },
  {
    label: "Хариу өгөх хугацаа",
    value: "12 мин",
    change: "-3 мин",
    changeType: "decrease",
    icon: Clock,
    period: "Дундаж",
  },
];

const QuickStats = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Статистик</h3>
          <p className="text-gray-600">Таны ажлын үр дүн</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
          Дэлгэрэнгүй
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-gray-600" />
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === "increase" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mb-1">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <div className="text-sm text-gray-600">
              <div>{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.period}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Энэ долоо хоногийн идэвхжил</span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Даваа</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
              <span className="text-gray-900 font-medium">8</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Мягмар</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <span className="text-gray-900 font-medium">6</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Лхагва</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
              <span className="text-gray-900 font-medium">10</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Өнөөдөр</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "62.5%" }}></div>
              </div>
              <span className="text-gray-900 font-bold">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
