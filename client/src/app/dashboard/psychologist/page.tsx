import TopBar from "./_components/TopBar";
import PsychologistActions from "./_components/PsychologistActions";
import ActiveSessions from "./_components/ActiveSessions";
import TodaySchedule from "./_components/TodaySchedule";
import QuickStats from "./_components/QuickStats";

const PsychologistDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Actions & Sessions */}
          <div className="lg:col-span-2 space-y-6">
            <PsychologistActions />
            <ActiveSessions />
          </div>

          {/* Right Column - Schedule & Stats */}
          <div className="space-y-6">
            <TodaySchedule />
            <QuickStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistDashboard;
