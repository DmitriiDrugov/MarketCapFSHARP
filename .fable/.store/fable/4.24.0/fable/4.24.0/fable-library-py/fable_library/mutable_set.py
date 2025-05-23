from __future__ import annotations

from collections.abc import Callable
from typing import Any, Generic, TypeVar

from .map_util import get_item_from_dict, try_get_value
from .option import some
from .reflection import TypeInfo, class_type
from .resize_array import find_index
from .seq import concat, iterate, iterate_indexed, map
from .types import Array, FSharpRef
from .util import IEnumerable_1, IEnumerator, IEqualityComparer_1, dispose, get_enumerator, ignore, to_iterator


_T = TypeVar("_T")


def _expr22(gen0: TypeInfo) -> TypeInfo:
    return class_type("Fable.Collections.HashSet", [gen0], HashSet)


class HashSet(Generic[_T]):
    def __init__(self, items: IEnumerable_1[Any], comparer: IEqualityComparer_1[Any]) -> None:
        this: FSharpRef[HashSet[_T]] = FSharpRef(None)
        self.comparer: IEqualityComparer_1[Any] = comparer
        this.contents = self
        self.hash_map: Any = dict([])
        self.init_00409: int = 1
        with get_enumerator(items) as enumerator:
            while enumerator.System_Collections_IEnumerator_MoveNext():
                item: _T = enumerator.System_Collections_Generic_IEnumerator_1_get_Current()
                ignore(HashSet__Add_2B595(this.contents, item))

    @property
    def Symbol_toStringTag(self, __unit: None = None) -> str:
        return "HashSet"

    def to_json(self, __unit: None = None) -> Any:
        this: HashSet[_T] = self
        return list(this)

    def System_Collections_IEnumerable_GetEnumerator(self, __unit: None = None) -> IEnumerator[Any]:
        this: HashSet[_T] = self
        return get_enumerator(this)

    def GetEnumerator(self, __unit: None = None) -> IEnumerator[_T]:
        this: HashSet[_T] = self
        return get_enumerator(concat(this.hash_map.values()))

    def __iter__(self) -> IEnumerator[_T]:
        return to_iterator(self.GetEnumerator())

    def System_Collections_Generic_ICollection_1_Add2B595(self, item: _T | None = None) -> None:
        this: HashSet[_T] = self
        ignore(HashSet__Add_2B595(this, item))

    def System_Collections_Generic_ICollection_1_Clear(self, __unit: None = None) -> None:
        this: HashSet[_T] = self
        HashSet__Clear(this)

    def System_Collections_Generic_ICollection_1_Contains2B595(self, item: _T | None = None) -> bool:
        this: HashSet[_T] = self
        return HashSet__Contains_2B595(this, item)

    def System_Collections_Generic_ICollection_1_CopyToZ3B4C077E(self, array: Array[_T], array_index: int) -> None:
        this: HashSet[_T] = self

        def action(i: int, e: _T) -> None:
            array[array_index + i] = e

        iterate_indexed(action, this)

    def __len__(self, __unit: None = None) -> int:
        this: HashSet[_T] = self
        return HashSet__get_Count(this)

    def System_Collections_Generic_ICollection_1_get_IsReadOnly(self, __unit: None = None) -> bool:
        return False

    def System_Collections_Generic_ICollection_1_Remove2B595(self, item: _T | None = None) -> bool:
        this: HashSet[_T] = self
        return HashSet__Remove_2B595(this, item)

    @property
    def size(self, __unit: None = None) -> int:
        this: HashSet[_T] = self
        return HashSet__get_Count(this)

    def add(self, k: _T | None = None) -> Set_1[_T]:
        this: HashSet[_T] = self
        ignore(HashSet__Add_2B595(this, k))
        return this

    def clear(self, __unit: None = None) -> None:
        this: HashSet[_T] = self
        HashSet__Clear(this)

    def __delitem__(self, k: _T | None = None) -> bool:
        this: HashSet[_T] = self
        return HashSet__Remove_2B595(this, k)

    def __contains__(self, k: _T | None = None) -> bool:
        this: HashSet[_T] = self
        return HashSet__Contains_2B595(this, k)

    def keys(self, __unit: None = None) -> IEnumerable_1[_T]:
        this: HashSet[_T] = self

        def mapping(x: _T | None = None) -> _T | None:
            return x

        return map(mapping, this)

    def values(self, __unit: None = None) -> IEnumerable_1[_T]:
        this: HashSet[_T] = self

        def mapping(x: _T | None = None) -> _T | None:
            return x

        return map(mapping, this)

    def entries(self, __unit: None = None) -> IEnumerable_1[tuple[_T, _T]]:
        this: HashSet[_T] = self

        def mapping(v: _T | None = None) -> tuple[_T, _T]:
            return (v, v)

        return map(mapping, this)

    def for_each(self, f: Callable[[_T, _T, Set_1[_T]], None], this_arg: Any | None = None) -> None:
        this: HashSet[_T] = self

        def action(x: _T | None = None) -> None:
            f(x, x, this)

        iterate(action, this)


HashSet_reflection = _expr22


def HashSet__ctor_Z6150332D(items: IEnumerable_1[Any], comparer: IEqualityComparer_1[Any]) -> HashSet[_T]:
    return HashSet(items, comparer)


def HashSet__TryFindIndex_2B595(this: HashSet[Any], k: Any) -> tuple[bool, int, int]:
    h: int = this.comparer.GetHashCode(k) or 0
    match_value: tuple[bool, Array[_T]]
    out_arg: Array[_T] = None

    def _arrow23(__unit: None = None, this: Any = this, k: Any = k) -> Array[_T]:
        return out_arg

    def _arrow24(v: Array[_T], this: Any = this, k: Any = k) -> None:
        nonlocal out_arg
        out_arg = v

    match_value = (try_get_value(this.hash_map, h, FSharpRef(_arrow23, _arrow24)), out_arg)
    if match_value[0]:

        def _arrow25(v_1: _T | None = None, this: Any = this, k: Any = k) -> bool:
            return this.comparer.Equals(k, v_1)

        return (True, h, find_index(_arrow25, match_value[1]))

    else:
        return (False, h, -1)


def HashSet__TryFind_2B595(this: HashSet[Any], k: Any) -> Any | None:
    match_value: tuple[bool, int, int] = HashSet__TryFindIndex_2B595(this, k)
    (pattern_matching_result,) = (None,)
    if match_value[0]:
        if match_value[2] > -1:
            pattern_matching_result = 0

        else:
            pattern_matching_result = 1

    else:
        pattern_matching_result = 1

    if pattern_matching_result == 0:
        return some(get_item_from_dict(this.hash_map, match_value[1])[match_value[2]])

    elif pattern_matching_result == 1:
        return None


def HashSet__get_Comparer(this: HashSet[Any]) -> IEqualityComparer_1[Any]:
    return this.comparer


def HashSet__Clear(this: HashSet[Any]) -> None:
    this.hash_map.clear()


def HashSet__get_Count(this: HashSet[Any]) -> int:
    count: int = 0
    enumerator: Any = get_enumerator(this.hash_map.values())
    try:
        while enumerator.System_Collections_IEnumerator_MoveNext():
            items: Array[_T] = enumerator.System_Collections_Generic_IEnumerator_1_get_Current()
            count = (count + len(items)) or 0

    finally:
        dispose(enumerator)

    return count


def HashSet__Add_2B595(this: HashSet[Any], k: Any) -> bool:
    match_value: tuple[bool, int, int] = HashSet__TryFindIndex_2B595(this, k)
    if match_value[0]:
        if match_value[2] > -1:
            return False

        else:
            value: None = get_item_from_dict(this.hash_map, match_value[1]).append(k)
            ignore(None)
            return True

    else:
        this.hash_map[match_value[1]] = [k]
        return True


def HashSet__Contains_2B595(this: HashSet[Any], k: Any) -> bool:
    match_value: tuple[bool, int, int] = HashSet__TryFindIndex_2B595(this, k)
    (pattern_matching_result,) = (None,)
    if match_value[0]:
        if match_value[2] > -1:
            pattern_matching_result = 0

        else:
            pattern_matching_result = 1

    else:
        pattern_matching_result = 1

    if pattern_matching_result == 0:
        return True

    elif pattern_matching_result == 1:
        return False


def HashSet__Remove_2B595(this: HashSet[Any], k: Any) -> bool:
    match_value: tuple[bool, int, int] = HashSet__TryFindIndex_2B595(this, k)
    (pattern_matching_result,) = (None,)
    if match_value[0]:
        if match_value[2] > -1:
            pattern_matching_result = 0

        else:
            pattern_matching_result = 1

    else:
        pattern_matching_result = 1

    if pattern_matching_result == 0:
        get_item_from_dict(this.hash_map, match_value[1]).pop(match_value[2])
        return True

    elif pattern_matching_result == 1:
        return False


__all__ = [
    "HashSet_reflection",
    "HashSet__TryFindIndex_2B595",
    "HashSet__TryFind_2B595",
    "HashSet__get_Comparer",
    "HashSet__Clear",
    "HashSet__get_Count",
    "HashSet__Add_2B595",
    "HashSet__Contains_2B595",
    "HashSet__Remove_2B595",
]
