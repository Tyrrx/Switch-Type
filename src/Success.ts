import {Result} from "./Result";

export class Success<T> extends Result<T> {
    public value: T;
    protected isSuccess: boolean;
    constructor(value: T) {
        super();
        this.isSuccess = true;
        this.value = value;
    }
}
