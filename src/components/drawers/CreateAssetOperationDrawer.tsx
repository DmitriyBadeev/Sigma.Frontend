import {
    Drawer,
    Form,
    Button,
    Col,
    Row,
    message,
    InputNumber,
    DatePicker,
    Select,
    Input,
} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import styled from "styled-components"
import {
    usePortfoliosQuery,
    useCreateAssetOperationMutation,
    AssetAction,
    AssetType,
    useGetCurrenciesQuery
} from "finance-types"
import ru_RU from "antd/es/date-picker/locale/ru_RU"

const { Option } = Select

const Footer = styled.div`
    text-align: left;
    padding: 10px 20px;
`

type propTypes = {
    update: () => void
    portfolioId: any
}

const CreateAssetOperationDrawer: React.FC<propTypes> = (props) => {
    const portfolios = usePortfoliosQuery()
    const [mutation, {loading: createLoading, error: createError}] = useCreateAssetOperationMutation()
    const currencies = useGetCurrenciesQuery()

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
        console.log("Добавлена сделка", values);
        
        const response = await mutation({
            variables: {
                portfolioId: props.portfolioId,
                date: values.date.format(),
                price: values.price,
                amount: values.amount,
                assetAction: values.assetAction,
                ticket: values.ticket,
                assetType: values.assetType,
                currencyId: values.currencyId
            },
        })

        const isSuccess = response.data?.createAssetOperation?.isSuccess
        const text = response.data?.createAssetOperation?.message

        if (isSuccess) {
            message.success(text)
            props.update()
            setVisible(false)
        } else if (text) {
            message.error(text)
        }
    }

    const getCurrencySelect = () => {
        const data = currencies.data?.currencies
        const options = data?.map(currency => <Option key={currency?.id} value={currency?.id}>{currency?.sign}</Option>)

        const initionValue = data?.find(c => c?.sign === '₽')?.id

        return <Form.Item
                name="currencyId"
                label="Валюта"
                rules={[
                    {
                        required: true,
                        message: "Выберите валюту",
                    },
                ]}
                initialValue={initionValue}
        >
            <Select size="large" loading={currencies.loading}>
                {options}
            </Select>
        </Form.Item>
    }

    const changeFormHandler = (changedValues: any, allValues: any) => {
        console.log(changedValues, allValues);

        if (changedValues.price) {
            form.setFieldsValue({total: allValues.amount * changedValues.price})
        }

        if (changedValues.amount) {
            form.setFieldsValue({total: changedValues.amount * allValues.price})
        }
        
        if (changedValues.total) {
            form.setFieldsValue({price: changedValues.total / allValues.amount})
        }
    }

    if (portfolios.error) message.error(portfolios.error.message)
    if (createError) message.error(createError.message)

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
                Добавить сделку
            </Button>
            <Drawer
                title="Добавление сделки"
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
                            loading={createLoading}
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
                    onValuesChange={changeFormHandler}
                    hideRequiredMark
                >
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="assetAction"
                                label="Тип операции"
                                rules={[
                                    {
                                        required: true,
                                        message: "Выберите тип операции",
                                    },
                                ]}
                                initialValue={AssetAction.BuyAction}
                            >
                                <Select size="large">
                                    <Option value={AssetAction.BuyAction}>Покупка</Option>
                                    <Option value={AssetAction.SellAction}>Продажа</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="ticket"
                                label="Тикет"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите тикет",
                                    },
                                ]}
                            >
                                <Input placeholder="Тикет" size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Дата"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите дату",
                                    },
                                ]}
                            >
                                <DatePicker
                                    locale={ru_RU}
                                    style={{ width: "100%" }}
                                    format="DD.MM.YYYY"
                                    size="large"
                                    getPopupContainer={(trigger) =>
                                        trigger.parentElement ?? trigger
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="assetType"
                                label="Тип актива"
                                rules={[
                                    {
                                        required: true,
                                        message: "Выберите тип актива",
                                    },
                                ]}
                                initialValue={AssetType.Stock}
                            >
                                <Select size="large">
                                    <Option value={AssetType.Stock}>Акция</Option>
                                    <Option value={AssetType.Fond}>Фонд</Option>
                                    <Option value={AssetType.Bond}>Облигация</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item
                                name="amount"
                                label="Количество"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите количество",
                                    },
                                ]}
                                initialValue={1}
                            >
                                <InputNumber
                                    min={1}
                                    placeholder="1"
                                    style={{width: '100%'}}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="price"
                                label="Цена за шт."
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите цену",
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{width: '100%'}}
                                    decimalSeparator=","
                                    placeholder="0,0"
                                    size="large"
                                    stringMode
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5} offset={4}>
                            <Form.Item
                                name="total"
                                label="Сумма"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите сумму",
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{width: '100%'}}
                                    decimalSeparator=","
                                    placeholder="0,0"
                                    size="large"
                                    stringMode
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            {getCurrencySelect()}
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default CreateAssetOperationDrawer
