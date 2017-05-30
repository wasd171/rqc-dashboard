import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'

async function main() {
    ReactDOM.render(
        React.createElement(App), 
        document.getElementById('app')
    )
}

main()