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