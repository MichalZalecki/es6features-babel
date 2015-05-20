describe("Iterators and For Of", () => {

    it("should iterate fibonacci using next()", () => {
        function fibonacci(i) {
            return {
                [Symbol.iterator]() {
                    let pre = -1, cur = 1;
                    return {
                        next() {
                            [pre, cur] = [cur, pre + cur];
                            return {done: !(i--), value: cur};
                        }
                    }
                }
            }
        }

        let fib = [];
        for (let n of fibonacci(10)) {
            fib.push(n);
        }
        expect(fib).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

});
