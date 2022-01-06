import React from "react"
import { Col, message } from "antd"
import Card from "components/cards/Card"
import Highcharts, { SeriesOptionsType } from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { usePortfolioAssetSharesQuery } from "finance-types"
import Loading from "components/loading/Loading"
import { pieOptions } from "./ChartOptions"

type propTypes = {
    portfolioIds: number[]
}

Highcharts.setOptions({
    lang: {
        months: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        shortMonths: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
        ],
        weekdays: [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Субота",
        ],
        rangeSelectorZoom: "Период",
        loading: "Загрузка...",
        decimalPoint: ",",
    },
})

const ShareAssetsPie: React.FC<propTypes> = ({ portfolioIds }) => {
    const { data, loading, error } = usePortfolioAssetSharesQuery({ variables: { portfolioIds } })

    if (loading) {
        return (
            <Col span={12}>
                <Card title="Распределение доли активов в портфеле">
                    <Loading height="430px" />
                </Card>
            </Col>
        )
    }

    if (error) message.error(error.message)

    const preparedData =
        (data?.portfolioAssetShares?.result?.map((portfolioDatas) => ({
            name: portfolioDatas?.name as string,
            ticket: portfolioDatas?.ticket as string,
            y: portfolioDatas?.percent as number
        })) || []).filter(d => d.y > 0)

    const seria: SeriesOptionsType = { name: "Распределение доли активов в портфеле", colorByPoint: true, type: 'pie', data: preparedData }
    
    return (
        <Col span={12}>
            <Card title="Распределение доли активов в портфеле">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={pieOptions(seria)}
                    constructorType="chart"
                />
            </Card>
        </Col>
    )
}

export default ShareAssetsPie
