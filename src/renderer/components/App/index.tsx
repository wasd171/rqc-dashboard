import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
`

class App extends React.Component<{}, {}> {
    render() {
        return (
            <Container>
                Hello, world!
            </Container>
        )
    }
}

export default App