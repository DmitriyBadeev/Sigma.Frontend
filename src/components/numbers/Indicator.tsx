import React from "react"
import styled from "styled-components"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"
import { getDoubleCurrency, getPercent } from "helpers/financeHelpers"
import { SmallText, Text } from "GeneralStyles"

type propTypes = {
    number: number
}

type styleProps = {
    color: "green" | "red" | "black"
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 3px;
`
const ArrowWrapper = styled.div<styleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    font-size: 10px;
    margin-right: 5px;
    border-radius: 50%;
    color: ${(props) => props.theme.white};
    background: ${(props) => {
        if (props.color === "green") {
            return props.theme.green
        }

        if (props.color === "red") {
            return props.theme.red
        }

        if (props.color === "black") {
            return props.theme.grey2
        }
    }};
`

export const Indicator: React.FC<propTypes> = ({ number }) => {
    const isAboveZero = number >= 0
    const isEqualZero = number === 0

    const Arrow = isAboveZero ? ArrowUpOutlined : ArrowDownOutlined
    const color = isEqualZero ? "black" : isAboveZero ? "green" : "red"

    number = Math.abs(number)

    return (
        <Wrapper>
            <ArrowWrapper color={color}>
                <Arrow />
            </ArrowWrapper>
            <SmallText>{getPercent(number)}</SmallText>
        </Wrapper>
    )
}

type numberPropTypes = {
    number: number
    type: "currency" | "percent"
    size?: "small" | "big"
}

export const NumberIndicatior: React.FC<numberPropTypes> = ({
    number,
    type,
    size = "big",
}) => {
    const isAboveZero = number >= 0
    const isEqualZero = number === 0

    const color = isEqualZero ? "black" : isAboveZero ? "green" : "red"
    const sign = isEqualZero ? "" : isAboveZero ? "+" : "-"
    number = Math.abs(number)

    const format = type === "percent" ? getPercent : getDoubleCurrency
    const ChoosenText = size === "big" ? Text : SmallText

    return (
        <ChoosenText $color={color}>
            {sign}
            {format(number)}
        </ChoosenText>
    )
}
