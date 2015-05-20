describe('Object', () => {

    describe('.is(o1, o2) ', () => {

        it('should determines whether two values are the same value', () => {

            let a = {},
                b = a,
                c = {};

            expect(Object.is()).toEqual(true); // undefined, undefined
            expect(Object.is(a, b)).toEqual(true);
            expect(Object.is(null, null)).toEqual(true);
            expect(Object.is(Symbol.for('b'), Symbol.for('b'))).toEqual(true);
            expect(Object.is(NaN, 0/-0)).toEqual(true);

            expect(Object.is(a, c)).toEqual(false);
            expect(Object.is([], [])).toEqual(false);
            expect(Object.is(Symbol('a'), Symbol('a'))).toEqual(false);
            expect(Object.is(0, -0)).toEqual(false);
        });

    });

    describe('.assign(target, ...sources)', () => {

        let a = null,
            b = null,
            c = null;

        beforeEach(() => {
            a = { a: 97 };
            b = { b: 98 };
            c = { c: 99 };
        });

        it('should copy properties of sources to target', () => {

            expect(Object.assign(a, b, c))
                .toEqual({ a: 97, b: 98, c:99 });

            expect(a)
                .toEqual({ a: 97, b: 98, c:99 });
        });

        it('properties must be own and enumerable', () => {

            expect(Object.assign({ a: 64 }, a, b, c))
                .toEqual({ a: 97, b: 98, c:99 });

            let b2 = Object.create({d: 100}, { // d is inherited
               b: {
                   value: 100 // not enumerable by default
               },
               d: {
                   value: 100,
                   enumerable: true
               }
            });

            expect(Object.assign({ a: 64 }, a, b2, c))
                .toEqual({ a: 97, c: 99, d: 100 });
        });

    });

    describe('.observe(changesArray) [ES7!]', () => {

        it('should observing the changes asynchronously', (done) => {

            var person = {
                alias: "Foo",
                age: 20
            };

            var changes = null;

            Object.observe(person, function (c) {
                changes = c;
            });

            person.alias = "Bar";
            delete person.age;
            person.age = 30;

            setTimeout(function(){
                expect(changes).toEqual([
                    {type: 'update', object: person, name: 'alias', oldValue: 'Foo'},
                    {type: 'delete', object: person, name: 'age'  , oldValue: 20},
                    {type: 'add'   , object: person, name: 'age'}
                ]);
                done();
            }, 0);

        });

    });

    describe('.setPrototypeOf(o, proto)', () => {

        it('should set the prototype (get rid of __proto__)', () => {

            var a = {
                name: 'Bar'
            };

            Object.setPrototypeOf(a, {
                name: 'Foo',
                hello() {
                    return `Hello, ${this.name}!`;
                }
            });

            expect(Object.keys(a)).toEqual(['name']);
            expect(Object.keys(a.__proto__)).toEqual(['name', 'hello']);
            expect(a.hello()).toEqual('Hello, Bar!');

        });

    });

    describe('.getOwnPropertySymbols(o)', () => {

        it('should return symbol properties of given object', () => {

            var a = {
                [Symbol.for('foo')]: 1
            };

            Object.setPrototypeOf(a, {
                [Symbol.for('bar')]: 2
            });

            expect(Object.getOwnPropertyNames(a)).toEqual([]);
            expect(Object.getOwnPropertySymbols(a)).toEqual([Symbol.for('foo')]);

        });

    });

});
