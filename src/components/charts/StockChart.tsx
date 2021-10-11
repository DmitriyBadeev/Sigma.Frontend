import React from "react"
import Highcharts from "highcharts/highstock"
import HighchartsReact from "highcharts-react-official"
import { CandleInterval, useStockGraphQuery } from "finance-types"
import { getPastDate } from "helpers/dateHelpers"
import Loading from "components/loading/Loading"
import { stockGraphOptions } from "./ChartOptions"
import { Col } from "antd"
import Card from "components/cards/Card"

type propTypes = {
    ticket: string
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

const StockChart: React.FC<propTypes> = (props) => {
    const { data, loading } = useStockGraphQuery({
        variables: {
            ticket: props.ticket,
            from: getPastDate(720).toLocaleDateString("ru"),
            interval: CandleInterval.Day,
        },
    })

    if (loading) return <Loading size={"small"} height="40px" />

    const lineData = data?.stockCandles?.map((d) => [d?.date, d?.close]) || []
    const volumeData =
        data?.stockCandles?.map((d) => [d?.date, d?.volume]) || []

    const preparedData = {
        name: props.ticket,
        data: lineData,
        volumeData,
    }

    return (
        <Col span={24}>
            <Card title="Изменение стоимости">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={stockGraphOptions(preparedData)}
                    constructorType="stockChart"
                />
            </Card>
        </Col>
    )
}

export default StockChart
