describe("Proxy", () => {

    if (typeof Proxy != "function") {
        console.warn("Proxy is not supported");
        return;
    }

    describe("revocable()", () => {

        it("creates a revocable Proxy", () => {
            let target = {};
            let handler = { get: () => "tomato" }
            let {proxy, revoke} = Proxy.revocable(target, handler);

            expect(proxy.foo).toEqual("tomato");
            revoke();
            // trap will trigger TypeError
            expect(() => { proxy.foo }).toThrowError(TypeError);
            expect(() => { proxy.foo = 1 }).toThrowError(TypeError);
            // no trap  used to trigger TypeError
            expect(typeof proxy).toBe('object');
        });

    });

    describe("get()", () => {

        it("is a trap for getting a property value", () => {
            let target = {
                first_name: "Foo"
            };
            let handler = {
                get: (target, property, receiver) => {
                    return property in target ? target[property] : "unknown";
                }
            };

            let proxy = new Proxy(target, handler);
            expect(proxy.first_name).toEqual("Foo");
            expect(proxy.last_name).toEqual("unknown");
        });

    });

    describe("set()", () => {

        it("is a trap for setting a property value", () => {
            let target = {
                age: 20
            };
            let handler = {
                set: (target, property, value, receiver) => {
                    if (property == "age" && value < 0)
                        target["age"] = 0;
                    else
                        target[property] = value;
                    return true;
                }
            };

            let proxy = new Proxy(target, handler);
            proxy.age = 30;
            expect(proxy.age).toEqual(30);
            proxy.age = -30;
            expect(proxy.age).toEqual(0);
        });

        it("is passing receiver which points to the object on which assignments was originally made", () => {

            let obj = {};
            let handler = { set(target, property, value, receiver) {
                // check whether receiver points to the value and save
                // the result of comparison as the new property
                target[property] = (value == receiver);
                return true;
            } };
            let proxy = new Proxy(obj, handler);

            let fromProxy = Object.create(proxy);

            proxy.foo = proxy;
            fromProxy.bar = proxy;
            fromProxy.baz = fromProxy;

            expect(proxy.foo).toBe(true);
            expect(fromProxy.bar).toBe(false);
            expect(fromProxy.baz).toBe(true);
        });

    });

    describe("has()", () => {

        it("is a trap for the in operator", () => {
            let target = {
                first_name: "Foo",
                say_hi: () => "hello!"
            };
            let handler = {
                has: (target, property) => {
                    return typeof target[property] != "function";
                }
            };

            let proxy = new Proxy(target, handler);
            expect("first_name" in proxy).toEqual(true);
            expect("say_hi" in proxy).toEqual(false);
        });

    });

    describe("enumerate()", () => {

        it("is a trap for for...in statements", () => {
            let target = {
                first_name: "Foo",
                last_name: "Bar",
                say_hi: () => "hello!"
            };
            let handler = {
                enumerate(target) {
                    let props = [];
                    for(let prop in target) {
                        if (typeof target[prop] != "function") props.push(target[prop]);
                    }
                    return props[Symbol.iterator]();
                }
            };

            let proxy = new Proxy(target, handler);
            let props = [];
            for(let prop in proxy) {
                props.push(prop);
            }
            expect(props).toEqual(["Foo", "Bar"]);
        });

    });

    // @TODO: More examples

    describe('address book example', () => {

        it('is a simple address book', () => {

            var address = {
                'Marie Lynch': 'mlynch2@state.tx.us',
                'Ryan Bradley': 'rbradley3@com.com' };

            var handler = {
                set: (target, property, value, receiver) => {
                    if (!value.match(/^\S+@\S+\.\S+$/))
                        throw new TypeError(`${value} is invalid email!`);
                    target[property] = value;
                    return true;
                },
                get: (target, property, receiver) => {
                    return property in target ?
                        target[property] : "Not Found"; }
            };

            var addressBook = new Proxy(address, handler);

            addressBook['Joseph Fields'] = 'jfields9@fedbur.com';

            expect(() => { addressBook['Kathryn Lewis'] = 'klewis.com' }).
                toThrow(new TypeError("klewis.com is invalid email!"));
            expect(addressBook['Marie Lynch']).toEqual("mlynch2@state.tx.us");
            expect(addressBook['Joseph Fields']).toEqual("jfields9@fedbur.com");
            expect(addressBook['Kathryn Lewis']).toEqual("Not Found");

        });

    });

});
