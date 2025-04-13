import { join } from "./String.js";
import { defaultArg, some, value as value_1, Option } from "./Option.js";
import { IComparer, IEqualityComparer, disposeSafe, isArrayLike, IDisposable, defaultOf, toIterator, getEnumerator, IEnumerator, compare, structuralHash, equals } from "./Util.js";
import { int32 } from "./Int32.js";
import { Record } from "./Types.js";
import { class_type, record_type, option_type, TypeInfo } from "./Reflection.js";
import { SR_inputSequenceTooLong, SR_inputSequenceEmpty, SR_inputMustBeNonNegative, SR_notEnoughElements, SR_differentLengths, SR_keyNotFoundAlt, SR_indexOutOfBounds, SR_inputWasEmpty } from "./Global.js";
import { transpose as transpose_1, splitInto as splitInto_1, windowed as windowed_1, pairwise as pairwise_1, chunkBySize as chunkBySize_1, map as map_1, permute as permute_1, tryFindIndexBack as tryFindIndexBack_1, tryFindBack as tryFindBack_1, scanBack as scanBack_1, item as item_1, foldBack2 as foldBack2_1, foldBack as foldBack_1, setItem, fill } from "./Array.js";

export class FSharpList<T> extends Record implements Iterable<T> {
    readonly head: T;
    tail: Option<FSharpList<T>>;
    constructor(head: T, tail: Option<FSharpList<T>>) {
        super();
        this.head = head;
        this.tail = tail;
    }
    toString(): string {
        const xs: FSharpList<T> = this;
        return ("[" + join("; ", xs)) + "]";
    }
    Equals(other: any): boolean {
        const xs: FSharpList<T> = this;
        if (xs === other) {
            return true;
        }
        else {
            const loop = (xs_1_mut: FSharpList<T>, ys_1_mut: FSharpList<T>): boolean => {
                loop:
                while (true) {
                    const xs_1: FSharpList<T> = xs_1_mut, ys_1: FSharpList<T> = ys_1_mut;
                    const matchValue: Option<FSharpList<T>> = xs_1.tail;
                    const matchValue_1: Option<FSharpList<T>> = ys_1.tail;
                    if (matchValue != null) {
                        if (matchValue_1 != null) {
                            const xt: FSharpList<T> = value_1(matchValue);
                            const yt: FSharpList<T> = value_1(matchValue_1);
                            if (equals(xs_1.head, ys_1.head)) {
                                xs_1_mut = xt;
                                ys_1_mut = yt;
                                continue loop;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                    else if (matchValue_1 != null) {
                        return false;
                    }
                    else {
                        return true;
                    }
                    break;
                }
            };
            return loop(xs, other as FSharpList<T>);
        }
    }
    GetHashCode(): int32 {
        const xs: FSharpList<T> = this;
        const loop = (i_mut: int32, h_mut: int32, xs_1_mut: FSharpList<T>): int32 => {
            loop:
            while (true) {
                const i: int32 = i_mut, h: int32 = h_mut, xs_1: FSharpList<T> = xs_1_mut;
                const matchValue: Option<FSharpList<T>> = xs_1.tail;
                if (matchValue != null) {
                    const t: FSharpList<T> = value_1(matchValue);
                    if (i > 18) {
                        return h | 0;
                    }
                    else {
                        i_mut = (i + 1);
                        h_mut = (((h << 1) + structuralHash(xs_1.head)) + (631 * i));
                        xs_1_mut = t;
                        continue loop;
                    }
                }
                else {
                    return h | 0;
                }
                break;
            }
        };
        return loop(0, 0, xs) | 0;
    }
    toJSON(): any {
        const this$: FSharpList<T> = this;
        return Array.from(this$);
    }
    CompareTo(other: any): int32 {
        const xs: FSharpList<T> = this;
        const loop = (xs_1_mut: FSharpList<T>, ys_1_mut: FSharpList<T>): int32 => {
            loop:
            while (true) {
                const xs_1: FSharpList<T> = xs_1_mut, ys_1: FSharpList<T> = ys_1_mut;
                const matchValue: Option<FSharpList<T>> = xs_1.tail;
                const matchValue_1: Option<FSharpList<T>> = ys_1.tail;
                if (matchValue != null) {
                    if (matchValue_1 != null) {
                        const xt: FSharpList<T> = value_1(matchValue);
                        const yt: FSharpList<T> = value_1(matchValue_1);
                        const c: int32 = compare(xs_1.head, ys_1.head) | 0;
                        if (c === 0) {
                            xs_1_mut = xt;
                            ys_1_mut = yt;
                            continue loop;
                        }
                        else {
                            return c | 0;
                        }
                    }
                    else {
                        return 1;
                    }
                }
                else if (matchValue_1 != null) {
                    return -1;
                }
                else {
                    return 0;
                }
                break;
            }
        };
        return loop(xs, other as FSharpList<T>) | 0;
    }
    GetEnumerator(): IEnumerator<T> {
        const xs: FSharpList<T> = this;
        return ListEnumerator$1_$ctor_3002E699<T>(xs);
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const xs: FSharpList<T> = this;
        return getEnumerator(xs);
    }
}

export function FSharpList_$reflection(gen0: TypeInfo): TypeInfo {
    return record_type("ListModule.FSharpList", [gen0], FSharpList, () => [["head", gen0], ["tail", option_type(FSharpList_$reflection(gen0))]]);
}

export class ListEnumerator$1<T> implements IEnumerator<T>, IDisposable {
    readonly xs: FSharpList<T>;
    it: FSharpList<T>;
    current: T;
    constructor(xs: FSharpList<T>) {
        this.xs = xs;
        this.it = this.xs;
        this.current = defaultOf();
    }
    "System.Collections.Generic.IEnumerator`1.get_Current"(): T {
        const _: ListEnumerator$1<T> = this;
        return _.current;
    }
    "System.Collections.IEnumerator.get_Current"(): any {
        const _: ListEnumerator$1<T> = this;
        return _.current;
    }
    "System.Collections.IEnumerator.MoveNext"(): boolean {
        const _: ListEnumerator$1<T> = this;
        const matchValue: Option<FSharpList<T>> = _.it.tail;
        if (matchValue != null) {
            const t: FSharpList<T> = value_1(matchValue);
            _.current = _.it.head;
            _.it = t;
            return true;
        }
        else {
            return false;
        }
    }
    "System.Collections.IEnumerator.Reset"(): void {
        const _: ListEnumerator$1<T> = this;
        _.it = _.xs;
        _.current = defaultOf();
    }
    Dispose(): void {
    }
}

export function ListEnumerator$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("ListModule.ListEnumerator`1", [gen0], ListEnumerator$1);
}

export function ListEnumerator$1_$ctor_3002E699<T>(xs: FSharpList<T>): ListEnumerator$1<T> {
    return new ListEnumerator$1(xs);
}

export function FSharpList_get_Empty<T>(): FSharpList<T> {
    return new FSharpList(defaultOf(), undefined);
}

export function FSharpList_Cons_305B8EAC<T>(x: T, xs: FSharpList<T>): FSharpList<T> {
    return new FSharpList(x, xs);
}

export function FSharpList__get_IsEmpty<T>(xs: FSharpList<T>): boolean {
    return xs.tail == null;
}

export function FSharpList__get_Length<T>(xs: FSharpList<T>): int32 {
    const loop = (i_mut: int32, xs_1_mut: FSharpList<T>): int32 => {
        loop:
        while (true) {
            const i: int32 = i_mut, xs_1: FSharpList<T> = xs_1_mut;
            const matchValue: Option<FSharpList<T>> = xs_1.tail;
            if (matchValue != null) {
                i_mut = (i + 1);
                xs_1_mut = value_1(matchValue);
                continue loop;
            }
            else {
                return i | 0;
            }
            break;
        }
    };
    return loop(0, xs) | 0;
}

export function FSharpList__get_Head<T>(xs: FSharpList<T>): T {
    const matchValue: Option<FSharpList<T>> = xs.tail;
    if (matchValue != null) {
        return xs.head;
    }
    else {
        throw new Error((SR_inputWasEmpty + "\\nParameter name: ") + "list");
    }
}

export function FSharpList__get_Tail<T>(xs: FSharpList<T>): FSharpList<T> {
    const matchValue: Option<FSharpList<T>> = xs.tail;
    if (matchValue != null) {
        return value_1(matchValue);
    }
    else {
        throw new Error((SR_inputWasEmpty + "\\nParameter name: ") + "list");
    }
}

export function FSharpList__get_Item_Z524259A4<T>(xs: FSharpList<T>, index: int32): T {
    const loop = (i_mut: int32, xs_1_mut: FSharpList<T>): T => {
        loop:
        while (true) {
            const i: int32 = i_mut, xs_1: FSharpList<T> = xs_1_mut;
            const matchValue: Option<FSharpList<T>> = xs_1.tail;
            if (matchValue != null) {
                if (i === index) {
                    return xs_1.head;
                }
                else {
                    i_mut = (i + 1);
                    xs_1_mut = value_1(matchValue);
                    continue loop;
                }
            }
            else {
                throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
            }
            break;
        }
    };
    return loop(0, xs);
}

export function indexNotFound<$a>(): $a {
    throw new Error(SR_keyNotFoundAlt);
}

export function empty<$a>(): FSharpList<$a> {
    return FSharpList_get_Empty<$a>();
}

export function cons<T>(x: T, xs: FSharpList<T>): FSharpList<T> {
    return FSharpList_Cons_305B8EAC<T>(x, xs);
}

export function singleton<$a>(x: $a): FSharpList<$a> {
    return FSharpList_Cons_305B8EAC<$a>(x, FSharpList_get_Empty<$a>());
}

export function isEmpty<T>(xs: FSharpList<T>): boolean {
    return FSharpList__get_IsEmpty<T>(xs);
}

export function length<T>(xs: FSharpList<T>): int32 {
    return FSharpList__get_Length<T>(xs);
}

export function head<T>(xs: FSharpList<T>): T {
    return FSharpList__get_Head<T>(xs);
}

export function tryHead<T>(xs: FSharpList<T>): Option<T> {
    if (FSharpList__get_IsEmpty<T>(xs)) {
        return undefined;
    }
    else {
        return some(FSharpList__get_Head<T>(xs));
    }
}

export function tail<T>(xs: FSharpList<T>): FSharpList<T> {
    return FSharpList__get_Tail<T>(xs);
}

export function tryLast<T>(xs_mut: FSharpList<T>): Option<T> {
    tryLast:
    while (true) {
        const xs: FSharpList<T> = xs_mut;
        if (FSharpList__get_IsEmpty<T>(xs)) {
            return undefined;
        }
        else {
            const t: FSharpList<T> = FSharpList__get_Tail<T>(xs);
            if (FSharpList__get_IsEmpty<T>(t)) {
                return some(FSharpList__get_Head<T>(xs));
            }
            else {
                xs_mut = t;
                continue tryLast;
            }
        }
        break;
    }
}

export function last<T>(xs: FSharpList<T>): T {
    const matchValue: Option<T> = tryLast<T>(xs);
    if (matchValue == null) {
        throw new Error(SR_inputWasEmpty);
    }
    else {
        return value_1(matchValue);
    }
}

export function compareWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: FSharpList<T>, ys: FSharpList<T>): int32 {
    const loop = (xs_1_mut: FSharpList<T>, ys_1_mut: FSharpList<T>): int32 => {
        loop:
        while (true) {
            const xs_1: FSharpList<T> = xs_1_mut, ys_1: FSharpList<T> = ys_1_mut;
            const matchValue: boolean = FSharpList__get_IsEmpty<T>(xs_1);
            const matchValue_1: boolean = FSharpList__get_IsEmpty<T>(ys_1);
            if (matchValue) {
                if (matchValue_1) {
                    return 0;
                }
                else {
                    return -1;
                }
            }
            else if (matchValue_1) {
                return 1;
            }
            else {
                const c: int32 = comparer(FSharpList__get_Head<T>(xs_1), FSharpList__get_Head<T>(ys_1)) | 0;
                if (c === 0) {
                    xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                    ys_1_mut = FSharpList__get_Tail<T>(ys_1);
                    continue loop;
                }
                else {
                    return c | 0;
                }
            }
            break;
        }
    };
    return loop(xs, ys) | 0;
}

export function toArray<T>(xs: FSharpList<T>): T[] {
    const len: int32 = FSharpList__get_Length<T>(xs) | 0;
    const res: T[] = fill(new Array(len), 0, len, null);
    const loop = (i_mut: int32, xs_1_mut: FSharpList<T>): void => {
        loop:
        while (true) {
            const i: int32 = i_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (!FSharpList__get_IsEmpty<T>(xs_1)) {
                setItem(res, i, FSharpList__get_Head<T>(xs_1));
                i_mut = (i + 1);
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    loop(0, xs);
    return res;
}

export function fold<T, State>(folder: ((arg0: State, arg1: T) => State), state: State, xs: FSharpList<T>): State {
    let acc: State = state;
    let xs_1: FSharpList<T> = xs;
    while (!FSharpList__get_IsEmpty<T>(xs_1)) {
        acc = folder(acc, head<T>(xs_1));
        xs_1 = FSharpList__get_Tail<T>(xs_1);
    }
    return acc;
}

export function reverse<T>(xs: FSharpList<T>): FSharpList<T> {
    return fold<T, FSharpList<T>>((acc: FSharpList<T>, x: T): FSharpList<T> => FSharpList_Cons_305B8EAC<T>(x, acc), FSharpList_get_Empty<T>(), xs);
}

export function foldBack<T, State>(folder: ((arg0: T, arg1: State) => State), xs: FSharpList<T>, state: State): State {
    return foldBack_1<T, State>(folder, toArray<T>(xs), state);
}

export function foldIndexed<State, T>(folder: ((arg0: int32, arg1: State, arg2: T) => State), state: State, xs: FSharpList<T>): State {
    const loop = (i_mut: int32, acc_mut: State, xs_1_mut: FSharpList<T>): State => {
        loop:
        while (true) {
            const i: int32 = i_mut, acc: State = acc_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (FSharpList__get_IsEmpty<T>(xs_1)) {
                return acc;
            }
            else {
                i_mut = (i + 1);
                acc_mut = folder(i, acc, FSharpList__get_Head<T>(xs_1));
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    return loop(0, state, xs);
}

export function fold2<T1, T2, State>(folder: ((arg0: State, arg1: T1, arg2: T2) => State), state: State, xs: FSharpList<T1>, ys: FSharpList<T2>): State {
    let acc: State = state;
    let xs_1: FSharpList<T1> = xs;
    let ys_1: FSharpList<T2> = ys;
    while (!FSharpList__get_IsEmpty<T1>(xs_1) && !FSharpList__get_IsEmpty<T2>(ys_1)) {
        acc = folder(acc, FSharpList__get_Head<T1>(xs_1), FSharpList__get_Head<T2>(ys_1));
        xs_1 = FSharpList__get_Tail<T1>(xs_1);
        ys_1 = FSharpList__get_Tail<T2>(ys_1);
    }
    return acc;
}

export function foldBack2<T1, T2, State>(folder: ((arg0: T1, arg1: T2, arg2: State) => State), xs: FSharpList<T1>, ys: FSharpList<T2>, state: State): State {
    return foldBack2_1<T1, T2, State>(folder, toArray<T1>(xs), toArray<T2>(ys), state);
}

export function unfold<State, T>(gen: ((arg0: State) => Option<[T, State]>), state: State): FSharpList<T> {
    const loop = (acc_mut: State, node_mut: FSharpList<T>): FSharpList<T> => {
        let t: FSharpList<T>;
        loop:
        while (true) {
            const acc: State = acc_mut, node: FSharpList<T> = node_mut;
            const matchValue: Option<[T, State]> = gen(acc);
            if (matchValue != null) {
                acc_mut = value_1(matchValue)[1];
                node_mut = ((t = (new FSharpList(value_1(matchValue)[0], undefined)), (node.tail = t, t)));
                continue loop;
            }
            else {
                return node;
            }
            break;
        }
    };
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    const node_1: FSharpList<T> = loop(state, root);
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    node_1.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function iterate<$a>(action: ((arg0: $a) => void), xs: FSharpList<$a>): void {
    fold<$a, void>((unitVar: void, x: $a): void => {
        action(x);
    }, undefined, xs);
}

export function iterate2<$a, $b>(action: ((arg0: $a, arg1: $b) => void), xs: FSharpList<$a>, ys: FSharpList<$b>): void {
    fold2<$a, $b, void>((unitVar: void, x: $a, y: $b): void => {
        action(x, y);
    }, undefined, xs, ys);
}

export function iterateIndexed<$a>(action: ((arg0: int32, arg1: $a) => void), xs: FSharpList<$a>): void {
    fold<$a, int32>((i: int32, x: $a): int32 => {
        action(i, x);
        return (i + 1) | 0;
    }, 0, xs);
}

export function iterateIndexed2<$a, $b>(action: ((arg0: int32, arg1: $a, arg2: $b) => void), xs: FSharpList<$a>, ys: FSharpList<$b>): void {
    fold2<$a, $b, int32>((i: int32, x: $a, y: $b): int32 => {
        action(i, x, y);
        return (i + 1) | 0;
    }, 0, xs, ys);
}

export function toSeq<T>(xs: FSharpList<T>): Iterable<T> {
    return xs;
}

export function ofArrayWithTail<T>(xs: T[], tail_1: FSharpList<T>): FSharpList<T> {
    let res: FSharpList<T> = tail_1;
    for (let i: int32 = xs.length - 1; i >= 0; i--) {
        res = FSharpList_Cons_305B8EAC<T>(item_1(i, xs), res);
    }
    return res;
}

export function ofArray<T>(xs: T[]): FSharpList<T> {
    return ofArrayWithTail<T>(xs, FSharpList_get_Empty<T>());
}

export function ofSeq<T>(xs: Iterable<T>): FSharpList<T> {
    let xs_3: FSharpList<T>, t: FSharpList<T>;
    if (isArrayLike(xs)) {
        return ofArray<T>(xs);
    }
    else if (xs instanceof FSharpList) {
        return xs;
    }
    else {
        const root: FSharpList<T> = FSharpList_get_Empty<T>();
        let node: FSharpList<T> = root;
        const enumerator: IEnumerator<T> = getEnumerator(xs);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const x: T = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                node = ((xs_3 = node, (t = (new FSharpList(x, undefined)), (xs_3.tail = t, t))));
            }
        }
        finally {
            disposeSafe(enumerator as IDisposable);
        }
        const xs_5: FSharpList<T> = node;
        const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
        xs_5.tail = t_2;
        return FSharpList__get_Tail<T>(root);
    }
}

export function concat<T>(lists: Iterable<FSharpList<T>>): FSharpList<T> {
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    let node: FSharpList<T> = root;
    const action = (xs: FSharpList<T>): void => {
        node = fold<T, FSharpList<T>>((acc: FSharpList<T>, x: T): FSharpList<T> => {
            const t: FSharpList<T> = new FSharpList(x, undefined);
            acc.tail = t;
            return t;
        }, node, xs);
    };
    if (isArrayLike(lists)) {
        const xs_3: FSharpList<T>[] = lists;
        xs_3.forEach(action);
    }
    else if (lists instanceof FSharpList) {
        iterate<FSharpList<T>>(action, lists);
    }
    else {
        const enumerator: IEnumerator<FSharpList<T>> = getEnumerator(lists);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                action(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
        }
        finally {
            disposeSafe(enumerator as IDisposable);
        }
    }
    const xs_6: FSharpList<T> = node;
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    xs_6.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function scan<State, T>(folder: ((arg0: State, arg1: T) => State), state: State, xs: FSharpList<T>): FSharpList<State> {
    let xs_4: FSharpList<State>, t_2: FSharpList<State>;
    const root: FSharpList<State> = FSharpList_get_Empty<State>();
    let node: FSharpList<State>;
    const t: FSharpList<State> = new FSharpList(state, undefined);
    root.tail = t;
    node = t;
    let acc: State = state;
    let xs_3: FSharpList<T> = xs;
    while (!FSharpList__get_IsEmpty<T>(xs_3)) {
        acc = folder(acc, FSharpList__get_Head<T>(xs_3));
        node = ((xs_4 = node, (t_2 = (new FSharpList(acc, undefined)), (xs_4.tail = t_2, t_2))));
        xs_3 = FSharpList__get_Tail<T>(xs_3);
    }
    const xs_6: FSharpList<State> = node;
    const t_4: FSharpList<State> = FSharpList_get_Empty<State>();
    xs_6.tail = t_4;
    return FSharpList__get_Tail<State>(root);
}

export function scanBack<T, State>(folder: ((arg0: T, arg1: State) => State), xs: FSharpList<T>, state: State): FSharpList<State> {
    return ofArray<State>(scanBack_1<T, State>(folder, toArray<T>(xs), state));
}

export function append<T>(xs: FSharpList<T>, ys: FSharpList<T>): FSharpList<T> {
    return fold<T, FSharpList<T>>((acc: FSharpList<T>, x: T): FSharpList<T> => FSharpList_Cons_305B8EAC<T>(x, acc), ys, reverse<T>(xs));
}

export function collect<T, U>(mapping: ((arg0: T) => FSharpList<U>), xs: FSharpList<T>): FSharpList<U> {
    let xs_1: FSharpList<U>, t: FSharpList<U>;
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    let node: FSharpList<U> = root;
    let ys: FSharpList<T> = xs;
    while (!FSharpList__get_IsEmpty<T>(ys)) {
        let zs: FSharpList<U> = mapping(FSharpList__get_Head<T>(ys));
        while (!FSharpList__get_IsEmpty<U>(zs)) {
            node = ((xs_1 = node, (t = (new FSharpList(FSharpList__get_Head<U>(zs), undefined)), (xs_1.tail = t, t))));
            zs = FSharpList__get_Tail<U>(zs);
        }
        ys = FSharpList__get_Tail<T>(ys);
    }
    const xs_3: FSharpList<U> = node;
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    xs_3.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function mapIndexed<T, U>(mapping: ((arg0: int32, arg1: T) => U), xs: FSharpList<T>): FSharpList<U> {
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    const node: FSharpList<U> = foldIndexed<FSharpList<U>, T>((i: int32, acc: FSharpList<U>, x: T): FSharpList<U> => {
        const t: FSharpList<U> = new FSharpList(mapping(i, x), undefined);
        acc.tail = t;
        return t;
    }, root, xs);
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    node.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function map<T, U>(mapping: ((arg0: T) => U), xs: FSharpList<T>): FSharpList<U> {
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    const node: FSharpList<U> = fold<T, FSharpList<U>>((acc: FSharpList<U>, x: T): FSharpList<U> => {
        const t: FSharpList<U> = new FSharpList(mapping(x), undefined);
        acc.tail = t;
        return t;
    }, root, xs);
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    node.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function indexed<$a>(xs: FSharpList<$a>): FSharpList<[int32, $a]> {
    return mapIndexed<$a, [int32, $a]>((i: int32, x: $a): [int32, $a] => ([i, x] as [int32, $a]), xs);
}

export function map2<T1, T2, U>(mapping: ((arg0: T1, arg1: T2) => U), xs: FSharpList<T1>, ys: FSharpList<T2>): FSharpList<U> {
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    const node: FSharpList<U> = fold2<T1, T2, FSharpList<U>>((acc: FSharpList<U>, x: T1, y: T2): FSharpList<U> => {
        const t: FSharpList<U> = new FSharpList(mapping(x, y), undefined);
        acc.tail = t;
        return t;
    }, root, xs, ys);
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    node.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function mapIndexed2<T1, T2, U>(mapping: ((arg0: int32, arg1: T1, arg2: T2) => U), xs: FSharpList<T1>, ys: FSharpList<T2>): FSharpList<U> {
    const loop = (i_mut: int32, acc_mut: FSharpList<U>, xs_1_mut: FSharpList<T1>, ys_1_mut: FSharpList<T2>): FSharpList<U> => {
        let t: FSharpList<U>;
        loop:
        while (true) {
            const i: int32 = i_mut, acc: FSharpList<U> = acc_mut, xs_1: FSharpList<T1> = xs_1_mut, ys_1: FSharpList<T2> = ys_1_mut;
            if (FSharpList__get_IsEmpty<T1>(xs_1) ? true : FSharpList__get_IsEmpty<T2>(ys_1)) {
                return acc;
            }
            else {
                i_mut = (i + 1);
                acc_mut = ((t = (new FSharpList(mapping(i, FSharpList__get_Head<T1>(xs_1), FSharpList__get_Head<T2>(ys_1)), undefined)), (acc.tail = t, t)));
                xs_1_mut = FSharpList__get_Tail<T1>(xs_1);
                ys_1_mut = FSharpList__get_Tail<T2>(ys_1);
                continue loop;
            }
            break;
        }
    };
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    const node_1: FSharpList<U> = loop(0, root, xs, ys);
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    node_1.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function map3<T1, T2, T3, U>(mapping: ((arg0: T1, arg1: T2, arg2: T3) => U), xs: FSharpList<T1>, ys: FSharpList<T2>, zs: FSharpList<T3>): FSharpList<U> {
    const loop = (acc_mut: FSharpList<U>, xs_1_mut: FSharpList<T1>, ys_1_mut: FSharpList<T2>, zs_1_mut: FSharpList<T3>): FSharpList<U> => {
        let t: FSharpList<U>;
        loop:
        while (true) {
            const acc: FSharpList<U> = acc_mut, xs_1: FSharpList<T1> = xs_1_mut, ys_1: FSharpList<T2> = ys_1_mut, zs_1: FSharpList<T3> = zs_1_mut;
            if ((FSharpList__get_IsEmpty<T1>(xs_1) ? true : FSharpList__get_IsEmpty<T2>(ys_1)) ? true : FSharpList__get_IsEmpty<T3>(zs_1)) {
                return acc;
            }
            else {
                acc_mut = ((t = (new FSharpList(mapping(FSharpList__get_Head<T1>(xs_1), FSharpList__get_Head<T2>(ys_1), FSharpList__get_Head<T3>(zs_1)), undefined)), (acc.tail = t, t)));
                xs_1_mut = FSharpList__get_Tail<T1>(xs_1);
                ys_1_mut = FSharpList__get_Tail<T2>(ys_1);
                zs_1_mut = FSharpList__get_Tail<T3>(zs_1);
                continue loop;
            }
            break;
        }
    };
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    const node_1: FSharpList<U> = loop(root, xs, ys, zs);
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    node_1.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function mapFold<State, T, Result>(mapping: ((arg0: State, arg1: T) => [Result, State]), state: State, xs: FSharpList<T>): [FSharpList<Result>, State] {
    const root: FSharpList<Result> = FSharpList_get_Empty<Result>();
    const patternInput_1: [FSharpList<Result>, State] = fold<T, [FSharpList<Result>, State]>((tupledArg: [FSharpList<Result>, State], x: T): [FSharpList<Result>, State] => {
        let t: FSharpList<Result>;
        const patternInput: [Result, State] = mapping(tupledArg[1], x);
        return [(t = (new FSharpList(patternInput[0], undefined)), (tupledArg[0].tail = t, t)), patternInput[1]] as [FSharpList<Result>, State];
    }, [root, state] as [FSharpList<Result>, State], xs);
    const t_2: FSharpList<Result> = FSharpList_get_Empty<Result>();
    patternInput_1[0].tail = t_2;
    return [FSharpList__get_Tail<Result>(root), patternInput_1[1]] as [FSharpList<Result>, State];
}

export function mapFoldBack<T, State, Result>(mapping: ((arg0: T, arg1: State) => [Result, State]), xs: FSharpList<T>, state: State): [FSharpList<Result>, State] {
    return mapFold<State, T, Result>((acc: State, x: T): [Result, State] => mapping(x, acc), state, reverse<T>(xs));
}

export function tryPick<T, $a>(f: ((arg0: T) => Option<$a>), xs: FSharpList<T>): Option<$a> {
    const loop = (xs_1_mut: FSharpList<T>): Option<$a> => {
        loop:
        while (true) {
            const xs_1: FSharpList<T> = xs_1_mut;
            if (FSharpList__get_IsEmpty<T>(xs_1)) {
                return undefined;
            }
            else {
                const matchValue: Option<$a> = f(FSharpList__get_Head<T>(xs_1));
                if (matchValue == null) {
                    xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                    continue loop;
                }
                else {
                    return matchValue;
                }
            }
            break;
        }
    };
    return loop(xs);
}

export function pick<$a, $b>(f: ((arg0: $a) => Option<$b>), xs: FSharpList<$a>): $b {
    const matchValue: Option<$b> = tryPick<$a, $b>(f, xs);
    if (matchValue == null) {
        return indexNotFound<$b>();
    }
    else {
        return value_1(matchValue);
    }
}

export function tryFind<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): Option<$a> {
    return tryPick<$a, $a>((x: $a): Option<$a> => (f(x) ? some(x) : undefined), xs);
}

export function find<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): $a {
    const matchValue: Option<$a> = tryFind<$a>(f, xs);
    if (matchValue == null) {
        return indexNotFound<$a>();
    }
    else {
        return value_1(matchValue);
    }
}

export function tryFindBack<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): Option<$a> {
    return tryFindBack_1<$a>(f, toArray<$a>(xs));
}

export function findBack<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): $a {
    const matchValue: Option<$a> = tryFindBack<$a>(f, xs);
    if (matchValue == null) {
        return indexNotFound<$a>();
    }
    else {
        return value_1(matchValue);
    }
}

export function tryFindIndex<T>(f: ((arg0: T) => boolean), xs: FSharpList<T>): Option<int32> {
    const loop = (i_mut: int32, xs_1_mut: FSharpList<T>): Option<int32> => {
        loop:
        while (true) {
            const i: int32 = i_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (FSharpList__get_IsEmpty<T>(xs_1)) {
                return undefined;
            }
            else if (f(FSharpList__get_Head<T>(xs_1))) {
                return i;
            }
            else {
                i_mut = (i + 1);
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    return loop(0, xs);
}

export function findIndex<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): int32 {
    const matchValue: Option<int32> = tryFindIndex<$a>(f, xs);
    if (matchValue == null) {
        indexNotFound<void>();
        return -1;
    }
    else {
        return value_1(matchValue) | 0;
    }
}

export function tryFindIndexBack<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): Option<int32> {
    return tryFindIndexBack_1<$a>(f, toArray<$a>(xs));
}

export function findIndexBack<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): int32 {
    const matchValue: Option<int32> = tryFindIndexBack<$a>(f, xs);
    if (matchValue == null) {
        indexNotFound<void>();
        return -1;
    }
    else {
        return value_1(matchValue) | 0;
    }
}

export function tryItem<T>(n: int32, xs: FSharpList<T>): Option<T> {
    const loop = (i_mut: int32, xs_1_mut: FSharpList<T>): Option<T> => {
        loop:
        while (true) {
            const i: int32 = i_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (FSharpList__get_IsEmpty<T>(xs_1)) {
                return undefined;
            }
            else if (i === n) {
                return some(FSharpList__get_Head<T>(xs_1));
            }
            else {
                i_mut = (i + 1);
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    return loop(0, xs);
}

export function item<T>(n: int32, xs: FSharpList<T>): T {
    return FSharpList__get_Item_Z524259A4<T>(xs, n);
}

export function filter<T>(f: ((arg0: T) => boolean), xs: FSharpList<T>): FSharpList<T> {
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    const node: FSharpList<T> = fold<T, FSharpList<T>>((acc: FSharpList<T>, x: T): FSharpList<T> => {
        if (f(x)) {
            const t: FSharpList<T> = new FSharpList(x, undefined);
            acc.tail = t;
            return t;
        }
        else {
            return acc;
        }
    }, root, xs);
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    node.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function partition<T>(f: ((arg0: T) => boolean), xs: FSharpList<T>): [FSharpList<T>, FSharpList<T>] {
    const matchValue: FSharpList<T> = FSharpList_get_Empty<T>();
    const root2: FSharpList<T> = FSharpList_get_Empty<T>();
    const root1: FSharpList<T> = matchValue;
    const patternInput_1: [FSharpList<T>, FSharpList<T>] = fold<T, [FSharpList<T>, FSharpList<T>]>((tupledArg: [FSharpList<T>, FSharpList<T>], x: T): [FSharpList<T>, FSharpList<T>] => {
        let t: FSharpList<T>, t_2: FSharpList<T>;
        const lacc: FSharpList<T> = tupledArg[0];
        const racc: FSharpList<T> = tupledArg[1];
        if (f(x)) {
            return [(t = (new FSharpList(x, undefined)), (lacc.tail = t, t)), racc] as [FSharpList<T>, FSharpList<T>];
        }
        else {
            return [lacc, (t_2 = (new FSharpList(x, undefined)), (racc.tail = t_2, t_2))] as [FSharpList<T>, FSharpList<T>];
        }
    }, [root1, root2] as [FSharpList<T>, FSharpList<T>], xs);
    const t_4: FSharpList<T> = FSharpList_get_Empty<T>();
    patternInput_1[0].tail = t_4;
    const t_5: FSharpList<T> = FSharpList_get_Empty<T>();
    patternInput_1[1].tail = t_5;
    return [FSharpList__get_Tail<T>(root1), FSharpList__get_Tail<T>(root2)] as [FSharpList<T>, FSharpList<T>];
}

export function choose<T, U>(f: ((arg0: T) => Option<U>), xs: FSharpList<T>): FSharpList<U> {
    const root: FSharpList<U> = FSharpList_get_Empty<U>();
    const node: FSharpList<U> = fold<T, FSharpList<U>>((acc: FSharpList<U>, x: T): FSharpList<U> => {
        const matchValue: Option<U> = f(x);
        if (matchValue == null) {
            return acc;
        }
        else {
            const t: FSharpList<U> = new FSharpList(value_1(matchValue), undefined);
            acc.tail = t;
            return t;
        }
    }, root, xs);
    const t_2: FSharpList<U> = FSharpList_get_Empty<U>();
    node.tail = t_2;
    return FSharpList__get_Tail<U>(root);
}

export function contains<T>(value: T, xs: FSharpList<T>, eq: IEqualityComparer<T>): boolean {
    return tryFindIndex<T>((v: T): boolean => eq.Equals(value, v), xs) != null;
}

export function initialize<T>(n: int32, f: ((arg0: int32) => T)): FSharpList<T> {
    let xs: FSharpList<T>, t: FSharpList<T>;
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    let node: FSharpList<T> = root;
    for (let i = 0; i <= (n - 1); i++) {
        node = ((xs = node, (t = (new FSharpList(f(i), undefined)), (xs.tail = t, t))));
    }
    const xs_2: FSharpList<T> = node;
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    xs_2.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function replicate<$a>(n: int32, x: $a): FSharpList<$a> {
    return initialize<$a>(n, (_arg: int32): $a => x);
}

export function reduce<T>(f: ((arg0: T, arg1: T) => T), xs: FSharpList<T>): T {
    if (FSharpList__get_IsEmpty<T>(xs)) {
        throw new Error(SR_inputWasEmpty);
    }
    else {
        return fold<T, T>(f, head<T>(xs), tail<T>(xs));
    }
}

export function reduceBack<T>(f: ((arg0: T, arg1: T) => T), xs: FSharpList<T>): T {
    if (FSharpList__get_IsEmpty<T>(xs)) {
        throw new Error(SR_inputWasEmpty);
    }
    else {
        return foldBack<T, T>(f, tail<T>(xs), head<T>(xs));
    }
}

export function forAll<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): boolean {
    return fold<$a, boolean>((acc: boolean, x: $a): boolean => (acc && f(x)), true, xs);
}

export function forAll2<$a, $b>(f: ((arg0: $a, arg1: $b) => boolean), xs: FSharpList<$a>, ys: FSharpList<$b>): boolean {
    return fold2<$a, $b, boolean>((acc: boolean, x: $a, y: $b): boolean => (acc && f(x, y)), true, xs, ys);
}

export function exists<$a>(f: ((arg0: $a) => boolean), xs: FSharpList<$a>): boolean {
    return tryFindIndex<$a>(f, xs) != null;
}

export function exists2<T1, T2>(f_mut: ((arg0: T1, arg1: T2) => boolean), xs_mut: FSharpList<T1>, ys_mut: FSharpList<T2>): boolean {
    exists2:
    while (true) {
        const f: ((arg0: T1, arg1: T2) => boolean) = f_mut, xs: FSharpList<T1> = xs_mut, ys: FSharpList<T2> = ys_mut;
        const matchValue: boolean = FSharpList__get_IsEmpty<T1>(xs);
        const matchValue_1: boolean = FSharpList__get_IsEmpty<T2>(ys);
        let matchResult: int32;
        if (matchValue) {
            if (matchValue_1) {
                matchResult = 0;
            }
            else {
                matchResult = 2;
            }
        }
        else if (matchValue_1) {
            matchResult = 2;
        }
        else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0:
                return false;
            case 1:
                if (f(FSharpList__get_Head<T1>(xs), FSharpList__get_Head<T2>(ys))) {
                    return true;
                }
                else {
                    f_mut = f;
                    xs_mut = FSharpList__get_Tail<T1>(xs);
                    ys_mut = FSharpList__get_Tail<T2>(ys);
                    continue exists2;
                }
            default:
                throw new Error((SR_differentLengths + "\\nParameter name: ") + "list2");
        }
        break;
    }
}

export function unzip<$a, $b>(xs: FSharpList<[$a, $b]>): [FSharpList<$a>, FSharpList<$b>] {
    return foldBack<[$a, $b], [FSharpList<$a>, FSharpList<$b>]>((tupledArg: [$a, $b], tupledArg_1: [FSharpList<$a>, FSharpList<$b>]): [FSharpList<$a>, FSharpList<$b>] => ([FSharpList_Cons_305B8EAC<$a>(tupledArg[0], tupledArg_1[0]), FSharpList_Cons_305B8EAC<$b>(tupledArg[1], tupledArg_1[1])] as [FSharpList<$a>, FSharpList<$b>]), xs, [FSharpList_get_Empty<$a>(), FSharpList_get_Empty<$b>()] as [FSharpList<$a>, FSharpList<$b>]);
}

export function unzip3<$a, $b, $c>(xs: FSharpList<[$a, $b, $c]>): [FSharpList<$a>, FSharpList<$b>, FSharpList<$c>] {
    return foldBack<[$a, $b, $c], [FSharpList<$a>, FSharpList<$b>, FSharpList<$c>]>((tupledArg: [$a, $b, $c], tupledArg_1: [FSharpList<$a>, FSharpList<$b>, FSharpList<$c>]): [FSharpList<$a>, FSharpList<$b>, FSharpList<$c>] => ([FSharpList_Cons_305B8EAC<$a>(tupledArg[0], tupledArg_1[0]), FSharpList_Cons_305B8EAC<$b>(tupledArg[1], tupledArg_1[1]), FSharpList_Cons_305B8EAC<$c>(tupledArg[2], tupledArg_1[2])] as [FSharpList<$a>, FSharpList<$b>, FSharpList<$c>]), xs, [FSharpList_get_Empty<$a>(), FSharpList_get_Empty<$b>(), FSharpList_get_Empty<$c>()] as [FSharpList<$a>, FSharpList<$b>, FSharpList<$c>]);
}

export function zip<$a, $b>(xs: FSharpList<$a>, ys: FSharpList<$b>): FSharpList<[$a, $b]> {
    return map2<$a, $b, [$a, $b]>((x: $a, y: $b): [$a, $b] => ([x, y] as [$a, $b]), xs, ys);
}

export function zip3<$a, $b, $c>(xs: FSharpList<$a>, ys: FSharpList<$b>, zs: FSharpList<$c>): FSharpList<[$a, $b, $c]> {
    return map3<$a, $b, $c, [$a, $b, $c]>((x: $a, y: $b, z: $c): [$a, $b, $c] => ([x, y, z] as [$a, $b, $c]), xs, ys, zs);
}

export function sortWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: FSharpList<T>): FSharpList<T> {
    const arr: T[] = toArray<T>(xs);
    arr.sort(comparer);
    return ofArray<T>(arr);
}

export function sort<T>(xs: FSharpList<T>, comparer: IComparer<T>): FSharpList<T> {
    return sortWith<T>((x: T, y: T): int32 => comparer.Compare(x, y), xs);
}

export function sortBy<T, U>(projection: ((arg0: T) => U), xs: FSharpList<T>, comparer: IComparer<U>): FSharpList<T> {
    return sortWith<T>((x: T, y: T): int32 => comparer.Compare(projection(x), projection(y)), xs);
}

export function sortDescending<T>(xs: FSharpList<T>, comparer: IComparer<T>): FSharpList<T> {
    return sortWith<T>((x: T, y: T): int32 => (comparer.Compare(x, y) * -1), xs);
}

export function sortByDescending<T, U>(projection: ((arg0: T) => U), xs: FSharpList<T>, comparer: IComparer<U>): FSharpList<T> {
    return sortWith<T>((x: T, y: T): int32 => (comparer.Compare(projection(x), projection(y)) * -1), xs);
}

export function sum<T>(xs: FSharpList<T>, adder: any): T {
    return fold<T, T>((acc: T, x: T): T => adder.Add(acc, x), adder.GetZero(), xs);
}

export function sumBy<T, U>(f: ((arg0: T) => U), xs: FSharpList<T>, adder: any): U {
    return fold<T, U>((acc: U, x: T): U => adder.Add(acc, f(x)), adder.GetZero(), xs);
}

export function maxBy<T, U>(projection: ((arg0: T) => U), xs: FSharpList<T>, comparer: IComparer<U>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(projection(y), projection(x)) > 0) ? y : x), xs);
}

export function max<T>(xs: FSharpList<T>, comparer: IComparer<T>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(y, x) > 0) ? y : x), xs);
}

export function minBy<T, U>(projection: ((arg0: T) => U), xs: FSharpList<T>, comparer: IComparer<U>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(projection(y), projection(x)) > 0) ? x : y), xs);
}

export function min<T>(xs: FSharpList<T>, comparer: IComparer<T>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(y, x) > 0) ? x : y), xs);
}

export function average<T>(xs: FSharpList<T>, averager: any): T {
    let count = 0;
    const total: T = fold<T, T>((acc: T, x: T): T => {
        count = ((count + 1) | 0);
        return averager.Add(acc, x);
    }, averager.GetZero(), xs);
    return averager.DivideByInt(total, count);
}

export function averageBy<T, U>(f: ((arg0: T) => U), xs: FSharpList<T>, averager: any): U {
    let count = 0;
    const total: U = fold<T, U>((acc: U, x: T): U => {
        count = ((count + 1) | 0);
        return averager.Add(acc, f(x));
    }, averager.GetZero(), xs);
    return averager.DivideByInt(total, count);
}

export function permute<T>(f: ((arg0: int32) => int32), xs: FSharpList<T>): FSharpList<T> {
    return ofArray<T>(permute_1<T>(f, toArray<T>(xs)));
}

export function chunkBySize<T>(chunkSize: int32, xs: FSharpList<T>): FSharpList<FSharpList<T>> {
    return ofArray<FSharpList<T>>(map_1<T[], FSharpList<T>>(ofArray, chunkBySize_1<T>(chunkSize, toArray<T>(xs))));
}

export function allPairs<T1, T2>(xs: FSharpList<T1>, ys: FSharpList<T2>): FSharpList<[T1, T2]> {
    const root: FSharpList<[T1, T2]> = FSharpList_get_Empty<[T1, T2]>();
    let node: FSharpList<[T1, T2]> = root;
    iterate<T1>((x: T1): void => {
        iterate<T2>((y: T2): void => {
            let xs_1: FSharpList<[T1, T2]>, t: FSharpList<[T1, T2]>;
            node = ((xs_1 = node, (t = (new FSharpList([x, y] as [T1, T2], undefined)), (xs_1.tail = t, t))));
        }, ys);
    }, xs);
    const xs_3: FSharpList<[T1, T2]> = node;
    const t_2: FSharpList<[T1, T2]> = FSharpList_get_Empty<[T1, T2]>();
    xs_3.tail = t_2;
    return FSharpList__get_Tail<[T1, T2]>(root);
}

export function skip<T>(count_mut: int32, xs_mut: FSharpList<T>): FSharpList<T> {
    skip:
    while (true) {
        const count: int32 = count_mut, xs: FSharpList<T> = xs_mut;
        if (count <= 0) {
            return xs;
        }
        else if (FSharpList__get_IsEmpty<T>(xs)) {
            throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "list");
        }
        else {
            count_mut = (count - 1);
            xs_mut = FSharpList__get_Tail<T>(xs);
            continue skip;
        }
        break;
    }
}

export function skipWhile<T>(predicate_mut: ((arg0: T) => boolean), xs_mut: FSharpList<T>): FSharpList<T> {
    skipWhile:
    while (true) {
        const predicate: ((arg0: T) => boolean) = predicate_mut, xs: FSharpList<T> = xs_mut;
        if (FSharpList__get_IsEmpty<T>(xs)) {
            return xs;
        }
        else if (!predicate(FSharpList__get_Head<T>(xs))) {
            return xs;
        }
        else {
            predicate_mut = predicate;
            xs_mut = FSharpList__get_Tail<T>(xs);
            continue skipWhile;
        }
        break;
    }
}

export function take<T>(count: int32, xs: FSharpList<T>): FSharpList<T> {
    if (count < 0) {
        throw new Error((SR_inputMustBeNonNegative + "\\nParameter name: ") + "count");
    }
    const loop = (i_mut: int32, acc_mut: FSharpList<T>, xs_1_mut: FSharpList<T>): FSharpList<T> => {
        let t: FSharpList<T>;
        loop:
        while (true) {
            const i: int32 = i_mut, acc: FSharpList<T> = acc_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (i <= 0) {
                return acc;
            }
            else if (FSharpList__get_IsEmpty<T>(xs_1)) {
                throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "list");
            }
            else {
                i_mut = (i - 1);
                acc_mut = ((t = (new FSharpList(FSharpList__get_Head<T>(xs_1), undefined)), (acc.tail = t, t)));
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    const node: FSharpList<T> = loop(count, root, xs);
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    node.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function takeWhile<T>(predicate: ((arg0: T) => boolean), xs: FSharpList<T>): FSharpList<T> {
    const loop = (acc_mut: FSharpList<T>, xs_1_mut: FSharpList<T>): FSharpList<T> => {
        let t: FSharpList<T>;
        loop:
        while (true) {
            const acc: FSharpList<T> = acc_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (FSharpList__get_IsEmpty<T>(xs_1)) {
                return acc;
            }
            else if (!predicate(FSharpList__get_Head<T>(xs_1))) {
                return acc;
            }
            else {
                acc_mut = ((t = (new FSharpList(FSharpList__get_Head<T>(xs_1), undefined)), (acc.tail = t, t)));
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    const node: FSharpList<T> = loop(root, xs);
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    node.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function truncate<T>(count: int32, xs: FSharpList<T>): FSharpList<T> {
    const loop = (i_mut: int32, acc_mut: FSharpList<T>, xs_1_mut: FSharpList<T>): FSharpList<T> => {
        let t: FSharpList<T>;
        loop:
        while (true) {
            const i: int32 = i_mut, acc: FSharpList<T> = acc_mut, xs_1: FSharpList<T> = xs_1_mut;
            if (i <= 0) {
                return acc;
            }
            else if (FSharpList__get_IsEmpty<T>(xs_1)) {
                return acc;
            }
            else {
                i_mut = (i - 1);
                acc_mut = ((t = (new FSharpList(FSharpList__get_Head<T>(xs_1), undefined)), (acc.tail = t, t)));
                xs_1_mut = FSharpList__get_Tail<T>(xs_1);
                continue loop;
            }
            break;
        }
    };
    const root: FSharpList<T> = FSharpList_get_Empty<T>();
    const node: FSharpList<T> = loop(count, root, xs);
    const t_2: FSharpList<T> = FSharpList_get_Empty<T>();
    node.tail = t_2;
    return FSharpList__get_Tail<T>(root);
}

export function getSlice<T>(startIndex: Option<int32>, endIndex: Option<int32>, xs: FSharpList<T>): FSharpList<T> {
    const len: int32 = length<T>(xs) | 0;
    let startIndex_1: int32;
    const index: int32 = defaultArg<int32>(startIndex, 0) | 0;
    startIndex_1 = ((index < 0) ? 0 : index);
    let endIndex_1: int32;
    const index_1: int32 = defaultArg<int32>(endIndex, len - 1) | 0;
    endIndex_1 = ((index_1 >= len) ? (len - 1) : index_1);
    if (endIndex_1 < startIndex_1) {
        return FSharpList_get_Empty<T>();
    }
    else {
        return take<T>((endIndex_1 - startIndex_1) + 1, skip<T>(startIndex_1, xs));
    }
}

export function splitAt<T>(index: int32, xs: FSharpList<T>): [FSharpList<T>, FSharpList<T>] {
    if (index < 0) {
        throw new Error((SR_inputMustBeNonNegative + "\\nParameter name: ") + "index");
    }
    if (index > FSharpList__get_Length<T>(xs)) {
        throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "index");
    }
    return [take<T>(index, xs), skip<T>(index, xs)] as [FSharpList<T>, FSharpList<T>];
}

export function exactlyOne<T>(xs: FSharpList<T>): T {
    if (FSharpList__get_IsEmpty<T>(xs)) {
        throw new Error((SR_inputSequenceEmpty + "\\nParameter name: ") + "list");
    }
    else if (FSharpList__get_IsEmpty<T>(FSharpList__get_Tail<T>(xs))) {
        return FSharpList__get_Head<T>(xs);
    }
    else {
        throw new Error((SR_inputSequenceTooLong + "\\nParameter name: ") + "list");
    }
}

export function tryExactlyOne<T>(xs: FSharpList<T>): Option<T> {
    if (!FSharpList__get_IsEmpty<T>(xs) && FSharpList__get_IsEmpty<T>(FSharpList__get_Tail<T>(xs))) {
        return some(FSharpList__get_Head<T>(xs));
    }
    else {
        return undefined;
    }
}

export function where<T>(predicate: ((arg0: T) => boolean), xs: FSharpList<T>): FSharpList<T> {
    return filter<T>(predicate, xs);
}

export function pairwise<T>(xs: FSharpList<T>): FSharpList<[T, T]> {
    return ofArray<[T, T]>(pairwise_1<T>(toArray<T>(xs)));
}

export function windowed<T>(windowSize: int32, xs: FSharpList<T>): FSharpList<FSharpList<T>> {
    return ofArray<FSharpList<T>>(map_1<T[], FSharpList<T>>(ofArray, windowed_1<T>(windowSize, toArray<T>(xs))));
}

export function splitInto<T>(chunks: int32, xs: FSharpList<T>): FSharpList<FSharpList<T>> {
    return ofArray<FSharpList<T>>(map_1<T[], FSharpList<T>>(ofArray, splitInto_1<T>(chunks, toArray<T>(xs))));
}

export function transpose<T>(lists: Iterable<FSharpList<T>>): FSharpList<FSharpList<T>> {
    return ofArray<FSharpList<T>>(map_1<T[], FSharpList<T>>(ofArray, transpose_1<T>(map_1<FSharpList<T>, T[]>(toArray, Array.from(lists)))));
}

export function insertAt<T>(index: int32, y: T, xs: FSharpList<T>): FSharpList<T> {
    let i = -1;
    let isDone = false;
    const result: FSharpList<T> = fold<T, FSharpList<T>>((acc: FSharpList<T>, x: T): FSharpList<T> => {
        i = ((i + 1) | 0);
        if (i === index) {
            isDone = true;
            return FSharpList_Cons_305B8EAC<T>(x, FSharpList_Cons_305B8EAC<T>(y, acc));
        }
        else {
            return FSharpList_Cons_305B8EAC<T>(x, acc);
        }
    }, FSharpList_get_Empty<T>(), xs);
    return reverse<T>(isDone ? result : (((i + 1) === index) ? FSharpList_Cons_305B8EAC<T>(y, result) : (() => {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    })()));
}

export function insertManyAt<T>(index: int32, ys: Iterable<T>, xs: FSharpList<T>): FSharpList<T> {
    let i = -1;
    let isDone = false;
    const ys_1: FSharpList<T> = ofSeq<T>(ys);
    const result: FSharpList<T> = fold<T, FSharpList<T>>((acc: FSharpList<T>, x: T): FSharpList<T> => {
        i = ((i + 1) | 0);
        if (i === index) {
            isDone = true;
            return FSharpList_Cons_305B8EAC<T>(x, append<T>(ys_1, acc));
        }
        else {
            return FSharpList_Cons_305B8EAC<T>(x, acc);
        }
    }, FSharpList_get_Empty<T>(), xs);
    return reverse<T>(isDone ? result : (((i + 1) === index) ? append<T>(ys_1, result) : (() => {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    })()));
}

export function removeAt<T>(index: int32, xs: FSharpList<T>): FSharpList<T> {
    let i = -1;
    let isDone = false;
    const ys: FSharpList<T> = filter<T>((_arg: T): boolean => {
        i = ((i + 1) | 0);
        if (i === index) {
            isDone = true;
            return false;
        }
        else {
            return true;
        }
    }, xs);
    if (!isDone) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return ys;
}

export function removeManyAt<T>(index: int32, count: int32, xs: FSharpList<T>): FSharpList<T> {
    let i = -1;
    let status = -1;
    const ys: FSharpList<T> = filter<T>((_arg: T): boolean => {
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

export function updateAt<T>(index: int32, y: T, xs: FSharpList<T>): FSharpList<T> {
    let isDone = false;
    const ys: FSharpList<T> = mapIndexed<T, T>((i: int32, x: T): T => {
        if (i === index) {
            isDone = true;
            return y;
        }
        else {
            return x;
        }
    }, xs);
    if (!isDone) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return ys;
}

