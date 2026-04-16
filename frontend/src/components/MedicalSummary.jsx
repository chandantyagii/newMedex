export default function MedicalSummary() {
  const summary = {
    illnesses: ["Diabetes"],
    allergies: ["Penicillin"],
    medications: ["Metformin"],
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">AI Medical Summary</h3>

      <p><b>Illnesses:</b> {summary.illnesses.join(", ")}</p>
      <p><b>Allergies:</b> {summary.allergies.join(", ")}</p>
      <p><b>Medications:</b> {summary.medications.join(", ")}</p>
    </div>
  );
}