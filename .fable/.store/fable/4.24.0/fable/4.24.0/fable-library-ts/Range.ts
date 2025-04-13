import { compare } from "./Util.js";
import { float64, int32 } from "./Int32.js";
import { Option } from "./Option.js";
import { unfold, delay } from "./Seq.js";
import { uint64, toUInt64, int64, toInt64, op_Addition, fromZero } from "./BigInt.js";
import { decimal, op_Addition as op_Addition_1, fromParts } from "./Decimal.js";

export function makeRangeStepFunction<T>(step: T, stop: T, zero: T, add: ((arg0: T, arg1: T) => T)): ((arg0: T) => Option<[T, T]>) {
    const stepComparedWithZero: int32 = compare(step, zero) | 0;
    if (stepComparedWithZero === 0) {
        throw new Error("The step of a range cannot be zero");
    }
    const stepGreaterThanZero: boolean = stepComparedWithZero > 0;
    return (x: T): Option<[T, T]> => {
        const comparedWithLast: int32 = compare(x, stop) | 0;
        return ((stepGreaterThanZero && (comparedWithLast <= 0)) ? true : (!stepGreaterThanZero && (comparedWithLast >= 0))) ? ([x, add(x, step)] as [T, T]) : undefined;
    };
}

export function integralRangeStep<T>(start: T, step: T, stop: T, zero: T, add: ((arg0: T, arg1: T) => T)): Iterable<T> {
    const stepFn: ((arg0: T) => Option<[T, T]>) = makeRangeStepFunction<T>(step, stop, zero, add);
    return delay<T>((): Iterable<T> => unfold<T, T>(stepFn, start));
}

export function rangeBigInt(start: bigint, step: bigint, stop: bigint): Iterable<bigint> {
    return integralRangeStep<bigint>(start, step, stop, fromZero(), op_Addition);
}

export function rangeDecimal(start: decimal, step: decimal, stop: decimal): Iterable<decimal> {
    return integralRangeStep<decimal>(start, step, stop, fromParts(0, 0, 0, false, 0), op_Addition_1);
}

export function rangeDouble(start: float64, step: float64, stop: float64): Iterable<float64> {
    return integralRangeStep<float64>(start, step, stop, 0, (x: float64, y: float64): float64 => (x + y));
}

export function rangeInt64(start: int64, step: int64, stop: int64): Iterable<int64> {
    return integralRangeStep<int64>(start, step, stop, 0n, (x: int64, y: int64): int64 => toInt64(op_Addition(x, y)));
}

export function rangeUInt64(start: uint64, step: uint64, stop: uint64): Iterable<uint64> {
    return integralRangeStep<uint64>(start, step, stop, 0n, (x: uint64, y: uint64): uint64 => toUInt64(op_Addition(x, y)));
}

export function rangeChar(start: string, stop: string): Iterable<string> {
    const intStop: int32 = ~~stop.charCodeAt(0) | 0;
    return delay<string>((): Iterable<string> => unfold<int32, string>((c: int32): Option<[string, int32]> => {
        if (c <= intStop) {
            return [String.fromCharCode(c), c + 1] as [string, int32];
        }
        else {
            return undefined;
        }
    }, ~~start.charCodeAt(0)));
}

