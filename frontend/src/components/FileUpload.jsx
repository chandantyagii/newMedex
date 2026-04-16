import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    console.log("Uploading:", file);
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2"
      >
        Upload Report
      </button>
    </div>
  );
}