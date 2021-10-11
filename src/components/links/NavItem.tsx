import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { SmallText } from "GeneralStyles"

type mainProps = {
    icon: any
    link: string
    onClick?: () => void
}

type activeProp = {
    active?: boolean
}

const ItemWrapper = styled.div<activeProp>`
    text-align: center;
    margin: 10px 0;
    position: relative;
    transition: all ${(props) => props.theme.baseTransition};
    border-radius: 3px;
    &:hover {
        background: ${(props) => props.theme.grey5};
    }

    &::after {
        content: "";
        display: ${(props) => (props.active ? "block" : "none")};
        background: ${(props) => props.theme.primary};
        width: 2px;
        border-radius: 1px;
        height: 57px;
        position: absolute;
        right: -9px;
        top: 0;
    }
`

const IconWrapper = styled.div<activeProp>`
    font-size: 25px;
    line-height: 30px;
    padding-top: 5px;
    color: ${(props) =>
        props.active ? props.theme.primary : props.theme.grey2};
`

type propTypes = mainProps & activeProp

const NavItem: React.FC<propTypes> = (props) => {
    const color = props.active ? "primary" : "grey2"

    return (
        <Link to={props.link} onClick={() => props.onClick && props.onClick()}>
            <ItemWrapper active={props.active}>
                <IconWrapper active={props.active}>{props.icon}</IconWrapper>
                <SmallText $color={color}>{props.children}</SmallText>
            </ItemWrapper>
        </Link>
    )
}

export default NavItem
