// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './List.dart' as list;
import './Types.dart' as types;
import './Util.dart' as util;

$T defaultValue<$T>($T def, types.Some<$T>? opt) {
    if (opt != null) {
        return types.value(opt);
    } else {
        return def;
    }
}

$T defaultWith<$T>($T Function() fn, types.Some<$T>? opt) {
    if (opt != null) {
        return types.value(opt);
    } else {
        return fn();
    }
}

types.Some<$T>? orElse<$T>(types.Some<$T>? def, types.Some<$T>? opt) {
    if (opt != null) {
        return types.Some(types.value(opt));
    } else {
        return def;
    }
}

types.Some<$T>? orElseWith<$T>(types.Some<$T>? Function() fn, types.Some<$T>? opt) {
    if (opt != null) {
        return types.Some(types.value(opt));
    } else {
        return fn();
    }
}

List<$T> toArray<$T>(types.Some<$T>? opt) {
    if (opt != null) {
        return [types.value(opt)];
    } else {
        return <$T>[];
    }
}

list.FSharpList<$T> toList<$T>(types.Some<$T>? opt) {
    if (opt != null) {
        return list.singleton(types.value(opt));
    } else {
        return list.empty<$T>();
    }
}

int count<$T>(types.Some<$T>? opt) {
    if (opt == null) {
        return 0;
    } else {
        return 1;
    }
}

bool contains<$T>($T value, types.Some<$T>? opt) {
    if (opt == null) {
        return false;
    } else {
        return util.equalsDynamic(value, types.value(opt));
    }
}

void iterate<$T>(void Function($T) fn, types.Some<$T>? opt) {
    if (opt == null) {
    } else {
        fn(types.value(opt));
    }
}

bool forAll<$T>(bool Function($T) fn, types.Some<$T>? opt) {
    if (opt == null) {
        return true;
    } else {
        return fn(types.value(opt));
    }
}

bool exists<$T>(bool Function($T) fn, types.Some<$T>? opt) {
    if (opt == null) {
        return false;
    } else {
        return fn(types.value(opt));
    }
}

$State fold<$T, $State>($State Function($State, $T) folder, $State state, types.Some<$T>? opt) {
    if (opt == null) {
        return state;
    } else {
        return folder(state, types.value(opt));
    }
}

$State foldBack<$T, $State>($State Function($T, $State) folder, types.Some<$T>? opt, $State state) {
    if (opt == null) {
        return state;
    } else {
        return folder(types.value(opt), state);
    }
}

types.Some<$T>? filter<$T>(bool Function($T) fn, types.Some<$T>? opt) {
    if (opt != null) {
        final opt_1 = types.value(opt);
        if (fn(opt_1)) {
            return types.Some(opt_1);
        } else {
            return null;
        }
    } else {
        return null;
    }
}

types.Some<$T>? flatten<$T>(types.Some<types.Some<$T>?>? opt) {
    if (opt == null) {
        return null;
    } else {
        return types.value(opt);
    }
}

types.Some<$U>? map<$T, $U>($U Function($T) fn, types.Some<$T>? opt) {
    if (opt != null) {
        return types.Some(fn(types.value(opt)));
    } else {
        return null;
    }
}

types.Some<$U>? map2<$T1, $T2, $U>($U Function($T1, $T2) fn, types.Some<$T1>? opt1, types.Some<$T2>? opt2) {
    if ((opt1 != null) && (opt2 != null)) {
        return types.Some(fn(types.value(opt1), types.value(opt2)));
    } else {
        return null;
    }
}

types.Some<$U>? map3<$T1, $T2, $T3, $U>($U Function($T1, $T2, $T3) fn, types.Some<$T1>? opt1, types.Some<$T2>? opt2, types.Some<$T3>? opt3) {
    if ((opt1 != null) && ((opt2 != null) && (opt3 != null))) {
        return types.Some(fn(types.value(opt1), types.value(opt2), types.value(opt3)));
    } else {
        return null;
    }
}

types.Some<$U>? bind<$T, $U>(types.Some<$U>? Function($T) fn, types.Some<$T>? opt) {
    if (opt != null) {
        return fn(types.value(opt));
    } else {
        return null;
    }
}

types.Some<$T>? ofNullable<$T extends Object>($T? x) {
    if (x != null) {
        return types.Some(util.value(x));
    } else {
        return null;
    }
}

$T? toNullable<$T extends Object>(types.Some<$T>? opt) {
    if (opt == null) {
        return null;
    } else {
        return types.value(opt);
    }
}

