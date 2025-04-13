import { int32 } from "./Int32.js";
import { IDisposable, disposeSafe, defaultOf, toIterator, IEnumerator, getEnumerator, structuralHash, equals as equals_1, IEqualityComparer, compare, IComparer } from "./Util.js";
import { class_type, TypeInfo } from "./Reflection.js";
import { toArray, empty, singleton, append, enumerateWhile, delay } from "./Seq.js";
import { setItem, initialize, copyTo, fill, item as item_1 } from "./Array.js";
import { max } from "./Double.js";
import { FSharpRef } from "./Types.js";

export class Comparer$1<T> implements IComparer<T> {
    readonly comparison: ((arg0: T, arg1: T) => int32);
    constructor(comparison: ((arg0: T, arg1: T) => int32)) {
        this.comparison = comparison;
    }
    Compare(x: T, y: T): int32 {
        const _: Comparer$1<T> = this;
        return _.comparison(x, y) | 0;
    }
}

export function Comparer$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("System.Collections.Generic.Comparer`1", [gen0], Comparer$1);
}

export function Comparer$1_$ctor_47C913C<T>(comparison: ((arg0: T, arg1: T) => int32)): Comparer$1<T> {
    return new Comparer$1(comparison);
}

export function Comparer$1_get_Default<T>(): Comparer$1<T> {
    return Comparer$1_$ctor_47C913C<T>(compare);
}

export function Comparer$1_Create_47C913C<T>(comparison: ((arg0: T, arg1: T) => int32)): Comparer$1<T> {
    return Comparer$1_$ctor_47C913C<T>(comparison);
}

export function Comparer$1__Compare_5BDDA0<T>(_: Comparer$1<T>, x: T, y: T): int32 {
    return _.comparison(x, y);
}

export class EqualityComparer$1<T> implements IEqualityComparer<T> {
    readonly getHashCode: ((arg0: T) => int32);
    readonly equals: ((arg0: T, arg1: T) => boolean);
    constructor(equals: ((arg0: T, arg1: T) => boolean), getHashCode: ((arg0: T) => int32)) {
        this.equals = equals;
        this.getHashCode = getHashCode;
    }
    Equals(x: T, y: T): boolean {
        const _: EqualityComparer$1<T> = this;
        return _.equals(x, y);
    }
    GetHashCode(x: T): int32 {
        const _: EqualityComparer$1<T> = this;
        return _.getHashCode(x) | 0;
    }
}

export function EqualityComparer$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("System.Collections.Generic.EqualityComparer`1", [gen0], EqualityComparer$1);
}

export function EqualityComparer$1_$ctor_Z6EE254AB<T>(equals: ((arg0: T, arg1: T) => boolean), getHashCode: ((arg0: T) => int32)): EqualityComparer$1<T> {
    return new EqualityComparer$1(equals, getHashCode);
}

export function EqualityComparer$1_get_Default<T>(): EqualityComparer$1<T> {
    return EqualityComparer$1_$ctor_Z6EE254AB<T>(equals_1, structuralHash);
}

export function EqualityComparer$1_Create_Z6EE254AB<T>(equals: ((arg0: T, arg1: T) => boolean), getHashCode: ((arg0: T) => int32)): EqualityComparer$1<T> {
    return EqualityComparer$1_$ctor_Z6EE254AB<T>(equals, getHashCode);
}

export function EqualityComparer$1__Equals_5BDDA0<T>(_: EqualityComparer$1<T>, x: T, y: T): boolean {
    return _.equals(x, y);
}

export function EqualityComparer$1__GetHashCode_2B595<T>(_: EqualityComparer$1<T>, x: T): int32 {
    return _.getHashCode(x);
}

export class Stack$1<T> implements Iterable<T> {
    contents: T[];
    count: int32;
    constructor(initialContents: T[], initialCount: int32) {
        this.contents = initialContents;
        this.count = (initialCount | 0);
    }
    GetEnumerator(): IEnumerator<T> {
        const _: Stack$1<T> = this;
        return getEnumerator(delay<T>((): Iterable<T> => {
            let index: int32 = _.count - 1;
            return enumerateWhile<T>((): boolean => (index >= 0), delay<T>((): Iterable<T> => append<T>(singleton<T>(item_1(index, _.contents)), delay<T>((): Iterable<T> => {
                index = ((index - 1) | 0);
                return empty<T>();
            }))));
        }));
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const this$: Stack$1<T> = this;
        return getEnumerator(this$);
    }
}

export function Stack$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("System.Collections.Generic.Stack`1", [gen0], Stack$1);
}

function Stack$1_$ctor_Z3B4C077E<T>(initialContents: T[], initialCount: int32): Stack$1<T> {
    return new Stack$1(initialContents, initialCount);
}

export function Stack$1_$ctor_Z524259A4<T>(initialCapacity: int32): Stack$1<T> {
    return Stack$1_$ctor_Z3B4C077E<T>(fill(new Array(initialCapacity), 0, initialCapacity, null), 0);
}

export function Stack$1_$ctor<T>(): Stack$1<T> {
    return Stack$1_$ctor_Z524259A4<T>(4);
}

export function Stack$1_$ctor_BB573A<T>(xs: Iterable<T>): Stack$1<T> {
    const arr: T[] = Array.from(xs);
    return Stack$1_$ctor_Z3B4C077E<T>(arr, arr.length);
}

export function Stack$1__Ensure_Z524259A4<T>(_: Stack$1<T>, newSize: int32): void {
    const oldSize: int32 = _.contents.length | 0;
    if (newSize > oldSize) {
        const old: T[] = _.contents;
        _.contents = fill(new Array(max(newSize, oldSize * 2)), 0, max(newSize, oldSize * 2), null);
        copyTo<T>(old, 0, _.contents, 0, _.count);
    }
}

export function Stack$1__get_Count<T>(_: Stack$1<T>): int32 {
    return _.count;
}

export function Stack$1__Pop<T>(_: Stack$1<T>): T {
    _.count = ((_.count - 1) | 0);
    return item_1(_.count, _.contents);
}

export function Stack$1__Peek<T>(_: Stack$1<T>): T {
    return item_1(_.count - 1, _.contents);
}

export function Stack$1__Contains_2B595<T>(_: Stack$1<T>, x: T): boolean {
    let found = false;
    let i = 0;
    while ((i < _.count) && !found) {
        if (equals_1(x, item_1(i, _.contents))) {
            found = true;
        }
        else {
            i = ((i + 1) | 0);
        }
    }
    return found;
}

export function Stack$1__TryPeek_1F3DB691<T>(this$: Stack$1<T>, result: FSharpRef<T>): boolean {
    if (this$.count > 0) {
        result.contents = Stack$1__Peek<T>(this$);
        return true;
    }
    else {
        return false;
    }
}

export function Stack$1__TryPop_1F3DB691<T>(this$: Stack$1<T>, result: FSharpRef<T>): boolean {
    if (this$.count > 0) {
        result.contents = Stack$1__Pop<T>(this$);
        return true;
    }
    else {
        return false;
    }
}

export function Stack$1__Push_2B595<T>(this$: Stack$1<T>, x: T): void {
    Stack$1__Ensure_Z524259A4<T>(this$, this$.count + 1);
    this$.contents[this$.count] = x;
    this$.count = ((this$.count + 1) | 0);
}

export function Stack$1__Clear<T>(_: Stack$1<T>): void {
    _.count = 0;
    fill<T>(_.contents, 0, _.contents.length, defaultOf());
}

export function Stack$1__TrimExcess<T>(this$: Stack$1<T>): void {
    if ((this$.count / this$.contents.length) > 0.9) {
        Stack$1__Ensure_Z524259A4<T>(this$, this$.count);
    }
}

export function Stack$1__ToArray<T>(_: Stack$1<T>): T[] {
    return initialize<T>(_.count, (i: int32): T => item_1((_.count - 1) - i, _.contents));
}

export class Queue$1<T> implements Iterable<T> {
    contents: T[];
    count: int32;
    head: int32;
    tail: int32;
    constructor(initialContents: T[], initialCount: int32) {
        this.contents = initialContents;
        this.count = (initialCount | 0);
        this.head = 0;
        this.tail = (((initialCount === this.contents.length) ? 0 : initialCount) | 0);
    }
    GetEnumerator(): IEnumerator<T> {
        const _: Queue$1<T> = this;
        return getEnumerator(Queue$1__toSeq<T>(_));
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const this$: Queue$1<T> = this;
        return getEnumerator(this$);
    }
}

export function Queue$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("System.Collections.Generic.Queue`1", [gen0], Queue$1);
}

function Queue$1_$ctor_Z3B4C077E<T>(initialContents: T[], initialCount: int32): Queue$1<T> {
    return new Queue$1(initialContents, initialCount);
}

export function Queue$1_$ctor_Z524259A4<T>(initialCapacity: int32): Queue$1<T> {
    if (initialCapacity < 0) {
        throw new Error("capacity is less than 0");
    }
    return Queue$1_$ctor_Z3B4C077E<T>(fill(new Array(initialCapacity), 0, initialCapacity, null), 0);
}

export function Queue$1_$ctor<T>(): Queue$1<T> {
    return Queue$1_$ctor_Z524259A4<T>(4);
}

export function Queue$1_$ctor_BB573A<T>(xs: Iterable<T>): Queue$1<T> {
    const arr: T[] = Array.from(xs);
    return Queue$1_$ctor_Z3B4C077E<T>(arr, arr.length);
}

export function Queue$1__get_Count<T>(_: Queue$1<T>): int32 {
    return _.count;
}

export function Queue$1__Enqueue_2B595<T>(_: Queue$1<T>, value: T): void {
    if (_.count === Queue$1__size<T>(_)) {
        Queue$1__ensure_Z524259A4<T>(_, _.count + 1);
    }
    _.contents[_.tail] = value;
    _.tail = (((_.tail + 1) % Queue$1__size<T>(_)) | 0);
    _.count = ((_.count + 1) | 0);
}

export function Queue$1__Dequeue<T>(_: Queue$1<T>): T {
    if (_.count === 0) {
        throw new Error("Queue is empty");
    }
    const value: T = item_1(_.head, _.contents);
    _.head = (((_.head + 1) % Queue$1__size<T>(_)) | 0);
    _.count = ((_.count - 1) | 0);
    return value;
}

export function Queue$1__Peek<T>(_: Queue$1<T>): T {
    if (_.count === 0) {
        throw new Error("Queue is empty");
    }
    return item_1(_.head, _.contents);
}

export function Queue$1__TryDequeue_1F3DB691<T>(this$: Queue$1<T>, result: FSharpRef<T>): boolean {
    if (this$.count === 0) {
        return false;
    }
    else {
        result.contents = Queue$1__Dequeue<T>(this$);
        return true;
    }
}

export function Queue$1__TryPeek_1F3DB691<T>(this$: Queue$1<T>, result: FSharpRef<T>): boolean {
    if (this$.count === 0) {
        return false;
    }
    else {
        result.contents = Queue$1__Peek<T>(this$);
        return true;
    }
}

export function Queue$1__Contains_2B595<T>(_: Queue$1<T>, x: T): boolean {
    let found = false;
    let i = 0;
    while ((i < _.count) && !found) {
        if (equals_1(x, item_1(Queue$1__toIndex_Z524259A4<T>(_, i), _.contents))) {
            found = true;
        }
        else {
            i = ((i + 1) | 0);
        }
    }
    return found;
}

export function Queue$1__Clear<T>(_: Queue$1<T>): void {
    _.count = 0;
    _.head = 0;
    _.tail = 0;
    fill<T>(_.contents, 0, Queue$1__size<T>(_), defaultOf());
}

export function Queue$1__TrimExcess<T>(_: Queue$1<T>): void {
    if ((_.count / _.contents.length) > 0.9) {
        Queue$1__ensure_Z524259A4<T>(_, _.count);
    }
}

export function Queue$1__ToArray<T>(_: Queue$1<T>): T[] {
    return toArray<T>(Queue$1__toSeq<T>(_));
}

export function Queue$1__CopyTo_Z3B4C077E<T>(_: Queue$1<T>, target: T[], start: int32): void {
    let i: int32 = start;
    const enumerator: IEnumerator<T> = getEnumerator(Queue$1__toSeq<T>(_));
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const item: T = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            setItem(target, i, item);
            i = ((i + 1) | 0);
        }
    }
    finally {
        disposeSafe(enumerator as IDisposable);
    }
}

export function Queue$1__size<T>(this$: Queue$1<T>): int32 {
    return this$.contents.length;
}

export function Queue$1__toIndex_Z524259A4<T>(this$: Queue$1<T>, i: int32): int32 {
    return (this$.head + i) % Queue$1__size<T>(this$);
}

export function Queue$1__ensure_Z524259A4<T>(this$: Queue$1<T>, requiredSize: int32): void {
    const newBuffer: T[] = fill(new Array(requiredSize), 0, requiredSize, null);
    if (this$.head < this$.tail) {
        copyTo<T>(this$.contents, this$.head, newBuffer, 0, this$.count);
    }
    else {
        copyTo<T>(this$.contents, this$.head, newBuffer, 0, Queue$1__size<T>(this$) - this$.head);
        copyTo<T>(this$.contents, 0, newBuffer, Queue$1__size<T>(this$) - this$.head, this$.tail);
    }
    this$.head = 0;
    this$.contents = newBuffer;
    this$.tail = (((this$.count === Queue$1__size<T>(this$)) ? 0 : this$.count) | 0);
}

export function Queue$1__toSeq<T>(this$: Queue$1<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => {
        let i = 0;
        return enumerateWhile<T>((): boolean => (i < this$.count), delay<T>((): Iterable<T> => append<T>(singleton<T>(item_1(Queue$1__toIndex_Z524259A4<T>(this$, i), this$.contents)), delay<T>((): Iterable<T> => {
            i = ((i + 1) | 0);
            return empty<T>();
        }))));
    });
}

