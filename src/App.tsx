import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { ConfigProvider, Spin } from "antd"
import ru_RU from "antd/es/locale/ru_RU"
import { BrowserRouter } from "react-router-dom"
import Shared from "pages/shared/Shared"
import Routes from "Routes"
import { from, ApolloClient, InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import { LoadingOutlined } from "@ant-design/icons"
import { getCurrentTheme } from "Theme"
import { setContext } from "apollo-link-context"
import { createUploadLink } from "apollo-upload-client"

import "./index.css"
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 32 }} spin />)

const API_URL = 'https://api-sigma-invest.herokuapp.com'
//const API_URL = 'https://localhost:5001'

const links = from([
    //@ts-ignore
    new createUploadLink({ uri: `${API_URL}/graphql?` }),
])

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(links),
    cache: new InMemoryCache(),
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
