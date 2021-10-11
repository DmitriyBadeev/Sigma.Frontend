import { Col, message, Table, Tooltip } from "antd"
import { Text, SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React, { useEffect } from "react"
import { getDoubleCurrency } from "helpers/financeHelpers"
import { getNumericStringDate } from "helpers/dateHelpers"
import { useAggregateFuturePaymentsLazyQuery } from "finance-types"

type propTypes = {
    portfolios: number[]
}

const FuturePaymentsTable: React.FC<propTypes> = (props) => {
    const [query, { data, loading, error }] = useAggregateFuturePaymentsLazyQuery()

    useEffect(() => {
        query({ variables: { portfolioIds: props.portfolios } })
    }, [query, props.portfolios])

    if (error) message.error(error.message)

    const payments = data?.aggregateFuturePayments?.result?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    return (
        <Col span={9}>
            <Card title="Ближайшие выплаты">
                <Table
                    columns={paymentColumns}
                    size="small"
                    loading={loading}
                    dataSource={payments}
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
                    <Text>{item.name}</Text> <br />
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
        key: "paymentValue",
        title: "Выплата",
        dataIndex: "paymentValue",
        sorter: (a: any, b: any) => a.allPayment - b.allPayment,
        render: (_items: any, item: any) => {
            return (
                <Tooltip title={`Выплата за штуку: ${item.paymentValue} ₽`}>
                    <span>{getDoubleCurrency(item.allPayment)}</span>
                </Tooltip>
            )
        },
    },
    {
        key: "registryCloseDate",
        title: "Дата",
        dataIndex: "registryCloseDate",
        sorter: (a: any, b: any) => Date.parse(a.registryCloseDate) - Date.parse(b.registryCloseDate),
        render: (_items: any, item: any) => {
            return <Text>{getNumericStringDate(item.registryCloseDate)}</Text>
        },
    },
]
