describe("Default Parameters", () => {

    it("should allow functions to have optional arguments", () => {
        function f(list, indexA = 0, indexB = list.length) {
            return [list, indexA, indexB];
        }
        expect(f([1, 2, 3])).toEqual([[1, 2, 3], 0, 3]);
        expect(f([1, 2, 3], 1)).toEqual([[1, 2, 3], 1, 3]);
        expect(f([1, 2, 3], 1, 2)).toEqual([[1, 2, 3], 1, 2]);
    });

});
