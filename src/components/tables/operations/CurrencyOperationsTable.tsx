import React from "react"
import { Button, Col, message, Popconfirm, Row, Table } from "antd"
import Card from "components/cards/Card"
import { H4, Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import {
    OperationType,
    useGetCurrencyOperationsQuery,
    useRemoveCurrencyOperationMutation
} from "finance-types"
import { getDoubleCurrency } from "helpers/financeHelpers"
import CreateCurrencyOperationDrawer from "components/drawers/CreateCurrencyOperationDrawer"
import { DeleteOutlined } from "@ant-design/icons"

type Props = {
    portfolioId: string
}

const CurrencyOperationsTable: React.FC<Props> = ({ portfolioId }) => {
    const { data, loading, error, refetch } = useGetCurrencyOperationsQuery({variables: { portfolioId }})
    const [mutation, payloads] = useRemoveCurrencyOperationMutation()

    if (error) message.error(error.message)

    const preparedData = data?.currencyOperations?.result?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    const deleteHandler = (id: any) => {
        mutation({variables: { currencyOperationId: id }})
            .then(value => {
                const isSuccess = value.data?.removeCurrencyOperation?.isSuccess

                if (isSuccess) {
                    message.success("Операция удалена")
                    refetch()
                } else {
                    message.error(value.data?.removeCurrencyOperation?.message || "Произошла неизвестная ошибка")
                }
            })
            .catch(error => {
                console.log(error);
                message.error(error.message)
            })
        
    }

    const getOperationTypeName = (item: any) => {
        switch (item) {
            case OperationType.Commission:
                return "Комиссия"
            case OperationType.CouponPayment:
                return "Купон"
            case OperationType.DividendPayment:
                return "Дивиденд"
            case OperationType.RefillAction:
                return "Пополнение"
            case OperationType.RefillAction:
                return "Списание"
            default:
                return "—"
        }
    }

    const columns = [
        {
            key: "name",
            title: "Операция",
            render: (_items: any, item: any) => {
                return <Text>{getOperationTypeName(item.operationType)}</Text>
            },
        },
        {
            key: "total",
            title: "Сумма",
            dataIndex: "total",
            sorter: (a: any, b: any) => a.total - b.total,
            render: (_items: any, item: any) => {
                return (
                    <Text>
                        {getDoubleCurrency(item.total, item.currency.ticket)}
                    </Text>
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
        {
            key: "amount",
            title: "Кол-во",
            dataIndex: "amount",
            render: (value: any) => value ? value : '—'
        },
        {
            key: "ticket",
            title: "Тикет",
            dataIndex: "ticket",
            render: (value: any) => value ? value : '—'
        },
        {
            key: "actions",
            width: 100,
            render: (value: any) => {
                return <Popconfirm title="Вы уверены, что хотите удалить операцию?" onConfirm={() => deleteHandler(value.id)}>
                        <Button type="text" danger icon={<DeleteOutlined />} loading={payloads.loading}>
                            Удалить
                        </Button>
                    </Popconfirm>
            }
        },
    ]
    
    return (
        <Col span={24}>
            <Card
                title={
                    <Row justify="space-between">
                        <H4>Валютные операции</H4>
                        <CreateCurrencyOperationDrawer
                            update={() => refetch()}
                            portfolioId={portfolioId}
                        />
                    </Row>
                }
            >
                <Table
                    columns={columns}
                    size="small"
                    loading={loading}
                    dataSource={preparedData}
                    style={{ marginTop: "1rem" }}
                />
            </Card>
        </Col>
    )
}

export default CurrencyOperationsTable