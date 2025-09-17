import TopBar from "./_components/TopBar";
import PsychologistActions from "./_components/PsychologistActions";

import TodaySchedule from "./_components/TodaySchedule";
import SessionManagement from "./_components/SessionManagement";

const PsychologistDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PsychologistActions />
            <SessionManagement />
          </div>

          <div className="space-y-6">
            <TodaySchedule />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistDashboard;
