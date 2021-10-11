import { Drawer, Form, Button, Col, Row, Input, Radio, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import styled from "styled-components"
import {
    usePortfolioTypesQuery,
    useCreatePortfolioMutation,
} from "finance-types"
import Loading from "components/loading/Loading"

const Footer = styled.div`
    text-align: left;
    padding: 10px 20px;
`

const TypeIcon = styled.img`
    display: inline-block;
    height: 21.6px;
    margin-right: 5px;
`

const CreatePortfolioDrawer: React.FC = () => {
    const { data, loading, error } = usePortfolioTypesQuery()
    const [createMutation, createPayloads] = useCreatePortfolioMutation()

    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()

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
}

export default CreatePortfolioDrawer
