import { Col, Space, Table, Tooltip } from "antd"
import { H4, Text, SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React from "react"
import { getDoubleCurrency, roundTwoSign } from "helpers/financeHelpers"
import { getNumericStringDateWithTime } from "helpers/dateHelpers"
import { NumberIndicatior } from "components/numbers/Indicator"
import Sparkline from "components/charts/Sparkline"
import AssetIcon from "components/logo/AssetIcon"
import Link from "components/links/Link"

type propTypes = {
    stocks: any[]
}

const StockTable: React.FC<propTypes> = ({stocks}) => {

    const reports = stocks?.filter(s => s.amount > 0)

    return (
        <Col span={24}>
            <Card title={<H4>Акции</H4>}>
                <Table
                    rowKey={r => r.id}
                    columns={stockColumns}
                    size="small"
                    dataSource={reports}
                    pagination={false}
                />
            </Card>
        </Col>
    )
}

export default StockTable

const stockColumns = [
    {
        key: "name",
        title: "Название",
        dataIndex: "name",
        render: (_items: any, item: any) => {
            return (
                <Link to={`/market/${item.stock.ticket}`}>
                    <Space>
                        <AssetIcon ticket={item.stock.ticket} />
                        <div>
                            {item.stock.shortName} <br />
                            <SmallText $color="grey2">{item.stock.ticket}</SmallText>
                        </div>
                    </Space>
                </Link>
            )
        },
    },
    {
        key: "amount",
        title: "Кол-во",
        dataIndex: "amount",
        sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
        key: "price",
        title: "Текущая цена",
        dataIndex: "price",
        sorter: (a: any, b: any) => a.stock.price - b.stock.price,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Время обновления: ${getNumericStringDateWithTime(item.stock.updateTime)}`}>
                    <span>{getDoubleCurrency(item.stock.price)}</span> <br />
                    <NumberIndicatior
                        number={item.stock.priceChange}
                        type="percent"
                        size="small"
                    />
                </Tooltip>
            )
        },
    },
    {
        key: "cost",
        title: "Стоимость",
        dataIndex: "cost",
        sorter: (a: any, b: any) => a.cost - b.cost,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.cost)}</Text>
        },
    },
    {
        key: "boughtPrice",
        title: "Потрачено",
        dataIndex: "boughtPrice",
        sorter: (a: any, b: any) => a.boughtPrice - b.boughtPrice,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.boughtPrice)}</Text>
        },
    },
    {
        key: "paperProfit",
        title: "Бумажная прибыль",
        dataIndex: "paperProfit",
        sorter: (a: any, b: any) => a.paperProfit - b.paperProfit,
        render: (_items: any, item: any) => {
            return (
                <>
                    <NumberIndicatior
                        number={roundTwoSign(item.paperProfit)}
                        type="currency"
                    />
                    <br />
                    <NumberIndicatior
                        number={roundTwoSign(item.paperProfitPercent * 100)}
                        type="percent"
                        size="small"
                    />
                </>
            )
        },
    },
    // {
    //     key: "paidDividends",
    //     title: "Дивиденды",
    //     dataIndex: "paidDividends",
    //     sorter: (a: any, b: any) => a.paidDividends - b.paidDividends,
    //     render: (_items: any, item: any) => {
    //         if (item.nearestDividend !== null) {
    //             const payment =
    //                 (item.nearestDividend.paymentValue / 100) * item.amount

    //             return (
    //                 <Tooltip
    //                     title={`Ожидаемая выплата: ${payment.toLocaleString(
    //                         "ru-RU",
    //                         {
    //                             style: "currency",
    //                             currency: item.nearestDividend.currencyId,
    //                         }
    //                     )}
    //                         \n
    //                         Дата: ${getNumericStringDate(
    //                             item.nearestDividend.registryCloseDate
    //                         )}
    //                     `}
    //                 >
    //                     {getDoubleCurrency(item.paidDividends)}
    //                 </Tooltip>
    //             )
    //         } else {
    //             return getDoubleCurrency(item.paidDividends)
    //         }
    //     },
    // },
    {
        key: "Sparkline",
        title: "Изменение за месяц",
        render: (_items: any, item: any) => {
            return <Sparkline ticket={item.stock.ticket} />
        },
    },
]
