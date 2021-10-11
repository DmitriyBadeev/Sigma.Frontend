import React, { useEffect } from "react"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import { Redirect } from "react-router-dom"
import Loading from "components/loading/Loading"

const AuthComplete: React.FC = observer(() => {
    const { authService } = useStore()

    useEffect(() => {
        authService.signinComplete()
    }, [authService])

    if (!authService.isAuthenticating) return <Redirect to="/" />

    return <Loading height="70vh" size="big" />
})

export default AuthComplete
