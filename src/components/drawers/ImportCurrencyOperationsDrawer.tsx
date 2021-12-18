import {
    Button,
    message,
    Popconfirm,
} from "antd"
import { DeleteOutlined, ImportOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import {
    useParseCurrencyReportLazyQuery,
    useCreateCurrencyOperationsMutation
} from "finance-types"
import Modal from "antd/lib/modal/Modal"
import Uploader from "components/uploaders/Uploader"
import { RcFile } from "antd/lib/upload"
import CurrencyOperationsTable from "components/tables/operations/CurrencyOperationsTable"

type propTypes = {
    portfolioId: string
    update: () => void
}

const ImportCurrencyOperationsDrawer: React.FC<propTypes> = ({portfolioId, update}) => {
    const [query, {data, loading, error}] = useParseCurrencyReportLazyQuery()
    const [createCurrencyOperations, mutationPayload] = useCreateCurrencyOperationsMutation()

    const [visible, setVisible] = useState(false)

    const [parsedData, setParsedData] = useState<any[]>([]);

    useEffect(() => {
        setParsedData(data?.parseCurrencyReport || [])
    }, [data])

    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }

    const uploadFile = (file: RcFile) => {
        console.log("uploadFile", file);
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
            total: d?.total,
            currencyId: d?.currency.id,
            operationType: d?.operationType,
            amount: d?.amount,
            ticket: d?.ticket,
        }))

        console.log("Загрузка", mappedData)
        createCurrencyOperations({variables: {currencyOperations: mappedData}})
            .then(res => {
                const response = res.data?.createCurrencyOperations

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
                Импорт операций
            </Button>
            <Modal
                title="Импорт операций"
                width={1024}
                onCancel={onClose}
                visible={visible}
                footer={null}
                maskClosable={false}
            >
                <Uploader request={uploadFile}/>

                {
                    parsedData.length !== 0 && (
                        <>
                            <CurrencyOperationsTable
                                data={parsedData}
                                loading={loading}
                                style={{marginTop: '1rem'}}
                                deleteColumnRender={
                                    (_: any, index: number) => (
                                        <Popconfirm title="Вы уверены, что хотите удалить операцию?" onConfirm={() => deleteHandler(index)}>
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

export default ImportCurrencyOperationsDrawer
