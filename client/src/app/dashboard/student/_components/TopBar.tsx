import { Bell } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Сайн уу! 👋</h1>
          <p className="text-gray-600">Сонин сайхан юу байна даа?</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">UU</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Unknown Unknown</p>
              <p className="text-xs text-gray-500">Grade 11 • Highschool</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
