import React from "react"
import { H3 } from "GeneralStyles"
import FadePage from "components/fade/FadePage"
import StockMarketTable from "components/tables/markets/StockMarketTable"
import FondMarketTable from "components/tables/markets/FondMarketTable"
import BondMarketTable from "components/tables/markets/BondMarketTable"
import { Row, Tabs } from "antd"

const { TabPane } = Tabs

const Market: React.FC = () => {

    return (
        <FadePage>
            <Row>
                <H3>Рынок</H3>
            </Row>

            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Акции" key="1">
                    <StockMarketTable />
                </TabPane>

                <TabPane tab="Фонды" key="2">
                    <FondMarketTable />
                </TabPane>

                <TabPane tab="Облигации" key="3">
                    <BondMarketTable />
                </TabPane>
            </Tabs>
        </FadePage>
    )
}

export default Market
