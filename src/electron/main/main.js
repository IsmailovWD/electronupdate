"use strict";
import { join } from 'path';
import { app, BrowserWindow , dialog} from 'electron';
import { autoUpdater } from 'electron-updater';

autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'IsmailovWD',
    repo: 'electronupdate',
    private: false,
    vPrefixedTagName: true
});

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

function showMessage(message) {
    console.log("showMessage trapped");
    console.log(message);
    dialog.showMessageBox({
        type: 'info',
        title: message,
        message: message,
        buttons: ['OK', 'CANCEl']
    })
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
        },
    });
    showMessage('salom')
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
    showMessage('yangilash mavjud');
});
autoUpdater.on('update-not-available', (info) => {
    showMessage('yangilash mavjud emas')
});
autoUpdater.on('download-progress', (progressObj) => {
    showMessage('Yuklab olinmoqda')
});
autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();
});