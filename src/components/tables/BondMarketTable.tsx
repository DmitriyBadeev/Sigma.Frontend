import { Col, message, Space, Table, Tooltip } from "antd"
import { SmallText } from "GeneralStyles"
import Card from "components/cards/Card"
import React, { useEffect } from "react"
import { getPercent } from "helpers/financeHelpers"
//import { useAssetsLazyQuery } from "finance-types"
import { NumberIndicatior } from "components/numbers/Indicator"
import AssetIcon from "components/logo/AssetIcon"
import Link from "components/links/Link"

const BondMarketTable: React.FC = () => {
    // const [query, { data, loading, error }] = useAssetsLazyQuery()

    // useEffect(() => {
    //     query({
    //         variables: {
    //             type: "Облигация",
    //         },
    //     })
    // }, [query])

    // if (error) message.error(error.message)

    // const reports = data?.assets?.map((s, i) => {
    //     return {
    //         key: i,
    //         ...s,
    //     }
    // })

    return (
        <Col span={24}>
            <Card title={null}>
                {/* <Table
                    columns={columns}
                    size="small"
                    loading={loading}
                    dataSource={reports}
                    pagination={{
                        defaultPageSize: 50,
                    }}
                /> */}
            </Card>
        </Col>
    )
}

export default BondMarketTable

// const columns = [
//     {
//         key: "name",
//         title: "Название",
//         dataIndex: "shortName",
//         render: (_items: any, item: any) => {
//             return (
//                 <Link to={`/market/${item.ticket}`}>
//                     <Space>
//                         <AssetIcon
//                             ticket={
//                                 item.ticket.startsWith("RU") ||
//                                 item.ticket.startsWith("SU")
//                                     ? "MINFIN"
//                                     : ""
//                             }
//                         />
//                         <div>
//                             {item.shortName} <br />
//                             <SmallText $color="grey2">{item.ticket}</SmallText>
//                         </div>
//                     </Space>
//                 </Link>
//             )
//         },
//     },
//     {
//         key: "price",
//         title: "Текущая цена",
//         dataIndex: "price",
//         sorter: (a: any, b: any) => a.price - b.price,
//         render: (_items: any, item: any) => {
//             return (
//                 <Tooltip title={`Время обновления: ${item.updateTime}`}>
//                     <span>{getPercent(item.price)}</span> <br />
//                     <NumberIndicatior
//                         number={item.priceChange}
//                         type="percent"
//                         size="small"
//                     />
//                 </Tooltip>
//             )
//         },
//     },
//     // {
//     //     key: "allPrice",
//     //     title: "Стоимость лота",
//     //     sorter: (a: any, b: any) => a.price * a.lotSize - b.price * b.lotSize,
//     //     render: (_items: any, item: any) => {
//     //         return <Text>{getDoubleCurrency(item.price * item.lotSize)}</Text>
//     //     },
//     // },
// ]
