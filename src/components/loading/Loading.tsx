import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { FlexCenter } from "GeneralStyles"
import styled from "styled-components"

type propTypes = {
    size?: "small" | "normal" | "big"
    height?: string
}

type styleProps = {
    $height: string
}

const Wrapper = styled(FlexCenter)<styleProps>`
    height: ${(props) => props.$height};
    align-items: center;
`

const Loading: React.FC<propTypes> = ({ size = "normal", height = "auto" }) => {
    const fontSize = size === "normal" ? 32 : size === "big" ? 48 : 16

    const antIcon = <LoadingOutlined style={{ fontSize: fontSize }} spin />

    return (
        <Wrapper $height={height}>
            <Spin indicator={antIcon} />
        </Wrapper>
    )
}

export default Loading
