import { useEffect, useRef, useState } from "react";
import PriceField from "../components/priceField";
import PriceContext from "../context";
import getPrices from "../services/api";

const PriceForm = () => {

    const [input, setInput] = useState<number>(0);
    const [prices, setPrices] = useState<Prices>({} as Prices);

    const stateRef = useRef(input);
    stateRef.current = input;

    useEffect(() => {
        try {
            getPrices().then((data) => { setPrices(data); });
        } catch (e) { console.log(e); }
    }, []);


    useEffect(() => {
        // Fetch the prices and update them every minute
        let interval = setInterval(() => {
            try {
                getPrices().then((data) => {

                    let newPrices: Prices = {...data};
                    newPrices.input = stateRef.current;

                    setPrices(newPrices);
                });
            } catch (e) {
                console.log(e);
            }
        }, 60000);

        // Unmounts interval safely
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: any) => {
        setInput(e?.target?.value);

        let newPrices: Prices = prices;
        newPrices.input = parseFloat(e?.target?.value);

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