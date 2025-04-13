import { int32 } from "./Int32.js";
import { compare, IComparer, physicalHash, equals, structuralHash, IEqualityComparer } from "./Util.js";

export function HashIdentity_FromFunctions<T>(hash: ((arg0: T) => int32), eq: ((arg0: T, arg1: T) => boolean)): IEqualityComparer<T> {
    return {
        Equals(x: T, y: T): boolean {
            return eq(x, y);
        },
        GetHashCode(x_1: T): int32 {
            return hash(x_1);
        },
    };
}

export function HashIdentity_Structural<T>(): IEqualityComparer<T> {
    return HashIdentity_FromFunctions<T>(structuralHash, equals);
}

export function HashIdentity_Reference<T>(): IEqualityComparer<T> {
    return HashIdentity_FromFunctions<T>(physicalHash, (e: T, e_1: T): boolean => (e === e_1));
}

export function ComparisonIdentity_FromFunction<T>(comparer: ((arg0: T, arg1: T) => int32)): IComparer<T> {
    return {
        Compare(x: T, y: T): int32 {
            return comparer(x, y);
        },
    };
}

export function ComparisonIdentity_Structural<T>(): IComparer<T> {
    return ComparisonIdentity_FromFunction<T>(compare);
}

