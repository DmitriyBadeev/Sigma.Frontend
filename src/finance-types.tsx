import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  UUID: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};





export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}

export type Query = {
  __typename?: 'Query';
  portfolios?: Maybe<Array<Maybe<Portfolio>>>;
  portfolioTypes?: Maybe<Array<Maybe<PortfolioType>>>;
  currencies?: Maybe<Array<Maybe<Currency>>>;
  stocks?: Maybe<Array<Maybe<Stock>>>;
  fonds?: Maybe<Array<Maybe<Fond>>>;
  bonds?: Maybe<Array<Maybe<Bond>>>;
  assetOperations?: Maybe<DefaultPayloadOfListOfAssetOperation>;
  currencyOperations?: Maybe<DefaultPayloadOfListOfCurrencyOperation>;
  currencyOperationTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  aggregatePortfolios?: Maybe<DefaultPayloadOfPortfolio>;
  stockCandles?: Maybe<Array<Maybe<Candle>>>;
  portfoliosCostGraph?: Maybe<DefaultPayloadOfListOfCostGraphData>;
  secretData?: Maybe<Scalars['String']>;
  parseAssetReport?: Maybe<Array<Maybe<AssetOperation>>>;
  parseCurrencyReport?: Maybe<Array<Maybe<CurrencyOperation>>>;
  futurePayments?: Maybe<DefaultPayloadOfListOfPaymentData>;
  portfolioAssetShares?: Maybe<DefaultPayloadOfListOfAssetShare>;
  herfindahlHirschmanIndex?: Maybe<DefaultPayloadOfHerfindahlHirschmanIndex>;
  sharpeRatio?: Maybe<DefaultPayloadOfSharpeRatio>;
};


export type QueryAssetOperationsArgs = {
  portfolioId: Scalars['UUID'];
};


export type QueryCurrencyOperationsArgs = {
  portfolioId: Scalars['UUID'];
};


export type QueryAggregatePortfoliosArgs = {
  portfolioIds?: Maybe<Array<Scalars['UUID']>>;
};


export type QueryStockCandlesArgs = {
  ticket?: Maybe<Scalars['String']>;
  from: Scalars['DateTime'];
  interval: CandleInterval;
};


export type QueryPortfoliosCostGraphArgs = {
  portfolioIds?: Maybe<Array<Scalars['UUID']>>;
};


export type QueryParseAssetReportArgs = {
  report?: Maybe<Scalars['Upload']>;
};


export type QueryParseCurrencyReportArgs = {
  report?: Maybe<Scalars['Upload']>;
};


export type QueryFuturePaymentsArgs = {
  portfolioIds?: Maybe<Array<Scalars['UUID']>>;
};


export type QueryPortfolioAssetSharesArgs = {
  portfolioIds?: Maybe<Array<Scalars['UUID']>>;
};


export type QueryHerfindahlHirschmanIndexArgs = {
  portfolioIds?: Maybe<Array<Scalars['UUID']>>;
};


export type QuerySharpeRatioArgs = {
  portfolioIds?: Maybe<Array<Scalars['UUID']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPortfolio?: Maybe<DefaultPayload>;
  removePortfolio?: Maybe<DefaultPayload>;
  updatePortfolio?: Maybe<DefaultPayload>;
  createAssetOperation?: Maybe<DefaultPayload>;
  removeAssetOperation?: Maybe<DefaultPayload>;
  createCurrencyOperation?: Maybe<DefaultPayload>;
  removeCurrencyOperation?: Maybe<DefaultPayload>;
  createAssetOperations?: Maybe<DefaultPayload>;
  createCurrencyOperations?: Maybe<DefaultPayload>;
};


export type MutationAddPortfolioArgs = {
  input?: Maybe<AddPortfolioInput>;
};


export type MutationRemovePortfolioArgs = {
  input?: Maybe<RemovePortfolioInput>;
};


export type MutationUpdatePortfolioArgs = {
  input?: Maybe<UpdatePortfolioInput>;
};


export type MutationCreateAssetOperationArgs = {
  input?: Maybe<AssetOperationInput>;
};


export type MutationRemoveAssetOperationArgs = {
  assetOperationId: Scalars['UUID'];
};


export type MutationCreateCurrencyOperationArgs = {
  input?: Maybe<CurrencyOperationInput>;
};


export type MutationRemoveCurrencyOperationArgs = {
  currencyOperationId: Scalars['UUID'];
};


export type MutationCreateAssetOperationsArgs = {
  assetOperations?: Maybe<Array<Maybe<AssetOperationInput>>>;
};


export type MutationCreateCurrencyOperationsArgs = {
  currencyOperations?: Maybe<Array<Maybe<CurrencyOperationInput>>>;
};

export type PortfolioType = {
  __typename?: 'PortfolioType';
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
  portfolios?: Maybe<Array<Maybe<Portfolio>>>;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  id: Scalars['UUID'];
  userId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  cost: Scalars['Decimal'];
  investedSum: Scalars['Decimal'];
  paperProfit: Scalars['Decimal'];
  paperProfitPercent: Scalars['Decimal'];
  dividendProfit: Scalars['Decimal'];
  dividendProfitPercent: Scalars['Decimal'];
  rubBalance: Scalars['Decimal'];
  dollarBalance: Scalars['Decimal'];
  euroBalance: Scalars['Decimal'];
  portfolioTypeId: Scalars['UUID'];
  portfolioType?: Maybe<PortfolioType>;
  assetOperations?: Maybe<Array<Maybe<AssetOperation>>>;
  currencyOperations?: Maybe<Array<Maybe<CurrencyOperation>>>;
  dailyPortfolioReports?: Maybe<Array<Maybe<DailyPortfolioReport>>>;
  portfolioStocks?: Maybe<Array<Maybe<PortfolioStock>>>;
  portfolioFonds?: Maybe<Array<Maybe<PortfolioFond>>>;
  portfolioBonds?: Maybe<Array<Maybe<PortfolioBond>>>;
};

export type Currency = {
  __typename?: 'Currency';
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  ticket?: Maybe<Scalars['String']>;
  sign?: Maybe<Scalars['String']>;
  rubRate: Scalars['Decimal'];
  dollarRate: Scalars['Decimal'];
  euroRate: Scalars['Decimal'];
  currencyOperations?: Maybe<Array<Maybe<CurrencyOperation>>>;
  assetOperations?: Maybe<Array<Maybe<AssetOperation>>>;
};

export type Stock = {
  __typename?: 'Stock';
  id: Scalars['UUID'];
  ticket: Scalars['String'];
  shortName: Scalars['String'];
  marketFullName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  latName?: Maybe<Scalars['String']>;
  lotSize: Scalars['Int'];
  issueSize: Scalars['Long'];
  prevClosePrice: Scalars['Decimal'];
  capitalization: Scalars['Long'];
  description?: Maybe<Scalars['String']>;
  sector?: Maybe<Scalars['String']>;
  price: Scalars['Decimal'];
  priceChange: Scalars['Decimal'];
  updateTime: Scalars['DateTime'];
  averageProfit: Scalars['Decimal'];
  risk: Scalars['Decimal'];
  sharpeRatio: Scalars['Decimal'];
  portfolioStocks?: Maybe<Array<Maybe<PortfolioStock>>>;
  dividends?: Maybe<Array<Maybe<Dividend>>>;
};

export type Fond = {
  __typename?: 'Fond';
  id: Scalars['UUID'];
  ticket: Scalars['String'];
  shortName: Scalars['String'];
  marketFullName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  latName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Decimal'];
  priceChange: Scalars['Decimal'];
  updateTime: Scalars['DateTime'];
  averageProfit: Scalars['Decimal'];
  risk: Scalars['Decimal'];
  sharpeRatio: Scalars['Decimal'];
  portfolioFonds?: Maybe<Array<Maybe<PortfolioFond>>>;
};

export type Bond = {
  __typename?: 'Bond';
  id: Scalars['UUID'];
  ticket: Scalars['String'];
  shortName: Scalars['String'];
  marketFullName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  latName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  percent: Scalars['Decimal'];
  price: Scalars['Decimal'];
  percentChange: Scalars['Decimal'];
  updateTime: Scalars['DateTime'];
  amortizationDate: Scalars['DateTime'];
  nominal: Scalars['Decimal'];
  coupon: Scalars['Decimal'];
  couponPercent: Scalars['Decimal'];
  averageProfit: Scalars['Decimal'];
  risk: Scalars['Decimal'];
  sharpeRatio: Scalars['Decimal'];
  portfolioBonds?: Maybe<Array<Maybe<PortfolioBond>>>;
  coupons?: Maybe<Array<Maybe<Coupon>>>;
};

export type DefaultPayloadOfListOfAssetOperation = {
  __typename?: 'DefaultPayloadOfListOfAssetOperation';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<Maybe<AssetOperation>>>;
};


export type DefaultPayloadOfListOfCurrencyOperation = {
  __typename?: 'DefaultPayloadOfListOfCurrencyOperation';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<Maybe<CurrencyOperation>>>;
};

export type DefaultPayloadOfPortfolio = {
  __typename?: 'DefaultPayloadOfPortfolio';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Portfolio>;
};

export type Candle = {
  __typename?: 'Candle';
  open: Scalars['Decimal'];
  close: Scalars['Decimal'];
  high: Scalars['Decimal'];
  low: Scalars['Decimal'];
  value: Scalars['Decimal'];
  volume: Scalars['Decimal'];
  begin: Scalars['DateTime'];
  end: Scalars['DateTime'];
};


export enum CandleInterval {
  Week = 'WEEK',
  Day = 'DAY',
  Month = 'MONTH',
  Hour = 'HOUR'
}

export type DefaultPayloadOfListOfCostGraphData = {
  __typename?: 'DefaultPayloadOfListOfCostGraphData';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<Maybe<CostGraphData>>>;
};

export type AssetOperation = {
  __typename?: 'AssetOperation';
  id: Scalars['UUID'];
  ticket: Scalars['String'];
  amount: Scalars['Int'];
  price: Scalars['Decimal'];
  total: Scalars['Decimal'];
  currencyId: Scalars['UUID'];
  currency?: Maybe<Currency>;
  date: Scalars['DateTime'];
  portfolio?: Maybe<Portfolio>;
  portfolioId: Scalars['UUID'];
  assetType: AssetType;
  assetAction: AssetAction;
};

export type CurrencyOperation = {
  __typename?: 'CurrencyOperation';
  id: Scalars['UUID'];
  currencyId: Scalars['UUID'];
  currency?: Maybe<Currency>;
  total: Scalars['Decimal'];
  date: Scalars['DateTime'];
  operationType: OperationType;
  portfolioId: Scalars['UUID'];
  portfolio?: Maybe<Portfolio>;
  ticket?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
};

export type DefaultPayloadOfListOfPaymentData = {
  __typename?: 'DefaultPayloadOfListOfPaymentData';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<Maybe<PaymentData>>>;
};

export type DefaultPayloadOfListOfAssetShare = {
  __typename?: 'DefaultPayloadOfListOfAssetShare';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Array<Maybe<AssetShare>>>;
};

export type DefaultPayloadOfHerfindahlHirschmanIndex = {
  __typename?: 'DefaultPayloadOfHerfindahlHirschmanIndex';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<HerfindahlHirschmanIndex>;
};

export type DefaultPayloadOfSharpeRatio = {
  __typename?: 'DefaultPayloadOfSharpeRatio';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  result?: Maybe<SharpeRatio>;
};

export type DefaultPayload = {
  __typename?: 'DefaultPayload';
  isSuccess: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type AddPortfolioInput = {
  name?: Maybe<Scalars['String']>;
  typeId: Scalars['UUID'];
};

export type RemovePortfolioInput = {
  portfolioId: Scalars['UUID'];
};

export type UpdatePortfolioInput = {
  portfolioId: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  typeId: Scalars['UUID'];
};

export type AssetOperationInput = {
  ticket?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  price: Scalars['Decimal'];
  currencyId: Scalars['UUID'];
  date: Scalars['DateTime'];
  portfolioId: Scalars['UUID'];
  assetType: AssetType;
  assetAction: AssetAction;
};

export type CurrencyOperationInput = {
  currencyId: Scalars['UUID'];
  total: Scalars['Decimal'];
  date: Scalars['DateTime'];
  operationType: OperationType;
  portfolioId: Scalars['UUID'];
  ticket?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
};

export enum OperationType {
  RefillAction = 'REFILL_ACTION',
  DividendPayment = 'DIVIDEND_PAYMENT',
  CouponPayment = 'COUPON_PAYMENT',
  WithdrawalAction = 'WITHDRAWAL_ACTION',
  Commission = 'COMMISSION'
}

export enum AssetAction {
  BuyAction = 'BUY_ACTION',
  SellAction = 'SELL_ACTION'
}

export enum AssetType {
  Stock = 'STOCK',
  Fond = 'FOND',
  Bond = 'BOND'
}


export type SharpeRatio = {
  __typename?: 'SharpeRatio';
  value: Scalars['Decimal'];
  risk: Scalars['Decimal'];
  profit: Scalars['Decimal'];
  safeRate: Scalars['Decimal'];
  interpretation: SharpRatioInterpretation;
};

export type HerfindahlHirschmanIndex = {
  __typename?: 'HerfindahlHirschmanIndex';
  value: Scalars['Decimal'];
  interpretation: HerfindahlHirschmanIndexInterpretation;
};

export type AssetShare = {
  __typename?: 'AssetShare';
  ticket?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  percent: Scalars['Decimal'];
  riskPercent: Scalars['Decimal'];
};

export type PaymentData = {
  __typename?: 'PaymentData';
  assetName?: Maybe<Scalars['String']>;
  ticket?: Maybe<Scalars['String']>;
  paymentValue: Scalars['Decimal'];
  amount: Scalars['Int'];
  total: Scalars['Decimal'];
  date: Scalars['DateTime'];
  currency?: Maybe<Currency>;
};

export type CostGraphData = {
  __typename?: 'CostGraphData';
  portfolioId: Scalars['UUID'];
  portfolioName?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Maybe<TimeValue>>>;
};

export type Coupon = {
  __typename?: 'Coupon';
  id: Scalars['UUID'];
  couponDate: Scalars['DateTime'];
  value: Scalars['Decimal'];
  valuePercent: Scalars['Decimal'];
  currency?: Maybe<Currency>;
  currencyId: Scalars['UUID'];
  bond?: Maybe<Bond>;
  bondId: Scalars['UUID'];
};

export type Dividend = {
  __typename?: 'Dividend';
  id: Scalars['UUID'];
  registryCloseDate: Scalars['DateTime'];
  value: Scalars['Decimal'];
  currency?: Maybe<Currency>;
  currencyId: Scalars['UUID'];
  stock?: Maybe<Stock>;
  stockId: Scalars['UUID'];
};


export type PortfolioBond = {
  __typename?: 'PortfolioBond';
  id: Scalars['UUID'];
  amount: Scalars['Int'];
  boughtPrice: Scalars['Decimal'];
  cost: Scalars['Decimal'];
  paperProfit: Scalars['Decimal'];
  paperProfitPercent: Scalars['Decimal'];
  portfolio?: Maybe<Portfolio>;
  portfolioId: Scalars['UUID'];
  bondId: Scalars['UUID'];
  bond?: Maybe<Bond>;
};

export type PortfolioFond = {
  __typename?: 'PortfolioFond';
  id: Scalars['UUID'];
  amount: Scalars['Int'];
  boughtPrice: Scalars['Decimal'];
  cost: Scalars['Decimal'];
  paperProfit: Scalars['Decimal'];
  paperProfitPercent: Scalars['Decimal'];
  portfolio?: Maybe<Portfolio>;
  portfolioId: Scalars['UUID'];
  fondId: Scalars['UUID'];
  fond?: Maybe<Fond>;
};

export type PortfolioStock = {
  __typename?: 'PortfolioStock';
  id: Scalars['UUID'];
  amount: Scalars['Int'];
  boughtPrice: Scalars['Decimal'];
  cost: Scalars['Decimal'];
  paperProfit: Scalars['Decimal'];
  paperProfitPercent: Scalars['Decimal'];
  portfolio?: Maybe<Portfolio>;
  portfolioId: Scalars['UUID'];
  stockId: Scalars['UUID'];
  stock?: Maybe<Stock>;
};

export type DailyPortfolioReport = {
  __typename?: 'DailyPortfolioReport';
  id: Scalars['UUID'];
  cost: Scalars['Decimal'];
  investedSum: Scalars['Decimal'];
  paperProfit: Scalars['Decimal'];
  paperProfitPercent: Scalars['Decimal'];
  dividendProfit: Scalars['Decimal'];
  dividendProfitPercent: Scalars['Decimal'];
  rubBalance: Scalars['Decimal'];
  dollarBalance: Scalars['Decimal'];
  euroBalance: Scalars['Decimal'];
  date: Scalars['DateTime'];
  portfolioId: Scalars['UUID'];
  portfolio?: Maybe<Portfolio>;
};

export type TimeValue = {
  __typename?: 'TimeValue';
  date: Scalars['Long'];
  value: Scalars['Decimal'];
};

export enum HerfindahlHirschmanIndexInterpretation {
  Excellent = 'EXCELLENT',
  Good = 'GOOD',
  Normal = 'NORMAL',
  Bad = 'BAD',
  Terrible = 'TERRIBLE'
}

export enum SharpRatioInterpretation {
  Excellent = 'EXCELLENT',
  Good = 'GOOD',
  Normal = 'NORMAL',
  Bad = 'BAD',
  Terrible = 'TERRIBLE'
}

export type PortfoliosCostGraphQueryVariables = Exact<{
  portfolioIds?: Maybe<Array<Scalars['UUID']> | Scalars['UUID']>;
}>;


export type PortfoliosCostGraphQuery = (
  { __typename?: 'Query' }
  & { portfoliosCostGraph?: Maybe<(
    { __typename?: 'DefaultPayloadOfListOfCostGraphData' }
    & Pick<DefaultPayloadOfListOfCostGraphData, 'isSuccess' | 'message'>
    & { result?: Maybe<Array<Maybe<(
      { __typename?: 'CostGraphData' }
      & Pick<CostGraphData, 'portfolioId' | 'portfolioName'>
      & { data?: Maybe<Array<Maybe<(
        { __typename?: 'TimeValue' }
        & Pick<TimeValue, 'date' | 'value'>
      )>>> }
    )>>> }
  )> }
);

export type SparklineQueryVariables = Exact<{
  ticket: Scalars['String'];
  from: Scalars['DateTime'];
  interval: CandleInterval;
}>;


export type SparklineQuery = (
  { __typename?: 'Query' }
  & { stockCandles?: Maybe<Array<Maybe<(
    { __typename?: 'Candle' }
    & Pick<Candle, 'begin' | 'close'>
  )>>> }
);

export type StockGraphQueryVariables = Exact<{
  ticket: Scalars['String'];
  from: Scalars['DateTime'];
  interval: CandleInterval;
}>;


export type StockGraphQuery = (
  { __typename?: 'Query' }
  & { stockCandles?: Maybe<Array<Maybe<(
    { __typename?: 'Candle' }
    & Pick<Candle, 'begin' | 'close' | 'volume'>
  )>>> }
);

export type PortfolioAssetSharesQueryVariables = Exact<{
  portfolioIds?: Maybe<Array<Scalars['UUID']> | Scalars['UUID']>;
}>;


export type PortfolioAssetSharesQuery = (
  { __typename?: 'Query' }
  & { portfolioAssetShares?: Maybe<(
    { __typename?: 'DefaultPayloadOfListOfAssetShare' }
    & Pick<DefaultPayloadOfListOfAssetShare, 'isSuccess' | 'message'>
    & { result?: Maybe<Array<Maybe<(
      { __typename?: 'AssetShare' }
      & Pick<AssetShare, 'ticket' | 'name' | 'percent' | 'riskPercent'>
    )>>> }
  )> }
);

export type PortfolioTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type PortfolioTypesQuery = (
  { __typename?: 'Query' }
  & { portfolioTypes?: Maybe<Array<Maybe<(
    { __typename?: 'PortfolioType' }
    & Pick<PortfolioType, 'id' | 'name' | 'iconUrl'>
  )>>> }
);

export type CreatePortfolioMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  portfolioType: Scalars['UUID'];
}>;


export type CreatePortfolioMutation = (
  { __typename?: 'Mutation' }
  & { addPortfolio?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrenciesQuery = (
  { __typename?: 'Query' }
  & { currencies?: Maybe<Array<Maybe<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'name' | 'ticket' | 'sign'>
  )>>> }
);

export type ParseAssetReportQueryVariables = Exact<{
  report: Scalars['Upload'];
}>;


export type ParseAssetReportQuery = (
  { __typename?: 'Query' }
  & { parseAssetReport?: Maybe<Array<Maybe<(
    { __typename?: 'AssetOperation' }
    & Pick<AssetOperation, 'ticket' | 'assetType' | 'assetAction' | 'amount' | 'price' | 'total' | 'date'>
    & { currency?: Maybe<(
      { __typename?: 'Currency' }
      & Pick<Currency, 'id' | 'sign'>
    )> }
  )>>> }
);

export type ParseCurrencyReportQueryVariables = Exact<{
  report?: Maybe<Scalars['Upload']>;
}>;


export type ParseCurrencyReportQuery = (
  { __typename?: 'Query' }
  & { parseCurrencyReport?: Maybe<Array<Maybe<(
    { __typename?: 'CurrencyOperation' }
    & Pick<CurrencyOperation, 'ticket' | 'total' | 'amount' | 'operationType' | 'date'>
    & { currency?: Maybe<(
      { __typename?: 'Currency' }
      & Pick<Currency, 'id' | 'sign'>
    )> }
  )>>> }
);

export type CreateAssetOperationsMutationVariables = Exact<{
  assetOperations?: Maybe<Array<Maybe<AssetOperationInput>> | Maybe<AssetOperationInput>>;
}>;


export type CreateAssetOperationsMutation = (
  { __typename?: 'Mutation' }
  & { createAssetOperations?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type CreateCurrencyOperationsMutationVariables = Exact<{
  currencyOperations?: Maybe<Array<Maybe<CurrencyOperationInput>> | Maybe<CurrencyOperationInput>>;
}>;


export type CreateCurrencyOperationsMutation = (
  { __typename?: 'Mutation' }
  & { createCurrencyOperations?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type PortfoliosQueryVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosQuery = (
  { __typename?: 'Query' }
  & { portfolios?: Maybe<Array<Maybe<(
    { __typename?: 'Portfolio' }
    & Pick<Portfolio, 'id' | 'name'>
    & { portfolioType?: Maybe<(
      { __typename?: 'PortfolioType' }
      & Pick<PortfolioType, 'iconUrl'>
    )> }
  )>>> }
);

export type CreateAssetOperationMutationVariables = Exact<{
  ticket?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  assetAction: AssetAction;
  assetType: AssetType;
  currencyId: Scalars['UUID'];
  date: Scalars['DateTime'];
  portfolioId: Scalars['UUID'];
  price: Scalars['Decimal'];
}>;


export type CreateAssetOperationMutation = (
  { __typename?: 'Mutation' }
  & { createAssetOperation?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type CreateCurrencyOperationMutationVariables = Exact<{
  ticket?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  operationType: OperationType;
  currencyId: Scalars['UUID'];
  date: Scalars['DateTime'];
  portfolioId: Scalars['UUID'];
  total: Scalars['Decimal'];
}>;


export type CreateCurrencyOperationMutation = (
  { __typename?: 'Mutation' }
  & { createCurrencyOperation?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type GetAssetOperationsQueryVariables = Exact<{
  portfolioId: Scalars['UUID'];
}>;


export type GetAssetOperationsQuery = (
  { __typename?: 'Query' }
  & { assetOperations?: Maybe<(
    { __typename?: 'DefaultPayloadOfListOfAssetOperation' }
    & Pick<DefaultPayloadOfListOfAssetOperation, 'isSuccess' | 'message'>
    & { result?: Maybe<Array<Maybe<(
      { __typename?: 'AssetOperation' }
      & Pick<AssetOperation, 'id' | 'assetAction' | 'ticket' | 'amount' | 'price' | 'total' | 'date' | 'assetType'>
      & { currency?: Maybe<(
        { __typename?: 'Currency' }
        & Pick<Currency, 'name' | 'sign' | 'ticket'>
      )>, portfolio?: Maybe<(
        { __typename?: 'Portfolio' }
        & Pick<Portfolio, 'name'>
        & { portfolioType?: Maybe<(
          { __typename?: 'PortfolioType' }
          & Pick<PortfolioType, 'iconUrl'>
        )> }
      )> }
    )>>> }
  )> }
);

export type GetCurrencyOperationsQueryVariables = Exact<{
  portfolioId: Scalars['UUID'];
}>;


export type GetCurrencyOperationsQuery = (
  { __typename?: 'Query' }
  & { currencyOperations?: Maybe<(
    { __typename?: 'DefaultPayloadOfListOfCurrencyOperation' }
    & Pick<DefaultPayloadOfListOfCurrencyOperation, 'isSuccess' | 'message'>
    & { result?: Maybe<Array<Maybe<(
      { __typename?: 'CurrencyOperation' }
      & Pick<CurrencyOperation, 'id' | 'total' | 'date' | 'operationType' | 'ticket' | 'amount'>
      & { currency?: Maybe<(
        { __typename?: 'Currency' }
        & Pick<Currency, 'name' | 'sign' | 'ticket'>
      )>, portfolio?: Maybe<(
        { __typename?: 'Portfolio' }
        & Pick<Portfolio, 'id' | 'name'>
        & { portfolioType?: Maybe<(
          { __typename?: 'PortfolioType' }
          & Pick<PortfolioType, 'iconUrl'>
        )> }
      )> }
    )>>> }
  )> }
);

export type RemoveAssetOperationMutationVariables = Exact<{
  assetOperationId: Scalars['UUID'];
}>;


export type RemoveAssetOperationMutation = (
  { __typename?: 'Mutation' }
  & { removeAssetOperation?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type RemoveCurrencyOperationMutationVariables = Exact<{
  currencyOperationId: Scalars['UUID'];
}>;


export type RemoveCurrencyOperationMutation = (
  { __typename?: 'Mutation' }
  & { removeCurrencyOperation?: Maybe<(
    { __typename?: 'DefaultPayload' }
    & Pick<DefaultPayload, 'isSuccess' | 'message'>
  )> }
);

export type StocksQueryVariables = Exact<{ [key: string]: never; }>;


export type StocksQuery = (
  { __typename?: 'Query' }
  & { stocks?: Maybe<Array<Maybe<(
    { __typename?: 'Stock' }
    & Pick<Stock, 'id' | 'ticket' | 'shortName' | 'price' | 'priceChange' | 'lotSize' | 'capitalization' | 'sector' | 'updateTime'>
  )>>> }
);

export type FondsQueryVariables = Exact<{ [key: string]: never; }>;


export type FondsQuery = (
  { __typename?: 'Query' }
  & { fonds?: Maybe<Array<Maybe<(
    { __typename?: 'Fond' }
    & Pick<Fond, 'id' | 'ticket' | 'shortName' | 'price' | 'priceChange' | 'updateTime'>
  )>>> }
);

export type BondsQueryVariables = Exact<{ [key: string]: never; }>;


export type BondsQuery = (
  { __typename?: 'Query' }
  & { bonds?: Maybe<Array<Maybe<(
    { __typename?: 'Bond' }
    & Pick<Bond, 'id' | 'ticket' | 'shortName' | 'price' | 'percent' | 'percentChange' | 'coupon' | 'amortizationDate' | 'nominal' | 'updateTime'>
  )>>> }
);

export type FuturePaymentsQueryVariables = Exact<{
  portfolioIds?: Maybe<Array<Scalars['UUID']> | Scalars['UUID']>;
}>;


export type FuturePaymentsQuery = (
  { __typename?: 'Query' }
  & { futurePayments?: Maybe<(
    { __typename?: 'DefaultPayloadOfListOfPaymentData' }
    & Pick<DefaultPayloadOfListOfPaymentData, 'isSuccess' | 'message'>
    & { result?: Maybe<Array<Maybe<(
      { __typename?: 'PaymentData' }
      & Pick<PaymentData, 'ticket' | 'assetName' | 'paymentValue' | 'amount' | 'total' | 'date'>
      & { currency?: Maybe<(
        { __typename?: 'Currency' }
        & Pick<Currency, 'sign'>
      )> }
    )>>> }
  )> }
);

export type AggregatePortfoliosQueryVariables = Exact<{
  portfolioIds?: Maybe<Array<Scalars['UUID']> | Scalars['UUID']>;
}>;


export type AggregatePortfoliosQuery = (
  { __typename?: 'Query' }
  & { aggregatePortfolios?: Maybe<(
    { __typename?: 'DefaultPayloadOfPortfolio' }
    & Pick<DefaultPayloadOfPortfolio, 'isSuccess' | 'message'>
    & { result?: Maybe<(
      { __typename?: 'Portfolio' }
      & Pick<Portfolio, 'cost' | 'investedSum' | 'paperProfit' | 'paperProfitPercent' | 'rubBalance' | 'dollarBalance' | 'euroBalance' | 'dividendProfit' | 'dividendProfitPercent'>
      & { portfolioStocks?: Maybe<Array<Maybe<(
        { __typename?: 'PortfolioStock' }
        & Pick<PortfolioStock, 'id' | 'amount' | 'cost' | 'boughtPrice' | 'paperProfit' | 'paperProfitPercent'>
        & { stock?: Maybe<(
          { __typename?: 'Stock' }
          & Pick<Stock, 'ticket' | 'shortName' | 'price' | 'priceChange' | 'updateTime'>
        )> }
      )>>>, portfolioFonds?: Maybe<Array<Maybe<(
        { __typename?: 'PortfolioFond' }
        & Pick<PortfolioFond, 'id' | 'amount' | 'cost' | 'boughtPrice' | 'paperProfit' | 'paperProfitPercent'>
        & { fond?: Maybe<(
          { __typename?: 'Fond' }
          & Pick<Fond, 'ticket' | 'shortName' | 'price' | 'priceChange' | 'updateTime'>
        )> }
      )>>>, portfolioBonds?: Maybe<Array<Maybe<(
        { __typename?: 'PortfolioBond' }
        & Pick<PortfolioBond, 'id' | 'cost' | 'amount' | 'boughtPrice' | 'paperProfit' | 'paperProfitPercent'>
        & { bond?: Maybe<(
          { __typename?: 'Bond' }
          & Pick<Bond, 'ticket' | 'percent' | 'percentChange' | 'price' | 'amortizationDate' | 'coupon' | 'nominal' | 'shortName' | 'updateTime'>
        )> }
      )>>> }
    )> }
  )> }
);

export type HerfindahlHirschmanIndexQueryVariables = Exact<{
  portfolioIds?: Maybe<Array<Scalars['UUID']> | Scalars['UUID']>;
}>;


export type HerfindahlHirschmanIndexQuery = (
  { __typename?: 'Query' }
  & { herfindahlHirschmanIndex?: Maybe<(
    { __typename?: 'DefaultPayloadOfHerfindahlHirschmanIndex' }
    & Pick<DefaultPayloadOfHerfindahlHirschmanIndex, 'isSuccess' | 'message'>
    & { result?: Maybe<(
      { __typename?: 'HerfindahlHirschmanIndex' }
      & Pick<HerfindahlHirschmanIndex, 'value' | 'interpretation'>
    )> }
  )> }
);

export type SharpeRatioQueryVariables = Exact<{
  portfolioIds?: Maybe<Array<Scalars['UUID']> | Scalars['UUID']>;
}>;


export type SharpeRatioQuery = (
  { __typename?: 'Query' }
  & { sharpeRatio?: Maybe<(
    { __typename?: 'DefaultPayloadOfSharpeRatio' }
    & Pick<DefaultPayloadOfSharpeRatio, 'isSuccess' | 'message'>
    & { result?: Maybe<(
      { __typename?: 'SharpeRatio' }
      & Pick<SharpeRatio, 'value' | 'risk' | 'profit' | 'safeRate' | 'interpretation'>
    )> }
  )> }
);

export type SecretQueryVariables = Exact<{ [key: string]: never; }>;


export type SecretQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'secretData'>
);


export const PortfoliosCostGraphDocument = gql`
    query portfoliosCostGraph($portfolioIds: [UUID!]) {
  portfoliosCostGraph(portfolioIds: $portfolioIds) {
    isSuccess
    message
    result {
      portfolioId
      portfolioName
      data {
        date
        value
      }
    }
  }
}
    `;

/**
 * __usePortfoliosCostGraphQuery__
 *
 * To run a query within a React component, call `usePortfoliosCostGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfoliosCostGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfoliosCostGraphQuery({
 *   variables: {
 *      portfolioIds: // value for 'portfolioIds'
 *   },
 * });
 */
export function usePortfoliosCostGraphQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PortfoliosCostGraphQuery, PortfoliosCostGraphQueryVariables>) {
        return ApolloReactHooks.useQuery<PortfoliosCostGraphQuery, PortfoliosCostGraphQueryVariables>(PortfoliosCostGraphDocument, baseOptions);
      }
export function usePortfoliosCostGraphLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PortfoliosCostGraphQuery, PortfoliosCostGraphQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PortfoliosCostGraphQuery, PortfoliosCostGraphQueryVariables>(PortfoliosCostGraphDocument, baseOptions);
        }
export type PortfoliosCostGraphQueryHookResult = ReturnType<typeof usePortfoliosCostGraphQuery>;
export type PortfoliosCostGraphLazyQueryHookResult = ReturnType<typeof usePortfoliosCostGraphLazyQuery>;
export type PortfoliosCostGraphQueryResult = ApolloReactCommon.QueryResult<PortfoliosCostGraphQuery, PortfoliosCostGraphQueryVariables>;
export const SparklineDocument = gql`
    query Sparkline($ticket: String!, $from: DateTime!, $interval: CandleInterval!) {
  stockCandles(ticket: $ticket, from: $from, interval: $interval) {
    begin
    close
  }
}
    `;

/**
 * __useSparklineQuery__
 *
 * To run a query within a React component, call `useSparklineQuery` and pass it any options that fit your needs.
 * When your component renders, `useSparklineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSparklineQuery({
 *   variables: {
 *      ticket: // value for 'ticket'
 *      from: // value for 'from'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useSparklineQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SparklineQuery, SparklineQueryVariables>) {
        return ApolloReactHooks.useQuery<SparklineQuery, SparklineQueryVariables>(SparklineDocument, baseOptions);
      }
export function useSparklineLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SparklineQuery, SparklineQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SparklineQuery, SparklineQueryVariables>(SparklineDocument, baseOptions);
        }
export type SparklineQueryHookResult = ReturnType<typeof useSparklineQuery>;
export type SparklineLazyQueryHookResult = ReturnType<typeof useSparklineLazyQuery>;
export type SparklineQueryResult = ApolloReactCommon.QueryResult<SparklineQuery, SparklineQueryVariables>;
export const StockGraphDocument = gql`
    query StockGraph($ticket: String!, $from: DateTime!, $interval: CandleInterval!) {
  stockCandles(ticket: $ticket, from: $from, interval: $interval) {
    begin
    close
    volume
  }
}
    `;

/**
 * __useStockGraphQuery__
 *
 * To run a query within a React component, call `useStockGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useStockGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStockGraphQuery({
 *   variables: {
 *      ticket: // value for 'ticket'
 *      from: // value for 'from'
 *      interval: // value for 'interval'
 *   },
 * });
 */
export function useStockGraphQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StockGraphQuery, StockGraphQueryVariables>) {
        return ApolloReactHooks.useQuery<StockGraphQuery, StockGraphQueryVariables>(StockGraphDocument, baseOptions);
      }
export function useStockGraphLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StockGraphQuery, StockGraphQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StockGraphQuery, StockGraphQueryVariables>(StockGraphDocument, baseOptions);
        }
export type StockGraphQueryHookResult = ReturnType<typeof useStockGraphQuery>;
export type StockGraphLazyQueryHookResult = ReturnType<typeof useStockGraphLazyQuery>;
export type StockGraphQueryResult = ApolloReactCommon.QueryResult<StockGraphQuery, StockGraphQueryVariables>;
export const PortfolioAssetSharesDocument = gql`
    query portfolioAssetShares($portfolioIds: [UUID!]) {
  portfolioAssetShares(portfolioIds: $portfolioIds) {
    isSuccess
    message
    result {
      ticket
      name
      percent
      riskPercent
    }
  }
}
    `;

/**
 * __usePortfolioAssetSharesQuery__
 *
 * To run a query within a React component, call `usePortfolioAssetSharesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioAssetSharesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioAssetSharesQuery({
 *   variables: {
 *      portfolioIds: // value for 'portfolioIds'
 *   },
 * });
 */
export function usePortfolioAssetSharesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PortfolioAssetSharesQuery, PortfolioAssetSharesQueryVariables>) {
        return ApolloReactHooks.useQuery<PortfolioAssetSharesQuery, PortfolioAssetSharesQueryVariables>(PortfolioAssetSharesDocument, baseOptions);
      }
export function usePortfolioAssetSharesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PortfolioAssetSharesQuery, PortfolioAssetSharesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PortfolioAssetSharesQuery, PortfolioAssetSharesQueryVariables>(PortfolioAssetSharesDocument, baseOptions);
        }
export type PortfolioAssetSharesQueryHookResult = ReturnType<typeof usePortfolioAssetSharesQuery>;
export type PortfolioAssetSharesLazyQueryHookResult = ReturnType<typeof usePortfolioAssetSharesLazyQuery>;
export type PortfolioAssetSharesQueryResult = ApolloReactCommon.QueryResult<PortfolioAssetSharesQuery, PortfolioAssetSharesQueryVariables>;
export const PortfolioTypesDocument = gql`
    query portfolioTypes {
  portfolioTypes {
    id
    name
    iconUrl
  }
}
    `;

/**
 * __usePortfolioTypesQuery__
 *
 * To run a query within a React component, call `usePortfolioTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePortfolioTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PortfolioTypesQuery, PortfolioTypesQueryVariables>) {
        return ApolloReactHooks.useQuery<PortfolioTypesQuery, PortfolioTypesQueryVariables>(PortfolioTypesDocument, baseOptions);
      }
export function usePortfolioTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PortfolioTypesQuery, PortfolioTypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PortfolioTypesQuery, PortfolioTypesQueryVariables>(PortfolioTypesDocument, baseOptions);
        }
export type PortfolioTypesQueryHookResult = ReturnType<typeof usePortfolioTypesQuery>;
export type PortfolioTypesLazyQueryHookResult = ReturnType<typeof usePortfolioTypesLazyQuery>;
export type PortfolioTypesQueryResult = ApolloReactCommon.QueryResult<PortfolioTypesQuery, PortfolioTypesQueryVariables>;
export const CreatePortfolioDocument = gql`
    mutation createPortfolio($name: String, $portfolioType: UUID!) {
  addPortfolio(input: {name: $name, typeId: $portfolioType}) {
    isSuccess
    message
  }
}
    `;
export type CreatePortfolioMutationFn = ApolloReactCommon.MutationFunction<CreatePortfolioMutation, CreatePortfolioMutationVariables>;

/**
 * __useCreatePortfolioMutation__
 *
 * To run a mutation, you first call `useCreatePortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPortfolioMutation, { data, loading, error }] = useCreatePortfolioMutation({
 *   variables: {
 *      name: // value for 'name'
 *      portfolioType: // value for 'portfolioType'
 *   },
 * });
 */
export function useCreatePortfolioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePortfolioMutation, CreatePortfolioMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePortfolioMutation, CreatePortfolioMutationVariables>(CreatePortfolioDocument, baseOptions);
      }
export type CreatePortfolioMutationHookResult = ReturnType<typeof useCreatePortfolioMutation>;
export type CreatePortfolioMutationResult = ApolloReactCommon.MutationResult<CreatePortfolioMutation>;
export type CreatePortfolioMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePortfolioMutation, CreatePortfolioMutationVariables>;
export const GetCurrenciesDocument = gql`
    query getCurrencies {
  currencies {
    id
    name
    ticket
    sign
  }
}
    `;

/**
 * __useGetCurrenciesQuery__
 *
 * To run a query within a React component, call `useGetCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrenciesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(GetCurrenciesDocument, baseOptions);
      }
export function useGetCurrenciesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(GetCurrenciesDocument, baseOptions);
        }
export type GetCurrenciesQueryHookResult = ReturnType<typeof useGetCurrenciesQuery>;
export type GetCurrenciesLazyQueryHookResult = ReturnType<typeof useGetCurrenciesLazyQuery>;
export type GetCurrenciesQueryResult = ApolloReactCommon.QueryResult<GetCurrenciesQuery, GetCurrenciesQueryVariables>;
export const ParseAssetReportDocument = gql`
    query parseAssetReport($report: Upload!) {
  parseAssetReport(report: $report) {
    ticket
    assetType
    assetAction
    amount
    price
    total
    currency {
      id
      sign
    }
    date
  }
}
    `;

/**
 * __useParseAssetReportQuery__
 *
 * To run a query within a React component, call `useParseAssetReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useParseAssetReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParseAssetReportQuery({
 *   variables: {
 *      report: // value for 'report'
 *   },
 * });
 */
export function useParseAssetReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParseAssetReportQuery, ParseAssetReportQueryVariables>) {
        return ApolloReactHooks.useQuery<ParseAssetReportQuery, ParseAssetReportQueryVariables>(ParseAssetReportDocument, baseOptions);
      }
export function useParseAssetReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParseAssetReportQuery, ParseAssetReportQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ParseAssetReportQuery, ParseAssetReportQueryVariables>(ParseAssetReportDocument, baseOptions);
        }
export type ParseAssetReportQueryHookResult = ReturnType<typeof useParseAssetReportQuery>;
export type ParseAssetReportLazyQueryHookResult = ReturnType<typeof useParseAssetReportLazyQuery>;
export type ParseAssetReportQueryResult = ApolloReactCommon.QueryResult<ParseAssetReportQuery, ParseAssetReportQueryVariables>;
export const ParseCurrencyReportDocument = gql`
    query parseCurrencyReport($report: Upload) {
  parseCurrencyReport(report: $report) {
    ticket
    currency {
      id
      sign
    }
    total
    amount
    operationType
    date
    total
  }
}
    `;

/**
 * __useParseCurrencyReportQuery__
 *
 * To run a query within a React component, call `useParseCurrencyReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useParseCurrencyReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParseCurrencyReportQuery({
 *   variables: {
 *      report: // value for 'report'
 *   },
 * });
 */
export function useParseCurrencyReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParseCurrencyReportQuery, ParseCurrencyReportQueryVariables>) {
        return ApolloReactHooks.useQuery<ParseCurrencyReportQuery, ParseCurrencyReportQueryVariables>(ParseCurrencyReportDocument, baseOptions);
      }
export function useParseCurrencyReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParseCurrencyReportQuery, ParseCurrencyReportQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ParseCurrencyReportQuery, ParseCurrencyReportQueryVariables>(ParseCurrencyReportDocument, baseOptions);
        }
export type ParseCurrencyReportQueryHookResult = ReturnType<typeof useParseCurrencyReportQuery>;
export type ParseCurrencyReportLazyQueryHookResult = ReturnType<typeof useParseCurrencyReportLazyQuery>;
export type ParseCurrencyReportQueryResult = ApolloReactCommon.QueryResult<ParseCurrencyReportQuery, ParseCurrencyReportQueryVariables>;
export const CreateAssetOperationsDocument = gql`
    mutation createAssetOperations($assetOperations: [AssetOperationInput]) {
  createAssetOperations(assetOperations: $assetOperations) {
    isSuccess
    message
  }
}
    `;
export type CreateAssetOperationsMutationFn = ApolloReactCommon.MutationFunction<CreateAssetOperationsMutation, CreateAssetOperationsMutationVariables>;

/**
 * __useCreateAssetOperationsMutation__
 *
 * To run a mutation, you first call `useCreateAssetOperationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetOperationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetOperationsMutation, { data, loading, error }] = useCreateAssetOperationsMutation({
 *   variables: {
 *      assetOperations: // value for 'assetOperations'
 *   },
 * });
 */
export function useCreateAssetOperationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAssetOperationsMutation, CreateAssetOperationsMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAssetOperationsMutation, CreateAssetOperationsMutationVariables>(CreateAssetOperationsDocument, baseOptions);
      }
export type CreateAssetOperationsMutationHookResult = ReturnType<typeof useCreateAssetOperationsMutation>;
export type CreateAssetOperationsMutationResult = ApolloReactCommon.MutationResult<CreateAssetOperationsMutation>;
export type CreateAssetOperationsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAssetOperationsMutation, CreateAssetOperationsMutationVariables>;
export const CreateCurrencyOperationsDocument = gql`
    mutation createCurrencyOperations($currencyOperations: [CurrencyOperationInput]) {
  createCurrencyOperations(currencyOperations: $currencyOperations) {
    isSuccess
    message
  }
}
    `;
export type CreateCurrencyOperationsMutationFn = ApolloReactCommon.MutationFunction<CreateCurrencyOperationsMutation, CreateCurrencyOperationsMutationVariables>;

/**
 * __useCreateCurrencyOperationsMutation__
 *
 * To run a mutation, you first call `useCreateCurrencyOperationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCurrencyOperationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCurrencyOperationsMutation, { data, loading, error }] = useCreateCurrencyOperationsMutation({
 *   variables: {
 *      currencyOperations: // value for 'currencyOperations'
 *   },
 * });
 */
export function useCreateCurrencyOperationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCurrencyOperationsMutation, CreateCurrencyOperationsMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCurrencyOperationsMutation, CreateCurrencyOperationsMutationVariables>(CreateCurrencyOperationsDocument, baseOptions);
      }
export type CreateCurrencyOperationsMutationHookResult = ReturnType<typeof useCreateCurrencyOperationsMutation>;
export type CreateCurrencyOperationsMutationResult = ApolloReactCommon.MutationResult<CreateCurrencyOperationsMutation>;
export type CreateCurrencyOperationsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCurrencyOperationsMutation, CreateCurrencyOperationsMutationVariables>;
export const PortfoliosDocument = gql`
    query portfolios {
  portfolios {
    id
    name
    portfolioType {
      iconUrl
    }
  }
}
    `;

/**
 * __usePortfoliosQuery__
 *
 * To run a query within a React component, call `usePortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfoliosQuery({
 *   variables: {
 *   },
 * });
 */
export function usePortfoliosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>) {
        return ApolloReactHooks.useQuery<PortfoliosQuery, PortfoliosQueryVariables>(PortfoliosDocument, baseOptions);
      }
export function usePortfoliosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PortfoliosQuery, PortfoliosQueryVariables>(PortfoliosDocument, baseOptions);
        }
export type PortfoliosQueryHookResult = ReturnType<typeof usePortfoliosQuery>;
export type PortfoliosLazyQueryHookResult = ReturnType<typeof usePortfoliosLazyQuery>;
export type PortfoliosQueryResult = ApolloReactCommon.QueryResult<PortfoliosQuery, PortfoliosQueryVariables>;
export const CreateAssetOperationDocument = gql`
    mutation createAssetOperation($ticket: String, $amount: Int!, $assetAction: AssetAction!, $assetType: AssetType!, $currencyId: UUID!, $date: DateTime!, $portfolioId: UUID!, $price: Decimal!) {
  createAssetOperation(
    input: {ticket: $ticket, amount: $amount, assetAction: $assetAction, assetType: $assetType, currencyId: $currencyId, date: $date, portfolioId: $portfolioId, price: $price}
  ) {
    isSuccess
    message
  }
}
    `;
export type CreateAssetOperationMutationFn = ApolloReactCommon.MutationFunction<CreateAssetOperationMutation, CreateAssetOperationMutationVariables>;

/**
 * __useCreateAssetOperationMutation__
 *
 * To run a mutation, you first call `useCreateAssetOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetOperationMutation, { data, loading, error }] = useCreateAssetOperationMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *      amount: // value for 'amount'
 *      assetAction: // value for 'assetAction'
 *      assetType: // value for 'assetType'
 *      currencyId: // value for 'currencyId'
 *      date: // value for 'date'
 *      portfolioId: // value for 'portfolioId'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useCreateAssetOperationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAssetOperationMutation, CreateAssetOperationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAssetOperationMutation, CreateAssetOperationMutationVariables>(CreateAssetOperationDocument, baseOptions);
      }
export type CreateAssetOperationMutationHookResult = ReturnType<typeof useCreateAssetOperationMutation>;
export type CreateAssetOperationMutationResult = ApolloReactCommon.MutationResult<CreateAssetOperationMutation>;
export type CreateAssetOperationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAssetOperationMutation, CreateAssetOperationMutationVariables>;
export const CreateCurrencyOperationDocument = gql`
    mutation createCurrencyOperation($ticket: String, $amount: Int, $operationType: OperationType!, $currencyId: UUID!, $date: DateTime!, $portfolioId: UUID!, $total: Decimal!) {
  createCurrencyOperation(
    input: {ticket: $ticket, amount: $amount, operationType: $operationType, currencyId: $currencyId, date: $date, portfolioId: $portfolioId, total: $total}
  ) {
    isSuccess
    message
  }
}
    `;
export type CreateCurrencyOperationMutationFn = ApolloReactCommon.MutationFunction<CreateCurrencyOperationMutation, CreateCurrencyOperationMutationVariables>;

/**
 * __useCreateCurrencyOperationMutation__
 *
 * To run a mutation, you first call `useCreateCurrencyOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCurrencyOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCurrencyOperationMutation, { data, loading, error }] = useCreateCurrencyOperationMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *      amount: // value for 'amount'
 *      operationType: // value for 'operationType'
 *      currencyId: // value for 'currencyId'
 *      date: // value for 'date'
 *      portfolioId: // value for 'portfolioId'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useCreateCurrencyOperationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCurrencyOperationMutation, CreateCurrencyOperationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCurrencyOperationMutation, CreateCurrencyOperationMutationVariables>(CreateCurrencyOperationDocument, baseOptions);
      }
export type CreateCurrencyOperationMutationHookResult = ReturnType<typeof useCreateCurrencyOperationMutation>;
export type CreateCurrencyOperationMutationResult = ApolloReactCommon.MutationResult<CreateCurrencyOperationMutation>;
export type CreateCurrencyOperationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCurrencyOperationMutation, CreateCurrencyOperationMutationVariables>;
export const GetAssetOperationsDocument = gql`
    query getAssetOperations($portfolioId: UUID!) {
  assetOperations(portfolioId: $portfolioId) {
    isSuccess
    message
    result {
      id
      assetAction
      ticket
      amount
      price
      total
      currency {
        name
        sign
        ticket
      }
      date
      portfolio {
        name
        portfolioType {
          iconUrl
        }
      }
      assetType
    }
  }
}
    `;

/**
 * __useGetAssetOperationsQuery__
 *
 * To run a query within a React component, call `useGetAssetOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetOperationsQuery({
 *   variables: {
 *      portfolioId: // value for 'portfolioId'
 *   },
 * });
 */
export function useGetAssetOperationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAssetOperationsQuery, GetAssetOperationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAssetOperationsQuery, GetAssetOperationsQueryVariables>(GetAssetOperationsDocument, baseOptions);
      }
export function useGetAssetOperationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAssetOperationsQuery, GetAssetOperationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAssetOperationsQuery, GetAssetOperationsQueryVariables>(GetAssetOperationsDocument, baseOptions);
        }
export type GetAssetOperationsQueryHookResult = ReturnType<typeof useGetAssetOperationsQuery>;
export type GetAssetOperationsLazyQueryHookResult = ReturnType<typeof useGetAssetOperationsLazyQuery>;
export type GetAssetOperationsQueryResult = ApolloReactCommon.QueryResult<GetAssetOperationsQuery, GetAssetOperationsQueryVariables>;
export const GetCurrencyOperationsDocument = gql`
    query getCurrencyOperations($portfolioId: UUID!) {
  currencyOperations(portfolioId: $portfolioId) {
    isSuccess
    message
    result {
      id
      currency {
        name
        sign
        ticket
      }
      total
      date
      operationType
      portfolio {
        id
        name
        portfolioType {
          iconUrl
        }
      }
      ticket
      amount
    }
  }
}
    `;

/**
 * __useGetCurrencyOperationsQuery__
 *
 * To run a query within a React component, call `useGetCurrencyOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrencyOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrencyOperationsQuery({
 *   variables: {
 *      portfolioId: // value for 'portfolioId'
 *   },
 * });
 */
export function useGetCurrencyOperationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrencyOperationsQuery, GetCurrencyOperationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrencyOperationsQuery, GetCurrencyOperationsQueryVariables>(GetCurrencyOperationsDocument, baseOptions);
      }
export function useGetCurrencyOperationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrencyOperationsQuery, GetCurrencyOperationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrencyOperationsQuery, GetCurrencyOperationsQueryVariables>(GetCurrencyOperationsDocument, baseOptions);
        }
export type GetCurrencyOperationsQueryHookResult = ReturnType<typeof useGetCurrencyOperationsQuery>;
export type GetCurrencyOperationsLazyQueryHookResult = ReturnType<typeof useGetCurrencyOperationsLazyQuery>;
export type GetCurrencyOperationsQueryResult = ApolloReactCommon.QueryResult<GetCurrencyOperationsQuery, GetCurrencyOperationsQueryVariables>;
export const RemoveAssetOperationDocument = gql`
    mutation removeAssetOperation($assetOperationId: UUID!) {
  removeAssetOperation(assetOperationId: $assetOperationId) {
    isSuccess
    message
  }
}
    `;
export type RemoveAssetOperationMutationFn = ApolloReactCommon.MutationFunction<RemoveAssetOperationMutation, RemoveAssetOperationMutationVariables>;

/**
 * __useRemoveAssetOperationMutation__
 *
 * To run a mutation, you first call `useRemoveAssetOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssetOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssetOperationMutation, { data, loading, error }] = useRemoveAssetOperationMutation({
 *   variables: {
 *      assetOperationId: // value for 'assetOperationId'
 *   },
 * });
 */
export function useRemoveAssetOperationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveAssetOperationMutation, RemoveAssetOperationMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveAssetOperationMutation, RemoveAssetOperationMutationVariables>(RemoveAssetOperationDocument, baseOptions);
      }
export type RemoveAssetOperationMutationHookResult = ReturnType<typeof useRemoveAssetOperationMutation>;
export type RemoveAssetOperationMutationResult = ApolloReactCommon.MutationResult<RemoveAssetOperationMutation>;
export type RemoveAssetOperationMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveAssetOperationMutation, RemoveAssetOperationMutationVariables>;
export const RemoveCurrencyOperationDocument = gql`
    mutation removeCurrencyOperation($currencyOperationId: UUID!) {
  removeCurrencyOperation(currencyOperationId: $currencyOperationId) {
    isSuccess
    message
  }
}
    `;
export type RemoveCurrencyOperationMutationFn = ApolloReactCommon.MutationFunction<RemoveCurrencyOperationMutation, RemoveCurrencyOperationMutationVariables>;

/**
 * __useRemoveCurrencyOperationMutation__
 *
 * To run a mutation, you first call `useRemoveCurrencyOperationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCurrencyOperationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCurrencyOperationMutation, { data, loading, error }] = useRemoveCurrencyOperationMutation({
 *   variables: {
 *      currencyOperationId: // value for 'currencyOperationId'
 *   },
 * });
 */
export function useRemoveCurrencyOperationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCurrencyOperationMutation, RemoveCurrencyOperationMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCurrencyOperationMutation, RemoveCurrencyOperationMutationVariables>(RemoveCurrencyOperationDocument, baseOptions);
      }
export type RemoveCurrencyOperationMutationHookResult = ReturnType<typeof useRemoveCurrencyOperationMutation>;
export type RemoveCurrencyOperationMutationResult = ApolloReactCommon.MutationResult<RemoveCurrencyOperationMutation>;
export type RemoveCurrencyOperationMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCurrencyOperationMutation, RemoveCurrencyOperationMutationVariables>;
export const StocksDocument = gql`
    query stocks {
  stocks {
    id
    ticket
    shortName
    price
    priceChange
    lotSize
    capitalization
    sector
    updateTime
  }
}
    `;

/**
 * __useStocksQuery__
 *
 * To run a query within a React component, call `useStocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useStocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useStocksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StocksQuery, StocksQueryVariables>) {
        return ApolloReactHooks.useQuery<StocksQuery, StocksQueryVariables>(StocksDocument, baseOptions);
      }
export function useStocksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StocksQuery, StocksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StocksQuery, StocksQueryVariables>(StocksDocument, baseOptions);
        }
export type StocksQueryHookResult = ReturnType<typeof useStocksQuery>;
export type StocksLazyQueryHookResult = ReturnType<typeof useStocksLazyQuery>;
export type StocksQueryResult = ApolloReactCommon.QueryResult<StocksQuery, StocksQueryVariables>;
export const FondsDocument = gql`
    query fonds {
  fonds {
    id
    ticket
    shortName
    price
    priceChange
    updateTime
  }
}
    `;

/**
 * __useFondsQuery__
 *
 * To run a query within a React component, call `useFondsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFondsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFondsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFondsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FondsQuery, FondsQueryVariables>) {
        return ApolloReactHooks.useQuery<FondsQuery, FondsQueryVariables>(FondsDocument, baseOptions);
      }
export function useFondsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FondsQuery, FondsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FondsQuery, FondsQueryVariables>(FondsDocument, baseOptions);
        }
export type FondsQueryHookResult = ReturnType<typeof useFondsQuery>;
export type FondsLazyQueryHookResult = ReturnType<typeof useFondsLazyQuery>;
export type FondsQueryResult = ApolloReactCommon.QueryResult<FondsQuery, FondsQueryVariables>;
export const BondsDocument = gql`
    query bonds {
  bonds {
    id
    ticket
    shortName
    price
    percent
    percentChange
    coupon
    amortizationDate
    nominal
    updateTime
  }
}
    `;

/**
 * __useBondsQuery__
 *
 * To run a query within a React component, call `useBondsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBondsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBondsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBondsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BondsQuery, BondsQueryVariables>) {
        return ApolloReactHooks.useQuery<BondsQuery, BondsQueryVariables>(BondsDocument, baseOptions);
      }
export function useBondsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BondsQuery, BondsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BondsQuery, BondsQueryVariables>(BondsDocument, baseOptions);
        }
export type BondsQueryHookResult = ReturnType<typeof useBondsQuery>;
export type BondsLazyQueryHookResult = ReturnType<typeof useBondsLazyQuery>;
export type BondsQueryResult = ApolloReactCommon.QueryResult<BondsQuery, BondsQueryVariables>;
export const FuturePaymentsDocument = gql`
    query futurePayments($portfolioIds: [UUID!]) {
  futurePayments(portfolioIds: $portfolioIds) {
    isSuccess
    message
    result {
      ticket
      assetName
      paymentValue
      amount
      total
      date
      currency {
        sign
      }
    }
  }
}
    `;

/**
 * __useFuturePaymentsQuery__
 *
 * To run a query within a React component, call `useFuturePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFuturePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFuturePaymentsQuery({
 *   variables: {
 *      portfolioIds: // value for 'portfolioIds'
 *   },
 * });
 */
export function useFuturePaymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FuturePaymentsQuery, FuturePaymentsQueryVariables>) {
        return ApolloReactHooks.useQuery<FuturePaymentsQuery, FuturePaymentsQueryVariables>(FuturePaymentsDocument, baseOptions);
      }
export function useFuturePaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FuturePaymentsQuery, FuturePaymentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FuturePaymentsQuery, FuturePaymentsQueryVariables>(FuturePaymentsDocument, baseOptions);
        }
export type FuturePaymentsQueryHookResult = ReturnType<typeof useFuturePaymentsQuery>;
export type FuturePaymentsLazyQueryHookResult = ReturnType<typeof useFuturePaymentsLazyQuery>;
export type FuturePaymentsQueryResult = ApolloReactCommon.QueryResult<FuturePaymentsQuery, FuturePaymentsQueryVariables>;
export const AggregatePortfoliosDocument = gql`
    query aggregatePortfolios($portfolioIds: [UUID!]) {
  aggregatePortfolios(portfolioIds: $portfolioIds) {
    isSuccess
    message
    result {
      cost
      investedSum
      paperProfit
      paperProfitPercent
      rubBalance
      dollarBalance
      euroBalance
      dividendProfit
      dividendProfitPercent
      portfolioStocks {
        stock {
          ticket
          shortName
          price
          priceChange
          updateTime
        }
        id
        amount
        cost
        boughtPrice
        paperProfit
        paperProfitPercent
      }
      portfolioFonds {
        fond {
          ticket
          shortName
          price
          priceChange
          updateTime
        }
        id
        amount
        cost
        boughtPrice
        paperProfit
        paperProfitPercent
      }
      portfolioBonds {
        bond {
          ticket
          percent
          percentChange
          price
          amortizationDate
          coupon
          nominal
          shortName
          updateTime
        }
        id
        cost
        amount
        boughtPrice
        paperProfit
        paperProfitPercent
      }
    }
  }
}
    `;

/**
 * __useAggregatePortfoliosQuery__
 *
 * To run a query within a React component, call `useAggregatePortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAggregatePortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAggregatePortfoliosQuery({
 *   variables: {
 *      portfolioIds: // value for 'portfolioIds'
 *   },
 * });
 */
export function useAggregatePortfoliosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AggregatePortfoliosQuery, AggregatePortfoliosQueryVariables>) {
        return ApolloReactHooks.useQuery<AggregatePortfoliosQuery, AggregatePortfoliosQueryVariables>(AggregatePortfoliosDocument, baseOptions);
      }
export function useAggregatePortfoliosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AggregatePortfoliosQuery, AggregatePortfoliosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AggregatePortfoliosQuery, AggregatePortfoliosQueryVariables>(AggregatePortfoliosDocument, baseOptions);
        }
export type AggregatePortfoliosQueryHookResult = ReturnType<typeof useAggregatePortfoliosQuery>;
export type AggregatePortfoliosLazyQueryHookResult = ReturnType<typeof useAggregatePortfoliosLazyQuery>;
export type AggregatePortfoliosQueryResult = ApolloReactCommon.QueryResult<AggregatePortfoliosQuery, AggregatePortfoliosQueryVariables>;
export const HerfindahlHirschmanIndexDocument = gql`
    query herfindahlHirschmanIndex($portfolioIds: [UUID!]) {
  herfindahlHirschmanIndex(portfolioIds: $portfolioIds) {
    isSuccess
    message
    result {
      value
      interpretation
    }
  }
}
    `;

/**
 * __useHerfindahlHirschmanIndexQuery__
 *
 * To run a query within a React component, call `useHerfindahlHirschmanIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useHerfindahlHirschmanIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHerfindahlHirschmanIndexQuery({
 *   variables: {
 *      portfolioIds: // value for 'portfolioIds'
 *   },
 * });
 */
export function useHerfindahlHirschmanIndexQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HerfindahlHirschmanIndexQuery, HerfindahlHirschmanIndexQueryVariables>) {
        return ApolloReactHooks.useQuery<HerfindahlHirschmanIndexQuery, HerfindahlHirschmanIndexQueryVariables>(HerfindahlHirschmanIndexDocument, baseOptions);
      }
export function useHerfindahlHirschmanIndexLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HerfindahlHirschmanIndexQuery, HerfindahlHirschmanIndexQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HerfindahlHirschmanIndexQuery, HerfindahlHirschmanIndexQueryVariables>(HerfindahlHirschmanIndexDocument, baseOptions);
        }
export type HerfindahlHirschmanIndexQueryHookResult = ReturnType<typeof useHerfindahlHirschmanIndexQuery>;
export type HerfindahlHirschmanIndexLazyQueryHookResult = ReturnType<typeof useHerfindahlHirschmanIndexLazyQuery>;
export type HerfindahlHirschmanIndexQueryResult = ApolloReactCommon.QueryResult<HerfindahlHirschmanIndexQuery, HerfindahlHirschmanIndexQueryVariables>;
export const SharpeRatioDocument = gql`
    query sharpeRatio($portfolioIds: [UUID!]) {
  sharpeRatio(portfolioIds: $portfolioIds) {
    isSuccess
    message
    result {
      value
      risk
      profit
      safeRate
      interpretation
    }
  }
}
    `;

/**
 * __useSharpeRatioQuery__
 *
 * To run a query within a React component, call `useSharpeRatioQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharpeRatioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharpeRatioQuery({
 *   variables: {
 *      portfolioIds: // value for 'portfolioIds'
 *   },
 * });
 */
export function useSharpeRatioQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SharpeRatioQuery, SharpeRatioQueryVariables>) {
        return ApolloReactHooks.useQuery<SharpeRatioQuery, SharpeRatioQueryVariables>(SharpeRatioDocument, baseOptions);
      }
export function useSharpeRatioLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SharpeRatioQuery, SharpeRatioQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SharpeRatioQuery, SharpeRatioQueryVariables>(SharpeRatioDocument, baseOptions);
        }
export type SharpeRatioQueryHookResult = ReturnType<typeof useSharpeRatioQuery>;
export type SharpeRatioLazyQueryHookResult = ReturnType<typeof useSharpeRatioLazyQuery>;
export type SharpeRatioQueryResult = ApolloReactCommon.QueryResult<SharpeRatioQuery, SharpeRatioQueryVariables>;
export const SecretDocument = gql`
    query Secret {
  secretData
}
    `;

/**
 * __useSecretQuery__
 *
 * To run a query within a React component, call `useSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useSecretQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SecretQuery, SecretQueryVariables>) {
        return ApolloReactHooks.useQuery<SecretQuery, SecretQueryVariables>(SecretDocument, baseOptions);
      }
export function useSecretLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SecretQuery, SecretQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SecretQuery, SecretQueryVariables>(SecretDocument, baseOptions);
        }
export type SecretQueryHookResult = ReturnType<typeof useSecretQuery>;
export type SecretLazyQueryHookResult = ReturnType<typeof useSecretLazyQuery>;
export type SecretQueryResult = ApolloReactCommon.QueryResult<SecretQuery, SecretQueryVariables>;