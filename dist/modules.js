"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _modulesMath = require("./modules/math");

var _modulesPerson = require("./modules/person");

var buddy = _interopRequireWildcard(_modulesPerson);

var _modulesAwesome = require("./modules/awesome");

var _modulesAwesome2 = _interopRequireDefault(_modulesAwesome);

describe("Modules", function () {

    it("should import everything from modules/math as mathematics", function () {
        expect((0, _modulesMath.sum)(2, 3)).toEqual(5);
        expect(_modulesMath.pi).toEqual(3.141593);
    });

    it("should forbid overwriting constant pi", function () {});

    it("should import everything from modules/person as buddy", function () {
        expect(buddy).toEqual(jasmine.any(Object));
        expect(buddy.name).toEqual("Foo");
        expect(buddy.surname).toEqual("Bar");
    });

    it("should import class from modules/awesome as awesome", function () {
        expect(new _modulesAwesome2["default"]().hoItIs()).toEqual("awesome");
    });
});

//pi = 22/7; // error: "pi" is read-only