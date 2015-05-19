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