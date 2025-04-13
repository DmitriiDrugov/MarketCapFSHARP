import { Union } from "./Types.js";
import { union_type, TypeInfo } from "./Reflection.js";
import { equals } from "./Util.js";
import { int32 } from "./Int32.js";
import { FSharpList, empty, singleton } from "./List.js";
import { Option, some } from "./Option.js";

export type FSharpResult$2_$union<T, TError> = 
    | FSharpResult$2<T, TError, 0>
    | FSharpResult$2<T, TError, 1>

export type FSharpResult$2_$cases<T, TError> = {
    0: ["Ok", [T]],
    1: ["Error", [TError]]
}

export function FSharpResult$2_Ok<T, TError>(ResultValue: T) {
    return new FSharpResult$2<T, TError, 0>(0, [ResultValue]);
}

export function FSharpResult$2_Error<T, TError>(ErrorValue: TError) {
    return new FSharpResult$2<T, TError, 1>(1, [ErrorValue]);
}

export class FSharpResult$2<T, TError, Tag extends keyof FSharpResult$2_$cases<T, TError>> extends Union<Tag, FSharpResult$2_$cases<T, TError>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpResult$2_$cases<T, TError>[Tag][1]) {
        super();
    }
    cases() {
        return ["Ok", "Error"];
    }
}

export function FSharpResult$2_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpResult`2", [gen0, gen1], FSharpResult$2, () => [[["ResultValue", gen0]], [["ErrorValue", gen1]]]);
}

export function Result_Map<a, b, c>(mapping: ((arg0: a) => b), result: FSharpResult$2_$union<a, c>): FSharpResult$2_$union<b, c> {
    if (result.tag === /* Ok */ 0) {
        return FSharpResult$2_Ok<b, c>(mapping(result.fields[0]));
    }
    else {
        return FSharpResult$2_Error<b, c>(result.fields[0]);
    }
}

export function Result_MapError<a, b, c>(mapping: ((arg0: a) => b), result: FSharpResult$2_$union<c, a>): FSharpResult$2_$union<c, b> {
    if (result.tag === /* Ok */ 0) {
        return FSharpResult$2_Ok<c, b>(result.fields[0]);
    }
    else {
        return FSharpResult$2_Error<c, b>(mapping(result.fields[0]));
    }
}

export function Result_Bind<a, b, c>(binder: ((arg0: a) => FSharpResult$2_$union<b, c>), result: FSharpResult$2_$union<a, c>): FSharpResult$2_$union<b, c> {
    if (result.tag === /* Ok */ 0) {
        return binder(result.fields[0]);
    }
    else {
        return FSharpResult$2_Error<b, c>(result.fields[0]);
    }
}

export function Result_IsOk<a, b>(result: FSharpResult$2_$union<a, b>): boolean {
    if (result.tag === /* Ok */ 0) {
        return true;
    }
    else {
        return false;
    }
}

export function Result_IsError<a, b>(result: FSharpResult$2_$union<a, b>): boolean {
    if (result.tag === /* Ok */ 0) {
        return false;
    }
    else {
        return true;
    }
}

export function Result_Contains<a, b>(value: a, result: FSharpResult$2_$union<a, b>): boolean {
    if (result.tag === /* Ok */ 0) {
        return equals(result.fields[0], value);
    }
    else {
        return false;
    }
}

export function Result_Count<a, b>(result: FSharpResult$2_$union<a, b>): int32 {
    if (result.tag === /* Ok */ 0) {
        return 1;
    }
    else {
        return 0;
    }
}

export function Result_DefaultValue<a, b>(defaultValue: a, result: FSharpResult$2_$union<a, b>): a {
    if (result.tag === /* Ok */ 0) {
        return result.fields[0];
    }
    else {
        return defaultValue;
    }
}

export function Result_DefaultWith<b, a>(defThunk: ((arg0: b) => a), result: FSharpResult$2_$union<a, b>): a {
    if (result.tag === /* Ok */ 0) {
        return result.fields[0];
    }
    else {
        return defThunk(result.fields[0]);
    }
}

export function Result_Exists<a, b>(predicate: ((arg0: a) => boolean), result: FSharpResult$2_$union<a, b>): boolean {
    if (result.tag === /* Ok */ 0) {
        return predicate(result.fields[0]);
    }
    else {
        return false;
    }
}

export function Result_Fold<a, b, s>(folder: ((arg0: s, arg1: a) => s), state: s, result: FSharpResult$2_$union<a, b>): s {
    if (result.tag === /* Ok */ 0) {
        return folder(state, result.fields[0]);
    }
    else {
        return state;
    }
}

export function Result_FoldBack<a, b, s>(folder: ((arg0: a, arg1: s) => s), result: FSharpResult$2_$union<a, b>, state: s): s {
    if (result.tag === /* Ok */ 0) {
        return folder(result.fields[0], state);
    }
    else {
        return state;
    }
}

export function Result_ForAll<a, b>(predicate: ((arg0: a) => boolean), result: FSharpResult$2_$union<a, b>): boolean {
    if (result.tag === /* Ok */ 0) {
        return predicate(result.fields[0]);
    }
    else {
        return true;
    }
}

export function Result_Iterate<a, b>(action: ((arg0: a) => void), result: FSharpResult$2_$union<a, b>): void {
    if (result.tag === /* Ok */ 0) {
        action(result.fields[0]);
    }
}

export function Result_ToArray<a, b>(result: FSharpResult$2_$union<a, b>): a[] {
    if (result.tag === /* Ok */ 0) {
        return [result.fields[0]];
    }
    else {
        return [];
    }
}

export function Result_ToList<a, b>(result: FSharpResult$2_$union<a, b>): FSharpList<a> {
    if (result.tag === /* Ok */ 0) {
        return singleton(result.fields[0]);
    }
    else {
        return empty<a>();
    }
}

export function Result_ToOption<a, b>(result: FSharpResult$2_$union<a, b>): Option<a> {
    if (result.tag === /* Ok */ 0) {
        return some(result.fields[0]);
    }
    else {
        return undefined;
    }
}

export function Result_ToValueOption<a, b>(result: FSharpResult$2_$union<a, b>): Option<a> {
    if (result.tag === /* Ok */ 0) {
        return some(result.fields[0]);
    }
    else {
        return undefined;
    }
}

