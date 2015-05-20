describe("Numeric Literals", () => {

    it("should handle binary (2)", () => {
        expect([
            0b111,
            0b11110000,
            0b00001111
        ]).toEqual([
            7,
            240,
            15
        ]);
    });

    it("should handle octal (8)", () => {
        expect([
            0o7,
            0o360,
            0o17
        ]).toEqual([
            7,
            240,
            15
        ]);
    });

});
