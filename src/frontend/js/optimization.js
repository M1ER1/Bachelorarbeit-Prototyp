const openaiApiKey = "Hier muss der eigene OpenAI-API-Key eingefügt werden."; // ACHTUNG!

export function initOptimization() {
  document.getElementById("optimizeButton").addEventListener("click", async function () {
    const maskedOutputDiv = document.getElementById("maskedOutput");
    const editedMaskedComment = maskedOutputDiv.innerText;
    if (!editedMaskedComment) {
      alert("Der maskierte Kommentar ist leer.");
      return;
    }
    document.getElementById("loadingSpinner").style.display = "block";
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "Du bist ein professioneller IT-Auditor und Berichtsverfasser." },
            {
              role: "user", content:
                `Erstelle einen hochwertigen IT-Audit-Berichtssatz basierend auf folgendem Kommentar:
              
               "${editedMaskedComment}"

               Die Anforderungen sind:
               - Präzise und professionell formuliert
               - Verständlich 
               - Perfekter Satzbau & Grammatik
               - Fachlich fundiert und kontextbezogen
               - Geeignet für einen offiziellen IT-Audit-Bericht
               - [Klient],[Ansprechperson1],[Ansprechperson2],...,[Dienstleister1],[Dienstleister2],... sind Platzhalter für die Originalwerte und dürfen nicht geändert werden.
               - Gib ausschließlich die überarbeiteten Sätze zurück – keine Erklärungen, Überschriften oder Sonderzeichen.`
            }
          ],
          max_tokens: 500,
          temperature: 0.2
        })
      });
      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Fehlerhafte API-Antwort:", data);
        document.getElementById("optimizedOutput").innerText = "Fehler bei der Optimierung.";
        document.getElementById("loadingSpinner").style.display = "none";
        return;
      }
      let optimizedText = data.choices[0].message.content.trim();
      // Ersetze Platzhalter durch die Originalwerte
      optimizedText = optimizedText
        .replace(/\[Klient\]/g, document.getElementById("clientName").value.trim())
        .replace(/\[Ansprechperson\d+\]/g, function (match) {
          const regex = /\[Ansprechperson(\d+)\]/;
          const m = match.match(regex);
          if (m) {
            const idx = parseInt(m[1], 10);
            const elems = Array.from(document.querySelectorAll(".contactPerson")).map(el => el.value.trim());
            return elems[idx - 1] || match;
          }
          return match;
        })
        .replace(/\[Dienstleister\d+\]/g, function (match) {
          const regex = /\[Dienstleister(\d+)\]/;
          const m = match.match(regex);
          if (m) {
            const idx = parseInt(m[1], 10);
            const elems = Array.from(document.querySelectorAll(".externalService")).map(el => el.value.trim());
            return elems[idx - 1] || match;
          }
          return match;
        });
      document.getElementById("optimizedOutput").innerText = optimizedText;
      document.getElementById("copyButton").style.display = "block";
    } catch (error) {
      console.error("Fehler bei der API-Anfrage:", error);
      document.getElementById("optimizedOutput").innerText = "Fehler beim Abrufen der Optimierung.";
    }
    document.getElementById("loadingSpinner").style.display = "none";
  });
}
