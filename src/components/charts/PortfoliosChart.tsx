import React from "react"
import { Col, message } from "antd"
import Card from "components/cards/Card"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { usePortfoliosCostGraphQuery } from "finance-types"
import Loading from "components/loading/Loading"
import { areaOptions } from "./ChartOptions"

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

const PortfoliosChart: React.FC<propTypes> = ({ portfolioIds }) => {
    const { data, loading, error } = usePortfoliosCostGraphQuery({ variables: { portfolioIds } })

    if (loading) {
        return (
            <Col span={15}>
                <Card title="Изменение стоимости портфеля">
                    <Loading height="430px" />
                </Card>
            </Col>
        )
    }

    if (error) message.error(error.message)

    const preparedData =
        data?.portfoliosCostGraph?.result?.map((portfolioDatas) => {
            return {
                name: portfolioDatas?.portfolioName,
                data: portfolioDatas?.data?.map((d) => {
                    const value = d?.value || 0
                    return [d?.date || 0, value] || []
                }),
            }
        }) || []

    return (
        <Col span={15}>
            <Card title="Изменение стоимости портфеля">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={areaOptions(preparedData)}
                    constructorType="stockChart"
                />
            </Card>
        </Col>
    )
}

export default PortfoliosChart
