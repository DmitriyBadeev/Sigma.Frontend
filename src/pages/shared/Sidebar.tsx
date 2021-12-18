import React, { useEffect } from "react"
import styled from "styled-components"
import Logo from "components/logo/Logo"
import NavItem from "components/links/NavItem"
import {
    AreaChartOutlined,
    AuditOutlined,
    BankOutlined,
    PoweroffOutlined,
} from "@ant-design/icons"
import { useLocation } from "react-router-dom"
import useStore from "store/useStore"
import { useSecretLazyQuery } from "finance-types"

const SidebarWrapper = styled.div`
    width: 80px;
    height: 100%;
    border-radius: 0 5px 5px 0;
    position: fixed;
    box-shadow: 0 0 10px rgba(0,0,0,.05);
    background: ${(props) => props.theme.cardBackground};
`

const LogoWrapper = styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    margin: 0 15px;
`

const ItemsWrapper = styled.div`
    margin: 0 8px;
`

const SpaceBetween = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 50px;
    height: calc(100% - 130px);
`

const Sidebar: React.FC = () => {
    const location = useLocation()
    const { authService } = useStore()

    const [query, { data, error }] = useSecretLazyQuery({
        fetchPolicy: "no-cache",
    })

    useEffect(() => {
        const timerId = setInterval(() => {
            query()
        }, 15000)

        return () => clearInterval(timerId)
    }, [query])

    useEffect(() => {
        const graphQlCodeError = error?.graphQLErrors[0]?.extensions?.code

        if (graphQlCodeError === "AUTH_NOT_AUTHORIZED") {
            authService.signin()
        }
    }, [data, query, error, authService])

    return (
        <SidebarWrapper>
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <SpaceBetween>
                <ItemsWrapper>
                    <NavItem
                        link="/"
                        icon={<AreaChartOutlined />}
                        active={location.pathname === "/"}
                    >
                        Портфели
                    </NavItem>
                    <NavItem
                        link="/market"
                        icon={<BankOutlined />}
                        active={location.pathname.startsWith("/market")}
                    >
                        Рынок
                    </NavItem>
                    <NavItem
                        link="/operations"
                        icon={<AuditOutlined />}
                        active={location.pathname === "/operations"}
                    >
                        Операции
                    </NavItem>
                </ItemsWrapper>
                <ItemsWrapper>
                    {/* <NavItem
                        link="/profile"
                        icon={<UserOutlined />}
                        active={location.pathname === "/profile"}
                    >
                        Профиль
                    </NavItem> */}
                    <NavItem
                        link="/"
                        onClick={authService.signout}
                        icon={<PoweroffOutlined />}
                        active={false}
                    >
                        Выйти
                    </NavItem>
                </ItemsWrapper>
            </SpaceBetween>
        </SidebarWrapper>
    )
}

export default Sidebar
