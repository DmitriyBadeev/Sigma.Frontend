import { Col } from "antd"
import BigFractionalNumber from "components/numbers/BigFractionalNumber"
import React from "react"
import Card from "./Card"
import { SmallText } from "GeneralStyles"
import { getDoubleCurrency, toIntTwoSign } from "helpers/financeHelpers"

type propTypes = {
    cost: number,
    investSum: number
}

const CostWithInvestSumCard: React.FC<propTypes> = ({cost, investSum}) => {

    return (
        <Col span={5}>
            <Card title="Суммарная стоимость">
                <BigFractionalNumber number={toIntTwoSign(cost)} />
                <SmallText $color="grey2">
                    Инвестировано: {getDoubleCurrency(investSum)}
                </SmallText>
            </Card>
        </Col>
    )
}

export default CostWithInvestSumCard
