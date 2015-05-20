import * as mathematics from "./modules/math";
import {name, surname} from "./modules/person";

describe("Modules", () => {

    it("should load everything from modules/math as mathematics", () => {
        expect(mathematics).toEqual(jasmine.any(Object));
        expect(mathematics.sum(2, 3)).toEqual(5);
        expect(mathematics.pi).toEqual(3.141593);
    });

    it("should load name and surname from modules/person", () => {
        expect(name).toEqual("Foo");
        expect(surname).toEqual("Bar");
    });

});
