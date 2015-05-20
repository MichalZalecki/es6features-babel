describe("Rest Parameters", () => {

    it(`should allow to to have variable number of
        arguments without using the arguments object`, () => {
        function buy(where, ...items) {
            return "I'm going to " + where + " to buy "
                + items.length + " items: "
                + items.slice(0, -1).join(", ")
                + " and " + items.slice(-1) + ".";
        }

        expect(buy("the mall", "jacket", "bag", "sweets", "headphones"))
            .toEqual("I'm going to the mall to buy 4 items: "
                   + "jacket, bag, sweets and headphones.");
    });

});
