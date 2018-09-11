const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { app, BrowserWindow, ipcMain } = electron;
// const path = require('path')

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
//   hardResetMethod: 'exit'
// });

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadFile('public/index.html');
  // mainWindow.webContents.openDevTools()
  // mainWindow.on('closed', function () {
  //   mainWindow = null
  // })
}

app.on('ready', createWindow);

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', function () {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })
