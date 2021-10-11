import React from "react"
import styled from "styled-components"
import { Text } from "GeneralStyles"
import { Checkbox } from "antd"

type propTypes = {
    id: number
    img: any
    active: boolean
    onSelect: (portfolioId: number) => void
}

type styleProps = {
    active: boolean
}

const CardWrapper = styled.div<styleProps>`
    background: ${(props) => props.theme.cardBackground};
    display: flex;
    position: relative;
    padding: 10px;
    align-items: center;
    border-radius: 3px;
    margin-right: 20px;
    box-shadow: ${(props) =>
        props.active
            ? "0px 4px 30px rgba(0, 0, 0, 0.1)"
            : "0px 3px 5px rgba(0, 0, 0, 0.05)"};
    cursor: pointer;
    transition: all ${(props) => props.theme.baseTransition};

    &::after {
        content: "";
        display: ${(props) => (props.active ? "block" : "none")};
        border-radius: 1px;
        background: ${(props) => props.theme.primary};
        position: absolute;
        height: 2px;
        width: 100%;
        bottom: -20px;
        left: 0;
    }

    &:hover {
        box-shadow: ${(props) =>
            props.active
                ? "0px 4px 30px rgba(0, 0, 0, 0.1)"
                : "0px 3px 15px rgba(0, 0, 0, 0.05)"};
    }
`

const Img = styled.img`
    height: 30px;
    margin-right: 10px;
`
const CardCheckbox = styled(Checkbox)`
    position: absolute;
    right: 20px;
`

const PortfolioCard: React.FC<propTypes> = (props) => {
    return (
        <CardWrapper
            active={props.active}
            onClick={() => props.onSelect(props.id)}
        >
            <Img src={props.img} />
            <Text>{props.children}</Text>
            <CardCheckbox checked={props.active} />
        </CardWrapper>
    )
}

export default PortfolioCard
