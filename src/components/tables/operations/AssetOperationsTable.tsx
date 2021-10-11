import React from "react"
import { Button, Col, message, Popconfirm, Row, Table } from "antd"
import Card from "components/cards/Card"
import { H4, Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import { AssetAction, AssetType, useGetAssetOperationsQuery, useRemoveAssetOperationMutation } from "finance-types"
import { getDoubleCurrency } from "helpers/financeHelpers"
import CreateAssetOperationDrawer from "components/drawers/CreateAssetOperationDrawer"
import { DeleteOutlined } from "@ant-design/icons"

type Props = {
    portfolioId: string
}

const AssetOperationsTable: React.FC<Props> = ({portfolioId}) => {
    const { data, loading, error, refetch } = useGetAssetOperationsQuery({
        variables: {
            portfolioId
        }
    })
    const [mutation, payloads] = useRemoveAssetOperationMutation()
    
    if (error) message.error(error.message)

    const preparedData = data?.assetOperations?.result?.map((s, i) => {
        return {
            key: i,
            ...s,
        }
    })

    const deleteHandler = (id: any) => {
        mutation({variables: { assetOperationId: id }})
            .then(value => {
                const isSuccess = value.data?.removeAssetOperation?.isSuccess

                if (isSuccess) {
                    message.success("Сделка удалена")
                    refetch()
                } else {
                    message.error(value.data?.removeAssetOperation?.message || "Произошла неизвестная ошибка")
                }
            })
            .catch(error => {
                console.log(error);
                message.error(error.message)
            })
    }

    const getAssetTypeName = (item: any) => {
        switch (item) {
            case AssetType.Stock:
                return "Акция"
            case AssetType.Fond:
                return "Фонд"
            case AssetType.Bond:
                return "Облигация"
            default:
                return "—"
        }
    }

    const getAssetActionName = (item: any) => {
        switch (item) {
            case AssetAction.BuyAction:
                return "Покупка"
            case AssetAction.SellAction:
                return "Продажа"
            default:
                return "—"
        }
    }

    const columns = [
        {
            key: "ticket",
            title: "Тикет",
            dataIndex: "ticket",
        },
        {
            key: "assetType",
            dataIndex: "assetType",
            title: "Тип актива",
            filters: [AssetType.Stock, AssetType.Fond, AssetType.Bond].map((p) => ({ text: getAssetTypeName(p), value: p })),
            onFilter: (value: any, record: any) =>
                record.assetType.indexOf(value) === 0,
            render: (value: any) => <Text>{getAssetTypeName(value)}</Text>,
        },
        {
            key: "name",
            title: "Операция",
            dataIndex: "assetAction",
            filters: [AssetAction.BuyAction, AssetAction.SellAction].map((p) => ({ text: getAssetActionName(p), value: p })),
            onFilter: (value: any, record: any) =>
                record.assetAction.indexOf(value) === 0,
            render: (value: any) => {
                return <Text>{getAssetActionName(value)}</Text>
            },
        },
        {
            key: "amount",
            title: "Кол-во",
            dataIndex: "amount",
        },
        {
            key: "paymentPricePerAsset",
            title: "За штуку",
            sorter: (a: any, b: any) => a.price - b.price,
            render: (_items: any, item: any) => {
                return (
                    <Text>{getDoubleCurrency(item.price / item.amount, item.currency.ticket)}</Text>
                )
            },
        },
        {
            key: "paymentPrice",
            title: "Сумма",
            sorter: (a: any, b: any) => a.price - b.price,
            render: (_items: any, item: any) => {
                return <Text>{getDoubleCurrency(item.price, item.currency.ticket)}</Text>
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
            key: "actions",
            width: 100,
            render: (value: any) => {
                return <Popconfirm title="Вы уверены, что хотите удалить сделку?" onConfirm={() => deleteHandler(value.id)}>
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
                        <H4>Сделки</H4>
                        <CreateAssetOperationDrawer update={() => refetch()} portfolioId={portfolioId}/>
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

export default AssetOperationsTable