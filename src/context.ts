import { createContext } from "react";

const PriceContext = createContext(
    {GBP: 0, USD: 0, EUR: 0, input: 0} as Prices, 
);

const initialCurrencies: string[] = ["USD", "GBP", "EUR"];

export { PriceContext, initialCurrencies };