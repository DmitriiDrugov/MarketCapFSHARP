import { int32 } from "./Int32.js";
import { Helpers_allocateArrayFromCons } from "./Native.js";
import { setItem as setItem_1, item as item_2 } from "./Array.js";
import { value as value_2, map as map_1, defaultArg, Option, some } from "./Option.js";
import { min as min_1, max as max_1 } from "./Double.js";
import { IComparer, equals as equals_1, IDisposable, disposeSafe, IEnumerator, getEnumerator, copyToArray, IEqualityComparer, defaultOf } from "./Util.js";
import { SR_indexOutOfBounds } from "./Global.js";
import { FSharpRef } from "./Types.js";

function indexNotFound<$a>(): $a {
    throw new Error("An index satisfying the predicate was not found in the collection.");
}

function differentLengths<$a>(): $a {
    throw new Error("Arrays had different lengths");
}

export function append<T>(array1: T[], array2: T[], cons?: any): T[] {
    const len1: int32 = array1.length | 0;
    const len2: int32 = array2.length | 0;
    const newArray: T[] = Helpers_allocateArrayFromCons<T>(cons, len1 + len2);
    for (let i = 0; i <= (len1 - 1); i++) {
        setItem_1(newArray, i, item_2(i, array1));
    }
    for (let i_1 = 0; i_1 <= (len2 - 1); i_1++) {
        setItem_1(newArray, i_1 + len1, item_2(i_1, array2));
    }
    return newArray;
}

export function filter<T>(predicate: ((arg0: T) => boolean), array: T[]): T[] {
    return array.filter(predicate);
}

export function fill<T>(target: T[], targetIndex: int32, count: int32, value: T): T[] {
    const start: int32 = targetIndex | 0;
    return target.fill(value, start, (start + count));
}

export function getSubArray<T>(array: T[], start: int32, count: int32): T[] {
    const start_1: int32 = start | 0;
    return array.slice(start_1, (start_1 + count));
}

export function last<T>(array: T[]): T {
    if (array.length === 0) {
        throw new Error("The input array was empty\\nParameter name: array");
    }
    return item_2(array.length - 1, array);
}

export function tryLast<T>(array: T[]): Option<T> {
    if (array.length === 0) {
        return undefined;
    }
    else {
        return some(item_2(array.length - 1, array));
    }
}

export function mapIndexed<T, U>(f: ((arg0: int32, arg1: T) => U), source: T[], cons?: any): U[] {
    const len: int32 = source.length | 0;
    const target: U[] = Helpers_allocateArrayFromCons<U>(cons, len);
    for (let i = 0; i <= (len - 1); i++) {
        setItem_1(target, i, f(i, item_2(i, source)));
    }
    return target;
}

export function map<T, U>(f: ((arg0: T) => U), source: T[], cons?: any): U[] {
    const len: int32 = source.length | 0;
    const target: U[] = Helpers_allocateArrayFromCons<U>(cons, len);
    for (let i = 0; i <= (len - 1); i++) {
        setItem_1(target, i, f(item_2(i, source)));
    }
    return target;
}

export function mapIndexed2<T1, T2, U>(f: ((arg0: int32, arg1: T1, arg2: T2) => U), source1: T1[], source2: T2[], cons?: any): U[] {
    if (source1.length !== source2.length) {
        throw new Error("Arrays had different lengths");
    }
    const result: U[] = Helpers_allocateArrayFromCons<U>(cons, source1.length);
    for (let i = 0; i <= (source1.length - 1); i++) {
        setItem_1(result, i, f(i, item_2(i, source1), item_2(i, source2)));
    }
    return result;
}

export function map2<T1, T2, U>(f: ((arg0: T1, arg1: T2) => U), source1: T1[], source2: T2[], cons?: any): U[] {
    if (source1.length !== source2.length) {
        throw new Error("Arrays had different lengths");
    }
    const result: U[] = Helpers_allocateArrayFromCons<U>(cons, source1.length);
    for (let i = 0; i <= (source1.length - 1); i++) {
        setItem_1(result, i, f(item_2(i, source1), item_2(i, source2)));
    }
    return result;
}

export function mapIndexed3<T1, T2, T3, U>(f: ((arg0: int32, arg1: T1, arg2: T2, arg3: T3) => U), source1: T1[], source2: T2[], source3: T3[], cons?: any): U[] {
    if ((source1.length !== source2.length) ? true : (source2.length !== source3.length)) {
        throw new Error("Arrays had different lengths");
    }
    const result: U[] = Helpers_allocateArrayFromCons<U>(cons, source1.length);
    for (let i = 0; i <= (source1.length - 1); i++) {
        setItem_1(result, i, f(i, item_2(i, source1), item_2(i, source2), item_2(i, source3)));
    }
    return result;
}

export function map3<T1, T2, T3, U>(f: ((arg0: T1, arg1: T2, arg2: T3) => U), source1: T1[], source2: T2[], source3: T3[], cons?: any): U[] {
    if ((source1.length !== source2.length) ? true : (source2.length !== source3.length)) {
        throw new Error("Arrays had different lengths");
    }
    const result: U[] = Helpers_allocateArrayFromCons<U>(cons, source1.length);
    for (let i = 0; i <= (source1.length - 1); i++) {
        setItem_1(result, i, f(item_2(i, source1), item_2(i, source2), item_2(i, source3)));
    }
    return result;
}

export function mapFold<T, State, Result>(mapping: ((arg0: State, arg1: T) => [Result, State]), state: State, array: T[], cons?: any): [Result[], State] {
    const matchValue: int32 = array.length | 0;
    if (matchValue === 0) {
        return [[], state] as [Result[], State];
    }
    else {
        let acc: State = state;
        const res: Result[] = Helpers_allocateArrayFromCons<Result>(cons, matchValue);
        for (let i = 0; i <= (array.length - 1); i++) {
            const patternInput: [Result, State] = mapping(acc, item_2(i, array));
            setItem_1(res, i, patternInput[0]);
            acc = patternInput[1];
        }
        return [res, acc] as [Result[], State];
    }
}

export function mapFoldBack<T, State, Result>(mapping: ((arg0: T, arg1: State) => [Result, State]), array: T[], state: State, cons?: any): [Result[], State] {
    const matchValue: int32 = array.length | 0;
    if (matchValue === 0) {
        return [[], state] as [Result[], State];
    }
    else {
        let acc: State = state;
        const res: Result[] = Helpers_allocateArrayFromCons<Result>(cons, matchValue);
        for (let i: int32 = array.length - 1; i >= 0; i--) {
            const patternInput: [Result, State] = mapping(item_2(i, array), acc);
            setItem_1(res, i, patternInput[0]);
            acc = patternInput[1];
        }
        return [res, acc] as [Result[], State];
    }
}

export function indexed<T>(source: T[]): [int32, T][] {
    const len: int32 = source.length | 0;
    const target: [int32, T][] = new Array(len);
    for (let i = 0; i <= (len - 1); i++) {
        setItem_1(target, i, [i, item_2(i, source)] as [int32, T]);
    }
    return target;
}

export function truncate<T>(count: int32, array: T[]): T[] {
    const count_1: int32 = max_1(0, count) | 0;
    return array.slice(0, (0 + count_1));
}

export function concat<T>(arrays: Iterable<T[]>, cons?: any): T[] {
    const arrays_1: T[][] = Array.isArray(arrays) ? (arrays as T[][]) : (Array.from(arrays));
    const matchValue: int32 = arrays_1.length | 0;
    switch (matchValue) {
        case 0:
            return Helpers_allocateArrayFromCons<T>(cons, 0);
        case 1:
            return item_2(0, arrays_1);
        default: {
            let totalIdx = 0;
            let totalLength = 0;
            for (let idx = 0; idx <= (arrays_1.length - 1); idx++) {
                const arr_1: T[] = item_2(idx, arrays_1);
                totalLength = ((totalLength + arr_1.length) | 0);
            }
            const result: T[] = Helpers_allocateArrayFromCons<T>(cons, totalLength);
            for (let idx_1 = 0; idx_1 <= (arrays_1.length - 1); idx_1++) {
                const arr_2: T[] = item_2(idx_1, arrays_1);
                for (let j = 0; j <= (arr_2.length - 1); j++) {
                    setItem_1(result, totalIdx, item_2(j, arr_2));
                    totalIdx = ((totalIdx + 1) | 0);
                }
            }
            return result;
        }
    }
}

export function collect<T, U>(mapping: ((arg0: T) => U[]), array: T[], cons?: any): U[] {
    return concat<U>(map<T, U[]>(mapping, array, defaultOf()), cons);
}

export function where<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): $a[] {
    return array.filter(predicate);
}

export function indexOf<T>(array: T[], item_1: T, start: Option<int32>, count: Option<int32>, eq: IEqualityComparer<T>): int32 {
    const start_1: int32 = defaultArg<int32>(start, 0) | 0;
    const end$0027: int32 = defaultArg(map_1<int32, int32>((c: int32): int32 => (start_1 + c), count), array.length) | 0;
    const loop = (i_mut: int32): int32 => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i >= end$0027) {
                return -1;
            }
            else if (eq.Equals(item_1, item_2(i, array))) {
                return i | 0;
            }
            else {
                i_mut = (i + 1);
                continue loop;
            }
            break;
        }
    };
    return loop(start_1) | 0;
}

export function contains<T>(value: T, array: T[], eq: IEqualityComparer<T>): boolean {
    return indexOf<T>(array, value, undefined, undefined, eq) >= 0;
}

export function empty<$a>(cons: any): $a[] {
    return Helpers_allocateArrayFromCons<$a>(cons, 0);
}

export function singleton<T>(value: T, cons?: any): T[] {
    const ar: T[] = Helpers_allocateArrayFromCons<T>(cons, 1);
    setItem_1(ar, 0, value);
    return ar;
}

export function initialize<T>(count: int32, initializer: ((arg0: int32) => T), cons?: any): T[] {
    if (count < 0) {
        throw new Error("The input must be non-negative\\nParameter name: count");
    }
    const result: T[] = Helpers_allocateArrayFromCons<T>(cons, count);
    for (let i = 0; i <= (count - 1); i++) {
        setItem_1(result, i, initializer(i));
    }
    return result;
}

export function pairwise<T>(array: T[]): [T, T][] {
    if (array.length < 2) {
        return [];
    }
    else {
        const count: int32 = (array.length - 1) | 0;
        const result: [T, T][] = new Array(count);
        for (let i = 0; i <= (count - 1); i++) {
            setItem_1(result, i, [item_2(i, array), item_2(i + 1, array)] as [T, T]);
        }
        return result;
    }
}

export function replicate<T>(count: int32, initial: T, cons?: any): T[] {
    if (count < 0) {
        throw new Error("The input must be non-negative\\nParameter name: count");
    }
    const result: T[] = Helpers_allocateArrayFromCons<T>(cons, count);
    for (let i = 0; i <= (result.length - 1); i++) {
        setItem_1(result, i, initial);
    }
    return result;
}

export function copy<T>(array: T[]): T[] {
    return array.slice();
}

export function copyTo<T>(source: T[], sourceIndex: int32, target: T[], targetIndex: int32, count: int32): void {
    copyToArray(source, sourceIndex, target, targetIndex, count);
}

export function reverse<T>(array: T[]): T[] {
    const array_2: T[] = array.slice();
    return array_2.reverse();
}

export function scan<T, State>(folder: ((arg0: State, arg1: T) => State), state: State, array: T[], cons?: any): State[] {
    const res: State[] = Helpers_allocateArrayFromCons<State>(cons, array.length + 1);
    setItem_1(res, 0, state);
    for (let i = 0; i <= (array.length - 1); i++) {
        setItem_1(res, i + 1, folder(item_2(i, res), item_2(i, array)));
    }
    return res;
}

export function scanBack<T, State>(folder: ((arg0: T, arg1: State) => State), array: T[], state: State, cons?: any): State[] {
    const res: State[] = Helpers_allocateArrayFromCons<State>(cons, array.length + 1);
    setItem_1(res, array.length, state);
    for (let i: int32 = array.length - 1; i >= 0; i--) {
        setItem_1(res, i, folder(item_2(i, array), item_2(i + 1, res)));
    }
    return res;
}

export function skip<T>(count: int32, array: T[], cons?: any): T[] {
    if (count > array.length) {
        throw new Error("count is greater than array length\\nParameter name: count");
    }
    if (count === array.length) {
        return Helpers_allocateArrayFromCons<T>(cons, 0);
    }
    else {
        const count_1: int32 = ((count < 0) ? 0 : count) | 0;
        return array.slice(count_1);
    }
}

export function skipWhile<T>(predicate: ((arg0: T) => boolean), array: T[], cons?: any): T[] {
    let count = 0;
    while ((count < array.length) && predicate(item_2(count, array))) {
        count = ((count + 1) | 0);
    }
    if (count === array.length) {
        return Helpers_allocateArrayFromCons<T>(cons, 0);
    }
    else {
        const count_1: int32 = count | 0;
        return array.slice(count_1);
    }
}

export function take<T>(count: int32, array: T[], cons?: any): T[] {
    if (count < 0) {
        throw new Error("The input must be non-negative\\nParameter name: count");
    }
    if (count > array.length) {
        throw new Error("count is greater than array length\\nParameter name: count");
    }
    if (count === 0) {
        return Helpers_allocateArrayFromCons<T>(cons, 0);
    }
    else {
        return array.slice(0, (0 + count));
    }
}

export function takeWhile<T>(predicate: ((arg0: T) => boolean), array: T[], cons?: any): T[] {
    let count = 0;
    while ((count < array.length) && predicate(item_2(count, array))) {
        count = ((count + 1) | 0);
    }
    if (count === 0) {
        return Helpers_allocateArrayFromCons<T>(cons, 0);
    }
    else {
        const count_1: int32 = count | 0;
        return array.slice(0, (0 + count_1));
    }
}

export function addInPlace<T>(x: T, array: T[]): void {
    array.push(x);
}

export function addRangeInPlace<T>(range: Iterable<T>, array: T[]): void {
    const enumerator: IEnumerator<T> = getEnumerator(range);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            addInPlace<T>(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"](), array);
        }
    }
    finally {
        disposeSafe(enumerator as IDisposable);
    }
}

export function insertRangeInPlace<T>(index: int32, range: Iterable<T>, array: T[]): void {
    let index_1: int32;
    let i: int32 = index;
    const enumerator: IEnumerator<T> = getEnumerator(range);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const x: T = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            (index_1 = (i | 0), array.splice(index_1, 0, x));
            i = ((i + 1) | 0);
        }
    }
    finally {
        disposeSafe(enumerator as IDisposable);
    }
}

export function removeInPlace<T>(item_1: T, array: T[], eq: IEqualityComparer<T>): boolean {
    const i: int32 = indexOf<T>(array, item_1, undefined, undefined, eq) | 0;
    if (i > -1) {
        array.splice(i, 1);
        return true;
    }
    else {
        return false;
    }
}

export function removeAllInPlace<T>(predicate: ((arg0: T) => boolean), array: T[]): int32 {
    const countRemoveAll = (count: int32): int32 => {
        const i: int32 = (array.findIndex(predicate)) | 0;
        if (i > -1) {
            array.splice(i, 1);
            return (countRemoveAll(count) + 1) | 0;
        }
        else {
            return count | 0;
        }
    };
    return countRemoveAll(0) | 0;
}

export function partition<T>(f: ((arg0: T) => boolean), source: T[], cons?: any): [T[], T[]] {
    const len: int32 = source.length | 0;
    const res1: T[] = Helpers_allocateArrayFromCons<T>(cons, len);
    const res2: T[] = Helpers_allocateArrayFromCons<T>(cons, len);
    let iTrue = 0;
    let iFalse = 0;
    for (let i = 0; i <= (len - 1); i++) {
        if (f(item_2(i, source))) {
            setItem_1(res1, iTrue, item_2(i, source));
            iTrue = ((iTrue + 1) | 0);
        }
        else {
            setItem_1(res2, iFalse, item_2(i, source));
            iFalse = ((iFalse + 1) | 0);
        }
    }
    return [truncate<T>(iTrue, res1), truncate<T>(iFalse, res2)] as [T[], T[]];
}

export function find<T>(predicate: ((arg0: T) => boolean), array: T[]): T {
    const matchValue: Option<T> = array.find(predicate);
    if (matchValue == null) {
        return indexNotFound<T>();
    }
    else {
        return value_2(matchValue);
    }
}

export function tryFind<T>(predicate: ((arg0: T) => boolean), array: T[]): Option<T> {
    return array.find(predicate);
}

export function findIndex<T>(predicate: ((arg0: T) => boolean), array: T[]): int32 {
    const matchValue: int32 = (array.findIndex(predicate)) | 0;
    if (matchValue > -1) {
        return matchValue | 0;
    }
    else {
        indexNotFound<void>();
        return -1;
    }
}

export function tryFindIndex<T>(predicate: ((arg0: T) => boolean), array: T[]): Option<int32> {
    const matchValue: int32 = (array.findIndex(predicate)) | 0;
    if (matchValue > -1) {
        return matchValue;
    }
    else {
        return undefined;
    }
}

export function pick<$a, $b>(chooser: ((arg0: $a) => Option<$b>), array: $a[]): $b {
    const loop = (i_mut: int32): $b => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i >= array.length) {
                return indexNotFound<$b>();
            }
            else {
                const matchValue: Option<$b> = chooser(item_2(i, array));
                if (matchValue != null) {
                    return value_2(matchValue);
                }
                else {
                    i_mut = (i + 1);
                    continue loop;
                }
            }
            break;
        }
    };
    return loop(0);
}

export function tryPick<$a, $b>(chooser: ((arg0: $a) => Option<$b>), array: $a[]): Option<$b> {
    const loop = (i_mut: int32): Option<$b> => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i >= array.length) {
                return undefined;
            }
            else {
                const matchValue: Option<$b> = chooser(item_2(i, array));
                if (matchValue == null) {
                    i_mut = (i + 1);
                    continue loop;
                }
                else {
                    return matchValue;
                }
            }
            break;
        }
    };
    return loop(0);
}

export function findBack<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): $a {
    const loop = (i_mut: int32): $a => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i < 0) {
                return indexNotFound<$a>();
            }
            else if (predicate(item_2(i, array))) {
                return item_2(i, array);
            }
            else {
                i_mut = (i - 1);
                continue loop;
            }
            break;
        }
    };
    return loop(array.length - 1);
}

export function tryFindBack<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): Option<$a> {
    const loop = (i_mut: int32): Option<$a> => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i < 0) {
                return undefined;
            }
            else if (predicate(item_2(i, array))) {
                return some(item_2(i, array));
            }
            else {
                i_mut = (i - 1);
                continue loop;
            }
            break;
        }
    };
    return loop(array.length - 1);
}

export function findLastIndex<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): int32 {
    const loop = (i_mut: int32): int32 => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i < 0) {
                return -1;
            }
            else if (predicate(item_2(i, array))) {
                return i | 0;
            }
            else {
                i_mut = (i - 1);
                continue loop;
            }
            break;
        }
    };
    return loop(array.length - 1) | 0;
}

export function findIndexBack<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): int32 {
    const loop = (i_mut: int32): int32 => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i < 0) {
                indexNotFound<void>();
                return -1;
            }
            else if (predicate(item_2(i, array))) {
                return i | 0;
            }
            else {
                i_mut = (i - 1);
                continue loop;
            }
            break;
        }
    };
    return loop(array.length - 1) | 0;
}

export function tryFindIndexBack<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): Option<int32> {
    const loop = (i_mut: int32): Option<int32> => {
        loop:
        while (true) {
            const i: int32 = i_mut;
            if (i < 0) {
                return undefined;
            }
            else if (predicate(item_2(i, array))) {
                return i;
            }
            else {
                i_mut = (i - 1);
                continue loop;
            }
            break;
        }
    };
    return loop(array.length - 1);
}

export function choose<T, U>(chooser: ((arg0: T) => Option<U>), array: T[], cons?: any): U[] {
    const res: U[] = [];
    for (let i = 0; i <= (array.length - 1); i++) {
        const matchValue: Option<U> = chooser(item_2(i, array));
        if (matchValue != null) {
            const y: U = value_2(matchValue);
            res.push(y);
        }
    }
    if (equals_1(cons, defaultOf())) {
        return res;
    }
    else {
        return map<U, U>((x: U): U => x, res, cons);
    }
}

export function foldIndexed<T, State>(folder: ((arg0: int32, arg1: State, arg2: T) => State), state: State, array: T[]): State {
    return array.reduce(((delegateArg: State, delegateArg_1: T, delegateArg_2: int32): State => folder(delegateArg_2, delegateArg, delegateArg_1)), state);
}

export function fold<T, State>(folder: ((arg0: State, arg1: T) => State), state: State, array: T[]): State {
    const folder_1: ((arg0: State, arg1: T) => State) = folder;
    return array.reduce((folder_1), state);
}

export function iterate<T>(action: ((arg0: T) => void), array: T[]): void {
    for (let i = 0; i <= (array.length - 1); i++) {
        action(item_2(i, array));
    }
}

export function iterateIndexed<T>(action: ((arg0: int32, arg1: T) => void), array: T[]): void {
    for (let i = 0; i <= (array.length - 1); i++) {
        action(i, item_2(i, array));
    }
}

export function iterate2<T1, T2>(action: ((arg0: T1, arg1: T2) => void), array1: T1[], array2: T2[]): void {
    if (array1.length !== array2.length) {
        differentLengths<void>();
    }
    for (let i = 0; i <= (array1.length - 1); i++) {
        action(item_2(i, array1), item_2(i, array2));
    }
}

export function iterateIndexed2<T1, T2>(action: ((arg0: int32, arg1: T1, arg2: T2) => void), array1: T1[], array2: T2[]): void {
    if (array1.length !== array2.length) {
        differentLengths<void>();
    }
    for (let i = 0; i <= (array1.length - 1); i++) {
        action(i, item_2(i, array1), item_2(i, array2));
    }
}

export function isEmpty<T>(array: T[]): boolean {
    return array.length === 0;
}

export function forAll<T>(predicate: ((arg0: T) => boolean), array: T[]): boolean {
    return array.every(predicate);
}

export function permute<T>(f: ((arg0: int32) => int32), array: T[]): T[] {
    const size: int32 = array.length | 0;
    const res: T[] = array.slice();
    const checkFlags: int32[] = new Array(size);
    iterateIndexed<T>((i: int32, x: T): void => {
        const j: int32 = f(i) | 0;
        if ((j < 0) ? true : (j >= size)) {
            throw new Error("Not a valid permutation");
        }
        setItem_1(res, j, x);
        setItem_1(checkFlags, j, 1);
    }, array);
    if (!(checkFlags.every((y: int32): boolean => (1 === y)))) {
        throw new Error("Not a valid permutation");
    }
    return res;
}

export function setSlice<T>(target: T[], lower: Option<int32>, upper: Option<int32>, source: T[]): void {
    const lower_1: int32 = defaultArg<int32>(lower, 0) | 0;
    const upper_1: int32 = defaultArg<int32>(upper, -1) | 0;
    const length: int32 = (((upper_1 >= 0) ? upper_1 : (target.length - 1)) - lower_1) | 0;
    for (let i = 0; i <= length; i++) {
        setItem_1(target, i + lower_1, item_2(i, source));
    }
}

export function sortInPlaceBy<a, b>(projection: ((arg0: a) => b), xs: a[], comparer: IComparer<b>): void {
    xs.sort((x: a, y: a): int32 => comparer.Compare(projection(x), projection(y)));
}

export function sortInPlace<T>(xs: T[], comparer: IComparer<T>): void {
    xs.sort((x: T, y: T): int32 => comparer.Compare(x, y));
}

export function sort<T>(xs: T[], comparer: IComparer<T>): T[] {
    const xs_1: T[] = xs.slice();
    xs_1.sort((x: T, y: T): int32 => comparer.Compare(x, y));
    return xs_1;
}

export function sortBy<a, b>(projection: ((arg0: a) => b), xs: a[], comparer: IComparer<b>): a[] {
    const xs_1: a[] = xs.slice();
    xs_1.sort((x: a, y: a): int32 => comparer.Compare(projection(x), projection(y)));
    return xs_1;
}

export function sortDescending<T>(xs: T[], comparer: IComparer<T>): T[] {
    const xs_1: T[] = xs.slice();
    xs_1.sort((x: T, y: T): int32 => (comparer.Compare(x, y) * -1));
    return xs_1;
}

export function sortByDescending<a, b>(projection: ((arg0: a) => b), xs: a[], comparer: IComparer<b>): a[] {
    const xs_1: a[] = xs.slice();
    xs_1.sort((x: a, y: a): int32 => (comparer.Compare(projection(x), projection(y)) * -1));
    return xs_1;
}

export function sortWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: T[]): T[] {
    const comparer_1: ((arg0: T, arg1: T) => int32) = comparer;
    const xs_1: T[] = xs.slice();
    xs_1.sort(comparer_1);
    return xs_1;
}

export function allPairs<T1, T2>(xs: T1[], ys: T2[]): [T1, T2][] {
    const len1: int32 = xs.length | 0;
    const len2: int32 = ys.length | 0;
    const res: [T1, T2][] = new Array(len1 * len2);
    for (let i = 0; i <= (xs.length - 1); i++) {
        for (let j = 0; j <= (ys.length - 1); j++) {
            setItem_1(res, (i * len2) + j, [item_2(i, xs), item_2(j, ys)] as [T1, T2]);
        }
    }
    return res;
}

export function unfold<T, State>(generator: ((arg0: State) => Option<[T, State]>), state: State): T[] {
    const res: T[] = [];
    const loop = (state_1_mut: State): void => {
        loop:
        while (true) {
            const state_1: State = state_1_mut;
            const matchValue: Option<[T, State]> = generator(state_1);
            if (matchValue != null) {
                const x: T = value_2(matchValue)[0];
                const s: State = value_2(matchValue)[1];
                res.push(x);
                state_1_mut = s;
                continue loop;
            }
            break;
        }
    };
    loop(state);
    return res;
}

export function unzip<$a, $b>(array: [$a, $b][]): [$a[], $b[]] {
    const len: int32 = array.length | 0;
    const res1: $a[] = new Array(len);
    const res2: $b[] = new Array(len);
    iterateIndexed<[$a, $b]>((i: int32, tupledArg: [$a, $b]): void => {
        setItem_1(res1, i, tupledArg[0]);
        setItem_1(res2, i, tupledArg[1]);
    }, array);
    return [res1, res2] as [$a[], $b[]];
}

export function unzip3<$a, $b, $c>(array: [$a, $b, $c][]): [$a[], $b[], $c[]] {
    const len: int32 = array.length | 0;
    const res1: $a[] = new Array(len);
    const res2: $b[] = new Array(len);
    const res3: $c[] = new Array(len);
    iterateIndexed<[$a, $b, $c]>((i: int32, tupledArg: [$a, $b, $c]): void => {
        setItem_1(res1, i, tupledArg[0]);
        setItem_1(res2, i, tupledArg[1]);
        setItem_1(res3, i, tupledArg[2]);
    }, array);
    return [res1, res2, res3] as [$a[], $b[], $c[]];
}

export function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
    if (array1.length !== array2.length) {
        differentLengths<void>();
    }
    const result: [T, U][] = new Array(array1.length);
    for (let i = 0; i <= (array1.length - 1); i++) {
        setItem_1(result, i, [item_2(i, array1), item_2(i, array2)] as [T, U]);
    }
    return result;
}

export function zip3<T, U, V>(array1: T[], array2: U[], array3: V[]): [T, U, V][] {
    if ((array1.length !== array2.length) ? true : (array2.length !== array3.length)) {
        differentLengths<void>();
    }
    const result: [T, U, V][] = new Array(array1.length);
    for (let i = 0; i <= (array1.length - 1); i++) {
        setItem_1(result, i, [item_2(i, array1), item_2(i, array2), item_2(i, array3)] as [T, U, V]);
    }
    return result;
}

export function chunkBySize<T>(chunkSize: int32, array: T[]): T[][] {
    if (chunkSize < 1) {
        throw new Error("The input must be positive.\\nParameter name: size");
    }
    if (array.length === 0) {
        return [[]];
    }
    else {
        const result: T[][] = [];
        for (let x = 0; x <= (~~Math.ceil(array.length / chunkSize) - 1); x++) {
            let slice: T[];
            const start_1: int32 = (x * chunkSize) | 0;
            slice = (array.slice(start_1, (start_1 + chunkSize)));
            result.push(slice);
        }
        return result;
    }
}

export function splitAt<T>(index: int32, array: T[]): [T[], T[]] {
    if ((index < 0) ? true : (index > array.length)) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return [array.slice(0, (0 + index)), array.slice(index)] as [T[], T[]];
}

export function compareWith<T>(comparer: ((arg0: T, arg1: T) => int32), source1: T[], source2: T[]): int32 {
    if (source1 == null) {
        if (source2 == null) {
            return 0;
        }
        else {
            return -1;
        }
    }
    else if (source2 == null) {
        return 1;
    }
    else {
        const len1: int32 = source1.length | 0;
        const len2: int32 = source2.length | 0;
        const len: int32 = ((len1 < len2) ? len1 : len2) | 0;
        let i = 0;
        let res = 0;
        while ((res === 0) && (i < len)) {
            res = (comparer(item_2(i, source1), item_2(i, source2)) | 0);
            i = ((i + 1) | 0);
        }
        if (res !== 0) {
            return res | 0;
        }
        else if (len1 > len2) {
            return 1;
        }
        else if (len1 < len2) {
            return -1;
        }
        else {
            return 0;
        }
    }
}

export function compareTo<T>(comparer: ((arg0: T, arg1: T) => int32), source1: T[], source2: T[]): int32 {
    if (source1 == null) {
        if (source2 == null) {
            return 0;
        }
        else {
            return -1;
        }
    }
    else if (source2 == null) {
        return 1;
    }
    else {
        const len1: int32 = source1.length | 0;
        const len2: int32 = source2.length | 0;
        if (len1 > len2) {
            return 1;
        }
        else if (len1 < len2) {
            return -1;
        }
        else {
            let i = 0;
            let res = 0;
            while ((res === 0) && (i < len1)) {
                res = (comparer(item_2(i, source1), item_2(i, source2)) | 0);
                i = ((i + 1) | 0);
            }
            return res | 0;
        }
    }
}

export function equalsWith<T>(equals: ((arg0: T, arg1: T) => boolean), array1: T[], array2: T[]): boolean {
    if (array1 == null) {
        if (array2 == null) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (array2 == null) {
        return false;
    }
    else {
        let i = 0;
        let result = true;
        const length1: int32 = array1.length | 0;
        const length2: int32 = array2.length | 0;
        if (length1 > length2) {
            return false;
        }
        else if (length1 < length2) {
            return false;
        }
        else {
            while ((i < length1) && result) {
                result = equals(item_2(i, array1), item_2(i, array2));
                i = ((i + 1) | 0);
            }
            return result;
        }
    }
}

export function exactlyOne<T>(array: T[]): T {
    switch (array.length) {
        case 1:
            return item_2(0, array);
        case 0:
            throw new Error("The input sequence was empty\\nParameter name: array");
        default:
            throw new Error("Input array too long\\nParameter name: array");
    }
}

export function tryExactlyOne<T>(array: T[]): Option<T> {
    if (array.length === 1) {
        return some(item_2(0, array));
    }
    else {
        return undefined;
    }
}

export function head<T>(array: T[]): T {
    if (array.length === 0) {
        throw new Error("The input array was empty\\nParameter name: array");
    }
    else {
        return item_2(0, array);
    }
}

export function tryHead<T>(array: T[]): Option<T> {
    if (array.length === 0) {
        return undefined;
    }
    else {
        return some(item_2(0, array));
    }
}

export function tail<T>(array: T[]): T[] {
    if (array.length === 0) {
        throw new Error("Not enough elements\\nParameter name: array");
    }
    return array.slice(1);
}

export function item<T>(index: int32, array: T[]): T {
    if ((index < 0) ? true : (index >= array.length)) {
        throw new Error("Index was outside the bounds of the array.\\nParameter name: index");
    }
    else {
        return array[index];
    }
}

export function setItem<T>(array: T[], index: int32, value: T): void {
    if ((index < 0) ? true : (index >= array.length)) {
        throw new Error("Index was outside the bounds of the array.\\nParameter name: index");
    }
    else {
        array[index] = value;
    }
}

export function tryItem<T>(index: int32, array: T[]): Option<T> {
    if ((index < 0) ? true : (index >= array.length)) {
        return undefined;
    }
    else {
        return some(array[index]);
    }
}

export function foldBackIndexed<T, State>(folder: ((arg0: int32, arg1: T, arg2: State) => State), array: T[], state: State): State {
    return array.reduceRight(((delegateArg: State, delegateArg_1: T, delegateArg_2: int32): State => folder(delegateArg_2, delegateArg_1, delegateArg)), state);
}

export function foldBack<T, State>(folder: ((arg0: T, arg1: State) => State), array: T[], state: State): State {
    return array.reduceRight(((delegateArg: State, delegateArg_1: T): State => folder(delegateArg_1, delegateArg)), state);
}

export function foldIndexed2<$a, $b, $c>(folder: ((arg0: int32, arg1: $a, arg2: $b, arg3: $c) => $a), state: $a, array1: $b[], array2: $c[]): $a {
    let acc: $a = state;
    if (array1.length !== array2.length) {
        throw new Error("Arrays have different lengths");
    }
    for (let i = 0; i <= (array1.length - 1); i++) {
        acc = folder(i, acc, item_2(i, array1), item_2(i, array2));
    }
    return acc;
}

export function fold2<T1, T2, State>(folder: ((arg0: State, arg1: T1, arg2: T2) => State), state: State, array1: T1[], array2: T2[]): State {
    return foldIndexed2<State, T1, T2>((_arg: int32, acc: State, x: T1, y: T2): State => folder(acc, x, y), state, array1, array2);
}

export function foldBackIndexed2<T1, T2, State>(folder: ((arg0: int32, arg1: T1, arg2: T2, arg3: State) => State), array1: T1[], array2: T2[], state: State): State {
    let acc: State = state;
    if (array1.length !== array2.length) {
        differentLengths<void>();
    }
    const size: int32 = array1.length | 0;
    for (let i = 1; i <= size; i++) {
        acc = folder(i - 1, item_2(size - i, array1), item_2(size - i, array2), acc);
    }
    return acc;
}

export function foldBack2<T1, T2, State>(f: ((arg0: T1, arg1: T2, arg2: State) => State), array1: T1[], array2: T2[], state: State): State {
    return foldBackIndexed2<T1, T2, State>((_arg: int32, x: T1, y: T2, acc: State): State => f(x, y, acc), array1, array2, state);
}

export function reduce<T>(reduction: ((arg0: T, arg1: T) => T), array: T[]): T {
    if (array.length === 0) {
        throw new Error("The input array was empty");
    }
    const reduction_1: ((arg0: T, arg1: T) => T) = reduction;
    return array.reduce(reduction_1);
}

export function reduceBack<T>(reduction: ((arg0: T, arg1: T) => T), array: T[]): T {
    if (array.length === 0) {
        throw new Error("The input array was empty");
    }
    const reduction_1: ((arg0: T, arg1: T) => T) = reduction;
    return array.reduceRight(reduction_1);
}

export function forAll2<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), array1: $a[], array2: $b[]): boolean {
    return fold2<$a, $b, boolean>((acc: boolean, x: $a, y: $b): boolean => (acc && predicate(x, y)), true, array1, array2);
}

export function existsOffset<T>(predicate_mut: ((arg0: T) => boolean), array_mut: T[], index_mut: int32): boolean {
    existsOffset:
    while (true) {
        const predicate: ((arg0: T) => boolean) = predicate_mut, array: T[] = array_mut, index: int32 = index_mut;
        if (index === array.length) {
            return false;
        }
        else if (predicate(item_2(index, array))) {
            return true;
        }
        else {
            predicate_mut = predicate;
            array_mut = array;
            index_mut = (index + 1);
            continue existsOffset;
        }
        break;
    }
}

export function exists<$a>(predicate: ((arg0: $a) => boolean), array: $a[]): boolean {
    return existsOffset<$a>(predicate, array, 0);
}

export function existsOffset2<$a, $b>(predicate_mut: ((arg0: $a, arg1: $b) => boolean), array1_mut: $a[], array2_mut: $b[], index_mut: int32): boolean {
    existsOffset2:
    while (true) {
        const predicate: ((arg0: $a, arg1: $b) => boolean) = predicate_mut, array1: $a[] = array1_mut, array2: $b[] = array2_mut, index: int32 = index_mut;
        if (index === array1.length) {
            return false;
        }
        else if (predicate(item_2(index, array1), item_2(index, array2))) {
            return true;
        }
        else {
            predicate_mut = predicate;
            array1_mut = array1;
            array2_mut = array2;
            index_mut = (index + 1);
            continue existsOffset2;
        }
        break;
    }
}

export function exists2<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), array1: $a[], array2: $b[]): boolean {
    if (array1.length !== array2.length) {
        differentLengths<void>();
    }
    return existsOffset2<$a, $b>(predicate, array1, array2, 0);
}

export function sum<T>(array: T[], adder: any): T {
    let acc: T = adder.GetZero();
    for (let i = 0; i <= (array.length - 1); i++) {
        acc = adder.Add(acc, item_2(i, array));
    }
    return acc;
}

export function sumBy<T, T2>(projection: ((arg0: T) => T2), array: T[], adder: any): T2 {
    let acc: T2 = adder.GetZero();
    for (let i = 0; i <= (array.length - 1); i++) {
        acc = adder.Add(acc, projection(item_2(i, array)));
    }
    return acc;
}

export function maxBy<a, b>(projection: ((arg0: a) => b), xs: a[], comparer: IComparer<b>): a {
    return reduce<a>((x: a, y: a): a => ((comparer.Compare(projection(y), projection(x)) > 0) ? y : x), xs);
}

export function max<a>(xs: a[], comparer: IComparer<a>): a {
    return reduce<a>((x: a, y: a): a => ((comparer.Compare(y, x) > 0) ? y : x), xs);
}

export function minBy<a, b>(projection: ((arg0: a) => b), xs: a[], comparer: IComparer<b>): a {
    return reduce<a>((x: a, y: a): a => ((comparer.Compare(projection(y), projection(x)) > 0) ? x : y), xs);
}

export function min<a>(xs: a[], comparer: IComparer<a>): a {
    return reduce<a>((x: a, y: a): a => ((comparer.Compare(y, x) > 0) ? x : y), xs);
}

export function average<T>(array: T[], averager: any): T {
    if (array.length === 0) {
        throw new Error("The input array was empty\\nParameter name: array");
    }
    let total: T = averager.GetZero();
    for (let i = 0; i <= (array.length - 1); i++) {
        total = averager.Add(total, item_2(i, array));
    }
    return averager.DivideByInt(total, array.length);
}

export function averageBy<T, T2>(projection: ((arg0: T) => T2), array: T[], averager: any): T2 {
    if (array.length === 0) {
        throw new Error("The input array was empty\\nParameter name: array");
    }
    let total: T2 = averager.GetZero();
    for (let i = 0; i <= (array.length - 1); i++) {
        total = averager.Add(total, projection(item_2(i, array)));
    }
    return averager.DivideByInt(total, array.length);
}

export function windowed<T>(windowSize: int32, source: T[]): T[][] {
    if (windowSize <= 0) {
        throw new Error("windowSize must be positive");
    }
    let res: T[][];
    const len: int32 = max_1(0, (source.length - windowSize) + 1) | 0;
    res = (new Array(len));
    for (let i: int32 = windowSize; i <= source.length; i++) {
        setItem_1(res, i - windowSize, source.slice(i - windowSize, (i - 1) + 1));
    }
    return res;
}

export function splitInto<T>(chunks: int32, array: T[]): T[][] {
    if (chunks < 1) {
        throw new Error("The input must be positive.\\nParameter name: chunks");
    }
    if (array.length === 0) {
        return [[]];
    }
    else {
        const result: T[][] = [];
        const chunks_1: int32 = min_1(chunks, array.length) | 0;
        const minChunkSize: int32 = ~~(array.length / chunks_1) | 0;
        const chunksWithExtraItem: int32 = (array.length % chunks_1) | 0;
        for (let i = 0; i <= (chunks_1 - 1); i++) {
            const chunkSize: int32 = ((i < chunksWithExtraItem) ? (minChunkSize + 1) : minChunkSize) | 0;
            let slice: T[];
            const start_1: int32 = ((i * minChunkSize) + min_1(chunksWithExtraItem, i)) | 0;
            slice = (array.slice(start_1, (start_1 + chunkSize)));
            result.push(slice);
        }
        return result;
    }
}

export function transpose<T>(arrays: Iterable<T[]>, cons?: any): T[][] {
    const arrays_1: T[][] = Array.isArray(arrays) ? (arrays as T[][]) : (Array.from(arrays));
    const len: int32 = arrays_1.length | 0;
    if (len === 0) {
        return new Array(0);
    }
    else {
        const firstArray: T[] = item_2(0, arrays_1);
        const lenInner: int32 = firstArray.length | 0;
        if (!forAll<T[]>((a: T[]): boolean => (a.length === lenInner), arrays_1)) {
            differentLengths<void>();
        }
        const result: T[][] = new Array(lenInner);
        for (let i = 0; i <= (lenInner - 1); i++) {
            setItem_1(result, i, Helpers_allocateArrayFromCons<T>(cons, len));
            for (let j = 0; j <= (len - 1); j++) {
                item_2(i, result)[j] = item_2(i, item_2(j, arrays_1));
            }
        }
        return result;
    }
}

export function insertAt<T>(index: int32, y: T, xs: T[], cons?: any): T[] {
    const len: int32 = xs.length | 0;
    if ((index < 0) ? true : (index > len)) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    const target: T[] = Helpers_allocateArrayFromCons<T>(cons, len + 1);
    for (let i = 0; i <= (index - 1); i++) {
        setItem_1(target, i, item_2(i, xs));
    }
    setItem_1(target, index, y);
    for (let i_1: int32 = index; i_1 <= (len - 1); i_1++) {
        setItem_1(target, i_1 + 1, item_2(i_1, xs));
    }
    return target;
}

export function insertManyAt<T>(index: int32, ys: Iterable<T>, xs: T[], cons?: any): T[] {
    const len: int32 = xs.length | 0;
    if ((index < 0) ? true : (index > len)) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    const ys_1: T[] = Array.from(ys);
    const len2: int32 = ys_1.length | 0;
    const target: T[] = Helpers_allocateArrayFromCons<T>(cons, len + len2);
    for (let i = 0; i <= (index - 1); i++) {
        setItem_1(target, i, item_2(i, xs));
    }
    for (let i_1 = 0; i_1 <= (len2 - 1); i_1++) {
        setItem_1(target, index + i_1, item_2(i_1, ys_1));
    }
    for (let i_2: int32 = index; i_2 <= (len - 1); i_2++) {
        setItem_1(target, i_2 + len2, item_2(i_2, xs));
    }
    return target;
}

export function removeAt<T>(index: int32, xs: T[]): T[] {
    if ((index < 0) ? true : (index >= xs.length)) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    let i = -1;
    return filter<T>((_arg: T): boolean => {
        i = ((i + 1) | 0);
        return i !== index;
    }, xs);
}

export function removeManyAt<T>(index: int32, count: int32, xs: T[]): T[] {
    let i = -1;
    let status = -1;
    const ys: T[] = filter<T>((_arg: T): boolean => {
        i = ((i + 1) | 0);
        if (i === index) {
            status = 0;
            return false;
        }
        else if (i > index) {
            if (i < (index + count)) {
                return false;
            }
            else {
                status = 1;
                return true;
            }
        }
        else {
            return true;
        }
    }, xs);
    const status_1: int32 = (((status === 0) && ((i + 1) === (index + count))) ? 1 : status) | 0;
    if (status_1 < 1) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + ((status_1 < 0) ? "index" : "count"));
    }
    return ys;
}

export function updateAt<T>(index: int32, y: T, xs: T[], cons?: any): T[] {
    const len: int32 = xs.length | 0;
    if ((index < 0) ? true : (index >= len)) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    const target: T[] = Helpers_allocateArrayFromCons<T>(cons, len);
    for (let i = 0; i <= (len - 1); i++) {
        setItem_1(target, i, (i === index) ? y : item_2(i, xs));
    }
    return target;
}

export function resize<T>(xs: FSharpRef<T[]>, newSize: int32, zero?: Option<T>, cons?: any): void {
    let array: T[], array_1: T[], start_2: int32, count_2: int32;
    if (newSize < 0) {
        throw new Error("The input must be non-negative.\\nParameter name: newSize");
    }
    const zero_1: T = defaultArg<T>(zero, defaultOf());
    if (xs.contents == null) {
        xs.contents = ((array = Helpers_allocateArrayFromCons<T>(cons, newSize), array.fill(zero_1, 0, (0 + newSize))));
    }
    else {
        const len: int32 = xs.contents.length | 0;
        if (newSize < len) {
            xs.contents = ((array_1 = xs.contents, array_1.slice(0, (0 + newSize))));
        }
        else if (newSize > len) {
            const target: T[] = Helpers_allocateArrayFromCons<T>(cons, newSize);
            if (len > 0) {
                copyTo<T>(xs.contents, 0, target, 0, len);
            }
            xs.contents = ((start_2 = (len | 0), (count_2 = ((newSize - len) | 0), target.fill(zero_1, start_2, (start_2 + count_2)))));
        }
    }
}

