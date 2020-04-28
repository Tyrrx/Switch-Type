import {expect} from "chai";
import {Create} from "./Create";
import {Failure} from "./Failure";
import {Success} from "./Success";

describe("Result class", () => {
    it("should be able to execute a test", () => {
        expect(Create.success("hi").bind((m) => {
            return Create.failure("meh");
        })).to.be.an.instanceOf(Success);
    });
});
