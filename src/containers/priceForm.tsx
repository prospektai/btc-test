import { useEffect, useRef, useState } from "react";
import PriceField from "../components/priceField";
import PriceContext from "../context";
import getPrices from "../services/api";

const PriceForm = () => {

    const [input, setInput] = useState<number>(0);
    const [prices, setPrices] = useState<Prices>({} as Prices);

    const [currencies, setCurrencies] = useState(["USD", "GBP", "EUR"]);
    const [hiddenCurrencies, setHiddenCurrencies] = useState<string[]>([]);

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

    const deleteCurrency = (currency: string) => {

        let newCurrencies: string[] = currencies;
        let currencyIndex: number = newCurrencies.findIndex((e) => e === currency);

        if(currencyIndex !== -1){
            let elements: string[] = newCurrencies.splice(currencyIndex, 1);

            setCurrencies([...newCurrencies]);
            setHiddenCurrencies([...elements]);
        }
    }

    const addCurrency = (currency: string) => {

        let newHiddenCurrencies: string[] = hiddenCurrencies;
        let currencyIndex: number = newHiddenCurrencies.findIndex((e) => e === currency);

        if(currencyIndex !== -1){
            let elements: string[] = newHiddenCurrencies.splice(currencyIndex, 1);

            setCurrencies([...currencies, ...elements]);
            setHiddenCurrencies([...newHiddenCurrencies]);
        }
    }

    return (
        <PriceContext.Provider value={prices}>
            <label><b>BTC</b> : </label>
            <input id="btc-input" type="number" value={input} onChange={handleChange} />
            <div className="outputs">
                {
                    currencies.map((e: any) => {
                        return <PriceField key={e} currency={e} deleteCallback={deleteCurrency} />
                    })
                }
                {
                    hiddenCurrencies.length > 0 ?
                    <select name="Currencies" onChange={(e) => addCurrency(e?.target?.value as string)}>
                        <option></option>
                        {
                            hiddenCurrencies.map((e) => {
                                return <option key={`opt-${e}$`}>{e}</option>
                            })
                        }
                    </select>
                    :
                    <div></div>
                }
            </div>
        </PriceContext.Provider>
    );
}

export default PriceForm;