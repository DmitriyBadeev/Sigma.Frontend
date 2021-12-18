import { observable, action } from "mobx"

export type portfolioDataType = {
    id: number
    name: string
    iconUrl: string
}

export class PortfolioStore {
    @observable portfolios: portfolioDataType[] = []
    firstUpdate: boolean = false

    @observable activePortfolioIds = new Array<number>()

    @action togglePortfolio(id: number) {
        const hasId = this.activePortfolioIds.includes(id)

        if (hasId) {
            this.activePortfolioIds = this.activePortfolioIds.filter(pId => pId !== id)
        } else {
            this.activePortfolioIds = [...this.activePortfolioIds, id]
        }
    }

    @action updatePortfolios(portfolios: portfolioDataType[]) {
        if (!this.firstUpdate || portfolios.length !== this.portfolios.length) {
            this.portfolios = portfolios

            if (portfolios.length > 0 && !this.firstUpdate) {
                const firstPortfolioId = portfolios[0].id

                this.togglePortfolio(firstPortfolioId)
            }
        }

        this.firstUpdate = true
    }

    isActive(id: number) {
        return this.activePortfolioIds.includes(id)
    }
}
