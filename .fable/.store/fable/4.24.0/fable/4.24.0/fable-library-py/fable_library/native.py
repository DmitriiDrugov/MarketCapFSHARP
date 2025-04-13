from __future__ import annotations

from abc import abstractmethod
from typing import Any, Generic, Protocol, TypeVar

from .types import Array


_T = TypeVar("_T")


class Cons_1(Protocol, Generic[_T]):
    @abstractmethod
    def Allocate(self, len: int) -> Array[_T]: ...


def Helpers_allocateArrayFromCons(cons: Cons_1[Any], len_1: int) -> Array[Any]:
    if cons is None:
        return (list)([None] * len_1)

    else:
        return cons([0] * len_1)


def Helpers_fillImpl(array: Array[Any], value: Any, start: int, count: int) -> Array[Any]:
    for i in range(0, (count - 1) + 1, 1):
        array[i + start] = value
    return array


def Helpers_spliceImpl(array: Array[Any], start: int, delete_count: int) -> Array[Any]:
    for _ in range(1, delete_count + 1, 1):
        array.pop(start)
    return array


def Helpers_indexOfImpl(array: Array[Any], item: Any, start: int) -> Any:
    try:
        return array.index(item, start)

    except Exception as ex:
        return -1


__all__ = ["Helpers_allocateArrayFromCons", "Helpers_fillImpl", "Helpers_spliceImpl", "Helpers_indexOfImpl"]
