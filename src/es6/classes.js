describe("Classes", () => {

    it("should be syntactical sugar over the Objects and prototypes", () => {
        class Point {
            constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
            update(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
        }

        class Circle extends Point {
            constructor(r, x, y) {
                super(x, y);
                this.r = r;
            }
            update(r, x, y) {
                super.update(x, y);
                this.r = r;
            }
            isPointIncluded(point) {
                if (point.constructor != Point)
                    throw new Error("point must be an instance of Point");

                return Math.pow(this.r, 2)+Math.pow(this.y, 2) >=
                       Math.pow(this.x-point.x, 2)+Math.pow(this.y-point.y, 2);
            }
        }

        let c1 = new Circle(3);
        expect(c1.isPointIncluded(new Point())).toEqual(true);
        expect(c1.isPointIncluded(new Point(0, 3))).toEqual(true);
        expect(c1.isPointIncluded(new Point(3, 3))).toEqual(false);

        let c2 = new Circle(6, 2, 1);
        expect(c2.isPointIncluded(new Point(2, 7))).toEqual(true);
        expect(c2.isPointIncluded(new Point(3, -1))).toEqual(true);
        expect(c2.isPointIncluded(new Point(6, 6))).toEqual(false);
        c2.update(6, 2, 2);
        expect(c2.isPointIncluded(new Point(6, 6))).toEqual(true);
    });

});
