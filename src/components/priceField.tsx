import { useContext } from "react";
import { PriceContext } from "../context";
import calculatePrice from "../helpers/calculatePrice";

const PriceField = (args: any) => {

    const prices = useContext(PriceContext);
    const curr: string = args.currency;
    const deleteCallback: Function = args.deleteCallback;

    let value: string = calculatePrice(prices, curr);

    return (
        <div className="price-field">
            <b> {curr} </b>
            {value}
            <button onClick={() => deleteCallback(curr)}>x</button>
        </div>
    );
}

export default PriceField;