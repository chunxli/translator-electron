const { app, BrowserWindow, BrowserView } = require('electron')

function createWindow () {
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })

    const win = new BrowserWindow({ width: 500, height: 500 })
    win.loadURL("https://translate.google.cn/?hl=en")
}



app.whenReady().then(() => {
    createWindow()
})


