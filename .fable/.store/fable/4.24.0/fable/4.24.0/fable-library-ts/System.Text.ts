import { replace, format, substring, isNullOrEmpty, join } from "./String.js";
import { float64, int32 } from "./Int32.js";
import { class_type, TypeInfo } from "./Reflection.js";
import { clear, int32ToString } from "./Util.js";
import { toString } from "./Types.js";

export class StringBuilder {
    readonly buf: string[];
    constructor(value: string, capacity: int32) {
        this.buf = [];
        if (!isNullOrEmpty(value)) {
            void (this.buf.push(value));
        }
    }
    toString(): string {
        const _: StringBuilder = this;
        return join("", _.buf);
    }
}

export function StringBuilder_$reflection(): TypeInfo {
    return class_type("System.Text.StringBuilder", undefined, StringBuilder);
}

export function StringBuilder_$ctor_Z18115A39(value: string, capacity: int32): StringBuilder {
    return new StringBuilder(value, capacity);
}

export function StringBuilder_$ctor_Z524259A4(capacity: int32): StringBuilder {
    return StringBuilder_$ctor_Z18115A39("", capacity);
}

export function StringBuilder_$ctor_Z721C83C5(value: string): StringBuilder {
    return StringBuilder_$ctor_Z18115A39(value, 16);
}

export function StringBuilder_$ctor(): StringBuilder {
    return StringBuilder_$ctor_Z18115A39("", 16);
}

export function StringBuilder__Append_Z721C83C5(x: StringBuilder, s: string): StringBuilder {
    void (x.buf.push(s));
    return x;
}

export function StringBuilder__Append_487EF8FB(x: StringBuilder, s: string, startIndex: int32, count: int32): StringBuilder {
    void (x.buf.push(substring(s, startIndex, count)));
    return x;
}

export function StringBuilder__Append_244C7CD6(x: StringBuilder, c: string): StringBuilder {
    void (x.buf.push(c));
    return x;
}

export function StringBuilder__Append_Z524259A4(x: StringBuilder, o: int32): StringBuilder {
    void (x.buf.push(int32ToString(o)));
    return x;
}

export function StringBuilder__Append_5E38073B(x: StringBuilder, o: float64): StringBuilder {
    void (x.buf.push(o.toString()));
    return x;
}

export function StringBuilder__Append_Z1FBCCD16(x: StringBuilder, o: boolean): StringBuilder {
    void (x.buf.push(toString(o)));
    return x;
}

export function StringBuilder__Append_4E60E31B(x: StringBuilder, o: any): StringBuilder {
    void (x.buf.push(toString(o)));
    return x;
}

export function StringBuilder__Append_Z372E4D23(x: StringBuilder, cs: string[]): StringBuilder {
    void (x.buf.push(cs.join('')));
    return x;
}

export function StringBuilder__Append_43A65C09(x: StringBuilder, s: StringBuilder): StringBuilder {
    void (x.buf.push(toString(s)));
    return x;
}

export function StringBuilder__AppendFormat_433E080(x: StringBuilder, fmt: string, o: any): StringBuilder {
    void (x.buf.push(format(fmt, o)));
    return x;
}

export function StringBuilder__AppendFormat_Z3B30EC65(x: StringBuilder, fmt: string, o1: any, o2: any): StringBuilder {
    void (x.buf.push(format(fmt, o1, o2)));
    return x;
}

export function StringBuilder__AppendFormat_10D165E0(x: StringBuilder, fmt: string, o1: any, o2: any, o3: any): StringBuilder {
    void (x.buf.push(format(fmt, o1, o2, o3)));
    return x;
}

export function StringBuilder__AppendFormat_Z17053F5(x: StringBuilder, fmt: string, arr: any[]): StringBuilder {
    void (x.buf.push(format(fmt, ...arr)));
    return x;
}

export function StringBuilder__AppendFormat_Z696D8D1B(x: StringBuilder, provider: any, fmt: string, o: any): StringBuilder {
    void (x.buf.push(format(provider, fmt, o)));
    return x;
}

export function StringBuilder__AppendFormat_26802C9E(x: StringBuilder, provider: any, fmt: string, o1: any, o2: any): StringBuilder {
    void (x.buf.push(format(provider, fmt, o1, o2)));
    return x;
}

export function StringBuilder__AppendFormat_Z471ADCBB(x: StringBuilder, provider: any, fmt: string, o1: any, o2: any, o3: any): StringBuilder {
    void (x.buf.push(format(provider, fmt, o1, o2, o3)));
    return x;
}

export function StringBuilder__AppendFormat_6C2E3E6E(x: StringBuilder, provider: any, fmt: string, arr: any[]): StringBuilder {
    void (x.buf.push(format(provider, fmt, ...arr)));
    return x;
}

export function StringBuilder__AppendLine(x: StringBuilder): StringBuilder {
    void (x.buf.push("\n"));
    return x;
}

export function StringBuilder__AppendLine_Z721C83C5(x: StringBuilder, s: string): StringBuilder {
    void (x.buf.push(s));
    void (x.buf.push("\n"));
    return x;
}

export function StringBuilder__Clear(x: StringBuilder): StringBuilder {
    clear(x.buf);
    return x;
}

export function StringBuilder__get_Chars_Z524259A4(x: StringBuilder, index: int32): string {
    let len = 0;
    let i = -1;
    while (((i + 1) < x.buf.length) && (len < index)) {
        i = ((i + 1) | 0);
        len = ((len + x.buf[i].length) | 0);
    }
    if (((index < 0) ? true : (i < 0)) ? true : (i >= x.buf.length)) {
        throw new Error("Index was outside the bounds of the array");
    }
    else {
        const pos: int32 = ((len - index) - 1) | 0;
        return x.buf[i][pos];
    }
}

export function StringBuilder__set_Chars_413E0D0A(x: StringBuilder, index: int32, value: string): void {
    let len = 0;
    let i = -1;
    while (((i + 1) < x.buf.length) && (len < index)) {
        i = ((i + 1) | 0);
        len = ((len + x.buf[i].length) | 0);
    }
    if (((index < 0) ? true : (i < 0)) ? true : (i >= x.buf.length)) {
        throw new Error("Index was outside the bounds of the array");
    }
    else {
        const pos: int32 = ((len - index) - 1) | 0;
        x.buf[i] = ((x.buf[i].slice(0, (pos - 1) + 1) + value) + x.buf[i].slice(pos + 1, x.buf[i].length));
    }
}

export function StringBuilder__Replace_Z766F94C0(x: StringBuilder, oldValue: string, newValue: string): StringBuilder {
    for (let i: int32 = x.buf.length - 1; i >= 0; i--) {
        x.buf[i] = replace(x.buf[i], oldValue, newValue);
    }
    return x;
}

export function StringBuilder__Replace_Z384F8060(x: StringBuilder, oldValue: string, newValue: string): StringBuilder {
    const str: string = replace(toString(x), oldValue, newValue);
    return StringBuilder__Append_Z721C83C5(StringBuilder__Clear(x), str);
}

export function StringBuilder__get_Length(x: StringBuilder): int32 {
    let len = 0;
    for (let i: int32 = x.buf.length - 1; i >= 0; i--) {
        len = ((len + x.buf[i].length) | 0);
    }
    return len | 0;
}

export function StringBuilder__ToString_Z37302880(x: StringBuilder, firstIndex: int32, length: int32): string {
    return substring(toString(x), firstIndex, length);
}

