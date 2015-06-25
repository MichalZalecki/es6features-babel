"use strict";

describe("Spread", function () {

    it("should be reverse of rest parameters", function () {
        function send(what, where, toWhom) {
            return "I'm sending " + what + " to " + toWhom + " who is in " + where + ".";
        }

        function send_with_default(what, where) {
            var toWhom = arguments[2] === undefined ? "Santa" : arguments[2];

            return "I'm sending " + what + " to " + toWhom + " who is in " + where + ".";
        }

        expect(send.apply(undefined, ["the letter", "Poland", "Mike"])).toEqual("I'm sending the letter to Mike who is in Poland.");
        expect(send_with_default.apply(undefined, ["the letter", "Lapland"])).toEqual("I'm sending the letter to Santa who is in Lapland.");
    });
});