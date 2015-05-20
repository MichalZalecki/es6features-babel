describe("Symbols", () => {

    it(`should be unique (but not private) and immutable
        data type; symbol object is an implicit object wrapper
        for the symbol primitive data type`, () => {
        let s = Symbol("foo");
        expect(s).not.toEqual(Symbol("foo"));
        expect(typeof s).toEqual("symbol");

        let s2 = Symbol.for("foo");
        expect(s).not.toEqual(s2);
        expect(s2).toEqual(Symbol.for("foo"));
        expect(Symbol.keyFor(s2)).toEqual("foo");

        expect(Symbol("bar")).not.toBe(Symbol("bar"));
        expect(Symbol.for("bar")).toBe(Symbol.for("bar"));
    });

    it("should enable access control for object state", () => {

        function Safe(secretData) {
            let s = Symbol("secret symbol");
            this[s] = secretData;
        }

        let obj = new Safe("secret");

        expect(obj["secret symbol"]).toBeUndefined();
        expect(obj[Symbol("secret symbol")]).toBeUndefined();
        expect(Object.getOwnPropertySymbols(obj)).toEqual(jasmine.any(Array));
        expect(obj[Object.getOwnPropertySymbols(obj)[0]])
            .toEqual("secret");
    });

});
