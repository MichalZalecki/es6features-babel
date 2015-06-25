import {sum, pi} from "./modules/math";
import * as buddy from "./modules/person";
import Awesome from "./modules/awesome";

describe("Modules", () => {

    it("should import everything from modules/math as mathematics", () => {
        expect(sum(2, 3)).toEqual(5);
        expect(pi).toEqual(3.141593);
    });

    it("should forbid overwriting constant pi", () => {
        //pi = 22/7; // error: "pi" is read-only
    });

    it("should import everything from modules/person as buddy", () => {
        expect(buddy).toEqual(jasmine.any(Object));
        expect(buddy.name).toEqual("Foo");
        expect(buddy.surname).toEqual("Bar");
    });

    it("should import class from modules/awesome as awesome", () => {
        expect((new Awesome).hoItIs()).toEqual("awesome");
    })

});
