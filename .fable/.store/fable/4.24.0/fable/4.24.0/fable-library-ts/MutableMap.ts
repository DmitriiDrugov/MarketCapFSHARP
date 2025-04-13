import { IEqualityComparer, IDisposable, disposeSafe, defaultOf, IMap, equals, toIterator, IEnumerator, getEnumerator } from "./Util.js";
import { iterate, map, delay, toArray, iterateIndexed, concat } from "./Seq.js";
import { value as value_1, Option } from "./Option.js";
import { int32 } from "./Int32.js";
import { setItem } from "./Array.js";
import { FSharpRef } from "./Types.js";
import { class_type, TypeInfo } from "./Reflection.js";
import { getItemFromDict, tryGetValue } from "./MapUtil.js";
import { format } from "./String.js";

export class Dictionary<Key, Value> implements IMap<Key, Value>, Iterable<[Key, Value]>, Iterable<[Key, Value]> {
    readonly comparer: IEqualityComparer<Key>;
    readonly hashMap: IMap<int32, [Key, Value][]>;
    "init@9": int32;
    constructor(pairs: Iterable<[Key, Value]>, comparer: IEqualityComparer<Key>) {
        const this$: FSharpRef<Dictionary<Key, Value>> = new FSharpRef<Dictionary<Key, Value>>(defaultOf());
        this.comparer = comparer;
        this$.contents = this;
        this.hashMap = (new Map<int32, [Key, Value][]>([]));
        this["init@9"] = 1;
        const enumerator: IEnumerator<[Key, Value]> = getEnumerator(pairs);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const pair: [Key, Value] = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                Dictionary__Add_5BDDA1<Key, Value>(this$.contents, pair[0], pair[1]);
            }
        }
        finally {
            disposeSafe(enumerator as IDisposable);
        }
    }
    get [Symbol.toStringTag](): string {
        return "Dictionary";
    }
    toJSON(): any {
        const this$: Dictionary<Key, Value> = this;
        return Array.from(this$);
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const this$: Dictionary<Key, Value> = this;
        return getEnumerator(this$);
    }
    GetEnumerator(): IEnumerator<[Key, Value]> {
        const this$: Dictionary<Key, Value> = this;
        return getEnumerator(concat<[Key, Value][], [Key, Value]>(this$.hashMap.values()));
    }
    [Symbol.iterator](): Iterator<[Key, Value]> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.Generic.ICollection`1.Add2B595"(item: [Key, Value]): void {
        const this$: Dictionary<Key, Value> = this;
        Dictionary__Add_5BDDA1<Key, Value>(this$, item[0], item[1]);
    }
    "System.Collections.Generic.ICollection`1.Clear"(): void {
        const this$: Dictionary<Key, Value> = this;
        Dictionary__Clear<Key, Value>(this$);
    }
    "System.Collections.Generic.ICollection`1.Contains2B595"(item: [Key, Value]): boolean {
        const this$: Dictionary<Key, Value> = this;
        const matchValue: Option<[Key, Value]> = Dictionary__TryFind_2B595<Key, Value>(this$, item[0]);
        let matchResult: int32, p_1: [Key, Value];
        if (matchValue != null) {
            if (equals(value_1(matchValue)[1], item[1])) {
                matchResult = 0;
                p_1 = value_1(matchValue);
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
    "System.Collections.Generic.ICollection`1.CopyToZ3B4C077E"(array: [Key, Value][], arrayIndex: int32): void {
        const this$: Dictionary<Key, Value> = this;
        iterateIndexed<[Key, Value]>((i: int32, e: [Key, Value]): void => {
            setItem(array, arrayIndex + i, e);
        }, this$);
    }
    "System.Collections.Generic.ICollection`1.get_Count"(): int32 {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__get_Count<Key, Value>(this$) | 0;
    }
    "System.Collections.Generic.ICollection`1.get_IsReadOnly"(): boolean {
        return false;
    }
    "System.Collections.Generic.ICollection`1.Remove2B595"(item: [Key, Value]): boolean {
        const this$: Dictionary<Key, Value> = this;
        const matchValue: Option<[Key, Value]> = Dictionary__TryFind_2B595<Key, Value>(this$, item[0]);
        if (matchValue != null) {
            if (equals(value_1(matchValue)[1], item[1])) {
                Dictionary__Remove_2B595<Key, Value>(this$, item[0]);
            }
            return true;
        }
        else {
            return false;
        }
    }
    "System.Collections.Generic.IDictionary`2.Add5BDDA1"(key: Key, value: Value): void {
        const this$: Dictionary<Key, Value> = this;
        Dictionary__Add_5BDDA1<Key, Value>(this$, key, value);
    }
    "System.Collections.Generic.IDictionary`2.ContainsKey2B595"(key: Key): boolean {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__ContainsKey_2B595<Key, Value>(this$, key);
    }
    "System.Collections.Generic.IDictionary`2.get_Item2B595"(key: Key): Value {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__get_Item_2B595<Key, Value>(this$, key);
    }
    "System.Collections.Generic.IDictionary`2.set_Item5BDDA1"(key: Key, v: Value): void {
        const this$: Dictionary<Key, Value> = this;
        Dictionary__set_Item_5BDDA1<Key, Value>(this$, key, v);
    }
    "System.Collections.Generic.IDictionary`2.get_Keys"(): Iterable<Key> {
        const this$: Dictionary<Key, Value> = this;
        return toArray<Key>(delay<Key>((): Iterable<Key> => map<[Key, Value], Key>((pair: [Key, Value]): Key => pair[0], this$)));
    }
    "System.Collections.Generic.IDictionary`2.Remove2B595"(key: Key): boolean {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__Remove_2B595<Key, Value>(this$, key);
    }
    "System.Collections.Generic.IDictionary`2.TryGetValue6DC89625"(key: Key, value: FSharpRef<Value>): boolean {
        const this$: Dictionary<Key, Value> = this;
        const matchValue: Option<[Key, Value]> = Dictionary__TryFind_2B595<Key, Value>(this$, key);
        if (matchValue != null) {
            const pair: [Key, Value] = value_1(matchValue);
            value.contents = pair[1];
            return true;
        }
        else {
            return false;
        }
    }
    "System.Collections.Generic.IDictionary`2.get_Values"(): Iterable<Value> {
        const this$: Dictionary<Key, Value> = this;
        return toArray<Value>(delay<Value>((): Iterable<Value> => map<[Key, Value], Value>((pair: [Key, Value]): Value => pair[1], this$)));
    }
    get size(): int32 {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__get_Count<Key, Value>(this$) | 0;
    }
    clear(): void {
        const this$: Dictionary<Key, Value> = this;
        Dictionary__Clear<Key, Value>(this$);
    }
    delete(k: Key): boolean {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__Remove_2B595<Key, Value>(this$, k);
    }
    entries(): Iterable<[Key, Value]> {
        const this$: Dictionary<Key, Value> = this;
        return map<[Key, Value], [Key, Value]>((p: [Key, Value]): [Key, Value] => ([p[0], p[1]] as [Key, Value]), this$);
    }
    get(k: Key): Value {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__get_Item_2B595<Key, Value>(this$, k);
    }
    has(k: Key): boolean {
        const this$: Dictionary<Key, Value> = this;
        return Dictionary__ContainsKey_2B595<Key, Value>(this$, k);
    }
    keys(): Iterable<Key> {
        const this$: Dictionary<Key, Value> = this;
        return map<[Key, Value], Key>((p: [Key, Value]): Key => p[0], this$);
    }
    set(k: Key, v: Value): IMap<Key, Value> {
        const this$: Dictionary<Key, Value> = this;
        Dictionary__set_Item_5BDDA1<Key, Value>(this$, k, v);
        return this$;
    }
    values(): Iterable<Value> {
        const this$: Dictionary<Key, Value> = this;
        return map<[Key, Value], Value>((p: [Key, Value]): Value => p[1], this$);
    }
    forEach(f: ((arg0: Value, arg1: Key, arg2: IMap<Key, Value>) => void), thisArg?: Option<any>): void {
        const this$: Dictionary<Key, Value> = this;
        iterate<[Key, Value]>((p: [Key, Value]): void => {
            f(p[1], p[0], this$);
        }, this$);
    }
}

export function Dictionary_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return class_type("Fable.Collections.Dictionary", [gen0, gen1], Dictionary);
}

export function Dictionary_$ctor_6623D9B3<Key, Value>(pairs: Iterable<[Key, Value]>, comparer: IEqualityComparer<Key>): Dictionary<Key, Value> {
    return new Dictionary(pairs, comparer);
}

function Dictionary__TryFindIndex_2B595<Key, Value>(this$: Dictionary<Key, Value>, k: Key): [boolean, int32, int32] {
    const h: int32 = this$.comparer.GetHashCode(k) | 0;
    let matchValue: [boolean, [Key, Value][]];
    let outArg: [Key, Value][] = defaultOf();
    matchValue = ([tryGetValue(this$.hashMap, h, new FSharpRef<[Key, Value][]>((): [Key, Value][] => outArg, (v: [Key, Value][]): void => {
        outArg = v;
    })), outArg] as [boolean, [Key, Value][]]);
    if (matchValue[0]) {
        return [true, h, matchValue[1].findIndex((pair: [Key, Value]): boolean => this$.comparer.Equals(k, pair[0]))] as [boolean, int32, int32];
    }
    else {
        return [false, h, -1] as [boolean, int32, int32];
    }
}

export function Dictionary__TryFind_2B595<Key, Value>(this$: Dictionary<Key, Value>, k: Key): Option<[Key, Value]> {
    const matchValue: [boolean, int32, int32] = Dictionary__TryFindIndex_2B595<Key, Value>(this$, k);
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
            return getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]];
        default:
            return undefined;
    }
}

export function Dictionary__get_Comparer<Key, Value>(this$: Dictionary<Key, Value>): IEqualityComparer<Key> {
    return this$.comparer;
}

export function Dictionary__Clear<Key, Value>(this$: Dictionary<Key, Value>): void {
    this$.hashMap.clear();
}

export function Dictionary__get_Count<Key, Value>(this$: Dictionary<Key, Value>): int32 {
    let count = 0;
    let enumerator: any = getEnumerator(this$.hashMap.values());
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const pairs: [Key, Value][] = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            count = ((count + pairs.length) | 0);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return count | 0;
}

export function Dictionary__get_Item_2B595<Key, Value>(this$: Dictionary<Key, Value>, k: Key): Value {
    const matchValue: Option<[Key, Value]> = Dictionary__TryFind_2B595<Key, Value>(this$, k);
    if (matchValue != null) {
        return value_1(matchValue)[1];
    }
    else {
        throw new Error("The item was not found in collection");
    }
}

export function Dictionary__set_Item_5BDDA1<Key, Value>(this$: Dictionary<Key, Value>, k: Key, v: Value): void {
    const matchValue: [boolean, int32, int32] = Dictionary__TryFindIndex_2B595<Key, Value>(this$, k);
    if (matchValue[0]) {
        if (matchValue[2] > -1) {
            getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]] = ([k, v] as [Key, Value]);
        }
        else {
            const value: any = void (getItemFromDict(this$.hashMap, matchValue[1]).push([k, v] as [Key, Value]));
        }
    }
    else {
        this$.hashMap.set(matchValue[1], [[k, v] as [Key, Value]]);
    }
}

export function Dictionary__Add_5BDDA1<Key, Value>(this$: Dictionary<Key, Value>, k: Key, v: Value): void {
    const matchValue: [boolean, int32, int32] = Dictionary__TryFindIndex_2B595<Key, Value>(this$, k);
    if (matchValue[0]) {
        if (matchValue[2] > -1) {
            throw new Error(format("An item with the same key has already been added. Key: {0}", k));
        }
        else {
            const value: any = void (getItemFromDict(this$.hashMap, matchValue[1]).push([k, v] as [Key, Value]));
        }
    }
    else {
        this$.hashMap.set(matchValue[1], [[k, v] as [Key, Value]]);
    }
}

export function Dictionary__ContainsKey_2B595<Key, Value>(this$: Dictionary<Key, Value>, k: Key): boolean {
    const matchValue: [boolean, int32, int32] = Dictionary__TryFindIndex_2B595<Key, Value>(this$, k);
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

export function Dictionary__Remove_2B595<Key, Value>(this$: Dictionary<Key, Value>, k: Key): boolean {
    const matchValue: [boolean, int32, int32] = Dictionary__TryFindIndex_2B595<Key, Value>(this$, k);
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

