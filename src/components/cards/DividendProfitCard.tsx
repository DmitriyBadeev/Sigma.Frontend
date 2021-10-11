import { Col, message } from "antd"
import BigFractionalNumber from "components/numbers/BigFractionalNumber"
import { Indicator } from "components/numbers/Indicator"
import React, { useEffect } from "react"
import Card from "./Card"
import { useAggregatePortfolioPaymentProfitLazyQuery } from "finance-types"
import Loading from "components/loading/Loading"

type propTypes = {
    portfolios: number[]
}

const DividendProfitCard: React.FC<propTypes> = (props) => {
    const [
        query,
        { data, loading, error },
    ] = useAggregatePortfolioPaymentProfitLazyQuery()

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
                <Card title="Дивидендная прибыль">
                    <Loading height="60px" />
                </Card>
            </Col>
        )
    if (error) message.error(error.message)

    var isSuccess = data?.aggregatePortfolioPaymentProfit?.isSuccess
    var apiMessage = data?.aggregatePortfolioPaymentProfit?.message
    const profit = data?.aggregatePortfolioPaymentProfit?.result?.value || 0
    const percent = data?.aggregatePortfolioPaymentProfit?.result?.percent || 0

    if (data?.aggregatePortfolioPaymentProfit && !isSuccess) {
        message.error(apiMessage)
    }

    return (
        <Col span={5}>
            <Card title="Дивидендная прибыль">
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

export default DividendProfitCard
