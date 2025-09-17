import TopBar from "./_components/TopBar";
import QuickActions from "./_components/QuickActions";
import Sessions from "./_components/Sessions";
import Upcoming from "./_components/Upcoming";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-0">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />

          <Sessions />
        </div>
        <div className="space-y-6">
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
