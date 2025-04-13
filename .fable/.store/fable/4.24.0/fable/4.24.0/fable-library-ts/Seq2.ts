import { toList, toArray, map, filter, delay } from "./Seq.js";
import { HashSet } from "./MutableSet.js";
import { defaultOf, IDisposable, disposeSafe, IEnumerator, getEnumerator, IMap, IEqualityComparer, ISet } from "./Util.js";
import { addToDict, getItemFromDict, tryGetValue, addToSet } from "./MapUtil.js";
import { Dictionary } from "./MutableMap.js";
import { int32 } from "./Int32.js";
import { FSharpRef } from "./Types.js";
import { FSharpList } from "./List.js";

export function distinct<T>(xs: Iterable<T>, comparer: IEqualityComparer<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => {
        const hashSet: ISet<T> = new HashSet<T>([], comparer);
        return filter<T>((x: T): boolean => addToSet(x, hashSet), xs);
    });
}

export function distinctBy<T, Key>(projection: ((arg0: T) => Key), xs: Iterable<T>, comparer: IEqualityComparer<Key>): Iterable<T> {
    return delay<T>((): Iterable<T> => {
        const hashSet: ISet<Key> = new HashSet<Key>([], comparer);
        return filter<T>((x: T): boolean => addToSet(projection(x), hashSet), xs);
    });
}

export function except<T>(itemsToExclude: Iterable<T>, xs: Iterable<T>, comparer: IEqualityComparer<T>): Iterable<T> {
    return delay<T>((): Iterable<T> => {
        const hashSet: ISet<T> = new HashSet<T>(itemsToExclude, comparer);
        return filter<T>((x: T): boolean => addToSet(x, hashSet), xs);
    });
}

export function countBy<T, Key>(projection: ((arg0: T) => Key), xs: Iterable<T>, comparer: IEqualityComparer<Key>): Iterable<[Key, int32]> {
    return delay<[Key, int32]>((): Iterable<[Key, int32]> => {
        const dict: IMap<Key, int32> = new Dictionary<Key, int32>([], comparer);
        const keys: Key[] = [];
        const enumerator: IEnumerator<T> = getEnumerator(xs);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const key: Key = projection(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
                let matchValue: [boolean, int32];
                let outArg = 0;
                matchValue = ([tryGetValue(dict, key, new FSharpRef<int32>((): int32 => outArg, (v: int32): void => {
                    outArg = (v | 0);
                })), outArg] as [boolean, int32]);
                if (matchValue[0]) {
                    dict.set(key, matchValue[1] + 1);
                }
                else {
                    dict.set(key, 1);
                    void (keys.push(key));
                }
            }
        }
        finally {
            disposeSafe(enumerator as IDisposable);
        }
        return map<Key, [Key, int32]>((key_1: Key): [Key, int32] => ([key_1, getItemFromDict(dict, key_1)] as [Key, int32]), keys);
    });
}

export function groupBy<T, Key>(projection: ((arg0: T) => Key), xs: Iterable<T>, comparer: IEqualityComparer<Key>): Iterable<[Key, Iterable<T>]> {
    return delay<[Key, Iterable<T>]>((): Iterable<[Key, Iterable<T>]> => {
        const dict: IMap<Key, T[]> = new Dictionary<Key, T[]>([], comparer);
        const keys: Key[] = [];
        const enumerator: IEnumerator<T> = getEnumerator(xs);
        try {
            while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                const x: T = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
                const key: Key = projection(x);
                let matchValue: [boolean, T[]];
                let outArg: T[] = defaultOf();
                matchValue = ([tryGetValue(dict, key, new FSharpRef<T[]>((): T[] => outArg, (v: T[]): void => {
                    outArg = v;
                })), outArg] as [boolean, T[]]);
                if (matchValue[0]) {
                    void (matchValue[1].push(x));
                }
                else {
                    addToDict(dict, key, [x]);
                    void (keys.push(key));
                }
            }
        }
        finally {
            disposeSafe(enumerator as IDisposable);
        }
        return map<Key, [Key, Iterable<T>]>((key_1: Key): [Key, Iterable<T>] => ([key_1, getItemFromDict(dict, key_1)] as [Key, Iterable<T>]), keys);
    });
}

export function Array_distinct<T>(xs: T[], comparer: IEqualityComparer<T>): T[] {
    return toArray<T>(distinct<T>(xs, comparer));
}

export function Array_distinctBy<T, Key>(projection: ((arg0: T) => Key), xs: T[], comparer: IEqualityComparer<Key>): T[] {
    return toArray<T>(distinctBy<T, Key>(projection, xs, comparer));
}

export function Array_except<T>(itemsToExclude: Iterable<T>, xs: T[], comparer: IEqualityComparer<T>): T[] {
    return toArray<T>(except<T>(itemsToExclude, xs, comparer));
}

export function Array_countBy<T, Key>(projection: ((arg0: T) => Key), xs: T[], comparer: IEqualityComparer<Key>): [Key, int32][] {
    return toArray<[Key, int32]>(countBy<T, Key>(projection, xs, comparer));
}

export function Array_groupBy<T, Key>(projection: ((arg0: T) => Key), xs: T[], comparer: IEqualityComparer<Key>): [Key, T[]][] {
    return toArray<[Key, T[]]>(map<[Key, Iterable<T>], [Key, T[]]>((tupledArg: [Key, Iterable<T>]): [Key, T[]] => ([tupledArg[0], toArray<T>(tupledArg[1])] as [Key, T[]]), groupBy<T, Key>(projection, xs, comparer)));
}

export function List_distinct<T>(xs: FSharpList<T>, comparer: IEqualityComparer<T>): FSharpList<T> {
    return toList<T>(distinct<T>(xs, comparer));
}

export function List_distinctBy<T, Key>(projection: ((arg0: T) => Key), xs: FSharpList<T>, comparer: IEqualityComparer<Key>): FSharpList<T> {
    return toList<T>(distinctBy<T, Key>(projection, xs, comparer));
}

export function List_except<T>(itemsToExclude: Iterable<T>, xs: FSharpList<T>, comparer: IEqualityComparer<T>): FSharpList<T> {
    return toList<T>(except<T>(itemsToExclude, xs, comparer));
}

export function List_countBy<T, Key>(projection: ((arg0: T) => Key), xs: FSharpList<T>, comparer: IEqualityComparer<Key>): FSharpList<[Key, int32]> {
    return toList<[Key, int32]>(countBy<T, Key>(projection, xs, comparer));
}

export function List_groupBy<T, Key>(projection: ((arg0: T) => Key), xs: FSharpList<T>, comparer: IEqualityComparer<Key>): FSharpList<[Key, FSharpList<T>]> {
    return toList<[Key, FSharpList<T>]>(map<[Key, Iterable<T>], [Key, FSharpList<T>]>((tupledArg: [Key, Iterable<T>]): [Key, FSharpList<T>] => ([tupledArg[0], toList<T>(tupledArg[1])] as [Key, FSharpList<T>]), groupBy<T, Key>(projection, xs, comparer)));
}

