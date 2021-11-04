import { Col, message, Space, Table, Tooltip } from "antd"
import { SmallText, Text } from "GeneralStyles"
import Card from "components/cards/Card"
import React from "react"
import { getDoubleCurrency, getPercent } from "helpers/financeHelpers"
import { useBondsQuery } from "finance-types"
import { NumberIndicatior } from "components/numbers/Indicator"
import AssetIcon from "components/logo/AssetIcon"
import Link from "components/links/Link"
import { getNumericStringDate, getNumericStringDateWithTime } from "helpers/dateHelpers"

const BondMarketTable: React.FC = () => {
    const { data, loading, error } = useBondsQuery()

    if (error) message.error(error.message)

    const reports = data?.bonds?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    return (
        <Col span={24}>
            <Card title={null}>
                <Table
                    columns={columns}
                    size="small"
                    loading={loading}
                    dataSource={reports}
                    pagination={{
                        defaultPageSize: 50,
                    }}
                />
            </Card>
        </Col>
    )
}

export default BondMarketTable

const columns = [
    {
        key: "name",
        title: "Название",
        dataIndex: "shortName",
        render: (_items: any, item: any) => {
            return (
                <Link to={`/market/${item.ticket}`}>
                    <Space>
                        <AssetIcon
                            ticket={
                                item.ticket.startsWith("RU") ||
                                item.ticket.startsWith("SU")
                                    ? "MINFIN"
                                    : ""
                            }
                        />
                        <div>
                            {item.shortName} <br />
                            <SmallText $color="grey2">{item.ticket}</SmallText>
                        </div>
                    </Space>
                </Link>
            )
        },
    },
    {
        key: "percent",
        title: "Текущий процент",
        dataIndex: "percent",
        sorter: (a: any, b: any) => a.percent - b.percent,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Время обновления: ${getNumericStringDateWithTime(item.updateTime)}`}>
                    <span>{getPercent(item.percent)}</span> <br />
                    <NumberIndicatior
                        number={item.percentChange}
                        type="percent"
                        size="small"
                    />
                </Tooltip>
            )
        },
    },
    {
        key: "price",
        title: "Стоимость",
        sorter: (a: any, b: any) => a.price - b.price,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.price)}</Text>
        },
    },
    {
        key: "coupon",
        title: "Купон",
        sorter: (a: any, b: any) => a.coupon - b.coupon,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.coupon)}</Text>
        },
    },
    {
        key: "nominal",
        title: "Номинал",
        sorter: (a: any, b: any) => a.nominal - b.nominal,
        render: (_items: any, item: any) => {
            return <Text>{getDoubleCurrency(item.nominal)}</Text>
        },
    },
    {
        key: "amortizationDate",
        title: "Дата выплаты",
        sorter: (a: any, b: any) => Date.parse(a.amortizationDate) - Date.parse(b.amortizationDate),
        render: (_items: any, item: any) => {
            return <Text>{getNumericStringDate(item.amortizationDate)}</Text>
        },
    },
]
