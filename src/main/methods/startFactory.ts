import {Main} from '../'
import {app, BrowserWindow} from 'electron'

export function startFactory(instance: Main) {
    return async function start() {
        if (!app.isReady()) {
            await new Promise(resolve => app.on('ready', resolve))
        }

        instance.window = new BrowserWindow({
            show: true,
            width: 600,
            height: 800,
            webPreferences: {
                nodeIntegration: true,
                experimentalFeatures: true
            }
        })

        instance.window.loadURL(`file://${instance.root}/index.html`)
    }
}