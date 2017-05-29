import {startFactory} from './methods'

export class Main {
    root: string
    window: null | Electron.BrowserWindow = null

    constructor({root}: {root: string}) {
        this.root = root
    }

    start = startFactory(this)
}