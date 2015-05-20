"use strict";

describe("Arrow Functions", function () {

    it("should be a function shorthand", function () {

        var square = function square(x) {
            return x * x;
        };

        var square2 = function square2(x) {
            return x * x;
        };

        var triangleArea = function triangleArea(a, h) {
            return a * h / 2;
        };

        // use brackets when more than one argument is needed
        var triangleHeron = function triangleHeron(a, b, c) {
            var p = (a + b + c) / 2;
            return Math.sqrt(p * (p - a) * (p - b) * (p - c));
        };

        // immediate return of an object literal must be wrapped in parentheses
        var objectify = function objectify(x) {
            return { value: x };
        };

        var person = {
            name: "Bob",
            belongings: ["Car", "PC"],
            getProperties: function getProperties() {
                var properties = [];
                this.belongings.forEach(function (thing) {
                    properties.push(this.name + " has " + thing);
                });
                return properties;
            },
            getProperties2: function getProperties2() {
                var _this = this;

                var properties = [];
                // arrows share this with surrounding code
                this.belongings.forEach(function (thing) {
                    properties.push(_this.name + " has " + thing);
                });
                return properties;
            }
        };

        expect(square(3)).toEqual(9);
        expect(square2(13)).toEqual(169);
        expect(triangleArea(4, 6)).toEqual(12);
        expect(triangleHeron(3, 4, 5)).toEqual(6);
        expect(objectify("awesome")).toEqual({ value: "awesome" });
        expect(function () {
            return person.getProperties();
        }).toThrowError(TypeError, /undefined/);
        expect(person.getProperties2()).toEqual(["Bob has Car", "Bob has PC"]);
    });
});