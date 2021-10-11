import Link from "components/links/Link"
import React from "react"
import styled from "styled-components"

const LogoWrapper = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.primary};
    border-radius: 3px;
`

const Logo: React.FC = () => {
    return (
        <Link to="/">
            <LogoWrapper>
                <LogoIcon />
            </LogoWrapper>
        </Link>
        
    )
}

const LogoIconContainer = styled.div`
    height: 22px;
    color: ${(props) => props.theme.white};
`

const LogoIcon : React.FC = () => {
    return (
        <LogoIconContainer>   
            <svg height="100%" viewBox="0 0 20 26" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.61862 12.8548L7.41071 15.08C7.03078 15.4629 7.03322 16.0812 7.41608 16.4611C7.60651 16.6501 7.8552 16.7444 8.10393 16.7444C8.3551 16.7444 8.60627 16.6481 8.79714 16.4557L11.678 13.5523C12.052 13.1753 12.0563 12.5686 11.6876 12.1864L1.95354 2.09599H15.8188C16.8957 2.09599 17.7719 2.97216 17.7719 4.04912C17.7719 4.58847 18.2091 5.02568 18.7485 5.02568C19.2878 5.02568 19.725 4.58847 19.725 4.04912C19.725 1.89521 17.9727 0.142868 15.8188 0.142868H1.95354C1.16965 0.142868 0.464375 0.608786 0.156904 1.32993C-0.150567 2.05102 0.00148402 2.88247 0.546064 3.45009L9.61862 12.8548Z"/>
                <path d="M18.7485 20.26C18.2091 20.26 17.7719 20.6972 17.7719 21.2366C17.7719 22.3135 16.8957 23.1897 15.8188 23.1897H2.05126C2.05214 23.1888 2.05306 23.1878 2.05419 23.1867L5.23402 19.97C5.61322 19.5864 5.60961 18.9681 5.22606 18.5889C4.84252 18.2098 4.22421 18.2134 3.84501 18.5969L0.668103 21.8107C0.108826 22.3717 -0.0563597 23.2069 0.247351 23.9385C0.551013 24.6701 1.25912 25.1428 2.05121 25.1428H15.8188C17.9727 25.1428 19.725 23.3905 19.725 21.2366C19.725 20.6972 19.2878 20.26 18.7485 20.26Z" />
            </svg>
        </LogoIconContainer>
    )
}

export default Logo
