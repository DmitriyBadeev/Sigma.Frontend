import React from "react"
import { Link as DomLink } from "react-router-dom"
import styled from "styled-components"

type propTypes = {
    to: string
}

const StyledLink = styled(DomLink)`
    color: ${(props) => props.theme.linkColor};

    &:hover {
        color: ${(props) => props.theme.linkHoverColor};
    }
`

const Link: React.FC<propTypes> = (props) => {
    return <StyledLink to={props.to}>{props.children}</StyledLink>
}

export default Link
