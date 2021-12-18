import { Col, Space, Table, Tooltip } from "antd"
import { H4, Text, SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React from "react"
import { getDoubleCurrency, roundTwoSign } from "helpers/financeHelpers"
import { NumberIndicatior } from "components/numbers/Indicator"
import Sparkline from "components/charts/Sparkline"
import AssetIcon from "components/logo/AssetIcon"
import Link from "components/links/Link"
import { getNumericStringDateWithTime } from "helpers/dateHelpers"

type propTypes = {
    fonds: any[]
}

const FondTable: React.FC<propTypes> = ({fonds}) => {
    const reports = fonds?.filter(f => f.amount > 0)

    return (
        <Col span={24}>
            <Card title={<H4>Фонды</H4>}>
                <Table
                    rowKey={r => r.id}
                    columns={fondColumns}
                    size="small"
                    dataSource={reports}
                    pagination={false}
                />
            </Card>
        </Col>
    )
}

export default FondTable

const fondColumns = [
    {
        key: "name",
        title: "Название",
        dataIndex: "name",
        render: (_items: any, item: any) => {
            return (
                <Link to={`/market/${item.fond.ticket}`}>
                    <Space>
                        <AssetIcon ticket={item.fond.ticket} />
                        <div>
                            {item.fond.shortName} <br />
                            <SmallText $color="grey2">{item.fond.ticket}</SmallText>
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
        sorter: (a: any, b: any) => a.fond.price - b.fond.price,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Время обновления: ${getNumericStringDateWithTime(item.fond.updateTime)}`}>
                    <span>{getDoubleCurrency(item.fond.price)}</span> <br />
                    <NumberIndicatior
                        number={item.fond.priceChange}
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
    {
        key: "Sparkline",
        title: "Изменение за неделю",
        render: (_items: any, item: any) => {
            return <Sparkline ticket={item.fond.ticket} />
        },
    },
]
