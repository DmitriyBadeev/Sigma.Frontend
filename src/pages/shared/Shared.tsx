import React from "react"
import styled from "styled-components"
import Sidebar from "./Sidebar"

const MainLayout = styled.div`
    background: ${(props) => props.theme.mainBackground};
    min-height: 100vh;
`

const ContentPage = styled.div`
    padding: 50px 70px 50px 160px;
`

const Shared: React.FC = (props) => {
    return (
        <MainLayout>
            <Sidebar />
            <ContentPage>{props.children}</ContentPage>
        </MainLayout>
    )
}

export default Shared
