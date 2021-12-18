import { Col } from "antd"
import React from "react"
import Card from "./Card"
import styled from "styled-components"
import { SmallText, Text } from "GeneralStyles"
import { getDoubleCurrency } from "helpers/financeHelpers"

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

type propTypes = {
    rubBalance: number,
    dollarBalance: number,
    euroBalance: number
}

const BalanceCard: React.FC<propTypes> = ({rubBalance, dollarBalance, euroBalance}) => {

    return (
        <Col span={9}>
            <Card title="Свободных средств">
                <CardWrapper>
                    <CurrencyWrapper>
                        <SmallText $color="grey2">Рубли</SmallText>
                        <Text $bold $large>
                            {getDoubleCurrency(rubBalance)}
                        </Text>
                    </CurrencyWrapper>
                    <CurrencyWrapper>
                        <SmallText $color="grey2">Доллары</SmallText>
                        <Text $bold $large>
                            {getDoubleCurrency(dollarBalance, "USD")}
                        </Text>
                    </CurrencyWrapper>
                    <CurrencyWrapper>
                        <SmallText $color="grey2">Евро</SmallText>
                        <Text $bold $large>
                            {getDoubleCurrency(euroBalance, "EUR")}
                        </Text>
                    </CurrencyWrapper>
                </CardWrapper>
            </Card>
        </Col>
    )
}

export default BalanceCard
