// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './List.dart' as list;
import './Types.dart' as types;
import './Util.dart' as util;

abstract class FSharpResult$2<$T, $TError> implements types.Union, Comparable<FSharpResult$2<$T, $TError>> {
    final int tag;
    const FSharpResult$2(this.tag);
}

class FSharpResult$2_Ok<$T, $TError> extends FSharpResult$2<$T, $TError> {
    final $T ResultValue;
    const FSharpResult$2_Ok(this.ResultValue): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpResult$2_Ok<$T, $TError>) && util.equalsDynamic(other.ResultValue, ResultValue);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, ResultValue.hashCode]);
    @override
    int compareTo(FSharpResult$2<$T, $TError> other) {
        if (other is FSharpResult$2_Ok<$T, $TError>) {
            return util.compareDynamic(ResultValue, other.ResultValue);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpResult$2_Error<$T, $TError> extends FSharpResult$2<$T, $TError> {
    final $TError ErrorValue;
    const FSharpResult$2_Error(this.ErrorValue): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpResult$2_Error<$T, $TError>) && util.equalsDynamic(other.ErrorValue, ErrorValue);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, ErrorValue.hashCode]);
    @override
    int compareTo(FSharpResult$2<$T, $TError> other) {
        if (other is FSharpResult$2_Error<$T, $TError>) {
            return util.compareDynamic(ErrorValue, other.ErrorValue);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

FSharpResult$2<$$b, $$c> Result_Map<$$a, $$b, $$c>($$b Function($$a) mapping, FSharpResult$2<$$a, $$c> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$$a, $$c>;
        return FSharpResult$2_Ok<$$b, $$c>(mapping(result_1.ResultValue));
    } else {
        final result_2 = result as FSharpResult$2_Error<$$a, $$c>;
        return FSharpResult$2_Error<$$b, $$c>(result_2.ErrorValue);
    }
}

FSharpResult$2<$$c, $$b> Result_MapError<$$a, $$b, $$c>($$b Function($$a) mapping, FSharpResult$2<$$c, $$a> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$$c, $$a>;
        return FSharpResult$2_Ok<$$c, $$b>(result_1.ResultValue);
    } else {
        final result_2 = result as FSharpResult$2_Error<$$c, $$a>;
        return FSharpResult$2_Error<$$c, $$b>(mapping(result_2.ErrorValue));
    }
}

FSharpResult$2<$$b, $$c> Result_Bind<$$a, $$b, $$c>(FSharpResult$2<$$b, $$c> Function($$a) binder, FSharpResult$2<$$a, $$c> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$$a, $$c>;
        return binder(result_1.ResultValue);
    } else {
        final result_2 = result as FSharpResult$2_Error<$$a, $$c>;
        return FSharpResult$2_Error<$$b, $$c>(result_2.ErrorValue);
    }
}

bool Result_IsOk<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        return true;
    } else {
        return false;
    }
}

bool Result_IsError<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        return false;
    } else {
        return true;
    }
}

bool Result_Contains<$a, $b>($a value, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return util.equalsDynamic(result_1.ResultValue, value);
    } else {
        return false;
    }
}

int Result_Count<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        return 1;
    } else {
        return 0;
    }
}

$a Result_DefaultValue<$a, $b>($a defaultValue, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return result_1.ResultValue;
    } else {
        return defaultValue;
    }
}

$a Result_DefaultWith<$b, $a>($a Function($b) defThunk, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return result_1.ResultValue;
    } else {
        final result_2 = result as FSharpResult$2_Error<$a, $b>;
        return defThunk(result_2.ErrorValue);
    }
}

bool Result_Exists<$a, $b>(bool Function($a) predicate, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return predicate(result_1.ResultValue);
    } else {
        return false;
    }
}

$s Result_Fold<$a, $b, $s>($s Function($s, $a) folder, $s state, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return folder(state, result_1.ResultValue);
    } else {
        return state;
    }
}

$s Result_FoldBack<$a, $b, $s>($s Function($a, $s) folder, FSharpResult$2<$a, $b> result, $s state) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return folder(result_1.ResultValue, state);
    } else {
        return state;
    }
}

bool Result_ForAll<$a, $b>(bool Function($a) predicate, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return predicate(result_1.ResultValue);
    } else {
        return true;
    }
}

void Result_Iterate<$a, $b>(void Function($a) action, FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        action(result_1.ResultValue);
    }
}

List<$a> Result_ToArray<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return [result_1.ResultValue];
    } else {
        return <$a>[];
    }
}

list.FSharpList<$a> Result_ToList<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return list.singleton(result_1.ResultValue);
    } else {
        return list.empty<$a>();
    }
}

types.Some<$a>? Result_ToOption<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return types.Some(result_1.ResultValue);
    } else {
        return null;
    }
}

types.Some<$a>? Result_ToValueOption<$a, $b>(FSharpResult$2<$a, $b> result) {
    if (result.tag == /* Ok */ 0) {
        final result_1 = result as FSharpResult$2_Ok<$a, $b>;
        return types.Some(result_1.ResultValue);
    } else {
        return null;
    }
}

