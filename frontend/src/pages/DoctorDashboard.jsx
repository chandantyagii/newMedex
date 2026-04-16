import MedicalSummary from "../components/MedicalSummary";
import VoicePrescription from "../components/VoicePrescription";

export default function DoctorDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Doctor Dashboard</h2>
      <MedicalSummary />
      <VoicePrescription />
    </div>
  );
}