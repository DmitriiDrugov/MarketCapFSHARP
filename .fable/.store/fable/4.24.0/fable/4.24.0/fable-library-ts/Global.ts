import { int32 } from "./Int32.js";

export interface Fable_Core_IGenericAdder$1<T> {
    Add(arg0: T, arg1: T): T,
    GetZero(): T
}

export interface Fable_Core_IGenericAverager$1<T> {
    Add(arg0: T, arg1: T): T,
    DivideByInt(arg0: T, arg1: int32): T,
    GetZero(): T
}

export interface Fable_Core_Symbol_wellknown {
    [Symbol.toStringTag]: string
}

export interface Fable_Core_IJsonSerializable {
    toJSON(): any
}

export const SR_indexOutOfBounds = "The index was outside the range of elements in the collection.";

export const SR_inputWasEmpty = "Collection was empty.";

export const SR_inputMustBeNonNegative = "The input must be non-negative.";

export const SR_inputSequenceEmpty = "The input sequence was empty.";

export const SR_inputSequenceTooLong = "The input sequence contains more than one element.";

export const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";

export const SR_differentLengths = "The collections had different lengths.";

export const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";

