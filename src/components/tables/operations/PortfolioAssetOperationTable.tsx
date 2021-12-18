import React from "react"
import { Button, Col, message, Popconfirm, Row, Space } from "antd"
import Card from "components/cards/Card"
import { H4 } from "GeneralStyles"
import { useGetAssetOperationsQuery, useRemoveAssetOperationMutation } from "finance-types"
import CreateAssetOperationDrawer from "components/drawers/CreateAssetOperationDrawer"
import ImportAssetOperationsDrawer from 'components/drawers/ImportAssetOperationsDrawer'
import AssetOperationTable from 'components/tables/operations/AssetOperationTable'
import { DeleteOutlined } from "@ant-design/icons"

type Props = {
    portfolioId: string
}

const PortfolioAssetOperationTable: React.FC<Props> = ({portfolioId}) => {
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

    return (
        <Col span={24}>
            <Card
                title={
                    <Row justify="space-between">
                        <H4>Сделки</H4>
                        <Space size='large'>
                            <ImportAssetOperationsDrawer update={() => refetch()} portfolioId={portfolioId} />
                            <CreateAssetOperationDrawer update={() => refetch()} portfolioId={portfolioId}/>
                        </Space>
                    </Row>
                }
            >
                <AssetOperationTable 
                    data={preparedData} 
                    loading={loading} 
                    style={{ marginTop: "1rem" }}
                    deleteColumnRender={(value: any) =>
                        (
                            <Popconfirm title="Вы уверены, что хотите удалить сделку?" onConfirm={() => deleteHandler(value.id)}>
                                <Button type="text" danger icon={<DeleteOutlined />} loading={payloads.loading}>
                                    Удалить
                                </Button>
                            </Popconfirm>
                        )
                    }
                />
            </Card>
        </Col>
    )
}

export default PortfolioAssetOperationTable