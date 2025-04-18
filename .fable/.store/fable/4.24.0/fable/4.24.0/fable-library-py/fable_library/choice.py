from __future__ import annotations

from typing import Any, Generic, TypeVar

from .option import some
from .reflection import TypeInfo, union_type
from .types import Array, Union


_T1 = TypeVar("_T1")

_T2 = TypeVar("_T2")

_T3 = TypeVar("_T3")

_T4 = TypeVar("_T4")

_T5 = TypeVar("_T5")

_T6 = TypeVar("_T6")

_T7 = TypeVar("_T7")


def _expr35(gen0: TypeInfo, gen1: TypeInfo) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpChoice`2", [gen0, gen1], FSharpChoice_2, lambda: [[("Item", gen0)], [("Item", gen1)]]
    )


class FSharpChoice_2(Union, Generic[_T1, _T2]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Choice1Of2", "Choice2Of2"]


FSharpChoice_2_reflection = _expr35


def _expr36(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpChoice`3",
        [gen0, gen1, gen2],
        FSharpChoice_3,
        lambda: [[("Item", gen0)], [("Item", gen1)], [("Item", gen2)]],
    )


class FSharpChoice_3(Union, Generic[_T1, _T2, _T3]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Choice1Of3", "Choice2Of3", "Choice3Of3"]


FSharpChoice_3_reflection = _expr36


def _expr37(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpChoice`4",
        [gen0, gen1, gen2, gen3],
        FSharpChoice_4,
        lambda: [[("Item", gen0)], [("Item", gen1)], [("Item", gen2)], [("Item", gen3)]],
    )


class FSharpChoice_4(Union, Generic[_T1, _T2, _T3, _T4]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Choice1Of4", "Choice2Of4", "Choice3Of4", "Choice4Of4"]


FSharpChoice_4_reflection = _expr37


def _expr38(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo, gen4: TypeInfo) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpChoice`5",
        [gen0, gen1, gen2, gen3, gen4],
        FSharpChoice_5,
        lambda: [[("Item", gen0)], [("Item", gen1)], [("Item", gen2)], [("Item", gen3)], [("Item", gen4)]],
    )


class FSharpChoice_5(Union, Generic[_T1, _T2, _T3, _T4, _T5]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Choice1Of5", "Choice2Of5", "Choice3Of5", "Choice4Of5", "Choice5Of5"]


FSharpChoice_5_reflection = _expr38


def _expr39(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo, gen4: TypeInfo, gen5: TypeInfo) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpChoice`6",
        [gen0, gen1, gen2, gen3, gen4, gen5],
        FSharpChoice_6,
        lambda: [
            [("Item", gen0)],
            [("Item", gen1)],
            [("Item", gen2)],
            [("Item", gen3)],
            [("Item", gen4)],
            [("Item", gen5)],
        ],
    )


class FSharpChoice_6(Union, Generic[_T1, _T2, _T3, _T4, _T5, _T6]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Choice1Of6", "Choice2Of6", "Choice3Of6", "Choice4Of6", "Choice5Of6", "Choice6Of6"]


FSharpChoice_6_reflection = _expr39


def _expr40(
    gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo, gen4: TypeInfo, gen5: TypeInfo, gen6: TypeInfo
) -> TypeInfo:
    return union_type(
        "FSharp.Core.FSharpChoice`7",
        [gen0, gen1, gen2, gen3, gen4, gen5, gen6],
        FSharpChoice_7,
        lambda: [
            [("Item", gen0)],
            [("Item", gen1)],
            [("Item", gen2)],
            [("Item", gen3)],
            [("Item", gen4)],
            [("Item", gen5)],
            [("Item", gen6)],
        ],
    )


class FSharpChoice_7(Union, Generic[_T1, _T2, _T3, _T4, _T5, _T6, _T7]):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> list[str]:
        return ["Choice1Of7", "Choice2Of7", "Choice3Of7", "Choice4Of7", "Choice5Of7", "Choice6Of7", "Choice7Of7"]


FSharpChoice_7_reflection = _expr40


def Choice_makeChoice1Of2(x: Any | None = None) -> FSharpChoice_2[Any, Any]:
    return FSharpChoice_2(0, x)


def Choice_makeChoice2Of2(x: Any | None = None) -> FSharpChoice_2[Any, Any]:
    return FSharpChoice_2(1, x)


def Choice_tryValueIfChoice1Of2(x: FSharpChoice_2[Any, Any]) -> Any | None:
    if x.tag == 0:
        return some(x.fields[0])

    else:
        return None


def Choice_tryValueIfChoice2Of2(x: FSharpChoice_2[Any, Any]) -> Any | None:
    if x.tag == 1:
        return some(x.fields[0])

    else:
        return None


__all__ = [
    "FSharpChoice_2_reflection",
    "FSharpChoice_3_reflection",
    "FSharpChoice_4_reflection",
    "FSharpChoice_5_reflection",
    "FSharpChoice_6_reflection",
    "FSharpChoice_7_reflection",
    "Choice_makeChoice1Of2",
    "Choice_makeChoice2Of2",
    "Choice_tryValueIfChoice1Of2",
    "Choice_tryValueIfChoice2Of2",
]
