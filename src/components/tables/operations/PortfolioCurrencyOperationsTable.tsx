import React from "react"
import { Button, Col, message, Popconfirm, Row, Space } from "antd"
import Card from "components/cards/Card"
import { H4 } from "GeneralStyles"
import {
    useGetCurrencyOperationsQuery,
    useRemoveCurrencyOperationMutation
} from "finance-types"
import CreateCurrencyOperationDrawer from "components/drawers/CreateCurrencyOperationDrawer"
import { DeleteOutlined } from "@ant-design/icons"
import ImportCurrencyOperationsDrawer from "components/drawers/ImportCurrencyOperationsDrawer"
import CurrencyOperationsTable from "components/tables/operations/CurrencyOperationsTable"

type Props = {
    portfolioId: string
}

const PortfolioCurrencyOperationsTable: React.FC<Props> = ({ portfolioId }) => {
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
    
    return (
        <Col span={24}>
            <Card
                title={
                    <Row justify="space-between">
                        <H4>Валютные операции</H4>

                        <Space>
                            <ImportCurrencyOperationsDrawer 
                                update={() => refetch()}
                                portfolioId={portfolioId}
                            />
                            <CreateCurrencyOperationDrawer
                                update={() => refetch()}
                                portfolioId={portfolioId}
                            />
                        </Space>
                    </Row>
                }
            >
                <CurrencyOperationsTable 
                    data={preparedData} 
                    loading={loading} 
                    style={{ marginTop: "1rem" }}
                    deleteColumnRender={(value: any) => {
                        return <Popconfirm title="Вы уверены, что хотите удалить операцию?" onConfirm={() => deleteHandler(value.id)}>
                                <Button type="text" danger icon={<DeleteOutlined />} loading={payloads.loading}>
                                    Удалить
                                </Button>
                            </Popconfirm>
                    }}
                />
            </Card>
        </Col>
    )
}

export default PortfolioCurrencyOperationsTable