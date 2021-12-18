import { Col, message, Space, Table, Tooltip } from "antd"
import { SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React from "react"
import { getDoubleCurrency } from "helpers/financeHelpers"
import { useFondsQuery } from "finance-types"
import { NumberIndicatior } from "components/numbers/Indicator"
import Sparkline from "components/charts/Sparkline"
import AssetIcon from "components/logo/AssetIcon"
import Link from "components/links/Link"
import { getNumericStringDateWithTime } from "helpers/dateHelpers"

const FondMarketTable: React.FC = () => {
    const { data, loading, error } = useFondsQuery()

    if (error) message.error(error.message)

    const reports = data?.fonds?.map((s, i) => {
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

export default FondMarketTable

const columns = [
    {
        key: "name",
        title: "Название",
        dataIndex: "shortName",
        render: (_items: any, item: any) => {
            return (
                <Link to={`/market/${item.ticket}`}>
                    <Space>
                        <AssetIcon ticket={item.ticket} />
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
        key: "price",
        title: "Текущая цена",
        dataIndex: "price",
        sorter: (a: any, b: any) => a.price - b.price,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Время обновления: ${getNumericStringDateWithTime(item.updateTime)}`}>
                    <span>{getDoubleCurrency(item.price)}</span> <br />
                    <NumberIndicatior
                        number={item.priceChange}
                        type="percent"
                        size="small"
                    />
                </Tooltip>
            )
        },
    },
    {
        key: "Sparkline",
        title: "Изменение за неделю",
        render: (_items: any, item: any) => {
            return <Sparkline ticket={item.ticket} />
        },
    },
]
