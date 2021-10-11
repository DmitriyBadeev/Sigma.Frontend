import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"

const WrapperFade = styled.div`
    transition: all 0.3s;
    transform: translateY(-2vh);
    opacity: 0;
`

const FadePage: React.FC = (props) => {
    const [inProp, setInProp] = useState(false)

    useEffect(() => {
        setInProp(true)
    }, [])

    return (
        <CSSTransition
            classNames="page-fade"
            in={inProp}
            timeout={{ enter: 300, exit: 300 }}
        >
            <WrapperFade>{props.children}</WrapperFade>
        </CSSTransition>
    )
}

export default FadePage
