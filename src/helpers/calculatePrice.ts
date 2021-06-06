const prec = (num: number) => { // precISION
    return num.toFixed(2);
}

const calculatePrice = (prices: Prices, currency: string): string => {
    
    let price: string = "default";

    if(isNaN(prices.input) || prices.input === undefined) prices.input = 0;

    switch(currency){
        case "GBP":
            price = `£ ${prec( prices.GBP * prices.input )}`;
            break;
        case "USD":
            price = `$ ${prec( prices.USD * prices.input )}`;
            break;
        case "EUR":
            price = `€ ${prec( prices.EUR * prices.input )}`;
            break;
    }

    return price;
}

export default calculatePrice;