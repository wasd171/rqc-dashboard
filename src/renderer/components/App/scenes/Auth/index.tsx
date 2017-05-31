import * as React from 'react'
import {observable, action, computed} from 'mobx'
import {observer} from 'mobx-react'
import {Redirect} from 'react-router-dom'
import {graphql, ApolloQueryResult, ApolloClient, withApollo} from 'react-apollo'
import {DocumentNode} from 'graphql'

import authService from 'renderer/services/AuthService'

import * as getUserQuery from './getUserQuery.graphql'
import * as createUserMutation from './createUserMutation.graphql'

export type QueryOptionsType = {
    query: DocumentNode
}

export type QueryResponseType = {
    viewer: null | {
        user: null | {
            id: string
        }
    }
}

export interface IApolloClientWithQueryType extends ApolloClient {
    query: (options: QueryOptionsType) => Promise<ApolloQueryResult<QueryResponseType>>
}

export type MutationOptionsType = {
    variables: {
        idToken: string
    }
}

export type MutationResponseType = {
    loginUserWithAuth0: {
        user: {
            id: string
        }
    }
}

export interface IAuthProps {
    mutate: (options: MutationOptionsType) => Promise<ApolloQueryResult<MutationResponseType>>
    client: IApolloClientWithQueryType
}

@withApollo
@graphql(createUserMutation)
@observer
class Auth extends React.Component<IAuthProps, {}> {
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
        let loggedIn = false;

        while (!loggedIn) {
            try {
                const {token} = await authService.logIn();

                const queryRes = await this.props.client.query({
                    query: getUserQuery
                })
                const {viewer} = queryRes.data;

                if (viewer === null || viewer.user === null) {
                    const mutationRes = await this.props.mutate({
                        variables: {
                            idToken: token
                        }
                    })

                    authService.saveUserId(mutationRes.data.loginUserWithAuth0.user.id)
                } else {
                    authService.saveUserId(viewer.user.id)
                }

                loggedIn = true
            } catch (err) {
                authService.saveToken(null)
                authService.saveUserId(null)
            }
        }

        await authService.closeLock()
        authService.destroyLock()
        this.setLoggedIn(true)
    }

    render() {
        return this.children
    }
}

export default Auth