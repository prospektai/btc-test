import getPrices from "./api";

describe("API functionality", () => {
    let prices: Prices = { GBP: 0, USD: 0, EUR: 0} as Prices;
    

    it("Price objects follow same format", async () => {
        let fetchedPrices: Prices = await getPrices();

        expect(fetchedPrices).toEqual(
            expect.objectContaining({
                USD: expect.any(Number), 
                GBP: expect.any(Number), 
                EUR: expect.any(Number), 
            })
        );
    }, 5000)

}); 