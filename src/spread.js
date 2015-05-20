describe("Spread", () => {

    it("should be reverse of rest parameters", () => {
        function send(what, where, toWhom) {
            return "I'm sending " + what + " to " + toWhom
                 + " who is in " + where + ".";
        }

        expect(send(...["the letter", "Poland", "Mike"]))
            .toEqual("I'm sending the letter to Mike who is in Poland.");
    });

});
