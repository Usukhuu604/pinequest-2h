import { Calendar, BookOpen } from "lucide-react";
import Card from "./Card";

const Upcoming = () => (
  <Card>
    <h3 className="text-lg font-semibold mb-4">Төлөвлөсөн уулзалт</h3>
    <div className="space-y-3 text-sm">
      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
        <Calendar className="w-4 h-4 text-blue-600" />
        <span>Counseling – Tomorrow 2PM</span>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
        <BookOpen className="w-4 h-4 text-purple-600" />
        <span>Wellness Workshop – Friday 3:30PM</span>
      </div>
    </div>
  </Card>
);

export default Upcoming;
