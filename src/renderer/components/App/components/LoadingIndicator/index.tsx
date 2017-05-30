import * as React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
`

class LoadingIndicator extends React.Component<{}, {}> {
    render() {
        return (
            <Wrapper>
                <CircularProgress/>
            </Wrapper>
        )
    }
}

export default LoadingIndicator