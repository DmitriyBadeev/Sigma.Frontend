import React from "react"
import { Col, message } from "antd"
import Card from "./Card"
import { useHerfindahlHirschmanIndexQuery, useSharpeRatioQuery } from "finance-types"
import Loading from "components/loading/Loading"
import BigNumber from "components/numbers/BigNumber"
import { SmallText } from "GeneralStyles"

type propTypes = {
    portfolioIds: number[]
}

type InterpretationType = "EXCELLENT" | "GOOD" | "NORMAL" | "BAD" | "TERRIBLE"

const getColor  = (interpretation: InterpretationType = "BAD") => {
    switch(interpretation) {
        case "EXCELLENT":
            return '#75D728'
        case "GOOD":
            return '#a4e06b'
        case "NORMAL":
            return '#D6E431'
        case "BAD":
            return '#F09480'
        case "TERRIBLE":
            return '#FF4B4B'
    }
}

const IndexCards: React.FC<propTypes> = ({ portfolioIds }) => {
    const HerfindahlHirschmanIndexPayload = useHerfindahlHirschmanIndexQuery({ variables: { portfolioIds }})
    const sharpeRatioPayload = useSharpeRatioQuery({ variables: { portfolioIds }})

    if (HerfindahlHirschmanIndexPayload.error) message.error(HerfindahlHirschmanIndexPayload.error.message)
    if (sharpeRatioPayload.error) message.error(sharpeRatioPayload.error.message)

    const herfindahlHirschmanIndexResult = HerfindahlHirschmanIndexPayload.data?.herfindahlHirschmanIndex?.result

    const herfindahlHirschmanIndex = herfindahlHirschmanIndexResult?.value
    const herfindahlHirschmanIndexInterpretation = herfindahlHirschmanIndexResult?.interpretation

    const sharpeRatioResult = sharpeRatioPayload.data?.sharpeRatio?.result

    const risk = sharpeRatioResult?.risk
    const profit = sharpeRatioResult?.profit

    const sharpeRatio = sharpeRatioResult?.value
    const sharpeRatioInterpretation = sharpeRatioResult?.interpretation

    return (
        <>
            <Col span={6}>
                <Card title="Коэффициент диверсификации">
                    {
                        HerfindahlHirschmanIndexPayload.loading ? 
                            <Loading height="100px" /> :
                            <>
                                <BigNumber number={herfindahlHirschmanIndex} color={getColor(herfindahlHirschmanIndexInterpretation)} />
                                <SmallText $color="grey2">Хорошая диверсификация</SmallText>
                            </>
                    }
                </Card>
            </Col>

            <Col span={6}>
                <Card title="Коэффициент риска портфеля">
                    {
                        sharpeRatioPayload.loading ? 
                            <Loading height="100px" /> :
                            <>
                                <BigNumber number={risk} color={getColor(profit > 5 ? "BAD" : "GOOD")} />
                                <SmallText $color="grey2">У портфеля высокий риск.</SmallText>
                            </>
                    }
                </Card>
            </Col>

            <Col span={6}>
                <Card title="Коэффициент доходности портфеля">
                    {
                        sharpeRatioPayload.loading ? 
                            <Loading height="100px" /> :
                            <>
                                <BigNumber number={profit} color={getColor(profit > 5 ? "GOOD" : "BAD")} />
                                <SmallText $color="grey2">У портфеля высокая доходность</SmallText>
                            </>
                    }
                </Card>
            </Col>

            <Col span={6}>
                <Card title="Соотношение риска к доходности">
                    {
                        sharpeRatioPayload.loading ? 
                            <Loading height="100px" /> :
                            <>
                                <BigNumber number={sharpeRatio} color={getColor(sharpeRatioInterpretation)} />
                                <SmallText $color="grey2">Риска портфеля выше его доходности.</SmallText>
                            </>
                    }
                </Card>
            </Col>
        </>
        
    )
}

export default IndexCards
