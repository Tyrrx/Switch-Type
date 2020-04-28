import {expect} from "chai";
import {Create} from "./Create";

describe("Result class", () => {
    it("Test matchVoid on success", () => {
        Create.success(42)
            .matchVoid(
                (value) => expect(value).equal(42),
                (message) => expect(null).not.null);
    });
    it("Test matchVoid on failure", () => {
        Create.failure("error")
            .matchVoid(
                (value) => expect(null).not.null,
                (message) => expect(message).equal("error"));
    });
    it("Test match on success", () => {
        expect(Create.success(42)
            .match(
                (value) => value.toString(),
                (message) => message)).equal("42");
    });
    it("Test match on failure", () => {
        expect(Create.failure("error")
            .match(
                (value) => value.toString(),
                (message) => message)).equal("error");
    });
    it("Test bind success on success", () => {
        expect(Create.success(0).bind(((value) => {
            if (value === 0) {
                return Create.success(42);
            }
            return Create.failure("value was not 0");
        })).match(
                (value) => value.toString(),
                (message) => message)).equal("42");
    });
    it("Test bind failure", () => {
        expect(Create.failure("value was not 0").bind(((value) => {
            return Create.failure("error");
        })).match(
            (value) => value.toString(),
            (message) => message)).equal("value was not 0");
    });
    it("Test bind failure on success", () => {
        expect(Create.success(1).bind(((value) => {
            if (value === 0) {
                return Create.success(42);
            }
            return Create.failure("failure");
        })).match(
            (value) => value.toString(),
            (message) => message)).equal("failure");
    });
    it("Test map transform on success", () => {
        expect(Create.success(1).map(((value: number) => value - 1)).match(
            (value) => value.toString(),
            (message) => message)).equal("0");
    });
    it("Test map transform on failure", () => {
        expect(Create.failure("error").map(((value: number) => value - 1)).match(
            (value) => value.toString(),
            (message) => message)).equal("error");
    });
});
