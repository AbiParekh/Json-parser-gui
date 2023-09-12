import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonData, setJsonData] = useState("");   // Initialize with an empty string
    const [error, setError] = useState(null);       // State to handle any errors

    const fetchData = async () => {
        try {
            let response = await fetch("http://127.0.0.1:5000/get_data");
            const contentType = response.headers.get("content-type");

            if (response.headers.get("Content-Type").includes("application/json")) {
                let data = await response.json();
                setJsonData(JSON.stringify(data, null, 4));
            } else {
                let errorText = await response.text();
                throw new Error(`Unexpected response: ${errorText}`);
            }
        } catch (error) {
            console.error("There was an error fetching the data", error);
            setError(error.toString());
        }
    };



    return (
        <div className="App">
            <header className="App-header">
                <button onClick={fetchData}>Fetch JSON Data</button>
                <pre>{jsonData}</pre>
                {error && <p style={{ color: "red" }}>{error}</p>}   {/* Display error if it exists */}
            </header>
        </div>
    );
}

export default App;

