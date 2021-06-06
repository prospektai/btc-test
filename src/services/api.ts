const getPrices = () => {
    let url: string = "https://api.coindesk.com/v1/bpi/currentprice.json";

    return fetch(url).then((result) => result.json()
        .then((data) => { 
            let prices: Prices = {} as Prices;

            prices.EUR = data.bpi.EUR.rate;
            prices.USD = data.bpi.USD.rate;
            prices.GBP = data.bpi.GBP.rate;

            console.log(prices);

            return prices;
        }));
}

export default getPrices;