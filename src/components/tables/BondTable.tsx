import { Col, Space, Table, Tooltip } from "antd"
import { H4, Text, SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React from "react"
import { getDoubleCurrency, getPercent, roundTwoSign } from "helpers/financeHelpers"
import { NumberIndicatior } from "components/numbers/Indicator"
import { getNumericStringDate, getNumericStringDateWithTime } from "helpers/dateHelpers"
import AssetIcon from "components/logo/AssetIcon"
import Link from "components/links/Link"

type propTypes = {
    bonds: any[]
}

const BondTable: React.FC<propTypes> = ({bonds}) => {
    const reports = bonds?.filter(b => b.amount > 0)

    return (
        <Col span={24}>
            <Card title={<H4>Облигации</H4>}>
                <Table
                    rowKey={r => r.id}
                    columns={bondColumns}
                    size="small"
                    dataSource={reports}
                    pagination={false}
                />
            </Card>
        </Col>
    )
}

export default BondTable

const bondColumns = [
    {
        key: "name",
        title: "Название",
        dataIndex: "name",
        render: (_items: any, item: any) => {
            return (
                <Link to={`/market/${item.bond.ticket}`}>
                    <Space>
                        <AssetIcon
                            ticket={
                                item.bond.ticket.startsWith("RU") ||
                                item.bond.ticket.startsWith("SU")
                                    ? "MINFIN"
                                    : ""
                            }
                        />
                        <div>
                            {item.bond.shortName} <br />
                            <SmallText $color="grey2">{item.bond.ticket}</SmallText>
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
        key: "percent",
        title: "Процент",
        dataIndex: "percent",
        sorter: (a: any, b: any) => a.bond.percent - b.bond.percent,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Время обновления: ${getNumericStringDateWithTime(item.bond.updateTime)}`}>
                    <span>{getPercent(item.bond.percent)}</span> <br />
                    <NumberIndicatior
                        number={item.bond.percentChange}
                        type="percent"
                        size="small"
                    />
                </Tooltip>
            )
        },
    },
    {
        key: "price",
        title: "Цена",
        dataIndex: "price",
        sorter: (a: any, b: any) => a.bond.price - b.bond.price,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.bond.price)}</Text>
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
    {
        key: "coupon",
        title: "Купон",
        dataIndex: "coupon",
        sorter: (a: any, b: any) => a.bond.coupon - b.bond.coupon,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.bond.coupon)}</Text>
        },
    },
    {
        key: "amortizationDate",
        title: "Погашение",
        dataIndex: "amortizationDate",
        sorter: (a: any, b: any) => a.bond.amortizationDate - b.bond.amortizationDate,
        render: (_items: any, item: any) => {
            return <Text>{getNumericStringDate(item.bond.amortizationDate)}</Text>
        },
    },
    // {
    //     key: "paidPayments",
    //     title: "Выплачено",
    //     dataIndex: "paidPayments",
    //     sorter: (a: any, b: any) => a.paidPayments - b.paidPayments,
    //     render: (_items: any, item: any) => {
    //         if (item.nearestPayment !== null) {
    //             const payment = item.nearestPayment.allPayment / 100

    //             return (
    //                 <Tooltip
    //                     title={
    //                         <>
    //                             <div>
    //                                 Ожидаемая выплата:{" "}
    //                                 {payment.toLocaleString("ru-RU", {
    //                                     style: "currency",
    //                                     currency:
    //                                         item.nearestPayment.currencyId,
    //                                 })}
    //                             </div>
    //                             <div>
    //                                 Дата:{" "}
    //                                 {getNumericStringDate(
    //                                     item.nearestPayment.registryCloseDate
    //                                 )}
    //                             </div>
    //                         </>
    //                     }
    //                 >
    //                     {getDoubleCurrency(item.paidPayments)}
    //                 </Tooltip>
    //             )
    //         } else {
    //             return getDoubleCurrency(item.paidPayments)
    //         }
    //     },
    // },
]
