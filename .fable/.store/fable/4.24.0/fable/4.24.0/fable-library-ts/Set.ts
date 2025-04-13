import { record_type, bool_type, list_type, option_type, class_type, TypeInfo } from "./Reflection.js";
import { some, value as value_3, Option } from "./Option.js";
import { int32 } from "./Int32.js";
import { structuralHash, ISet, toIterator, IDisposable, disposeSafe, getEnumerator, isArrayLike, IEnumerator, IComparer } from "./Util.js";
import { toString, Record } from "./Types.js";
import { fold as fold_2, cons, singleton as singleton_1, empty as empty_1, ofArrayWithTail, tail, head, isEmpty as isEmpty_1, FSharpList } from "./List.js";
import { fold as fold_1, fill, setItem } from "./Array.js";
import { join } from "./String.js";
import { exists as exists_1, cache, forAll as forAll_1, fold as fold_3, reduce, iterate as iterate_1, map as map_1 } from "./Seq.js";
import { HashSet__get_Comparer, HashSet_$ctor_Z6150332D, HashSet } from "./MutableSet.js";

export class SetTreeLeaf$1<T> {
    readonly k: T;
    constructor(k: T) {
        this.k = k;
    }
}

export function SetTreeLeaf$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("Set.SetTreeLeaf`1", [gen0], SetTreeLeaf$1);
}

export function SetTreeLeaf$1_$ctor_2B595<T>(k: T): SetTreeLeaf$1<T> {
    return new SetTreeLeaf$1(k);
}

export function SetTreeLeaf$1__get_Key<T>(_: SetTreeLeaf$1<T>): T {
    return _.k;
}

export class SetTreeNode$1<T> extends SetTreeLeaf$1<T> {
    readonly right: Option<SetTreeLeaf$1<T>>;
    readonly left: Option<SetTreeLeaf$1<T>>;
    readonly h: int32;
    constructor(v: T, left: Option<SetTreeLeaf$1<T>>, right: Option<SetTreeLeaf$1<T>>, h: int32) {
        super(v);
        this.left = left;
        this.right = right;
        this.h = (h | 0);
    }
}

export function SetTreeNode$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("Set.SetTreeNode`1", [gen0], SetTreeNode$1, SetTreeLeaf$1_$reflection(gen0));
}

export function SetTreeNode$1_$ctor_5F465FC9<T>(v: T, left: Option<SetTreeLeaf$1<T>>, right: Option<SetTreeLeaf$1<T>>, h: int32): SetTreeNode$1<T> {
    return new SetTreeNode$1(v, left, right, h);
}

export function SetTreeNode$1__get_Left<T>(_: SetTreeNode$1<T>): Option<SetTreeLeaf$1<T>> {
    return _.left;
}

export function SetTreeNode$1__get_Right<T>(_: SetTreeNode$1<T>): Option<SetTreeLeaf$1<T>> {
    return _.right;
}

export function SetTreeNode$1__get_Height<T>(_: SetTreeNode$1<T>): int32 {
    return _.h;
}

export function SetTreeModule_empty<T>(): Option<SetTreeLeaf$1<T>> {
    return undefined;
}

export function SetTreeModule_countAux<T>(t_mut: Option<SetTreeLeaf$1<T>>, acc_mut: int32): int32 {
    SetTreeModule_countAux:
    while (true) {
        const t: Option<SetTreeLeaf$1<T>> = t_mut, acc: int32 = acc_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                acc_mut = SetTreeModule_countAux<T>(SetTreeNode$1__get_Right<T>(tn), acc + 1);
                continue SetTreeModule_countAux;
            }
            else {
                return (acc + 1) | 0;
            }
        }
        else {
            return acc | 0;
        }
        break;
    }
}

export function SetTreeModule_count<$a>(s: Option<SetTreeLeaf$1<$a>>): int32 {
    return SetTreeModule_countAux<$a>(s, 0);
}

export function SetTreeModule_mk<T>(l: Option<SetTreeLeaf$1<T>>, k: T, r: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    let tn: SetTreeNode$1<T>, tn_1: SetTreeNode$1<T>;
    let hl: int32;
    const t: Option<SetTreeLeaf$1<T>> = l;
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        hl = ((t2 instanceof SetTreeNode$1) ? ((tn = (t2 as SetTreeNode$1<T>), SetTreeNode$1__get_Height<T>(tn))) : 1);
    }
    else {
        hl = 0;
    }
    let hr: int32;
    const t_1: Option<SetTreeLeaf$1<T>> = r;
    if (t_1 != null) {
        const t2_1: SetTreeLeaf$1<T> = value_3(t_1);
        hr = ((t2_1 instanceof SetTreeNode$1) ? ((tn_1 = (t2_1 as SetTreeNode$1<T>), SetTreeNode$1__get_Height<T>(tn_1))) : 1);
    }
    else {
        hr = 0;
    }
    const m: int32 = ((hl < hr) ? hr : hl) | 0;
    if (m === 0) {
        return SetTreeLeaf$1_$ctor_2B595<T>(k);
    }
    else {
        return SetTreeNode$1_$ctor_5F465FC9<T>(k, l, r, m + 1);
    }
}

export function SetTreeModule_rebalance<T>(t1: Option<SetTreeLeaf$1<T>>, v: T, t2: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    let tn: SetTreeNode$1<T>, tn_1: SetTreeNode$1<T>, t_2: Option<SetTreeLeaf$1<T>>, t2_3: SetTreeLeaf$1<T>, tn_2: SetTreeNode$1<T>, t_3: Option<SetTreeLeaf$1<T>>, t2_4: SetTreeLeaf$1<T>, tn_3: SetTreeNode$1<T>;
    let t1h: int32;
    const t: Option<SetTreeLeaf$1<T>> = t1;
    if (t != null) {
        const t2_1: SetTreeLeaf$1<T> = value_3(t);
        t1h = ((t2_1 instanceof SetTreeNode$1) ? ((tn = (t2_1 as SetTreeNode$1<T>), SetTreeNode$1__get_Height<T>(tn))) : 1);
    }
    else {
        t1h = 0;
    }
    let t2h: int32;
    const t_1: Option<SetTreeLeaf$1<T>> = t2;
    if (t_1 != null) {
        const t2_2: SetTreeLeaf$1<T> = value_3(t_1);
        t2h = ((t2_2 instanceof SetTreeNode$1) ? ((tn_1 = (t2_2 as SetTreeNode$1<T>), SetTreeNode$1__get_Height<T>(tn_1))) : 1);
    }
    else {
        t2h = 0;
    }
    if (t2h > (t1h + 2)) {
        const matchValue: SetTreeLeaf$1<T> = value_3(t2);
        if (matchValue instanceof SetTreeNode$1) {
            const t2$0027 = matchValue as SetTreeNode$1<T>;
            if (((t_2 = SetTreeNode$1__get_Left<T>(t2$0027), (t_2 != null) ? ((t2_3 = value_3(t_2), (t2_3 instanceof SetTreeNode$1) ? ((tn_2 = (t2_3 as SetTreeNode$1<T>), SetTreeNode$1__get_Height<T>(tn_2))) : 1)) : 0)) > (t1h + 1)) {
                const matchValue_1: SetTreeLeaf$1<T> = value_3(SetTreeNode$1__get_Left<T>(t2$0027));
                if (matchValue_1 instanceof SetTreeNode$1) {
                    const t2l = matchValue_1 as SetTreeNode$1<T>;
                    return SetTreeModule_mk<T>(SetTreeModule_mk<T>(t1, v, SetTreeNode$1__get_Left<T>(t2l)), SetTreeLeaf$1__get_Key<T>(t2l), SetTreeModule_mk<T>(SetTreeNode$1__get_Right<T>(t2l), SetTreeLeaf$1__get_Key<T>(t2$0027), SetTreeNode$1__get_Right<T>(t2$0027)));
                }
                else {
                    throw new Error("internal error: Set.rebalance");
                }
            }
            else {
                return SetTreeModule_mk<T>(SetTreeModule_mk<T>(t1, v, SetTreeNode$1__get_Left<T>(t2$0027)), SetTreeLeaf$1__get_Key<T>(t2$0027), SetTreeNode$1__get_Right<T>(t2$0027));
            }
        }
        else {
            throw new Error("internal error: Set.rebalance");
        }
    }
    else if (t1h > (t2h + 2)) {
        const matchValue_2: SetTreeLeaf$1<T> = value_3(t1);
        if (matchValue_2 instanceof SetTreeNode$1) {
            const t1$0027 = matchValue_2 as SetTreeNode$1<T>;
            if (((t_3 = SetTreeNode$1__get_Right<T>(t1$0027), (t_3 != null) ? ((t2_4 = value_3(t_3), (t2_4 instanceof SetTreeNode$1) ? ((tn_3 = (t2_4 as SetTreeNode$1<T>), SetTreeNode$1__get_Height<T>(tn_3))) : 1)) : 0)) > (t2h + 1)) {
                const matchValue_3: SetTreeLeaf$1<T> = value_3(SetTreeNode$1__get_Right<T>(t1$0027));
                if (matchValue_3 instanceof SetTreeNode$1) {
                    const t1r = matchValue_3 as SetTreeNode$1<T>;
                    return SetTreeModule_mk<T>(SetTreeModule_mk<T>(SetTreeNode$1__get_Left<T>(t1$0027), SetTreeLeaf$1__get_Key<T>(t1$0027), SetTreeNode$1__get_Left<T>(t1r)), SetTreeLeaf$1__get_Key<T>(t1r), SetTreeModule_mk<T>(SetTreeNode$1__get_Right<T>(t1r), v, t2));
                }
                else {
                    throw new Error("internal error: Set.rebalance");
                }
            }
            else {
                return SetTreeModule_mk<T>(SetTreeNode$1__get_Left<T>(t1$0027), SetTreeLeaf$1__get_Key<T>(t1$0027), SetTreeModule_mk<T>(SetTreeNode$1__get_Right<T>(t1$0027), v, t2));
            }
        }
        else {
            throw new Error("internal error: Set.rebalance");
        }
    }
    else {
        return SetTreeModule_mk<T>(t1, v, t2);
    }
}

export function SetTreeModule_add<T>(comparer: IComparer<T>, k: T, t: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        const c: int32 = comparer.Compare(k, SetTreeLeaf$1__get_Key<T>(t2)) | 0;
        if (t2 instanceof SetTreeNode$1) {
            const tn = t2 as SetTreeNode$1<T>;
            if (c < 0) {
                return SetTreeModule_rebalance<T>(SetTreeModule_add<T>(comparer, k, SetTreeNode$1__get_Left<T>(tn)), SetTreeLeaf$1__get_Key<T>(tn), SetTreeNode$1__get_Right<T>(tn));
            }
            else if (c === 0) {
                return t;
            }
            else {
                return SetTreeModule_rebalance<T>(SetTreeNode$1__get_Left<T>(tn), SetTreeLeaf$1__get_Key<T>(tn), SetTreeModule_add<T>(comparer, k, SetTreeNode$1__get_Right<T>(tn)));
            }
        }
        else {
            const c_1: int32 = comparer.Compare(k, SetTreeLeaf$1__get_Key<T>(t2)) | 0;
            if (c_1 < 0) {
                return SetTreeNode$1_$ctor_5F465FC9<T>(k, SetTreeModule_empty<T>(), t, 2);
            }
            else if (c_1 === 0) {
                return t;
            }
            else {
                return SetTreeNode$1_$ctor_5F465FC9<T>(k, t, SetTreeModule_empty<T>(), 2);
            }
        }
    }
    else {
        return SetTreeLeaf$1_$ctor_2B595<T>(k);
    }
}

export function SetTreeModule_balance<T>(comparer: IComparer<T>, t1: Option<SetTreeLeaf$1<T>>, k: T, t2: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    if (t1 != null) {
        const t1$0027: SetTreeLeaf$1<T> = value_3(t1);
        if (t2 != null) {
            const t2$0027: SetTreeLeaf$1<T> = value_3(t2);
            if (t1$0027 instanceof SetTreeNode$1) {
                const t1n = t1$0027 as SetTreeNode$1<T>;
                if (t2$0027 instanceof SetTreeNode$1) {
                    const t2n = t2$0027 as SetTreeNode$1<T>;
                    if ((SetTreeNode$1__get_Height<T>(t1n) + 2) < SetTreeNode$1__get_Height<T>(t2n)) {
                        return SetTreeModule_rebalance<T>(SetTreeModule_balance<T>(comparer, t1, k, SetTreeNode$1__get_Left<T>(t2n)), SetTreeLeaf$1__get_Key<T>(t2n), SetTreeNode$1__get_Right<T>(t2n));
                    }
                    else if ((SetTreeNode$1__get_Height<T>(t2n) + 2) < SetTreeNode$1__get_Height<T>(t1n)) {
                        return SetTreeModule_rebalance<T>(SetTreeNode$1__get_Left<T>(t1n), SetTreeLeaf$1__get_Key<T>(t1n), SetTreeModule_balance<T>(comparer, SetTreeNode$1__get_Right<T>(t1n), k, t2));
                    }
                    else {
                        return SetTreeModule_mk<T>(t1, k, t2);
                    }
                }
                else {
                    return SetTreeModule_add<T>(comparer, k, SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2$0027), t1));
                }
            }
            else {
                return SetTreeModule_add<T>(comparer, k, SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(t1$0027), t2));
            }
        }
        else {
            return SetTreeModule_add<T>(comparer, k, t1);
        }
    }
    else {
        return SetTreeModule_add<T>(comparer, k, t2);
    }
}

export function SetTreeModule_split<T>(comparer: IComparer<T>, pivot: T, t: Option<SetTreeLeaf$1<T>>): [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>] {
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        if (t2 instanceof SetTreeNode$1) {
            const tn = t2 as SetTreeNode$1<T>;
            const c: int32 = comparer.Compare(pivot, SetTreeLeaf$1__get_Key<T>(tn)) | 0;
            if (c < 0) {
                const patternInput: [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>] = SetTreeModule_split<T>(comparer, pivot, SetTreeNode$1__get_Left<T>(tn));
                return [patternInput[0], patternInput[1], SetTreeModule_balance<T>(comparer, patternInput[2], SetTreeLeaf$1__get_Key<T>(tn), SetTreeNode$1__get_Right<T>(tn))] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
            }
            else if (c === 0) {
                return [SetTreeNode$1__get_Left<T>(tn), true, SetTreeNode$1__get_Right<T>(tn)] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
            }
            else {
                const patternInput_1: [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>] = SetTreeModule_split<T>(comparer, pivot, SetTreeNode$1__get_Right<T>(tn));
                return [SetTreeModule_balance<T>(comparer, SetTreeNode$1__get_Left<T>(tn), SetTreeLeaf$1__get_Key<T>(tn), patternInput_1[0]), patternInput_1[1], patternInput_1[2]] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
            }
        }
        else {
            const c_1: int32 = comparer.Compare(SetTreeLeaf$1__get_Key<T>(t2), pivot) | 0;
            if (c_1 < 0) {
                return [t, false, SetTreeModule_empty<T>()] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
            }
            else if (c_1 === 0) {
                return [SetTreeModule_empty<T>(), true, SetTreeModule_empty<T>()] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
            }
            else {
                return [SetTreeModule_empty<T>(), false, t] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
            }
        }
    }
    else {
        return [SetTreeModule_empty<T>(), false, SetTreeModule_empty<T>()] as [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>];
    }
}

export function SetTreeModule_spliceOutSuccessor<T>(t: Option<SetTreeLeaf$1<T>>): [T, Option<SetTreeLeaf$1<T>>] {
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        if (t2 instanceof SetTreeNode$1) {
            const tn = t2 as SetTreeNode$1<T>;
            if (SetTreeNode$1__get_Left<T>(tn) == null) {
                return [SetTreeLeaf$1__get_Key<T>(tn), SetTreeNode$1__get_Right<T>(tn)] as [T, Option<SetTreeLeaf$1<T>>];
            }
            else {
                const patternInput: [T, Option<SetTreeLeaf$1<T>>] = SetTreeModule_spliceOutSuccessor<T>(SetTreeNode$1__get_Left<T>(tn));
                return [patternInput[0], SetTreeModule_mk<T>(patternInput[1], SetTreeLeaf$1__get_Key<T>(tn), SetTreeNode$1__get_Right<T>(tn))] as [T, Option<SetTreeLeaf$1<T>>];
            }
        }
        else {
            return [SetTreeLeaf$1__get_Key<T>(t2), SetTreeModule_empty<T>()] as [T, Option<SetTreeLeaf$1<T>>];
        }
    }
    else {
        throw new Error("internal error: Set.spliceOutSuccessor");
    }
}

export function SetTreeModule_remove<T>(comparer: IComparer<T>, k: T, t: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        const c: int32 = comparer.Compare(k, SetTreeLeaf$1__get_Key<T>(t2)) | 0;
        if (t2 instanceof SetTreeNode$1) {
            const tn = t2 as SetTreeNode$1<T>;
            if (c < 0) {
                return SetTreeModule_rebalance<T>(SetTreeModule_remove<T>(comparer, k, SetTreeNode$1__get_Left<T>(tn)), SetTreeLeaf$1__get_Key<T>(tn), SetTreeNode$1__get_Right<T>(tn));
            }
            else if (c === 0) {
                if (SetTreeNode$1__get_Left<T>(tn) == null) {
                    return SetTreeNode$1__get_Right<T>(tn);
                }
                else if (SetTreeNode$1__get_Right<T>(tn) == null) {
                    return SetTreeNode$1__get_Left<T>(tn);
                }
                else {
                    const patternInput: [T, Option<SetTreeLeaf$1<T>>] = SetTreeModule_spliceOutSuccessor<T>(SetTreeNode$1__get_Right<T>(tn));
                    return SetTreeModule_mk<T>(SetTreeNode$1__get_Left<T>(tn), patternInput[0], patternInput[1]);
                }
            }
            else {
                return SetTreeModule_rebalance<T>(SetTreeNode$1__get_Left<T>(tn), SetTreeLeaf$1__get_Key<T>(tn), SetTreeModule_remove<T>(comparer, k, SetTreeNode$1__get_Right<T>(tn)));
            }
        }
        else if (c === 0) {
            return SetTreeModule_empty<T>();
        }
        else {
            return t;
        }
    }
    else {
        return t;
    }
}

export function SetTreeModule_mem<T>(comparer_mut: IComparer<T>, k_mut: T, t_mut: Option<SetTreeLeaf$1<T>>): boolean {
    SetTreeModule_mem:
    while (true) {
        const comparer: IComparer<T> = comparer_mut, k: T = k_mut, t: Option<SetTreeLeaf$1<T>> = t_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            const c: int32 = comparer.Compare(k, SetTreeLeaf$1__get_Key<T>(t2)) | 0;
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                if (c < 0) {
                    comparer_mut = comparer;
                    k_mut = k;
                    t_mut = SetTreeNode$1__get_Left<T>(tn);
                    continue SetTreeModule_mem;
                }
                else if (c === 0) {
                    return true;
                }
                else {
                    comparer_mut = comparer;
                    k_mut = k;
                    t_mut = SetTreeNode$1__get_Right<T>(tn);
                    continue SetTreeModule_mem;
                }
            }
            else {
                return c === 0;
            }
        }
        else {
            return false;
        }
        break;
    }
}

export function SetTreeModule_iter<T>(f_mut: ((arg0: T) => void), t_mut: Option<SetTreeLeaf$1<T>>): void {
    SetTreeModule_iter:
    while (true) {
        const f: ((arg0: T) => void) = f_mut, t: Option<SetTreeLeaf$1<T>> = t_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                SetTreeModule_iter<T>(f, SetTreeNode$1__get_Left<T>(tn));
                f(SetTreeLeaf$1__get_Key<T>(tn));
                f_mut = f;
                t_mut = SetTreeNode$1__get_Right<T>(tn);
                continue SetTreeModule_iter;
            }
            else {
                f(SetTreeLeaf$1__get_Key<T>(t2));
            }
        }
        break;
    }
}

export function SetTreeModule_foldBackOpt<T, $a>(f_mut: any, t_mut: Option<SetTreeLeaf$1<T>>, x_mut: $a): $a {
    SetTreeModule_foldBackOpt:
    while (true) {
        const f: any = f_mut, t: Option<SetTreeLeaf$1<T>> = t_mut, x: $a = x_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                f_mut = f;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                x_mut = f(SetTreeLeaf$1__get_Key<T>(tn), SetTreeModule_foldBackOpt<T, $a>(f, SetTreeNode$1__get_Right<T>(tn), x));
                continue SetTreeModule_foldBackOpt;
            }
            else {
                return f(SetTreeLeaf$1__get_Key<T>(t2), x);
            }
        }
        else {
            return x;
        }
        break;
    }
}

export function SetTreeModule_foldBack<$a, $b>(f: ((arg0: $a, arg1: $b) => $b), m: Option<SetTreeLeaf$1<$a>>, x: $b): $b {
    return SetTreeModule_foldBackOpt<$a, $b>(f, m, x);
}

export function SetTreeModule_foldOpt<$a, T>(f_mut: any, x_mut: $a, t_mut: Option<SetTreeLeaf$1<T>>): $a {
    SetTreeModule_foldOpt:
    while (true) {
        const f: any = f_mut, x: $a = x_mut, t: Option<SetTreeLeaf$1<T>> = t_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                f_mut = f;
                x_mut = f(SetTreeModule_foldOpt<$a, T>(f, x, SetTreeNode$1__get_Left<T>(tn)), SetTreeLeaf$1__get_Key<T>(tn));
                t_mut = SetTreeNode$1__get_Right<T>(tn);
                continue SetTreeModule_foldOpt;
            }
            else {
                return f(x, SetTreeLeaf$1__get_Key<T>(t2));
            }
        }
        else {
            return x;
        }
        break;
    }
}

export function SetTreeModule_fold<$a, $b>(f: ((arg0: $a, arg1: $b) => $a), x: $a, m: Option<SetTreeLeaf$1<$b>>): $a {
    return SetTreeModule_foldOpt<$a, $b>(f, x, m);
}

export function SetTreeModule_forall<T>(f_mut: ((arg0: T) => boolean), t_mut: Option<SetTreeLeaf$1<T>>): boolean {
    SetTreeModule_forall:
    while (true) {
        const f: ((arg0: T) => boolean) = f_mut, t: Option<SetTreeLeaf$1<T>> = t_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                if (f(SetTreeLeaf$1__get_Key<T>(tn)) && SetTreeModule_forall<T>(f, SetTreeNode$1__get_Left<T>(tn))) {
                    f_mut = f;
                    t_mut = SetTreeNode$1__get_Right<T>(tn);
                    continue SetTreeModule_forall;
                }
                else {
                    return false;
                }
            }
            else {
                return f(SetTreeLeaf$1__get_Key<T>(t2));
            }
        }
        else {
            return true;
        }
        break;
    }
}

export function SetTreeModule_exists<T>(f_mut: ((arg0: T) => boolean), t_mut: Option<SetTreeLeaf$1<T>>): boolean {
    SetTreeModule_exists:
    while (true) {
        const f: ((arg0: T) => boolean) = f_mut, t: Option<SetTreeLeaf$1<T>> = t_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                if (f(SetTreeLeaf$1__get_Key<T>(tn)) ? true : SetTreeModule_exists<T>(f, SetTreeNode$1__get_Left<T>(tn))) {
                    return true;
                }
                else {
                    f_mut = f;
                    t_mut = SetTreeNode$1__get_Right<T>(tn);
                    continue SetTreeModule_exists;
                }
            }
            else {
                return f(SetTreeLeaf$1__get_Key<T>(t2));
            }
        }
        else {
            return false;
        }
        break;
    }
}

export function SetTreeModule_subset<$a>(comparer: IComparer<$a>, a: Option<SetTreeLeaf$1<$a>>, b: Option<SetTreeLeaf$1<$a>>): boolean {
    return SetTreeModule_forall<$a>((x: $a): boolean => SetTreeModule_mem<$a>(comparer, x, b), a);
}

export function SetTreeModule_properSubset<$a>(comparer: IComparer<$a>, a: Option<SetTreeLeaf$1<$a>>, b: Option<SetTreeLeaf$1<$a>>): boolean {
    if (SetTreeModule_forall<$a>((x: $a): boolean => SetTreeModule_mem<$a>(comparer, x, b), a)) {
        return SetTreeModule_exists<$a>((x_1: $a): boolean => !SetTreeModule_mem<$a>(comparer, x_1, a), b);
    }
    else {
        return false;
    }
}

export function SetTreeModule_filterAux<T>(comparer_mut: IComparer<T>, f_mut: ((arg0: T) => boolean), t_mut: Option<SetTreeLeaf$1<T>>, acc_mut: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    SetTreeModule_filterAux:
    while (true) {
        const comparer: IComparer<T> = comparer_mut, f: ((arg0: T) => boolean) = f_mut, t: Option<SetTreeLeaf$1<T>> = t_mut, acc: Option<SetTreeLeaf$1<T>> = acc_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                const acc_1: Option<SetTreeLeaf$1<T>> = f(SetTreeLeaf$1__get_Key<T>(tn)) ? SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(tn), acc) : acc;
                comparer_mut = comparer;
                f_mut = f;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                acc_mut = SetTreeModule_filterAux<T>(comparer, f, SetTreeNode$1__get_Right<T>(tn), acc_1);
                continue SetTreeModule_filterAux;
            }
            else if (f(SetTreeLeaf$1__get_Key<T>(t2))) {
                return SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2), acc);
            }
            else {
                return acc;
            }
        }
        else {
            return acc;
        }
        break;
    }
}

export function SetTreeModule_filter<$a>(comparer: IComparer<$a>, f: ((arg0: $a) => boolean), s: Option<SetTreeLeaf$1<$a>>): Option<SetTreeLeaf$1<$a>> {
    return SetTreeModule_filterAux<$a>(comparer, f, s, SetTreeModule_empty<$a>());
}

export function SetTreeModule_diffAux<T>(comparer_mut: IComparer<T>, t_mut: Option<SetTreeLeaf$1<T>>, acc_mut: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    SetTreeModule_diffAux:
    while (true) {
        const comparer: IComparer<T> = comparer_mut, t: Option<SetTreeLeaf$1<T>> = t_mut, acc: Option<SetTreeLeaf$1<T>> = acc_mut;
        if (acc == null) {
            return acc;
        }
        else if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                comparer_mut = comparer;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                acc_mut = SetTreeModule_diffAux<T>(comparer, SetTreeNode$1__get_Right<T>(tn), SetTreeModule_remove<T>(comparer, SetTreeLeaf$1__get_Key<T>(tn), acc));
                continue SetTreeModule_diffAux;
            }
            else {
                return SetTreeModule_remove<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2), acc);
            }
        }
        else {
            return acc;
        }
        break;
    }
}

export function SetTreeModule_diff<$a>(comparer: IComparer<$a>, a: Option<SetTreeLeaf$1<$a>>, b: Option<SetTreeLeaf$1<$a>>): Option<SetTreeLeaf$1<$a>> {
    return SetTreeModule_diffAux<$a>(comparer, b, a);
}

export function SetTreeModule_union<T>(comparer: IComparer<T>, t1: Option<SetTreeLeaf$1<T>>, t2: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    if (t1 != null) {
        const t1$0027: SetTreeLeaf$1<T> = value_3(t1);
        if (t2 != null) {
            const t2$0027: SetTreeLeaf$1<T> = value_3(t2);
            if (t1$0027 instanceof SetTreeNode$1) {
                const t1n = t1$0027 as SetTreeNode$1<T>;
                if (t2$0027 instanceof SetTreeNode$1) {
                    const t2n = t2$0027 as SetTreeNode$1<T>;
                    if (SetTreeNode$1__get_Height<T>(t1n) > SetTreeNode$1__get_Height<T>(t2n)) {
                        const patternInput: [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>] = SetTreeModule_split<T>(comparer, SetTreeLeaf$1__get_Key<T>(t1n), t2);
                        return SetTreeModule_balance<T>(comparer, SetTreeModule_union<T>(comparer, SetTreeNode$1__get_Left<T>(t1n), patternInput[0]), SetTreeLeaf$1__get_Key<T>(t1n), SetTreeModule_union<T>(comparer, SetTreeNode$1__get_Right<T>(t1n), patternInput[2]));
                    }
                    else {
                        const patternInput_1: [Option<SetTreeLeaf$1<T>>, boolean, Option<SetTreeLeaf$1<T>>] = SetTreeModule_split<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2n), t1);
                        return SetTreeModule_balance<T>(comparer, SetTreeModule_union<T>(comparer, SetTreeNode$1__get_Left<T>(t2n), patternInput_1[0]), SetTreeLeaf$1__get_Key<T>(t2n), SetTreeModule_union<T>(comparer, SetTreeNode$1__get_Right<T>(t2n), patternInput_1[2]));
                    }
                }
                else {
                    return SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2$0027), t1);
                }
            }
            else {
                return SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(t1$0027), t2);
            }
        }
        else {
            return t1;
        }
    }
    else {
        return t2;
    }
}

export function SetTreeModule_intersectionAux<T>(comparer_mut: IComparer<T>, b_mut: Option<SetTreeLeaf$1<T>>, t_mut: Option<SetTreeLeaf$1<T>>, acc_mut: Option<SetTreeLeaf$1<T>>): Option<SetTreeLeaf$1<T>> {
    SetTreeModule_intersectionAux:
    while (true) {
        const comparer: IComparer<T> = comparer_mut, b: Option<SetTreeLeaf$1<T>> = b_mut, t: Option<SetTreeLeaf$1<T>> = t_mut, acc: Option<SetTreeLeaf$1<T>> = acc_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                const acc_1: Option<SetTreeLeaf$1<T>> = SetTreeModule_intersectionAux<T>(comparer, b, SetTreeNode$1__get_Right<T>(tn), acc);
                const acc_2: Option<SetTreeLeaf$1<T>> = SetTreeModule_mem<T>(comparer, SetTreeLeaf$1__get_Key<T>(tn), b) ? SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(tn), acc_1) : acc_1;
                comparer_mut = comparer;
                b_mut = b;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                acc_mut = acc_2;
                continue SetTreeModule_intersectionAux;
            }
            else if (SetTreeModule_mem<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2), b)) {
                return SetTreeModule_add<T>(comparer, SetTreeLeaf$1__get_Key<T>(t2), acc);
            }
            else {
                return acc;
            }
        }
        else {
            return acc;
        }
        break;
    }
}

export function SetTreeModule_intersection<$a>(comparer: IComparer<$a>, a: Option<SetTreeLeaf$1<$a>>, b: Option<SetTreeLeaf$1<$a>>): Option<SetTreeLeaf$1<$a>> {
    return SetTreeModule_intersectionAux<$a>(comparer, b, a, SetTreeModule_empty<$a>());
}

export function SetTreeModule_partition1<$a>(comparer: IComparer<$a>, f: ((arg0: $a) => boolean), k: $a, acc1: Option<SetTreeLeaf$1<$a>>, acc2: Option<SetTreeLeaf$1<$a>>): [Option<SetTreeLeaf$1<$a>>, Option<SetTreeLeaf$1<$a>>] {
    if (f(k)) {
        return [SetTreeModule_add<$a>(comparer, k, acc1), acc2] as [Option<SetTreeLeaf$1<$a>>, Option<SetTreeLeaf$1<$a>>];
    }
    else {
        return [acc1, SetTreeModule_add<$a>(comparer, k, acc2)] as [Option<SetTreeLeaf$1<$a>>, Option<SetTreeLeaf$1<$a>>];
    }
}

export function SetTreeModule_partitionAux<T>(comparer_mut: IComparer<T>, f_mut: ((arg0: T) => boolean), t_mut: Option<SetTreeLeaf$1<T>>, acc__mut: Option<SetTreeLeaf$1<T>>, acc__1_mut: Option<SetTreeLeaf$1<T>>): [Option<SetTreeLeaf$1<T>>, Option<SetTreeLeaf$1<T>>] {
    SetTreeModule_partitionAux:
    while (true) {
        const comparer: IComparer<T> = comparer_mut, f: ((arg0: T) => boolean) = f_mut, t: Option<SetTreeLeaf$1<T>> = t_mut, acc_: Option<SetTreeLeaf$1<T>> = acc__mut, acc__1: Option<SetTreeLeaf$1<T>> = acc__1_mut;
        const acc = [acc_, acc__1] as [Option<SetTreeLeaf$1<T>>, Option<SetTreeLeaf$1<T>>];
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                const acc_1: [Option<SetTreeLeaf$1<T>>, Option<SetTreeLeaf$1<T>>] = SetTreeModule_partitionAux<T>(comparer, f, SetTreeNode$1__get_Right<T>(tn), acc[0], acc[1]);
                const acc_4: [Option<SetTreeLeaf$1<T>>, Option<SetTreeLeaf$1<T>>] = SetTreeModule_partition1<T>(comparer, f, SetTreeLeaf$1__get_Key<T>(tn), acc_1[0], acc_1[1]);
                comparer_mut = comparer;
                f_mut = f;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                acc__mut = acc_4[0];
                acc__1_mut = acc_4[1];
                continue SetTreeModule_partitionAux;
            }
            else {
                return SetTreeModule_partition1<T>(comparer, f, SetTreeLeaf$1__get_Key<T>(t2), acc[0], acc[1]);
            }
        }
        else {
            return acc;
        }
        break;
    }
}

export function SetTreeModule_partition<$a>(comparer: IComparer<$a>, f: ((arg0: $a) => boolean), s: Option<SetTreeLeaf$1<$a>>): [Option<SetTreeLeaf$1<$a>>, Option<SetTreeLeaf$1<$a>>] {
    return SetTreeModule_partitionAux<$a>(comparer, f, s, SetTreeModule_empty<$a>(), SetTreeModule_empty<$a>());
}

export function SetTreeModule_minimumElementAux<T>(t_mut: Option<SetTreeLeaf$1<T>>, n_mut: T): T {
    SetTreeModule_minimumElementAux:
    while (true) {
        const t: Option<SetTreeLeaf$1<T>> = t_mut, n: T = n_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                t_mut = SetTreeNode$1__get_Left<T>(tn);
                n_mut = SetTreeLeaf$1__get_Key<T>(tn);
                continue SetTreeModule_minimumElementAux;
            }
            else {
                return SetTreeLeaf$1__get_Key<T>(t2);
            }
        }
        else {
            return n;
        }
        break;
    }
}

export function SetTreeModule_minimumElementOpt<T>(t: Option<SetTreeLeaf$1<T>>): Option<T> {
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        if (t2 instanceof SetTreeNode$1) {
            const tn = t2 as SetTreeNode$1<T>;
            return some(SetTreeModule_minimumElementAux<T>(SetTreeNode$1__get_Left<T>(tn), SetTreeLeaf$1__get_Key<T>(tn)));
        }
        else {
            return some(SetTreeLeaf$1__get_Key<T>(t2));
        }
    }
    else {
        return undefined;
    }
}

export function SetTreeModule_maximumElementAux<T>(t_mut: Option<SetTreeLeaf$1<T>>, n_mut: T): T {
    SetTreeModule_maximumElementAux:
    while (true) {
        const t: Option<SetTreeLeaf$1<T>> = t_mut, n: T = n_mut;
        if (t != null) {
            const t2: SetTreeLeaf$1<T> = value_3(t);
            if (t2 instanceof SetTreeNode$1) {
                const tn = t2 as SetTreeNode$1<T>;
                t_mut = SetTreeNode$1__get_Right<T>(tn);
                n_mut = SetTreeLeaf$1__get_Key<T>(tn);
                continue SetTreeModule_maximumElementAux;
            }
            else {
                return SetTreeLeaf$1__get_Key<T>(t2);
            }
        }
        else {
            return n;
        }
        break;
    }
}

export function SetTreeModule_maximumElementOpt<T>(t: Option<SetTreeLeaf$1<T>>): Option<T> {
    if (t != null) {
        const t2: SetTreeLeaf$1<T> = value_3(t);
        if (t2 instanceof SetTreeNode$1) {
            const tn = t2 as SetTreeNode$1<T>;
            return some(SetTreeModule_maximumElementAux<T>(SetTreeNode$1__get_Right<T>(tn), SetTreeLeaf$1__get_Key<T>(tn)));
        }
        else {
            return some(SetTreeLeaf$1__get_Key<T>(t2));
        }
    }
    else {
        return undefined;
    }
}

export function SetTreeModule_minimumElement<$a>(s: Option<SetTreeLeaf$1<$a>>): $a {
    const matchValue: Option<$a> = SetTreeModule_minimumElementOpt<$a>(s);
    if (matchValue == null) {
        throw new Error("Set contains no elements");
    }
    else {
        return value_3(matchValue);
    }
}

export function SetTreeModule_maximumElement<$a>(s: Option<SetTreeLeaf$1<$a>>): $a {
    const matchValue: Option<$a> = SetTreeModule_maximumElementOpt<$a>(s);
    if (matchValue == null) {
        throw new Error("Set contains no elements");
    }
    else {
        return value_3(matchValue);
    }
}

export class SetTreeModule_SetIterator$1<T> extends Record {
    stack: FSharpList<Option<SetTreeLeaf$1<T>>>;
    started: boolean;
    constructor(stack: FSharpList<Option<SetTreeLeaf$1<T>>>, started: boolean) {
        super();
        this.stack = stack;
        this.started = started;
    }
}

export function SetTreeModule_SetIterator$1_$reflection(gen0: TypeInfo): TypeInfo {
    return record_type("Set.SetTreeModule.SetIterator`1", [gen0], SetTreeModule_SetIterator$1, () => [["stack", list_type(option_type(SetTreeLeaf$1_$reflection(gen0)))], ["started", bool_type]]);
}

export function SetTreeModule_collapseLHS<T>(stack_mut: FSharpList<Option<SetTreeLeaf$1<T>>>): FSharpList<Option<SetTreeLeaf$1<T>>> {
    SetTreeModule_collapseLHS:
    while (true) {
        const stack: FSharpList<Option<SetTreeLeaf$1<T>>> = stack_mut;
        if (!isEmpty_1(stack)) {
            const x: Option<SetTreeLeaf$1<T>> = head(stack);
            const rest: FSharpList<Option<SetTreeLeaf$1<T>>> = tail(stack);
            if (x != null) {
                const x2: SetTreeLeaf$1<T> = value_3(x);
                if (x2 instanceof SetTreeNode$1) {
                    const xn = x2 as SetTreeNode$1<T>;
                    stack_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(xn), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(xn)), SetTreeNode$1__get_Right<T>(xn)], rest);
                    continue SetTreeModule_collapseLHS;
                }
                else {
                    return stack;
                }
            }
            else {
                stack_mut = rest;
                continue SetTreeModule_collapseLHS;
            }
        }
        else {
            return empty_1<Option<SetTreeLeaf$1<T>>>();
        }
        break;
    }
}

export function SetTreeModule_mkIterator<$a>(s: Option<SetTreeLeaf$1<$a>>): SetTreeModule_SetIterator$1<$a> {
    return new SetTreeModule_SetIterator$1(SetTreeModule_collapseLHS<$a>(singleton_1(s)), false);
}

export function SetTreeModule_notStarted<$a>(): $a {
    throw new Error("Enumeration not started");
}

export function SetTreeModule_alreadyFinished<$a>(): $a {
    throw new Error("Enumeration already started");
}

export function SetTreeModule_current<$a>(i: SetTreeModule_SetIterator$1<$a>): $a {
    if (i.started) {
        const matchValue: FSharpList<Option<SetTreeLeaf$1<$a>>> = i.stack;
        if (isEmpty_1(matchValue)) {
            return SetTreeModule_alreadyFinished<$a>();
        }
        else if (head(matchValue) != null) {
            const t: SetTreeLeaf$1<$a> = value_3(head(matchValue));
            return SetTreeLeaf$1__get_Key<$a>(t);
        }
        else {
            throw new Error("Please report error: Set iterator, unexpected stack for current");
        }
    }
    else {
        return SetTreeModule_notStarted<$a>();
    }
}

export function SetTreeModule_moveNext<T>(i: SetTreeModule_SetIterator$1<T>): boolean {
    if (i.started) {
        const matchValue: FSharpList<Option<SetTreeLeaf$1<T>>> = i.stack;
        if (!isEmpty_1(matchValue)) {
            if (head(matchValue) != null) {
                const t: SetTreeLeaf$1<T> = value_3(head(matchValue));
                if (t instanceof SetTreeNode$1) {
                    throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
                }
                else {
                    i.stack = SetTreeModule_collapseLHS<T>(tail(matchValue));
                    return !isEmpty_1(i.stack);
                }
            }
            else {
                throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
            }
        }
        else {
            return false;
        }
    }
    else {
        i.started = true;
        return !isEmpty_1(i.stack);
    }
}

export function SetTreeModule_mkIEnumerator<a>(s: Option<SetTreeLeaf$1<a>>): IEnumerator<a> {
    let i: SetTreeModule_SetIterator$1<a> = SetTreeModule_mkIterator<a>(s);
    return {
        "System.Collections.Generic.IEnumerator`1.get_Current"(): a {
            return SetTreeModule_current<a>(i);
        },
        "System.Collections.IEnumerator.get_Current"(): any {
            return SetTreeModule_current<a>(i);
        },
        "System.Collections.IEnumerator.MoveNext"(): boolean {
            return SetTreeModule_moveNext<a>(i);
        },
        "System.Collections.IEnumerator.Reset"(): void {
            i = SetTreeModule_mkIterator<a>(s);
        },
        Dispose(): void {
        },
    };
}

/**
 * Set comparison.  Note this can be expensive.
 */
export function SetTreeModule_compareStacks<T>(comparer_mut: IComparer<T>, l1_mut: FSharpList<Option<SetTreeLeaf$1<T>>>, l2_mut: FSharpList<Option<SetTreeLeaf$1<T>>>): int32 {
    SetTreeModule_compareStacks:
    while (true) {
        const comparer: IComparer<T> = comparer_mut, l1: FSharpList<Option<SetTreeLeaf$1<T>>> = l1_mut, l2: FSharpList<Option<SetTreeLeaf$1<T>>> = l2_mut;
        if (!isEmpty_1(l1)) {
            if (!isEmpty_1(l2)) {
                if (head(l2) != null) {
                    if (head(l1) != null) {
                        const x1_3: SetTreeLeaf$1<T> = value_3(head(l1));
                        const x2_3: SetTreeLeaf$1<T> = value_3(head(l2));
                        if (x1_3 instanceof SetTreeNode$1) {
                            const x1n_2 = x1_3 as SetTreeNode$1<T>;
                            if (SetTreeNode$1__get_Left<T>(x1n_2) == null) {
                                if (x2_3 instanceof SetTreeNode$1) {
                                    const x2n_2 = x2_3 as SetTreeNode$1<T>;
                                    if (SetTreeNode$1__get_Left<T>(x2n_2) == null) {
                                        const c: int32 = comparer.Compare(SetTreeLeaf$1__get_Key<T>(x1n_2), SetTreeLeaf$1__get_Key<T>(x2n_2)) | 0;
                                        if (c !== 0) {
                                            return c | 0;
                                        }
                                        else {
                                            comparer_mut = comparer;
                                            l1_mut = cons(SetTreeNode$1__get_Right<T>(x1n_2), tail(l1));
                                            l2_mut = cons(SetTreeNode$1__get_Right<T>(x2n_2), tail(l2));
                                            continue SetTreeModule_compareStacks;
                                        }
                                    }
                                    else {
                                        let matchResult: int32, t1_6: FSharpList<Option<SetTreeLeaf$1<T>>>, x1_4: SetTreeLeaf$1<T>, t2_6: FSharpList<Option<SetTreeLeaf$1<T>>>, x2_4: SetTreeLeaf$1<T>;
                                        if (!isEmpty_1(l1)) {
                                            if (head(l1) != null) {
                                                matchResult = 0;
                                                t1_6 = tail(l1);
                                                x1_4 = value_3(head(l1));
                                            }
                                            else if (!isEmpty_1(l2)) {
                                                if (head(l2) != null) {
                                                    matchResult = 1;
                                                    t2_6 = tail(l2);
                                                    x2_4 = value_3(head(l2));
                                                }
                                                else {
                                                    matchResult = 2;
                                                }
                                            }
                                            else {
                                                matchResult = 2;
                                            }
                                        }
                                        else if (!isEmpty_1(l2)) {
                                            if (head(l2) != null) {
                                                matchResult = 1;
                                                t2_6 = tail(l2);
                                                x2_4 = value_3(head(l2));
                                            }
                                            else {
                                                matchResult = 2;
                                            }
                                        }
                                        else {
                                            matchResult = 2;
                                        }
                                        switch (matchResult) {
                                            case 0:
                                                if (x1_4! instanceof SetTreeNode$1) {
                                                    const x1n_3 = x1_4! as SetTreeNode$1<T>;
                                                    comparer_mut = comparer;
                                                    l1_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x1n_3), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x1n_3), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x1n_3), 0)], t1_6!);
                                                    l2_mut = l2;
                                                    continue SetTreeModule_compareStacks;
                                                }
                                                else {
                                                    comparer_mut = comparer;
                                                    l1_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x1_4!))], t1_6!);
                                                    l2_mut = l2;
                                                    continue SetTreeModule_compareStacks;
                                                }
                                            case 1:
                                                if (x2_4! instanceof SetTreeNode$1) {
                                                    const x2n_3 = x2_4! as SetTreeNode$1<T>;
                                                    comparer_mut = comparer;
                                                    l1_mut = l1;
                                                    l2_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x2n_3), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x2n_3), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x2n_3), 0)], t2_6!);
                                                    continue SetTreeModule_compareStacks;
                                                }
                                                else {
                                                    comparer_mut = comparer;
                                                    l1_mut = l1;
                                                    l2_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x2_4!))], t2_6!);
                                                    continue SetTreeModule_compareStacks;
                                                }
                                            default:
                                                throw new Error("unexpected state in SetTree.compareStacks");
                                        }
                                    }
                                }
                                else {
                                    const c_1: int32 = comparer.Compare(SetTreeLeaf$1__get_Key<T>(x1n_2), SetTreeLeaf$1__get_Key<T>(x2_3)) | 0;
                                    if (c_1 !== 0) {
                                        return c_1 | 0;
                                    }
                                    else {
                                        comparer_mut = comparer;
                                        l1_mut = cons(SetTreeNode$1__get_Right<T>(x1n_2), tail(l1));
                                        l2_mut = cons(SetTreeModule_empty<T>(), tail(l2));
                                        continue SetTreeModule_compareStacks;
                                    }
                                }
                            }
                            else {
                                let matchResult_1: int32, t1_7: FSharpList<Option<SetTreeLeaf$1<T>>>, x1_5: SetTreeLeaf$1<T>, t2_7: FSharpList<Option<SetTreeLeaf$1<T>>>, x2_5: SetTreeLeaf$1<T>;
                                if (!isEmpty_1(l1)) {
                                    if (head(l1) != null) {
                                        matchResult_1 = 0;
                                        t1_7 = tail(l1);
                                        x1_5 = value_3(head(l1));
                                    }
                                    else if (!isEmpty_1(l2)) {
                                        if (head(l2) != null) {
                                            matchResult_1 = 1;
                                            t2_7 = tail(l2);
                                            x2_5 = value_3(head(l2));
                                        }
                                        else {
                                            matchResult_1 = 2;
                                        }
                                    }
                                    else {
                                        matchResult_1 = 2;
                                    }
                                }
                                else if (!isEmpty_1(l2)) {
                                    if (head(l2) != null) {
                                        matchResult_1 = 1;
                                        t2_7 = tail(l2);
                                        x2_5 = value_3(head(l2));
                                    }
                                    else {
                                        matchResult_1 = 2;
                                    }
                                }
                                else {
                                    matchResult_1 = 2;
                                }
                                switch (matchResult_1) {
                                    case 0:
                                        if (x1_5! instanceof SetTreeNode$1) {
                                            const x1n_4 = x1_5! as SetTreeNode$1<T>;
                                            comparer_mut = comparer;
                                            l1_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x1n_4), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x1n_4), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x1n_4), 0)], t1_7!);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        }
                                        else {
                                            comparer_mut = comparer;
                                            l1_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x1_5!))], t1_7!);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        }
                                    case 1:
                                        if (x2_5! instanceof SetTreeNode$1) {
                                            const x2n_4 = x2_5! as SetTreeNode$1<T>;
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x2n_4), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x2n_4), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x2n_4), 0)], t2_7!);
                                            continue SetTreeModule_compareStacks;
                                        }
                                        else {
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x2_5!))], t2_7!);
                                            continue SetTreeModule_compareStacks;
                                        }
                                    default:
                                        throw new Error("unexpected state in SetTree.compareStacks");
                                }
                            }
                        }
                        else if (x2_3 instanceof SetTreeNode$1) {
                            const x2n_5 = x2_3 as SetTreeNode$1<T>;
                            if (SetTreeNode$1__get_Left<T>(x2n_5) == null) {
                                const c_2: int32 = comparer.Compare(SetTreeLeaf$1__get_Key<T>(x1_3), SetTreeLeaf$1__get_Key<T>(x2n_5)) | 0;
                                if (c_2 !== 0) {
                                    return c_2 | 0;
                                }
                                else {
                                    comparer_mut = comparer;
                                    l1_mut = cons(SetTreeModule_empty<T>(), tail(l1));
                                    l2_mut = cons(SetTreeNode$1__get_Right<T>(x2n_5), tail(l2));
                                    continue SetTreeModule_compareStacks;
                                }
                            }
                            else {
                                let matchResult_2: int32, t1_8: FSharpList<Option<SetTreeLeaf$1<T>>>, x1_6: SetTreeLeaf$1<T>, t2_8: FSharpList<Option<SetTreeLeaf$1<T>>>, x2_6: SetTreeLeaf$1<T>;
                                if (!isEmpty_1(l1)) {
                                    if (head(l1) != null) {
                                        matchResult_2 = 0;
                                        t1_8 = tail(l1);
                                        x1_6 = value_3(head(l1));
                                    }
                                    else if (!isEmpty_1(l2)) {
                                        if (head(l2) != null) {
                                            matchResult_2 = 1;
                                            t2_8 = tail(l2);
                                            x2_6 = value_3(head(l2));
                                        }
                                        else {
                                            matchResult_2 = 2;
                                        }
                                    }
                                    else {
                                        matchResult_2 = 2;
                                    }
                                }
                                else if (!isEmpty_1(l2)) {
                                    if (head(l2) != null) {
                                        matchResult_2 = 1;
                                        t2_8 = tail(l2);
                                        x2_6 = value_3(head(l2));
                                    }
                                    else {
                                        matchResult_2 = 2;
                                    }
                                }
                                else {
                                    matchResult_2 = 2;
                                }
                                switch (matchResult_2) {
                                    case 0:
                                        if (x1_6! instanceof SetTreeNode$1) {
                                            const x1n_5 = x1_6! as SetTreeNode$1<T>;
                                            comparer_mut = comparer;
                                            l1_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x1n_5), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x1n_5), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x1n_5), 0)], t1_8!);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        }
                                        else {
                                            comparer_mut = comparer;
                                            l1_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x1_6!))], t1_8!);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        }
                                    case 1:
                                        if (x2_6! instanceof SetTreeNode$1) {
                                            const x2n_6 = x2_6! as SetTreeNode$1<T>;
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x2n_6), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x2n_6), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x2n_6), 0)], t2_8!);
                                            continue SetTreeModule_compareStacks;
                                        }
                                        else {
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x2_6!))], t2_8!);
                                            continue SetTreeModule_compareStacks;
                                        }
                                    default:
                                        throw new Error("unexpected state in SetTree.compareStacks");
                                }
                            }
                        }
                        else {
                            const c_3: int32 = comparer.Compare(SetTreeLeaf$1__get_Key<T>(x1_3), SetTreeLeaf$1__get_Key<T>(x2_3)) | 0;
                            if (c_3 !== 0) {
                                return c_3 | 0;
                            }
                            else {
                                comparer_mut = comparer;
                                l1_mut = tail(l1);
                                l2_mut = tail(l2);
                                continue SetTreeModule_compareStacks;
                            }
                        }
                    }
                    else {
                        const x2: SetTreeLeaf$1<T> = value_3(head(l2));
                        let matchResult_3: int32, t1_2: FSharpList<Option<SetTreeLeaf$1<T>>>, x1: SetTreeLeaf$1<T>, t2_2: FSharpList<Option<SetTreeLeaf$1<T>>>, x2_1: SetTreeLeaf$1<T>;
                        if (!isEmpty_1(l1)) {
                            if (head(l1) != null) {
                                matchResult_3 = 0;
                                t1_2 = tail(l1);
                                x1 = value_3(head(l1));
                            }
                            else if (!isEmpty_1(l2)) {
                                if (head(l2) != null) {
                                    matchResult_3 = 1;
                                    t2_2 = tail(l2);
                                    x2_1 = value_3(head(l2));
                                }
                                else {
                                    matchResult_3 = 2;
                                }
                            }
                            else {
                                matchResult_3 = 2;
                            }
                        }
                        else if (!isEmpty_1(l2)) {
                            if (head(l2) != null) {
                                matchResult_3 = 1;
                                t2_2 = tail(l2);
                                x2_1 = value_3(head(l2));
                            }
                            else {
                                matchResult_3 = 2;
                            }
                        }
                        else {
                            matchResult_3 = 2;
                        }
                        switch (matchResult_3) {
                            case 0:
                                if (x1! instanceof SetTreeNode$1) {
                                    const x1n = x1! as SetTreeNode$1<T>;
                                    comparer_mut = comparer;
                                    l1_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x1n), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x1n), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x1n), 0)], t1_2!);
                                    l2_mut = l2;
                                    continue SetTreeModule_compareStacks;
                                }
                                else {
                                    comparer_mut = comparer;
                                    l1_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x1!))], t1_2!);
                                    l2_mut = l2;
                                    continue SetTreeModule_compareStacks;
                                }
                            case 1:
                                if (x2_1! instanceof SetTreeNode$1) {
                                    const x2n = x2_1! as SetTreeNode$1<T>;
                                    comparer_mut = comparer;
                                    l1_mut = l1;
                                    l2_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x2n), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x2n), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x2n), 0)], t2_2!);
                                    continue SetTreeModule_compareStacks;
                                }
                                else {
                                    comparer_mut = comparer;
                                    l1_mut = l1;
                                    l2_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x2_1!))], t2_2!);
                                    continue SetTreeModule_compareStacks;
                                }
                            default:
                                throw new Error("unexpected state in SetTree.compareStacks");
                        }
                    }
                }
                else if (head(l1) != null) {
                    const x1_1: SetTreeLeaf$1<T> = value_3(head(l1));
                    let matchResult_4: int32, t1_4: FSharpList<Option<SetTreeLeaf$1<T>>>, x1_2: SetTreeLeaf$1<T>, t2_4: FSharpList<Option<SetTreeLeaf$1<T>>>, x2_2: SetTreeLeaf$1<T>;
                    if (!isEmpty_1(l1)) {
                        if (head(l1) != null) {
                            matchResult_4 = 0;
                            t1_4 = tail(l1);
                            x1_2 = value_3(head(l1));
                        }
                        else if (!isEmpty_1(l2)) {
                            if (head(l2) != null) {
                                matchResult_4 = 1;
                                t2_4 = tail(l2);
                                x2_2 = value_3(head(l2));
                            }
                            else {
                                matchResult_4 = 2;
                            }
                        }
                        else {
                            matchResult_4 = 2;
                        }
                    }
                    else if (!isEmpty_1(l2)) {
                        if (head(l2) != null) {
                            matchResult_4 = 1;
                            t2_4 = tail(l2);
                            x2_2 = value_3(head(l2));
                        }
                        else {
                            matchResult_4 = 2;
                        }
                    }
                    else {
                        matchResult_4 = 2;
                    }
                    switch (matchResult_4) {
                        case 0:
                            if (x1_2! instanceof SetTreeNode$1) {
                                const x1n_1 = x1_2! as SetTreeNode$1<T>;
                                comparer_mut = comparer;
                                l1_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x1n_1), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x1n_1), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x1n_1), 0)], t1_4!);
                                l2_mut = l2;
                                continue SetTreeModule_compareStacks;
                            }
                            else {
                                comparer_mut = comparer;
                                l1_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x1_2!))], t1_4!);
                                l2_mut = l2;
                                continue SetTreeModule_compareStacks;
                            }
                        case 1:
                            if (x2_2! instanceof SetTreeNode$1) {
                                const x2n_1 = x2_2! as SetTreeNode$1<T>;
                                comparer_mut = comparer;
                                l1_mut = l1;
                                l2_mut = ofArrayWithTail([SetTreeNode$1__get_Left<T>(x2n_1), SetTreeNode$1_$ctor_5F465FC9<T>(SetTreeLeaf$1__get_Key<T>(x2n_1), SetTreeModule_empty<T>(), SetTreeNode$1__get_Right<T>(x2n_1), 0)], t2_4!);
                                continue SetTreeModule_compareStacks;
                            }
                            else {
                                comparer_mut = comparer;
                                l1_mut = l1;
                                l2_mut = ofArrayWithTail([SetTreeModule_empty<T>(), SetTreeLeaf$1_$ctor_2B595<T>(SetTreeLeaf$1__get_Key<T>(x2_2!))], t2_4!);
                                continue SetTreeModule_compareStacks;
                            }
                        default:
                            throw new Error("unexpected state in SetTree.compareStacks");
                    }
                }
                else {
                    comparer_mut = comparer;
                    l1_mut = tail(l1);
                    l2_mut = tail(l2);
                    continue SetTreeModule_compareStacks;
                }
            }
            else {
                return 1;
            }
        }
        else if (isEmpty_1(l2)) {
            return 0;
        }
        else {
            return -1;
        }
        break;
    }
}

export function SetTreeModule_compare<T>(comparer: IComparer<T>, t1: Option<SetTreeLeaf$1<T>>, t2: Option<SetTreeLeaf$1<T>>): int32 {
    if (t1 == null) {
        if (t2 == null) {
            return 0;
        }
        else {
            return -1;
        }
    }
    else if (t2 == null) {
        return 1;
    }
    else {
        return SetTreeModule_compareStacks<T>(comparer, singleton_1(t1), singleton_1(t2)) | 0;
    }
}

export function SetTreeModule_choose<$a>(s: Option<SetTreeLeaf$1<$a>>): $a {
    return SetTreeModule_minimumElement<$a>(s);
}

export function SetTreeModule_toList<T>(t: Option<SetTreeLeaf$1<T>>): FSharpList<T> {
    const loop = (t$0027_mut: Option<SetTreeLeaf$1<T>>, acc_mut: FSharpList<T>): FSharpList<T> => {
        loop:
        while (true) {
            const t$0027: Option<SetTreeLeaf$1<T>> = t$0027_mut, acc: FSharpList<T> = acc_mut;
            if (t$0027 != null) {
                const t2: SetTreeLeaf$1<T> = value_3(t$0027);
                if (t2 instanceof SetTreeNode$1) {
                    const tn = t2 as SetTreeNode$1<T>;
                    t$0027_mut = SetTreeNode$1__get_Left<T>(tn);
                    acc_mut = cons(SetTreeLeaf$1__get_Key<T>(tn), loop(SetTreeNode$1__get_Right<T>(tn), acc));
                    continue loop;
                }
                else {
                    return cons(SetTreeLeaf$1__get_Key<T>(t2), acc);
                }
            }
            else {
                return acc;
            }
            break;
        }
    };
    return loop(t, empty_1<T>());
}

export function SetTreeModule_copyToArray<$a>(s: Option<SetTreeLeaf$1<$a>>, arr: $a[], i: int32): void {
    let j: int32 = i;
    SetTreeModule_iter<$a>((x: $a): void => {
        setItem(arr, j, x);
        j = ((j + 1) | 0);
    }, s);
}

export function SetTreeModule_toArray<$a>(s: Option<SetTreeLeaf$1<$a>>): $a[] {
    const n: int32 = SetTreeModule_count<$a>(s) | 0;
    const res: $a[] = fill(new Array(n), 0, n, null);
    SetTreeModule_copyToArray<$a>(s, res, 0);
    return res;
}

export function SetTreeModule_mkFromEnumerator<$a>(comparer_mut: IComparer<$a>, acc_mut: Option<SetTreeLeaf$1<$a>>, e_mut: IEnumerator<$a>): Option<SetTreeLeaf$1<$a>> {
    SetTreeModule_mkFromEnumerator:
    while (true) {
        const comparer: IComparer<$a> = comparer_mut, acc: Option<SetTreeLeaf$1<$a>> = acc_mut, e: IEnumerator<$a> = e_mut;
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
            comparer_mut = comparer;
            acc_mut = SetTreeModule_add<$a>(comparer, e["System.Collections.Generic.IEnumerator`1.get_Current"](), acc);
            e_mut = e;
            continue SetTreeModule_mkFromEnumerator;
        }
        else {
            return acc;
        }
        break;
    }
}

export function SetTreeModule_ofArray<$a>(comparer: IComparer<$a>, l: $a[]): Option<SetTreeLeaf$1<$a>> {
    return fold_1<$a, Option<SetTreeLeaf$1<$a>>>((acc: Option<SetTreeLeaf$1<$a>>, k: $a): Option<SetTreeLeaf$1<$a>> => SetTreeModule_add<$a>(comparer, k, acc), SetTreeModule_empty<$a>(), l);
}

export function SetTreeModule_ofList<$a>(comparer: IComparer<$a>, l: FSharpList<$a>): Option<SetTreeLeaf$1<$a>> {
    return fold_2<$a, Option<SetTreeLeaf$1<$a>>>((acc: Option<SetTreeLeaf$1<$a>>, k: $a): Option<SetTreeLeaf$1<$a>> => SetTreeModule_add<$a>(comparer, k, acc), SetTreeModule_empty<$a>(), l);
}

export function SetTreeModule_ofSeq<T>(comparer: IComparer<T>, c: Iterable<T>): Option<SetTreeLeaf$1<T>> {
    if (isArrayLike(c)) {
        return SetTreeModule_ofArray<T>(comparer, c);
    }
    else if (c instanceof FSharpList) {
        return SetTreeModule_ofList<T>(comparer, c);
    }
    else {
        const ie: IEnumerator<T> = getEnumerator(c);
        try {
            return SetTreeModule_mkFromEnumerator<T>(comparer, SetTreeModule_empty<T>(), ie);
        }
        finally {
            disposeSafe(ie as IDisposable);
        }
    }
}

export class FSharpSet<T> implements ISet<T>, Iterable<T>, Iterable<T> {
    readonly tree: Option<SetTreeLeaf$1<T>>;
    readonly comparer: IComparer<T>;
    constructor(comparer: IComparer<T>, tree: Option<SetTreeLeaf$1<T>>) {
        this.comparer = comparer;
        this.tree = tree;
    }
    GetHashCode(): int32 {
        const this$: FSharpSet<T> = this;
        return FSharpSet__ComputeHashCode<T>(this$) | 0;
    }
    Equals(that: any): boolean {
        let that_1: FSharpSet<T>;
        const this$: FSharpSet<T> = this;
        return (that instanceof FSharpSet) && ((that_1 = (that as FSharpSet<T>), SetTreeModule_compare<T>(FSharpSet__get_Comparer<T>(this$), FSharpSet__get_Tree<T>(this$), FSharpSet__get_Tree<T>(that_1)) === 0));
    }
    toString(): string {
        const this$: FSharpSet<T> = this;
        return ("set [" + join("; ", map_1<T, string>((x: T): string => {
            let copyOfStruct: T = x;
            return toString(copyOfStruct);
        }, this$))) + "]";
    }
    get [Symbol.toStringTag](): string {
        return "FSharpSet";
    }
    toJSON(): any {
        const this$: FSharpSet<T> = this;
        return Array.from(this$);
    }
    CompareTo(that: any): int32 {
        const s: FSharpSet<T> = this;
        return SetTreeModule_compare<T>(FSharpSet__get_Comparer<T>(s), FSharpSet__get_Tree<T>(s), FSharpSet__get_Tree<T>(that as FSharpSet<T>)) | 0;
    }
    "System.Collections.Generic.ICollection`1.Add2B595"(x: T): void {
        throw new Error("ReadOnlyCollection");
    }
    "System.Collections.Generic.ICollection`1.Clear"(): void {
        throw new Error("ReadOnlyCollection");
    }
    "System.Collections.Generic.ICollection`1.Remove2B595"(x: T): boolean {
        throw new Error("ReadOnlyCollection");
    }
    "System.Collections.Generic.ICollection`1.Contains2B595"(x: T): boolean {
        const s: FSharpSet<T> = this;
        return SetTreeModule_mem<T>(FSharpSet__get_Comparer<T>(s), x, FSharpSet__get_Tree<T>(s));
    }
    "System.Collections.Generic.ICollection`1.CopyToZ3B4C077E"(arr: T[], i: int32): void {
        const s: FSharpSet<T> = this;
        SetTreeModule_copyToArray<T>(FSharpSet__get_Tree<T>(s), arr, i);
    }
    "System.Collections.Generic.ICollection`1.get_IsReadOnly"(): boolean {
        return true;
    }
    "System.Collections.Generic.ICollection`1.get_Count"(): int32 {
        const s: FSharpSet<T> = this;
        return FSharpSet__get_Count<T>(s) | 0;
    }
    "System.Collections.Generic.IReadOnlyCollection`1.get_Count"(): int32 {
        const s: FSharpSet<T> = this;
        return FSharpSet__get_Count<T>(s) | 0;
    }
    GetEnumerator(): IEnumerator<T> {
        const s: FSharpSet<T> = this;
        return SetTreeModule_mkIEnumerator<T>(FSharpSet__get_Tree<T>(s));
    }
    [Symbol.iterator](): Iterator<T> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const s: FSharpSet<T> = this;
        return SetTreeModule_mkIEnumerator<T>(FSharpSet__get_Tree<T>(s));
    }
    get size(): int32 {
        const s: FSharpSet<T> = this;
        return FSharpSet__get_Count<T>(s) | 0;
    }
    add(k: T): ISet<T> {
        const s: FSharpSet<T> = this;
        throw new Error("Set cannot be mutated");
        return s;
    }
    clear(): void {
        throw new Error("Set cannot be mutated");
    }
    delete(k: T): boolean {
        throw new Error("Set cannot be mutated");
        return false;
    }
    has(k: T): boolean {
        const s: FSharpSet<T> = this;
        return FSharpSet__Contains<T>(s, k);
    }
    keys(): Iterable<T> {
        const s: FSharpSet<T> = this;
        return map_1<T, T>((x: T): T => x, s);
    }
    values(): Iterable<T> {
        const s: FSharpSet<T> = this;
        return map_1<T, T>((x: T): T => x, s);
    }
    entries(): Iterable<[T, T]> {
        const s: FSharpSet<T> = this;
        return map_1<T, [T, T]>((v: T): [T, T] => ([v, v] as [T, T]), s);
    }
    forEach(f: ((arg0: T, arg1: T, arg2: ISet<T>) => void), thisArg?: Option<any>): void {
        const s: FSharpSet<T> = this;
        iterate_1<T>((x: T): void => {
            f(x, x, s);
        }, s);
    }
}

export function FSharpSet_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("Set.FSharpSet", [gen0], FSharpSet);
}

export function FSharpSet_$ctor<T>(comparer: IComparer<T>, tree: Option<SetTreeLeaf$1<T>>): FSharpSet<T> {
    return new FSharpSet(comparer, tree);
}

export function FSharpSet__get_Comparer<T>(set$: FSharpSet<T>): IComparer<T> {
    return set$.comparer;
}

export function FSharpSet__get_Tree<T>(set$: FSharpSet<T>): Option<SetTreeLeaf$1<T>> {
    return set$.tree;
}

export function FSharpSet_Empty<T>(comparer: IComparer<T>): FSharpSet<T> {
    return FSharpSet_$ctor<T>(comparer, SetTreeModule_empty<T>());
}

export function FSharpSet__Add<T>(s: FSharpSet<T>, value: T): FSharpSet<T> {
    return FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(s), SetTreeModule_add<T>(FSharpSet__get_Comparer<T>(s), value, FSharpSet__get_Tree<T>(s)));
}

export function FSharpSet__Remove<T>(s: FSharpSet<T>, value: T): FSharpSet<T> {
    return FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(s), SetTreeModule_remove<T>(FSharpSet__get_Comparer<T>(s), value, FSharpSet__get_Tree<T>(s)));
}

export function FSharpSet__get_Count<T>(s: FSharpSet<T>): int32 {
    return SetTreeModule_count<T>(FSharpSet__get_Tree<T>(s));
}

export function FSharpSet__Contains<T>(s: FSharpSet<T>, value: T): boolean {
    return SetTreeModule_mem<T>(FSharpSet__get_Comparer<T>(s), value, FSharpSet__get_Tree<T>(s));
}

export function FSharpSet__Iterate<T>(s: FSharpSet<T>, x: ((arg0: T) => void)): void {
    SetTreeModule_iter<T>(x, FSharpSet__get_Tree<T>(s));
}

export function FSharpSet__Fold<T, $a>(s: FSharpSet<T>, f: ((arg0: T, arg1: $a) => $a), z: $a): $a {
    const f_1: any = f;
    return SetTreeModule_fold<$a, T>((x: $a, z_1: T): $a => f_1(z_1, x), z, FSharpSet__get_Tree<T>(s));
}

export function FSharpSet__get_IsEmpty<T>(s: FSharpSet<T>): boolean {
    return FSharpSet__get_Tree<T>(s) == null;
}

export function FSharpSet__Partition<T>(s: FSharpSet<T>, f: ((arg0: T) => boolean)): [FSharpSet<T>, FSharpSet<T>] {
    if (FSharpSet__get_Tree<T>(s) == null) {
        return [s, s] as [FSharpSet<T>, FSharpSet<T>];
    }
    else {
        const patternInput: [Option<SetTreeLeaf$1<T>>, Option<SetTreeLeaf$1<T>>] = SetTreeModule_partition<T>(FSharpSet__get_Comparer<T>(s), f, FSharpSet__get_Tree<T>(s));
        return [FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(s), patternInput[0]), FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(s), patternInput[1])] as [FSharpSet<T>, FSharpSet<T>];
    }
}

export function FSharpSet__Filter<T>(s: FSharpSet<T>, f: ((arg0: T) => boolean)): FSharpSet<T> {
    if (FSharpSet__get_Tree<T>(s) == null) {
        return s;
    }
    else {
        return FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(s), SetTreeModule_filter<T>(FSharpSet__get_Comparer<T>(s), f, FSharpSet__get_Tree<T>(s)));
    }
}

export function FSharpSet__Map<T, U>(s: FSharpSet<T>, f: ((arg0: T) => U), comparer: IComparer<U>): FSharpSet<U> {
    return FSharpSet_$ctor<U>(comparer, SetTreeModule_fold<Option<SetTreeLeaf$1<U>>, T>((acc: Option<SetTreeLeaf$1<U>>, k: T): Option<SetTreeLeaf$1<U>> => SetTreeModule_add<U>(comparer, f(k), acc), SetTreeModule_empty<U>(), FSharpSet__get_Tree<T>(s)));
}

export function FSharpSet__Exists<T>(s: FSharpSet<T>, f: ((arg0: T) => boolean)): boolean {
    return SetTreeModule_exists<T>(f, FSharpSet__get_Tree<T>(s));
}

export function FSharpSet__ForAll<T>(s: FSharpSet<T>, f: ((arg0: T) => boolean)): boolean {
    return SetTreeModule_forall<T>(f, FSharpSet__get_Tree<T>(s));
}

export function FSharpSet_op_Subtraction<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): FSharpSet<T> {
    if (FSharpSet__get_Tree<T>(set1) == null) {
        return set1;
    }
    else if (FSharpSet__get_Tree<T>(set2) == null) {
        return set1;
    }
    else {
        return FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(set1), SetTreeModule_diff<T>(FSharpSet__get_Comparer<T>(set1), FSharpSet__get_Tree<T>(set1), FSharpSet__get_Tree<T>(set2)));
    }
}

export function FSharpSet_op_Addition<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): FSharpSet<T> {
    if (FSharpSet__get_Tree<T>(set2) == null) {
        return set1;
    }
    else if (FSharpSet__get_Tree<T>(set1) == null) {
        return set2;
    }
    else {
        return FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(set1), SetTreeModule_union<T>(FSharpSet__get_Comparer<T>(set1), FSharpSet__get_Tree<T>(set1), FSharpSet__get_Tree<T>(set2)));
    }
}

export function FSharpSet_Intersection<T>(a: FSharpSet<T>, b: FSharpSet<T>): FSharpSet<T> {
    if (FSharpSet__get_Tree<T>(b) == null) {
        return b;
    }
    else if (FSharpSet__get_Tree<T>(a) == null) {
        return a;
    }
    else {
        return FSharpSet_$ctor<T>(FSharpSet__get_Comparer<T>(a), SetTreeModule_intersection<T>(FSharpSet__get_Comparer<T>(a), FSharpSet__get_Tree<T>(a), FSharpSet__get_Tree<T>(b)));
    }
}

export function FSharpSet_IntersectionMany<T>(sets: Iterable<FSharpSet<T>>): FSharpSet<T> {
    return reduce<FSharpSet<T>>(FSharpSet_Intersection, sets);
}

export function FSharpSet_Equality<T>(a: FSharpSet<T>, b: FSharpSet<T>): boolean {
    return SetTreeModule_compare<T>(FSharpSet__get_Comparer<T>(a), FSharpSet__get_Tree<T>(a), FSharpSet__get_Tree<T>(b)) === 0;
}

export function FSharpSet_Compare<T>(a: FSharpSet<T>, b: FSharpSet<T>): int32 {
    return SetTreeModule_compare<T>(FSharpSet__get_Comparer<T>(a), FSharpSet__get_Tree<T>(a), FSharpSet__get_Tree<T>(b));
}

export function FSharpSet__get_Choose<T>(x: FSharpSet<T>): T {
    return SetTreeModule_choose<T>(FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__get_MinimumElement<T>(x: FSharpSet<T>): T {
    return SetTreeModule_minimumElement<T>(FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__get_MaximumElement<T>(x: FSharpSet<T>): T {
    return SetTreeModule_maximumElement<T>(FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__IsSubsetOf<T>(x: FSharpSet<T>, otherSet: FSharpSet<T>): boolean {
    return SetTreeModule_subset<T>(FSharpSet__get_Comparer<T>(x), FSharpSet__get_Tree<T>(x), FSharpSet__get_Tree<T>(otherSet));
}

export function FSharpSet__IsSupersetOf<T>(x: FSharpSet<T>, otherSet: FSharpSet<T>): boolean {
    return SetTreeModule_subset<T>(FSharpSet__get_Comparer<T>(x), FSharpSet__get_Tree<T>(otherSet), FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__IsProperSubsetOf<T>(x: FSharpSet<T>, otherSet: FSharpSet<T>): boolean {
    return SetTreeModule_properSubset<T>(FSharpSet__get_Comparer<T>(x), FSharpSet__get_Tree<T>(x), FSharpSet__get_Tree<T>(otherSet));
}

export function FSharpSet__IsProperSupersetOf<T>(x: FSharpSet<T>, otherSet: FSharpSet<T>): boolean {
    return SetTreeModule_properSubset<T>(FSharpSet__get_Comparer<T>(x), FSharpSet__get_Tree<T>(otherSet), FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__ToList<T>(x: FSharpSet<T>): FSharpList<T> {
    return SetTreeModule_toList<T>(FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__ToArray<T>(x: FSharpSet<T>): T[] {
    return SetTreeModule_toArray<T>(FSharpSet__get_Tree<T>(x));
}

export function FSharpSet__ComputeHashCode<T>(this$: FSharpSet<T>): int32 {
    let res = 0;
    const enumerator: IEnumerator<T> = getEnumerator(this$);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const x_1: T = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            res = ((((res << 1) + structuralHash(x_1)) + 631) | 0);
        }
    }
    finally {
        disposeSafe(enumerator as IDisposable);
    }
    return Math.abs(res) | 0;
}

export function isEmpty<T>(set$: FSharpSet<T>): boolean {
    return FSharpSet__get_IsEmpty<T>(set$);
}

export function contains<T>(element: T, set$: FSharpSet<T>): boolean {
    return FSharpSet__Contains<T>(set$, element);
}

export function add<T>(value: T, set$: FSharpSet<T>): FSharpSet<T> {
    return FSharpSet__Add<T>(set$, value);
}

export function singleton<T>(value: T, comparer: IComparer<T>): FSharpSet<T> {
    return FSharpSet__Add<T>(FSharpSet_Empty<T>(comparer), value);
}

export function remove<T>(value: T, set$: FSharpSet<T>): FSharpSet<T> {
    return FSharpSet__Remove<T>(set$, value);
}

export function union<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): FSharpSet<T> {
    return FSharpSet_op_Addition<T>(set1, set2);
}

export function unionMany<T>(sets: Iterable<FSharpSet<T>>, comparer: IComparer<T>): FSharpSet<T> {
    return fold_3<FSharpSet<T>, FSharpSet<T>>(FSharpSet_op_Addition, FSharpSet_Empty<T>(comparer), sets);
}

export function intersect<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): FSharpSet<T> {
    return FSharpSet_Intersection<T>(set1, set2);
}

export function intersectMany<T>(sets: Iterable<FSharpSet<T>>): FSharpSet<T> {
    return FSharpSet_IntersectionMany<T>(sets);
}

export function iterate<T>(action: ((arg0: T) => void), set$: FSharpSet<T>): void {
    FSharpSet__Iterate<T>(set$, action);
}

export function empty<T>(comparer: IComparer<T>): FSharpSet<T> {
    return FSharpSet_Empty<T>(comparer);
}

export function forAll<T>(predicate: ((arg0: T) => boolean), set$: FSharpSet<T>): boolean {
    return FSharpSet__ForAll<T>(set$, predicate);
}

export function exists<T>(predicate: ((arg0: T) => boolean), set$: FSharpSet<T>): boolean {
    return FSharpSet__Exists<T>(set$, predicate);
}

export function filter<T>(predicate: ((arg0: T) => boolean), set$: FSharpSet<T>): FSharpSet<T> {
    return FSharpSet__Filter<T>(set$, predicate);
}

export function partition<T>(predicate: ((arg0: T) => boolean), set$: FSharpSet<T>): [FSharpSet<T>, FSharpSet<T>] {
    return FSharpSet__Partition<T>(set$, predicate);
}

export function fold<T, State>(folder: ((arg0: State, arg1: T) => State), state: State, set$: FSharpSet<T>): State {
    return SetTreeModule_fold<State, T>(folder, state, FSharpSet__get_Tree<T>(set$));
}

export function foldBack<T, State>(folder: ((arg0: T, arg1: State) => State), set$: FSharpSet<T>, state: State): State {
    return SetTreeModule_foldBack<T, State>(folder, FSharpSet__get_Tree<T>(set$), state);
}

export function map<T, U>(mapping: ((arg0: T) => U), set$: FSharpSet<T>, comparer: IComparer<U>): FSharpSet<U> {
    return FSharpSet__Map<T, U>(set$, mapping, comparer);
}

export function count<T>(set$: FSharpSet<T>): int32 {
    return FSharpSet__get_Count<T>(set$);
}

export function ofList<T>(elements: Iterable<T>, comparer: IComparer<T>): FSharpSet<T> {
    return FSharpSet_$ctor<T>(comparer, SetTreeModule_ofSeq<T>(comparer, elements));
}

export function ofArray<T>(array: T[], comparer: IComparer<T>): FSharpSet<T> {
    return FSharpSet_$ctor<T>(comparer, SetTreeModule_ofArray<T>(comparer, array));
}

export function toList<T>(set$: FSharpSet<T>): FSharpList<T> {
    return FSharpSet__ToList<T>(set$);
}

export function toArray<T>(set$: FSharpSet<T>): T[] {
    return FSharpSet__ToArray<T>(set$);
}

export function toSeq<T>(set$: FSharpSet<T>): Iterable<T> {
    return map_1<T, T>((x: T): T => x, set$);
}

export function ofSeq<T>(elements: Iterable<T>, comparer: IComparer<T>): FSharpSet<T> {
    return FSharpSet_$ctor<T>(comparer, SetTreeModule_ofSeq<T>(comparer, elements));
}

export function difference<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): FSharpSet<T> {
    return FSharpSet_op_Subtraction<T>(set1, set2);
}

export function isSubset<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): boolean {
    return SetTreeModule_subset<T>(FSharpSet__get_Comparer<T>(set1), FSharpSet__get_Tree<T>(set1), FSharpSet__get_Tree<T>(set2));
}

export function isSuperset<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): boolean {
    return SetTreeModule_subset<T>(FSharpSet__get_Comparer<T>(set1), FSharpSet__get_Tree<T>(set2), FSharpSet__get_Tree<T>(set1));
}

export function isProperSubset<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): boolean {
    return SetTreeModule_properSubset<T>(FSharpSet__get_Comparer<T>(set1), FSharpSet__get_Tree<T>(set1), FSharpSet__get_Tree<T>(set2));
}

export function isProperSuperset<T>(set1: FSharpSet<T>, set2: FSharpSet<T>): boolean {
    return SetTreeModule_properSubset<T>(FSharpSet__get_Comparer<T>(set1), FSharpSet__get_Tree<T>(set2), FSharpSet__get_Tree<T>(set1));
}

export function minElement<T>(set$: FSharpSet<T>): T {
    return FSharpSet__get_MinimumElement<T>(set$);
}

export function maxElement<T>(set$: FSharpSet<T>): T {
    return FSharpSet__get_MaximumElement<T>(set$);
}

export function unionWith<T>(s1: ISet<T>, s2: Iterable<T>): ISet<T> {
    return fold_3<T, ISet<T>>((acc: ISet<T>, x: T): ISet<T> => acc.add(x), s1, s2);
}

export function newMutableSetWith<T>(s1: ISet<T>, s2: Iterable<T>): ISet<T> {
    if (s1 instanceof HashSet) {
        const s1_1 = s1 as HashSet<T>;
        return HashSet_$ctor_Z6150332D<T>(s2, HashSet__get_Comparer<T>(s1_1));
    }
    else {
        return new Set(s2);
    }
}

export function intersectWith<T>(s1: ISet<T>, s2: Iterable<T>): void {
    const s2_1: ISet<T> = newMutableSetWith<T>(s1, s2);
    iterate_1<T>((x: T): void => {
        if (!s2_1.has(x)) {
            s1.delete(x);
        }
    }, s1.values());
}

export function exceptWith<T>(s1: ISet<T>, s2: Iterable<T>): void {
    iterate_1<T>((x: T): void => {
        s1.delete(x);
    }, s2);
}

export function isSubsetOf<T>(s1: ISet<T>, s2: Iterable<T>): boolean {
    const s2_1: ISet<T> = newMutableSetWith<T>(s1, s2);
    return forAll_1<T>((value: T): boolean => s2_1.has(value), s1.values());
}

export function isSupersetOf<T>(s1: ISet<T>, s2: Iterable<T>): boolean {
    return forAll_1<T>((value: T): boolean => s1.has(value), s2);
}

export function isProperSubsetOf<T>(s1: ISet<T>, s2: Iterable<T>): boolean {
    const s2_1: ISet<T> = newMutableSetWith<T>(s1, s2);
    if (s2_1.size > s1.size) {
        return forAll_1<T>((value: T): boolean => s2_1.has(value), s1.values());
    }
    else {
        return false;
    }
}

export function isProperSupersetOf<T>(s1: ISet<T>, s2: Iterable<T>): boolean {
    const s2_1: Iterable<T> = cache<T>(s2);
    if (exists_1<T>((arg: T): boolean => !s1.has(arg), s2_1)) {
        return forAll_1<T>((value_2: T): boolean => s1.has(value_2), s2_1);
    }
    else {
        return false;
    }
}

