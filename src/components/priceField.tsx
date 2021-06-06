import { useContext } from "react";
import PriceContext from "../context";
import calculatePrice from "../helpers/calculatePrice";

const PriceField = (args: any) => {

    const prices = useContext(PriceContext);

    let value: string = calculatePrice(prices, args.currency);

    return (
        <div>
            <b> {args.currency} </b>
                    : {value}
        </div>
    );
}

export default PriceField;