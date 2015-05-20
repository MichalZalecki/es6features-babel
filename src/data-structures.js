describe("Data Structures", () => {

    describe("Set", () => {

        it("should store unique values of any type", () => {
            let s = new Set(["Foo", "Bar"]);
            s.add(false).add(123).add("Bar");

            expect(s.size).toEqual(4);

            expect(s.has("Bar")).toBe(true);
            expect(s.has(123)).toBe(true);
            expect(s.has(true)).toBe(false);

            let setIter = s.entries();

            expect(setIter.next().value).toEqual(["Foo", "Foo"]);
            expect(setIter.next().value).toEqual(["Bar", "Bar"]);
            expect(setIter.next().value).toEqual([false, false]);
            expect(setIter.next().value).toEqual([123, 123]);
            expect(setIter.next().value).toBeUndefined();

            let setIter2 = s.values();

            expect(setIter2.next().value).toEqual("Foo");
            expect(setIter2.next().value).toEqual("Bar");
            expect(setIter2.next().value).toEqual(false);
            expect(setIter2.next().value).toEqual(123);
            expect(setIter2.next().value).toBeUndefined();

            expect(s.delete("Bar")).toEqual(true);
            expect(s.has("Bar")).toEqual(false);
            expect(s.size).toEqual(3);

            s.clear();
            expect(s.size).toEqual(0);
        });

    });

    describe("WeakSet", () => {

        it("should store weakly held objects", () => {
            let ws = new WeakSet(),
                o1 = {},
                o2 = function () {},
                o3 = window;

            ws.add(o1);
            ws.add(o2);

            expect(ws.has(o1)).toEqual(true);
            expect(ws.has(o2)).toEqual(true);
            expect(ws.has(o3)).toEqual(false);

            ws.delete(o1);
            ws.delete(o2);

            expect(ws.has(o1)).toEqual(false);
            expect(ws.has(o2)).toEqual(false);
        });

    });

    describe("Map", () => {

        it("should be a simple key/value map", () => {
            let m = new Map([["name", "Foo"], ["surname","Bar"]]);
            m.set("age", 20);
            m.set(1, true);
            m.set("nick", "Baz");
            m.set("nick", "FooBaz");

            expect(m.size).toEqual(5);

            expect(m.has("name")).toEqual(true);
            expect(m.has("address")).toEqual(false);
            expect(m.has(1)).toEqual(true);
            expect(m.has(2)).toEqual(false);

            let mapIter = m.entries();

            expect(mapIter.next().value).toEqual(["name", "Foo"]);
            expect(mapIter.next().value).toEqual(["surname", "Bar"]);
            expect(mapIter.next().value).toEqual(["age", 20]);
            expect(mapIter.next().value).toEqual([1, true]);
            expect(mapIter.next().value).toEqual(["nick", "FooBaz"]);
            expect(mapIter.next().value).toBeUndefined();

            let mapIter2 = m.values();

            expect(mapIter2.next().value).toEqual("Foo");
            expect(mapIter2.next().value).toEqual("Bar");
            expect(mapIter2.next().value).toEqual(20);
            expect(mapIter2.next().value).toEqual(true);
            expect(mapIter2.next().value).toEqual("FooBaz");
            expect(mapIter2.next().value).toBeUndefined();

            let mapIter3 = m.keys();

            expect(mapIter3.next().value).toEqual("name");
            expect(mapIter3.next().value).toEqual("surname");
            expect(mapIter3.next().value).toEqual("age");
            expect(mapIter3.next().value).toEqual(1);
            expect(mapIter3.next().value).toEqual("nick");
            expect(mapIter3.next().value).toBeUndefined();

            expect(m.delete("name")).toEqual(true);
            expect(m.has("name")).toEqual(false);
            expect(m.size).toEqual(4);

            m.clear();
            expect(m.size).toEqual(0);
        });

    });

    describe("WeakMap", () => {

        it(`should be a collection of key/value pairs;
            keys are objects and values are arbitrary`, () => {
            // The code comes from:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
            let wm1 = new WeakMap(),
                wm2 = new WeakMap(),
                wm3 = new WeakMap(),
                o1 = {},
                o2 = function () {},
                o3 = window;

            wm1.set(o1, 37);
            wm1.set(o2, "azerty");
            wm2.set(o1, o2); // a value can be anything, including an object or a function
            wm2.set(o3, undefined);
            wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

            expect(wm1.get(o2)).toEqual("azerty");
            expect(wm2.get(o2)).toBeUndefined(); // undefined, because there is no value for o2 on wm2
            expect(wm2.get(o3)).toBeUndefined(); // undefined, because that is the set value

            expect(wm1.has(o2)).toEqual(true);
            expect(wm2.has(o2)).toEqual(false);
            expect(wm2.has(o3)).toEqual(true); // (even if the value itself is 'undefined')

            wm3.set(o1, 37);
            expect(wm3.get(o1)).toEqual(37);

            expect(wm1.has(o1)).toEqual(true);
            wm1.delete(o1);
            expect(wm1.has(o1)).toEqual(false);
        });

    });

});
