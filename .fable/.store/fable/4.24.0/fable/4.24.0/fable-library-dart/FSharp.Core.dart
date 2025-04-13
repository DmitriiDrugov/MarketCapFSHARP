// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Types.dart' as types;

abstract class Lazy<$T> {
    $T Force();
}

$U Operators_Using<$T extends types.IDisposable, $U>($T resource, $U Function($T) action) {
    try {
        return action(resource);
    } finally {
        var copyOfStruct = resource;
        types.dispose(copyOfStruct);
    }
}

$b Operators_Lock<$a, $b>($a _lockObj, $b Function() action) => action();

$$a ExtraTopLevelOperators_LazyPattern<$$a>(Lazy<$$a> input) => input.Force();

