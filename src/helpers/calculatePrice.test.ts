import calculatePrice, { formatNum } from '../helpers/calculatePrice';

describe('Price formatting, calculations', () => {
    it("Comma separation - formatNum()", () => {
        let price = 4415224.09;
        expect(formatNum(price)).toBe("4,415,224.09");
    });


    it("Price calculation - calculatePrice()", () => {
        let prices: Prices = {GBP: 13, USD: 12, EUR: 11} as Prices;

        expect( calculatePrice(prices, "") ).toBe("default");
        expect( calculatePrice(prices, "GBP")).toBe("£ 0.00");
    })
})

export {}