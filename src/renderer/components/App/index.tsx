import * as React from 'react'
import styled from 'styled-components'
import {Route, Redirect, Switch} from 'react-router-dom'
import {observable, action, computed} from 'mobx'
import {observer} from 'mobx-react'
import authService from 'renderer/services/AuthService'

import LoadingIndicator from './components/LoadingIndicator'
import Auth from './scenes/Auth'

const Container = styled.div`
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
`

@observer
class App extends React.Component<{}, {}> {
    @observable authStatus: boolean | null = null;

    @action setAuthStatus = (status: boolean) => {
        this.authStatus = status
    }

    @computed get children() {
        switch(this.authStatus) {
            case null:
                return <LoadingIndicator/>
            case false:
                return <Redirect to='/auth'/>
            case true:
                return <Redirect to='/conferences'/>
        }
    }

    async componentDidMount() {
        const status = await authService.isLoggedIn()
        this.setAuthStatus(status)
    }

    render() {
        this.children // Just to force re-render

        return (
            <Container>
                <Switch>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/conferences' render={() => <div>conferences</div>}/>
                    <Route path='*' render={() => this.children}/>
                </Switch>
            </Container>
        )
    }
}

export default App