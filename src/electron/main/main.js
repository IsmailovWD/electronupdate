const { join } = require('path');
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'IsmailovWD',
    repo: 'electronupdate',
    private: false,
    vPrefixedTagName: false
  });

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
        },
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');// Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, '../../index.html'));
    }
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('ready', () => {
    autoUpdater.checkForUpdates();
})
autoUpdater.on('update-available', (info) => {
    console.log('yangilash mavjud');
});
autoUpdater.on('update-not-available', (info) => {
    console.log('yangilash mavjud emas')
});
autoUpdater.on('download-progress', (progressObj) => {
    console.log('Yuklab olinmoqda')
});
autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();
});
