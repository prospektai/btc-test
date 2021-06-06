import { createContext } from "react";

const PriceContext = createContext(
    {GBP: 0, USD: 0, EUR: 0, input: 0} as Prices, 
);

export default PriceContext;