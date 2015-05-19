describe("Arrow Functions", () => {

    it("should be a function shorthand", () => {

        let square = x => x * x;

        let square2 = x => {
            return x * x;
        };

        let triangleArea = (a, h) => a*h/2;

        // use brackets when more than one argument is needed
        let triangleHeron = (a, b, c) => {
            let p = (a + b + c)/2;
            return Math.sqrt(p*(p-a)*(p-b)*(p-c));
        };

        // immediate return of an object literal must be wrapped in parentheses
        let objectify = x => ({ value: x });

        let person = {
            name: "Bob",
            belongings: ["Car", "PC"],
            getProperties: function () {
                let properties = [];
                this.belongings.forEach(function (thing) {
                    properties.push(this.name + " has " + thing);
                });
                return properties;
            },
            getProperties2: function () {
                let properties = [];
                // arrows share this with surrounding code
                this.belongings.forEach((thing) => {
                    properties.push(this.name + " has " + thing);
                });
                return properties;
            }
        };

        expect(square(3)).toEqual(9);
        expect(square2(13)).toEqual(169);
        expect(triangleArea(4, 6)).toEqual(12);
        expect(triangleHeron(3, 4, 5)).toEqual(6);
        expect(objectify("awesome")).toEqual({value:"awesome"});
        expect(() => person.getProperties())
            .toThrow(new TypeError("Cannot read property 'name' of undefined"));
        expect(person.getProperties2()).toEqual(["Bob has Car", "Bob has PC"]);
    });

});
