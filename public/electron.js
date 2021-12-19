// Check for updates
const {autoUpdater} = require('electron-updater')

const {app, BrowserWindow, ipcMain} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const {
    MAXIMIZE_WINDOW_IPC,
    MINIMIZE_WINDOW_IPC,
    CLOSE_WINDOW_IPC,
} = require('../src/CONSTANTS')

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        frame: false,
        icon: 'icon.ico',
        title: 'Jarvis',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false
        },
    })
    mainWindow.removeMenu()

    // Check for updates
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        autoUpdater.checkForUpdatesAndNotify()
    })

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
    if(isDev){
        mainWindow.webContents.openDevTools({mode: 'undocked'})
    }

    mainWindow.loadURL(startUrl)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // CORS fix
    mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
        (details, callback) => {
            details.requestHeaders['Origin'] = '*'
            callback({requestHeaders: details.requestHeaders})
        },
    );

    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        if('Access-Control-Allow-Origin' in details.responseHeaders){
            details.responseHeaders['Access-Control-Allow-Origin'] = [
                '*'
            ]
        }else if('access-control-allow-origin' in details.responseHeaders){
            details.responseHeaders['access-control-allow-origin'] = [
                '*'
            ]
        }else{
            details.responseHeaders['Access-Control-Allow-Origin'] = [
                '*'
            ]
        }
        callback({
            responseHeaders: details.responseHeaders
        });
    });
}

// Subscribe to events
ipcMain.on(MAXIMIZE_WINDOW_IPC, (e) => {
    if(mainWindow.isMaximized()){
        mainWindow.unmaximize()
    }else{
        mainWindow.maximize()
    }
})
ipcMain.on(MINIMIZE_WINDOW_IPC, (e) => {
    mainWindow.minimize()
})
ipcMain.on(CLOSE_WINDOW_IPC, (e) => {
    mainWindow.close()
})


app.whenReady().then(() => {
    createWindow()
})