import Auth0LockPasswordless from 'auth0-lock-passwordless'
import {ID_TOKEN, USER_ID} from 'shared/constants'
import {fromCallback} from 'shared/utils'

export class AuthService {
    _lock: Auth0LockPasswordless | null = null;
    token: null | string = localStorage.getItem(ID_TOKEN);
    userId: null | string = localStorage.getItem(USER_ID);

    get lock(): Auth0LockPasswordless {
        if (this._lock === null) {
            this._lock = new Auth0LockPasswordless(
                'Jqxnc9zU-JNJqmUnFzOh1yCEUHeIv8I8', 
                'wasd171.eu.auth0.com'
            )
        }

        return this._lock
    }

    logIn(): Promise<{token: string}> {
        return new Promise((resolve, reject) => {
            this.lock.emailcode(
                { autoclose: false, closable: false },
                (error: Error | undefined, profile: any, id_token: string | undefined) => {
                    if (error != null) {
                        reject(error)
                    }  else if (id_token == null) {
                        reject(new Error('Received empty id_token from Auth0'))
                    } else {
                        this.saveToken(id_token)

                        resolve({
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

    closeLock() {
        return new Promise(resolve => this.lock.close(resolve))
    }

    destroyLock() {
        this.lock.destroy();
        this._lock = null;
    }

    saveToken(token: string | null) {
        this.token = token
        if (token !== null) {
            localStorage.setItem(ID_TOKEN, token)
        } else {
            localStorage.removeItem(ID_TOKEN)
        }
    }

    saveUserId(userId: string | null) {
        this.userId = userId;
        if (userId !== null) {
            localStorage.setItem(USER_ID, userId)
        } else {
            localStorage.removeItem(USER_ID)
        }
    }
}

export default new AuthService()