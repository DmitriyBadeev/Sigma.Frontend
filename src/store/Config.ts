import { UserManagerSettings, WebStorageStateStore } from "oidc-client"

export const prodConfig: UserManagerSettings = {
    authority: "https://sigma-frontend.herokuapp.com",
    client_id: "Sigma.Spa",
    redirect_uri: "https://sigma-frontend.herokuapp.com/auth-complete",
    response_type: "code",
    loadUserInfo: true,
    scope: "openid profile Sigma.Api.All",
    post_logout_redirect_uri: "https://sigma-frontend.herokuapp.com/signout",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    silent_redirect_uri: "https://sigma-frontend.herokuapp.com/silent.html",
}

// export const devConfig: UserManagerSettings = {
//     authority: "https://auth.badeev.info",
//     client_id: "finance_investin",
//     redirect_uri: "http://localhost:3000/auth-complete",
//     response_type: "code",
//     loadUserInfo: true,
//     scope: "openid profile InvestIn.Finance.API",
//     post_logout_redirect_uri: "http://localhost:3000/signout",
//     userStore: new WebStorageStateStore({ store: window.localStorage }),
//     automaticSilentRenew: true,
//     silent_redirect_uri: "http://localhost:3000/silent.html",
// }

export const devConfig: UserManagerSettings = {
    authority: "https://identity-sigma.herokuapp.com",
    client_id: "Sigma.Spa",
    redirect_uri: "http://localhost:3000/auth-complete",
    response_type: "code",
    loadUserInfo: true,
    scope: "openid profile Sigma.Api.All",
    post_logout_redirect_uri: "http://localhost:3000/signout",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    silent_redirect_uri: "http://localhost:3000/silent.html",
}
