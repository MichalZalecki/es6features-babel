describe("Block Scoped Binding", () => {

    it(`should provide scopes other than
        the function and top level scope`, () => {
        // According MDN
        // var scope is its the enclosing function or global
        // let scope is the block, statement, or expression

        (function() {
            let funcs = [];
            for (var i of [4, 5, 6]) {
                funcs.push(function() { return i; });
            }
            expect([funcs[0](), funcs[1](), funcs[2]()]).toEqual([6, 6, 6])
        })();

        (function() {
            let funcs = [];
            for (let i of [4, 5, 6]) {
                funcs.push(function() { return i; });
            }
            expect([funcs[0](), funcs[1](), funcs[2]()]).toEqual([4, 5, 6])
        })();

        expect(() => {
            if (true) {
                var x = 1;
            }
            expect(x).toEqual(1);
        }).not.toThrowError();

        expect(() => {
            if (true) {
                let x = 1;
            }
            expect(x).toEqual(1);
        }).toThrowError("x is not defined");

        expect(() => {
            if (true) {
                const x = 1;
            }
            expect(x).toEqual(1);
        }).toThrowError("x is not defined");

        expect(() => {
            const x = 1;
            const y = {x: 1};
            const z = {x: 1};
            // x = 2;       // error
            // y = {x: 2};  // error
            z.x = 2;
            // overwriting fails
            expect(x).toEqual(1);
            expect(y).toEqual({x: 1});
            // modifying works, properties are not protected
            expect(z).toEqual({x: 2});
        });
    });

});
