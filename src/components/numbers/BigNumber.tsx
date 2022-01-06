import React from "react"
import styled from "styled-components"

type propTypes = {
    color?: "primary" | "green" | "red" | "black" | "dependingOnSign" | string
    number: number
    withSign?: boolean
    withCurrency?: boolean
}

type styleProps = {
    $color: "primary" | "green" | "red" | "black" | string
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
            default:
                return props.$color
        }
    }};
    font-weight: 500;
    display: flex;
    align-items: baseline;
`

const IntegerPart = styled.div`
    font-size: 30px;
`

const BigNumber: React.FC<propTypes> = ({
    number,
    color = "primary",
}) => {
    const isAboveZero = number >= 0
    const isEqualZero = number === 0

    if (color === "dependingOnSign") {
        color = isEqualZero ? "black" : isAboveZero ? "green" : "red"
    }

    number = Math.abs(Number(number))

    return (
        <Wrapper $color={color}>
            <IntegerPart>
                {number.toLocaleString('ru')}
            </IntegerPart>        
        </Wrapper>
    )
}

export default BigNumber
