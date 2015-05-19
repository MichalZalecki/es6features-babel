"use strict";

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

describe("Template Literals", function () {

    var name = undefined,
        surname = undefined,
        email = undefined;
    beforeEach(function () {
        name = "Foo";
        surname = "Bar";
        email = "foo@example.com";
    });

    it("should annihilate \"var1 + ' ' + var2\" hell", function () {
        expect("" + name + " " + surname).toEqual("Foo Bar");
    });

    it("should provide tagged template strings", function () {
        function vCard(strs) {
            for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                values[_key - 1] = arguments[_key];
            }

            var card = {};
            var regExp = /[\t ]*([a-zA-Z@\. ]+): /;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = strs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var str = _step.value;

                    if (regExp.test(str)) {
                        card[str.match(regExp)[1]] = values.shift();
                    }
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

            return card;
        }
        expect(vCard(_taggedTemplateLiteral(["First name: ", "\n            Last name: ", "\n            Email: ", ""], ["First name: ", "\n            Last name: ", "\n            Email: ", ""]), name, surname, email)).toEqual({
            "First name": "Foo",
            "Last name": "Bar",
            Email: "foo@example.com"
        });
    });
});