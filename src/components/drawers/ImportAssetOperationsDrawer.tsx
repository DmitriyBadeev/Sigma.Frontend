import {
    Button,
    message,
    Popconfirm,
} from "antd"
import { DeleteOutlined, ImportOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import {
    useParseAssetReportLazyQuery,
    useCreateAssetOperationsMutation
} from "finance-types"
import Modal from "antd/lib/modal/Modal"
import Uploader from "components/uploaders/Uploader"
import { RcFile } from "antd/lib/upload"
import AssetOperationTable from "components/tables/operations/AssetOperationTable"

type propTypes = {
    portfolioId: string
    update: () => void
}

const ImportAssetOperationsDrawer: React.FC<propTypes> = ({portfolioId, update}) => {
    const [query, {data, loading, error}] = useParseAssetReportLazyQuery()

    const [createAssetOperations, mutationPayload] = useCreateAssetOperationsMutation();

    const [parsedData, setParsedData] = useState<any[]>([]);

    useEffect(() => {
        setParsedData(data?.parseAssetReport || [])
    }, [data])

    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }

    const uploadFile = (file: RcFile) => {
        query({variables: { report: file }})

        return false;
    }

    if (error) message.error(error.message)

    const deleteHandler = (index: number) => {
        setParsedData(prev => prev.filter((_, i) => i !== index))
    }

    const loadOperationsHandler = () => {
        const mappedData = parsedData.map(d => ({
            portfolioId,
            date: d?.date,
            price: d?.price,
            amount: d?.amount,
            assetAction: d?.assetAction,
            assetType: d?.assetType,
            ticket: d?.ticket,
            currencyId: d?.currency.id
        }))

        createAssetOperations({variables: {assetOperations: mappedData}})
            .then(res => {
                const response = res.data?.createAssetOperations

                if (response?.isSuccess) {
                    message.success(response?.message)
                } else {
                    message.error(response?.message)
                }

                setVisible(false)
                update()
            })
    }

    return (
        <>
            <Button type="primary" icon={<ImportOutlined />} onClick={showDrawer}>
                Импорт сделок
            </Button>
            <Modal
                title="Импорт сделок"
                width={1200}
                onCancel={onClose}
                visible={visible}
                footer={null}
            >
                <Uploader request={uploadFile}/>

                {
                    parsedData.length !== 0 && (
                        <>
                            <AssetOperationTable
                                data={parsedData}
                                loading={loading}
                                style={{marginTop: '1rem'}}
                                deleteColumnRender={
                                    (_: any, index: number) => (
                                        <Popconfirm title="Вы уверены, что хотите удалить сделку?" onConfirm={() => deleteHandler(index)}>
                                            <Button type="text" danger icon={<DeleteOutlined />}>
                                                Удалить
                                            </Button>
                                        </Popconfirm>
                                    )
                                }
                            />

                            <Button 
                                type="primary" 
                                onClick={loadOperationsHandler} 
                                loading={mutationPayload.loading}>
                                    Загрузить
                            </Button>
                        </>
                    )
                }
            </Modal>
        </>
    )
}

export default ImportAssetOperationsDrawer
