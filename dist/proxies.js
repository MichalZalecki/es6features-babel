"use strict";

describe("Proxy", function () {

    if (typeof Proxy != "function") {
        console.warn("Proxy is not supported");
        return;
    }

    describe("revocable()", function () {

        it("creates a revocable Proxy", function () {
            var target = {};
            var handler = { get: function get() {
                    return "tomato";
                } };

            var _Proxy$revocable = Proxy.revocable(target, handler);

            var proxy = _Proxy$revocable.proxy;
            var revoke = _Proxy$revocable.revoke;

            expect(proxy.foo).toEqual("tomato");
            revoke();
            // trap will trigger TypeError
            expect(function () {
                proxy.foo;
            }).toThrowError(TypeError);
            expect(function () {
                proxy.foo = 1;
            }).toThrowError(TypeError);
            // no trap  used to trigger TypeError
            expect(typeof proxy).toBe("object");
        });
    });

    describe("get()", function () {

        it("is a trap for getting a property value", function () {
            var target = {
                first_name: "Foo"
            };
            var handler = {
                get: function get(target, property, receiver) {
                    return property in target ? target[property] : "unknown";
                }
            };

            var proxy = new Proxy(target, handler);
            expect(proxy.first_name).toEqual("Foo");
            expect(proxy.last_name).toEqual("unknown");
        });
    });

    describe("set()", function () {

        it("is a trap for setting a property value", function () {
            var target = {
                age: 20
            };
            var handler = {
                set: function set(target, property, value, receiver) {
                    if (property == "age" && value < 0) target["age"] = 0;else target[property] = value;
                    return true;
                }
            };

            var proxy = new Proxy(target, handler);
            proxy.age = 30;
            expect(proxy.age).toEqual(30);
            proxy.age = -30;
            expect(proxy.age).toEqual(0);
        });

        it("is passing receiver which points to the object on which assignments was originally made", function () {

            var obj = {};
            var handler = { set: function set(target, property, value, receiver) {
                    // check whether receiver points to the value and save
                    // the result of comparison as the new property
                    target[property] = value == receiver;
                    return true;
                } };
            var proxy = new Proxy(obj, handler);

            var fromProxy = Object.create(proxy);

            proxy.foo = proxy;
            fromProxy.bar = proxy;
            fromProxy.baz = fromProxy;

            expect(proxy.foo).toBe(true);
            expect(fromProxy.bar).toBe(false);
            expect(fromProxy.baz).toBe(true);
        });
    });

    describe("has()", function () {

        it("is a trap for the in operator", function () {
            var target = {
                first_name: "Foo",
                say_hi: function say_hi() {
                    return "hello!";
                }
            };
            var handler = {
                has: function has(target, property) {
                    return typeof target[property] != "function";
                }
            };

            var proxy = new Proxy(target, handler);
            expect("first_name" in proxy).toEqual(true);
            expect("say_hi" in proxy).toEqual(false);
        });
    });

    describe("enumerate()", function () {

        it("is a trap for for...in statements", function () {
            var target = {
                first_name: "Foo",
                last_name: "Bar",
                say_hi: function say_hi() {
                    return "hello!";
                }
            };
            var handler = {
                enumerate: function enumerate(target) {
                    var props = [];
                    for (var prop in target) {
                        if (typeof target[prop] != "function") props.push(target[prop]);
                    }
                    return props[Symbol.iterator]();
                }
            };

            var proxy = new Proxy(target, handler);
            var props = [];
            for (var prop in proxy) {
                props.push(prop);
            }
            expect(props).toEqual(["Foo", "Bar"]);
        });
    });

    // @TODO: More examples

    describe("address book example", function () {

        it("is a simple address book", function () {

            var address = {
                "Marie Lynch": "mlynch2@state.tx.us",
                "Ryan Bradley": "rbradley3@com.com" };

            var handler = {
                set: function set(target, property, value, receiver) {
                    if (!value.match(/^\S+@\S+\.\S+$/)) throw new TypeError("" + value + " is invalid email!");
                    target[property] = value;
                    return true;
                },
                get: function get(target, property, receiver) {
                    return property in target ? target[property] : "Not Found";
                }
            };

            var addressBook = new Proxy(address, handler);

            addressBook["Joseph Fields"] = "jfields9@fedbur.com";

            expect(function () {
                addressBook["Kathryn Lewis"] = "klewis.com";
            }).toThrow(new TypeError("klewis.com is invalid email!"));
            expect(addressBook["Marie Lynch"]).toEqual("mlynch2@state.tx.us");
            expect(addressBook["Joseph Fields"]).toEqual("jfields9@fedbur.com");
            expect(addressBook["Kathryn Lewis"]).toEqual("Not Found");
        });
    });
});