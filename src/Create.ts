import {Failure} from "./Failure";
import {Success} from "./Success";

export abstract class Create {

    public static failure<T>(message: string ): Failure<T> {
        return new Failure<T>(message);
    }

    public static success<T>(value: T): Success<T> {
        return new Success<T>(value);
    }
}
