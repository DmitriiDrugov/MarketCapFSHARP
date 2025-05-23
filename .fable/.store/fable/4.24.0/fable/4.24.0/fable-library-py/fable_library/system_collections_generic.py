from __future__ import annotations

from collections.abc import Callable
from typing import Any, Generic, TypeVar

from .array_ import copy_to, fill, initialize
from .double import divide
from .reflection import TypeInfo, class_type
from .seq import append, delay, empty, enumerate_while, singleton, to_array
from .types import Array, FSharpRef
from .util import (
    IEnumerable_1,
    IEnumerator,
    compare,
    compare_primitives,
    get_enumerator,
    max,
    structural_hash,
    to_iterator,
)
from .util import equals as equals_1


_T = TypeVar("_T")


def _expr7(gen0: TypeInfo) -> TypeInfo:
    return class_type("System.Collections.Generic.Comparer`1", [gen0], Comparer_1)


class Comparer_1(Generic[_T]):
    def __init__(self, comparison: Callable[[_T, _T], int]) -> None:
        self.comparison: Callable[[_T, _T], int] = comparison

    def Compare(self, x: _T, y: _T) -> int:
        _: Comparer_1[_T] = self
        return _.comparison(x, y)


Comparer_1_reflection = _expr7


def Comparer_1__ctor_47C913C(comparison: Callable[[_T, _T], int]) -> Comparer_1[_T]:
    return Comparer_1(comparison)


def Comparer_1_get_Default(__unit: None = None) -> Comparer_1[Any]:
    return Comparer_1__ctor_47C913C(compare)


def Comparer_1_Create_47C913C(comparison: Callable[[_T, _T], int]) -> Comparer_1[Any]:
    return Comparer_1__ctor_47C913C(comparison)


def Comparer_1__Compare_5BDDA0(_: Comparer_1[Any], x: Any, y: Any) -> int:
    return _.comparison(x, y)


def _expr8(gen0: TypeInfo) -> TypeInfo:
    return class_type("System.Collections.Generic.EqualityComparer`1", [gen0], EqualityComparer_1)


class EqualityComparer_1(Generic[_T]):
    def __init__(self, equals: Callable[[_T, _T], bool], get_hash_code: Callable[[_T], int]) -> None:
        self.equals: Callable[[_T, _T], bool] = equals
        self.get_hash_code: Callable[[_T], int] = get_hash_code

    def __eq__(self, x: _T, y: _T) -> bool:
        _: EqualityComparer_1[_T] = self
        return _.equals(x, y)

    def __hash__(self, x: _T | None = None) -> int:
        _: EqualityComparer_1[_T] = self
        return _.get_hash_code(x)


EqualityComparer_1_reflection = _expr8


def EqualityComparer_1__ctor_Z6EE254AB(
    equals: Callable[[_T, _T], bool], get_hash_code: Callable[[_T], int]
) -> EqualityComparer_1[_T]:
    return EqualityComparer_1(equals, get_hash_code)


def EqualityComparer_1_get_Default(__unit: None = None) -> EqualityComparer_1[Any]:
    return EqualityComparer_1__ctor_Z6EE254AB(equals_1, structural_hash)


def EqualityComparer_1_Create_Z6EE254AB(
    equals: Callable[[_T, _T], bool], get_hash_code: Callable[[_T], int]
) -> EqualityComparer_1[Any]:
    return EqualityComparer_1__ctor_Z6EE254AB(equals, get_hash_code)


def EqualityComparer_1__Equals_5BDDA0(_: EqualityComparer_1[Any], x: Any, y: Any) -> bool:
    return _.equals(x, y)


def EqualityComparer_1__GetHashCode_2B595(_: EqualityComparer_1[Any], x: Any) -> int:
    return _.get_hash_code(x)


def _expr13(gen0: TypeInfo) -> TypeInfo:
    return class_type("System.Collections.Generic.Stack`1", [gen0], Stack_1)


class Stack_1(Generic[_T]):
    def __init__(self, initial_contents: Array[Any], initial_count: int) -> None:
        self.contents: Array[_T] = initial_contents
        self.count: int = initial_count or 0

    def GetEnumerator(self, __unit: None = None) -> IEnumerator[_T]:
        _: Stack_1[_T] = self

        def _arrow12(__unit: None = None) -> IEnumerable_1[_T]:
            index: int = (_.count - 1) or 0

            def _arrow9(__unit: None = None) -> bool:
                return index >= 0

            def _arrow11(__unit: None = None) -> IEnumerable_1[_T]:
                def _arrow10(__unit: None = None) -> IEnumerable_1[_T]:
                    nonlocal index
                    index = (index - 1) or 0
                    return empty()

                return append(singleton(_.contents[index]), delay(_arrow10))

            return enumerate_while(_arrow9, delay(_arrow11))

        return get_enumerator(delay(_arrow12))

    def __iter__(self) -> IEnumerator[_T]:
        return to_iterator(self.GetEnumerator())

    def System_Collections_IEnumerable_GetEnumerator(self, __unit: None = None) -> IEnumerator[Any]:
        this: Stack_1[_T] = self
        return get_enumerator(this)


Stack_1_reflection = _expr13


def Stack_1__ctor_Z3B4C077E(initial_contents: Array[Any], initial_count: int) -> Stack_1[_T]:
    return Stack_1(initial_contents, initial_count)


def Stack_1__ctor_Z524259A4(initial_capacity: int) -> Stack_1[Any]:
    return Stack_1__ctor_Z3B4C077E(fill([0] * initial_capacity, 0, initial_capacity, None), 0)


def Stack_1__ctor(__unit: None = None) -> Stack_1[Any]:
    return Stack_1__ctor_Z524259A4(4)


def Stack_1__ctor_BB573A(xs: IEnumerable_1[Any]) -> Stack_1[Any]:
    arr: Array[_T] = list(xs)
    return Stack_1__ctor_Z3B4C077E(arr, len(arr))


def Stack_1__Ensure_Z524259A4(_: Stack_1[Any], new_size: int) -> None:
    old_size: int = len(_.contents) or 0
    if new_size > old_size:
        old: Array[_T] = _.contents

        def _arrow14(x: int, y: int, _: Any = _, new_size: Any = new_size) -> int:
            return compare_primitives(x, y)

        def _arrow15(x: int, y: int, _: Any = _, new_size: Any = new_size) -> int:
            return compare_primitives(x, y)

        _.contents = fill([0] * max(_arrow14, new_size, old_size * 2), 0, max(_arrow15, new_size, old_size * 2), None)
        copy_to(old, 0, _.contents, 0, _.count)


def Stack_1__get_Count(_: Stack_1[Any]) -> int:
    return _.count


def Stack_1__Pop(_: Stack_1[Any]) -> Any:
    _.count = (_.count - 1) or 0
    return _.contents[_.count]


def Stack_1__Peek(_: Stack_1[Any]) -> Any:
    return _.contents[_.count - 1]


def Stack_1__Contains_2B595(_: Stack_1[Any], x: Any) -> bool:
    found: bool = False
    i: int = 0
    while (not found) if (i < _.count) else False:
        if equals_1(x, _.contents[i]):
            found = True

        else:
            i = (i + 1) or 0

    return found


def Stack_1__TryPeek_1F3DB691(this: Stack_1[Any], result: FSharpRef[_T]) -> bool:
    if this.count > 0:
        result.contents = Stack_1__Peek(this)
        return True

    else:
        return False


def Stack_1__TryPop_1F3DB691(this: Stack_1[Any], result: FSharpRef[_T]) -> bool:
    if this.count > 0:
        result.contents = Stack_1__Pop(this)
        return True

    else:
        return False


def Stack_1__Push_2B595(this: Stack_1[Any], x: Any) -> None:
    Stack_1__Ensure_Z524259A4(this, this.count + 1)
    this.contents[this.count] = x
    this.count = (this.count + 1) or 0


def Stack_1__Clear(_: Stack_1[Any]) -> None:
    _.count = 0
    fill(_.contents, 0, len(_.contents), None)


def Stack_1__TrimExcess(this: Stack_1[Any]) -> None:
    if divide(this.count, len(this.contents)) > 0.9:
        Stack_1__Ensure_Z524259A4(this, this.count)


def Stack_1__ToArray(_: Stack_1[Any]) -> Array[Any]:
    def _arrow16(i: int, _: Any = _) -> _T:
        return _.contents[(_.count - 1) - i]

    return initialize(_.count, _arrow16, None)


def _expr17(gen0: TypeInfo) -> TypeInfo:
    return class_type("System.Collections.Generic.Queue`1", [gen0], Queue_1)


class Queue_1(Generic[_T]):
    def __init__(self, initial_contents: Array[Any], initial_count: int) -> None:
        self.contents: Array[_T] = initial_contents
        self.count: int = initial_count or 0
        self.head: int = 0
        self.tail: int = (0 if (initial_count == len(self.contents)) else initial_count) or 0

    def GetEnumerator(self, __unit: None = None) -> IEnumerator[_T]:
        _: Queue_1[_T] = self
        return get_enumerator(Queue_1__toSeq(_))

    def __iter__(self) -> IEnumerator[_T]:
        return to_iterator(self.GetEnumerator())

    def System_Collections_IEnumerable_GetEnumerator(self, __unit: None = None) -> IEnumerator[Any]:
        this: Queue_1[_T] = self
        return get_enumerator(this)


Queue_1_reflection = _expr17


def Queue_1__ctor_Z3B4C077E(initial_contents: Array[Any], initial_count: int) -> Queue_1[_T]:
    return Queue_1(initial_contents, initial_count)


def Queue_1__ctor_Z524259A4(initial_capacity: int) -> Queue_1[Any]:
    if initial_capacity < 0:
        raise Exception("capacity is less than 0")

    return Queue_1__ctor_Z3B4C077E(fill([0] * initial_capacity, 0, initial_capacity, None), 0)


def Queue_1__ctor(__unit: None = None) -> Queue_1[Any]:
    return Queue_1__ctor_Z524259A4(4)


def Queue_1__ctor_BB573A(xs: IEnumerable_1[Any]) -> Queue_1[Any]:
    arr: Array[_T] = list(xs)
    return Queue_1__ctor_Z3B4C077E(arr, len(arr))


def Queue_1__get_Count(_: Queue_1[Any]) -> int:
    return _.count


def Queue_1__Enqueue_2B595(_: Queue_1[Any], value: Any) -> None:
    if _.count == Queue_1__size(_):
        Queue_1__ensure_Z524259A4(_, _.count + 1)

    _.contents[_.tail] = value
    _.tail = ((_.tail + 1) % Queue_1__size(_)) or 0
    _.count = (_.count + 1) or 0


def Queue_1__Dequeue(_: Queue_1[Any]) -> Any:
    if _.count == 0:
        raise Exception("Queue is empty")

    value: _T = _.contents[_.head]
    _.head = ((_.head + 1) % Queue_1__size(_)) or 0
    _.count = (_.count - 1) or 0
    return value


def Queue_1__Peek(_: Queue_1[Any]) -> Any:
    if _.count == 0:
        raise Exception("Queue is empty")

    return _.contents[_.head]


def Queue_1__TryDequeue_1F3DB691(this: Queue_1[Any], result: FSharpRef[_T]) -> bool:
    if this.count == 0:
        return False

    else:
        result.contents = Queue_1__Dequeue(this)
        return True


def Queue_1__TryPeek_1F3DB691(this: Queue_1[Any], result: FSharpRef[_T]) -> bool:
    if this.count == 0:
        return False

    else:
        result.contents = Queue_1__Peek(this)
        return True


def Queue_1__Contains_2B595(_: Queue_1[Any], x: Any) -> bool:
    found: bool = False
    i: int = 0
    while (not found) if (i < _.count) else False:
        if equals_1(x, _.contents[Queue_1__toIndex_Z524259A4(_, i)]):
            found = True

        else:
            i = (i + 1) or 0

    return found


def Queue_1__Clear(_: Queue_1[Any]) -> None:
    _.count = 0
    _.head = 0
    _.tail = 0
    fill(_.contents, 0, Queue_1__size(_), None)


def Queue_1__TrimExcess(_: Queue_1[Any]) -> None:
    if divide(_.count, len(_.contents)) > 0.9:
        Queue_1__ensure_Z524259A4(_, _.count)


def Queue_1__ToArray(_: Queue_1[Any]) -> Array[Any]:
    return to_array(Queue_1__toSeq(_))


def Queue_1__CopyTo_Z3B4C077E(_: Queue_1[Any], target: Array[Any], start: int) -> None:
    i: int = start or 0
    with get_enumerator(Queue_1__toSeq(_)) as enumerator:
        while enumerator.System_Collections_IEnumerator_MoveNext():
            item: _T = enumerator.System_Collections_Generic_IEnumerator_1_get_Current()
            target[i] = item
            i = (i + 1) or 0


def Queue_1__size(this: Queue_1[Any]) -> int:
    return len(this.contents)


def Queue_1__toIndex_Z524259A4(this: Queue_1[Any], i: int) -> int:
    return (this.head + i) % Queue_1__size(this)


def Queue_1__ensure_Z524259A4(this: Queue_1[Any], required_size: int) -> None:
    new_buffer: Array[_T] = fill([0] * required_size, 0, required_size, None)
    if this.head < this.tail:
        copy_to(this.contents, this.head, new_buffer, 0, this.count)

    else:
        copy_to(this.contents, this.head, new_buffer, 0, Queue_1__size(this) - this.head)
        copy_to(this.contents, 0, new_buffer, Queue_1__size(this) - this.head, this.tail)

    this.head = 0
    this.contents = new_buffer
    this.tail = (0 if (this.count == Queue_1__size(this)) else this.count) or 0


def Queue_1__toSeq(this: Queue_1[Any]) -> IEnumerable_1[Any]:
    def _arrow21(__unit: None = None, this: Any = this) -> IEnumerable_1[_T]:
        i: int = 0

        def _arrow18(__unit: None = None) -> bool:
            return i < this.count

        def _arrow20(__unit: None = None) -> IEnumerable_1[_T]:
            def _arrow19(__unit: None = None) -> IEnumerable_1[_T]:
                nonlocal i
                i = (i + 1) or 0
                return empty()

            return append(singleton(this.contents[Queue_1__toIndex_Z524259A4(this, i)]), delay(_arrow19))

        return enumerate_while(_arrow18, delay(_arrow20))

    return delay(_arrow21)


__all__ = [
    "Comparer_1_reflection",
    "Comparer_1_get_Default",
    "Comparer_1_Create_47C913C",
    "Comparer_1__Compare_5BDDA0",
    "EqualityComparer_1_reflection",
    "EqualityComparer_1_get_Default",
    "EqualityComparer_1_Create_Z6EE254AB",
    "EqualityComparer_1__Equals_5BDDA0",
    "EqualityComparer_1__GetHashCode_2B595",
    "Stack_1_reflection",
    "Stack_1__ctor_Z524259A4",
    "Stack_1__ctor",
    "Stack_1__ctor_BB573A",
    "Stack_1__Ensure_Z524259A4",
    "Stack_1__get_Count",
    "Stack_1__Pop",
    "Stack_1__Peek",
    "Stack_1__Contains_2B595",
    "Stack_1__TryPeek_1F3DB691",
    "Stack_1__TryPop_1F3DB691",
    "Stack_1__Push_2B595",
    "Stack_1__Clear",
    "Stack_1__TrimExcess",
    "Stack_1__ToArray",
    "Queue_1_reflection",
    "Queue_1__ctor_Z524259A4",
    "Queue_1__ctor",
    "Queue_1__ctor_BB573A",
    "Queue_1__get_Count",
    "Queue_1__Enqueue_2B595",
    "Queue_1__Dequeue",
    "Queue_1__Peek",
    "Queue_1__TryDequeue_1F3DB691",
    "Queue_1__TryPeek_1F3DB691",
    "Queue_1__Contains_2B595",
    "Queue_1__Clear",
    "Queue_1__TrimExcess",
    "Queue_1__ToArray",
    "Queue_1__CopyTo_Z3B4C077E",
    "Queue_1__size",
    "Queue_1__toIndex_Z524259A4",
    "Queue_1__ensure_Z524259A4",
    "Queue_1__toSeq",
]
