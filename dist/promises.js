"use strict";

describe("Promises", function () {

    function stepPromise(stepper) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                //console.log(stepper);
                if (stepper.steps < 10000) {
                    resolve(stepper);
                } else {
                    reject(new Error("OKAAAYYY! That's enough."));
                }
            }, 100);
        });
    }

    var stepper = undefined,
        promises = undefined;
    beforeEach(function () {
        stepper = {
            steps: 0,
            step: function step() {
                var n = arguments[0] === undefined ? 1 : arguments[0];

                this.steps += n;
                return this;
            }
        };
        promises = [];
        promises.push(new Promise(function (resolve) {
            setTimeout(resolve, 100, 100);
        }));
        promises.push(new Promise(function (resolve) {
            setTimeout(resolve, 200, 200);
        }));
        promises.push(new Promise(function (resolve) {
            setTimeout(resolve, 150, 150);
        }));
    });

    it("should be resolved", function (done) {
        stepPromise(stepper.step()).then(function (stepper) {
            expect(stepper.steps).toEqual(1);
            done();
        });
    });

    it("should be resolved and then chained", function (done) {
        stepPromise(stepper.step()).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function (stepper) {
            return stepPromise(stepper.step(2));
        }).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function (stepper) {
            return stepPromise(stepper.step(3));
        }).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function (stepper) {
            expect(stepper.steps).toEqual(9);
            done();
        });
    });

    it("should be rejected and handled by then", function (done) {
        stepPromise(stepper.step(9999)).then(function (stepper) {
            return stepPromise(stepper.step());
        }).then(function () {}, function (err) {
            expect(err).toEqual(new Error("OKAAAYYY! That's enough."));
            done();
        });
    });

    it("should be rejected and handled by catch", function (done) {
        stepPromise(stepper.step(9999)).then(function (stepper) {
            return stepPromise(stepper.step());
        })["catch"](function (err) {
            expect(err).toEqual(new Error("OKAAAYYY! That's enough."));
            done();
        });
    });

    describe("Promise.resolve", function () {
        it("should be resolved asynchronously", function (done) {
            var msg = undefined;
            Promise.resolve("Resolved!").then(function (m) {
                msg = m;
                expect(msg).toEqual("Resolved!");
                done();
            });
            expect(msg).toBeUndefined();
        });
    });

    describe("Promise.reject", function () {
        it("should be rejected asynchronously", function (done) {
            var msg = undefined;
            Promise.reject(new Error("Rejected!")).then(function () {}, function (err) {
                msg = err.message;
                expect(msg).toEqual("Rejected!");
                done();
            });
            expect(msg).toBeUndefined();
        });
    });

    describe("Promise.race", function () {
        it("should be resolved on first promise resolve", function (done) {
            Promise.race(promises).then(function (value) {
                expect(value).toEqual(100);
                done();
            });
        });

        it("should be rejected if first promise has been rejected", function (done) {
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(reject, 50, new Error("Rejected"));
            }));
            Promise.race(promises)["catch"](function (err) {
                expect(err).toEqual(jasmine.any(Error));
                expect(err.message).toEqual("Rejected");
                done();
            });
        });

        it("should be rejected only if first promise has been rejected", function (done) {
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(reject, 150, new Error("Rejected"));
            }));
            Promise.race(promises).then(function (value) {
                expect(value).toEqual(100);
                done();
            });
        });
    });

    describe("Promise.all", function () {

        it("should be resolved on last promise resolve", function (done) {
            Promise.all(promises).then(function (values) {
                expect(values).toEqual([100, 200, 150]);
                done();
            });
        });

        it("should be rejected if any promise has been rejected", function (done) {
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(reject, 150, new Error("Rejected"));
            }));
            Promise.all(promises)["catch"](function (err) {
                expect(err).toEqual(jasmine.any(Error));
                expect(err.message).toEqual("Rejected");
                done();
            });
        });
    });
});