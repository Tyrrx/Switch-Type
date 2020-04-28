import {Create} from "./Create";
import {Failure} from "./Failure";
import {Success} from "./Success";

type ResultType<T> = Success<T> | Failure<T> | Result<T>;

export class Result<T> {
    protected isSuccess: boolean;

    public matchVoid(success: (value: T) => void, failure: (error: string) => void): void {
        this.match((v) => success(v), (e) => failure(e));
    }

    public match<T1>(success: (value: T) => T1, failure: (error: string) => T1): T1 {
        if (this.isSuccess) {
            return success(this.toSuccess().value);
        } else {
            return failure(this.toFailure().message);
        }
    }

    public bind<T1>(bind: (value: T) => Result<T1>): Result<T1> {
        if (this.isSuccess) {
            return bind(this.toSuccess().value);
        }
        return this.toFailure().convert<T1>();
    }

    public map<T1>(map: (value: T) => T1): Result<T1> {
        return this.bind( (value) => Create.success<T1>(map(value)));
    }

    private toSuccess(): Success<T> {
        return this as ResultType<T> as Success<T>;
    }

    private toFailure(): Failure<T> {
        return this as ResultType<T> as Failure<T>;
    }

    // @ts-ignore
    private concat(other: Result<any>): Array<Result<any>> {
        const arr = new Array<Result<any>>();
        arr.push(this);
        arr.push(other);
        return arr;
    }

    // @ts-ignore
    private concat(others: Array<Result<any>>): Array<Result<any>> {
        const arr = new Array<Result<any>>();
        arr.push(this);
        others.forEach((e) => arr.push(e));
        return arr;
    }
}
