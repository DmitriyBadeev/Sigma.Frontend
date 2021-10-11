import React from "react"
import { useParams } from "react-router-dom"
//import { useAssetQuery } from "finance-types"
import message from "antd/lib/message"
import { Col, Empty, Row } from "antd"
import Loading from "components/loading/Loading"
import AssetHeader from "components/cards/AssetHeader"
import FadePage from "components/fade/FadePage"
import Card from "components/cards/Card"
import { Text } from "GeneralStyles"
import styled from "styled-components"
import StockChart from "components/charts/StockChart"

type paramsTypes = {
    ticket: string
}

const ContentWrapper = styled.div`
    margin-top: 10px;
`

const Asset: React.FC = () => {
    const { ticket } = useParams<paramsTypes>()
    // const { data, loading, error } = useAssetQuery({
    //     variables: {
    //         ticket,
    //     },
    // })

    // if (error) message.error(error.message)
    // const assetInfoResult = data?.asset

    // if (assetInfoResult && !assetInfoResult.isSuccess) {
    //     message.error(assetInfoResult.message)

    //     return <Empty description="Ничего не найдено" />
    // }

    // if (loading) return <Loading size="big" height="70vh" />

    // const assetInfo = assetInfoResult?.result
    // const props = {
    //     name: assetInfo?.fullName || assetInfo?.marketFullName || "",
    //     ticket: assetInfo?.ticket || "",
    //     sector: assetInfo?.sector || "",
    //     type: assetInfo?.assetType?.name || "",
    // }

    return (
        <FadePage>
            {/* <AssetHeader {...props} />

            <Row gutter={[20, 20]}>
                <Col span={15}>
                    <Card title="Общая информация">
                        <ContentWrapper>
                            <Text>{assetInfo?.description}</Text>
                        </ContentWrapper>
                    </Card>
                </Col>
            </Row>

            <Row>
                <StockChart ticket={props.ticket} />
            </Row> */}
        </FadePage>
    )
}

export default Asset
