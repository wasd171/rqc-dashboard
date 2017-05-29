import {Main} from '../'
import {app, BrowserWindow} from 'electron'
import {enableLiveReload} from 'electron-compile'
import {installExtensions} from './utils'

export function startFactory(instance: Main) {
    return async function start() {
        if (!app.isReady()) {
            await new Promise(resolve => app.on('ready', resolve))
        }

        instance.window = new BrowserWindow({
            show: true,
            width: 600,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                experimentalFeatures: true
            }
        })

        instance.window.loadURL(`file://${instance.root}/index.jade`)

        if (process.env.NODE_ENV === 'development') {
            enableLiveReload()
            require('electron-debug')({ enabled: true })
			require('devtron').install()
            await installExtensions()
            instance.window.webContents.openDevTools()
        }
    }
}