import React, { useEffect, useState } from "react"
import FadePage from "components/fade/FadePage"
import PortfolioCurrencyOperationsTable from "components/tables/operations/PortfolioCurrencyOperationsTable"
import PortfolioAssetOperationTable from "components/tables/operations/PortfolioAssetOperationTable"
import { Col, message, Row, Select } from "antd"
import { H3 } from "GeneralStyles"
import { usePortfoliosQuery } from "finance-types"
import Loading from "components/loading/Loading"
import styled from "styled-components"
import { Tabs } from 'antd'

const { TabPane } = Tabs
const { Option } = Select

const Icon = styled.img`
    width: 20px;
    margin-right: 5px;
`

const OptionContainer = styled.div`
    display: flex;
    align-items: center;
`

const Operations: React.FC = () => {
    const { data, loading, error } = usePortfoliosQuery()
    const [selectedPortfolio, setSelectedPortfolio] = useState<any>()
    const [selectInit, setSelectInit] = useState(false)
    const portfolios = data?.portfolios

    useEffect(() => {
        if (portfolios && !selectInit) {
            setSelectedPortfolio(portfolios[0]?.id)
            setSelectInit(true)
        }
    }, [portfolios, selectInit])

    if (error) message.error(error.message)
    if (loading) return <Loading size="big" height="70vh"/>

    const getPortfolioSelect = () => {
        const options = portfolios?.map((portfolio) => (
            <Option value={portfolio?.id} key={portfolio?.id}>
                <OptionContainer>
                    <Icon src={portfolio?.portfolioType?.iconUrl || ""} alt={portfolio?.name || ""} />{portfolio?.name}
                </OptionContainer>
            </Option>
        ))
        
        return (
            <Select 
                loading={loading} 
                size="large" 
                placeholder="Выберите портфель"
                defaultActiveFirstOption
                value={selectedPortfolio}
                style={{width: "100%"}} 
                onChange={value => setSelectedPortfolio(value)}>
                {options}
            </Select>
        )
    }

    return (
        <FadePage>
            <Row gutter={[20, 0]}>
                <Col>
                    <H3>Операции</H3>
                </Col>
                <Col span={8}>
                    {getPortfolioSelect()}
                </Col>
            </Row>
            {
                selectedPortfolio && 
                <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Сделки" key="1">
                        <Row gutter={[20, 20]}>
                            <PortfolioAssetOperationTable portfolioId={selectedPortfolio}/>
                        </Row>
                    </TabPane>
                    <TabPane tab="Зачисления / списания" key="2">
                        <Row gutter={[20, 20]}>
                            <PortfolioCurrencyOperationsTable portfolioId={selectedPortfolio}/>
                        </Row>
                    </TabPane>
                </Tabs>
                
            }
            
        </FadePage>
    )
}

export default Operations
