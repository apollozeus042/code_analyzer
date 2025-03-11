import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [code, setCode] = useState("");
  const [readability, setReadability] = useState("N/A");
  const [bugs, setBugs] = useState("N/A");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processImage(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    processImage(droppedFile);
  };

  const processImage = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload an image containing code.");
      return;
    }

    setReadability("Pending...");
    setBugs("Pending...");

    const formData = new FormData();
    const file = await fetch(image).then((res) => res.blob());
    formData.append("file", file, "image.png");

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.extracted_text) setCode(data.extracted_text);
      if (data.readability !== undefined) setReadability(data.readability);
      if (data.bugs) setBugs(data.bugs);
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">Code Analyzer</h1>
      <div className="content">
        <div
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {image ? (
            <div className="image-container">
              <img src={image} alt="Uploaded Code" className="uploaded-image" />
              <button className="remove-btn" onClick={() => setImage(null)}>X</button>
            </div>
          ) : (
            <p>Drag & drop an image here or click to upload</p>
          )}
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className="code-results">
          <textarea
            placeholder="Extracted code will appear here..."
            value={code}
            readOnly
            className="code-input"
          ></textarea>

          <button className="analyze-button" onClick={handleAnalyze}>
            Analyze Code
          </button>

          <div className="results">
            <p>Readability: {readability}</p>
            <p>Bugs Detected: {bugs}</p>
          </div>
        </div>
      </div>

      <footer>&copy; 2025 Code Analyzer. Built by Master Apollo & Apprentice Chie</footer>
    </div>
  );
}

export default App;
