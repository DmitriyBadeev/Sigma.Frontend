import { UserManager, User } from "oidc-client"
import { action, observable, computed } from "mobx"
import { devConfig, prodConfig } from "store/Config"

const getConfig = () => {
    const hostname = window.location.hostname

    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return devConfig
    }

    return prodConfig
}

const userManager = new UserManager(getConfig())

userManager.events.addAccessTokenExpired(function () {
    console.log("token has expired")
})

userManager.events.addSilentRenewError(function () {
    console.log("error in silent renew")
})

userManager.events.addAccessTokenExpiring(function () {
    console.log("renew")
    userManager.getUser().then((user) => {
        user && window.localStorage.setItem("token", `Bearer ${user.access_token}`)
    })
})

export default class AuthService {
    @observable user: User | null = null
    @observable isAuthenticating = true
    @observable isLoadingUser = true

    @computed get isAuthenticated() {
        return this.user != null && this.user.access_token && !this.user.expired
    }

    @action signin() {
        userManager.signinRedirect()
    }

    @action signinComplete() {
        this.isAuthenticating = true

        userManager
            .signinRedirectCallback()
            .then((user) => {
                this.setUser(user)
                this.isAuthenticating = false
            })
            .catch((e) => {
                this.handleError(e)
            })
    }

    @action loadUser() {
        this.isLoadingUser = true

        userManager
            .getUser()
            .then((user) => {
                if (user !== null) {
                    this.setUser(user)
                }
                this.isLoadingUser = false
            })
            .catch((e) => {
                this.handleError(e)
            })
    }

    @action signout() {
        userManager.signoutRedirect()
    }

    @action signoutRedirectCallback() {
        return userManager.signoutRedirectCallback()
    }

    @action clearToken() {
        window.localStorage.removeItem("token")
    }

    setUser(user: User) {
        this.user = user
        window.localStorage.setItem("token", `Bearer ${user.access_token}`)
    }

    handleError(error: any) {
        this.user = null
        window.localStorage.removeItem("token")
        console.error("Problem with authentication: ", error)
    }
}
