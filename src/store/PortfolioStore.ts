import { observable, action } from "mobx"

export type portfolioDataType = {
    id: number
    name: string
    iconUrl: string
}

export class PortfolioStore {
    portfolios: portfolioDataType[] = []
    firstUpdate: boolean = false

    @observable activePortfolioIds = new Set<number>()

    @action togglePortfolio(id: number) {
        const hasId = this.activePortfolioIds.has(id)

        if (hasId) {
            this.activePortfolioIds.delete(id)
        } else {
            this.activePortfolioIds.add(id)
        }
    }

    updatePortfolios(portfolios: portfolioDataType[]) {
        if (!this.firstUpdate) {
            this.portfolios = portfolios

            if (portfolios.length > 0) {
                const firstPortfolioId = portfolios[0].id

                this.togglePortfolio(firstPortfolioId)
            }
        }

        this.firstUpdate = true
    }

    isActive(id: number) {
        return this.activePortfolioIds.has(id)
    }
}
