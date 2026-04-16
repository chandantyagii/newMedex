import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Smart Healthcare</h1>
      <div className="space-x-4">
        <Link to="/">Patient</Link>
        <Link to="/doctor">Doctor</Link>
      </div>
    </div>
  );
}