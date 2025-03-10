import { useState } from "react";
import "./App.css"; // Ensure App.css is imported

export default function App() {
  const [code, setCode] = useState("");
  const [file, setFile] = useState(null);
  const [readability, setReadability] = useState("N/A");
  const [bugs, setBugs] = useState("N/A");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAnalyze = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("code", code);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.extracted_text) {
        setCode(data.extracted_text);
      }

      // Update readability and bugs state from API response
      if (data.readability) setReadability(data.readability);
      if (data.bugs) setBugs(data.bugs);
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
  };

  return (
    <div className="container">
      <h1>Code Readability & Bug Detection</h1>
      <p>Paste your Python code below, upload a .py file, or upload an image of the code:</p>

      <textarea
        className="code-input"
        placeholder="Paste your Python code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <input type="file" accept=".py,image/*" onChange={handleFileChange} />

      <button className="analyze-button" onClick={handleAnalyze}>
        Analyze Code
      </button>

      <div className="results">
        <strong>Result:</strong>
        <p>Readability: {readability}</p>
        <p>Bugs Detected: {bugs}</p>
      </div>

      <footer>
        &copy; 2025 Code Analyzer. Built by <strong>Master Apollo & Apprentice Chie</strong>
      </footer>
    </div>
  );
}
