import Auth0LockPasswordless from 'auth0-lock-passwordless'
import {ID_TOKEN} from 'shared/constants'
import {fromCallback} from 'shared/utils'

export class AuthService {
    _lock: Auth0LockPasswordless | null = null;
    token: null | string = localStorage.getItem(ID_TOKEN);

    get lock(): Auth0LockPasswordless {
        if (this._lock === null) {
            this._lock = new Auth0LockPasswordless(
                'Jqxnc9zU-JNJqmUnFzOh1yCEUHeIv8I8', 
                'wasd171.eu.auth0.com'
            )
        }

        return this._lock
    }

    logIn() {
        return new Promise((resolve, reject) => {
            this.lock.emailcode(
                { autoclose: true, closable: false },
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
            await fromCallback(done => this.lock.getProfile(this.token, done))
            return true
        } catch (error) {
            this.token = null
            localStorage.removeItem(ID_TOKEN)
            return false
        }
    }

    destroyLock() {
        this.lock.destroy();
        this._lock = null;
    }
}

export default new AuthService()