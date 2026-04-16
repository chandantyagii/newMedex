import FileUpload from "../components/FileUpload";
import Timeline from "../components/Timeline";

export default function PatientDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patient Dashboard</h2>
      <FileUpload />
      <Timeline />
    </div>
  );
}