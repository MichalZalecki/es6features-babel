"use strict";

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

require("babel/polyfill");

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