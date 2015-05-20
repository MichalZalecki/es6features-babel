(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        }).toThrow(new TypeError("Cannot read property 'name' of undefined"));
        expect(person.getProperties2()).toEqual(["Bob has Car", "Bob has PC"]);
    });
});
},{}],2:[function(require,module,exports){
"use strict";

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe("Classes", function () {

    it("should be syntactical sugar over the Objects and prototypes", function () {
        var Point = (function () {
            function Point() {
                var x = arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments[1] === undefined ? 0 : arguments[1];

                _classCallCheck(this, Point);

                this.x = x;
                this.y = y;
            }

            _createClass(Point, [{
                key: "update",
                value: function update() {
                    var x = arguments[0] === undefined ? 0 : arguments[0];
                    var y = arguments[1] === undefined ? 0 : arguments[1];

                    this.x = x;
                    this.y = y;
                }
            }]);

            return Point;
        })();

        var Circle = (function (_Point) {
            function Circle(r, x, y) {
                _classCallCheck(this, Circle);

                _get(Object.getPrototypeOf(Circle.prototype), "constructor", this).call(this, x, y);
                this.r = r;
            }

            _inherits(Circle, _Point);

            _createClass(Circle, [{
                key: "update",
                value: function update(r, x, y) {
                    _get(Object.getPrototypeOf(Circle.prototype), "update", this).call(this, x, y);
                    this.r = r;
                }
            }, {
                key: "isPointIncluded",
                value: function isPointIncluded(point) {
                    if (point.constructor != Point) throw new Error("point must be an instance of Point");

                    return Math.pow(this.r, 2) + Math.pow(this.y, 2) >= Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
                }
            }]);

            return Circle;
        })(Point);

        var c1 = new Circle(3);
        expect(c1.isPointIncluded(new Point())).toEqual(true);
        expect(c1.isPointIncluded(new Point(0, 3))).toEqual(true);
        expect(c1.isPointIncluded(new Point(3, 3))).toEqual(false);

        var c2 = new Circle(6, 2, 1);
        expect(c2.isPointIncluded(new Point(2, 7))).toEqual(true);
        expect(c2.isPointIncluded(new Point(3, -1))).toEqual(true);
        expect(c2.isPointIncluded(new Point(6, 6))).toEqual(false);
        c2.update(6, 2, 2);
        expect(c2.isPointIncluded(new Point(6, 6))).toEqual(true);
    });
});
},{}],3:[function(require,module,exports){
"use strict";

describe("Data Structures", function () {

    describe("Set", function () {

        it("should store unique values of any type", function () {
            var s = new Set(["Foo", "Bar"]);
            s.add(false).add(123).add("Bar");

            expect(s.size).toEqual(4);

            expect(s.has("Bar")).toBe(true);
            expect(s.has(123)).toBe(true);
            expect(s.has(true)).toBe(false);

            var setIter = s.entries();

            expect(setIter.next().value).toEqual(["Foo", "Foo"]);
            expect(setIter.next().value).toEqual(["Bar", "Bar"]);
            expect(setIter.next().value).toEqual([false, false]);
            expect(setIter.next().value).toEqual([123, 123]);
            expect(setIter.next().value).toBeUndefined();

            var setIter2 = s.values();

            expect(setIter2.next().value).toEqual("Foo");
            expect(setIter2.next().value).toEqual("Bar");
            expect(setIter2.next().value).toEqual(false);
            expect(setIter2.next().value).toEqual(123);
            expect(setIter2.next().value).toBeUndefined();

            expect(s["delete"]("Bar")).toEqual(true);
            expect(s.has("Bar")).toEqual(false);
            expect(s.size).toEqual(3);

            s.clear();
            expect(s.size).toEqual(0);
        });
    });

    describe("WeakSet", function () {

        it("should store weakly held objects", function () {
            var ws = new WeakSet(),
                o1 = {},
                o2 = function o2() {},
                o3 = window;

            ws.add(o1);
            ws.add(o2);

            expect(ws.has(o1)).toEqual(true);
            expect(ws.has(o2)).toEqual(true);
            expect(ws.has(o3)).toEqual(false);

            ws["delete"](o1);
            ws["delete"](o2);

            expect(ws.has(o1)).toEqual(false);
            expect(ws.has(o2)).toEqual(false);
        });
    });

    describe("Map", function () {

        it("should be a simple key/value map", function () {
            var m = new Map([["name", "Foo"], ["surname", "Bar"]]);
            m.set("age", 20);
            m.set(1, true);
            m.set("nick", "Baz");
            m.set("nick", "FooBaz");

            expect(m.size).toEqual(5);

            expect(m.has("name")).toEqual(true);
            expect(m.has("address")).toEqual(false);
            expect(m.has(1)).toEqual(true);
            expect(m.has(2)).toEqual(false);

            var mapIter = m.entries();

            expect(mapIter.next().value).toEqual(["name", "Foo"]);
            expect(mapIter.next().value).toEqual(["surname", "Bar"]);
            expect(mapIter.next().value).toEqual(["age", 20]);
            expect(mapIter.next().value).toEqual([1, true]);
            expect(mapIter.next().value).toEqual(["nick", "FooBaz"]);
            expect(mapIter.next().value).toBeUndefined();

            var mapIter2 = m.values();

            expect(mapIter2.next().value).toEqual("Foo");
            expect(mapIter2.next().value).toEqual("Bar");
            expect(mapIter2.next().value).toEqual(20);
            expect(mapIter2.next().value).toEqual(true);
            expect(mapIter2.next().value).toEqual("FooBaz");
            expect(mapIter2.next().value).toBeUndefined();

            var mapIter3 = m.keys();

            expect(mapIter3.next().value).toEqual("name");
            expect(mapIter3.next().value).toEqual("surname");
            expect(mapIter3.next().value).toEqual("age");
            expect(mapIter3.next().value).toEqual(1);
            expect(mapIter3.next().value).toEqual("nick");
            expect(mapIter3.next().value).toBeUndefined();

            expect(m["delete"]("name")).toEqual(true);
            expect(m.has("name")).toEqual(false);
            expect(m.size).toEqual(4);

            m.clear();
            expect(m.size).toEqual(0);
        });
    });

    describe("WeakMap", function () {

        it("should be a collection of key/value pairs;\n            keys are objects and values are arbitrary", function () {
            // The code comes from:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
            var wm1 = new WeakMap(),
                wm2 = new WeakMap(),
                wm3 = new WeakMap(),
                o1 = {},
                o2 = function o2() {},
                o3 = window;

            wm1.set(o1, 37);
            wm1.set(o2, "azerty");
            wm2.set(o1, o2); // a value can be anything, including an object or a function
            wm2.set(o3, undefined);
            wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

            expect(wm1.get(o2)).toEqual("azerty");
            expect(wm2.get(o2)).toBeUndefined(); // undefined, because there is no value for o2 on wm2
            expect(wm2.get(o3)).toBeUndefined(); // undefined, because that is the set value

            expect(wm1.has(o2)).toEqual(true);
            expect(wm2.has(o2)).toEqual(false);
            expect(wm2.has(o3)).toEqual(true); // (even if the value itself is 'undefined')

            wm3.set(o1, 37);
            expect(wm3.get(o1)).toEqual(37);

            expect(wm1.has(o1)).toEqual(true);
            wm1["delete"](o1);
            expect(wm1.has(o1)).toEqual(false);
        });
    });
});
},{}],4:[function(require,module,exports){
"use strict";

describe("Default Parameters", function () {

    it("should allow functions to have optional arguments", function () {
        function f(list) {
            var indexA = arguments[1] === undefined ? 0 : arguments[1];
            var indexB = arguments[2] === undefined ? list.length : arguments[2];
            return (function () {
                return [list, indexA, indexB];
            })();
        }
        expect(f([1, 2, 3])).toEqual([[1, 2, 3], 0, 3]);
        expect(f([1, 2, 3], 1)).toEqual([[1, 2, 3], 1, 3]);
        expect(f([1, 2, 3], 1, 2)).toEqual([[1, 2, 3], 1, 2]);
    });
});
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

describe("Generators", function () {

    it("should make functions yielding", function () {
        var marked2$0 = [foo].map(regeneratorRuntime.mark);

        function foo() {
            var i;
            return regeneratorRuntime.wrap(function foo$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        i = 0;
                        context$3$0.next = 3;
                        return ++i;

                    case 3:
                        context$3$0.next = 5;
                        return ++i;

                    case 5:
                        context$3$0.next = 7;
                        return ++i;

                    case 7:
                    case "end":
                        return context$3$0.stop();
                }
            }, marked2$0[0], this);
        }

        var seq = foo();
        expect(seq.next().value).toEqual(1);
        expect(seq.next().value).toEqual(2);
        expect(seq.next().value).toEqual(3);
    });

    it("should iterate generator using yield", function () {
        function fibonacci(i) {
            return _defineProperty({}, Symbol.iterator, regeneratorRuntime.mark(function callee$3$0() {
                var pre, cur, _ref2;

                return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                    while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                            pre = -1, cur = 1;

                        case 1:
                            if (! i--) {
                                context$4$0.next = 9;
                                break;
                            }

                            _ref2 = [cur, pre + cur];
                            pre = _ref2[0];
                            cur = _ref2[1];
                            context$4$0.next = 7;
                            return cur;

                        case 7:
                            context$4$0.next = 1;
                            break;

                        case 9:
                        case "end":
                            return context$4$0.stop();
                    }
                }, callee$3$0, this);
            }));
        }

        var fib = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = fibonacci(10)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var n = _step.value;

                fib.push(n);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        expect(fib).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it("should handle recursive yielding", function () {
        var marked2$0 = [flatten].map(regeneratorRuntime.mark);

        function flatten(t) {
            var n = arguments[1] === undefined ? 0 : arguments[1];
            return regeneratorRuntime.wrap(function flatten$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        if (!t[n]) {
                            context$3$0.next = 8;
                            break;
                        }

                        if (!Array.isArray(t[n])) {
                            context$3$0.next = 5;
                            break;
                        }

                        return context$3$0.delegateYield(flatten(t[n]), "t0", 3);

                    case 3:
                        context$3$0.next = 7;
                        break;

                    case 5:
                        context$3$0.next = 7;
                        return t[n];

                    case 7:
                        return context$3$0.delegateYield(flatten(t, n + 1), "t1", 8);

                    case 8:
                    case "end":
                        return context$3$0.stop();
                }
            }, marked2$0[0], this);
        }

        var nums = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = flatten([10, 11, 12, [13, 14, [15, 16]], 17])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var n = _step2.value;

                nums.push(n);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        expect(nums).toEqual([10, 11, 12, 13, 14, 15, 16, 17]);
    });

    it("should handle \"multiple entry-points\"", function () {
        var marked2$0 = [powGenerator].map(regeneratorRuntime.mark);

        // The idea comes from http://youtu.be/s-BwEk-Y4kg?t=14m42s
        function powGenerator() {
            return regeneratorRuntime.wrap(function powGenerator$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.next = 2;
                        return "a";

                    case 2:
                        context$3$0.t0 = context$3$0.sent;
                        context$3$0.next = 5;
                        return "b";

                    case 5:
                        context$3$0.t1 = context$3$0.sent;
                        return context$3$0.abrupt("return", Math.pow(context$3$0.t0, context$3$0.t1));

                    case 7:
                    case "end":
                        return context$3$0.stop();
                }
            }, marked2$0[0], this);
        }

        var g = powGenerator();
        expect(g.next().value).toEqual("a");
        expect(g.next(10).value).toEqual("b");
        expect(g.next(2).value).toEqual(100);
    });

    // @TODO ES6/7 Async Generators
});
},{}],7:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

describe("Iterators and For Of", function () {

    it("should iterate fibonacci using next()", function () {
        function fibonacci(i) {
            return _defineProperty({}, Symbol.iterator, function () {
                var pre = -1,
                    cur = 1;
                return {
                    next: function next() {
                        var _ref2 = [cur, pre + cur];
                        pre = _ref2[0];
                        cur = _ref2[1];

                        return { done: ! i--, value: cur };
                    }
                };
            });
        }

        var fib = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = fibonacci(10)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var n = _step.value;

                fib.push(n);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        expect(fib).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });
});
},{}],8:[function(require,module,exports){
"use strict";

describe("Block Scoped Binding", function () {

    it("should provide scopes other than\n        the function and top level scope", function () {
        // According MDN
        // var scope is its the enclosing function or global
        // let scope is the block, statement, or expression

        (function () {
            var funcs = [];
            var _arr = [4, 5, 6];
            for (var _i = 0; _i < _arr.length; _i++) {
                var i = _arr[_i];
                funcs.push(function () {
                    return i;
                });
            }
            expect([funcs[0](), funcs[1](), funcs[2]()]).toEqual([6, 6, 6]);
        })();

        (function () {
            var funcs = [];
            var _arr2 = [4, 5, 6];

            var _loop = function () {
                var i = _arr2[_i2];
                funcs.push(function () {
                    return i;
                });
            };

            for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
                _loop();
            }
            expect([funcs[0](), funcs[1](), funcs[2]()]).toEqual([4, 5, 6]);
        })();

        expect(function () {
            if (true) {
                var x = 1;
            }
            expect(x).toEqual(1);
        }).not.toThrowError();

        expect(function () {
            if (true) {
                var _x = 1;
            }
            expect(x).toEqual(1);
        }).toThrowError("x is not defined");

        expect(function () {
            if (true) {
                var _x2 = 1;
            }
            expect(x).toEqual(1);
        }).toThrowError("x is not defined");

        expect(function () {
            var x = 1;
            var y = { x: 1 };
            var z = { x: 1 };
            // x = 2;       // error
            // y = {x: 2};  // error
            z.x = 2;
            // overwriting fails
            expect(x).toEqual(1);
            expect(y).toEqual({ x: 1 });
            // modifying works, properties are not protected
            expect(z).toEqual({ x: 2 });
        });
    });
});
},{}],9:[function(require,module,exports){
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
},{"./modules/math":10,"./modules/person":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sum = function sum(x, y) {
    return x + y;
};
exports.sum = sum;
var pi = 3.141593;
exports.pi = pi;
},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = "Foo";
exports.name = name;
var surname = "Bar";
exports.surname = surname;
},{}],12:[function(require,module,exports){
"use strict";

describe("Numeric Literals", function () {

    it("should handle binary (2)", function () {
        expect([7, 240, 15]).toEqual([7, 240, 15]);
    });

    it("should handle octal (8)", function () {
        expect([7, 240, 15]).toEqual([7, 240, 15]);
    });
});
},{}],13:[function(require,module,exports){
"use strict";

describe("Promises", function () {

    function stepPromise(stepper) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                //console.log(stepper);
                if (stepper.steps < 10000) {
                    resolve(stepper);
                } else {
                    reject(new Error("OKAAAYYY! That's enough."));
                }
            }, 100);
        });
    }

    var stepper = undefined,
        promises = undefined;
    beforeEach(function () {
        stepper = {
            steps: 0,
            step: function step() {
                var n = arguments[0] === undefined ? 1 : arguments[0];

                this.steps += n;
                return this;
            }
        };
        promises = [];
        promises.push(new Promise(function (resolve) {
            setTimeout(resolve, 100, 100);
        }));
        promises.push(new Promise(function (resolve) {
            setTimeout(resolve, 200, 200);
        }));
        promises.push(new Promise(function (resolve) {
            setTimeout(resolve, 150, 150);
        }));
    });

    it("should be resolved", function (done) {
        stepPromise(stepper.step()).then(function (stepper) {
            expect(stepper.steps).toEqual(1);
            done();
        });
    });

    it("should be resolved and then chained", function (done) {
        stepPromise(stepper.step()).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function (stepper) {
            return stepPromise(stepper.step(2));
        }).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function (stepper) {
            return stepPromise(stepper.step(3));
        }).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function (stepper) {
            expect(stepper.steps).toEqual(9);
            done();
        });
    });

    it("should be rejected and handled by then", function (done) {
        stepPromise(stepper.step(9999)).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function () {}, function (err) {
            expect(err).toEqual(new Error("OKAAAYYY! That's enough."));
            done();
        });
    });

    it("should be rejected and handled by catch", function (done) {
        stepPromise(stepper.step(9999)).then(function (stepper) {
            return stepPromise(stepper.step());
        })["catch"](function (err) {
            expect(err).toEqual(new Error("OKAAAYYY! That's enough."));
            done();
        });
    });

    describe("Promise.resolve", function () {
        it("should be resolved asynchronously", function (done) {
            var msg = undefined;
            Promise.resolve("Resolved!").then(function (m) {
                msg = m;
                expect(msg).toEqual("Resolved!");
                done();
            });
            expect(msg).toBeUndefined();
        });
    });

    describe("Promise.reject", function () {
        it("should be rejected asynchronously", function (done) {
            var msg = undefined;
            Promise.reject(new Error("Rejected!")).then(function () {}, function (err) {
                msg = err.message;
                expect(msg).toEqual("Rejected!");
                done();
            });
            expect(msg).toBeUndefined();
        });
    });

    describe("Promise.race", function () {
        it("should be resolved on first promise resolve", function (done) {
            Promise.race(promises).then(function (value) {
                expect(value).toEqual(100);
                done();
            });
        });

        it("should be rejected if first promise has been rejected", function (done) {
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(reject, 50, new Error("Rejected"));
            }));
            Promise.race(promises)["catch"](function (err) {
                expect(err).toEqual(jasmine.any(Error));
                expect(err.message).toEqual("Rejected");
                done();
            });
        });

        it("should be rejected only if first promise has been rejected", function (done) {
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(reject, 150, new Error("Rejected"));
            }));
            Promise.race(promises).then(function (value) {
                expect(value).toEqual(100);
                done();
            });
        });
    });

    describe("Promise.all", function () {

        it("should be resolved on last promise resolve", function (done) {
            Promise.all(promises).then(function (values) {
                expect(values).toEqual([100, 200, 150]);
                done();
            });
        });

        it("should be rejected if any promise has been rejected", function (done) {
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(reject, 150, new Error("Rejected"));
            }));
            Promise.all(promises)["catch"](function (err) {
                expect(err).toEqual(jasmine.any(Error));
                expect(err.message).toEqual("Rejected");
                done();
            });
        });
    });
});
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
"use strict";

describe("Spread", function () {

    it("should be reverse of rest parameters", function () {
        function send(what, where, toWhom) {
            return "I'm sending " + what + " to " + toWhom + " who is in " + where + ".";
        }

        expect(send.apply(undefined, ["the letter", "Poland", "Mike"])).toEqual("I'm sending the letter to Mike who is in Poland.");
    });
});
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
"use strict";

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

describe("Template Literals", function () {

    var name = undefined,
        surname = undefined,
        email = undefined;
    beforeEach(function () {
        name = "Foo";
        surname = "Bar";
        email = "foo@example.com";
    });

    it("should annihilate \"var1 + ' ' + var2\" hell", function () {
        expect("" + name + " " + surname).toEqual("Foo Bar");
    });

    it("should provide tagged template strings", function () {
        function vCard(strs) {
            for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                values[_key - 1] = arguments[_key];
            }

            var card = {};
            var regExp = /[\t ]*([a-zA-Z@\. ]+): /;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = strs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var str = _step.value;

                    if (regExp.test(str)) {
                        card[str.match(regExp)[1]] = values.shift();
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return card;
        }
        expect(vCard(_taggedTemplateLiteral(["First name: ", "\n            Last name: ", "\n            Email: ", ""], ["First name: ", "\n            Last name: ", "\n            Email: ", ""]), name, surname, email)).toEqual({
            "First name": "Foo",
            "Last name": "Bar",
            Email: "foo@example.com"
        });
    });
});
},{}]},{},[1,2,3,4,5,6,7,8,9,12,13,14,15,16,17]);
