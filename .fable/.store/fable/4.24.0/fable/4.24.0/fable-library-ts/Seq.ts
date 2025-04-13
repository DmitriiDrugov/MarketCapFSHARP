import { IComparer, clear, defaultOf, equals, isDisposable, IEqualityComparer, isArrayLike, toIterator, IDisposable, disposeSafe, IEnumerator, getEnumerator } from "./Util.js";
import { toString } from "./Types.js";
import { class_type, TypeInfo } from "./Reflection.js";
import { some, value as value_1, Option } from "./Option.js";
import { Operators_Lock, Operators_NullArg } from "./FSharp.Core.js";
import { chunkBySize as chunkBySize_1, permute as permute_1, transpose as transpose_1, map as map_1, windowed as windowed_1, splitInto as splitInto_1, pairwise as pairwise_1, scanBack as scanBack_1, reverse as reverse_1, mapFoldBack as mapFoldBack_1, mapFold as mapFold_1, tryItem as tryItem_1, tryHead as tryHead_1, foldBack2 as foldBack2_1, foldBack as foldBack_1, tryFindIndexBack as tryFindIndexBack_1, tryFindBack as tryFindBack_1, singleton as singleton_1 } from "./Array.js";
import { length as length_1, tryItem as tryItem_2, isEmpty as isEmpty_1, tryHead as tryHead_2, ofSeq as ofSeq_1, ofArray as ofArray_1, toArray as toArray_1, FSharpList } from "./List.js";
import { int32 } from "./Int32.js";
import { SR_indexOutOfBounds } from "./Global.js";

export const SR_enumerationAlreadyFinished = "Enumeration already finished.";

export const SR_enumerationNotStarted = "Enumeration has not started. Call MoveNext.";

export const SR_inputSequenceEmpty = "The input sequence was empty.";

export const SR_inputSequenceTooLong = "The input sequence contains more than one element.";

export const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";

export const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";

export const SR_resetNotSupported = "Reset is not supported on this enumerator.";

export function Enumerator_noReset<$a>(): $a {
    throw new Error(SR_resetNotSupported);
}

export function Enumerator_notStarted<$a>(): $a {
    throw new Error(SR_enumerationNotStarted);
}

export function Enumerator_alreadyFinished<$a>(): $a {
    throw new Error(SR_enumerationAlreadyFinished);
}

export class Enumerator_Seq<T> implements Iterable<T> {
    readonly f: (() => IEnumerator<T>);
    constructor(f: (() => IEnumerator<T>)) {
        this.f = f;
    }
    toString(): string {
        const xs: Enumerator_Seq<T> = this;
        let i = 0;
        let str = "seq [";
        const e: IEnumerator<T> = getEnumerator(xs);
        try {
            while ((i < 4) && e["System.Collections.IEnumerator.MoveNext"]()) {
                if (i > 0) {
                    str = (str + "; ");
                }
                str = (str + toString(e["System.Collections.Generic.IEnumerator`1.get_Current"]()));
                i = ((i + 1) | 0);
            }
            if (i === 4) {
                str = (str + "; ...");
            }
            return str + "]";
        }
        finally {
            disposeSafe(e as IDisposable);
        }
    }
    GetEnumerator(): IEnumerator<T> {
        const x: Enumerator_Seq<T> = this;
        return x.f();
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const x: Enumerator_Seq<T> = this;
        return x.f();
    }
}

export function Enumerator_Seq_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("SeqModule.Enumerator.Seq", [gen0], Enumerator_Seq);
}

export function Enumerator_Seq_$ctor_673A07F2<T>(f: (() => IEnumerator<T>)): Enumerator_Seq<T> {
    return new Enumerator_Seq(f);
}

export class Enumerator_FromFunctions$1<T> implements IEnumerator<T>, IDisposable {
    readonly next: (() => boolean);
    readonly dispose: (() => void);
    readonly current: (() => T);
    constructor(current: (() => T), next: (() => boolean), dispose: (() => void)) {
        this.current = current;
        this.next = next;
        this.dispose = dispose;
    }
    "System.Collections.Generic.IEnumerator`1.get_Current"(): T {
        const _: Enumerator_FromFunctions$1<T> = this;
        return _.current();
    }
    "System.Collections.IEnumerator.get_Current"(): any {
        const _: Enumerator_FromFunctions$1<T> = this;
        return _.current();
    }
    "System.Collections.IEnumerator.MoveNext"(): boolean {
        const _: Enumerator_FromFunctions$1<T> = this;
        return _.next();
    }
    "System.Collections.IEnumerator.Reset"(): void {
        Enumerator_noReset<void>();
    }
    Dispose(): void {
        const _: Enumerator_FromFunctions$1<T> = this;
        _.dispose();
    }
}

export function Enumerator_FromFunctions$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("SeqModule.Enumerator.FromFunctions`1", [gen0], Enumerator_FromFunctions$1);
}

export function Enumerator_FromFunctions$1_$ctor_58C54629<T>(current: (() => T), next: (() => boolean), dispose: (() => void)): Enumerator_FromFunctions$1<T> {
    return new Enumerator_FromFunctions$1(current, next, dispose);
}

export function Enumerator_cast<T>(e: IEnumerator<T>): IEnumerator<T> {
    return Enumerator_FromFunctions$1_$ctor_58C54629<T>((): T => e["System.Collections.Generic.IEnumerator`1.get_Current"](), (): boolean => e["System.Collections.IEnumerator.MoveNext"](), (): void => {
        disposeSafe(e);
    });
}

export function Enumerator_concat<T, U extends Iterable<T>>(sources: Iterable<U>): IEnumerator<T> {
    let outerOpt: Option<IEnumerator<U>> = undefined;
    let innerOpt: Option<IEnumerator<T>> = undefined;
    let started = false;
    let finished = false;
    let curr: Option<T> = undefined;
    const finish = (): void => {
        finished = true;
        if (innerOpt != null) {
            const inner: IEnumerator<T> = value_1(innerOpt);
            try {
                disposeSafe(inner);
            }
            finally {
                innerOpt = undefined;
            }
        }
        if (outerOpt != null) {
            const outer: IEnumerator<U> = value_1(outerOpt);
            try {
                disposeSafe(outer);
            }
            finally {
                outerOpt = undefined;
            }
        }
    };
    return Enumerator_FromFunctions$1_$ctor_58C54629<T>((): T => {
        if (!started) {
            Enumerator_notStarted<void>();
        }
        else if (finished) {
            Enumerator_alreadyFinished<void>();
        }
        if (curr != null) {
            return value_1(curr);
        }
        else {
            return Enumerator_alreadyFinished<T>();
        }
    }, (): boolean => {
        let copyOfStruct: U;
        if (!started) {
            started = true;
        }
        if (finished) {
            return false;
        }
        else {
            let res: Option<boolean> = undefined;
            while (res == null) {
                const outerOpt_1: Option<IEnumerator<U>> = outerOpt;
                const innerOpt_1: Option<IEnumerator<T>> = innerOpt;
                if (outerOpt_1 != null) {
                    if (innerOpt_1 != null) {
                        const inner_1: IEnumerator<T> = value_1(innerOpt_1);
                        if (inner_1["System.Collections.IEnumerator.MoveNext"]()) {
                            curr = some(inner_1["System.Collections.Generic.IEnumerator`1.get_Current"]());
                            res = true;
                        }
                        else {
                            try {
                                disposeSafe(inner_1);
                            }
                            finally {
                                innerOpt = undefined;
                            }
                        }
                    }
                    else {
                        const outer_1: IEnumerator<U> = value_1(outerOpt_1);
                        if (outer_1["System.Collections.IEnumerator.MoveNext"]()) {
                            const ie: U = outer_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                            innerOpt = ((copyOfStruct = ie, getEnumerator(copyOfStruct)));
                        }
                        else {
                            finish();
                            res = false;
                        }
                    }
                }
                else {
                    outerOpt = getEnumerator(sources);
                }
            }
            return value_1(res);
        }
    }, (): void => {
        if (!finished) {
            finish();
        }
    });
}

export function Enumerator_enumerateThenFinally<T>(f: (() => void), e: IEnumerator<T>): IEnumerator<T> {
    return Enumerator_FromFunctions$1_$ctor_58C54629<T>((): T => e["System.Collections.Generic.IEnumerator`1.get_Current"](), (): boolean => e["System.Collections.IEnumerator.MoveNext"](), (): void => {
        try {
            disposeSafe(e);
        }
        finally {
            f();
        }
    });
}

export function Enumerator_generateWhileSome<T, U>(openf: (() => T), compute: ((arg0: T) => Option<U>), closef: ((arg0: T) => void)): IEnumerator<U> {
    let started = false;
    let curr: Option<U> = undefined;
    let state: Option<T> = some(openf());
    const dispose = (): void => {
        if (state != null) {
            const x_1: T = value_1(state);
            try {
                closef(x_1);
            }
            finally {
                state = undefined;
            }
        }
    };
    const finish = (): void => {
        try {
            dispose();
        }
        finally {
            curr = undefined;
        }
    };
    return Enumerator_FromFunctions$1_$ctor_58C54629<U>((): U => {
        if (!started) {
            Enumerator_notStarted<void>();
        }
        if (curr != null) {
            return value_1(curr);
        }
        else {
            return Enumerator_alreadyFinished<U>();
        }
    }, (): boolean => {
        if (!started) {
            started = true;
        }
        if (state != null) {
            const s: T = value_1(state);
            let matchValue_1: Option<U>;
            try {
                matchValue_1 = compute(s);
            }
            catch (matchValue: any) {
                finish();
                throw matchValue;
            }
            if (matchValue_1 != null) {
                curr = matchValue_1;
                return true;
            }
            else {
                finish();
                return false;
            }
        }
        else {
            return false;
        }
    }, dispose);
}

export function Enumerator_unfold<State, T>(f: ((arg0: State) => Option<[T, State]>), state: State): IEnumerator<T> {
    let curr: Option<[T, State]> = undefined;
    let acc: State = state;
    return Enumerator_FromFunctions$1_$ctor_58C54629<T>((): T => {
        if (curr != null) {
            const x: T = value_1(curr)[0];
            const st: State = value_1(curr)[1];
            return x;
        }
        else {
            return Enumerator_notStarted<T>();
        }
    }, (): boolean => {
        curr = f(acc);
        if (curr != null) {
            const x_1: T = value_1(curr)[0];
            const st_1: State = value_1(curr)[1];
            acc = st_1;
            return true;
        }
        else {
            return false;
        }
    }, (): void => {
    });
}

export function indexNotFound<$a>(): $a {
    throw new Error(SR_keyNotFoundAlt);
}

export function checkNonNull<$a>(argName: string, arg: $a): void {
    if (arg == null) {
        Operators_NullArg<void>(argName);
    }
}

export function mkSeq<T>(f: (() => IEnumerator<T>)): Iterable<T> {
    return Enumerator_Seq_$ctor_673A07F2<T>(f);
}

export function ofSeq<T>(xs: Iterable<T>): IEnumerator<T> {
    checkNonNull<Iterable<T>>("source", xs);
    return getEnumerator(xs);
}

export function delay<T>(generator: (() => Iterable<T>)): Iterable<T> {
    return mkSeq<T>((): IEnumerator<T> => getEnumerator(generator()));
}

export function concat<Collection extends Iterable<T>, T>(sources: Iterable<Collection>): Iterable<T> {
    return mkSeq<T>((): IEnumerator<T> => Enumerator_concat<T, Collection>(sources));
}

export function unfold<State, T>(generator: ((arg0: State) => Option<[T, State]>), state: State): Iterable<T> {
    return mkSeq<T>((): IEnumerator<T> => Enumerator_unfold<State, T>(generator, state));
}

export function empty<T>(): Iterable<T> {
    return delay<T>((): Iterable<T> => (new Array(0)));
}

export function singleton<T>(x: T): Iterable<T> {
    return delay<T>((): Iterable<T> => singleton_1<T>(x));
}

export function ofArray<T>(arr: T[]): Iterable<T> {
    return arr;
}

export function toArray<T>(xs: Iterable<T>): T[] {
    if (xs instanceof FSharpList) {
        const a = xs as FSharpList<T>;
        return toArray_1<T>(a);
    }
    else {
        return Array.from(xs);
    }
}

export function ofList<T>(xs: FSharpList<T>): Iterable<T> {
    return xs;
}

export function toList<T>(xs: Iterable<T>): FSharpList<T> {
    if (isArrayLike(xs)) {
        return ofArray_1<T>(xs);
    }
    else if (xs instanceof FSharpList) {
        return xs;
    }
    else {
        return ofSeq_1<T>(xs);
    }
}

export function generate<$a, $b>(create: (() => $a), compute: ((arg0: $a) => Option<$b>), dispose: ((arg0: $a) => void)): Iterable<$b> {
    return mkSeq<$b>((): IEnumerator<$b> => Enumerator_generateWhileSome<$a, $b>(create, compute, dispose));
}

export function generateIndexed<$a, $b>(create: (() => $a), compute: ((arg0: int32, arg1: $a) => Option<$b>), dispose: ((arg0: $a) => void)): Iterable<$b> {
    return mkSeq<$b>((): IEnumerator<$b> => {
        let i = -1;
        return Enumerator_generateWhileSome<$a, $b>(create, (x: $a): Option<$b> => {
            i = ((i + 1) | 0);
            return compute(i, x);
        }, dispose);
    });
}

export function append<T>(xs: Iterable<T>, ys: Iterable<T>): Iterable<T> {
    return concat<Iterable<T>, T>([xs, ys]);
}

export function cast<T>(xs: Iterable<T>): Iterable<T> {
    return mkSeq<T>((): IEnumerator<T> => {
        checkNonNull<Iterable<T>>("source", xs);
        return Enumerator_cast<T>(getEnumerator(xs));
    });
}

export function choose<T, U>(chooser: ((arg0: T) => Option<U>), xs: Iterable<T>): Iterable<U> {
    return generate<IEnumerator<T>, U>((): IEnumerator<T> => ofSeq<T>(xs), (e: IEnumerator<T>): Option<U> => {
        let curr: Option<U> = undefined;
        while ((curr == null) && e["System.Collections.IEnumerator.MoveNext"]()) {
            curr = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        return curr;
    }, (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function compareWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: Iterable<T>, ys: Iterable<T>): int32 {
    const e1: IEnumerator<T> = ofSeq<T>(xs);
    try {
        const e2: IEnumerator<T> = ofSeq<T>(ys);
        try {
            let c = 0;
            let b1: boolean = e1["System.Collections.IEnumerator.MoveNext"]();
            let b2: boolean = e2["System.Collections.IEnumerator.MoveNext"]();
            while (((c === 0) && b1) && b2) {
                c = (comparer(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]()) | 0);
                if (c === 0) {
                    b1 = e1["System.Collections.IEnumerator.MoveNext"]();
                    b2 = e2["System.Collections.IEnumerator.MoveNext"]();
                }
            }
            return ((c !== 0) ? c : (b1 ? 1 : (b2 ? -1 : 0))) | 0;
        }
        finally {
            disposeSafe(e2 as IDisposable);
        }
    }
    finally {
        disposeSafe(e1 as IDisposable);
    }
}

export function contains<T>(value: T, xs: Iterable<T>, comparer: IEqualityComparer<T>): boolean {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        let found = false;
        while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
            found = comparer.Equals(value, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        return found;
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function enumerateFromFunctions<$a, $b>(create: (() => $a), moveNext: ((arg0: $a) => boolean), current: ((arg0: $a) => $b)): Iterable<$b> {
    return generate<$a, $b>(create, (x: $a): Option<$b> => (moveNext(x) ? some(current(x)) : undefined), (x_1: $a): void => {
        const matchValue: any = x_1;
        if (isDisposable(matchValue)) {
            const id = matchValue as IDisposable;
            disposeSafe(id);
        }
    });
}

export function enumerateThenFinally<T>(source: Iterable<T>, compensation: (() => void)): Iterable<T> {
    const compensation_1: (() => void) = compensation;
    return mkSeq<T>((): IEnumerator<T> => {
        try {
            return Enumerator_enumerateThenFinally<T>(compensation_1, ofSeq<T>(source));
        }
        catch (matchValue: any) {
            compensation_1();
            throw matchValue;
        }
    });
}

export function enumerateUsing<T extends IDisposable, $a extends Iterable<U>, U>(resource: T, source: ((arg0: T) => $a)): Iterable<U> {
    const compensation = (): void => {
        if (equals(resource, defaultOf())) {
        }
        else {
            let copyOfStruct: T = resource;
            disposeSafe(copyOfStruct);
        }
    };
    return mkSeq<U>((): IEnumerator<U> => {
        try {
            return Enumerator_enumerateThenFinally<U>(compensation, ofSeq<U>(source(resource)));
        }
        catch (matchValue_1: any) {
            compensation();
            throw matchValue_1;
        }
    });
}

export function enumerateWhile<T>(guard: (() => boolean), xs: Iterable<T>): Iterable<T> {
    return concat<Iterable<T>, T>(unfold<int32, Iterable<T>>((i: int32): Option<[Iterable<T>, int32]> => (guard() ? ([xs, i + 1] as [Iterable<T>, int32]) : undefined), 0));
}

export function filter<T>(f: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T> {
    return choose<T, T>((x: T): Option<T> => {
        if (f(x)) {
            return some(x);
        }
        else {
            return undefined;
        }
    }, xs);
}

export function exists<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): boolean {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        let found = false;
        while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
            found = predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        return found;
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function exists2<T1, T2>(predicate: ((arg0: T1, arg1: T2) => boolean), xs: Iterable<T1>, ys: Iterable<T2>): boolean {
    const e1: IEnumerator<T1> = ofSeq<T1>(xs);
    try {
        const e2: IEnumerator<T2> = ofSeq<T2>(ys);
        try {
            let found = false;
            while ((!found && e1["System.Collections.IEnumerator.MoveNext"]()) && e2["System.Collections.IEnumerator.MoveNext"]()) {
                found = predicate(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
            return found;
        }
        finally {
            disposeSafe(e2 as IDisposable);
        }
    }
    finally {
        disposeSafe(e1 as IDisposable);
    }
}

export function exactlyOne<T>(xs: Iterable<T>): T {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
            const v: T = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
            if (e["System.Collections.IEnumerator.MoveNext"]()) {
                throw new Error((SR_inputSequenceTooLong + "\\nParameter name: ") + "source");
            }
            else {
                return v;
            }
        }
        else {
            throw new Error((SR_inputSequenceEmpty + "\\nParameter name: ") + "source");
        }
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function tryExactlyOne<T>(xs: Iterable<T>): Option<T> {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
            const v: T = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
            return e["System.Collections.IEnumerator.MoveNext"]() ? undefined : some(v);
        }
        else {
            return undefined;
        }
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function tryFind<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<T> {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        let res: Option<T> = undefined;
        while ((res == null) && e["System.Collections.IEnumerator.MoveNext"]()) {
            const c: T = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
            if (predicate(c)) {
                res = some(c);
            }
        }
        return res;
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function find<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): T {
    const matchValue: Option<T> = tryFind<T>(predicate, xs);
    if (matchValue == null) {
        return indexNotFound<T>();
    }
    else {
        return value_1(matchValue);
    }
}

export function tryFindBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<T> {
    return tryFindBack_1<T>(predicate, toArray<T>(xs));
}

export function findBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): T {
    const matchValue: Option<T> = tryFindBack<T>(predicate, xs);
    if (matchValue == null) {
        return indexNotFound<T>();
    }
    else {
        return value_1(matchValue);
    }
}

export function tryFindIndex<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<int32> {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        const loop = (i_mut: int32): Option<int32> => {
            loop:
            while (true) {
                const i: int32 = i_mut;
                if (e["System.Collections.IEnumerator.MoveNext"]()) {
                    if (predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) {
                        return i;
                    }
                    else {
                        i_mut = (i + 1);
                        continue loop;
                    }
                }
                else {
                    return undefined;
                }
                break;
            }
        };
        return loop(0);
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function findIndex<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): int32 {
    const matchValue: Option<int32> = tryFindIndex<T>(predicate, xs);
    if (matchValue == null) {
        indexNotFound<void>();
        return -1;
    }
    else {
        return value_1(matchValue) | 0;
    }
}

export function tryFindIndexBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<int32> {
    return tryFindIndexBack_1<T>(predicate, toArray<T>(xs));
}

export function findIndexBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): int32 {
    const matchValue: Option<int32> = tryFindIndexBack<T>(predicate, xs);
    if (matchValue == null) {
        indexNotFound<void>();
        return -1;
    }
    else {
        return value_1(matchValue) | 0;
    }
}

export function fold<T, State>(folder: ((arg0: State, arg1: T) => State), state: State, xs: Iterable<T>): State {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        let acc: State = state;
        while (e["System.Collections.IEnumerator.MoveNext"]()) {
            acc = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        return acc;
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function foldBack<T, State>(folder: ((arg0: T, arg1: any) => any), xs: Iterable<T>, state: any): any {
    return foldBack_1<T, any>(folder, toArray<T>(xs), state);
}

export function fold2<T1, T2, State>(folder: ((arg0: State, arg1: T1, arg2: T2) => State), state: State, xs: Iterable<T1>, ys: Iterable<T2>): State {
    const e1: IEnumerator<T1> = ofSeq<T1>(xs);
    try {
        const e2: IEnumerator<T2> = ofSeq<T2>(ys);
        try {
            let acc: State = state;
            while (e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) {
                acc = folder(acc, e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
            return acc;
        }
        finally {
            disposeSafe(e2 as IDisposable);
        }
    }
    finally {
        disposeSafe(e1 as IDisposable);
    }
}

export function foldBack2<T1, T2, State>(folder: ((arg0: T1, arg1: T2, arg2: State) => State), xs: Iterable<T1>, ys: Iterable<T2>, state: State): State {
    return foldBack2_1<T1, T2, State>(folder, toArray<T1>(xs), toArray<T2>(ys), state);
}

export function forAll<$a>(predicate: ((arg0: $a) => boolean), xs: Iterable<$a>): boolean {
    return !exists<$a>((x: $a): boolean => !predicate(x), xs);
}

export function forAll2<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), xs: Iterable<$a>, ys: Iterable<$b>): boolean {
    return !exists2<$a, $b>((x: $a, y: $b): boolean => !predicate(x, y), xs, ys);
}

export function tryHead<T>(xs: Iterable<T>): Option<T> {
    if (isArrayLike(xs)) {
        return tryHead_1<T>(xs);
    }
    else if (xs instanceof FSharpList) {
        return tryHead_2<T>(xs);
    }
    else {
        const e: IEnumerator<T> = ofSeq<T>(xs);
        try {
            return e["System.Collections.IEnumerator.MoveNext"]() ? some(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : undefined;
        }
        finally {
            disposeSafe(e as IDisposable);
        }
    }
}

export function head<T>(xs: Iterable<T>): T {
    const matchValue: Option<T> = tryHead<T>(xs);
    if (matchValue == null) {
        throw new Error((SR_inputSequenceEmpty + "\\nParameter name: ") + "source");
    }
    else {
        return value_1(matchValue);
    }
}

export function initialize<$a>(count: int32, f: ((arg0: int32) => $a)): Iterable<$a> {
    return unfold<int32, $a>((i: int32): Option<[$a, int32]> => ((i < count) ? ([f(i), i + 1] as [$a, int32]) : undefined), 0);
}

export function initializeInfinite<$a>(f: ((arg0: int32) => $a)): Iterable<$a> {
    return initialize<$a>(2147483647, f);
}

export function isEmpty<T>(xs: Iterable<T>): boolean {
    if (isArrayLike(xs)) {
        const a: T[] = xs;
        return a.length === 0;
    }
    else if (xs instanceof FSharpList) {
        return isEmpty_1(xs);
    }
    else {
        const e: IEnumerator<T> = ofSeq<T>(xs);
        try {
            return !e["System.Collections.IEnumerator.MoveNext"]();
        }
        finally {
            disposeSafe(e as IDisposable);
        }
    }
}

export function tryItem<T>(index: int32, xs: Iterable<T>): Option<T> {
    if (isArrayLike(xs)) {
        return tryItem_1<T>(index, xs);
    }
    else if (xs instanceof FSharpList) {
        return tryItem_2<T>(index, xs);
    }
    else {
        const e: IEnumerator<T> = ofSeq<T>(xs);
        try {
            const loop = (index_1_mut: int32): Option<T> => {
                loop:
                while (true) {
                    const index_1: int32 = index_1_mut;
                    if (!e["System.Collections.IEnumerator.MoveNext"]()) {
                        return undefined;
                    }
                    else if (index_1 === 0) {
                        return some(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
                    }
                    else {
                        index_1_mut = (index_1 - 1);
                        continue loop;
                    }
                    break;
                }
            };
            return loop(index);
        }
        finally {
            disposeSafe(e as IDisposable);
        }
    }
}

export function item<T>(index: int32, xs: Iterable<T>): T {
    const matchValue: Option<T> = tryItem<T>(index, xs);
    if (matchValue == null) {
        throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "index");
    }
    else {
        return value_1(matchValue);
    }
}

export function iterate<$a>(action: ((arg0: $a) => void), xs: Iterable<$a>): void {
    fold<$a, void>((unitVar: void, x: $a): void => {
        action(x);
    }, undefined, xs);
}

export function iterate2<$a, $b>(action: ((arg0: $a, arg1: $b) => void), xs: Iterable<$a>, ys: Iterable<$b>): void {
    fold2<$a, $b, void>((unitVar: void, x: $a, y: $b): void => {
        action(x, y);
    }, undefined, xs, ys);
}

export function iterateIndexed<$a>(action: ((arg0: int32, arg1: $a) => void), xs: Iterable<$a>): void {
    fold<$a, int32>((i: int32, x: $a): int32 => {
        action(i, x);
        return (i + 1) | 0;
    }, 0, xs);
}

export function iterateIndexed2<$a, $b>(action: ((arg0: int32, arg1: $a, arg2: $b) => void), xs: Iterable<$a>, ys: Iterable<$b>): void {
    fold2<$a, $b, int32>((i: int32, x: $a, y: $b): int32 => {
        action(i, x, y);
        return (i + 1) | 0;
    }, 0, xs, ys);
}

export function tryLast<T>(xs: Iterable<T>): Option<T> {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        const loop = (acc_mut: T): T => {
            loop:
            while (true) {
                const acc: T = acc_mut;
                if (!e["System.Collections.IEnumerator.MoveNext"]()) {
                    return acc;
                }
                else {
                    acc_mut = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
                    continue loop;
                }
                break;
            }
        };
        return e["System.Collections.IEnumerator.MoveNext"]() ? some(loop(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : undefined;
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function last<T>(xs: Iterable<T>): T {
    const matchValue: Option<T> = tryLast<T>(xs);
    if (matchValue == null) {
        throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "source");
    }
    else {
        return value_1(matchValue);
    }
}

export function length<T>(xs: Iterable<T>): int32 {
    if (isArrayLike(xs)) {
        const a: T[] = xs;
        return a.length | 0;
    }
    else if (xs instanceof FSharpList) {
        return length_1<T>(xs) | 0;
    }
    else {
        const e: IEnumerator<T> = ofSeq<T>(xs);
        try {
            let count = 0;
            while (e["System.Collections.IEnumerator.MoveNext"]()) {
                count = ((count + 1) | 0);
            }
            return count | 0;
        }
        finally {
            disposeSafe(e as IDisposable);
        }
    }
}

export function map<T, U>(mapping: ((arg0: T) => U), xs: Iterable<T>): Iterable<U> {
    return generate<IEnumerator<T>, U>((): IEnumerator<T> => ofSeq<T>(xs), (e: IEnumerator<T>): Option<U> => (e["System.Collections.IEnumerator.MoveNext"]() ? some(mapping(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : undefined), (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function mapIndexed<T, U>(mapping: ((arg0: int32, arg1: T) => U), xs: Iterable<T>): Iterable<U> {
    return generateIndexed<IEnumerator<T>, U>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<U> => (e["System.Collections.IEnumerator.MoveNext"]() ? some(mapping(i, e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : undefined), (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function indexed<T>(xs: Iterable<T>): Iterable<[int32, T]> {
    return mapIndexed<T, [int32, T]>((i: int32, x: T): [int32, T] => ([i, x] as [int32, T]), xs);
}

export function map2<T1, T2, U>(mapping: ((arg0: T1, arg1: T2) => U), xs: Iterable<T1>, ys: Iterable<T2>): Iterable<U> {
    return generate<[IEnumerator<T1>, IEnumerator<T2>], U>((): [IEnumerator<T1>, IEnumerator<T2>] => ([ofSeq<T1>(xs), ofSeq<T2>(ys)] as [IEnumerator<T1>, IEnumerator<T2>]), (tupledArg: [IEnumerator<T1>, IEnumerator<T2>]): Option<U> => {
        const e1: IEnumerator<T1> = tupledArg[0];
        const e2: IEnumerator<T2> = tupledArg[1];
        return (e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) ? some(mapping(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]())) : undefined;
    }, (tupledArg_1: [IEnumerator<T1>, IEnumerator<T2>]): void => {
        try {
            disposeSafe(tupledArg_1[0]);
        }
        finally {
            disposeSafe(tupledArg_1[1]);
        }
    });
}

export function mapIndexed2<T1, T2, U>(mapping: ((arg0: int32, arg1: T1, arg2: T2) => U), xs: Iterable<T1>, ys: Iterable<T2>): Iterable<U> {
    return generateIndexed<[IEnumerator<T1>, IEnumerator<T2>], U>((): [IEnumerator<T1>, IEnumerator<T2>] => ([ofSeq<T1>(xs), ofSeq<T2>(ys)] as [IEnumerator<T1>, IEnumerator<T2>]), (i: int32, tupledArg: [IEnumerator<T1>, IEnumerator<T2>]): Option<U> => {
        const e1: IEnumerator<T1> = tupledArg[0];
        const e2: IEnumerator<T2> = tupledArg[1];
        return (e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) ? some(mapping(i, e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"]())) : undefined;
    }, (tupledArg_1: [IEnumerator<T1>, IEnumerator<T2>]): void => {
        try {
            disposeSafe(tupledArg_1[0]);
        }
        finally {
            disposeSafe(tupledArg_1[1]);
        }
    });
}

export function map3<T1, T2, T3, U>(mapping: ((arg0: T1, arg1: T2, arg2: T3) => U), xs: Iterable<T1>, ys: Iterable<T2>, zs: Iterable<T3>): Iterable<U> {
    return generate<[IEnumerator<T1>, IEnumerator<T2>, IEnumerator<T3>], U>((): [IEnumerator<T1>, IEnumerator<T2>, IEnumerator<T3>] => ([ofSeq<T1>(xs), ofSeq<T2>(ys), ofSeq<T3>(zs)] as [IEnumerator<T1>, IEnumerator<T2>, IEnumerator<T3>]), (tupledArg: [IEnumerator<T1>, IEnumerator<T2>, IEnumerator<T3>]): Option<U> => {
        const e1: IEnumerator<T1> = tupledArg[0];
        const e2: IEnumerator<T2> = tupledArg[1];
        const e3: IEnumerator<T3> = tupledArg[2];
        return ((e1["System.Collections.IEnumerator.MoveNext"]() && e2["System.Collections.IEnumerator.MoveNext"]()) && e3["System.Collections.IEnumerator.MoveNext"]()) ? some(mapping(e1["System.Collections.Generic.IEnumerator`1.get_Current"](), e2["System.Collections.Generic.IEnumerator`1.get_Current"](), e3["System.Collections.Generic.IEnumerator`1.get_Current"]())) : undefined;
    }, (tupledArg_1: [IEnumerator<T1>, IEnumerator<T2>, IEnumerator<T3>]): void => {
        try {
            disposeSafe(tupledArg_1[0]);
        }
        finally {
            try {
                disposeSafe(tupledArg_1[1]);
            }
            finally {
                disposeSafe(tupledArg_1[2]);
            }
        }
    });
}

export function readOnly<T>(xs: Iterable<T>): Iterable<T> {
    checkNonNull<Iterable<T>>("source", xs);
    return map<T, T>((x: T): T => x, xs);
}

export class CachedSeq$1<T> implements Iterable<T>, IDisposable {
    readonly res: Iterable<T>;
    readonly cleanup: (() => void);
    constructor(cleanup: (() => void), res: Iterable<T>) {
        this.cleanup = cleanup;
        this.res = res;
    }
    Dispose(): void {
        const _: CachedSeq$1<T> = this;
        _.cleanup();
    }
    GetEnumerator(): IEnumerator<T> {
        const _: CachedSeq$1<T> = this;
        return getEnumerator(_.res);
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const _: CachedSeq$1<T> = this;
        return getEnumerator(_.res);
    }
}

export function CachedSeq$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("SeqModule.CachedSeq`1", [gen0], CachedSeq$1);
}

export function CachedSeq$1_$ctor_Z7A8347D4<T>(cleanup: (() => void), res: Iterable<T>): CachedSeq$1<T> {
    return new CachedSeq$1(cleanup, res);
}

export function CachedSeq$1__Clear<T>(_: CachedSeq$1<T>): void {
    _.cleanup();
}

export function cache<T>(source: Iterable<T>): Iterable<T> {
    checkNonNull<Iterable<T>>("source", source);
    const prefix: T[] = [];
    let enumeratorR: Option<Option<IEnumerator<T>>> = undefined;
    return CachedSeq$1_$ctor_Z7A8347D4<T>((): void => {
        Operators_Lock<T[], void>(prefix, (): void => {
            clear(prefix);
            let matchResult: int32, e: IEnumerator<T>;
            if (enumeratorR != null) {
                if (value_1(enumeratorR) != null) {
                    matchResult = 0;
                    e = value_1(value_1(enumeratorR));
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
                    disposeSafe(e!);
                    break;
                }
            }
            enumeratorR = undefined;
        });
    }, unfold<int32, T>((i_1: int32): Option<[T, int32]> => Operators_Lock<T[], Option<[T, int32]>>(prefix, (): Option<[T, int32]> => {
        if (i_1 < prefix.length) {
            return [prefix[i_1], i_1 + 1] as [T, int32];
        }
        else {
            if (i_1 >= prefix.length) {
                let optEnumerator_2: Option<IEnumerator<T>>;
                if (enumeratorR != null) {
                    optEnumerator_2 = value_1(enumeratorR);
                }
                else {
                    const optEnumerator: Option<IEnumerator<T>> = getEnumerator(source);
                    enumeratorR = some(optEnumerator);
                    optEnumerator_2 = optEnumerator;
                }
                if (optEnumerator_2 == null) {
                }
                else {
                    const enumerator: IEnumerator<T> = value_1(optEnumerator_2);
                    if (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                        void (prefix.push(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]()));
                    }
                    else {
                        disposeSafe(enumerator);
                        enumeratorR = some(undefined);
                    }
                }
            }
            if (i_1 < prefix.length) {
                return [prefix[i_1], i_1 + 1] as [T, int32];
            }
            else {
                return undefined;
            }
        }
    }), 0));
}

export function allPairs<T1, T2>(xs: Iterable<T1>, ys: Iterable<T2>): Iterable<[T1, T2]> {
    const ysCache: Iterable<T2> = cache<T2>(ys);
    return delay<[T1, T2]>((): Iterable<[T1, T2]> => concat<Iterable<[T1, T2]>, [T1, T2]>(map<T1, Iterable<[T1, T2]>>((x: T1): Iterable<[T1, T2]> => map<T2, [T1, T2]>((y: T2): [T1, T2] => ([x, y] as [T1, T2]), ysCache), xs)));
}

export function mapFold<State, T, Result>(mapping: ((arg0: State, arg1: T) => [Result, State]), state: State, xs: Iterable<T>): [Iterable<Result>, State] {
    const patternInput: [Result[], State] = mapFold_1<T, State, Result>(mapping, state, toArray<T>(xs));
    return [readOnly<Result>(patternInput[0]), patternInput[1]] as [Iterable<Result>, State];
}

export function mapFoldBack<T, State, Result>(mapping: ((arg0: T, arg1: State) => [Result, State]), xs: Iterable<T>, state: State): [Iterable<Result>, State] {
    const patternInput: [Result[], State] = mapFoldBack_1<T, State, Result>(mapping, toArray<T>(xs), state);
    return [readOnly<Result>(patternInput[0]), patternInput[1]] as [Iterable<Result>, State];
}

export function tryPick<T, $a>(chooser: ((arg0: T) => Option<$a>), xs: Iterable<T>): Option<$a> {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        let res: Option<$a> = undefined;
        while ((res == null) && e["System.Collections.IEnumerator.MoveNext"]()) {
            res = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        return res;
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function pick<T, $a>(chooser: ((arg0: T) => Option<$a>), xs: Iterable<T>): $a {
    const matchValue: Option<$a> = tryPick<T, $a>(chooser, xs);
    if (matchValue == null) {
        return indexNotFound<$a>();
    }
    else {
        return value_1(matchValue);
    }
}

export function reduce<T>(folder: ((arg0: T, arg1: T) => T), xs: Iterable<T>): T {
    const e: IEnumerator<T> = ofSeq<T>(xs);
    try {
        const loop = (acc_mut: T): T => {
            loop:
            while (true) {
                const acc: T = acc_mut;
                if (e["System.Collections.IEnumerator.MoveNext"]()) {
                    acc_mut = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
                    continue loop;
                }
                else {
                    return acc;
                }
                break;
            }
        };
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
            return loop(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        else {
            throw new Error(SR_inputSequenceEmpty);
        }
    }
    finally {
        disposeSafe(e as IDisposable);
    }
}

export function reduceBack<T>(folder: ((arg0: T, arg1: T) => T), xs: Iterable<T>): T {
    const arr: T[] = toArray<T>(xs);
    if (arr.length > 0) {
        return arr.reduceRight(folder);
    }
    else {
        throw new Error(SR_inputSequenceEmpty);
    }
}

export function replicate<$a>(n: int32, x: $a): Iterable<$a> {
    return initialize<$a>(n, (_arg: int32): $a => x);
}

export function reverse<T>(xs: Iterable<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => ofArray<T>(reverse_1<T>(toArray<T>(xs))));
}

export function scan<State, T>(folder: ((arg0: State, arg1: T) => State), state: State, xs: Iterable<T>): Iterable<State> {
    return delay<State>((): Iterable<State> => {
        let acc: State = state;
        return concat<Iterable<State>, State>([singleton<State>(state), map<T, State>((x: T): State => {
            acc = folder(acc, x);
            return acc;
        }, xs)]);
    });
}

export function scanBack<T, State>(folder: ((arg0: T, arg1: State) => State), xs: Iterable<T>, state: State): Iterable<State> {
    return delay<State>((): Iterable<State> => ofArray<State>(scanBack_1<T, State>(folder, toArray<T>(xs), state)));
}

export function skip<T>(count: int32, source: Iterable<T>): Iterable<T> {
    return mkSeq<T>((): IEnumerator<T> => {
        const e: IEnumerator<T> = ofSeq<T>(source);
        try {
            for (let _ = 1; _ <= count; _++) {
                if (!e["System.Collections.IEnumerator.MoveNext"]()) {
                    throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "source");
                }
            }
            return Enumerator_enumerateThenFinally<T>((): void => {
            }, e);
        }
        catch (matchValue: any) {
            disposeSafe(e);
            throw matchValue;
        }
    });
}

export function skipWhile<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => {
        let skipped = true;
        return filter<T>((x: T): boolean => {
            if (skipped) {
                skipped = predicate(x);
            }
            return !skipped;
        }, xs);
    });
}

export function tail<T>(xs: Iterable<T>): Iterable<T> {
    return skip<T>(1, xs);
}

export function take<T>(count: int32, xs: Iterable<T>): Iterable<T> {
    return generateIndexed<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<T> => {
        if (i < count) {
            if (e["System.Collections.IEnumerator.MoveNext"]()) {
                return some(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
            else {
                throw new Error((SR_notEnoughElements + "\\nParameter name: ") + "source");
            }
        }
        else {
            return undefined;
        }
    }, (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function takeWhile<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T> {
    return generate<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (e: IEnumerator<T>): Option<T> => ((e["System.Collections.IEnumerator.MoveNext"]() && predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) ? some(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : undefined), (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function truncate<T>(count: int32, xs: Iterable<T>): Iterable<T> {
    return generateIndexed<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<T> => (((i < count) && e["System.Collections.IEnumerator.MoveNext"]()) ? some(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : undefined), (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function zip<T1, T2>(xs: Iterable<T1>, ys: Iterable<T2>): Iterable<[T1, T2]> {
    return map2<T1, T2, [T1, T2]>((x: T1, y: T2): [T1, T2] => ([x, y] as [T1, T2]), xs, ys);
}

export function zip3<T1, T2, T3>(xs: Iterable<T1>, ys: Iterable<T2>, zs: Iterable<T3>): Iterable<[T1, T2, T3]> {
    return map3<T1, T2, T3, [T1, T2, T3]>((x: T1, y: T2, z: T3): [T1, T2, T3] => ([x, y, z] as [T1, T2, T3]), xs, ys, zs);
}

export function collect<T, Collection extends Iterable<U>, U>(mapping: ((arg0: T) => Collection), xs: Iterable<T>): Iterable<U> {
    return delay<U>((): Iterable<U> => concat<Collection, U>(map<T, Collection>(mapping, xs)));
}

export function where<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T> {
    return filter<T>(predicate, xs);
}

export function pairwise<T>(xs: Iterable<T>): Iterable<[T, T]> {
    return delay<[T, T]>((): Iterable<[T, T]> => ofArray<[T, T]>(pairwise_1<T>(toArray<T>(xs))));
}

export function splitInto<T>(chunks: int32, xs: Iterable<T>): Iterable<T[]> {
    return delay<T[]>((): Iterable<T[]> => ofArray<T[]>(splitInto_1<T>(chunks, toArray<T>(xs))));
}

export function windowed<T>(windowSize: int32, xs: Iterable<T>): Iterable<T[]> {
    return delay<T[]>((): Iterable<T[]> => ofArray<T[]>(windowed_1<T>(windowSize, toArray<T>(xs))));
}

export function transpose<$a extends Iterable<T>, T>(xss: Iterable<$a>): Iterable<Iterable<T>> {
    return delay<Iterable<T>>((): Iterable<Iterable<T>> => ofArray<Iterable<T>>(map_1<T[], Iterable<T>>(ofArray, transpose_1<T>(map_1<$a, T[]>(toArray, toArray<$a>(xss))))));
}

export function sortWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: Iterable<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => {
        const arr: T[] = toArray<T>(xs);
        arr.sort(comparer);
        return ofArray<T>(arr);
    });
}

export function sort<T>(xs: Iterable<T>, comparer: IComparer<T>): Iterable<T> {
    return sortWith<T>((x: T, y: T): int32 => comparer.Compare(x, y), xs);
}

export function sortBy<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): Iterable<T> {
    return sortWith<T>((x: T, y: T): int32 => comparer.Compare(projection(x), projection(y)), xs);
}

export function sortDescending<T>(xs: Iterable<T>, comparer: IComparer<T>): Iterable<T> {
    return sortWith<T>((x: T, y: T): int32 => (comparer.Compare(x, y) * -1), xs);
}

export function sortByDescending<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): Iterable<T> {
    return sortWith<T>((x: T, y: T): int32 => (comparer.Compare(projection(x), projection(y)) * -1), xs);
}

export function sum<T>(xs: Iterable<T>, adder: any): T {
    return fold<T, T>((acc: T, x: T): T => adder.Add(acc, x), adder.GetZero(), xs);
}

export function sumBy<T, U>(f: ((arg0: T) => U), xs: Iterable<T>, adder: any): U {
    return fold<T, U>((acc: U, x: T): U => adder.Add(acc, f(x)), adder.GetZero(), xs);
}

export function maxBy<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(projection(y), projection(x)) > 0) ? y : x), xs);
}

export function max<T>(xs: Iterable<T>, comparer: IComparer<T>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(y, x) > 0) ? y : x), xs);
}

export function minBy<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(projection(y), projection(x)) > 0) ? x : y), xs);
}

export function min<T>(xs: Iterable<T>, comparer: IComparer<T>): T {
    return reduce<T>((x: T, y: T): T => ((comparer.Compare(y, x) > 0) ? x : y), xs);
}

export function average<T>(xs: Iterable<T>, averager: any): T {
    let count = 0;
    const total: T = fold<T, T>((acc: T, x: T): T => {
        count = ((count + 1) | 0);
        return averager.Add(acc, x);
    }, averager.GetZero(), xs);
    if (count === 0) {
        throw new Error((SR_inputSequenceEmpty + "\\nParameter name: ") + "source");
    }
    else {
        return averager.DivideByInt(total, count);
    }
}

export function averageBy<T, U>(f: ((arg0: T) => U), xs: Iterable<T>, averager: any): U {
    let count = 0;
    const total: U = fold<T, U>((acc: U, x: T): U => {
        count = ((count + 1) | 0);
        return averager.Add(acc, f(x));
    }, averager.GetZero(), xs);
    if (count === 0) {
        throw new Error((SR_inputSequenceEmpty + "\\nParameter name: ") + "source");
    }
    else {
        return averager.DivideByInt(total, count);
    }
}

export function permute<T>(f: ((arg0: int32) => int32), xs: Iterable<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => ofArray<T>(permute_1<T>(f, toArray<T>(xs))));
}

export function chunkBySize<T>(chunkSize: int32, xs: Iterable<T>): Iterable<T[]> {
    return delay<T[]>((): Iterable<T[]> => ofArray<T[]>(chunkBySize_1<T>(chunkSize, toArray<T>(xs))));
}

export function insertAt<T>(index: int32, y: T, xs: Iterable<T>): Iterable<T> {
    let isDone = false;
    if (index < 0) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return generateIndexed<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<T> => {
        if ((isDone ? true : (i < index)) && e["System.Collections.IEnumerator.MoveNext"]()) {
            return some(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        else if (i === index) {
            isDone = true;
            return some(y);
        }
        else {
            if (!isDone) {
                throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
            }
            return undefined;
        }
    }, (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function insertManyAt<T>(index: int32, ys: Iterable<T>, xs: Iterable<T>): Iterable<T> {
    let status = -1;
    if (index < 0) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return generateIndexed<[IEnumerator<T>, IEnumerator<T>], T>((): [IEnumerator<T>, IEnumerator<T>] => ([ofSeq<T>(xs), ofSeq<T>(ys)] as [IEnumerator<T>, IEnumerator<T>]), (i: int32, tupledArg: [IEnumerator<T>, IEnumerator<T>]): Option<T> => {
        const e1: IEnumerator<T> = tupledArg[0];
        const e2: IEnumerator<T> = tupledArg[1];
        if (i === index) {
            status = 0;
        }
        let inserted: Option<T>;
        if (status === 0) {
            if (e2["System.Collections.IEnumerator.MoveNext"]()) {
                inserted = some(e2["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
            else {
                status = 1;
                inserted = undefined;
            }
        }
        else {
            inserted = undefined;
        }
        if (inserted == null) {
            if (e1["System.Collections.IEnumerator.MoveNext"]()) {
                return some(e1["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
            else {
                if (status < 1) {
                    throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
                }
                return undefined;
            }
        }
        else {
            return some(value_1(inserted));
        }
    }, (tupledArg_1: [IEnumerator<T>, IEnumerator<T>]): void => {
        disposeSafe(tupledArg_1[0]);
        disposeSafe(tupledArg_1[1]);
    });
}

export function removeAt<T>(index: int32, xs: Iterable<T>): Iterable<T> {
    let isDone = false;
    if (index < 0) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return generateIndexed<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<T> => {
        if ((isDone ? true : (i < index)) && e["System.Collections.IEnumerator.MoveNext"]()) {
            return some(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        else if ((i === index) && e["System.Collections.IEnumerator.MoveNext"]()) {
            isDone = true;
            return e["System.Collections.IEnumerator.MoveNext"]() ? some(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : undefined;
        }
        else {
            if (!isDone) {
                throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
            }
            return undefined;
        }
    }, (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function removeManyAt<T>(index: int32, count: int32, xs: Iterable<T>): Iterable<T> {
    if (index < 0) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return generateIndexed<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<T> => {
        if (i < index) {
            if (e["System.Collections.IEnumerator.MoveNext"]()) {
                return some(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
            }
            else {
                throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
            }
        }
        else {
            if (i === index) {
                for (let _ = 1; _ <= count; _++) {
                    if (!e["System.Collections.IEnumerator.MoveNext"]()) {
                        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "count");
                    }
                }
            }
            return e["System.Collections.IEnumerator.MoveNext"]() ? some(e["System.Collections.Generic.IEnumerator`1.get_Current"]()) : undefined;
        }
    }, (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

export function updateAt<T>(index: int32, y: T, xs: Iterable<T>): Iterable<T> {
    let isDone = false;
    if (index < 0) {
        throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
    }
    return generateIndexed<IEnumerator<T>, T>((): IEnumerator<T> => ofSeq<T>(xs), (i: int32, e: IEnumerator<T>): Option<T> => {
        if ((isDone ? true : (i < index)) && e["System.Collections.IEnumerator.MoveNext"]()) {
            return some(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
        else if ((i === index) && e["System.Collections.IEnumerator.MoveNext"]()) {
            isDone = true;
            return some(y);
        }
        else {
            if (!isDone) {
                throw new Error((SR_indexOutOfBounds + "\\nParameter name: ") + "index");
            }
            return undefined;
        }
    }, (e_1: IEnumerator<T>): void => {
        disposeSafe(e_1);
    });
}

