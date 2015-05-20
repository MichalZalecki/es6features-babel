"use strict";

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe("Classes", function () {

    it("should be syntactical sugar over the Objects and prototypes", function () {
        var Point = (function () {
            function Point() {
                var x = arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments[1] === undefined ? 0 : arguments[1];

                _classCallCheck(this, Point);

                this.x = x;
                this.y = y;
            }

            _createClass(Point, [{
                key: "update",
                value: function update() {
                    var x = arguments[0] === undefined ? 0 : arguments[0];
                    var y = arguments[1] === undefined ? 0 : arguments[1];

                    this.x = x;
                    this.y = y;
                }
            }]);

            return Point;
        })();

        var Circle = (function (_Point) {
            function Circle(r, x, y) {
                _classCallCheck(this, Circle);

                _get(Object.getPrototypeOf(Circle.prototype), "constructor", this).call(this, x, y);
                this.r = r;
            }

            _inherits(Circle, _Point);

            _createClass(Circle, [{
                key: "update",
                value: function update(r, x, y) {
                    _get(Object.getPrototypeOf(Circle.prototype), "update", this).call(this, x, y);
                    this.r = r;
                }
            }, {
                key: "isPointIncluded",
                value: function isPointIncluded(point) {
                    if (point.constructor != Point) throw new Error("point must be an instance of Point");

                    return Math.pow(this.r, 2) + Math.pow(this.y, 2) >= Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
                }
            }]);

            return Circle;
        })(Point);

        var c1 = new Circle(3);
        expect(c1.isPointIncluded(new Point())).toEqual(true);
        expect(c1.isPointIncluded(new Point(0, 3))).toEqual(true);
        expect(c1.isPointIncluded(new Point(3, 3))).toEqual(false);

        var c2 = new Circle(6, 2, 1);
        expect(c2.isPointIncluded(new Point(2, 7))).toEqual(true);
        expect(c2.isPointIncluded(new Point(3, -1))).toEqual(true);
        expect(c2.isPointIncluded(new Point(6, 6))).toEqual(false);
        c2.update(6, 2, 2);
        expect(c2.isPointIncluded(new Point(6, 6))).toEqual(true);
    });
});