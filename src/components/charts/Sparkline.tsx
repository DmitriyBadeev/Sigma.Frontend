import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { CandleInterval, useSparklineQuery } from "finance-types"
import { getPastDate } from "helpers/dateHelpers"
import Loading from "components/loading/Loading"
import { sparklineOptions } from "./ChartOptions"

type propTypes = {
    ticket: string
}

const Sparkline: React.FC<propTypes> = (props) => {
    const { data, loading } = useSparklineQuery({
        variables: {
            ticket: props.ticket,
            from: getPastDate(31).toLocaleDateString("ru"),
            interval: CandleInterval.Day,
        },
    })

    if (loading) return <Loading size={"small"} height="40px" />

    const preparedData = data?.stockCandles?.map((d) => [d?.date, d?.close]) || []

    return <HighchartsReact highcharts={Highcharts} options={sparklineOptions(preparedData)} constructorType="chart" />
}

export default Sparkline
