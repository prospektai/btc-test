const getPrices = () => {
    let url: string = "https://api.coindesk.com/v1/bpi/currentprice.json";

    return fetch(url).then((result) => result.json()
        .then((data) => { 
            let prices: Prices = {} as Prices;

            prices.EUR = data.bpi.EUR.rate_float;
            prices.USD = data.bpi.USD.rate_float;
            prices.GBP = data.bpi.GBP.rate_float;

            return prices;
        }));
}

export default getPrices;