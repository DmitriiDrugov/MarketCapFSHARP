// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this

abstract class Fable_Core_IGenericAdder$1<$T> {
    $T Add($T arg0$, $T arg1$);
    $T GetZero();
}

abstract class Fable_Core_IGenericAverager$1<$T> {
    $T Add($T arg0$, $T arg1$);
    $T DivideByInt($T arg0$, int arg1$);
    $T GetZero();
}

const SR_indexOutOfBounds = 'The index was outside the range of elements in the collection.';

const SR_inputWasEmpty = 'Collection was empty.';

const SR_inputMustBeNonNegative = 'The input must be non-negative.';

const SR_inputSequenceEmpty = 'The input sequence was empty.';

const SR_inputSequenceTooLong = 'The input sequence contains more than one element.';

const SR_keyNotFoundAlt = 'An index satisfying the predicate was not found in the collection.';

const SR_differentLengths = 'The collections had different lengths.';

const SR_notEnoughElements = 'The input sequence has an insufficient number of elements.';

const SR_enumerationAlreadyFinished = 'Enumeration already finished.';

const SR_enumerationNotStarted = 'Enumeration has not started. Call MoveNext.';

const SR_resetNotSupported = 'Reset is not supported on this enumerator.';

