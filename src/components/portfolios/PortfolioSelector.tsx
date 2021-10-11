import React from "react"
import PortfolioCard from "components/portfolios/PortfolioCard"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Col, Row } from "antd"
import useStore from "store/useStore"
import { usePortfoliosQuery } from "finance-types"
import Loading from "components/loading/Loading"
import { message } from "antd"
import { computed } from "mobx"
import { H4 } from "GeneralStyles"

const SelectorWrapper = styled.div`
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`

const PortfolioSelector: React.FC = observer(() => {
    const { data, loading, error } = usePortfoliosQuery()
    const { portfolioStore } = useStore()

    if (loading) return <Loading height="50px" />
    if (error) message.error(error.message)

    const portfolios =
        data?.portfolios?.map((p) => ({
            id: p?.id || 0,
            name: p?.name || "",
            iconUrl: p?.portfolioType?.iconUrl || "",
        })) || []

    portfolioStore.updatePortfolios(portfolios)

    const onSelect = (id: number) => {
        portfolioStore.togglePortfolio(id)
    }

    return (
        <SelectorWrapper>
            <Row>
                {portfolioStore.portfolios.map((portfolio) => (
                    <Col span={6} key={portfolio.id}>
                        <PortfolioCard
                            active={computed(() =>
                                portfolioStore.isActive(portfolio.id)
                            ).get()}
                            img={portfolio.iconUrl}
                            id={portfolio.id}
                            onSelect={onSelect}
                        >
                            {portfolio.name}
                        </PortfolioCard>
                    </Col>
                ))}
                {portfolioStore.portfolios.length === 0 && (
                    <Col span={24}>
                        <H4 $color="grey2" $align="center">
                            Добавьте свой первый портфель
                        </H4>
                    </Col>
                )}
            </Row>
        </SelectorWrapper>
    )
})

export default PortfolioSelector
