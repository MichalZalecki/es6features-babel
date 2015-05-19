describe("Promises", () => {

    function stepPromise(stepper) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //console.log(stepper);
                if (stepper.steps < 10000) {
                    resolve(stepper);
                } else {
                    reject(new Error("OKAAAYYY! That's enough."));
                }
            }, 100);
        });
    }

    let stepper, promises;
    beforeEach(() => {
        stepper = {
            steps: 0,
            step(n = 1) {
                this.steps += n;
                return this;
            }
        };
        promises = [];
        promises.push(new Promise((resolve) => {
            setTimeout(resolve, 100, 100);
        }));
        promises.push(new Promise((resolve) => {
            setTimeout(resolve, 200, 200);
        }));
        promises.push(new Promise((resolve) => {
            setTimeout(resolve, 150, 150);
        }));
    });

    it("should be resolved", (done) => {
        stepPromise(stepper.step())
            .then((stepper) => {
                expect(stepper.steps).toEqual(1);
                done();
            });
    });

    it("should be resolved and then chained", (done) => {
        stepPromise(stepper.step())
            .then((stepper) => stepPromise(stepper.step()))
            .then((stepper) => stepPromise(stepper.step(2)))
            .then((stepper) => stepPromise(stepper.step()))
            .then((stepper) => stepPromise(stepper.step(3)))
            .then((stepper) => stepPromise(stepper.step()))
            .then((stepper) => {
                expect(stepper.steps).toEqual(9);
                done();
            });
    });

    it("should be rejected and handled by then", (done) => {
        stepPromise(stepper.step(9999))
            .then((stepper) => stepPromise(stepper.step()))
            .then(() => {}, (err) => {
                expect(err).toEqual(new Error("OKAAAYYY! That's enough."));
                done();
            });
    });

    it("should be rejected and handled by catch", (done) => {
        stepPromise(stepper.step(9999))
            .then((stepper) => stepPromise(stepper.step()))
            .catch((err) => {
                expect(err).toEqual(new Error("OKAAAYYY! That's enough."));
                done();
            });
    });

    describe("Promise.resolve", () => {
        it("should be resolved asynchronously", (done) => {
            let msg;
            Promise.resolve("Resolved!").then((m) => {
                msg = m;
                expect(msg).toEqual("Resolved!");
                done();
            });
            expect(msg).toBeUndefined();
        });
    });

    describe("Promise.reject", () => {
        it("should be rejected asynchronously", (done) => {
            let msg;
            Promise.reject(new Error("Rejected!")).then(() => {
            }, (err) => {
                msg = err.message;
                expect(msg).toEqual("Rejected!");
                done();
            });
            expect(msg).toBeUndefined();
        });
    });

    describe("Promise.race", () => {
        it("should be resolved on first promise resolve", (done) => {
            Promise.race(promises)
                .then((value) => {
                    expect(value).toEqual(100);
                    done();
                });
        });

        it("should be rejected if first promise has been rejected", (done) => {
            promises.push(new Promise((resolve, reject) => {
                setTimeout(reject, 50, new Error("Rejected"));
            }));
            Promise.race(promises)
                .catch((err) => {
                    expect(err).toEqual(jasmine.any(Error));
                    expect(err.message).toEqual("Rejected");
                    done();
                });
        });

        it("should be rejected only if first promise has been rejected", (done) => {
            promises.push(new Promise((resolve, reject) => {
                setTimeout(reject, 150, new Error("Rejected"));
            }));
            Promise.race(promises)
                .then((value) => {
                    expect(value).toEqual(100);
                    done();
                });
        });
    });

    describe("Promise.all", () => {

        it("should be resolved on last promise resolve", (done) => {
            Promise.all(promises)
                .then((values) => {
                    expect(values).toEqual([100, 200, 150]);
                    done();
                });
        });

        it("should be rejected if any promise has been rejected", (done) => {
            promises.push(new Promise((resolve, reject) => {
                setTimeout(reject, 150, new Error("Rejected"));
            }));
            Promise.all(promises)
                .catch((err) => {
                    expect(err).toEqual(jasmine.any(Error));
                    expect(err.message).toEqual("Rejected");
                    done();
                });
        });

    });

});
