import { Col } from "antd"
import BigFractionalNumber from "components/numbers/BigFractionalNumber"
import { Indicator } from "components/numbers/Indicator"
import React from "react"
import Card from "./Card"
import {toIntTwoSign, roundTwoSign} from 'helpers/financeHelpers'

type propTypes = {
    dividendProfit: number,
    percent: number
}

const DividendProfitCard: React.FC<propTypes> = ({ dividendProfit, percent }) => {

    return (
        <Col span={5}>
            <Card title="Дивидендная прибыль">
                <BigFractionalNumber
                    number={toIntTwoSign(dividendProfit)}
                    color="dependingOnSign"
                    withSign={true}
                />
                <Indicator number={roundTwoSign(percent * 100)} />
            </Card>
        </Col>
    )
}

export default DividendProfitCard
