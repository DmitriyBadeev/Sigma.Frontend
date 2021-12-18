import { Col } from "antd"
import BigFractionalNumber from "components/numbers/BigFractionalNumber"
import { Indicator } from "components/numbers/Indicator"
import React from "react"
import Card from "./Card"
import { toIntTwoSign, roundTwoSign } from "helpers/financeHelpers"

type propTypes = {
    profit: number,
    percent: number
}

const PaperProfitCard: React.FC<propTypes> = ({profit, percent}) => {

    return (
        <Col span={5}>
            <Card title="Бумажная прибыль">
                <BigFractionalNumber
                    number={toIntTwoSign(profit)}
                    color="dependingOnSign"
                    withSign={true}
                />
                <Indicator number={roundTwoSign(percent * 100)} />
            </Card>
        </Col>
    )
}

export default PaperProfitCard
