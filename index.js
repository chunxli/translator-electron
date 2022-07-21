const { app, BrowserWindow, BrowserView, Menu } = require('electron')

const isMac = process.platform === 'darwin'
let win
let isOnTop = false

const autoUpdater = require("electron-updater");

function createWindow () {
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on("ready", () => {
      autoUpdater.checkForUpdatesAndNotify();
    });

    win = new BrowserWindow({ width: 500, height: 700 })
    win.loadURL("https://translate.google.cn/?hl=en")
    // win.setAlwaysOnTop("true")
    Menu.setApplicationMenu()
}



app.whenReady().then(() => {
    createWindow()
})


const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
        label: 'Tools',
        submenu: [
          {
            label: 'Pin to Top',
            click: async () => {
            //   const { shell } = require('electron')
            //   await shell.openExternal('https://electronjs.org')
                win.setAlwaysOnTop(!isOnTop)
                isOnTop = !isOnTop
            }
          }
        ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)



