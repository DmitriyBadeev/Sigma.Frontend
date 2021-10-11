import React from "react"
import styled from "styled-components"
import { Text } from "GeneralStyles"

const Wrapper = styled.div`
    background: ${(props) => props.theme.white};
    padding: 20px 25px;
    border-radius: 3px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled(Text)`
    color: ${(props) => props.theme.grey1};
`

const Content = styled.div`
    flex: 1 0;
`

type propTypes = {
    title: string | React.ReactNode
}

const Card: React.FC<propTypes> = (props) => {
    return (
        <Wrapper>
            <Title>{props.title}</Title>
            <Content>{props.children}</Content>
        </Wrapper>
    )
}

export default Card
