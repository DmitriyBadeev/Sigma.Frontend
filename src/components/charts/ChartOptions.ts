import { SeriesOptionsType } from "highcharts"

type TAreaData = {
    name: string | null | undefined
    data: any[][] | undefined
}

const generalOptions = {
    chart: {
        style: {
            fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            fontSize: "12px",
        },
    },

    tooltip: {
        xDateFormat: "%d.%m.%Y",
        pointFormat: "<b>{point.y} ₽</b>",
    },

    credits: {
        enabled: false,
    },

    time: {
        timezoneOffset: -180,
    },
}

const generalSeria = {
    fillColor: "rgba(143, 97, 219, .1)",
    color: "#8F61DB",
}

export const areaOptions = (data: TAreaData[]) => ({
    ...generalOptions,
    chart: {
        type: "area",
        marginTop: 20,
        height: 430,
        ...generalOptions.chart,
    },

    rangeSelector: {
        selected: 1,
        inputEnabled: false,

        buttons: [
            {
                type: "month",
                count: 1,
                text: "1м",
            },
            {
                type: "month",
                count: 3,
                text: "3м",
            },
            {
                type: "month",
                count: 6,
                text: "6м",
            },
            {
                type: "ytd",
                text: "YTD",
            },
            {
                type: "year",
                count: 1,
                text: "1г",
            },
            {
                type: "all",
                text: "Всё",
            },
        ],
    },

    scrollbar: {
        enabled: false,
    },

    tooltip: {
        ...generalOptions.tooltip,
        pointFormat: "{series.name}: <b>{point.y} ₽</b>",
    },

    xAxis: {
        type: "datetime",
        labels: {
            align: "left",
        },
        gridLineWidth: 1,
    },

    series: data.map((d) => {
        return {
            name: d.name,
            data: d.data,
            threshold: null,
            tooltip: {
                valueDecimals: 2,
            },
            ...generalSeria,
        }
    }),
})

type TStockData = TAreaData & { volumeData: any[][] | undefined }

export const stockGraphOptions = (data: TStockData) => ({
    ...generalOptions,
    chart: {
        marginTop: 20,
        height: 600,
        ...generalOptions.chart,
    },

    rangeSelector: {
        selected: 1,
        inputEnabled: false,

        buttons: [
            {
                type: "month",
                count: 1,
                text: "1м",
            },
            {
                type: "month",
                count: 3,
                text: "3м",
            },
            {
                type: "month",
                count: 6,
                text: "6м",
            },
            {
                type: "ytd",
                text: "YTD",
            },
            {
                type: "year",
                count: 1,
                text: "1г",
            },
            {
                type: "all",
                text: "Всё",
            },
        ],
    },

    scrollbar: {
        enabled: false,
    },

    tooltip: {
        ...generalOptions.tooltip,
        pointFormat: "{series.name}: <b>{point.y} ₽</b>",
    },

    xAxis: {
        type: "datetime",
        labels: {
            align: "left",
        },
        gridLineWidth: 1,
    },

    yAxis: [
        {
            labels: {
                align: "left",
            },
            height: "80%",
            resize: {
                enabled: true,
            },
        },
        {
            labels: {
                align: "left",
            },
            top: "80%",
            height: "20%",
            offset: 0,
        },
    ],

    series: [
        {
            type: "area",
            name: data.name,
            data: data.data,
            threshold: null,
            tooltip: {
                valueDecimals: 2,
            },
            ...generalSeria,
            label: {
                onArea: true,
            },
        },
        {
            type: "column",
            name: "Объем",
            data: data.volumeData,
            yAxis: 1,
            color: "rgba(143, 97, 219, .4)",
            tooltip: {
                pointFormat: "{series.name}: <b>{point.y}</b>",
            },
            label: {
                onArea: true,
            },
        },
    ],
})

export const sparklineOptions = (data: any[][]) => {
    const values = data.map((d) => Number.parseFloat(d[1]))
    let min = Math.min(...values)
    let max = Math.max(...values)

    const padding = min * 0.01
    min = min - padding
    max = max + padding
    return {
        ...generalOptions,
        chart: {
            type: "areaspline",
            height: 35,
            width: 150,
            margin: [2, 0, 2, 0],
            backgroundColor: null,
            borderWidth: 0,
            style: {
                overflow: "visible",
                ...generalOptions.chart.style,
            },
            skipClone: true,
        },

        title: {
            text: "",
        },

        xAxis: {
            labels: {
                enabled: false,
            },
            title: {
                text: null,
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: [],
            type: "datetime",
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false,
            },
            title: {
                text: null,
            },
            tickPositions: [0],
            min,
            max,
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            hideDelay: 0,
            outside: true,
            shared: true,
            ...generalOptions.tooltip,
        },
        plotOptions: {
            series: {
                animation: false,
                lineWidth: 1,
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1,
                    },
                },
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            radius: 2,
                        },
                    },
                },
            },
            column: {},
        },
        series: [
            {
                data,
                name: "",
                ...generalSeria,
            },
        ],
    }
}

export const pieOptions = (seria: SeriesOptionsType) => {

    const options: Highcharts.Options = {
        ...generalOptions,
        chart: {
            plotShadow: false,
            type: 'pie',
            ...generalOptions.chart
        },
        title: undefined,
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: { fontWeight: '400', color: 'grey' },
                    format: '{point.name}: {point.y:.1f}%'
                },
                showInLegend: false
            }
        },
        tooltip: {
            xDateFormat: "%d.%m.%Y",
            pointFormat: "<b>{point.y:.2f} %</b>",
        },
        colors: ['#A176ED', '#6CC2F2', '#E86CF2', '#F6E862', '#B596ED', '#8CEBCE', '#FFBC97', '#FFF397', '#A176ED'],
        series: [seria]
    }

    return options;
}