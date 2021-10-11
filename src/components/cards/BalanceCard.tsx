import { Col, message } from "antd"
import React, { useEffect } from "react"
import Card from "./Card"
import { useAggregateBalanceLazyQuery } from "finance-types"
import Loading from "components/loading/Loading"
import styled from "styled-components"
import { SmallText, Text } from "GeneralStyles"
import { getCurrency } from "helpers/financeHelpers"

type propTypes = {
    portfolios: number[]
}

const CurrencyWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
`

const CardWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`

const BalanceCard: React.FC<propTypes> = (props) => {
    const [query, { data, loading, error }] = useAggregateBalanceLazyQuery()

    useEffect(() => {
        query({
            variables: {
                portfolioIds: props.portfolios,
            },
        })
    }, [query, props.portfolios])

    if (loading)
        return (
            <Col span={9}>
                <Card title="Свободных средств">
                    <Loading height="60px" />
                </Card>
            </Col>
        )
    if (error) message.error(error.message)

    var isSuccess = data?.aggregateBalance?.isSuccess
    var apiMessage = data?.aggregateBalance?.message
    const balance = data?.aggregateBalance?.result || 0

    if (data?.aggregateBalance && !isSuccess) {
        message.error(apiMessage)
    }

    return (
        <Col span={9}>
            <Card title="Свободных средств">
                <CardWrapper>
                    <CurrencyWrapper>
                        <SmallText $color="grey2">Рубли</SmallText>
                        <Text $bold $large>
                            {getCurrency(balance)}
                        </Text>
                    </CurrencyWrapper>
                    <CurrencyWrapper>
                        <SmallText $color="grey2">Доллары</SmallText>
                        <Text $bold $large>
                            {getCurrency(0, "$")}
                        </Text>
                    </CurrencyWrapper>
                    <CurrencyWrapper>
                        <SmallText $color="grey2">Евро</SmallText>
                        <Text $bold $large>
                            {getCurrency(0, "€")}
                        </Text>
                    </CurrencyWrapper>
                </CardWrapper>
            </Card>
        </Col>
    )
}

export default BalanceCard
