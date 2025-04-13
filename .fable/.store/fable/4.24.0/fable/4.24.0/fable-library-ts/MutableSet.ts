import { IMap, IEqualityComparer, IDisposable, disposeSafe, defaultOf, ISet, toIterator, IEnumerator, getEnumerator } from "./Util.js";
import { iterate, map, iterateIndexed, concat } from "./Seq.js";
import { setItem } from "./Array.js";
import { int32 } from "./Int32.js";
import { some, Option } from "./Option.js";
import { FSharpRef } from "./Types.js";
import { class_type, TypeInfo } from "./Reflection.js";
import { getItemFromDict, tryGetValue } from "./MapUtil.js";

export class HashSet<T> implements ISet<T>, Iterable<T>, Iterable<T> {
    readonly comparer: IEqualityComparer<T>;
    readonly hashMap: IMap<int32, T[]>;
    "init@9": int32;
    constructor(items: Iterable<T>, comparer: IEqualityComparer<T>) {
        const this$: FSharpRef<HashSet<T>> = new FSharpRef<HashSet<T>>(defaultOf());
        this.comparer = comparer;
        this$.contents = this;
        this.hashMap = (new Map<int32, T[]>([]));
        this["init@9"] = 1;
        const enumerator: IEnumerator<T> = getEnumerator(items);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const item: T = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                HashSet__Add_2B595<T>(this$.contents, item);
            }
        }
        finally {
            disposeSafe(enumerator as IDisposable);
        }
    }
    get [Symbol.toStringTag](): string {
        return "HashSet";
    }
    toJSON(): any {
        const this$: HashSet<T> = this;
        return Array.from(this$);
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const this$: HashSet<T> = this;
        return getEnumerator(this$);
    }
    GetEnumerator(): IEnumerator<T> {
        const this$: HashSet<T> = this;
        return getEnumerator(concat<T[], T>(this$.hashMap.values()));
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.Generic.ICollection`1.Add2B595"(item: T): void {
        const this$: HashSet<T> = this;
        HashSet__Add_2B595<T>(this$, item);
    }
    "System.Collections.Generic.ICollection`1.Clear"(): void {
        const this$: HashSet<T> = this;
        HashSet__Clear<T>(this$);
    }
    "System.Collections.Generic.ICollection`1.Contains2B595"(item: T): boolean {
        const this$: HashSet<T> = this;
        return HashSet__Contains_2B595<T>(this$, item);
    }
    "System.Collections.Generic.ICollection`1.CopyToZ3B4C077E"(array: T[], arrayIndex: int32): void {
        const this$: HashSet<T> = this;
        iterateIndexed<T>((i: int32, e: T): void => {
            setItem(array, arrayIndex + i, e);
        }, this$);
    }
    "System.Collections.Generic.ICollection`1.get_Count"(): int32 {
        const this$: HashSet<T> = this;
        return HashSet__get_Count<T>(this$) | 0;
    }
    "System.Collections.Generic.ICollection`1.get_IsReadOnly"(): boolean {
        return false;
    }
    "System.Collections.Generic.ICollection`1.Remove2B595"(item: T): boolean {
        const this$: HashSet<T> = this;
        return HashSet__Remove_2B595<T>(this$, item);
    }
    get size(): int32 {
        const this$: HashSet<T> = this;
        return HashSet__get_Count<T>(this$) | 0;
    }
    add(k: T): ISet<T> {
        const this$: HashSet<T> = this;
        HashSet__Add_2B595<T>(this$, k);
        return this$;
    }
    clear(): void {
        const this$: HashSet<T> = this;
        HashSet__Clear<T>(this$);
    }
    delete(k: T): boolean {
        const this$: HashSet<T> = this;
        return HashSet__Remove_2B595<T>(this$, k);
    }
    has(k: T): boolean {
        const this$: HashSet<T> = this;
        return HashSet__Contains_2B595<T>(this$, k);
    }
    keys(): Iterable<T> {
        const this$: HashSet<T> = this;
        return map<T, T>((x: T): T => x, this$);
    }
    values(): Iterable<T> {
        const this$: HashSet<T> = this;
        return map<T, T>((x: T): T => x, this$);
    }
    entries(): Iterable<[T, T]> {
        const this$: HashSet<T> = this;
        return map<T, [T, T]>((v: T): [T, T] => ([v, v] as [T, T]), this$);
    }
    forEach(f: ((arg0: T, arg1: T, arg2: ISet<T>) => void), thisArg?: Option<any>): void {
        const this$: HashSet<T> = this;
        iterate<T>((x: T): void => {
            f(x, x, this$);
        }, this$);
    }
}

export function HashSet_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("Fable.Collections.HashSet", [gen0], HashSet);
}

export function HashSet_$ctor_Z6150332D<T>(items: Iterable<T>, comparer: IEqualityComparer<T>): HashSet<T> {
    return new HashSet(items, comparer);
}

function HashSet__TryFindIndex_2B595<T>(this$: HashSet<T>, k: T): [boolean, int32, int32] {
    const h: int32 = this$.comparer.GetHashCode(k) | 0;
    let matchValue: [boolean, T[]];
    let outArg: T[] = defaultOf();
    matchValue = ([tryGetValue(this$.hashMap, h, new FSharpRef<T[]>((): T[] => outArg, (v: T[]): void => {
        outArg = v;
    })), outArg] as [boolean, T[]]);
    if (matchValue[0]) {
        return [true, h, matchValue[1].findIndex((v_1: T): boolean => this$.comparer.Equals(k, v_1))] as [boolean, int32, int32];
    }
    else {
        return [false, h, -1] as [boolean, int32, int32];
    }
}

function HashSet__TryFind_2B595<T>(this$: HashSet<T>, k: T): Option<T> {
    const matchValue: [boolean, int32, int32] = HashSet__TryFindIndex_2B595<T>(this$, k);
    let matchResult: int32;
    if (matchValue[0]) {
        if (matchValue[2] > -1) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return some(getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]]);
        default:
            return undefined;
    }
}

export function HashSet__get_Comparer<T>(this$: HashSet<T>): IEqualityComparer<T> {
    return this$.comparer;
}

export function HashSet__Clear<T>(this$: HashSet<T>): void {
    this$.hashMap.clear();
}

export function HashSet__get_Count<T>(this$: HashSet<T>): int32 {
    let count = 0;
    let enumerator: any = getEnumerator(this$.hashMap.values());
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const items: T[] = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            count = ((count + items.length) | 0);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return count | 0;
}

export function HashSet__Add_2B595<T>(this$: HashSet<T>, k: T): boolean {
    const matchValue: [boolean, int32, int32] = HashSet__TryFindIndex_2B595<T>(this$, k);
    if (matchValue[0]) {
        if (matchValue[2] > -1) {
            return false;
        }
        else {
            const value: any = void (getItemFromDict(this$.hashMap, matchValue[1]).push(k));
            return true;
        }
    }
    else {
        this$.hashMap.set(matchValue[1], [k]);
        return true;
    }
}

export function HashSet__Contains_2B595<T>(this$: HashSet<T>, k: T): boolean {
    const matchValue: [boolean, int32, int32] = HashSet__TryFindIndex_2B595<T>(this$, k);
    let matchResult: int32;
    if (matchValue[0]) {
        if (matchValue[2] > -1) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0:
            return true;
        default:
            return false;
    }
}

export function HashSet__Remove_2B595<T>(this$: HashSet<T>, k: T): boolean {
    const matchValue: [boolean, int32, int32] = HashSet__TryFindIndex_2B595<T>(this$, k);
    let matchResult: int32;
    if (matchValue[0]) {
        if (matchValue[2] > -1) {
            matchResult = 0;
        }
        else {
            matchResult = 1;
        }
    }
    else {
        matchResult = 1;
    }
    switch (matchResult) {
        case 0: {
            getItemFromDict(this$.hashMap, matchValue[1]).splice(matchValue[2], 1);
            return true;
        }
        default:
            return false;
    }
}

