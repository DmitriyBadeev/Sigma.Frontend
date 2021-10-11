import { Col, message } from "antd"
import BigFractionalNumber from "components/numbers/BigFractionalNumber"
import { Indicator } from "components/numbers/Indicator"
import React, { useEffect } from "react"
import Card from "./Card"
import { useAggregatePortfolioPaperProfitLazyQuery } from "finance-types"
import Loading from "components/loading/Loading"

type propTypes = {
    portfolios: number[]
}

const PaperProfitCard: React.FC<propTypes> = (props) => {
    const [
        query,
        { data, loading, error },
    ] = useAggregatePortfolioPaperProfitLazyQuery()

    useEffect(() => {
        query({
            variables: {
                portfolioIds: props.portfolios,
            },
        })
    }, [query, props.portfolios])

    if (loading)
        return (
            <Col span={5}>
                <Card title="Бумажная прибыль">
                    <Loading height="60px" />
                </Card>
            </Col>
        )
    if (error) message.error(error.message)

    var isSuccess = data?.aggregatePortfolioPaperProfit?.isSuccess
    var apiMessage = data?.aggregatePortfolioPaperProfit?.message
    const profit = data?.aggregatePortfolioPaperProfit?.result?.value || 0
    const percent = data?.aggregatePortfolioPaperProfit?.result?.percent || 0

    if (data?.aggregatePortfolioPaperProfit && !isSuccess) {
        message.error(apiMessage)
    }

    return (
        <Col span={5}>
            <Card title="Бумажная прибыль">
                <BigFractionalNumber
                    number={profit}
                    color="dependingOnSign"
                    withSign={true}
                />
                <Indicator number={percent} />
            </Card>
        </Col>
    )
}

export default PaperProfitCard
