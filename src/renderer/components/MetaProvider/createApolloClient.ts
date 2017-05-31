import {ApolloClient, createNetworkInterface, Request} from 'react-apollo'
import authService from 'renderer/services/AuthService'

const authMiddleware = {
    applyMiddleware(req: Request, next: Function) {
        if (!req.options.headers) {
            req.options.headers = {}
        }

        const {token} = authService
        req.options.headers.authorization = token ? `Bearer ${token}` : null

        next()
    }
}

export default function createApolloClient() {
    const networkInterface = createNetworkInterface({
        uri: 'https://us-west-2.api.scaphold.io/graphql/placid-nest'
    })

    networkInterface.use([authMiddleware])

    return new ApolloClient({
        networkInterface
    })
}