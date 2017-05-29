// @flow
import typeof { BrowserWindow } from 'electron'

import { startFactory } from './methods'

export class Main {
	window: null | BrowserWindow = null

	start = startFactory(this)
}
