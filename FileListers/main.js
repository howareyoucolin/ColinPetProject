const { app, BrowserWindow, dialog, ipcMain, screen } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: Math.floor(width * 0.9),
    height: Math.floor(height * 0.9),
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");

  ipcMain.handle("pick-folder", async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });

    if (result.canceled) return [];

    const folderPath = result.filePaths[0];
    const files = fs.readdirSync(folderPath);
    return files;
  });
}

app.whenReady().then(createWindow);
