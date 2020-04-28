import {Create} from "./Create";
import {Result} from "./Result";

export class Results<T extends Result<T>> extends Array<Result<T>> {

    public aggregate(): Result<T[]> {
        const arr = new Array<T>();
        let errorMessages = "";
        this.forEach((r) => r.match( (value) => arr.push(value), (message) => errorMessages += message));
        return errorMessages.length === 0 ? Create.success(arr) : Create.failure(errorMessages);
    }
}
