import { Union } from "./Types.js";
import { union_type, TypeInfo } from "./Reflection.js";
import { Option, some } from "./Option.js";

export type FSharpChoice$2_$union<T1, T2> = 
    | FSharpChoice$2<T1, T2, 0>
    | FSharpChoice$2<T1, T2, 1>

export type FSharpChoice$2_$cases<T1, T2> = {
    0: ["Choice1Of2", [T1]],
    1: ["Choice2Of2", [T2]]
}

export function FSharpChoice$2_Choice1Of2<T1, T2>(Item: T1) {
    return new FSharpChoice$2<T1, T2, 0>(0, [Item]);
}

export function FSharpChoice$2_Choice2Of2<T1, T2>(Item: T2) {
    return new FSharpChoice$2<T1, T2, 1>(1, [Item]);
}

export class FSharpChoice$2<T1, T2, Tag extends keyof FSharpChoice$2_$cases<T1, T2>> extends Union<Tag, FSharpChoice$2_$cases<T1, T2>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpChoice$2_$cases<T1, T2>[Tag][1]) {
        super();
    }
    cases() {
        return ["Choice1Of2", "Choice2Of2"];
    }
}

export function FSharpChoice$2_$reflection(gen0: TypeInfo, gen1: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpChoice`2", [gen0, gen1], FSharpChoice$2, () => [[["Item", gen0]], [["Item", gen1]]]);
}

export type FSharpChoice$3_$union<T1, T2, T3> = 
    | FSharpChoice$3<T1, T2, T3, 0>
    | FSharpChoice$3<T1, T2, T3, 1>
    | FSharpChoice$3<T1, T2, T3, 2>

export type FSharpChoice$3_$cases<T1, T2, T3> = {
    0: ["Choice1Of3", [T1]],
    1: ["Choice2Of3", [T2]],
    2: ["Choice3Of3", [T3]]
}

export function FSharpChoice$3_Choice1Of3<T1, T2, T3>(Item: T1) {
    return new FSharpChoice$3<T1, T2, T3, 0>(0, [Item]);
}

export function FSharpChoice$3_Choice2Of3<T1, T2, T3>(Item: T2) {
    return new FSharpChoice$3<T1, T2, T3, 1>(1, [Item]);
}

export function FSharpChoice$3_Choice3Of3<T1, T2, T3>(Item: T3) {
    return new FSharpChoice$3<T1, T2, T3, 2>(2, [Item]);
}

export class FSharpChoice$3<T1, T2, T3, Tag extends keyof FSharpChoice$3_$cases<T1, T2, T3>> extends Union<Tag, FSharpChoice$3_$cases<T1, T2, T3>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpChoice$3_$cases<T1, T2, T3>[Tag][1]) {
        super();
    }
    cases() {
        return ["Choice1Of3", "Choice2Of3", "Choice3Of3"];
    }
}

export function FSharpChoice$3_$reflection(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpChoice`3", [gen0, gen1, gen2], FSharpChoice$3, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]]]);
}

export type FSharpChoice$4_$union<T1, T2, T3, T4> = 
    | FSharpChoice$4<T1, T2, T3, T4, 0>
    | FSharpChoice$4<T1, T2, T3, T4, 1>
    | FSharpChoice$4<T1, T2, T3, T4, 2>
    | FSharpChoice$4<T1, T2, T3, T4, 3>

export type FSharpChoice$4_$cases<T1, T2, T3, T4> = {
    0: ["Choice1Of4", [T1]],
    1: ["Choice2Of4", [T2]],
    2: ["Choice3Of4", [T3]],
    3: ["Choice4Of4", [T4]]
}

export function FSharpChoice$4_Choice1Of4<T1, T2, T3, T4>(Item: T1) {
    return new FSharpChoice$4<T1, T2, T3, T4, 0>(0, [Item]);
}

export function FSharpChoice$4_Choice2Of4<T1, T2, T3, T4>(Item: T2) {
    return new FSharpChoice$4<T1, T2, T3, T4, 1>(1, [Item]);
}

export function FSharpChoice$4_Choice3Of4<T1, T2, T3, T4>(Item: T3) {
    return new FSharpChoice$4<T1, T2, T3, T4, 2>(2, [Item]);
}

export function FSharpChoice$4_Choice4Of4<T1, T2, T3, T4>(Item: T4) {
    return new FSharpChoice$4<T1, T2, T3, T4, 3>(3, [Item]);
}

export class FSharpChoice$4<T1, T2, T3, T4, Tag extends keyof FSharpChoice$4_$cases<T1, T2, T3, T4>> extends Union<Tag, FSharpChoice$4_$cases<T1, T2, T3, T4>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpChoice$4_$cases<T1, T2, T3, T4>[Tag][1]) {
        super();
    }
    cases() {
        return ["Choice1Of4", "Choice2Of4", "Choice3Of4", "Choice4Of4"];
    }
}

export function FSharpChoice$4_$reflection(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpChoice`4", [gen0, gen1, gen2, gen3], FSharpChoice$4, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]]]);
}

export type FSharpChoice$5_$union<T1, T2, T3, T4, T5> = 
    | FSharpChoice$5<T1, T2, T3, T4, T5, 0>
    | FSharpChoice$5<T1, T2, T3, T4, T5, 1>
    | FSharpChoice$5<T1, T2, T3, T4, T5, 2>
    | FSharpChoice$5<T1, T2, T3, T4, T5, 3>
    | FSharpChoice$5<T1, T2, T3, T4, T5, 4>

export type FSharpChoice$5_$cases<T1, T2, T3, T4, T5> = {
    0: ["Choice1Of5", [T1]],
    1: ["Choice2Of5", [T2]],
    2: ["Choice3Of5", [T3]],
    3: ["Choice4Of5", [T4]],
    4: ["Choice5Of5", [T5]]
}

export function FSharpChoice$5_Choice1Of5<T1, T2, T3, T4, T5>(Item: T1) {
    return new FSharpChoice$5<T1, T2, T3, T4, T5, 0>(0, [Item]);
}

export function FSharpChoice$5_Choice2Of5<T1, T2, T3, T4, T5>(Item: T2) {
    return new FSharpChoice$5<T1, T2, T3, T4, T5, 1>(1, [Item]);
}

export function FSharpChoice$5_Choice3Of5<T1, T2, T3, T4, T5>(Item: T3) {
    return new FSharpChoice$5<T1, T2, T3, T4, T5, 2>(2, [Item]);
}

export function FSharpChoice$5_Choice4Of5<T1, T2, T3, T4, T5>(Item: T4) {
    return new FSharpChoice$5<T1, T2, T3, T4, T5, 3>(3, [Item]);
}

export function FSharpChoice$5_Choice5Of5<T1, T2, T3, T4, T5>(Item: T5) {
    return new FSharpChoice$5<T1, T2, T3, T4, T5, 4>(4, [Item]);
}

export class FSharpChoice$5<T1, T2, T3, T4, T5, Tag extends keyof FSharpChoice$5_$cases<T1, T2, T3, T4, T5>> extends Union<Tag, FSharpChoice$5_$cases<T1, T2, T3, T4, T5>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpChoice$5_$cases<T1, T2, T3, T4, T5>[Tag][1]) {
        super();
    }
    cases() {
        return ["Choice1Of5", "Choice2Of5", "Choice3Of5", "Choice4Of5", "Choice5Of5"];
    }
}

export function FSharpChoice$5_$reflection(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo, gen4: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpChoice`5", [gen0, gen1, gen2, gen3, gen4], FSharpChoice$5, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]], [["Item", gen4]]]);
}

export type FSharpChoice$6_$union<T1, T2, T3, T4, T5, T6> = 
    | FSharpChoice$6<T1, T2, T3, T4, T5, T6, 0>
    | FSharpChoice$6<T1, T2, T3, T4, T5, T6, 1>
    | FSharpChoice$6<T1, T2, T3, T4, T5, T6, 2>
    | FSharpChoice$6<T1, T2, T3, T4, T5, T6, 3>
    | FSharpChoice$6<T1, T2, T3, T4, T5, T6, 4>
    | FSharpChoice$6<T1, T2, T3, T4, T5, T6, 5>

export type FSharpChoice$6_$cases<T1, T2, T3, T4, T5, T6> = {
    0: ["Choice1Of6", [T1]],
    1: ["Choice2Of6", [T2]],
    2: ["Choice3Of6", [T3]],
    3: ["Choice4Of6", [T4]],
    4: ["Choice5Of6", [T5]],
    5: ["Choice6Of6", [T6]]
}

export function FSharpChoice$6_Choice1Of6<T1, T2, T3, T4, T5, T6>(Item: T1) {
    return new FSharpChoice$6<T1, T2, T3, T4, T5, T6, 0>(0, [Item]);
}

export function FSharpChoice$6_Choice2Of6<T1, T2, T3, T4, T5, T6>(Item: T2) {
    return new FSharpChoice$6<T1, T2, T3, T4, T5, T6, 1>(1, [Item]);
}

export function FSharpChoice$6_Choice3Of6<T1, T2, T3, T4, T5, T6>(Item: T3) {
    return new FSharpChoice$6<T1, T2, T3, T4, T5, T6, 2>(2, [Item]);
}

export function FSharpChoice$6_Choice4Of6<T1, T2, T3, T4, T5, T6>(Item: T4) {
    return new FSharpChoice$6<T1, T2, T3, T4, T5, T6, 3>(3, [Item]);
}

export function FSharpChoice$6_Choice5Of6<T1, T2, T3, T4, T5, T6>(Item: T5) {
    return new FSharpChoice$6<T1, T2, T3, T4, T5, T6, 4>(4, [Item]);
}

export function FSharpChoice$6_Choice6Of6<T1, T2, T3, T4, T5, T6>(Item: T6) {
    return new FSharpChoice$6<T1, T2, T3, T4, T5, T6, 5>(5, [Item]);
}

export class FSharpChoice$6<T1, T2, T3, T4, T5, T6, Tag extends keyof FSharpChoice$6_$cases<T1, T2, T3, T4, T5, T6>> extends Union<Tag, FSharpChoice$6_$cases<T1, T2, T3, T4, T5, T6>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpChoice$6_$cases<T1, T2, T3, T4, T5, T6>[Tag][1]) {
        super();
    }
    cases() {
        return ["Choice1Of6", "Choice2Of6", "Choice3Of6", "Choice4Of6", "Choice5Of6", "Choice6Of6"];
    }
}

export function FSharpChoice$6_$reflection(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo, gen4: TypeInfo, gen5: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpChoice`6", [gen0, gen1, gen2, gen3, gen4, gen5], FSharpChoice$6, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]], [["Item", gen4]], [["Item", gen5]]]);
}

export type FSharpChoice$7_$union<T1, T2, T3, T4, T5, T6, T7> = 
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 0>
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 1>
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 2>
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 3>
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 4>
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 5>
    | FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 6>

export type FSharpChoice$7_$cases<T1, T2, T3, T4, T5, T6, T7> = {
    0: ["Choice1Of7", [T1]],
    1: ["Choice2Of7", [T2]],
    2: ["Choice3Of7", [T3]],
    3: ["Choice4Of7", [T4]],
    4: ["Choice5Of7", [T5]],
    5: ["Choice6Of7", [T6]],
    6: ["Choice7Of7", [T7]]
}

export function FSharpChoice$7_Choice1Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T1) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 0>(0, [Item]);
}

export function FSharpChoice$7_Choice2Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T2) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 1>(1, [Item]);
}

export function FSharpChoice$7_Choice3Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T3) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 2>(2, [Item]);
}

export function FSharpChoice$7_Choice4Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T4) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 3>(3, [Item]);
}

export function FSharpChoice$7_Choice5Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T5) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 4>(4, [Item]);
}

export function FSharpChoice$7_Choice6Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T6) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 5>(5, [Item]);
}

export function FSharpChoice$7_Choice7Of7<T1, T2, T3, T4, T5, T6, T7>(Item: T7) {
    return new FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, 6>(6, [Item]);
}

export class FSharpChoice$7<T1, T2, T3, T4, T5, T6, T7, Tag extends keyof FSharpChoice$7_$cases<T1, T2, T3, T4, T5, T6, T7>> extends Union<Tag, FSharpChoice$7_$cases<T1, T2, T3, T4, T5, T6, T7>[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: FSharpChoice$7_$cases<T1, T2, T3, T4, T5, T6, T7>[Tag][1]) {
        super();
    }
    cases() {
        return ["Choice1Of7", "Choice2Of7", "Choice3Of7", "Choice4Of7", "Choice5Of7", "Choice6Of7", "Choice7Of7"];
    }
}

export function FSharpChoice$7_$reflection(gen0: TypeInfo, gen1: TypeInfo, gen2: TypeInfo, gen3: TypeInfo, gen4: TypeInfo, gen5: TypeInfo, gen6: TypeInfo): TypeInfo {
    return union_type("FSharp.Core.FSharpChoice`7", [gen0, gen1, gen2, gen3, gen4, gen5, gen6], FSharpChoice$7, () => [[["Item", gen0]], [["Item", gen1]], [["Item", gen2]], [["Item", gen3]], [["Item", gen4]], [["Item", gen5]], [["Item", gen6]]]);
}

export function Choice_makeChoice1Of2<T1, a>(x: T1): FSharpChoice$2_$union<T1, a> {
    return FSharpChoice$2_Choice1Of2<T1, a>(x);
}

export function Choice_makeChoice2Of2<T2, a>(x: T2): FSharpChoice$2_$union<a, T2> {
    return FSharpChoice$2_Choice2Of2<a, T2>(x);
}

export function Choice_tryValueIfChoice1Of2<T1, T2>(x: FSharpChoice$2_$union<T1, T2>): Option<T1> {
    if (x.tag === /* Choice1Of2 */ 0) {
        return some(x.fields[0]);
    }
    else {
        return undefined;
    }
}

export function Choice_tryValueIfChoice2Of2<T1, T2>(x: FSharpChoice$2_$union<T1, T2>): Option<T2> {
    if (x.tag === /* Choice2Of2 */ 1) {
        return some(x.fields[0]);
    }
    else {
        return undefined;
    }
}

