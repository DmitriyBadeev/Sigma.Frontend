import { Col, Row } from "antd"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Text } from "GeneralStyles"

type propTypes = {
    items: String[]
    onTab?: (index: number) => void
}

type styleProps = {
    active: boolean
}

const CardWrapper = styled.div<styleProps>`
    background: ${(props) => props.theme.cardBackground};
    display: flex;
    justify-content: center;
    position: relative;
    padding: 5px;
    align-items: center;
    border-radius: 3px;
    margin-right: 15px;
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
        bottom: -15px;
        left: 0;
    }

    &:hover {
        box-shadow: ${(props) =>
            props.active
                ? "0px 4px 30px rgba(0, 0, 0, 0.1)"
                : "0px 3px 15px rgba(0, 0, 0, 0.05)"};
    }
`

const SelectorWrapper = styled.div`
    margin: 15px 0 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`

const Selector: React.FC<propTypes> = (props) => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (props.onTab) {
            props.onTab(activeIndex)
        }
    }, [activeIndex, props])

    return (
        <SelectorWrapper>
            <Row>
                {props.items.map((item, index) => (
                    <Col span={3} key={index}>
                        <SelectorCard
                            item={item}
                            active={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    </Col>
                ))}
            </Row>
        </SelectorWrapper>
    )
}

export default Selector

type cardTypes = {
    item: String
    active: boolean
    onClick: () => void
}

const SelectorCard: React.FC<cardTypes> = (props) => {
    return (
        <CardWrapper active={props.active} onClick={() => props.onClick()}>
            <Text $large $bold>
                {props.item}
            </Text>
        </CardWrapper>
    )
}
