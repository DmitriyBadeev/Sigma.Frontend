import React from "react"
import { Table, TableProps } from "antd"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import { OperationType } from "finance-types"
import { getDoubleCurrency } from "helpers/financeHelpers"

type Props = {
    loading: boolean
    data: any
    deleteColumnRender?: (value: any, index: number) => JSX.Element
}

const CurrencyOperationsTable: React.FC<Props & TableProps<any>> = ({ loading, data, deleteColumnRender, ...tableProps }) => {
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
            case OperationType.WithdrawalAction:
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
            render: (value: any, _: any, index: number) => deleteColumnRender && deleteColumnRender(value, index)
        },
    ]
    
    return <Table
            columns={columns}
            size="small"
            loading={loading}
            dataSource={data}
            style={{ marginTop: "1rem" }}
            rowKey={r => `${r.operationType}_${r.operationType}_${Date.parse(r.date)}_${r.amount}_${Math.random() * 1000}`}
            {...tableProps}
        />
}

export default CurrencyOperationsTable