import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { CandleInterval, useSparklineQuery } from "finance-types"
import { getNumericStringDate, getPastDate } from "helpers/dateHelpers"
import Loading from "components/loading/Loading"
import { sparklineOptions } from "./ChartOptions"

type propTypes = {
    ticket: string
}

const Sparkline: React.FC<propTypes> = (props) => {
    const { data, loading } = useSparklineQuery({
        variables: {
            ticket: props.ticket,
            from: getPastDate(31).toLocaleDateString("en"),
            interval: CandleInterval.Day,
        },
    })

    if (loading) return <Loading size={"small"} height="40px" />
    
    const preparedData = data?.stockCandles?.map((d) => [getNumericStringDate(d?.begin), d?.close]) || []

    return <HighchartsReact highcharts={Highcharts} options={sparklineOptions(preparedData)} constructorType="chart" />
}

export default Sparkline
