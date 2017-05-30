import * as React from 'react'
import styled from 'styled-components'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Lock from 'renderer/services/Lock'

const muiTheme = getMuiTheme();

const Container = styled.div`
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
`

class App extends React.Component<{}, {}> {
    componentDidMount() {
        Lock.emailcode((...args) => console.log(args))
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Container>
                    Hello, world!
                </Container>
            </MuiThemeProvider>
        )
    }
}

export default App