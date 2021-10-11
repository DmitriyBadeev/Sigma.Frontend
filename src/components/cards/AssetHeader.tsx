import { Col, Row } from "antd"
import AssetIcon from "components/logo/AssetIcon"
import { H2, SmallText } from "GeneralStyles"
import React from "react"
import styled from "styled-components"
import Card from "./Card"

type propTypes = {
    name: string
    ticket: string
    type: string
    sector: string
}

const Grey = styled.span`
    color: ${(props) => props.theme.grey2};
`

const Point = styled.div`
    display: inline-flex;
    align-items: center;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${(props) => props.theme.grey2};
    margin: 0 6px;
    transform: translate(-50%, -50%);
`

const AssetHeader: React.FC<propTypes> = (props) => {
    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <Card
                    title={
                        <Row align="middle">
                            <AssetIcon ticket={props.ticket} size="large" />
                            <H2 style={{ margin: "0 0 0 10px" }}>
                                {props.name}
                                <Grey> {props.ticket}</Grey>
                            </H2>
                        </Row>
                    }
                >
                    <SmallText $color="grey1">{props.type}</SmallText> <Point />
                    <SmallText $color="grey1">{props.sector}</SmallText>
                </Card>
            </Col>
        </Row>
    )
}

export default AssetHeader
