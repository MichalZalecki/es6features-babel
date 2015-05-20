"use strict";

describe("Rest Parameters", function () {

    it("should allow to to have variable number of\n        arguments without using the arguments object", function () {
        function buy(where) {
            for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                items[_key - 1] = arguments[_key];
            }

            return "I'm going to " + where + " to buy " + items.length + " items: " + items.slice(0, -1).join(", ") + " and " + items.slice(-1) + ".";
        }

        expect(buy("the mall", "jacket", "bag", "sweets", "headphones")).toEqual("I'm going to the mall to buy 4 items: " + "jacket, bag, sweets and headphones.");
    });
});