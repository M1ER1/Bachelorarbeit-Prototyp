# Vorbereitung
Der Prototyp ist vollständig vorbereitet. Source-Code und Konfigurationsdateien sind enthalten. Es sind wenige Installationen durchzuführen. 
Zudem muss in der Datei `optimization.js` (Pfad: `Bachelorarbeit-Prototyp-main/src/frontend/js/optimization.js`) in der ersten Zeile ein eigener OpenAI-API-Key eingefügt werden, damit die Anwendung korrekt funktioniert.

---

1. **Node.js installieren**
- Download der aktuellen LTS-Version unter: https://nodejs.org  
- Installation mit Standardeinstellungen  
- Überprüfung der Installation im Terminal:<br>
  node -v<br>
  npm -v
  
  Wenn beide Befehle eine Versionsnummer ausgeben, ist die Installation erfolgreich.

---

2. **Electron installieren**
- Projektordner `Bachelorarbeit-Prototyp-main` im Terminal öffnen  
- Ausführen: npm install electron --save-dev

---

3. **Prototyp starten**
- Im Terminal im Projektordner ausführen: npm start

---

4. **Erstellung einer ausführbaren Datei (Build)**
- Für die Erstellung zunächst im Projektordner im Terminal ausführen: npm install 
- Je nach Betriebssystem den entsprechenden Befehl im Terminal ausführen:<br>
  npm run build:mac (für macOS)<br>
  npm run build:win (für Windows)
- Die macOS-Version liegt in `exe_mac/`, die Windows-Version in `exe_win/`. Beide Ordner enthalten die ausführbare App und können unabhängig von Node.js genutzt werden.

