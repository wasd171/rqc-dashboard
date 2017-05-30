import * as React from 'react'
import {observable, action, computed} from 'mobx'
import {observer} from 'mobx-react'
import {Redirect} from 'react-router-dom'

import authService from 'renderer/services/AuthService'

@observer
class Auth extends React.Component<undefined, {}> {
    container: HTMLElement | null = null;

    @observable loggedIn: boolean = false;

    @action setLoggedIn = (status: boolean) => {
        this.loggedIn = status
    }

    @computed get children() {
        if (!this.loggedIn) {
            return null
        } else {
            return <Redirect to='/conferences'/>
        }
    }

    async componentDidMount() {
        await authService.logIn();
        authService.destroyLock();
        this.setLoggedIn(true)
    }

    render() {
        return this.children
    }
}

export default Auth