import React from "react"
import { H3, H4 } from "GeneralStyles"
import FadePage from "components/fade/FadePage"
import { Col, Row } from "antd"
import PortfolioSelector from "components/portfolios/PortfolioSelector"
import styled from "styled-components"
import DividendProfitCard from "components/cards/DividendProfitCard"
import BalanceCard from "components/cards/BalanceCard"
import PaperProfitCard from "components/cards/PaperProfitCard"
import CostWithInvestSumCard from "components/cards/CostWithInvestSumCard"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import StockTable from "components/tables/StockTable"
import FondTable from "components/tables/FondTable"
import BondTable from "components/tables/BondTable"
import FuturePaymentsTable from "components/tables/FuturePaymentsTable"
import PortfoliosChart from "components/charts/PortfoliosChart"
import CreatePortfolioDrawer from "components/drawers/CreatePortfolioDrawer"

const Content = styled(Row)`
    padding-top: 30px;
`

const Portfolios: React.FC = observer(() => {
    const { portfolioStore } = useStore()
    const portfolios = Array.from(portfolioStore.activePortfolioIds)

    return (
        <FadePage>
            <Row justify="space-between" align="middle">
                <H3>Портфели</H3>
                <CreatePortfolioDrawer />
            </Row>
            <PortfolioSelector />
            <Content gutter={[20, 20]} hidden={portfolios.length === 0}>
                <CostWithInvestSumCard portfolios={portfolios} />
                <PaperProfitCard portfolios={portfolios} />
                <DividendProfitCard portfolios={portfolios} />
                <BalanceCard portfolios={portfolios} />
                <PortfoliosChart portfolios={portfolios} />
                <FuturePaymentsTable portfolios={portfolios} />
                <StockTable portfolios={portfolios} />
                <FondTable portfolios={portfolios} />
                <BondTable portfolios={portfolios} />
            </Content>

            <Content
                gutter={[20, 20]}
                hidden={
                    portfolioStore.portfolios.length === 0 ||
                    portfolioStore.activePortfolioIds.size > 0
                }
            >
                <Col span={24}>
                    <H4 $color="grey2" $align="center">
                        Выберите портфель
                    </H4>
                </Col>
            </Content>
        </FadePage>
    )
})

export default Portfolios
