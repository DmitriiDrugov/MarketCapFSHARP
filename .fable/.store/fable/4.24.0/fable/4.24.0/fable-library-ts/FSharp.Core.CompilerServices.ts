import { class_type, TypeInfo } from "./Reflection.js";
import { addRangeInPlace } from "./Array.js";
import { toList } from "./Seq.js";
import { FSharpList } from "./List.js";

export class ListCollector$1<T> {
    readonly collector: T[];
    constructor() {
        this.collector = [];
    }
}

export function ListCollector$1_$reflection(gen0: TypeInfo): TypeInfo {
    return class_type("Microsoft.FSharp.Core.CompilerServices.ListCollector`1", [gen0], ListCollector$1);
}

export function ListCollector$1_$ctor<T>(): ListCollector$1<T> {
    return new ListCollector$1();
}

export function ListCollector$1__Add_2B595<T>(this$: ListCollector$1<T>, value: T): void {
    void (this$.collector.push(value));
}

export function ListCollector$1__AddMany_BB573A<T>(this$: ListCollector$1<T>, values: Iterable<T>): void {
    addRangeInPlace(values, this$.collector);
}

export function ListCollector$1__AddManyAndClose_BB573A<T>(this$: ListCollector$1<T>, values: Iterable<T>): FSharpList<T> {
    addRangeInPlace(values, this$.collector);
    return toList<T>(this$.collector);
}

export function ListCollector$1__Close<T>(this$: ListCollector$1<T>): FSharpList<T> {
    return toList<T>(this$.collector);
}

