import React from "react"
import styled from "styled-components"
import { getFractionalPart, getIntegerPart } from "helpers/financeHelpers"

type propTypes = {
    color?: "primary" | "green" | "red" | "black" | "dependingOnSign"
    number: number
    withSign?: boolean
}

type styleProps = {
    $color: "primary" | "green" | "red" | "black"
}

const Wrapper = styled.div<styleProps>`
    color: ${(props) => {
        switch (props.$color) {
            case "primary":
                return props.theme.primary
            case "green":
                return props.theme.green
            case "red":
                return props.theme.red
            case "black":
                return props.theme.black
        }
    }};
    font-weight: 500;
    display: flex;
    align-items: baseline;
`

const IntegerPart = styled.div`
    font-size: 30px;
`

const FractionalPart = styled.div`
    font-size: 15px;
`

const BigFractionalNumber: React.FC<propTypes> = ({
    number,
    color = "primary",
    withSign = false,
}) => {
    const isAboveZero = number >= 0
    const isEqualZero = number === 0

    if (color === "dependingOnSign") {
        color = isEqualZero ? "black" : isAboveZero ? "green" : "red"
    }

    let sign = isEqualZero ? "" : isAboveZero ? "+" : "−"
    number = Math.abs(number)

    return (
        <Wrapper $color={color}>
            <IntegerPart>
                {withSign ? sign + "\u202F" : ""}
                {getIntegerPart(number)}
            </IntegerPart>
            <FractionalPart>
                ,{getFractionalPart(number)}
                {"\u00A0"}₽
            </FractionalPart>
        </Wrapper>
    )
}

export default BigFractionalNumber
