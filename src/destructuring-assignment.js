describe("Destructuring Assignment", () => {

    it("should works for list matching", () => {
        let [a, , [b, c]] = [1, 2, [3, 4]];
        expect(a).toEqual(1);
        expect(b).toEqual(3);
        expect(c).toEqual(4);
    });

    it("should works for object matching", () => {
        let {firstName, lastName: surname, info: {age, driver}} =
            {firstName: "Foo", lastName: "Bar", info: {age: 20, driver: true}};

        expect(firstName).toEqual("Foo");
        expect(surname).toEqual("Bar");
        expect(age).toEqual(20);
        expect(driver).toEqual(true);
    });

    it("should works in parameter position", () => {
        function foo({bar: x}) {
            return x;
        }
        expect(foo({bar: 5})).toEqual(5);
    });

    it("should works for fail-soft destructuring", () => {
        let [a] = [];
        expect(a).toBeUndefined();
    });

    it("should works for fail-soft destructuring with defaults", () => {
        let [a] = [1];
        expect(a).toEqual(1);
    });

});
