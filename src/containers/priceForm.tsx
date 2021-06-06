import { useEffect, useState } from "react";
import PriceField from "../components/priceField";
import PriceContext from "../context";
import getPrices from "../services/api";

const PriceForm = () => {

    const [input, setInput] = useState<number>(0);

    const [prices, setPrices] = useState<Prices>({} as Prices);

    useEffect(() => {
        // Fetch the prices and update them every minute
        getPrices().then((data) => {
            setPrices(data);
        });

        const interval = setInterval(() => {
            getPrices(input).then((data) => {
                setPrices(data);
            });
        }, 6000);

        // Unmounts interval safely
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: any) => {
        setInput(e?.target?.value);

        let newPrices: Prices = prices;
        newPrices.input = e?.target?.value;

        setPrices(newPrices);
    }

    return (
        <PriceContext.Provider value={prices}>
            <label><b>BTC</b> : </label>
            <input id="btc-input" type="number" value={input} onChange={handleChange} />
            <div className="outputs">
                <PriceField currency="USD" />
                <PriceField currency="EUR" />
                <PriceField currency="GBP" />
            </div>
        </PriceContext.Provider>
    );
}

export default PriceForm;