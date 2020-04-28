import {Result} from "./Result";

export class Failure<T> extends Result<T> {
    public message: string;
    protected isSuccess: boolean;
    constructor(message: string) {
        super();
        this.isSuccess = false;
        this.message = message;
    }

    public convert<T1>(): Failure<T1> {
        return new Failure<T1>(this.message);
    }
}
