import { int32 } from "./Int32.js";

export function Helpers_allocateArrayFromCons<T>(cons: any, len: int32): T[] {
    if ((typeof cons) === "function") {
        return new cons(len);
    }
    else {
        return new Array(len);
    }
}

