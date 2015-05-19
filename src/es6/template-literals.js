describe("Template Literals", () => {

    let name, surname, email;
    beforeEach(() => {
        name = "Foo";
        surname = "Bar";
        email = "foo@example.com";
    });

    it("should annihilate \"var1 + ' ' + var2\" hell", () => {
        expect(`${name} ${surname}`).toEqual("Foo Bar");
    });

    it("should provide tagged template strings", () => {
        function vCard(strs, ...values) {
            let card = {};
            let regExp = /[\t ]*([a-zA-Z@\. ]+): /;
            for (let str of strs) {
                if (regExp.test(str)){
                    card[str.match(regExp)[1]] = values.shift();
                }
            }
            return card;
        }
        expect(
            vCard`First name: ${name}
            Last name: ${surname}
            Email: ${email}`
        ).toEqual({
            "First name": "Foo",
            "Last name": "Bar",
            Email: "foo@example.com"
        });
    });

});
