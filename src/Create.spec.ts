import {expect} from "chai";
import {Create} from "./Create";
import {Failure} from "./Failure";
import {Success} from "./Success";

describe("Create class", () => {

    it("should be able to create a Success instance", () => {
        const numberSuccess = Create.success(42);
        expect(numberSuccess).to.be.of.an.instanceOf(Success);
    });
    it("should be able to create a Failure instance", () => {
        const failure = Create.failure("error");
        expect(failure).to.be.of.an.instanceOf(Failure);
    });
});
