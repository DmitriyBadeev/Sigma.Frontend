import React, { useState } from "react"
import { H3 } from "GeneralStyles"
import FadePage from "components/fade/FadePage"
import StockMarketTable from "components/tables/StockMarketTable"
import FondMarketTable from "components/tables/FondMarketTable"
import BondMarketTable from "components/tables/BondMarketTable"
import { Row } from "antd"
import Selector from "components/inputs/Selector"

const Market: React.FC = () => {
    const items = ["Акции", "Облигации", "Фонды"]
    const [activeIndex, setActiveIndex] = useState(0)

    const getCurrentTable = () => {
        if (activeIndex === 0) return <StockMarketTable />
        if (activeIndex === 1) return <BondMarketTable />
        if (activeIndex === 2) return <FondMarketTable />
    }

    return (
        <FadePage>
            <Row>
                <H3>Рынок</H3>
            </Row>
            <Selector items={items} onTab={(index) => setActiveIndex(index)} />
            {getCurrentTable()}
        </FadePage>
    )
}

export default Market
