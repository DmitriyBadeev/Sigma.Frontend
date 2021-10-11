import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import Loading from "components/loading/Loading"
import { Redirect } from "react-router-dom"

const Signout: React.FC = observer(() => {
    const { authService } = useStore()
    const [isRedirect, setIsRedirect] = useState(false)

    useEffect(() => {
        authService.clearToken()
        authService.signoutRedirectCallback().then(() => setIsRedirect(true))
    }, [authService])

    if (isRedirect) {
        return <Redirect to="/" />
    }

    return <Loading height="70vh" size="big" />
})

export default Signout
