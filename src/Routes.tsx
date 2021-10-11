import React, { useEffect } from "react"
import {
    useLocation,
    Switch,
    Route,
    RouteProps,
    Redirect,
} from "react-router-dom"

import Portfolios from "pages/Portfolios"
import Market from "pages/Market"
import Asset from "pages/Asset"
import Operations from "pages/Operations"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import Loading from "components/loading/Loading"
import Enter from "pages/auth/Enter"
import AuthComplete from "pages/auth/AuthComplete"
import Signout from "pages/auth/Signout"

const Routes: React.FC = () => {
    return (
        <ScrollToTop>
            <Switch>
                <PrivateRoute exact path="/">
                    <Portfolios />
                </PrivateRoute>
                <PrivateRoute exact path="/market">
                    <Market />
                </PrivateRoute>
                <PrivateRoute exact path="/market/:ticket">
                    <Asset />
                </PrivateRoute>
                <PrivateRoute exact path="/operations">
                    <Operations />
                </PrivateRoute>
                <Route exact path="/enter">
                    <Enter />
                </Route>
                <Route exact path="/auth-complete">
                    <AuthComplete />
                </Route>
                <Route exact path="/signout">
                    <Signout />
                </Route>
            </Switch>
        </ScrollToTop>
    )
}

export default Routes

const ScrollToTop: React.FC = (props) => {
    let location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return <>{props.children}</>
}

const PrivateRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
    const { authService } = useStore()

    if (authService.isLoadingUser) {
        return <Loading height="70vh" size="big" />
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authService.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/enter",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
})
