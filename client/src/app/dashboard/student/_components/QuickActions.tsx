import Card from "./Card";
import ChatWithPsychologist from "./quick-actions/ChatWithPsychologist";
import EmergencyHelp from "./quick-actions/EmergencyHelp";
import AnonymousQuestion from "./quick-actions/AnonymousQuestion";
import BookAppointment from "./quick-actions/BookAppointment";

const QuickActions = () => (
  <Card>
    <h3 className="text-xl font-semibold mb-2">Туслалцаа авах</h3>
    <p className="text-gray-600 mb-6">Бид танд хэрхэн тусалж болох вэ?</p>

    <div className="grid grid-cols-2 gap-4">
      <ChatWithPsychologist />
      <EmergencyHelp />
      <AnonymousQuestion />
      <BookAppointment />
    </div>
  </Card>
);

export default QuickActions;
