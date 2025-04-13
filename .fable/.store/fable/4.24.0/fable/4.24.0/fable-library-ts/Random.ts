import { uint8, int32, float64 } from "./Int32.js";
import { class_type, TypeInfo } from "./Reflection.js";
import { fromFloat64, op_Addition, toInt32, toFloat64, compare, int64, fromInt32, toInt64 } from "./BigInt.js";
import { item, fill, setItem } from "./Array.js";

function Native_random(): float64 {
    return Math.random();
}

function Native_randomNext(min: int32, max: int32): int32 {
            if (max < min) {
            throw new Error("minValue must be less than maxValue");
        }
        return Math.floor(Math.random() * (max - min)) + min
        ;
}

function Native_randomBytes(buffer: uint8[]): void {
            if (buffer == null) {
            throw new Error("Buffer cannot be null");
        }
        for (let i = 0; i < buffer.length; i += 6) {
            // Pick random 48-bit number. Fill buffer in 2 24-bit chunks to avoid bitwise truncation.
            let r = Math.floor(Math.random() * 281474976710656); // Low 24 bits = chunk 1.
            const rhi = Math.floor(r / 16777216); // High 24 bits shifted via division = chunk 2.
            for (let j = 0; j < 6 && i + j < buffer.length; j++) {
                if (j === 3) { r = rhi; }
                buffer[i + j] = r & 255;
                r >>>= 8;
            }
        };
}

export interface IRandom {
    Next0(): int32,
    Next1(maxValue: int32): int32,
    Next2(minValue: int32, maxValue: int32): int32,
    NextBytes(buffer: uint8[]): void,
    NextDouble(): float64
}

export class NonSeeded implements IRandom {
    constructor() {
    }
    Next0(): int32 {
        return Native_randomNext(0, 2147483647);
    }
    Next1(maxValue: int32): int32 {
        return Native_randomNext(0, maxValue);
    }
    Next2(minValue: int32, maxValue: int32): int32 {
        return Native_randomNext(minValue, maxValue);
    }
    NextDouble(): float64 {
        return Native_random();
    }
    NextBytes(buffer: uint8[]): void {
        Native_randomBytes(buffer);
    }
}

export function NonSeeded_$reflection(): TypeInfo {
    return class_type("Random.NonSeeded", undefined, NonSeeded);
}

export function NonSeeded_$ctor(): NonSeeded {
    return new NonSeeded();
}

export class Seeded implements IRandom {
    readonly MBIG: int32;
    inext: int32;
    inextp: int32;
    seedArray: int32[];
    constructor(seed: int32) {
        this.MBIG = 2147483647;
        this.inext = 0;
        this.inextp = 0;
        this.seedArray = fill(new Array(56), 0, 56, 0);
        let ii = 0;
        let mj = 0;
        let mk = 0;
        const subtraction: int32 = ((seed === -2147483648) ? 2147483647 : Math.abs(seed)) | 0;
        mj = ((161803398 - subtraction) | 0);
        this.seedArray[55] = (mj | 0);
        mk = 1;
        for (let i = 1; i <= 54; i++) {
            ii = (((21 * i) % 55) | 0);
            this.seedArray[ii] = (mk | 0);
            mk = ((mj - mk) | 0);
            if (mk < 0) {
                mk = ((mk + this.MBIG) | 0);
            }
            mj = (item(ii, this.seedArray) | 0);
        }
        for (let k = 1; k <= 4; k++) {
            for (let i_1 = 1; i_1 <= 55; i_1++) {
                this.seedArray[i_1] = ((item(i_1, this.seedArray) - item(1 + ((i_1 + 30) % 55), this.seedArray)) | 0);
                if (item(i_1, this.seedArray) < 0) {
                    this.seedArray[i_1] = ((item(i_1, this.seedArray) + this.MBIG) | 0);
                }
            }
        }
        this.inext = 0;
        this.inextp = 21;
    }
    Next0(): int32 {
        const this$: Seeded = this;
        return Seeded__InternalSample(this$) | 0;
    }
    Next1(maxValue: int32): int32 {
        const this$: Seeded = this;
        if (maxValue < 0) {
            throw new Error("maxValue must be positive");
        }
        return ~~(Seeded__Sample(this$) * maxValue) | 0;
    }
    Next2(minValue: int32, maxValue: int32): int32 {
        const this$: Seeded = this;
        if (minValue > maxValue) {
            throw new Error("minValue must be less than maxValue");
        }
        const range: int64 = toInt64(fromInt32(maxValue - minValue));
        return ((compare(range, toInt64(fromInt32(2147483647))) <= 0) ? (~~(Seeded__Sample(this$) * toFloat64(range)) + minValue) : ~~toInt32(toInt64(op_Addition(toInt64(fromFloat64(Seeded__GetSampleForLargeRange(this$) * toFloat64(range))), toInt64(fromInt32(minValue)))))) | 0;
    }
    NextDouble(): float64 {
        const this$: Seeded = this;
        return Seeded__Sample(this$);
    }
    NextBytes(buffer: uint8[]): void {
        const this$: Seeded = this;
        if (buffer == null) {
            throw new Error("buffer");
        }
        for (let i = 0; i <= (buffer.length - 1); i++) {
            setItem(buffer, i, (Seeded__InternalSample(this$) % (~~255 + 1)) & 0xFF);
        }
    }
}

export function Seeded_$reflection(): TypeInfo {
    return class_type("Random.Seeded", undefined, Seeded);
}

export function Seeded_$ctor_Z524259A4(seed: int32): Seeded {
    return new Seeded(seed);
}

function Seeded__InternalSample(_: Seeded): int32 {
    let retVal = 0;
    let locINext: int32 = _.inext;
    let locINextp: int32 = _.inextp;
    locINext = ((locINext + 1) | 0);
    if (locINext >= 56) {
        locINext = 1;
    }
    locINextp = ((locINextp + 1) | 0);
    if (locINextp >= 56) {
        locINextp = 1;
    }
    retVal = ((item(locINext, _.seedArray) - item(locINextp, _.seedArray)) | 0);
    if (retVal === _.MBIG) {
        retVal = ((retVal - 1) | 0);
    }
    if (retVal < 0) {
        retVal = ((retVal + _.MBIG) | 0);
    }
    _.seedArray[locINext] = (retVal | 0);
    _.inext = (locINext | 0);
    _.inextp = (locINextp | 0);
    return retVal | 0;
}

export function Seeded__Sample(this$: Seeded): float64 {
    return Seeded__InternalSample(this$) * (1 / this$.MBIG);
}

export function Seeded__GetSampleForLargeRange(this$: Seeded): float64 {
    let result: float64 = Seeded__InternalSample(this$);
    if ((Seeded__InternalSample(this$) % 2) === 0) {
        result = -result;
    }
    let d: float64 = result;
    d = (d + (2147483647 - 1));
    d = (d / (2 * ((2147483647 - 1) >>> 0)));
    return d;
}

export function nonSeeded(): NonSeeded {
    return NonSeeded_$ctor();
}

export function seeded(seed: int32): Seeded {
    return Seeded_$ctor_Z524259A4(seed);
}

