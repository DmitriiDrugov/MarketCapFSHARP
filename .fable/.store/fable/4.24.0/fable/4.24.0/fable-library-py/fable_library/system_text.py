from __future__ import annotations

from typing import Any

from .reflection import TypeInfo, class_type
from .string_ import format, is_null_or_empty, join, replace, substring
from .types import Array, to_string
from .util import clear, int32_to_string


def _expr3() -> TypeInfo:
    return class_type("System.Text.StringBuilder", None, StringBuilder)


class StringBuilder:
    def __init__(self, value: str, capacity: int) -> None:
        self.buf: Array[str] = []
        if not is_null_or_empty(value):
            (self.buf.append(value))

    def __str__(self, __unit: None = None) -> str:
        _: StringBuilder = self
        return join("", _.buf)


StringBuilder_reflection = _expr3


def StringBuilder__ctor_Z18115A39(value: str, capacity: int) -> StringBuilder:
    return StringBuilder(value, capacity)


def StringBuilder__ctor_Z524259A4(capacity: int) -> StringBuilder:
    return StringBuilder__ctor_Z18115A39("", capacity)


def StringBuilder__ctor_Z721C83C5(value: str) -> StringBuilder:
    return StringBuilder__ctor_Z18115A39(value, 16)


def StringBuilder__ctor(__unit: None = None) -> StringBuilder:
    return StringBuilder__ctor_Z18115A39("", 16)


def StringBuilder__Append_Z721C83C5(x: StringBuilder, s: str) -> StringBuilder:
    (x.buf.append(s))
    return x


def StringBuilder__Append_487EF8FB(x: StringBuilder, s: str, start_index: int, count: int) -> StringBuilder:
    (x.buf.append(substring(s, start_index, count)))
    return x


def StringBuilder__Append_244C7CD6(x: StringBuilder, c: str) -> StringBuilder:
    (x.buf.append(c))
    return x


def StringBuilder__Append_Z524259A4(x: StringBuilder, o: int) -> StringBuilder:
    (x.buf.append(int32_to_string(o)))
    return x


def StringBuilder__Append_5E38073B(x: StringBuilder, o: float) -> StringBuilder:
    (x.buf.append(to_string(o)))
    return x


def StringBuilder__Append_Z1FBCCD16(x: StringBuilder, o: bool) -> StringBuilder:
    (x.buf.append(to_string(o)))
    return x


def StringBuilder__Append_4E60E31B(x: StringBuilder, o: Any = None) -> StringBuilder:
    (x.buf.append(to_string(o)))
    return x


def StringBuilder__Append_Z372E4D23(x: StringBuilder, cs: Array[str]) -> StringBuilder:
    (x.buf.append("".join(cs)))
    return x


def StringBuilder__Append_43A65C09(x: StringBuilder, s: StringBuilder) -> StringBuilder:
    (x.buf.append(to_string(s)))
    return x


def StringBuilder__AppendFormat_433E080(x: StringBuilder, fmt: str, o: Any = None) -> StringBuilder:
    (x.buf.append(format(fmt, o)))
    return x


def StringBuilder__AppendFormat_Z3B30EC65(x: StringBuilder, fmt: str, o1: Any = None, o2: Any = None) -> StringBuilder:
    (x.buf.append(format(fmt, o1, o2)))
    return x


def StringBuilder__AppendFormat_10D165E0(
    x: StringBuilder, fmt: str, o1: Any = None, o2: Any = None, o3: Any = None
) -> StringBuilder:
    (x.buf.append(format(fmt, o1, o2, o3)))
    return x


def StringBuilder__AppendFormat_Z17053F5(x: StringBuilder, fmt: str, arr: Array[Any]) -> StringBuilder:
    (x.buf.append(format(fmt, *arr)))
    return x


def StringBuilder__AppendFormat_Z696D8D1B(
    x: StringBuilder, provider: IFormatProvider, fmt: str, o: Any = None
) -> StringBuilder:
    (x.buf.append(format(provider, fmt, o)))
    return x


def StringBuilder__AppendFormat_26802C9E(
    x: StringBuilder, provider: IFormatProvider, fmt: str, o1: Any = None, o2: Any = None
) -> StringBuilder:
    (x.buf.append(format(provider, fmt, o1, o2)))
    return x


def StringBuilder__AppendFormat_Z471ADCBB(
    x: StringBuilder, provider: IFormatProvider, fmt: str, o1: Any = None, o2: Any = None, o3: Any = None
) -> StringBuilder:
    (x.buf.append(format(provider, fmt, o1, o2, o3)))
    return x


def StringBuilder__AppendFormat_6C2E3E6E(
    x: StringBuilder, provider: IFormatProvider, fmt: str, arr: Array[Any]
) -> StringBuilder:
    (x.buf.append(format(provider, fmt, *arr)))
    return x


def StringBuilder__AppendLine(x: StringBuilder) -> StringBuilder:
    (x.buf.append("\n"))
    return x


def StringBuilder__AppendLine_Z721C83C5(x: StringBuilder, s: str) -> StringBuilder:
    (x.buf.append(s))
    (x.buf.append("\n"))
    return x


def StringBuilder__Clear(x: StringBuilder) -> StringBuilder:
    clear(x.buf)
    return x


def StringBuilder__get_Chars_Z524259A4(x: StringBuilder, index: int) -> str:
    len_1: int = 0
    i: int = -1
    while (len_1 < index) if ((i + 1) < len(x.buf)) else False:
        i = (i + 1) or 0
        len_1 = (len_1 + len(x.buf[i])) or 0
    if True if (True if (index < 0) else (i < 0)) else (i >= len(x.buf)):
        raise Exception("Index was outside the bounds of the array")

    else:
        pos: int = ((len_1 - index) - 1) or 0
        return x.buf[i][pos]


def StringBuilder__set_Chars_413E0D0A(x: StringBuilder, index: int, value: str) -> None:
    len_1: int = 0
    i: int = -1
    while (len_1 < index) if ((i + 1) < len(x.buf)) else False:
        i = (i + 1) or 0
        len_1 = (len_1 + len(x.buf[i])) or 0
    if True if (True if (index < 0) else (i < 0)) else (i >= len(x.buf)):
        raise Exception("Index was outside the bounds of the array")

    else:
        pos: int = ((len_1 - index) - 1) or 0
        x.buf[i] = (x.buf[i][0 : (pos - 1) + 1] + value) + x.buf[i][pos + 1 : len(x.buf[i])]


def StringBuilder__Replace_Z766F94C0(x: StringBuilder, old_value: str, new_value: str) -> StringBuilder:
    for i in range(len(x.buf) - 1, 0 - 1, -1):
        x.buf[i] = replace(x.buf[i], old_value, new_value)
    return x


def StringBuilder__Replace_Z384F8060(x: StringBuilder, old_value: str, new_value: str) -> StringBuilder:
    str_1: str = replace(to_string(x), old_value, new_value)
    return StringBuilder__Append_Z721C83C5(StringBuilder__Clear(x), str_1)


def StringBuilder__get_Length(x: StringBuilder) -> int:
    len_1: int = 0
    for i in range(len(x.buf) - 1, 0 - 1, -1):
        len_1 = (len_1 + len(x.buf[i])) or 0
    return len_1


def StringBuilder__ToString_Z37302880(x: StringBuilder, first_index: int, length: int) -> str:
    return substring(to_string(x), first_index, length)


__all__ = [
    "StringBuilder_reflection",
    "StringBuilder__ctor_Z524259A4",
    "StringBuilder__ctor_Z721C83C5",
    "StringBuilder__ctor",
    "StringBuilder__Append_Z721C83C5",
    "StringBuilder__Append_487EF8FB",
    "StringBuilder__Append_244C7CD6",
    "StringBuilder__Append_Z524259A4",
    "StringBuilder__Append_5E38073B",
    "StringBuilder__Append_Z1FBCCD16",
    "StringBuilder__Append_4E60E31B",
    "StringBuilder__Append_Z372E4D23",
    "StringBuilder__Append_43A65C09",
    "StringBuilder__AppendFormat_433E080",
    "StringBuilder__AppendFormat_Z3B30EC65",
    "StringBuilder__AppendFormat_10D165E0",
    "StringBuilder__AppendFormat_Z17053F5",
    "StringBuilder__AppendFormat_Z696D8D1B",
    "StringBuilder__AppendFormat_26802C9E",
    "StringBuilder__AppendFormat_Z471ADCBB",
    "StringBuilder__AppendFormat_6C2E3E6E",
    "StringBuilder__AppendLine",
    "StringBuilder__AppendLine_Z721C83C5",
    "StringBuilder__Clear",
    "StringBuilder__get_Chars_Z524259A4",
    "StringBuilder__set_Chars_413E0D0A",
    "StringBuilder__Replace_Z766F94C0",
    "StringBuilder__Replace_Z384F8060",
    "StringBuilder__get_Length",
    "StringBuilder__ToString_Z37302880",
]
