import React from "react"
import { PortfolioStore } from "./PortfolioStore"
import AuthService from "./AuthService"

const StoreContext = React.createContext({
    portfolioStore: new PortfolioStore(),
    authService: new AuthService(),
})

const useStore = () => React.useContext(StoreContext)

export default useStore
