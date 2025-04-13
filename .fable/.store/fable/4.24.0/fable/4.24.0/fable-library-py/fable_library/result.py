from __future__ import annotations

from collections.abc import Callable
from typing import Any, Generic, TypeVar

from .list import FSharpList, empty, singleton
from .option import some
from .reflection import TypeInfo, union_type
from .types import Array, Union
from .util import equals


_T = TypeVar("_T")

_TERROR = TypeVar("_TERROR")

_A = TypeVar("_A")

_B = TypeVar("_B")

_C = TypeVar("_C")

_S = TypeVar("_S")


def _expr34(gen0: TypeInfo, gen1: TypeInfo) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpResult`2",
        [gen0, gen1],
        FSharpResult_2,
        lambda: [[("ResultValue", gen0)], [("ErrorValue", gen1)]],
    )


class FSharpResult_2(Union, Generic[_T, _TERROR]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Ok", "Error"]


FSharpResult_2_reflection = _expr34


def Result_Map(mapping: Callable[[_A], _B], result: FSharpResult_2[Any, Any]) -> FSharpResult_2[Any, Any]:
    if result.tag == 0:
        return FSharpResult_2(0, mapping(result.fields[0]))

    else:
        return FSharpResult_2(1, result.fields[0])


def Result_MapError(mapping: Callable[[_A], _B], result: FSharpResult_2[Any, Any]) -> FSharpResult_2[Any, Any]:
    if result.tag == 0:
        return FSharpResult_2(0, result.fields[0])

    else:
        return FSharpResult_2(1, mapping(result.fields[0]))


def Result_Bind(
    binder: Callable[[_A], FSharpResult_2[_B, _C]], result: FSharpResult_2[Any, Any]
) -> FSharpResult_2[Any, Any]:
    if result.tag == 0:
        return binder(result.fields[0])

    else:
        return FSharpResult_2(1, result.fields[0])


def Result_IsOk(result: FSharpResult_2[Any, Any]) -> bool:
    if result.tag == 0:
        return True

    else:
        return False


def Result_IsError(result: FSharpResult_2[Any, Any]) -> bool:
    if result.tag == 0:
        return False

    else:
        return True


def Result_Contains(value: Any, result: FSharpResult_2[Any, Any]) -> bool:
    if result.tag == 0:
        return equals(result.fields[0], value)

    else:
        return False


def Result_Count(result: FSharpResult_2[Any, Any]) -> int:
    if result.tag == 0:
        return 1

    else:
        return 0


def Result_DefaultValue(default_value: Any, result: FSharpResult_2[Any, Any]) -> Any:
    if result.tag == 0:
        return result.fields[0]

    else:
        return default_value


def Result_DefaultWith(def_thunk: Callable[[_B], _A], result: FSharpResult_2[Any, Any]) -> Any:
    if result.tag == 0:
        return result.fields[0]

    else:
        return def_thunk(result.fields[0])


def Result_Exists(predicate: Callable[[_A], bool], result: FSharpResult_2[Any, Any]) -> bool:
    if result.tag == 0:
        return predicate(result.fields[0])

    else:
        return False


def Result_Fold(folder: Callable[[_S, _A], _S], state: Any, result: FSharpResult_2[Any, Any]) -> Any:
    if result.tag == 0:
        return folder(state, result.fields[0])

    else:
        return state


def Result_FoldBack(folder: Callable[[_A, _S], _S], result: FSharpResult_2[Any, Any], state: Any) -> Any:
    if result.tag == 0:
        return folder(result.fields[0], state)

    else:
        return state


def Result_ForAll(predicate: Callable[[_A], bool], result: FSharpResult_2[Any, Any]) -> bool:
    if result.tag == 0:
        return predicate(result.fields[0])

    else:
        return True


def Result_Iterate(action: Callable[[_A], None], result: FSharpResult_2[Any, Any]) -> None:
    if result.tag == 0:
        action(result.fields[0])


def Result_ToArray(result: FSharpResult_2[Any, Any]) -> Array[Any]:
    if result.tag == 0:
        return [result.fields[0]]

    else:
        return []


def Result_ToList(result: FSharpResult_2[Any, Any]) -> FSharpList[Any]:
    if result.tag == 0:
        return singleton(result.fields[0])

    else:
        return empty()


def Result_ToOption(result: FSharpResult_2[Any, Any]) -> Any | None:
    if result.tag == 0:
        return some(result.fields[0])

    else:
        return None


def Result_ToValueOption(result: FSharpResult_2[Any, Any]) -> Any | None:
    if result.tag == 0:
        return some(result.fields[0])

    else:
        return None


__all__ = [
    "FSharpResult_2_reflection",
    "Result_Map",
    "Result_MapError",
    "Result_Bind",
    "Result_IsOk",
    "Result_IsError",
    "Result_Contains",
    "Result_Count",
    "Result_DefaultValue",
    "Result_DefaultWith",
    "Result_Exists",
    "Result_Fold",
    "Result_FoldBack",
    "Result_ForAll",
    "Result_Iterate",
    "Result_ToArray",
    "Result_ToList",
    "Result_ToOption",
    "Result_ToValueOption",
]
