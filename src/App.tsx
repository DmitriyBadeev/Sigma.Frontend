import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { ConfigProvider, Spin } from "antd"
import ru_RU from "antd/es/locale/ru_RU"
import { BrowserRouter } from "react-router-dom"
import Shared from "pages/shared/Shared"
import Routes from "Routes"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import { LoadingOutlined } from "@ant-design/icons"
import { getCurrentTheme } from "Theme"

import "./index.css"
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 32 }} spin />)

const client = new ApolloClient({
    uri: "https://api-sigma-invest.herokuapp.com/graphql?",
    request: (operation) => {
        const token = window.localStorage.getItem("token")
        operation.setContext({
            headers: {
                Authorization: token ? token : "",
            },
        })
    },
})

const theme = getCurrentTheme()

const App: React.FC = observer(() => {
    const { authService } = useStore()

    useEffect(() => {
        authService.loadUser()
    }, [authService])

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <ConfigProvider locale={ru_RU} csp={{ nonce: "sigma" }}>
                    <BrowserRouter>
                        <Shared>
                            <Routes />
                        </Shared>
                    </BrowserRouter>
                </ConfigProvider>
            </ThemeProvider>
        </ApolloProvider>
    )
})

export default App
