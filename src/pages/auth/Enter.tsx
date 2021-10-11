import React, { useEffect } from "react"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import Loading from "components/loading/Loading"

const Enter: React.FC = observer(() => {
    const { authService } = useStore()

    useEffect(() => {
        authService.signin()
    }, [authService])

    return <Loading height="70vh" size="big" />
})

export default Enter
