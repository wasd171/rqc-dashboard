import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MetaProvider from './components/MetaProvider'
import App from './components/App'

ReactDOM.render(
    <MetaProvider component={App}/>, 
    document.getElementById('app')
)