import { Drawer, Form, Button, Col, Row, Input, Radio, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
    usePortfolioTypesQuery,
    useCreatePortfolioMutation,
    usePortfoliosLazyQuery,
} from "finance-types"
import Loading from "components/loading/Loading"
import { observer } from "mobx-react"
import useStore from "store/useStore"
import Portfolios from "pages/Portfolios"

const Footer = styled.div`
    text-align: left;
    padding: 10px 20px;
`

const TypeIcon = styled.img`
    display: inline-block;
    height: 21.6px;
    margin-right: 5px;
`

const CreatePortfolioDrawer: React.FC = observer(() => {
    const { data, loading, error } = usePortfolioTypesQuery()
    const [portfoliosQuery, { data: portfoliosPayload }] = usePortfoliosLazyQuery({fetchPolicy: 'no-cache'})
    const [createMutation, createPayloads] = useCreatePortfolioMutation({ refetchQueries: ['portfolios'], 
        onCompleted: () => updatePortoflios() })
    const { portfolioStore } = useStore()

    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()

    const updatePortoflios = () => {
        portfoliosQuery()
    }

    useEffect(() => {
        const portfolios =
            portfoliosPayload?.portfolios?.map((p) => ({
                id: p?.id || 0,
                name: p?.name || "",
                iconUrl: p?.portfolioType?.iconUrl || "",
            })) || []
    
        if (Portfolios.length > 0) {
            portfolioStore.updatePortfolios(portfolios)
        }
    }, [portfoliosPayload])

    const showDrawer = () => {
        setVisible(true)
    }
    const onClose = () => {
        setVisible(false)
    }

    const clickSubmitButton = () => {
        form.submit()
    }

    const onSubmit = async (values: any) => {
        const response = await createMutation({
            variables: {
                name: values.name,
                portfolioType: values.type,
            },
        })

        const result = response.data?.addPortfolio
        if (result?.isSuccess) {
            message.success(result?.message)
            setVisible(false)
        } else {
            message.error(result?.message)
        }
    }

    const getPortfolioTypes = () => {
        if (loading) return <Loading />

        const radios = data?.portfolioTypes?.map((type) => {
            return (
                <Radio.Button value={type?.id} key={type?.id}>
                    <TypeIcon src={type?.iconUrl || ""} /> {type?.name}
                </Radio.Button>
            )
        })

        return <Radio.Group size="large">{radios}</Radio.Group>
    }

    if (error) message.error(error.message)
    if (createPayloads.error) message.error(createPayloads.error.message)

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
                Добавить портфель
            </Button>
            <Drawer
                title="Добавление портфеля"
                width={720}
                onClose={onClose}
                visible={visible}
                footer={
                    <Footer>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            onClick={() => clickSubmitButton()}
                            style={{ width: 200 }}
                            loading={createPayloads.loading}
                            icon={<PlusOutlined />}
                        >
                            Добавить
                        </Button>
                        <Button
                            onClick={onClose}
                            style={{ marginLeft: 15 }}
                            size="large"
                        >
                            Отмена
                        </Button>
                    </Footer>
                }
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onSubmit}
                    hideRequiredMark
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Название портфеля"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите название",
                                    },
                                ]}
                            >
                                <Input placeholder="Название" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="type"
                                label="Тип портфеля"
                                rules={[
                                    {
                                        required: true,
                                        message: "Выберите тип портфеля",
                                    },
                                ]}
                            >
                                {getPortfolioTypes()}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
})

export default CreatePortfolioDrawer
