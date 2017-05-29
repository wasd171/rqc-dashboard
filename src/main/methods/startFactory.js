// @flow
import type { Main } from '../'

import { app, BrowserWindow } from 'electron'
import Bluebird from 'bluebird'
import invariant from 'assert'

invariant(app != null)

export async function startFactory(instance: Main) {
	if (!app.isReady()) {
		await Bluebird.promisify(app.on)('ready')
	}
}
