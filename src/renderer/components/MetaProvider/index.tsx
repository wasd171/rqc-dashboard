import * as React from 'react'
import {Route} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme()

import {ApolloProvider} from 'react-apollo'
import createApolloClient from './createApolloClient'
const client = createApolloClient()

import {HashRouter as Router} from 'react-router-dom'

class MetaProvider extends React.Component<{component: React.ComponentClass<any>}, {}> {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <ApolloProvider client={client}>
                    <Router>
                        <Route path='/' component={this.props.component}/>
                    </Router>
                </ApolloProvider>
            </MuiThemeProvider>
        )
    }
}

export default MetaProvider