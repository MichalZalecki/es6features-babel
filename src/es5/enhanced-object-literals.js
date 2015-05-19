"use strict";

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

describe("Enhanced Object Literals", function () {

    it("should bring more flexibility when defining object properties", function () {
        var _obj;

        function greet(name) {
            return "Hello " + name;
        }
        var x = 2;
        var obj = (_obj = {
            // __proto__
            __proto__: {
                hi: function hi() {
                    return "Hi!";
                },
                by: function by() {
                    return "By!";
                }
            } }, _defineProperty(_obj, x * 2, "Computed Property Name"), _defineProperty(_obj, "greet", greet
        // @TODO making super calls
        ), _obj);

        expect(obj[4]).toEqual("Computed Property Name");
        expect(obj.hi()).toEqual("Hi!");
        expect(obj.by()).toEqual("By!");
        expect(obj.greet("Bob")).toEqual("Hello Bob");
    });
});

// Computed property names

// object initializer shorthand (greet: greet)