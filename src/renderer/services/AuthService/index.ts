import Auth0LockPasswordless from 'auth0-lock-passwordless'
import {ID_TOKEN} from 'shared/constants'
import * as Bluebird from 'bluebird'

export class AuthService {
    lock: Auth0LockPasswordless = new Auth0LockPasswordless(
        'Jqxnc9zU-JNJqmUnFzOh1yCEUHeIv8I8', 
        'wasd171.eu.auth0.com'
    )
    token: null | string = localStorage.getItem(ID_TOKEN);

    logIn() {
        return new Promise((resolve, reject) => {
            this.lock.emailcode(
                { autoclose: true },
                (error: Error | undefined, profile: any, id_token: string | undefined) => {
                    if (error != null) {
                        reject(error)
                    }  else if (id_token == null) {
                        reject(new Error('Received empty id_token from Auth0'))
                    } else {
                        localStorage.setItem(ID_TOKEN, id_token)
                        this.token = id_token

                        resolve({
                            profile,
                            token: id_token
                        })
                }
            })
        })
    }

    async isLoggedIn() {
        try {
            await Bluebird.fromCallback(done => this.lock.getProfile(this.token, done))
            return true
        } catch (error) {
            this.token = null
            localStorage.removeItem(ID_TOKEN)
            return false
        }
    }
}

export default new AuthService()