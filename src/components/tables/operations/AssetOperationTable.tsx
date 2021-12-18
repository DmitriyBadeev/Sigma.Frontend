import React from "react"
import { Table, TableProps } from "antd"
import { Text } from "GeneralStyles"
import { getNumericStringDate } from "helpers/dateHelpers"
import { AssetAction, AssetType } from "finance-types"
import { getDoubleCurrency } from "helpers/financeHelpers"

type propTypes = {
    loading: boolean
    data: any
    deleteColumnRender?: (value: any, index: number) => JSX.Element
}

const AssetOperationTable: React.FC<propTypes & TableProps<any>> = ({ loading, data, deleteColumnRender, ...tableProps  }) => {
    
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
            key: "price",
            title: "За штуку",
            sorter: (a: any, b: any) => a.price - b.price,
            render: (_items: any, item: any) => {
                return (
                    <Text>{getDoubleCurrency(item.price, item.currency.ticket)}</Text>
                )
            },
        },
        {
            key: "total",
            title: "Сумма",
            sorter: (a: any, b: any) => a.price - b.price,
            render: (_items: any, item: any) => {
                return <Text>{getDoubleCurrency(item.total, item.currency.ticket)}</Text>
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
            render: (value: any, _: any, index: number) => deleteColumnRender && deleteColumnRender(value, index)
        },
    ]

    return <Table
        columns={columns}
        size="small"
        loading={loading}
        dataSource={data}
        rowKey={r => `${r.ticket}_${r.date}_${Math.random()}`}
        {...tableProps}
    />
}

export default AssetOperationTable