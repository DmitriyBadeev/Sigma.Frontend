import { Col, message, Table, Tooltip } from "antd"
import { Text, SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React from "react"
import { getDoubleCurrency } from "helpers/financeHelpers"
import { getNumericStringDate } from "helpers/dateHelpers"
import { useFuturePaymentsQuery } from "finance-types"

type propTypes = {
    portfolioIds: number[]
}

const FuturePaymentsTable: React.FC<propTypes> = ({portfolioIds}) => {
    const { data, loading, error } = useFuturePaymentsQuery({ variables: { portfolioIds } })

    if (error) message.error(error.message)

    const payments = data?.futurePayments?.result || []

    return (
        <Col span={9}>
            <Card title="Ближайшие выплаты">
                <Table
                    rowKey={r => `${r.ticket}_${r.date}_${r.total}`}
                    columns={paymentColumns}
                    size="small"
                    loading={loading}
                    dataSource={payments as any}
                    pagination={{
                        pageSize: 5,
                    }}
                    style={{ marginTop: "20px" }}
                />
            </Card>
        </Col>
    )
}

export default FuturePaymentsTable

const paymentColumns = [
    {
        key: "name",
        title: "Актив",
        dataIndex: "name",
        render: (_items: any, item: any) => {
            return (
                <>
                    <Text>{item.assetName}</Text> <br />
                    <SmallText $color="grey2">{item.ticket}</SmallText>
                </>
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
        key: "total",
        title: "Выплата",
        dataIndex: "paymentValue",
        sorter: (a: any, b: any) => a.total - b.total,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Выплата за штуку: ${item.paymentValue} ₽`}>
                    <span>{getDoubleCurrency(item.total)}</span>
                </Tooltip>
            )
        },
    },
    {
        key: "date",
        title: "Дата",
        dataIndex: "date",
        sorter: (a: any, b: any) => Date.parse(a.date) - Date.parse(b.date),
        render: (_items: any, item: any) => {
            return <Text>{getNumericStringDate(item.date)}</Text>
        },
    },
]
