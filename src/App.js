import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ***QUI-METTO-LA-MIA-API-KEY***",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "Sei ORION, l'agente AI principale della piattaforma OURO. Il tuo compito è aiutare l'utente a creare contenuti, strategie e idee per il digital marketing con tono professionale, sintetico e brillante.",
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Nessuna risposta.";
      setResponse(reply);
    } catch (error) {
      console.error("Errore:", error);
      setResponse("Si è verificato un errore. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🐍 OURO – ORION Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
          placeholder="Scrivi qui il tuo task per ORION..."
        ></textarea>
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.7rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "ORION sta pensando..." : "Invia a ORION"}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f4f4f4",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>🧠 Risposta di ORION:</strong>
          <br />
          {response}
        </div>
      )}
    </div>
  );
}

export default App;

