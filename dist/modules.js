"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _modulesMath = require("./modules/math");

var mathematics = _interopRequireWildcard(_modulesMath);

var _modulesPerson = require("./modules/person");

describe("Modules", function () {

    it("should load everything from modules/math as mathematics", function () {
        expect(mathematics).toEqual(jasmine.any(Object));
        expect(mathematics.sum(2, 3)).toEqual(5);
        expect(mathematics.pi).toEqual(3.141593);
    });

    it("should load name and surname from modules/person", function () {
        expect(_modulesPerson.name).toEqual("Foo");
        expect(_modulesPerson.surname).toEqual("Bar");
    });
});