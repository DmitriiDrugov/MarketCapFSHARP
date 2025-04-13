import { IDisposable, disposeSafe, defaultOf, IEqualityComparer, IComparer, structuralHash, equals } from "./Util.js";
import { int32 } from "./Int32.js";
import { HashIdentity_Structural, ComparisonIdentity_Structural } from "./FSharp.Collections.js";
import { Option } from "./Option.js";
import { StringBuilder, StringBuilder__Append_Z721C83C5 } from "./System.Text.js";

export const LanguagePrimitives_GenericEqualityComparer: any = {
    "System.Collections.IEqualityComparer.Equals541DA560"(x: any, y: any): boolean {
        return equals(x, y);
    },
    "System.Collections.IEqualityComparer.GetHashCode4E60E31B"(x_1: any): int32 {
        return structuralHash(x_1);
    },
};

export const LanguagePrimitives_GenericEqualityERComparer: any = {
    "System.Collections.IEqualityComparer.Equals541DA560"(x: any, y: any): boolean {
        return equals(x, y);
    },
    "System.Collections.IEqualityComparer.GetHashCode4E60E31B"(x_1: any): int32 {
        return structuralHash(x_1);
    },
};

export function LanguagePrimitives_FastGenericComparer<T>(): IComparer<T> {
    return ComparisonIdentity_Structural<T>();
}

export function LanguagePrimitives_FastGenericComparerFromTable<T>(): IComparer<T> {
    return ComparisonIdentity_Structural<T>();
}

export function LanguagePrimitives_FastGenericEqualityComparer<T>(): IEqualityComparer<T> {
    return HashIdentity_Structural<T>();
}

export function LanguagePrimitives_FastGenericEqualityComparerFromTable<T>(): IEqualityComparer<T> {
    return HashIdentity_Structural<T>();
}

export function Operators_Failure(message: string): Error {
    return new Error(message);
}

export function Operators_FailurePattern(exn: Error): Option<string> {
    return exn.message;
}

export function Operators_NullArg<$a>(x: string): $a {
    throw new Error(x);
}

export function Operators_Using<T extends IDisposable, R>(resource: T, action: ((arg0: T) => R)): R {
    try {
        return action(resource);
    }
    finally {
        if (equals(resource, defaultOf())) {
        }
        else {
            let copyOfStruct: T = resource;
            disposeSafe(copyOfStruct);
        }
    }
}

export function Operators_Lock<$a, $b>(_lockObj: $a, action: (() => $b)): $b {
    return action();
}

export function ExtraTopLevelOperators_LazyPattern<$a>(input: any): $a {
    return input.Value;
}

export function PrintfModule_PrintFormatToStringBuilderThen<$a, $b>(continuation: (() => $a), builder: StringBuilder, format: any): $b {
    return format.cont((s: string): $a => {
        StringBuilder__Append_Z721C83C5(builder, s);
        return continuation();
    });
}

export function PrintfModule_PrintFormatToStringBuilder<$a>(builder: StringBuilder, format: any): $a {
    return PrintfModule_PrintFormatToStringBuilderThen<void, $a>((): void => {
    }, builder, format);
}

