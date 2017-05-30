import {ApolloClient, createNetworkInterface, Request} from 'react-apollo'
import authService from 'renderer/services/AuthService'

const authMiddleware = {
    applyMiddleware(req: Request, next: Function) {
        if (!req.options.headers) {
            req.options.headers = {}
        }

        const token = authService.token
        req.options.headers.authorization = token ? `Bearer ${token}` : null
        
        next()
    }
}

export default function createApolloClient() {
    const networkInterface = createNetworkInterface({
        uri: 'https://api.graph.cool/simple/v1/cj3akftuupmr701300x8bzwk2'
    })

    networkInterface.use([authMiddleware])

    return new ApolloClient({
        networkInterface
    })
}