import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme()

import {HashRouter as Router} from 'react-router-dom'

class MetaProvider extends React.Component<{children: React.ReactNode}, {}> {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router>
                    {this.props.children}
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default MetaProvider