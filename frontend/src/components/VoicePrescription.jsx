import { useState, useRef } from "react";

export default function VoicePrescription() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  const toggleListening = () => {
    isListening ? stopListening() : startListening();
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("Speech recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.onerror = (event) => {
      setStatus("Mic error: " + event.error);
      stopListening();
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setStatus("Listening…");
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setStatus("");
  };

  const generatePdf = async () => {
    if (!text.trim()) {
      setStatus("Please enter a prescription first.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prescription: text }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Server error");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");

      setTimeout(() => URL.revokeObjectURL(url), 60000);
      setStatus("PDF opened in new tab.");
    } catch (err) {
      setStatus("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 border rounded-xl bg-white">
      <h3 className="font-semibold text-lg mb-4">Voice Prescription</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded-lg p-3 text-sm mb-3"
        rows="6"
        placeholder="Speak or type the prescription here…"
      />

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-lg text-sm border ${isListening
              ? "border-red-400 text-red-600 bg-red-50"
              : "border-green-500 text-green-700"
            }`}
        >
          {isListening ? "⏹ Stop speaking" : "🎙 Start speaking"}
        </button>
        {status && <span className="text-xs text-gray-500">{status}</span>}
      </div>

      <button
        onClick={generatePdf}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm"
      >
        {loading ? "Generating…" : "Generate PDF"}
      </button>
    </div>
  );
}
