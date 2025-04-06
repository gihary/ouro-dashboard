// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState("ORION");

  const systemPrompts = {
    ORION:
      "Sei ORION, l'agente AI principale della piattaforma OURO. Il tuo compito è aiutare l'utente a creare contenuti, strategie e idee per il digital marketing con tono professionale, sintetico e brillante.",
    LYRA:
      "Sei LYRA, l'agente AI copywriter della piattaforma OURO. Scrivi testi accattivanti, persuasivi e ben strutturati per social media, blog e campagne pubblicitarie.",
    SEOX:
      "Sei SEOX, l'agente AI per l'ottimizzazione SEO. Analizza contenuti e fornisci suggerimenti per migliorarne il posizionamento sui motori di ricerca.",
    PLANNYX:
      "Sei PLANNYX, l'agente AI per la pianificazione dei contenuti. Genera piani editoriali settimanali in base agli obiettivi del cliente.",
    UXARIA:
      "Sei UXARIA, l'agente AI per l'esperienza utente. Analizza interfacce digitali e suggerisci miglioramenti in termini di usabilità, accessibilità e design."
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: systemPrompts[agent] || systemPrompts["ORION"],
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
      console.log("🧠 DATA:", data);
      const reply = data.choices?.[0]?.message?.content || "⚠️ Nessuna risposta utile.";
      setResponse(reply);
    } catch (error) {
      console.error("❌ Errore:", error);
      setResponse("❌ Errore nella richiesta. Controlla la console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🐍 OURO – Dashboard AI</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Scegli un agente:
          <select
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            style={{ marginLeft: "1rem", padding: "0.3rem" }}
          >
            <option value="ORION">ORION – Dispatcher</option>
            <option value="LYRA">LYRA – Copywriting</option>
            <option value="SEOX">SEOX – SEO</option>
            <option value="PLANNYX">PLANNYX – Piano Editoriale</option>
            <option value="UXARIA">UXARIA – UX/UI</option>
          </select>
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
          placeholder={`Scrivi qui il tuo task per ${agent}...`}
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
          {loading ? `${agent} sta pensando...` : `Invia a ${agent}`}
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
          <strong>🤖 Risposta da {agent}:</strong>
          <br />
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
