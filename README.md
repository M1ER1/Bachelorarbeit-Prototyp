# Vorbereitung
Der Prototyp ist vollständig vorbereitet. Source-Code und Konfigurationsdateien sind enthalten. Es sind lediglich zwei Installationen durchzuführen. 
Zudem muss in der Datei `optimization.js` (Pfad: `Bachelorarbeit-Prototyp-main/src/frontend/js/optimization.js`) in der ersten Zeile ein eigener OpenAI-API-Key eingefügt werden, damit die Anwendung korrekt funktioniert.

---

1. **Node.js installieren**
- Download der aktuellen LTS-Version unter: https://nodejs.org  
- Installation mit Standardeinstellungen  
- Überprüfung der Installation im Terminal:
  node -v
  npm -v
  
  Wenn beide Befehle eine Versionsnummer ausgeben, ist die Installation erfolgreich.

---

2. **Electron installieren**
- Projektordner `Bachelorarbeit-Prototyp-main` im Terminal öffnen  
- Ausführen: npm install electron --save-dev

---

3. **Prototyp starten**
- Im Terminal im Projektordner ausführen: npm start
