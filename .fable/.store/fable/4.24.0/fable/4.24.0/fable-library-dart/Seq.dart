// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Array.dart' as array_2;
import './FSharp.Core.dart' as fsharp_core;
import './List.dart' as list;
import './Types.dart' as types;
import './Util.dart' as util;
import './Global.dart' as global$;

$$a Enumerator_noReset<$$a>() => throw Exception(global$.SR_resetNotSupported);

$$a Enumerator_notStarted<$$a>() => throw Exception(global$.SR_enumerationNotStarted);

$$a Enumerator_alreadyFinished<$$a>() => throw Exception(global$.SR_enumerationAlreadyFinished);

class Enumerator_Seq<$T> extends Iterable<$T> {
    final Iterator<$T> Function() f;
    Enumerator_Seq(this.f): super();
    @override
    String toString() {
        var i = 0;
        var str = 'seq [';
        final e = this.iterator;
        try {
            while ((i < 4) && e.moveNext()) {
                if (i > 0) {
                    str = str + '; ';
                }
                str = str + e.current.toString();
                i = i + 1;
            }
            if (i == 4) {
                str = str + '; ...';
            }
            return str + ']';
        } finally {
            if (e is types.IDisposable) {
                types.dispose(e);
            }
        }
    }
    @override
    Iterator<$T> get iterator => this.f();
}

class Enumerator_FromFunctions$1<$T> implements types.IDisposable, Iterator<$T> {
    final bool Function() _next;
    final void Function() _dispose;
    final $T Function() _current;
    Enumerator_FromFunctions$1(this._current, this._next, this._dispose);
    @override
    $T get current => this._current();
    @override
    bool moveNext() => this._next();
    @override
    void Dispose() {
        this._dispose();
    }
}

Iterator<$T> Enumerator_concat<$T, $U extends Iterable<$T>>(Iterable<$U> sources) {
    types.Some<Iterator<$U>>? outerOpt;
    types.Some<Iterator<$T>>? innerOpt;
    var started = false;
    var finished = false;
    late $T curr;
    void finish() {
        finished = true;
        if (innerOpt != null) {
            final inner = types.value(innerOpt);
            try {
                types.dispose(inner);
            } finally {
                innerOpt = null;
            }
        }
        if (outerOpt != null) {
            final outer = types.value(outerOpt);
            try {
                types.dispose(outer);
            } finally {
                outerOpt = null;
            }
        }
    }
    return Enumerator_FromFunctions$1<$T>(() {
        if (!started) {
            return Enumerator_notStarted<$T>();
        } else if (finished) {
            return Enumerator_alreadyFinished<$T>();
        } else {
            return curr;
        }
    }, () {
        if (!started) {
            started = true;
        }
        if (finished) {
            return false;
        } else {
            types.Some<bool>? res;
            while (res == null) {
                final types.Some<Iterator<$U>>? outerOpt_1 = outerOpt;
                final types.Some<Iterator<$T>>? innerOpt_1 = innerOpt;
                if (outerOpt_1 != null) {
                    if (innerOpt_1 != null) {
                        if (types.value(innerOpt_1).moveNext()) {
                            curr = types.value(innerOpt_1).current;
                            res = const types.Some(true);
                        } else {
                            try {
                                types.dispose(types.value(innerOpt_1));
                            } finally {
                                innerOpt = null;
                            }
                        }
                    } else if (types.value(outerOpt_1).moveNext()) {
                        final ie = types.value(outerOpt_1).current;
                        innerOpt = types.Some(ie.iterator);
                    } else {
                        finish();
                        res = const types.Some(false);
                    }
                } else {
                    outerOpt = types.Some(sources.iterator);
                }
            }
            return types.value(res);
        }
    }, () {
        if (!finished) {
            finish();
        }
    });
}

Iterator<$T> Enumerator_enumerateThenFinally<$T>(void Function() f, Iterator<$T> e) => Enumerator_FromFunctions$1<$T>(() => e.current, () => e.moveNext(), () {
    try {
        types.dispose(e);
    } finally {
        f();
    }
});

Iterator<$U> Enumerator_generateWhileSome<$T, $U>($T Function() openf, types.Some<$U>? Function($T) compute, void Function($T) closef) {
    var started = false;
    types.Some<$U>? curr;
    types.Some<$T>? state = types.Some(openf());
    void dispose() {
        if (state != null) {
            final x_1 = types.value(state);
            try {
                closef(x_1);
            } finally {
                state = null;
            }
        }
    }
    void finish() {
        try {
            dispose();
        } finally {
            curr = null;
        }
    }
    return Enumerator_FromFunctions$1<$U>(() {
        if (!started) {
            Enumerator_notStarted<void>();
        }
        if (curr != null) {
            return types.value(curr);
        } else {
            return Enumerator_alreadyFinished<$U>();
        }
    }, () {
        if (!started) {
            started = true;
        }
        if (state != null) {
            final s = types.value(state);
            final types.Some<$U>? matchValue_1;
            try {
                matchValue_1 = compute(s);
            } catch (matchValue) {
                finish();
                rethrow;
            }
            if (matchValue_1 != null) {
                curr = matchValue_1;
                return true;
            } else {
                finish();
                return false;
            }
        } else {
            return false;
        }
    }, dispose);
}

Iterator<$T> Enumerator_unfold<$State, $T>(types.Some<types.Tuple2<$T, $State>>? Function($State) f, $State state) {
    types.Some<types.Tuple2<$T, $State>>? curr;
    var acc = state;
    return Enumerator_FromFunctions$1<$T>(() {
        if (curr != null) {
            return types.value(curr).item1;
        } else {
            return Enumerator_notStarted<$T>();
        }
    }, () {
        curr = f(acc);
        if (curr != null) {
            final st = types.value(curr).item2;
            acc = st;
            return true;
        } else {
            return false;
        }
    }, () {
    });
}

Iterable<$b> Enumerator_generate<$a, $b>($a Function() create, types.Some<$b>? Function($a) compute, void Function($a) dispose) => Enumerator_Seq<$b>(() => Enumerator_generateWhileSome<$a, $b>(create, compute, dispose));

Iterable<$b> Enumerator_generateIndexed<$a, $b>($a Function() create, types.Some<$b>? Function(int, $a) compute, void Function($a) dispose) => Enumerator_Seq<$b>(() {
    var i = -1;
    return Enumerator_generateWhileSome<$a, $b>(create, ($a x) {
        i = i + 1;
        return compute(i, x);
    }, dispose);
});

$$a indexNotFound<$$a>() => throw Exception(global$.SR_keyNotFoundAlt);

Iterable<$T> mkSeq<$T>(Iterator<$T> Function() f) => Enumerator_Seq<$T>(f);

Iterator<$T> ofSeq<$T>(Iterable<$T> xs) => xs.iterator;

Iterable<$T> delay<$T>(Iterable<$T> Function() generator) => mkSeq<$T>(() => generator().iterator);

Iterable<$T> concat<$Collection extends Iterable<$T>, $T>(Iterable<$Collection> sources) => mkSeq<$T>(() => Enumerator_concat<$T, $Collection>(sources));

Iterable<$T> unfold<$State, $T>(types.Some<types.Tuple2<$T, $State>>? Function($State) generator, $State state) => mkSeq<$T>(() => Enumerator_unfold<$State, $T>(generator, state));

Iterable<$T> empty<$T>() => delay<$T>(() => <$T>[]);

Iterable<$T> singleton<$T>($T x) => delay<$T>(() => [x]);

Iterable<$T> ofArray<$T>(List<$T> arr) => arr;

List<$T> toArray<$T>(Iterable<$T> xs) {
    if (xs is list.FSharpList<$T>) {
        final a = xs;
        return list.toArray<$T>(a);
    } else {
        return List.of(xs);
    }
}

Iterable<$T> ofList<$T>(list.FSharpList<$T> xs) => xs;

list.FSharpList<$T> toList<$T>(Iterable<$T> xs) {
    if (xs is List<$T>) {
        return list.ofArray<$T>(xs);
    } else if (xs is list.FSharpList<$T>) {
        return xs;
    } else {
        return list.ofSeq<$T>(xs);
    }
}

Iterable<$T> append<$T>(Iterable<$T> xs, Iterable<$T> ys) => concat<Iterable<$T>, $T>([xs, ys]);

Iterable<$U> choose<$T, $U>(types.Some<$U>? Function($T) chooser, Iterable<$T> xs) => Enumerator_generate<Iterator<$T>, $U>(() => ofSeq<$T>(xs), (Iterator<$T> e) {
    types.Some<$U>? curr;
    while ((curr == null) && e.moveNext()) {
        final types.Some<$U>? matchValue = chooser(e.current);
        curr = (matchValue == null) ? null : types.Some(types.value(matchValue));
    }
    return curr;
}, (Iterator<$T> e_1) {
    types.dispose(e_1);
});

int compareWith<$T>(int Function($T, $T) comparer, Iterable<$T> xs, Iterable<$T> ys) {
    final e1 = ofSeq<$T>(xs);
    try {
        final e2 = ofSeq<$T>(ys);
        try {
            var c = 0;
            var b1 = e1.moveNext();
            var b2 = e2.moveNext();
            while (((c == 0) && b1) && b2) {
                c = comparer(e1.current, e2.current);
                if (c == 0) {
                    b1 = e1.moveNext();
                    b2 = e2.moveNext();
                }
            }
            if (c != 0) {
                return c;
            } else if (b1) {
                return 1;
            } else if (b2) {
                return -1;
            } else {
                return 0;
            }
        } finally {
            if (e2 is types.IDisposable) {
                types.dispose(e2);
            }
        }
    } finally {
        if (e1 is types.IDisposable) {
            types.dispose(e1);
        }
    }
}

bool contains<$T>($T value, Iterable<$T> xs, types.IEqualityComparer<$T> comparer) {
    final e = ofSeq<$T>(xs);
    try {
        var found = false;
        while (!found && e.moveNext()) {
            found = comparer.Equals(value, e.current);
        }
        return found;
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

Iterable<$b> enumerateFromFunctions<$a, $b>($a Function() create, bool Function($a) moveNext, $b Function($a) current) => Enumerator_generate<$a, $b>(create, ($a x) {
    if (moveNext(x)) {
        return types.Some(current(x));
    } else {
        return null;
    }
}, ($a x_1) {
    final matchValue = x_1;
    if (matchValue is types.IDisposable) {
        final id = matchValue;
        types.dispose(id);
    }
});

Iterable<$T> enumerateThenFinally<$T>(Iterable<$T> source, void Function() compensation) {
    final compensation_1 = compensation;
    return mkSeq<$T>(() {
        try {
            return Enumerator_enumerateThenFinally<$T>(compensation_1, ofSeq<$T>(source));
        } catch (matchValue) {
            compensation_1();
            rethrow;
        }
    });
}

Iterable<$U> enumerateUsing<$T extends types.IDisposable, $$a extends Iterable<$U>, $U>($T resource, $$a Function($T) source) {
    void compensation() {
        var copyOfStruct = resource;
        types.dispose(copyOfStruct);
    }
    return mkSeq<$U>(() {
        try {
            return Enumerator_enumerateThenFinally<$U>(compensation, ofSeq<$U>(source(resource)));
        } catch (matchValue) {
            compensation();
            rethrow;
        }
    });
}

Iterable<$T> enumerateWhile<$T>(bool Function() guard, Iterable<$T> xs) => concat<Iterable<$T>, $T>(unfold<int, Iterable<$T>>((int i) {
    if (guard()) {
        return types.Some(types.Tuple2(xs, i + 1));
    } else {
        return null;
    }
}, 0));

Iterable<$T> filter<$T>(bool Function($T) f, Iterable<$T> xs) => choose<$T, $T>(($T x) {
    if (f(x)) {
        return types.Some(x);
    } else {
        return null;
    }
}, xs);

bool exists<$T>(bool Function($T) predicate, Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        var found = false;
        while (!found && e.moveNext()) {
            found = predicate(e.current);
        }
        return found;
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

bool exists2<$T1, $T2>(bool Function($T1, $T2) predicate, Iterable<$T1> xs, Iterable<$T2> ys) {
    final e1 = ofSeq<$T1>(xs);
    try {
        final e2 = ofSeq<$T2>(ys);
        try {
            var found = false;
            while ((!found && e1.moveNext()) && e2.moveNext()) {
                found = predicate(e1.current, e2.current);
            }
            return found;
        } finally {
            if (e2 is types.IDisposable) {
                types.dispose(e2);
            }
        }
    } finally {
        if (e1 is types.IDisposable) {
            types.dispose(e1);
        }
    }
}

$T exactlyOne<$T>(Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        if (e.moveNext()) {
            final v = e.current;
            if (e.moveNext()) {
                return throw Exception((global$.SR_inputSequenceTooLong + '\\nParameter name: ') + 'source');
            } else {
                return v;
            }
        } else {
            return throw Exception((global$.SR_inputSequenceEmpty + '\\nParameter name: ') + 'source');
        }
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

types.Some<$T>? tryExactlyOne<$T>(Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        if (e.moveNext()) {
            final v = e.current;
            if (e.moveNext()) {
                return null;
            } else {
                return types.Some(v);
            }
        } else {
            return null;
        }
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

$T find<$T>(bool Function($T) predicate, Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        var found = false;
        late $T res;
        while (!found && e.moveNext()) {
            final c = e.current;
            if (predicate(c)) {
                found = true;
                res = c;
            }
        }
        if (found) {
            return res;
        } else {
            return indexNotFound<$T>();
        }
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

types.Some<$T>? tryFind<$T>(bool Function($T) predicate, Iterable<$T> xs) {
    try {
        return types.Some(find<$T>(predicate, xs));
    } catch (matchValue) {
        return null;
    }
}

types.Some<$T>? tryFindBack<$T>(bool Function($T) predicate, Iterable<$T> xs) => array_2.tryFindBack<$T>(predicate, toArray<$T>(xs));

$T findBack<$T>(bool Function($T) predicate, Iterable<$T> xs) => array_2.findBack<$T>(predicate, toArray<$T>(xs));

int findIndex<$T>(bool Function($T) predicate, Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        int loop(int i_mut) {
            loop:
            while (true) {
                final i = i_mut;
                if (e.moveNext()) {
                    if (predicate(e.current)) {
                        return i;
                    } else {
                        i_mut = i + 1;
                        continue loop;
                    }
                } else {
                    return indexNotFound<int>();
                }
            }
        }
        return loop(0);
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

types.Some<int>? tryFindIndex<$T>(bool Function($T) predicate, Iterable<$T> xs) {
    try {
        return types.Some(findIndex<$T>(predicate, xs));
    } catch (matchValue) {
        return null;
    }
}

types.Some<int>? tryFindIndexBack<$T>(bool Function($T) predicate, Iterable<$T> xs) => array_2.tryFindIndexBack<$T>(predicate, toArray<$T>(xs));

int findIndexBack<$T>(bool Function($T) predicate, Iterable<$T> xs) => array_2.findIndexBack<$T>(predicate, toArray<$T>(xs));

$State fold<$T, $State>($State Function($State, $T) folder, $State state, Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        var acc = state;
        while (e.moveNext()) {
            acc = folder(acc, e.current);
        }
        return acc;
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

$State foldBack<$T, $State>($State Function($T, $State) folder, Iterable<$T> xs, $State state) => array_2.foldBack<$T, $State>(folder, toArray<$T>(xs), state);

$State fold2<$T1, $T2, $State>($State Function($State, $T1, $T2) folder, $State state, Iterable<$T1> xs, Iterable<$T2> ys) {
    final e1 = ofSeq<$T1>(xs);
    try {
        final e2 = ofSeq<$T2>(ys);
        try {
            var acc = state;
            while (e1.moveNext() && e2.moveNext()) {
                acc = folder(acc, e1.current, e2.current);
            }
            return acc;
        } finally {
            if (e2 is types.IDisposable) {
                types.dispose(e2);
            }
        }
    } finally {
        if (e1 is types.IDisposable) {
            types.dispose(e1);
        }
    }
}

$State foldBack2<$T1, $T2, $State>($State Function($T1, $T2, $State) folder, Iterable<$T1> xs, Iterable<$T2> ys, $State state) => array_2.foldBack2<$T1, $T2, $State>(folder, toArray<$T1>(xs), toArray<$T2>(ys), state);

bool forAll<$a>(bool Function($a) predicate, Iterable<$a> xs) => !(exists<$a>(($a x) => !(predicate(x)), xs));

bool forAll2<$a, $b>(bool Function($a, $b) predicate, Iterable<$a> xs, Iterable<$b> ys) => !(exists2<$a, $b>(($a x, $b y) => !(predicate(x, y)), xs, ys));

$T head<$T>(Iterable<$T> xs) {
    if (xs is List<$T>) {
        return array_2.head<$T>(xs);
    } else if (xs is list.FSharpList<$T>) {
        return list.head<$T>(xs);
    } else {
        final e = ofSeq<$T>(xs);
        try {
            if (e.moveNext()) {
                return e.current;
            } else {
                return throw Exception((global$.SR_inputSequenceEmpty + '\\nParameter name: ') + 'source');
            }
        } finally {
            if (e is types.IDisposable) {
                types.dispose(e);
            }
        }
    }
}

types.Some<$T>? tryHead<$T>(Iterable<$T> xs) {
    try {
        return types.Some(head<$T>(xs));
    } catch (matchValue) {
        return null;
    }
}

Iterable<$a> initialize<$a>(int count, $a Function(int) f) => unfold<int, $a>((int i) {
    if (i < count) {
        return types.Some(types.Tuple2(f(i), i + 1));
    } else {
        return null;
    }
}, 0);

Iterable<$a> initializeInfinite<$a>($a Function(int) f) => initialize<$a>(2147483647, f);

bool isEmpty<$T>(Iterable<$T> xs) {
    if (xs is List<$T>) {
        final a = xs;
        return a.isEmpty;
    } else if (xs is list.FSharpList<$T>) {
        return list.isEmpty(xs);
    } else {
        final e = ofSeq<$T>(xs);
        try {
            return !(e.moveNext());
        } finally {
            if (e is types.IDisposable) {
                types.dispose(e);
            }
        }
    }
}

$T item<$T>(int index, Iterable<$T> xs) {
    if (xs is List<$T>) {
        final a = xs;
        return a[index];
    } else if (xs is list.FSharpList<$T>) {
        return list.item<$T>(index, xs);
    } else {
        final e = ofSeq<$T>(xs);
        try {
            $T loop(int index_1_mut) {
                loop:
                while (true) {
                    final index_1 = index_1_mut;
                    if (!(e.moveNext())) {
                        return throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'index');
                    } else if (index_1 == 0) {
                        return e.current;
                    } else {
                        index_1_mut = index_1 - 1;
                        continue loop;
                    }
                }
            }
            return loop(index);
        } finally {
            if (e is types.IDisposable) {
                types.dispose(e);
            }
        }
    }
}

types.Some<$T>? tryItem<$T>(int index, Iterable<$T> xs) {
    try {
        return types.Some(item<$T>(index, xs));
    } catch (matchValue) {
        return null;
    }
}

void iterate<$a>(void Function($a) action, Iterable<$a> xs) {
    fold<$a, void>((void unitVar, $a x) {
        action(x);
    }, util.ignore(), xs);
}

void iterate2<$a, $b>(void Function($a, $b) action, Iterable<$a> xs, Iterable<$b> ys) {
    fold2<$a, $b, void>((void unitVar, $a x, $b y) {
        action(x, y);
    }, util.ignore(), xs, ys);
}

void iterateIndexed<$a>(void Function(int, $a) action, Iterable<$a> xs) {
    fold<$a, int>((int i, $a x) {
        action(i, x);
        return i + 1;
    }, 0, xs);
}

void iterateIndexed2<$a, $b>(void Function(int, $a, $b) action, Iterable<$a> xs, Iterable<$b> ys) {
    fold2<$a, $b, int>((int i, $a x, $b y) {
        action(i, x, y);
        return i + 1;
    }, 0, xs, ys);
}

$T last<$T>(Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        $T loop($T acc_mut) {
            loop:
            while (true) {
                final acc = acc_mut;
                if (!(e.moveNext())) {
                    return acc;
                } else {
                    acc_mut = e.current;
                    continue loop;
                }
            }
        }
        if (e.moveNext()) {
            return loop(e.current);
        } else {
            return throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'source');
        }
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

types.Some<$T>? tryLast<$T>(Iterable<$T> xs) {
    try {
        return types.Some(last<$T>(xs));
    } catch (matchValue) {
        return null;
    }
}

int length<$T>(Iterable<$T> xs) {
    if (xs is List<$T>) {
        final a = xs;
        return a.length;
    } else if (xs is list.FSharpList<$T>) {
        return list.length<$T>(xs);
    } else {
        final e = ofSeq<$T>(xs);
        try {
            var count = 0;
            while (e.moveNext()) {
                count = count + 1;
            }
            return count;
        } finally {
            if (e is types.IDisposable) {
                types.dispose(e);
            }
        }
    }
}

Iterable<$U> map<$T, $U>($U Function($T) mapping, Iterable<$T> xs) => Enumerator_generate<Iterator<$T>, $U>(() => ofSeq<$T>(xs), (Iterator<$T> e) {
    if (e.moveNext()) {
        return types.Some(mapping(e.current));
    } else {
        return null;
    }
}, (Iterator<$T> e_1) {
    types.dispose(e_1);
});

Iterable<$U> mapIndexed<$T, $U>($U Function(int, $T) mapping, Iterable<$T> xs) => Enumerator_generateIndexed<Iterator<$T>, $U>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
    if (e.moveNext()) {
        return types.Some(mapping(i, e.current));
    } else {
        return null;
    }
}, (Iterator<$T> e_1) {
    types.dispose(e_1);
});

Iterable<types.Tuple2<int, $T>> indexed<$T>(Iterable<$T> xs) => mapIndexed<$T, types.Tuple2<int, $T>>((int i, $T x) => types.Tuple2(i, x), xs);

Iterable<$U> map2<$T1, $T2, $U>($U Function($T1, $T2) mapping, Iterable<$T1> xs, Iterable<$T2> ys) => Enumerator_generate<types.Tuple2<Iterator<$T1>, Iterator<$T2>>, $U>(() => types.Tuple2(ofSeq<$T1>(xs), ofSeq<$T2>(ys)), (types.Tuple2<Iterator<$T1>, Iterator<$T2>> tupledArg) {
    final e1 = tupledArg.item1;
    final e2 = tupledArg.item2;
    if (e1.moveNext() && e2.moveNext()) {
        return types.Some(mapping(e1.current, e2.current));
    } else {
        return null;
    }
}, (types.Tuple2<Iterator<$T1>, Iterator<$T2>> tupledArg_1) {
    try {
        types.dispose(tupledArg_1.item1);
    } finally {
        types.dispose(tupledArg_1.item2);
    }
});

Iterable<$U> mapIndexed2<$T1, $T2, $U>($U Function(int, $T1, $T2) mapping, Iterable<$T1> xs, Iterable<$T2> ys) => Enumerator_generateIndexed<types.Tuple2<Iterator<$T1>, Iterator<$T2>>, $U>(() => types.Tuple2(ofSeq<$T1>(xs), ofSeq<$T2>(ys)), (int i, types.Tuple2<Iterator<$T1>, Iterator<$T2>> tupledArg) {
    final e1 = tupledArg.item1;
    final e2 = tupledArg.item2;
    if (e1.moveNext() && e2.moveNext()) {
        return types.Some(mapping(i, e1.current, e2.current));
    } else {
        return null;
    }
}, (types.Tuple2<Iterator<$T1>, Iterator<$T2>> tupledArg_1) {
    try {
        types.dispose(tupledArg_1.item1);
    } finally {
        types.dispose(tupledArg_1.item2);
    }
});

Iterable<$U> map3<$T1, $T2, $T3, $U>($U Function($T1, $T2, $T3) mapping, Iterable<$T1> xs, Iterable<$T2> ys, Iterable<$T3> zs) => Enumerator_generate<types.Tuple3<Iterator<$T1>, Iterator<$T2>, Iterator<$T3>>, $U>(() => types.Tuple3(ofSeq<$T1>(xs), ofSeq<$T2>(ys), ofSeq<$T3>(zs)), (types.Tuple3<Iterator<$T1>, Iterator<$T2>, Iterator<$T3>> tupledArg) {
    final e1 = tupledArg.item1;
    final e2 = tupledArg.item2;
    final e3 = tupledArg.item3;
    if ((e1.moveNext() && e2.moveNext()) && e3.moveNext()) {
        return types.Some(mapping(e1.current, e2.current, e3.current));
    } else {
        return null;
    }
}, (types.Tuple3<Iterator<$T1>, Iterator<$T2>, Iterator<$T3>> tupledArg_1) {
    try {
        types.dispose(tupledArg_1.item1);
    } finally {
        try {
            types.dispose(tupledArg_1.item2);
        } finally {
            types.dispose(tupledArg_1.item3);
        }
    }
});

Iterable<$T> readOnly<$T>(Iterable<$T> xs) => map<$T, $T>(($T x) => x, xs);

class CachedSeq$1<$T> extends Iterable<$T> implements types.IDisposable {
    final Iterable<$T> res;
    final void Function() cleanup;
    CachedSeq$1(this.cleanup, this.res): super();
    @override
    void Dispose() {
        this.cleanup();
    }
    @override
    Iterator<$T> get iterator => this.res.iterator;
}

void CachedSeq$1__Clear<$T>(CachedSeq$1<$T> _) {
    _.cleanup();
}

Iterable<$T> cache<$T>(Iterable<$T> source) {
    final prefix = <$T>[];
    var started = false;
    types.Some<Iterator<$T>>? enumeratorR;
    return CachedSeq$1<$T>(() {
        fsharp_core.Operators_Lock<List<$T>, void>(prefix, () {
            prefix.clear();
            if (enumeratorR != null) {
                types.dispose(types.value(enumeratorR));
            }
            enumeratorR = null;
        });
    }, unfold<int, $T>((int i_1) => fsharp_core.Operators_Lock<List<$T>, types.Some<types.Tuple2<$T, int>>?>(prefix, () {
        if (i_1 < prefix.length) {
            return types.Some(types.Tuple2(prefix[i_1], i_1 + 1));
        } else {
            if (i_1 >= prefix.length) {
                final types.Some<Iterator<$T>>? optEnumerator_1;
                if (!started) {
                    final types.Some<Iterator<$T>>? optEnumerator = types.Some(source.iterator);
                    enumeratorR = optEnumerator;
                    started = true;
                    optEnumerator_1 = optEnumerator;
                } else {
                    optEnumerator_1 = enumeratorR;
                }
                if (optEnumerator_1 == null) {
                } else {
                    final enumerator = types.value(optEnumerator_1);
                    if (enumerator.moveNext()) {
                        prefix.add(enumerator.current);
                    } else {
                        types.dispose(enumerator);
                        enumeratorR = null;
                    }
                }
            }
            if (i_1 < prefix.length) {
                return types.Some(types.Tuple2(prefix[i_1], i_1 + 1));
            } else {
                return null;
            }
        }
    }), 0));
}

Iterable<types.Tuple2<$T1, $T2>> allPairs<$T1, $T2>(Iterable<$T1> xs, Iterable<$T2> ys) {
    final ysCache = cache<$T2>(ys);
    return delay<types.Tuple2<$T1, $T2>>(() => concat<Iterable<types.Tuple2<$T1, $T2>>, types.Tuple2<$T1, $T2>>(map<$T1, Iterable<types.Tuple2<$T1, $T2>>>(($T1 x) => map<$T2, types.Tuple2<$T1, $T2>>(($T2 y) => types.Tuple2(x, y), ysCache), xs)));
}

types.Tuple2<Iterable<$Result>, $State> mapFold<$State, $T, $Result>(types.Tuple2<$Result, $State> Function($State, $T) mapping, $State state, Iterable<$T> xs) {
    final patternInput = array_2.mapFold<$T, $State, $Result>(mapping, state, toArray<$T>(xs));
    return types.Tuple2(readOnly<$Result>(patternInput.item1), patternInput.item2);
}

types.Tuple2<Iterable<$Result>, $State> mapFoldBack<$T, $State, $Result>(types.Tuple2<$Result, $State> Function($T, $State) mapping, Iterable<$T> xs, $State state) {
    final patternInput = array_2.mapFoldBack<$T, $State, $Result>(mapping, toArray<$T>(xs), state);
    return types.Tuple2(readOnly<$Result>(patternInput.item1), patternInput.item2);
}

types.Some<$a>? tryPick<$T, $a>(types.Some<$a>? Function($T) chooser, Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        types.Some<$a>? res;
        while ((res == null) && e.moveNext()) {
            res = chooser(e.current);
        }
        return res;
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

$a pick<$T, $a>(types.Some<$a>? Function($T) chooser, Iterable<$T> xs) {
    final types.Some<$a>? matchValue = tryPick<$T, $a>(chooser, xs);
    if (matchValue == null) {
        return indexNotFound<$a>();
    } else {
        return types.value(matchValue);
    }
}

$T reduce<$T>($T Function($T, $T) folder, Iterable<$T> xs) {
    final e = ofSeq<$T>(xs);
    try {
        $T loop($T acc_mut) {
            loop:
            while (true) {
                final acc = acc_mut;
                if (e.moveNext()) {
                    acc_mut = folder(acc, e.current);
                    continue loop;
                } else {
                    return acc;
                }
            }
        }
        if (e.moveNext()) {
            return loop(e.current);
        } else {
            return throw Exception(global$.SR_inputSequenceEmpty);
        }
    } finally {
        if (e is types.IDisposable) {
            types.dispose(e);
        }
    }
}

$T reduceBack<$T>($T Function($T, $T) folder, Iterable<$T> xs) {
    final arr = toArray<$T>(xs);
    if (arr.isEmpty) {
        throw Exception(global$.SR_inputSequenceEmpty);
    }
    return array_2.reduceBack<$T>(folder, arr);
}

Iterable<$a> replicate<$a>(int n, $a x) => initialize<$a>(n, (int _arg) => x);

Iterable<$T> reverse<$T>(Iterable<$T> xs) => delay<$T>(() => ofArray<$T>(array_2.reverse<$T>(toArray<$T>(xs))));

Iterable<$State> scan<$T, $State>($State Function($State, $T) folder, $State state, Iterable<$T> xs) => delay<$State>(() {
    var acc = state;
    return concat<Iterable<$State>, $State>([singleton<$State>(state), map<$T, $State>(($T x) {
        acc = folder(acc, x);
        return acc;
    }, xs)]);
});

Iterable<$State> scanBack<$T, $State>($State Function($T, $State) folder, Iterable<$T> xs, $State state) => delay<$State>(() => ofArray<$State>(array_2.scanBack<$T, $State>(folder, toArray<$T>(xs), state)));

Iterable<$T> skip<$T>(int count, Iterable<$T> source) => mkSeq<$T>(() {
    final e = ofSeq<$T>(source);
    try {
        for (var _ = 1; _ <= count; _++) {
            if (!(e.moveNext())) {
                throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'source');
            }
        }
        return Enumerator_enumerateThenFinally<$T>(() {
        }, e);
    } catch (matchValue) {
        types.dispose(e);
        rethrow;
    }
});

Iterable<$T> skipWhile<$T>(bool Function($T) predicate, Iterable<$T> xs) => delay<$T>(() {
    var skipped = true;
    return filter<$T>(($T x) {
        if (skipped) {
            skipped = predicate(x);
        }
        return !skipped;
    }, xs);
});

Iterable<$T> tail<$T>(Iterable<$T> xs) => skip<$T>(1, xs);

Iterable<$T> take<$T>(int count, Iterable<$T> xs) => Enumerator_generateIndexed<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
    if (i < count) {
        if (e.moveNext()) {
            return types.Some(e.current);
        } else {
            return throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'source');
        }
    } else {
        return null;
    }
}, (Iterator<$T> e_1) {
    types.dispose(e_1);
});

Iterable<$T> takeWhile<$T>(bool Function($T) predicate, Iterable<$T> xs) => Enumerator_generate<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (Iterator<$T> e) {
    if (e.moveNext() && predicate(e.current)) {
        return types.Some(e.current);
    } else {
        return null;
    }
}, (Iterator<$T> e_1) {
    types.dispose(e_1);
});

Iterable<$T> truncate<$T>(int count, Iterable<$T> xs) => Enumerator_generateIndexed<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
    if ((i < count) && e.moveNext()) {
        return types.Some(e.current);
    } else {
        return null;
    }
}, (Iterator<$T> e_1) {
    types.dispose(e_1);
});

Iterable<types.Tuple2<$T1, $T2>> zip<$T1, $T2>(Iterable<$T1> xs, Iterable<$T2> ys) => map2<$T1, $T2, types.Tuple2<$T1, $T2>>(($T1 x, $T2 y) => types.Tuple2(x, y), xs, ys);

Iterable<types.Tuple3<$T1, $T2, $T3>> zip3<$T1, $T2, $T3>(Iterable<$T1> xs, Iterable<$T2> ys, Iterable<$T3> zs) => map3<$T1, $T2, $T3, types.Tuple3<$T1, $T2, $T3>>(($T1 x, $T2 y, $T3 z) => types.Tuple3(x, y, z), xs, ys, zs);

Iterable<$U> collect<$T, $Collection extends Iterable<$U>, $U>($Collection Function($T) mapping, Iterable<$T> xs) => delay<$U>(() => concat<$Collection, $U>(map<$T, $Collection>(mapping, xs)));

Iterable<$T> where<$T>(bool Function($T) predicate, Iterable<$T> xs) => filter<$T>(predicate, xs);

Iterable<types.Tuple2<$T, $T>> pairwise<$T>(Iterable<$T> xs) => delay<types.Tuple2<$T, $T>>(() => ofArray<types.Tuple2<$T, $T>>(array_2.pairwise<$T>(toArray<$T>(xs))));

Iterable<List<$T>> splitInto<$T>(int chunks, Iterable<$T> xs) => delay<List<$T>>(() => ofArray<List<$T>>(array_2.splitInto<$T>(chunks, toArray<$T>(xs))));

Iterable<List<$T>> windowed<$T>(int windowSize, Iterable<$T> xs) => delay<List<$T>>(() => ofArray<List<$T>>(array_2.windowed<$T>(windowSize, toArray<$T>(xs))));

Iterable<Iterable<$T>> transpose<$$a extends Iterable<$T>, $T>(Iterable<$$a> xss) => delay<Iterable<$T>>(() => ofArray<Iterable<$T>>(array_2.map<List<$T>, Iterable<$T>>((List<$T> arr) => ofArray<$T>(arr), array_2.transpose<$T>(array_2.map<$$a, List<$T>>(($$a xs_1) => toArray<$T>(xs_1), toArray<$$a>(xss))))));

Iterable<$T> sortWith<$T>(int Function($T, $T) comparer, Iterable<$T> xs) => delay<$T>(() {
    final arr = toArray<$T>(xs);
    array_2.sortInPlaceWith<$T>(comparer, arr);
    return ofArray<$T>(arr);
});

Iterable<$T> sort<$T>(Iterable<$T> xs, types.IComparer<$T> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(x, y), xs);

Iterable<$T> sortBy<$T, $U>($U Function($T) projection, Iterable<$T> xs, types.IComparer<$U> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(projection(x), projection(y)), xs);

Iterable<$T> sortDescending<$T>(Iterable<$T> xs, types.IComparer<$T> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(x, y) * (-1), xs);

Iterable<$T> sortByDescending<$T, $U>($U Function($T) projection, Iterable<$T> xs, types.IComparer<$U> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(projection(x), projection(y)) * (-1), xs);

$T sum<$T>(Iterable<$T> xs, types.IGenericAdder<$T> adder) => fold<$T, $T>(($T acc, $T x) => adder.Add(acc, x), adder.GetZero(), xs);

$U sumBy<$T, $U>($U Function($T) f, Iterable<$T> xs, types.IGenericAdder<$U> adder) => fold<$T, $U>(($U acc, $T x) => adder.Add(acc, f(x)), adder.GetZero(), xs);

$T maxBy<$T, $U>($U Function($T) projection, Iterable<$T> xs, types.IComparer<$U> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(projection(y), projection(x)) > 0) {
        return y;
    } else {
        return x;
    }
}, xs);

$T max<$T>(Iterable<$T> xs, types.IComparer<$T> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(y, x) > 0) {
        return y;
    } else {
        return x;
    }
}, xs);

$T minBy<$T, $U>($U Function($T) projection, Iterable<$T> xs, types.IComparer<$U> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(projection(y), projection(x)) > 0) {
        return x;
    } else {
        return y;
    }
}, xs);

$T min<$T>(Iterable<$T> xs, types.IComparer<$T> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(y, x) > 0) {
        return x;
    } else {
        return y;
    }
}, xs);

$T average<$T>(Iterable<$T> xs, types.IGenericAverager<$T> averager) {
    var count = 0;
    final total = fold<$T, $T>(($T acc, $T x) {
        count = count + 1;
        return averager.Add(acc, x);
    }, averager.GetZero(), xs);
    if (count == 0) {
        return throw Exception((global$.SR_inputSequenceEmpty + '\\nParameter name: ') + 'source');
    } else {
        return averager.DivideByInt(total, count);
    }
}

$U averageBy<$T, $U>($U Function($T) f, Iterable<$T> xs, types.IGenericAverager<$U> averager) {
    var count = 0;
    final total = fold<$T, $U>(($U acc, $T x) {
        count = count + 1;
        return averager.Add(acc, f(x));
    }, averager.GetZero(), xs);
    if (count == 0) {
        return throw Exception((global$.SR_inputSequenceEmpty + '\\nParameter name: ') + 'source');
    } else {
        return averager.DivideByInt(total, count);
    }
}

Iterable<$T> permute<$T>(int Function(int) f, Iterable<$T> xs) => delay<$T>(() => ofArray<$T>(array_2.permute<$T>(f, toArray<$T>(xs))));

Iterable<List<$T>> chunkBySize<$T>(int chunkSize, Iterable<$T> xs) => delay<List<$T>>(() => ofArray<List<$T>>(array_2.chunkBySize<$T>(chunkSize, toArray<$T>(xs))));

Iterable<$T> insertAt<$T>(int index, $T y, Iterable<$T> xs) {
    var isDone = false;
    if (index < 0) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return Enumerator_generateIndexed<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
        if ((isDone || (i < index)) && e.moveNext()) {
            return types.Some(e.current);
        } else if (i == index) {
            isDone = true;
            return types.Some(y);
        } else {
            if (!isDone) {
                throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
            }
            return null;
        }
    }, (Iterator<$T> e_1) {
        types.dispose(e_1);
    });
}

Iterable<$T> insertManyAt<$T>(int index, Iterable<$T> ys, Iterable<$T> xs) {
    var status = -1;
    if (index < 0) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return Enumerator_generateIndexed<types.Tuple2<Iterator<$T>, Iterator<$T>>, $T>(() => types.Tuple2(ofSeq<$T>(xs), ofSeq<$T>(ys)), (int i, types.Tuple2<Iterator<$T>, Iterator<$T>> tupledArg) {
        final e1 = tupledArg.item1;
        final e2 = tupledArg.item2;
        if (i == index) {
            status = 0;
        }
        final types.Some<$T>? inserted;
        if (status == 0) {
            if (e2.moveNext()) {
                inserted = types.Some(e2.current);
            } else {
                status = 1;
                inserted = null;
            }
        } else {
            inserted = null;
        }
        if (inserted == null) {
            if (e1.moveNext()) {
                return types.Some(e1.current);
            } else {
                if (status < 1) {
                    throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
                }
                return null;
            }
        } else {
            return types.Some(types.value(inserted));
        }
    }, (types.Tuple2<Iterator<$T>, Iterator<$T>> tupledArg_1) {
        types.dispose(tupledArg_1.item1);
        types.dispose(tupledArg_1.item2);
    });
}

Iterable<$T> removeAt<$T>(int index, Iterable<$T> xs) {
    var isDone = false;
    if (index < 0) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return Enumerator_generateIndexed<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
        if ((isDone || (i < index)) && e.moveNext()) {
            return types.Some(e.current);
        } else if ((i == index) && e.moveNext()) {
            isDone = true;
            if (e.moveNext()) {
                return types.Some(e.current);
            } else {
                return null;
            }
        } else {
            if (!isDone) {
                throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
            }
            return null;
        }
    }, (Iterator<$T> e_1) {
        types.dispose(e_1);
    });
}

Iterable<$T> removeManyAt<$T>(int index, int count, Iterable<$T> xs) {
    if (index < 0) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return Enumerator_generateIndexed<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
        if (i < index) {
            if (e.moveNext()) {
                return types.Some(e.current);
            } else {
                return throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
            }
        } else {
            if (i == index) {
                for (var _ = 1; _ <= count; _++) {
                    if (!(e.moveNext())) {
                        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'count');
                    }
                }
            }
            if (e.moveNext()) {
                return types.Some(e.current);
            } else {
                return null;
            }
        }
    }, (Iterator<$T> e_1) {
        types.dispose(e_1);
    });
}

Iterable<$T> updateAt<$T>(int index, $T y, Iterable<$T> xs) {
    var isDone = false;
    if (index < 0) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return Enumerator_generateIndexed<Iterator<$T>, $T>(() => ofSeq<$T>(xs), (int i, Iterator<$T> e) {
        if ((isDone || (i < index)) && e.moveNext()) {
            return types.Some(e.current);
        } else if ((i == index) && e.moveNext()) {
            isDone = true;
            return types.Some(y);
        } else {
            if (!isDone) {
                throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
            }
            return null;
        }
    }, (Iterator<$T> e_1) {
        types.dispose(e_1);
    });
}

