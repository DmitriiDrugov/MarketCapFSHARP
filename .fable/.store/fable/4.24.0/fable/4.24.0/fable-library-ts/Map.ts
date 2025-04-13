import { record_type, bool_type, list_type, option_type, class_type, TypeInfo } from "./Reflection.js";
import { some, value as value_1, Option } from "./Option.js";
import { int32 } from "./Int32.js";
import { structuralHash, IMap, compare, toIterator, equals, IDisposable, disposeSafe, getEnumerator, isArrayLike, IEnumerator, IComparer } from "./Util.js";
import { singleton, ofArrayWithTail, head, tail, isEmpty as isEmpty_1, fold as fold_1, empty as empty_1, FSharpList, cons } from "./List.js";
import { map as map_2, item, fill, setItem } from "./Array.js";
import { FSharpRef, Record } from "./Types.js";
import { tryPick as tryPick_1, pick as pick_1, iterate as iterate_1, compareWith, map as map_1, unfold } from "./Seq.js";
import { format, join } from "./String.js";

export class MapTreeLeaf$2<Key, Value> {
    readonly v: Value;
    readonly k: Key;
    constructor(k: Key, v: Value) {
        this.k = k;
        this.v = v;
    }
}

export function MapTreeLeaf$2_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return class_type("Map.MapTreeLeaf`2", [gen0, gen1], MapTreeLeaf$2);
}

export function MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(k: Key, v: Value): MapTreeLeaf$2<Key, Value> {
    return new MapTreeLeaf$2(k, v);
}

export function MapTreeLeaf$2__get_Key<Key, Value>(_: MapTreeLeaf$2<Key, Value>): Key {
    return _.k;
}

export function MapTreeLeaf$2__get_Value<Key, Value>(_: MapTreeLeaf$2<Key, Value>): Value {
    return _.v;
}

export class MapTreeNode$2<Key, Value> extends MapTreeLeaf$2<Key, Value> {
    readonly right: Option<MapTreeLeaf$2<Key, Value>>;
    readonly left: Option<MapTreeLeaf$2<Key, Value>>;
    readonly h: int32;
    constructor(k: Key, v: Value, left: Option<MapTreeLeaf$2<Key, Value>>, right: Option<MapTreeLeaf$2<Key, Value>>, h: int32) {
        super(k, v);
        this.left = left;
        this.right = right;
        this.h = (h | 0);
    }
}

export function MapTreeNode$2_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return class_type("Map.MapTreeNode`2", [gen0, gen1], MapTreeNode$2, MapTreeLeaf$2_$reflection(gen0, gen1));
}

export function MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k: Key, v: Value, left: Option<MapTreeLeaf$2<Key, Value>>, right: Option<MapTreeLeaf$2<Key, Value>>, h: int32): MapTreeNode$2<Key, Value> {
    return new MapTreeNode$2(k, v, left, right, h);
}

export function MapTreeNode$2__get_Left<Key, Value>(_: MapTreeNode$2<Key, Value>): Option<MapTreeLeaf$2<Key, Value>> {
    return _.left;
}

export function MapTreeNode$2__get_Right<Key, Value>(_: MapTreeNode$2<Key, Value>): Option<MapTreeLeaf$2<Key, Value>> {
    return _.right;
}

export function MapTreeNode$2__get_Height<Key, Value>(_: MapTreeNode$2<Key, Value>): int32 {
    return _.h;
}

export function MapTreeModule_empty<Key, Value>(): Option<MapTreeLeaf$2<Key, Value>> {
    return undefined;
}

export function MapTreeModule_sizeAux<Key, Value>(acc_mut: int32, m_mut: Option<MapTreeLeaf$2<Key, Value>>): int32 {
    MapTreeModule_sizeAux:
    while (true) {
        const acc: int32 = acc_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                acc_mut = MapTreeModule_sizeAux<Key, Value>(acc + 1, MapTreeNode$2__get_Left<Key, Value>(mn));
                m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                continue MapTreeModule_sizeAux;
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

export function MapTreeModule_size<$a, $b>(x: Option<MapTreeLeaf$2<$a, $b>>): int32 {
    return MapTreeModule_sizeAux<$a, $b>(0, x);
}

export function MapTreeModule_mk<Key, Value>(l: Option<MapTreeLeaf$2<Key, Value>>, k: Key, v: Value, r: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Value>> {
    let mn: MapTreeNode$2<Key, Value>, mn_1: MapTreeNode$2<Key, Value>;
    let hl: int32;
    const m: Option<MapTreeLeaf$2<Key, Value>> = l;
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        hl = ((m2 instanceof MapTreeNode$2) ? ((mn = (m2 as MapTreeNode$2<Key, Value>), MapTreeNode$2__get_Height<Key, Value>(mn))) : 1);
    }
    else {
        hl = 0;
    }
    let hr: int32;
    const m_1: Option<MapTreeLeaf$2<Key, Value>> = r;
    if (m_1 != null) {
        const m2_1: MapTreeLeaf$2<Key, Value> = value_1(m_1);
        hr = ((m2_1 instanceof MapTreeNode$2) ? ((mn_1 = (m2_1 as MapTreeNode$2<Key, Value>), MapTreeNode$2__get_Height<Key, Value>(mn_1))) : 1);
    }
    else {
        hr = 0;
    }
    const m_2: int32 = ((hl < hr) ? hr : hl) | 0;
    if (m_2 === 0) {
        return MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(k, v);
    }
    else {
        return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, v, l, r, m_2 + 1);
    }
}

export function MapTreeModule_rebalance<Key, Value>(t1: Option<MapTreeLeaf$2<Key, Value>>, k: Key, v: Value, t2: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Value>> {
    let mn: MapTreeNode$2<Key, Value>, mn_1: MapTreeNode$2<Key, Value>, m_2: Option<MapTreeLeaf$2<Key, Value>>, m2_2: MapTreeLeaf$2<Key, Value>, mn_2: MapTreeNode$2<Key, Value>, m_3: Option<MapTreeLeaf$2<Key, Value>>, m2_3: MapTreeLeaf$2<Key, Value>, mn_3: MapTreeNode$2<Key, Value>;
    let t1h: int32;
    const m: Option<MapTreeLeaf$2<Key, Value>> = t1;
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        t1h = ((m2 instanceof MapTreeNode$2) ? ((mn = (m2 as MapTreeNode$2<Key, Value>), MapTreeNode$2__get_Height<Key, Value>(mn))) : 1);
    }
    else {
        t1h = 0;
    }
    let t2h: int32;
    const m_1: Option<MapTreeLeaf$2<Key, Value>> = t2;
    if (m_1 != null) {
        const m2_1: MapTreeLeaf$2<Key, Value> = value_1(m_1);
        t2h = ((m2_1 instanceof MapTreeNode$2) ? ((mn_1 = (m2_1 as MapTreeNode$2<Key, Value>), MapTreeNode$2__get_Height<Key, Value>(mn_1))) : 1);
    }
    else {
        t2h = 0;
    }
    if (t2h > (t1h + 2)) {
        const matchValue: MapTreeLeaf$2<Key, Value> = value_1(t2);
        if (matchValue instanceof MapTreeNode$2) {
            const t2$0027 = matchValue as MapTreeNode$2<Key, Value>;
            if (((m_2 = MapTreeNode$2__get_Left<Key, Value>(t2$0027), (m_2 != null) ? ((m2_2 = value_1(m_2), (m2_2 instanceof MapTreeNode$2) ? ((mn_2 = (m2_2 as MapTreeNode$2<Key, Value>), MapTreeNode$2__get_Height<Key, Value>(mn_2))) : 1)) : 0)) > (t1h + 1)) {
                const matchValue_1: MapTreeLeaf$2<Key, Value> = value_1(MapTreeNode$2__get_Left<Key, Value>(t2$0027));
                if (matchValue_1 instanceof MapTreeNode$2) {
                    const t2l = matchValue_1 as MapTreeNode$2<Key, Value>;
                    return MapTreeModule_mk<Key, Value>(MapTreeModule_mk<Key, Value>(t1, k, v, MapTreeNode$2__get_Left<Key, Value>(t2l)), MapTreeLeaf$2__get_Key<Key, Value>(t2l), MapTreeLeaf$2__get_Value<Key, Value>(t2l), MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Right<Key, Value>(t2l), MapTreeLeaf$2__get_Key<Key, Value>(t2$0027), MapTreeLeaf$2__get_Value<Key, Value>(t2$0027), MapTreeNode$2__get_Right<Key, Value>(t2$0027)));
                }
                else {
                    throw new Error("internal error: Map.rebalance");
                }
            }
            else {
                return MapTreeModule_mk<Key, Value>(MapTreeModule_mk<Key, Value>(t1, k, v, MapTreeNode$2__get_Left<Key, Value>(t2$0027)), MapTreeLeaf$2__get_Key<Key, Value>(t2$0027), MapTreeLeaf$2__get_Value<Key, Value>(t2$0027), MapTreeNode$2__get_Right<Key, Value>(t2$0027));
            }
        }
        else {
            throw new Error("internal error: Map.rebalance");
        }
    }
    else if (t1h > (t2h + 2)) {
        const matchValue_2: MapTreeLeaf$2<Key, Value> = value_1(t1);
        if (matchValue_2 instanceof MapTreeNode$2) {
            const t1$0027 = matchValue_2 as MapTreeNode$2<Key, Value>;
            if (((m_3 = MapTreeNode$2__get_Right<Key, Value>(t1$0027), (m_3 != null) ? ((m2_3 = value_1(m_3), (m2_3 instanceof MapTreeNode$2) ? ((mn_3 = (m2_3 as MapTreeNode$2<Key, Value>), MapTreeNode$2__get_Height<Key, Value>(mn_3))) : 1)) : 0)) > (t2h + 1)) {
                const matchValue_3: MapTreeLeaf$2<Key, Value> = value_1(MapTreeNode$2__get_Right<Key, Value>(t1$0027));
                if (matchValue_3 instanceof MapTreeNode$2) {
                    const t1r = matchValue_3 as MapTreeNode$2<Key, Value>;
                    return MapTreeModule_mk<Key, Value>(MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(t1$0027), MapTreeLeaf$2__get_Key<Key, Value>(t1$0027), MapTreeLeaf$2__get_Value<Key, Value>(t1$0027), MapTreeNode$2__get_Left<Key, Value>(t1r)), MapTreeLeaf$2__get_Key<Key, Value>(t1r), MapTreeLeaf$2__get_Value<Key, Value>(t1r), MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Right<Key, Value>(t1r), k, v, t2));
                }
                else {
                    throw new Error("internal error: Map.rebalance");
                }
            }
            else {
                return MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(t1$0027), MapTreeLeaf$2__get_Key<Key, Value>(t1$0027), MapTreeLeaf$2__get_Value<Key, Value>(t1$0027), MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Right<Key, Value>(t1$0027), k, v, t2));
            }
        }
        else {
            throw new Error("internal error: Map.rebalance");
        }
    }
    else {
        return MapTreeModule_mk<Key, Value>(t1, k, v, t2);
    }
}

export function MapTreeModule_add<Key, Value>(comparer: IComparer<Key>, k: Key, v: Value, m: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Value>> {
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        const c: int32 = comparer.Compare(k, MapTreeLeaf$2__get_Key<Key, Value>(m2)) | 0;
        if (m2 instanceof MapTreeNode$2) {
            const mn = m2 as MapTreeNode$2<Key, Value>;
            if (c < 0) {
                return MapTreeModule_rebalance<Key, Value>(MapTreeModule_add<Key, Value>(comparer, k, v, MapTreeNode$2__get_Left<Key, Value>(mn)), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn));
            }
            else if (c === 0) {
                return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, v, MapTreeNode$2__get_Left<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn), MapTreeNode$2__get_Height<Key, Value>(mn));
            }
            else {
                return MapTreeModule_rebalance<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(mn), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeModule_add<Key, Value>(comparer, k, v, MapTreeNode$2__get_Right<Key, Value>(mn)));
            }
        }
        else if (c < 0) {
            return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, v, MapTreeModule_empty<Key, Value>(), m, 2);
        }
        else if (c === 0) {
            return MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(k, v);
        }
        else {
            return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, v, m, MapTreeModule_empty<Key, Value>(), 2);
        }
    }
    else {
        return MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(k, v);
    }
}

export function MapTreeModule_tryFind<Key, Value>(comparer_mut: IComparer<Key>, k_mut: Key, m_mut: Option<MapTreeLeaf$2<Key, Value>>): Option<Value> {
    MapTreeModule_tryFind:
    while (true) {
        const comparer: IComparer<Key> = comparer_mut, k: Key = k_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            const c: int32 = comparer.Compare(k, MapTreeLeaf$2__get_Key<Key, Value>(m2)) | 0;
            if (c === 0) {
                return some(MapTreeLeaf$2__get_Value<Key, Value>(m2));
            }
            else if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                comparer_mut = comparer;
                k_mut = k;
                m_mut = ((c < 0) ? MapTreeNode$2__get_Left<Key, Value>(mn) : MapTreeNode$2__get_Right<Key, Value>(mn));
                continue MapTreeModule_tryFind;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
        break;
    }
}

export function MapTreeModule_find<Key, Value>(comparer: IComparer<Key>, k: Key, m: Option<MapTreeLeaf$2<Key, Value>>): Value {
    const matchValue: Option<Value> = MapTreeModule_tryFind<Key, Value>(comparer, k, m);
    if (matchValue == null) {
        throw new Error();
    }
    else {
        return value_1(matchValue);
    }
}

export function MapTreeModule_partition1<Key, $a>(comparer: IComparer<Key>, f: any, k: Key, v: $a, acc1: Option<MapTreeLeaf$2<Key, $a>>, acc2: Option<MapTreeLeaf$2<Key, $a>>): [Option<MapTreeLeaf$2<Key, $a>>, Option<MapTreeLeaf$2<Key, $a>>] {
    if (f(k, v)) {
        return [MapTreeModule_add<Key, $a>(comparer, k, v, acc1), acc2] as [Option<MapTreeLeaf$2<Key, $a>>, Option<MapTreeLeaf$2<Key, $a>>];
    }
    else {
        return [acc1, MapTreeModule_add<Key, $a>(comparer, k, v, acc2)] as [Option<MapTreeLeaf$2<Key, $a>>, Option<MapTreeLeaf$2<Key, $a>>];
    }
}

export function MapTreeModule_partitionAux<Key, Value>(comparer_mut: IComparer<Key>, f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>, acc__mut: Option<MapTreeLeaf$2<Key, Value>>, acc__1_mut: Option<MapTreeLeaf$2<Key, Value>>): [Option<MapTreeLeaf$2<Key, Value>>, Option<MapTreeLeaf$2<Key, Value>>] {
    MapTreeModule_partitionAux:
    while (true) {
        const comparer: IComparer<Key> = comparer_mut, f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut, acc_: Option<MapTreeLeaf$2<Key, Value>> = acc__mut, acc__1: Option<MapTreeLeaf$2<Key, Value>> = acc__1_mut;
        const acc = [acc_, acc__1] as [Option<MapTreeLeaf$2<Key, Value>>, Option<MapTreeLeaf$2<Key, Value>>];
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                const acc_1: [Option<MapTreeLeaf$2<Key, Value>>, Option<MapTreeLeaf$2<Key, Value>>] = MapTreeModule_partitionAux<Key, Value>(comparer, f, MapTreeNode$2__get_Right<Key, Value>(mn), acc[0], acc[1]);
                const acc_4: [Option<MapTreeLeaf$2<Key, Value>>, Option<MapTreeLeaf$2<Key, Value>>] = MapTreeModule_partition1<Key, Value>(comparer, f, MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), acc_1[0], acc_1[1]);
                comparer_mut = comparer;
                f_mut = f;
                m_mut = MapTreeNode$2__get_Left<Key, Value>(mn);
                acc__mut = acc_4[0];
                acc__1_mut = acc_4[1];
                continue MapTreeModule_partitionAux;
            }
            else {
                return MapTreeModule_partition1<Key, Value>(comparer, f, MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2), acc[0], acc[1]);
            }
        }
        else {
            return acc;
        }
        break;
    }
}

export function MapTreeModule_partition<Key, $a>(comparer: IComparer<Key>, f: ((arg0: Key, arg1: $a) => boolean), m: Option<MapTreeLeaf$2<Key, $a>>): [Option<MapTreeLeaf$2<Key, $a>>, Option<MapTreeLeaf$2<Key, $a>>] {
    return MapTreeModule_partitionAux<Key, $a>(comparer, f, m, MapTreeModule_empty<Key, $a>(), MapTreeModule_empty<Key, $a>());
}

export function MapTreeModule_filter1<Key, $a>(comparer: IComparer<Key>, f: any, k: Key, v: $a, acc: Option<MapTreeLeaf$2<Key, $a>>): Option<MapTreeLeaf$2<Key, $a>> {
    if (f(k, v)) {
        return MapTreeModule_add<Key, $a>(comparer, k, v, acc);
    }
    else {
        return acc;
    }
}

export function MapTreeModule_filterAux<Key, Value>(comparer_mut: IComparer<Key>, f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>, acc_mut: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Value>> {
    MapTreeModule_filterAux:
    while (true) {
        const comparer: IComparer<Key> = comparer_mut, f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut, acc: Option<MapTreeLeaf$2<Key, Value>> = acc_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                const acc_1: Option<MapTreeLeaf$2<Key, Value>> = MapTreeModule_filterAux<Key, Value>(comparer, f, MapTreeNode$2__get_Left<Key, Value>(mn), acc);
                const acc_2: Option<MapTreeLeaf$2<Key, Value>> = MapTreeModule_filter1<Key, Value>(comparer, f, MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), acc_1);
                comparer_mut = comparer;
                f_mut = f;
                m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                acc_mut = acc_2;
                continue MapTreeModule_filterAux;
            }
            else {
                return MapTreeModule_filter1<Key, Value>(comparer, f, MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2), acc);
            }
        }
        else {
            return acc;
        }
        break;
    }
}

export function MapTreeModule_filter<Key, $a>(comparer: IComparer<Key>, f: ((arg0: Key, arg1: $a) => boolean), m: Option<MapTreeLeaf$2<Key, $a>>): Option<MapTreeLeaf$2<Key, $a>> {
    return MapTreeModule_filterAux<Key, $a>(comparer, f, m, MapTreeModule_empty<Key, $a>());
}

export function MapTreeModule_spliceOutSuccessor<Key, Value>(m: Option<MapTreeLeaf$2<Key, Value>>): [Key, Value, Option<MapTreeLeaf$2<Key, Value>>] {
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        if (m2 instanceof MapTreeNode$2) {
            const mn = m2 as MapTreeNode$2<Key, Value>;
            if (MapTreeNode$2__get_Left<Key, Value>(mn) == null) {
                return [MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn)] as [Key, Value, Option<MapTreeLeaf$2<Key, Value>>];
            }
            else {
                const patternInput: [Key, Value, Option<MapTreeLeaf$2<Key, Value>>] = MapTreeModule_spliceOutSuccessor<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(mn));
                return [patternInput[0], patternInput[1], MapTreeModule_mk<Key, Value>(patternInput[2], MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn))] as [Key, Value, Option<MapTreeLeaf$2<Key, Value>>];
            }
        }
        else {
            return [MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2), MapTreeModule_empty<Key, Value>()] as [Key, Value, Option<MapTreeLeaf$2<Key, Value>>];
        }
    }
    else {
        throw new Error("internal error: Map.spliceOutSuccessor");
    }
}

export function MapTreeModule_remove<Key, Value>(comparer: IComparer<Key>, k: Key, m: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Value>> {
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        const c: int32 = comparer.Compare(k, MapTreeLeaf$2__get_Key<Key, Value>(m2)) | 0;
        if (m2 instanceof MapTreeNode$2) {
            const mn = m2 as MapTreeNode$2<Key, Value>;
            if (c < 0) {
                return MapTreeModule_rebalance<Key, Value>(MapTreeModule_remove<Key, Value>(comparer, k, MapTreeNode$2__get_Left<Key, Value>(mn)), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn));
            }
            else if (c === 0) {
                if (MapTreeNode$2__get_Left<Key, Value>(mn) == null) {
                    return MapTreeNode$2__get_Right<Key, Value>(mn);
                }
                else if (MapTreeNode$2__get_Right<Key, Value>(mn) == null) {
                    return MapTreeNode$2__get_Left<Key, Value>(mn);
                }
                else {
                    const patternInput: [Key, Value, Option<MapTreeLeaf$2<Key, Value>>] = MapTreeModule_spliceOutSuccessor<Key, Value>(MapTreeNode$2__get_Right<Key, Value>(mn));
                    return MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(mn), patternInput[0], patternInput[1], patternInput[2]);
                }
            }
            else {
                return MapTreeModule_rebalance<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(mn), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeModule_remove<Key, Value>(comparer, k, MapTreeNode$2__get_Right<Key, Value>(mn)));
            }
        }
        else if (c === 0) {
            return MapTreeModule_empty<Key, Value>();
        }
        else {
            return m;
        }
    }
    else {
        return MapTreeModule_empty<Key, Value>();
    }
}

export function MapTreeModule_change<Key, Value>(comparer: IComparer<Key>, k: Key, u: ((arg0: Option<Value>) => Option<Value>), m: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Value>> {
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        if (m2 instanceof MapTreeNode$2) {
            const mn = m2 as MapTreeNode$2<Key, Value>;
            const c: int32 = comparer.Compare(k, MapTreeLeaf$2__get_Key<Key, Value>(mn)) | 0;
            if (c < 0) {
                return MapTreeModule_rebalance<Key, Value>(MapTreeModule_change<Key, Value>(comparer, k, u, MapTreeNode$2__get_Left<Key, Value>(mn)), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn));
            }
            else if (c === 0) {
                const matchValue_1: Option<Value> = u(some(MapTreeLeaf$2__get_Value<Key, Value>(mn)));
                if (matchValue_1 != null) {
                    return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, value_1(matchValue_1), MapTreeNode$2__get_Left<Key, Value>(mn), MapTreeNode$2__get_Right<Key, Value>(mn), MapTreeNode$2__get_Height<Key, Value>(mn));
                }
                else if (MapTreeNode$2__get_Left<Key, Value>(mn) == null) {
                    return MapTreeNode$2__get_Right<Key, Value>(mn);
                }
                else if (MapTreeNode$2__get_Right<Key, Value>(mn) == null) {
                    return MapTreeNode$2__get_Left<Key, Value>(mn);
                }
                else {
                    const patternInput: [Key, Value, Option<MapTreeLeaf$2<Key, Value>>] = MapTreeModule_spliceOutSuccessor<Key, Value>(MapTreeNode$2__get_Right<Key, Value>(mn));
                    return MapTreeModule_mk<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(mn), patternInput[0], patternInput[1], patternInput[2]);
                }
            }
            else {
                return MapTreeModule_rebalance<Key, Value>(MapTreeNode$2__get_Left<Key, Value>(mn), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), MapTreeModule_change<Key, Value>(comparer, k, u, MapTreeNode$2__get_Right<Key, Value>(mn)));
            }
        }
        else {
            const c_1: int32 = comparer.Compare(k, MapTreeLeaf$2__get_Key<Key, Value>(m2)) | 0;
            if (c_1 < 0) {
                const matchValue_2: Option<Value> = u(undefined);
                if (matchValue_2 != null) {
                    return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, value_1(matchValue_2), MapTreeModule_empty<Key, Value>(), m, 2);
                }
                else {
                    return m;
                }
            }
            else if (c_1 === 0) {
                const matchValue_3: Option<Value> = u(some(MapTreeLeaf$2__get_Value<Key, Value>(m2)));
                if (matchValue_3 != null) {
                    return MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(k, value_1(matchValue_3));
                }
                else {
                    return MapTreeModule_empty<Key, Value>();
                }
            }
            else {
                const matchValue_4: Option<Value> = u(undefined);
                if (matchValue_4 != null) {
                    return MapTreeNode$2_$ctor_Z39DE9543<Key, Value>(k, value_1(matchValue_4), m, MapTreeModule_empty<Key, Value>(), 2);
                }
                else {
                    return m;
                }
            }
        }
    }
    else {
        const matchValue: Option<Value> = u(undefined);
        if (matchValue != null) {
            return MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(k, value_1(matchValue));
        }
        else {
            return m;
        }
    }
}

export function MapTreeModule_mem<Key, Value>(comparer_mut: IComparer<Key>, k_mut: Key, m_mut: Option<MapTreeLeaf$2<Key, Value>>): boolean {
    MapTreeModule_mem:
    while (true) {
        const comparer: IComparer<Key> = comparer_mut, k: Key = k_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            const c: int32 = comparer.Compare(k, MapTreeLeaf$2__get_Key<Key, Value>(m2)) | 0;
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                if (c < 0) {
                    comparer_mut = comparer;
                    k_mut = k;
                    m_mut = MapTreeNode$2__get_Left<Key, Value>(mn);
                    continue MapTreeModule_mem;
                }
                else if (c === 0) {
                    return true;
                }
                else {
                    comparer_mut = comparer;
                    k_mut = k;
                    m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                    continue MapTreeModule_mem;
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

export function MapTreeModule_iterOpt<Key, Value>(f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>): void {
    MapTreeModule_iterOpt:
    while (true) {
        const f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                MapTreeModule_iterOpt<Key, Value>(f, MapTreeNode$2__get_Left<Key, Value>(mn));
                f(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn));
                f_mut = f;
                m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                continue MapTreeModule_iterOpt;
            }
            else {
                f(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2));
            }
        }
        break;
    }
}

export function MapTreeModule_iter<$a, $b>(f: ((arg0: $a, arg1: $b) => void), m: Option<MapTreeLeaf$2<$a, $b>>): void {
    MapTreeModule_iterOpt<$a, $b>(f, m);
}

export function MapTreeModule_tryPickOpt<Key, Value, $a>(f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>): Option<$a> {
    MapTreeModule_tryPickOpt:
    while (true) {
        const f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                const matchValue: Option<$a> = MapTreeModule_tryPickOpt<Key, Value, $a>(f, MapTreeNode$2__get_Left<Key, Value>(mn));
                if (matchValue == null) {
                    const matchValue_1: Option<$a> = f(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn));
                    if (matchValue_1 == null) {
                        f_mut = f;
                        m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                        continue MapTreeModule_tryPickOpt;
                    }
                    else {
                        return matchValue_1;
                    }
                }
                else {
                    return matchValue;
                }
            }
            else {
                return f(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2));
            }
        }
        else {
            return undefined;
        }
        break;
    }
}

export function MapTreeModule_tryPick<$a, $b, $c>(f: ((arg0: $a, arg1: $b) => Option<$c>), m: Option<MapTreeLeaf$2<$a, $b>>): Option<$c> {
    return MapTreeModule_tryPickOpt<$a, $b, $c>(f, m);
}

export function MapTreeModule_existsOpt<Key, Value>(f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>): boolean {
    MapTreeModule_existsOpt:
    while (true) {
        const f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                if (MapTreeModule_existsOpt<Key, Value>(f, MapTreeNode$2__get_Left<Key, Value>(mn)) ? true : f(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn))) {
                    return true;
                }
                else {
                    f_mut = f;
                    m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                    continue MapTreeModule_existsOpt;
                }
            }
            else {
                return f(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2));
            }
        }
        else {
            return false;
        }
        break;
    }
}

export function MapTreeModule_exists<$a, $b>(f: ((arg0: $a, arg1: $b) => boolean), m: Option<MapTreeLeaf$2<$a, $b>>): boolean {
    return MapTreeModule_existsOpt<$a, $b>(f, m);
}

export function MapTreeModule_forallOpt<Key, Value>(f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>): boolean {
    MapTreeModule_forallOpt:
    while (true) {
        const f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                if (MapTreeModule_forallOpt<Key, Value>(f, MapTreeNode$2__get_Left<Key, Value>(mn)) && f(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn))) {
                    f_mut = f;
                    m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                    continue MapTreeModule_forallOpt;
                }
                else {
                    return false;
                }
            }
            else {
                return f(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2));
            }
        }
        else {
            return true;
        }
        break;
    }
}

export function MapTreeModule_forall<$a, $b>(f: ((arg0: $a, arg1: $b) => boolean), m: Option<MapTreeLeaf$2<$a, $b>>): boolean {
    return MapTreeModule_forallOpt<$a, $b>(f, m);
}

export function MapTreeModule_map<Value, Result, Key>(f: ((arg0: Value) => Result), m: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Result>> {
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        if (m2 instanceof MapTreeNode$2) {
            const mn = m2 as MapTreeNode$2<Key, Value>;
            const l2: Option<MapTreeLeaf$2<Key, Result>> = MapTreeModule_map<Value, Result, Key>(f, MapTreeNode$2__get_Left<Key, Value>(mn));
            const v2: Result = f(MapTreeLeaf$2__get_Value<Key, Value>(mn));
            const r2: Option<MapTreeLeaf$2<Key, Result>> = MapTreeModule_map<Value, Result, Key>(f, MapTreeNode$2__get_Right<Key, Value>(mn));
            return MapTreeNode$2_$ctor_Z39DE9543<Key, Result>(MapTreeLeaf$2__get_Key<Key, Value>(mn), v2, l2, r2, MapTreeNode$2__get_Height<Key, Value>(mn));
        }
        else {
            return MapTreeLeaf$2_$ctor_5BDDA1<Key, Result>(MapTreeLeaf$2__get_Key<Key, Value>(m2), f(MapTreeLeaf$2__get_Value<Key, Value>(m2)));
        }
    }
    else {
        return MapTreeModule_empty<Key, Result>();
    }
}

export function MapTreeModule_mapiOpt<Key, Value, Result>(f: any, m: Option<MapTreeLeaf$2<Key, Value>>): Option<MapTreeLeaf$2<Key, Result>> {
    if (m != null) {
        const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
        if (m2 instanceof MapTreeNode$2) {
            const mn = m2 as MapTreeNode$2<Key, Value>;
            const l2: Option<MapTreeLeaf$2<Key, Result>> = MapTreeModule_mapiOpt<Key, Value, Result>(f, MapTreeNode$2__get_Left<Key, Value>(mn));
            const v2: Result = f(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn));
            const r2: Option<MapTreeLeaf$2<Key, Result>> = MapTreeModule_mapiOpt<Key, Value, Result>(f, MapTreeNode$2__get_Right<Key, Value>(mn));
            return MapTreeNode$2_$ctor_Z39DE9543<Key, Result>(MapTreeLeaf$2__get_Key<Key, Value>(mn), v2, l2, r2, MapTreeNode$2__get_Height<Key, Value>(mn));
        }
        else {
            return MapTreeLeaf$2_$ctor_5BDDA1<Key, Result>(MapTreeLeaf$2__get_Key<Key, Value>(m2), f(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2)));
        }
    }
    else {
        return MapTreeModule_empty<Key, Result>();
    }
}

export function MapTreeModule_mapi<$a, $b, $c>(f: ((arg0: $a, arg1: $b) => $c), m: Option<MapTreeLeaf$2<$a, $b>>): Option<MapTreeLeaf$2<$a, $c>> {
    return MapTreeModule_mapiOpt<$a, $b, $c>(f, m);
}

export function MapTreeModule_foldBackOpt<Key, Value, $a>(f_mut: any, m_mut: Option<MapTreeLeaf$2<Key, Value>>, x_mut: $a): $a {
    MapTreeModule_foldBackOpt:
    while (true) {
        const f: any = f_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut, x: $a = x_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                const x_1: $a = MapTreeModule_foldBackOpt<Key, Value, $a>(f, MapTreeNode$2__get_Right<Key, Value>(mn), x);
                const x_2: $a = f(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), x_1);
                f_mut = f;
                m_mut = MapTreeNode$2__get_Left<Key, Value>(mn);
                x_mut = x_2;
                continue MapTreeModule_foldBackOpt;
            }
            else {
                return f(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2), x);
            }
        }
        else {
            return x;
        }
        break;
    }
}

export function MapTreeModule_foldBack<$a, $b, $c>(f: ((arg0: $a, arg1: $b, arg2: $c) => $c), m: Option<MapTreeLeaf$2<$a, $b>>, x: $c): $c {
    return MapTreeModule_foldBackOpt<$a, $b, $c>(f, m, x);
}

export function MapTreeModule_foldOpt<$a, Key, Value>(f_mut: any, x_mut: $a, m_mut: Option<MapTreeLeaf$2<Key, Value>>): $a {
    MapTreeModule_foldOpt:
    while (true) {
        const f: any = f_mut, x: $a = x_mut, m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            if (m2 instanceof MapTreeNode$2) {
                const mn = m2 as MapTreeNode$2<Key, Value>;
                f_mut = f;
                x_mut = f(MapTreeModule_foldOpt<$a, Key, Value>(f, x, MapTreeNode$2__get_Left<Key, Value>(mn)), MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn));
                m_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                continue MapTreeModule_foldOpt;
            }
            else {
                return f(x, MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2));
            }
        }
        else {
            return x;
        }
        break;
    }
}

export function MapTreeModule_fold<$a, $b, $c>(f: ((arg0: $a, arg1: $b, arg2: $c) => $a), x: $a, m: Option<MapTreeLeaf$2<$b, $c>>): $a {
    return MapTreeModule_foldOpt<$a, $b, $c>(f, x, m);
}

export function MapTreeModule_foldSectionOpt<Key, Value, a>(comparer: IComparer<Key>, lo: Key, hi: Key, f: any, m: Option<MapTreeLeaf$2<Key, Value>>, x: a): a {
    const foldFromTo = (f_1_mut: any, m_1_mut: Option<MapTreeLeaf$2<Key, Value>>, x_1_mut: a): a => {
        foldFromTo:
        while (true) {
            const f_1: any = f_1_mut, m_1: Option<MapTreeLeaf$2<Key, Value>> = m_1_mut, x_1: a = x_1_mut;
            if (m_1 != null) {
                const m2: MapTreeLeaf$2<Key, Value> = value_1(m_1);
                if (m2 instanceof MapTreeNode$2) {
                    const mn = m2 as MapTreeNode$2<Key, Value>;
                    const cLoKey: int32 = comparer.Compare(lo, MapTreeLeaf$2__get_Key<Key, Value>(mn)) | 0;
                    const cKeyHi: int32 = comparer.Compare(MapTreeLeaf$2__get_Key<Key, Value>(mn), hi) | 0;
                    const x_2: a = (cLoKey < 0) ? foldFromTo(f_1, MapTreeNode$2__get_Left<Key, Value>(mn), x_1) : x_1;
                    const x_3: a = ((cLoKey <= 0) && (cKeyHi <= 0)) ? f_1(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn), x_2) : x_2;
                    if (cKeyHi < 0) {
                        f_1_mut = f_1;
                        m_1_mut = MapTreeNode$2__get_Right<Key, Value>(mn);
                        x_1_mut = x_3;
                        continue foldFromTo;
                    }
                    else {
                        return x_3;
                    }
                }
                else if ((comparer.Compare(lo, MapTreeLeaf$2__get_Key<Key, Value>(m2)) <= 0) && (comparer.Compare(MapTreeLeaf$2__get_Key<Key, Value>(m2), hi) <= 0)) {
                    return f_1(MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2), x_1);
                }
                else {
                    return x_1;
                }
            }
            else {
                return x_1;
            }
            break;
        }
    };
    if (comparer.Compare(lo, hi) === 1) {
        return x;
    }
    else {
        return foldFromTo(f, m, x);
    }
}

export function MapTreeModule_foldSection<Key, $a, $b>(comparer: IComparer<Key>, lo: Key, hi: Key, f: ((arg0: Key, arg1: $a, arg2: $b) => $b), m: Option<MapTreeLeaf$2<Key, $a>>, x: $b): $b {
    return MapTreeModule_foldSectionOpt<Key, $a, $b>(comparer, lo, hi, f, m, x);
}

export function MapTreeModule_toList<Key, Value>(m: Option<MapTreeLeaf$2<Key, Value>>): FSharpList<[Key, Value]> {
    const loop = (m_1_mut: Option<MapTreeLeaf$2<Key, Value>>, acc_mut: FSharpList<[Key, Value]>): FSharpList<[Key, Value]> => {
        loop:
        while (true) {
            const m_1: Option<MapTreeLeaf$2<Key, Value>> = m_1_mut, acc: FSharpList<[Key, Value]> = acc_mut;
            if (m_1 != null) {
                const m2: MapTreeLeaf$2<Key, Value> = value_1(m_1);
                if (m2 instanceof MapTreeNode$2) {
                    const mn = m2 as MapTreeNode$2<Key, Value>;
                    m_1_mut = MapTreeNode$2__get_Left<Key, Value>(mn);
                    acc_mut = cons([MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn)] as [Key, Value], loop(MapTreeNode$2__get_Right<Key, Value>(mn), acc));
                    continue loop;
                }
                else {
                    return cons([MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2)] as [Key, Value], acc);
                }
            }
            else {
                return acc;
            }
            break;
        }
    };
    return loop(m, empty_1<[Key, Value]>());
}

export function MapTreeModule_copyToArray<$a, $b>(m: Option<MapTreeLeaf$2<$a, $b>>, arr: [$a, $b][], i: int32): void {
    let j: int32 = i;
    MapTreeModule_iter<$a, $b>((x: $a, y: $b): void => {
        setItem(arr, j, [x, y] as [$a, $b]);
        j = ((j + 1) | 0);
    }, m);
}

export function MapTreeModule_toArray<$a, $b>(m: Option<MapTreeLeaf$2<$a, $b>>): [$a, $b][] {
    const n: int32 = MapTreeModule_size<$a, $b>(m) | 0;
    const res: [$a, $b][] = fill(new Array(n), 0, n, [null, null] as [any, any]);
    MapTreeModule_copyToArray<$a, $b>(m, res, 0);
    return res;
}

export function MapTreeModule_ofList<$a, $b>(comparer: IComparer<$a>, l: FSharpList<[$a, $b]>): Option<MapTreeLeaf$2<$a, $b>> {
    return fold_1<[$a, $b], Option<MapTreeLeaf$2<$a, $b>>>((acc: Option<MapTreeLeaf$2<$a, $b>>, tupledArg: [$a, $b]): Option<MapTreeLeaf$2<$a, $b>> => MapTreeModule_add<$a, $b>(comparer, tupledArg[0], tupledArg[1], acc), MapTreeModule_empty<$a, $b>(), l);
}

export function MapTreeModule_mkFromEnumerator<$a, $b>(comparer_mut: IComparer<$a>, acc_mut: Option<MapTreeLeaf$2<$a, $b>>, e_mut: IEnumerator<[$a, $b]>): Option<MapTreeLeaf$2<$a, $b>> {
    MapTreeModule_mkFromEnumerator:
    while (true) {
        const comparer: IComparer<$a> = comparer_mut, acc: Option<MapTreeLeaf$2<$a, $b>> = acc_mut, e: IEnumerator<[$a, $b]> = e_mut;
        if (e["System.Collections.IEnumerator.MoveNext"]()) {
            const patternInput: [$a, $b] = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
            comparer_mut = comparer;
            acc_mut = MapTreeModule_add<$a, $b>(comparer, patternInput[0], patternInput[1], acc);
            e_mut = e;
            continue MapTreeModule_mkFromEnumerator;
        }
        else {
            return acc;
        }
        break;
    }
}

export function MapTreeModule_ofArray<Key, Value>(comparer: IComparer<Key>, arr: [Key, Value][]): Option<MapTreeLeaf$2<Key, Value>> {
    let res: Option<MapTreeLeaf$2<Key, Value>> = MapTreeModule_empty<Key, Value>();
    for (let idx = 0; idx <= (arr.length - 1); idx++) {
        const forLoopVar: [Key, Value] = item(idx, arr);
        res = MapTreeModule_add<Key, Value>(comparer, forLoopVar[0], forLoopVar[1], res);
    }
    return res;
}

export function MapTreeModule_ofSeq<Key, Value>(comparer: IComparer<Key>, c: Iterable<[Key, Value]>): Option<MapTreeLeaf$2<Key, Value>> {
    if (isArrayLike(c)) {
        return MapTreeModule_ofArray<Key, Value>(comparer, c);
    }
    else if (c instanceof FSharpList) {
        return MapTreeModule_ofList<Key, Value>(comparer, c);
    }
    else {
        const ie: IEnumerator<[Key, Value]> = getEnumerator(c);
        try {
            return MapTreeModule_mkFromEnumerator<Key, Value>(comparer, MapTreeModule_empty<Key, Value>(), ie);
        }
        finally {
            disposeSafe(ie as IDisposable);
        }
    }
}

export class MapTreeModule_MapIterator$2<Key, Value> extends Record {
    stack: FSharpList<Option<MapTreeLeaf$2<Key, Value>>>;
    started: boolean;
    constructor(stack: FSharpList<Option<MapTreeLeaf$2<Key, Value>>>, started: boolean) {
        super();
        this.stack = stack;
        this.started = started;
    }
}

export function MapTreeModule_MapIterator$2_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return record_type("Map.MapTreeModule.MapIterator`2", [gen0, gen1], MapTreeModule_MapIterator$2, () => [["stack", list_type(option_type(MapTreeLeaf$2_$reflection(gen0, gen1)))], ["started", bool_type]]);
}

export function MapTreeModule_collapseLHS<Key, Value>(stack_mut: FSharpList<Option<MapTreeLeaf$2<Key, Value>>>): FSharpList<Option<MapTreeLeaf$2<Key, Value>>> {
    MapTreeModule_collapseLHS:
    while (true) {
        const stack: FSharpList<Option<MapTreeLeaf$2<Key, Value>>> = stack_mut;
        if (!isEmpty_1(stack)) {
            const rest: FSharpList<Option<MapTreeLeaf$2<Key, Value>>> = tail(stack);
            const m: Option<MapTreeLeaf$2<Key, Value>> = head(stack);
            if (m != null) {
                const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
                if (m2 instanceof MapTreeNode$2) {
                    const mn = m2 as MapTreeNode$2<Key, Value>;
                    stack_mut = ofArrayWithTail([MapTreeNode$2__get_Left<Key, Value>(mn), MapTreeLeaf$2_$ctor_5BDDA1<Key, Value>(MapTreeLeaf$2__get_Key<Key, Value>(mn), MapTreeLeaf$2__get_Value<Key, Value>(mn)), MapTreeNode$2__get_Right<Key, Value>(mn)], rest);
                    continue MapTreeModule_collapseLHS;
                }
                else {
                    return stack;
                }
            }
            else {
                stack_mut = rest;
                continue MapTreeModule_collapseLHS;
            }
        }
        else {
            return empty_1<Option<MapTreeLeaf$2<Key, Value>>>();
        }
        break;
    }
}

export function MapTreeModule_mkIterator<$a, $b>(m: Option<MapTreeLeaf$2<$a, $b>>): MapTreeModule_MapIterator$2<$a, $b> {
    return new MapTreeModule_MapIterator$2(MapTreeModule_collapseLHS<$a, $b>(singleton(m)), false);
}

export function MapTreeModule_notStarted<$a>(): $a {
    throw new Error("enumeration not started");
}

export function MapTreeModule_alreadyFinished<$a>(): $a {
    throw new Error("enumeration already finished");
}

export function MapTreeModule_current<Key, Value>(i: MapTreeModule_MapIterator$2<Key, Value>): [Key, Value] {
    if (i.started) {
        const matchValue: FSharpList<Option<MapTreeLeaf$2<Key, Value>>> = i.stack;
        if (!isEmpty_1(matchValue)) {
            if (head(matchValue) != null) {
                const m: MapTreeLeaf$2<Key, Value> = value_1(head(matchValue));
                if (m instanceof MapTreeNode$2) {
                    throw new Error("Please report error: Map iterator, unexpected stack for current");
                }
                else {
                    return [MapTreeLeaf$2__get_Key<Key, Value>(m), MapTreeLeaf$2__get_Value<Key, Value>(m)] as [Key, Value];
                }
            }
            else {
                throw new Error("Please report error: Map iterator, unexpected stack for current");
            }
        }
        else {
            return MapTreeModule_alreadyFinished<[Key, Value]>();
        }
    }
    else {
        return MapTreeModule_notStarted<[Key, Value]>();
    }
}

export function MapTreeModule_moveNext<Key, Value>(i: MapTreeModule_MapIterator$2<Key, Value>): boolean {
    if (i.started) {
        const matchValue: FSharpList<Option<MapTreeLeaf$2<Key, Value>>> = i.stack;
        if (!isEmpty_1(matchValue)) {
            if (head(matchValue) != null) {
                const m: MapTreeLeaf$2<Key, Value> = value_1(head(matchValue));
                if (m instanceof MapTreeNode$2) {
                    throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
                }
                else {
                    i.stack = MapTreeModule_collapseLHS<Key, Value>(tail(matchValue));
                    return !isEmpty_1(i.stack);
                }
            }
            else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
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

export function MapTreeModule_mkIEnumerator<a, b>(m: Option<MapTreeLeaf$2<a, b>>): IEnumerator<[a, b]> {
    let i: MapTreeModule_MapIterator$2<a, b> = MapTreeModule_mkIterator<a, b>(m);
    return {
        "System.Collections.Generic.IEnumerator`1.get_Current"(): [a, b] {
            return MapTreeModule_current<a, b>(i);
        },
        "System.Collections.IEnumerator.get_Current"(): any {
            return MapTreeModule_current<a, b>(i);
        },
        "System.Collections.IEnumerator.MoveNext"(): boolean {
            return MapTreeModule_moveNext<a, b>(i);
        },
        "System.Collections.IEnumerator.Reset"(): void {
            i = MapTreeModule_mkIterator<a, b>(m);
        },
        Dispose(): void {
        },
    };
}

export function MapTreeModule_toSeq<$a, $b>(s: Option<MapTreeLeaf$2<$a, $b>>): Iterable<[$a, $b]> {
    return unfold<IEnumerator<[$a, $b]>, [$a, $b]>((en_1: IEnumerator<[$a, $b]>): Option<[[$a, $b], IEnumerator<[$a, $b]>]> => {
        if (en_1["System.Collections.IEnumerator.MoveNext"]()) {
            return [en_1["System.Collections.Generic.IEnumerator`1.get_Current"](), en_1] as [[$a, $b], IEnumerator<[$a, $b]>];
        }
        else {
            return undefined;
        }
    }, MapTreeModule_mkIEnumerator<$a, $b>(s));
}

export function MapTreeModule_leftmost<Key, Value>(m_mut: Option<MapTreeLeaf$2<Key, Value>>): [Key, Value] {
    MapTreeModule_leftmost:
    while (true) {
        const m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            let matchResult: int32, nd_1: MapTreeNode$2<Key, Value>;
            if (m2 instanceof MapTreeNode$2) {
                if (MapTreeNode$2__get_Height<Key, Value>(m2 as MapTreeNode$2<Key, Value>) > 1) {
                    matchResult = 0;
                    nd_1 = (m2 as MapTreeNode$2<Key, Value>);
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
                    if (MapTreeNode$2__get_Left<Key, Value>(nd_1!) == null) {
                        return [MapTreeLeaf$2__get_Key<Key, Value>(nd_1!), MapTreeLeaf$2__get_Value<Key, Value>(nd_1!)] as [Key, Value];
                    }
                    else {
                        m_mut = MapTreeNode$2__get_Left<Key, Value>(nd_1!);
                        continue MapTreeModule_leftmost;
                    }
                default:
                    return [MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2)] as [Key, Value];
            }
        }
        else {
            throw new Error();
        }
        break;
    }
}

export function MapTreeModule_rightmost<Key, Value>(m_mut: Option<MapTreeLeaf$2<Key, Value>>): [Key, Value] {
    MapTreeModule_rightmost:
    while (true) {
        const m: Option<MapTreeLeaf$2<Key, Value>> = m_mut;
        if (m != null) {
            const m2: MapTreeLeaf$2<Key, Value> = value_1(m);
            let matchResult: int32, nd_1: MapTreeNode$2<Key, Value>;
            if (m2 instanceof MapTreeNode$2) {
                if (MapTreeNode$2__get_Height<Key, Value>(m2 as MapTreeNode$2<Key, Value>) > 1) {
                    matchResult = 0;
                    nd_1 = (m2 as MapTreeNode$2<Key, Value>);
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
                    if (MapTreeNode$2__get_Right<Key, Value>(nd_1!) == null) {
                        return [MapTreeLeaf$2__get_Key<Key, Value>(nd_1!), MapTreeLeaf$2__get_Value<Key, Value>(nd_1!)] as [Key, Value];
                    }
                    else {
                        m_mut = MapTreeNode$2__get_Right<Key, Value>(nd_1!);
                        continue MapTreeModule_rightmost;
                    }
                default:
                    return [MapTreeLeaf$2__get_Key<Key, Value>(m2), MapTreeLeaf$2__get_Value<Key, Value>(m2)] as [Key, Value];
            }
        }
        else {
            throw new Error();
        }
        break;
    }
}

export class FSharpMap<Key, Value> implements IMap<Key, Value>, Iterable<[Key, Value]>, Iterable<[Key, Value]> {
    readonly tree: Option<MapTreeLeaf$2<Key, Value>>;
    readonly comparer: IComparer<Key>;
    constructor(comparer: IComparer<Key>, tree: Option<MapTreeLeaf$2<Key, Value>>) {
        this.comparer = comparer;
        this.tree = tree;
    }
    GetHashCode(): int32 {
        const this$: FSharpMap<Key, Value> = this;
        return FSharpMap__ComputeHashCode<Key, Value>(this$) | 0;
    }
    Equals(that: any): boolean {
        const this$: FSharpMap<Key, Value> = this;
        if (that instanceof FSharpMap) {
            const that_1 = that as FSharpMap<Key, Value>;
            const e1: IEnumerator<[Key, Value]> = getEnumerator(this$);
            try {
                const e2: IEnumerator<[Key, Value]> = getEnumerator(that_1);
                try {
                    const loop = (): boolean => {
                        const m1: boolean = e1["System.Collections.IEnumerator.MoveNext"]();
                        if (m1 === e2["System.Collections.IEnumerator.MoveNext"]()) {
                            if (!m1) {
                                return true;
                            }
                            else {
                                const e1c: [Key, Value] = e1["System.Collections.Generic.IEnumerator`1.get_Current"]();
                                const e2c: [Key, Value] = e2["System.Collections.Generic.IEnumerator`1.get_Current"]();
                                if (equals(e1c[0], e2c[0]) && equals(e1c[1], e2c[1])) {
                                    return loop();
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            return false;
                        }
                    };
                    return loop();
                }
                finally {
                    disposeSafe(e2 as IDisposable);
                }
            }
            finally {
                disposeSafe(e1 as IDisposable);
            }
        }
        else {
            return false;
        }
    }
    toString(): string {
        const this$: FSharpMap<Key, Value> = this;
        return ("map [" + join("; ", map_1<[Key, Value], string>((kv: [Key, Value]): string => format("({0}, {1})", kv[0], kv[1]), this$))) + "]";
    }
    get [Symbol.toStringTag](): string {
        return "FSharpMap";
    }
    toJSON(): any {
        const this$: FSharpMap<Key, Value> = this;
        return Array.from<any>(this$);
    }
    GetEnumerator(): IEnumerator<[Key, Value]> {
        const _: FSharpMap<Key, Value> = this;
        return MapTreeModule_mkIEnumerator<Key, Value>(_.tree);
    }
    [Symbol.iterator](): Iterator<[Key, Value]> {
        return toIterator(getEnumerator(this));
    }
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any> {
        const _: FSharpMap<Key, Value> = this;
        return MapTreeModule_mkIEnumerator<Key, Value>(_.tree);
    }
    CompareTo(obj: any): int32 {
        const m: FSharpMap<Key, Value> = this;
        if (obj instanceof FSharpMap) {
            const m2 = obj as FSharpMap<Key, Value>;
            return compareWith<[Key, Value]>((kvp1: [Key, Value], kvp2: [Key, Value]): int32 => {
                const c: int32 = m.comparer.Compare(kvp1[0], kvp2[0]) | 0;
                return ((c !== 0) ? c : compare(kvp1[1], kvp2[1])) | 0;
            }, m, m2) | 0;
        }
        else {
            throw new Error("not comparable\\nParameter name: obj");
        }
    }
    "System.Collections.Generic.ICollection`1.Add2B595"(x: [Key, Value]): void {
        throw new Error("Map cannot be mutated");
    }
    "System.Collections.Generic.ICollection`1.Clear"(): void {
        throw new Error("Map cannot be mutated");
    }
    "System.Collections.Generic.ICollection`1.Remove2B595"(x: [Key, Value]): boolean {
        throw new Error("Map cannot be mutated");
    }
    "System.Collections.Generic.ICollection`1.Contains2B595"(x: [Key, Value]): boolean {
        const m: FSharpMap<Key, Value> = this;
        return FSharpMap__ContainsKey<Key, Value>(m, x[0]) && equals(FSharpMap__get_Item<Key, Value>(m, x[0]), x[1]);
    }
    "System.Collections.Generic.ICollection`1.CopyToZ3B4C077E"(arr: [Key, Value][], i: int32): void {
        const m: FSharpMap<Key, Value> = this;
        MapTreeModule_copyToArray<Key, Value>(m.tree, arr, i);
    }
    "System.Collections.Generic.ICollection`1.get_IsReadOnly"(): boolean {
        return true;
    }
    "System.Collections.Generic.ICollection`1.get_Count"(): int32 {
        const m: FSharpMap<Key, Value> = this;
        return FSharpMap__get_Count<Key, Value>(m) | 0;
    }
    "System.Collections.Generic.IReadOnlyCollection`1.get_Count"(): int32 {
        const m: FSharpMap<Key, Value> = this;
        return FSharpMap__get_Count<Key, Value>(m) | 0;
    }
    get size(): int32 {
        const m: FSharpMap<Key, Value> = this;
        return FSharpMap__get_Count<Key, Value>(m) | 0;
    }
    clear(): void {
        throw new Error("Map cannot be mutated");
    }
    delete(_arg: Key): boolean {
        throw new Error("Map cannot be mutated");
        return false;
    }
    entries(): Iterable<[Key, Value]> {
        const m: FSharpMap<Key, Value> = this;
        return map_1<[Key, Value], [Key, Value]>((p: [Key, Value]): [Key, Value] => ([p[0], p[1]] as [Key, Value]), m);
    }
    get(k: Key): Value {
        const m: FSharpMap<Key, Value> = this;
        return FSharpMap__get_Item<Key, Value>(m, k);
    }
    has(k: Key): boolean {
        const m: FSharpMap<Key, Value> = this;
        return FSharpMap__ContainsKey<Key, Value>(m, k);
    }
    keys(): Iterable<Key> {
        const m: FSharpMap<Key, Value> = this;
        return map_1<[Key, Value], Key>((p: [Key, Value]): Key => p[0], m);
    }
    set(k: Key, v: Value): IMap<Key, Value> {
        const m: FSharpMap<Key, Value> = this;
        throw new Error("Map cannot be mutated");
        return m;
    }
    values(): Iterable<Value> {
        const m: FSharpMap<Key, Value> = this;
        return map_1<[Key, Value], Value>((p: [Key, Value]): Value => p[1], m);
    }
    forEach(f: ((arg0: Value, arg1: Key, arg2: IMap<Key, Value>) => void), thisArg?: Option<any>): void {
        const m: FSharpMap<Key, Value> = this;
        iterate_1<[Key, Value]>((p: [Key, Value]): void => {
            f(p[1], p[0], m);
        }, m);
    }
}

export function FSharpMap_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return class_type("Map.FSharpMap", [gen0, gen1], FSharpMap);
}

export function FSharpMap_$ctor<Key, Value>(comparer: IComparer<Key>, tree: Option<MapTreeLeaf$2<Key, Value>>): FSharpMap<Key, Value> {
    return new FSharpMap(comparer, tree);
}

export function FSharpMap_Empty<Key, Value>(comparer: IComparer<Key>): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(comparer, MapTreeModule_empty<Key, Value>());
}

export function FSharpMap__get_Comparer<Key, Value>(m: FSharpMap<Key, Value>): IComparer<Key> {
    return m.comparer;
}

export function FSharpMap__get_Tree<Key, Value>(m: FSharpMap<Key, Value>): Option<MapTreeLeaf$2<Key, Value>> {
    return m.tree;
}

export function FSharpMap__Add<Key, Value>(m: FSharpMap<Key, Value>, key: Key, value: Value): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(m.comparer, MapTreeModule_add<Key, Value>(m.comparer, key, value, m.tree));
}

export function FSharpMap__Change<Key, Value>(m: FSharpMap<Key, Value>, key: Key, f: ((arg0: Option<Value>) => Option<Value>)): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(m.comparer, MapTreeModule_change<Key, Value>(m.comparer, key, f, m.tree));
}

export function FSharpMap__get_IsEmpty<Key, Value>(m: FSharpMap<Key, Value>): boolean {
    return m.tree == null;
}

export function FSharpMap__get_Item<Key, Value>(m: FSharpMap<Key, Value>, key: Key): Value {
    return MapTreeModule_find<Key, Value>(m.comparer, key, m.tree);
}

export function FSharpMap__TryPick<Key, Value, $a>(m: FSharpMap<Key, Value>, f: ((arg0: Key, arg1: Value) => Option<$a>)): Option<$a> {
    return MapTreeModule_tryPick<Key, Value, $a>(f, m.tree);
}

export function FSharpMap__Exists<Key, Value>(m: FSharpMap<Key, Value>, predicate: ((arg0: Key, arg1: Value) => boolean)): boolean {
    return MapTreeModule_exists<Key, Value>(predicate, m.tree);
}

export function FSharpMap__Filter<Key, Value>(m: FSharpMap<Key, Value>, predicate: ((arg0: Key, arg1: Value) => boolean)): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(m.comparer, MapTreeModule_filter<Key, Value>(m.comparer, predicate, m.tree));
}

export function FSharpMap__ForAll<Key, Value>(m: FSharpMap<Key, Value>, predicate: ((arg0: Key, arg1: Value) => boolean)): boolean {
    return MapTreeModule_forall<Key, Value>(predicate, m.tree);
}

export function FSharpMap__Fold<Key, Value, $a>(m: FSharpMap<Key, Value>, f: ((arg0: Key, arg1: Value, arg2: $a) => $a), acc: $a): $a {
    return MapTreeModule_foldBack<Key, Value, $a>(f, m.tree, acc);
}

export function FSharpMap__FoldSection<Key, Value, z>(m: FSharpMap<Key, Value>, lo: Key, hi: Key, f: ((arg0: Key, arg1: Value, arg2: z) => z), acc: z): z {
    return MapTreeModule_foldSection<Key, Value, z>(m.comparer, lo, hi, f, m.tree, acc);
}

export function FSharpMap__Iterate<Key, Value>(m: FSharpMap<Key, Value>, f: ((arg0: Key, arg1: Value) => void)): void {
    MapTreeModule_iter<Key, Value>(f, m.tree);
}

export function FSharpMap__MapRange<Key, Value, Result>(m: FSharpMap<Key, Value>, f: ((arg0: Value) => Result)): FSharpMap<Key, Result> {
    return FSharpMap_$ctor<Key, Result>(m.comparer, MapTreeModule_map<Value, Result, Key>(f, m.tree));
}

export function FSharpMap__Map<Key, Value, b>(m: FSharpMap<Key, Value>, f: ((arg0: Key, arg1: Value) => b)): FSharpMap<Key, b> {
    return FSharpMap_$ctor<Key, b>(m.comparer, MapTreeModule_mapi<Key, Value, b>(f, m.tree));
}

export function FSharpMap__Partition<Key, Value>(m: FSharpMap<Key, Value>, predicate: ((arg0: Key, arg1: Value) => boolean)): [FSharpMap<Key, Value>, FSharpMap<Key, Value>] {
    const patternInput: [Option<MapTreeLeaf$2<Key, Value>>, Option<MapTreeLeaf$2<Key, Value>>] = MapTreeModule_partition<Key, Value>(m.comparer, predicate, m.tree);
    return [FSharpMap_$ctor<Key, Value>(m.comparer, patternInput[0]), FSharpMap_$ctor<Key, Value>(m.comparer, patternInput[1])] as [FSharpMap<Key, Value>, FSharpMap<Key, Value>];
}

export function FSharpMap__get_Count<Key, Value>(m: FSharpMap<Key, Value>): int32 {
    return MapTreeModule_size<Key, Value>(m.tree);
}

export function FSharpMap__ContainsKey<Key, Value>(m: FSharpMap<Key, Value>, key: Key): boolean {
    return MapTreeModule_mem<Key, Value>(m.comparer, key, m.tree);
}

export function FSharpMap__Remove<Key, Value>(m: FSharpMap<Key, Value>, key: Key): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(m.comparer, MapTreeModule_remove<Key, Value>(m.comparer, key, m.tree));
}

export function FSharpMap__TryGetValue<Key, Value>(_: FSharpMap<Key, Value>, key: Key, value: FSharpRef<Value>): boolean {
    const matchValue: Option<Value> = MapTreeModule_tryFind<Key, Value>(_.comparer, key, _.tree);
    if (matchValue == null) {
        return false;
    }
    else {
        const v: Value = value_1(matchValue);
        value.contents = v;
        return true;
    }
}

export function FSharpMap__get_Keys<Key, Value>(_: FSharpMap<Key, Value>): Iterable<Key> {
    return map_2<[Key, Value], Key>((kvp: [Key, Value]): Key => kvp[0], MapTreeModule_toArray<Key, Value>(_.tree));
}

export function FSharpMap__get_Values<Key, Value>(_: FSharpMap<Key, Value>): Iterable<Value> {
    return map_2<[Key, Value], Value>((kvp: [Key, Value]): Value => kvp[1], MapTreeModule_toArray<Key, Value>(_.tree));
}

export function FSharpMap__get_MinKeyValue<Key, Value>(m: FSharpMap<Key, Value>): [Key, Value] {
    return MapTreeModule_leftmost<Key, Value>(m.tree);
}

export function FSharpMap__get_MaxKeyValue<Key, Value>(m: FSharpMap<Key, Value>): [Key, Value] {
    return MapTreeModule_rightmost<Key, Value>(m.tree);
}

export function FSharpMap__TryFind<Key, Value>(m: FSharpMap<Key, Value>, key: Key): Option<Value> {
    return MapTreeModule_tryFind<Key, Value>(m.comparer, key, m.tree);
}

export function FSharpMap__ToList<Key, Value>(m: FSharpMap<Key, Value>): FSharpList<[Key, Value]> {
    return MapTreeModule_toList<Key, Value>(m.tree);
}

export function FSharpMap__ToArray<Key, Value>(m: FSharpMap<Key, Value>): [Key, Value][] {
    return MapTreeModule_toArray<Key, Value>(m.tree);
}

export function FSharpMap__ComputeHashCode<Key, Value>(this$: FSharpMap<Key, Value>): int32 {
    const combineHash = (x: int32, y: int32): int32 => (((x << 1) + y) + 631);
    let res = 0;
    const enumerator: IEnumerator<[Key, Value]> = getEnumerator(this$);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const activePatternResult: [Key, Value] = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            res = (combineHash(res, structuralHash(activePatternResult[0])) | 0);
            res = (combineHash(res, structuralHash(activePatternResult[1])) | 0);
        }
    }
    finally {
        disposeSafe(enumerator as IDisposable);
    }
    return res | 0;
}

export function isEmpty<$a, $b>(table: FSharpMap<$a, $b>): boolean {
    return FSharpMap__get_IsEmpty<$a, $b>(table);
}

export function add<$a, $b>(key: $a, value: $b, table: FSharpMap<$a, $b>): FSharpMap<$a, $b> {
    return FSharpMap__Add<$a, $b>(table, key, value);
}

export function change<$a, $b>(key: $a, f: ((arg0: Option<$b>) => Option<$b>), table: FSharpMap<$a, $b>): FSharpMap<$a, $b> {
    return FSharpMap__Change<$a, $b>(table, key, f);
}

export function find<$a, $b>(key: $a, table: FSharpMap<$a, $b>): $b {
    return FSharpMap__get_Item<$a, $b>(table, key);
}

export function tryFind<$a, $b>(key: $a, table: FSharpMap<$a, $b>): Option<$b> {
    return FSharpMap__TryFind<$a, $b>(table, key);
}

export function remove<$a, $b>(key: $a, table: FSharpMap<$a, $b>): FSharpMap<$a, $b> {
    return FSharpMap__Remove<$a, $b>(table, key);
}

export function containsKey<$a, $b>(key: $a, table: FSharpMap<$a, $b>): boolean {
    return FSharpMap__ContainsKey<$a, $b>(table, key);
}

export function iterate<$a, $b>(action: ((arg0: $a, arg1: $b) => void), table: FSharpMap<$a, $b>): void {
    FSharpMap__Iterate<$a, $b>(table, action);
}

export function tryPick<$a, $b, $c>(chooser: ((arg0: $a, arg1: $b) => Option<$c>), table: FSharpMap<$a, $b>): Option<$c> {
    return FSharpMap__TryPick<$a, $b, $c>(table, chooser);
}

export function pick<$a, $b, $c>(chooser: ((arg0: $a, arg1: $b) => Option<$c>), table: FSharpMap<$a, $b>): $c {
    const matchValue: Option<$c> = tryPick<$a, $b, $c>(chooser, table);
    if (matchValue != null) {
        return value_1(matchValue);
    }
    else {
        throw new Error();
    }
}

export function exists<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), table: FSharpMap<$a, $b>): boolean {
    return FSharpMap__Exists<$a, $b>(table, predicate);
}

export function filter<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), table: FSharpMap<$a, $b>): FSharpMap<$a, $b> {
    return FSharpMap__Filter<$a, $b>(table, predicate);
}

export function partition<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), table: FSharpMap<$a, $b>): [FSharpMap<$a, $b>, FSharpMap<$a, $b>] {
    return FSharpMap__Partition<$a, $b>(table, predicate);
}

export function forAll<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), table: FSharpMap<$a, $b>): boolean {
    return FSharpMap__ForAll<$a, $b>(table, predicate);
}

export function map<$a, $b, $c>(mapping: ((arg0: $a, arg1: $b) => $c), table: FSharpMap<$a, $b>): FSharpMap<$a, $c> {
    return FSharpMap__Map<$a, $b, $c>(table, mapping);
}

export function fold<Key, T, State>(folder: ((arg0: State, arg1: Key, arg2: T) => State), state: State, table: FSharpMap<Key, T>): State {
    return MapTreeModule_fold<State, Key, T>(folder, state, FSharpMap__get_Tree<Key, T>(table));
}

export function foldBack<Key, T, State>(folder: ((arg0: Key, arg1: T, arg2: State) => State), table: FSharpMap<Key, T>, state: State): State {
    return MapTreeModule_foldBack<Key, T, State>(folder, FSharpMap__get_Tree<Key, T>(table), state);
}

export function toSeq<$a, $b>(table: FSharpMap<$a, $b>): Iterable<[$a, $b]> {
    return map_1<[$a, $b], [$a, $b]>((kvp: [$a, $b]): [$a, $b] => ([kvp[0], kvp[1]] as [$a, $b]), table);
}

export function findKey<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), table: FSharpMap<$a, $b>): $a {
    return pick_1<[$a, $b], $a>((kvp: [$a, $b]): Option<$a> => {
        const k: $a = kvp[0];
        if (predicate(k, kvp[1])) {
            return some(k);
        }
        else {
            return undefined;
        }
    }, table);
}

export function tryFindKey<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), table: FSharpMap<$a, $b>): Option<$a> {
    return tryPick_1<[$a, $b], $a>((kvp: [$a, $b]): Option<$a> => {
        const k: $a = kvp[0];
        if (predicate(k, kvp[1])) {
            return some(k);
        }
        else {
            return undefined;
        }
    }, table);
}

export function ofList<Key, Value>(elements: FSharpList<[Key, Value]>, comparer: IComparer<Key>): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(comparer, MapTreeModule_ofSeq<Key, Value>(comparer, elements));
}

export function ofSeq<T, $a>(elements: Iterable<[T, $a]>, comparer: IComparer<T>): FSharpMap<T, $a> {
    return FSharpMap_$ctor<T, $a>(comparer, MapTreeModule_ofSeq<T, $a>(comparer, elements));
}

export function ofArray<Key, Value>(elements: [Key, Value][], comparer: IComparer<Key>): FSharpMap<Key, Value> {
    return FSharpMap_$ctor<Key, Value>(comparer, MapTreeModule_ofSeq<Key, Value>(comparer, elements));
}

export function toList<$a, $b>(table: FSharpMap<$a, $b>): FSharpList<[$a, $b]> {
    return FSharpMap__ToList<$a, $b>(table);
}

export function toArray<$a, $b>(table: FSharpMap<$a, $b>): [$a, $b][] {
    return FSharpMap__ToArray<$a, $b>(table);
}

export function keys<K, V>(table: FSharpMap<K, V>): Iterable<K> {
    return FSharpMap__get_Keys<K, V>(table);
}

export function values<K, V>(table: FSharpMap<K, V>): Iterable<V> {
    return FSharpMap__get_Values<K, V>(table);
}

export function minKeyValue<$a, $b>(table: FSharpMap<$a, $b>): [$a, $b] {
    return FSharpMap__get_MinKeyValue<$a, $b>(table);
}

export function maxKeyValue<$a, $b>(table: FSharpMap<$a, $b>): [$a, $b] {
    return FSharpMap__get_MaxKeyValue<$a, $b>(table);
}

export function empty<Key, Value>(comparer: IComparer<Key>): FSharpMap<Key, Value> {
    return FSharpMap_Empty<Key, Value>(comparer);
}

export function count<$a, $b>(table: FSharpMap<$a, $b>): int32 {
    return FSharpMap__get_Count<$a, $b>(table);
}

