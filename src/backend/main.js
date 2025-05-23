const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Node-Integration aktivieren, damit im Renderer "require" funktioniert.
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../frontend/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});