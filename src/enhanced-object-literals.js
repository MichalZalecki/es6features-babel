describe("Enhanced Object Literals", () => {

    it("should bring more flexibility when defining object properties", () => {
        function greet(name) {
            return "Hello " + name;
        }
        let x = 2;
        let obj = {
            // Computed property names
            [x*2]: "Computed Property Name",
            // __proto__
            __proto__: {
                hi: function () { return "Hi!" },
                by: function () { return "By!" }
            },
            // object initializer shorthand (greet: greet)
            greet
            // @TODO making super calls
        };

        expect(obj[4]).toEqual("Computed Property Name");
        expect(obj.hi()).toEqual("Hi!");
        expect(obj.by()).toEqual("By!");
        expect(obj.greet("Bob")).toEqual("Hello Bob");
    });

});
