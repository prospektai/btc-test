const formatNum = (num: number) => {
    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const calculatePrice = (prices: Prices, currency: string): string => {
    
    let price: string = "default";

    if(isNaN(prices.input) || prices.input === undefined) prices.input = 0;

    switch(currency){
        case "GBP":
            price = `£ ${formatNum( prices.GBP * prices.input )}`;
            break;
        case "USD":
            price = `$ ${formatNum( prices.USD * prices.input )}`;
            break;
        case "EUR":
            price = `€ ${formatNum( prices.EUR * prices.input )}`;
            break;
    }

    return price;
}

export default calculatePrice;