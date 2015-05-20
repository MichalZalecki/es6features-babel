"use strict";

describe("Symbols", function () {

    it("should be unique (but not private) and immutable\n        data type; symbol object is an implicit object wrapper\n        for the symbol primitive data type", function () {
        var s = Symbol("foo");
        expect(s).not.toEqual(Symbol("foo"));
        expect(typeof s).toEqual("symbol");

        var s2 = Symbol["for"]("foo");
        expect(s).not.toEqual(s2);
        expect(s2).toEqual(Symbol["for"]("foo"));
        expect(Symbol.keyFor(s2)).toEqual("foo");

        expect(Symbol("bar")).not.toBe(Symbol("bar"));
        expect(Symbol["for"]("bar")).toBe(Symbol["for"]("bar"));
    });

    it("should enable access control for object state", function () {

        function Safe(secretData) {
            var s = Symbol("secret symbol");
            this[s] = secretData;
        }

        var obj = new Safe("secret");

        expect(obj["secret symbol"]).toBeUndefined();
        expect(obj[Symbol("secret symbol")]).toBeUndefined();
        expect(Object.getOwnPropertySymbols(obj)).toEqual(jasmine.any(Array));
        expect(obj[Object.getOwnPropertySymbols(obj)[0]]).toEqual("secret");
    });
});