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
    useCreateCurrencyOperationMutation,
    OperationType,
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

const CreateCurrencyOperationDrawer: React.FC<propTypes> = (props) => {
    const portfolios = usePortfoliosQuery()
    const [mutation, {loading: createLoading, error: createError}] = useCreateCurrencyOperationMutation()
    const currencies = useGetCurrenciesQuery()
    const [operationType, setOperationType] = useState(OperationType.RefillAction)

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
        console.log("Добавлена операция", values);
        const type = values.type

        const variables: any = {
            portfolioId: props.portfolioId,
            date: values.date.format(),
            total: values.price,
            currencyId: values.currencyId,
            operationType: values.type,
            amount: null,
            ticket: null
        }

        if (type === OperationType.DividendPayment || type === OperationType.CouponPayment) {
            variables.amount = values.amount
            variables.ticket = values.ticket
        }
        
        const response = await mutation({
            variables,
        })

        const isSuccess = response.data?.createCurrencyOperation?.isSuccess
        const text = response.data?.createCurrencyOperation?.message

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

    if (portfolios.error) message.error(portfolios.error.message)
    if (createError) message.error(createError.message)

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
                Добавить операцию
            </Button>
            <Drawer
                title="Добавление валютной операции"
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
                            loading={ createLoading }
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
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="type"
                                label="Тип операции"
                                rules={[
                                    {
                                        required: true,
                                        message: "Выберите тип операции",
                                    },
                                ]}
                                initialValue={OperationType.RefillAction}
                            >
                                <Select size="large" onChange={(value: OperationType) => setOperationType(value)}>
                                    <Option value={OperationType.RefillAction}>Пополнение</Option>
                                    <Option value={OperationType.Commission}>Комиссия</Option>
                                    <Option value={OperationType.CouponPayment}>Купон</Option>
                                    <Option value={OperationType.DividendPayment}>Дивиденд</Option>
                                    <Option value={OperationType.WithdrawalAction}>Списание</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={16}>
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
                        <Col span={4}>
                            <Form.Item
                                name="price"
                                label="Сумма"
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите сумму",
                                    },
                                ]}
                                initialValue={0}
                            >
                                <InputNumber
                                    min={1}
                                    precision={2}
                                    size="large"
                                    decimalSeparator=","
                                    placeholder="0.0"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            {getCurrencySelect()}
                        </Col>
                    </Row>
                    {
                        (operationType === OperationType.CouponPayment || operationType === OperationType.DividendPayment) &&
                        <Row gutter={16}>
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
                                    name="amount"
                                    label="Количество"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Введите количество",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        min={1}
                                        placeholder="1"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                </Form>
            </Drawer>
        </>
    )
}

export default CreateCurrencyOperationDrawer
