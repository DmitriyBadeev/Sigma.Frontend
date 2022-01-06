import React, { useEffect } from "react"
import { H3, H4 } from "GeneralStyles"
import FadePage from "components/fade/FadePage"
import { Col, message, Row } from "antd"
import PortfolioSelector from "components/portfolios/PortfolioSelector"
import styled from "styled-components"
import DividendProfitCard from "components/cards/DividendProfitCard"
import IndexCards from "components/cards/IndexCards"
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
import { useAggregatePortfoliosLazyQuery } from "finance-types"
import Loading from "components/loading/Loading"
import ShareAssetsPie from "components/charts/ShareAssetsPie"
import ShareRiskAssetsPie from "components/charts/ShareRiskAssetsPie"

const Content = styled(Row)`
    padding-top: 30px;
`

const Portfolios: React.FC = observer(() => {
    const { portfolioStore } = useStore()
    const selectedPortfolioIds = portfolioStore.activePortfolioIds

    const [query, { data, loading, error }] = useAggregatePortfoliosLazyQuery()

    useEffect(() => {
        query({ variables: { portfolioIds: selectedPortfolioIds } })
    }, [selectedPortfolioIds, query])

    const portfolio = data?.aggregatePortfolios?.result
    
    if (error) message.error(error.message)
    
    return (
        <FadePage>
            <Row justify="space-between" align="middle">
                <H3>Портфели</H3>
                <CreatePortfolioDrawer />
            </Row>
            <PortfolioSelector />
            {
                loading ? 
                <Loading size="big" height="50vh" /> :
                <Content gutter={[20, 20]} hidden={selectedPortfolioIds.length === 0}>
                    <CostWithInvestSumCard cost={portfolio?.cost} investSum={portfolio?.investedSum} />
                    <PaperProfitCard profit={portfolio?.paperProfit} percent={portfolio?.paperProfitPercent} />
                    <DividendProfitCard dividendProfit={portfolio?.dividendProfit} percent={portfolio?.dividendProfitPercent} />
                    <BalanceCard rubBalance={portfolio?.rubBalance} dollarBalance={portfolio?.dollarBalance} euroBalance={portfolio?.euroBalance}/>
                    <PortfoliosChart portfolioIds={selectedPortfolioIds} />
                    <FuturePaymentsTable portfolioIds={selectedPortfolioIds} />
                    <ShareAssetsPie portfolioIds={selectedPortfolioIds}/>
                    <ShareRiskAssetsPie portfolioIds={selectedPortfolioIds}/>
                    <IndexCards portfolioIds={selectedPortfolioIds}/>    
                    <StockTable stocks={portfolio?.portfolioStocks || []} />
                    <FondTable fonds={portfolio?.portfolioFonds || []} />
                    <BondTable bonds={portfolio?.portfolioBonds || []} />
                </Content>
            }

            <Content
                gutter={[20, 20]}
                hidden={
                    portfolioStore.portfolios.length === 0 ||
                    portfolioStore.activePortfolioIds.length > 0
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
