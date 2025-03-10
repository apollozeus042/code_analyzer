import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [readability, setReadability] = useState('N/A');
  const [bugs, setBugs] = useState('N/A');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAnalyze = () => {
    // Placeholder for analysis logic
    setReadability('Pending...');
    setBugs('Pending...');
    setTimeout(() => {
      setReadability('Good');
      setBugs('None');
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Code Readability & Bug Detection</h1>
      <p>Paste your Python code below, upload a .py file, or upload an image of the code:</p>
      <textarea
        placeholder="Paste your Python code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
      ></textarea>
      <br />
      <input type="file" onChange={handleFileChange} />
      <br />
      <button className="analyze-button" onClick={handleAnalyze}>Analyze Code</button>
      <div className="results">
        <h2>Result:</h2>
        <p>Readability: {readability}</p>
        <p>Bugs Detected: {bugs}</p>
      </div>
      <footer>
        &copy; 2025 Code Analyzer. Built by Master Apollo & Apprentice Chie
      </footer>
    </div>
  );
}

export default App
