// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Array.dart' as array_2;
import './Option.dart' as option_1;
import './Types.dart' as types;
import './Util.dart' as util;
import './Global.dart' as global$;

class EmptyList$1<$T> extends FSharpList<$T> {
    EmptyList$1(): super(null);
}

class ConsList$1<$T> extends FSharpList<$T> {
    final $T head;
    ConsList$1(this.head, FSharpList<$T> tail_1): super(types.Some(tail_1));
}

abstract class FSharpList<$T> extends Iterable<$T> implements Comparable<FSharpList<$T>> {
    types.Some<FSharpList<$T>>? tail;
    FSharpList(this.tail): super();
    @override
    String toString() => ('[' + this.join('; ')) + ']';
    @override
    bool operator ==(dynamic other) {
        if (identical(this, other)) {
            return true;
        } else {
            bool loop(FSharpList<$T> xs_1_mut, FSharpList<$T> ys_1_mut) {
                loop:
                while (true) {
                    final xs_1 = xs_1_mut;
                    final ys_1 = ys_1_mut;
                    final types.Some<FSharpList<$T>>? matchValue = FSharpList__get_TryTail<$T>(xs_1);
                    final types.Some<FSharpList<$T>>? matchValue_1 = FSharpList__get_TryTail<$T>(ys_1);
                    if (matchValue != null) {
                        if (matchValue_1 != null) {
                            if (util.equalsDynamic(FSharpList__get_Head<$T>(xs_1), FSharpList__get_Head<$T>(ys_1))) {
                                xs_1_mut = types.value(matchValue);
                                ys_1_mut = types.value(matchValue_1);
                                continue loop;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else if (matchValue_1 != null) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            return loop(this, other as FSharpList<$T>);
        }
    }
    @override
    int get hashCode {
        int loop(int i_mut, int h_mut, FSharpList<$T> xs_1_mut) {
            loop:
            while (true) {
                final i = i_mut;
                final h = h_mut;
                final xs_1 = xs_1_mut;
                final types.Some<FSharpList<$T>>? matchValue = FSharpList__get_TryTail<$T>(xs_1);
                if (matchValue != null) {
                    if (i > 18) {
                        return h;
                    } else {
                        i_mut = i + 1;
                        h_mut = ((h << 1) + FSharpList__get_Head<$T>(xs_1).hashCode) + (631 * i);
                        xs_1_mut = types.value(matchValue);
                        continue loop;
                    }
                } else {
                    return h;
                }
            }
        }
        return loop(0, 0, this);
    }
    @override
    int compareTo(FSharpList<$T> ys) {
        int loop(FSharpList<$T> xs_1_mut, FSharpList<$T> ys_1_mut) {
            loop:
            while (true) {
                final xs_1 = xs_1_mut;
                final ys_1 = ys_1_mut;
                final types.Some<FSharpList<$T>>? matchValue = FSharpList__get_TryTail<$T>(xs_1);
                final types.Some<FSharpList<$T>>? matchValue_1 = FSharpList__get_TryTail<$T>(ys_1);
                if (matchValue != null) {
                    if (matchValue_1 != null) {
                        final c = util.compareDynamic(FSharpList__get_Head<$T>(xs_1), FSharpList__get_Head<$T>(ys_1));
                        if (c == 0) {
                            xs_1_mut = types.value(matchValue);
                            ys_1_mut = types.value(matchValue_1);
                            continue loop;
                        } else {
                            return c;
                        }
                    } else {
                        return 1;
                    }
                } else if (matchValue_1 != null) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
        return loop(this, ys);
    }
    @override
    Iterator<$T> get iterator => ListEnumerator$1<$T>(this);
}

class ListEnumerator$1<$T> implements types.IDisposable, Iterator<$T> {
    final FSharpList<$T> xs;
    late FSharpList<$T> it;
    late $T current_;
    ListEnumerator$1(this.xs) {
        this.it = this.xs;
    }

    @override
    $T get current => this.current_;
    @override
    bool moveNext() {
        final types.Some<FSharpList<$T>>? matchValue = FSharpList__get_TryTail<$T>(this.it);
        if (matchValue != null) {
            this.current_ = FSharpList__get_Head<$T>(this.it);
            this.it = types.value(matchValue);
            return true;
        } else {
            return false;
        }
    }
    @override
    void Dispose() {
    }
}

$T ConsList$1__GetHead<$T>(ConsList$1<$T> _) => _.head;

FSharpList<$T> FSharpList_get_Empty<$T>() => EmptyList$1<$T>();

FSharpList<$T> FSharpList_Cons_305B8EAC<$T>($T x, FSharpList<$T> xs) => ConsList$1<$T>(x, xs);

void FSharpList__SetConsTail_3002E699<$T>(FSharpList<$T> _, FSharpList<$T> t) {
    _.tail = types.Some(t);
}

FSharpList<$T> FSharpList__AppendConsNoTail_2B595<$T>(FSharpList<$T> xs, $T x) {
    final t = ConsList$1<$T>(x, EmptyList$1<$T>());
    FSharpList__SetConsTail_3002E699<$T>(xs, t);
    return t;
}

bool FSharpList__get_IsEmpty<$T>(FSharpList<$T> this$) => this$ is EmptyList$1<$T>;

$T FSharpList__get_Head<$T>(FSharpList<$T> this$) {
    if (this$ is ConsList$1<$T>) {
        final this$_1 = this$;
        return ConsList$1__GetHead<$T>(this$_1);
    } else {
        return throw Exception('Empty list');
    }
}

types.Some<$T>? FSharpList__get_TryHead<$T>(FSharpList<$T> this$) {
    if (this$ is ConsList$1<$T>) {
        final this$_1 = this$;
        return types.Some(ConsList$1__GetHead<$T>(this$_1));
    } else {
        return null;
    }
}

FSharpList<$T> FSharpList__get_Tail<$T>(FSharpList<$T> _) => types.value(_.tail);

types.Some<FSharpList<$T>>? FSharpList__get_TryTail<$T>(FSharpList<$T> _) => _.tail;

int FSharpList__get_Length<$T>(FSharpList<$T> xs) {
    int loop(int i_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final xs_1 = xs_1_mut;
            final types.Some<FSharpList<$T>>? matchValue = FSharpList__get_TryTail<$T>(xs_1);
            if (matchValue != null) {
                i_mut = i + 1;
                xs_1_mut = types.value(matchValue);
                continue loop;
            } else {
                return i;
            }
        }
    }
    return loop(0, xs);
}

$T FSharpList__get_Item_Z524259A4<$T>(FSharpList<$T> xs, int index) {
    $T loop(int i_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final xs_1 = xs_1_mut;
            final types.Some<FSharpList<$T>>? matchValue = FSharpList__get_TryTail<$T>(xs_1);
            if (matchValue != null) {
                if (i == index) {
                    return FSharpList__get_Head<$T>(xs_1);
                } else {
                    i_mut = i + 1;
                    xs_1_mut = types.value(matchValue);
                    continue loop;
                }
            } else {
                return throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
            }
        }
    }
    return loop(0, xs);
}

FSharpList<$$a> empty<$$a>() => FSharpList_get_Empty<$$a>();

FSharpList<$T> cons<$T>($T x, FSharpList<$T> xs) => FSharpList_Cons_305B8EAC<$T>(x, xs);

FSharpList<$$a> singleton<$$a>($$a x) => FSharpList_Cons_305B8EAC<$$a>(x, FSharpList_get_Empty<$$a>());

bool isEmpty<$T>(FSharpList<$T> xs) => FSharpList__get_IsEmpty<$T>(xs);

int length<$T>(FSharpList<$T> xs) => FSharpList__get_Length<$T>(xs);

$T head<$T>(FSharpList<$T> xs) => FSharpList__get_Head<$T>(xs);

types.Some<$T>? tryHead<$T>(FSharpList<$T> xs) {
    if (FSharpList__get_IsEmpty<$T>(xs)) {
        return null;
    } else {
        return types.Some(FSharpList__get_Head<$T>(xs));
    }
}

FSharpList<$T> tail<$T>(FSharpList<$T> xs) => FSharpList__get_Tail<$T>(xs);

types.Some<$T>? tryLast<$T>(FSharpList<$T> xs_mut) {
    tryLast:
    while (true) {
        final xs = xs_mut;
        if (FSharpList__get_IsEmpty<$T>(xs)) {
            return null;
        } else {
            final t = FSharpList__get_Tail<$T>(xs);
            if (FSharpList__get_IsEmpty<$T>(t)) {
                return types.Some(FSharpList__get_Head<$T>(xs));
            } else {
                xs_mut = t;
                continue tryLast;
            }
        }
    }
}

$T last<$T>(FSharpList<$T> xs) {
    final types.Some<$T>? matchValue = tryLast<$T>(xs);
    if (matchValue == null) {
        return throw Exception(global$.SR_inputWasEmpty);
    } else {
        return types.value(matchValue);
    }
}

int compareWith<$T>(int Function($T, $T) comparer, FSharpList<$T> xs, FSharpList<$T> ys) {
    int loop(FSharpList<$T> xs_1_mut, FSharpList<$T> ys_1_mut) {
        loop:
        while (true) {
            final xs_1 = xs_1_mut;
            final ys_1 = ys_1_mut;
            final matchValue = FSharpList__get_IsEmpty<$T>(xs_1);
            final matchValue_1 = FSharpList__get_IsEmpty<$T>(ys_1);
            if (matchValue) {
                if (matchValue_1) {
                    return 0;
                } else {
                    return -1;
                }
            } else if (matchValue_1) {
                return 1;
            } else {
                final c = comparer(FSharpList__get_Head<$T>(xs_1), FSharpList__get_Head<$T>(ys_1));
                if (c == 0) {
                    xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                    ys_1_mut = FSharpList__get_Tail<$T>(ys_1);
                    continue loop;
                } else {
                    return c;
                }
            }
        }
    }
    return loop(xs, ys);
}

List<$T> toArray<$T>(FSharpList<$T> xs) {
    final len = FSharpList__get_Length<$T>(xs);
    final e = ListEnumerator$1<$T>(xs);
    return List.generate(len, ((int _arg) {
        e.moveNext();
        return e.current;
    }), growable: false);
}

$State fold<$T, $State>($State Function($State, $T) folder, $State state, FSharpList<$T> xs) {
    var acc = state;
    var li = xs;
    while (!(FSharpList__get_IsEmpty<$T>(li))) {
        acc = folder(acc, FSharpList__get_Head<$T>(li));
        li = FSharpList__get_Tail<$T>(li);
    }
    return acc;
}

FSharpList<$T> reverse<$T>(FSharpList<$T> xs) => fold<$T, FSharpList<$T>>((FSharpList<$T> acc, $T x) => FSharpList_Cons_305B8EAC<$T>(x, acc), FSharpList_get_Empty<$T>(), xs);

$State foldBack<$T, $State>($State Function($T, $State) folder, FSharpList<$T> xs, $State state) => array_2.foldBack<$T, $State>(folder, toArray<$T>(xs), state);

$State foldIndexed<$T, $State>($State Function(int, $State, $T) folder, $State state, FSharpList<$T> xs) {
    $State loop(int i_mut, $State acc_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final acc = acc_mut;
            final xs_1 = xs_1_mut;
            if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return acc;
            } else {
                i_mut = i + 1;
                acc_mut = folder(i, acc, FSharpList__get_Head<$T>(xs_1));
                xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                continue loop;
            }
        }
    }
    return loop(0, state, xs);
}

$State fold2<$T1, $T2, $State>($State Function($State, $T1, $T2) folder, $State state, FSharpList<$T1> xs, FSharpList<$T2> ys) {
    var acc = state;
    var xs_1 = xs;
    var ys_1 = ys;
    while (!(FSharpList__get_IsEmpty<$T1>(xs_1)) && !(FSharpList__get_IsEmpty<$T2>(ys_1))) {
        acc = folder(acc, FSharpList__get_Head<$T1>(xs_1), FSharpList__get_Head<$T2>(ys_1));
        xs_1 = FSharpList__get_Tail<$T1>(xs_1);
        ys_1 = FSharpList__get_Tail<$T2>(ys_1);
    }
    return acc;
}

$State foldBack2<$T1, $T2, $State>($State Function($T1, $T2, $State) folder, FSharpList<$T1> xs, FSharpList<$T2> ys, $State state) => array_2.foldBack2<$T1, $T2, $State>(folder, toArray<$T1>(xs), toArray<$T2>(ys), state);

FSharpList<$T> unfold<$T, $State>(types.Some<types.Tuple2<$T, $State>>? Function($State) gen, $State state) {
    FSharpList<$T> loop($State acc_mut, FSharpList<$T> node_mut) {
        loop:
        while (true) {
            final acc = acc_mut;
            final node = node_mut;
            final types.Some<types.Tuple2<$T, $State>>? matchValue = gen(acc);
            if (matchValue != null) {
                acc_mut = types.value(matchValue).item2;
                node_mut = FSharpList__AppendConsNoTail_2B595<$T>(node, types.value(matchValue).item1);
                continue loop;
            } else {
                return node;
            }
        }
    }
    final root = FSharpList_get_Empty<$T>();
    FSharpList__SetConsTail_3002E699<$T>(loop(state, root), FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

void iterate<$$a>(void Function($$a) action, FSharpList<$$a> xs) {
    fold<$$a, void>((void unitVar, $$a x) {
        action(x);
    }, util.ignore(), xs);
}

void iterate2<$$a, $$b>(void Function($$a, $$b) action, FSharpList<$$a> xs, FSharpList<$$b> ys) {
    fold2<$$a, $$b, void>((void unitVar, $$a x, $$b y) {
        action(x, y);
    }, util.ignore(), xs, ys);
}

void iterateIndexed<$$a>(void Function(int, $$a) action, FSharpList<$$a> xs) {
    fold<$$a, int>((int i, $$a x) {
        action(i, x);
        return i + 1;
    }, 0, xs);
}

void iterateIndexed2<$$a, $$b>(void Function(int, $$a, $$b) action, FSharpList<$$a> xs, FSharpList<$$b> ys) {
    fold2<$$a, $$b, int>((int i, $$a x, $$b y) {
        action(i, x, y);
        return i + 1;
    }, 0, xs, ys);
}

Iterable<$T> toSeq<$T>(FSharpList<$T> xs) => xs;

FSharpList<$T> ofArrayWithTail<$T>(List<$T> xs, FSharpList<$T> tail_1) {
    var res = tail_1;
    for (var i = xs.length - 1; i >= 0; i--) {
        res = FSharpList_Cons_305B8EAC<$T>(xs[i], res);
    }
    return res;
}

FSharpList<$T> ofArray<$T>(List<$T> xs) => ofArrayWithTail<$T>(xs, FSharpList_get_Empty<$T>());

FSharpList<$T> ofSeq<$T>(Iterable<$T> xs) {
    if (xs is List<$T>) {
        return ofArray<$T>(xs);
    } else if (xs is FSharpList<$T>) {
        return xs;
    } else {
        final root = FSharpList_get_Empty<$T>();
        var node = root;
        final enumerator = xs.iterator;
        try {
            while (enumerator.moveNext()) {
                final x = enumerator.current;
                node = FSharpList__AppendConsNoTail_2B595<$T>(node, x);
            }
        } finally {
            if (enumerator is types.IDisposable) {
                types.dispose(enumerator);
            }
        }
        FSharpList__SetConsTail_3002E699<$T>(node, FSharpList_get_Empty<$T>());
        return FSharpList__get_Tail<$T>(root);
    }
}

FSharpList<$T> concat<$T>(Iterable<FSharpList<$T>> lists) {
    final root = FSharpList_get_Empty<$T>();
    var node = root;
    void action(FSharpList<$T> xs) {
        node = fold<$T, FSharpList<$T>>((FSharpList<$T> acc, $T x) => FSharpList__AppendConsNoTail_2B595<$T>(acc, x), node, xs);
    }
    if (lists is List<FSharpList<$T>>) {
        array_2.iterate<FSharpList<$T>>(action, lists);
    } else if (lists is FSharpList<FSharpList<$T>>) {
        iterate<FSharpList<$T>>(action, lists);
    } else {
        final enumerator = lists.iterator;
        try {
            while (enumerator.moveNext()) {
                action(enumerator.current);
            }
        } finally {
            if (enumerator is types.IDisposable) {
                types.dispose(enumerator);
            }
        }
    }
    FSharpList__SetConsTail_3002E699<$T>(node, FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

FSharpList<$State> scan<$T, $State>($State Function($State, $T) folder, $State state, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$State>();
    var node = FSharpList__AppendConsNoTail_2B595<$State>(root, state);
    var acc = state;
    var xs_1 = xs;
    while (!(FSharpList__get_IsEmpty<$T>(xs_1))) {
        acc = folder(acc, FSharpList__get_Head<$T>(xs_1));
        node = FSharpList__AppendConsNoTail_2B595<$State>(node, acc);
        xs_1 = FSharpList__get_Tail<$T>(xs_1);
    }
    FSharpList__SetConsTail_3002E699<$State>(node, FSharpList_get_Empty<$State>());
    return FSharpList__get_Tail<$State>(root);
}

FSharpList<$State> scanBack<$T, $State>($State Function($T, $State) folder, FSharpList<$T> xs, $State state) => ofArray<$State>(array_2.scanBack<$T, $State>(folder, toArray<$T>(xs), state));

FSharpList<$T> append<$T>(FSharpList<$T> xs, FSharpList<$T> ys) => fold<$T, FSharpList<$T>>((FSharpList<$T> acc, $T x) => FSharpList_Cons_305B8EAC<$T>(x, acc), ys, reverse<$T>(xs));

FSharpList<$U> collect<$T, $U>(FSharpList<$U> Function($T) mapping, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$U>();
    var node = root;
    var ys = xs;
    while (!(FSharpList__get_IsEmpty<$T>(ys))) {
        var zs = mapping(FSharpList__get_Head<$T>(ys));
        while (!(FSharpList__get_IsEmpty<$U>(zs))) {
            node = FSharpList__AppendConsNoTail_2B595<$U>(node, FSharpList__get_Head<$U>(zs));
            zs = FSharpList__get_Tail<$U>(zs);
        }
        ys = FSharpList__get_Tail<$T>(ys);
    }
    FSharpList__SetConsTail_3002E699<$U>(node, FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

FSharpList<$U> mapIndexed<$T, $U>($U Function(int, $T) mapping, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$U>();
    FSharpList__SetConsTail_3002E699<$U>(foldIndexed<$T, FSharpList<$U>>((int i, FSharpList<$U> acc, $T x) => FSharpList__AppendConsNoTail_2B595<$U>(acc, mapping(i, x)), root, xs), FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

FSharpList<$U> map<$T, $U>($U Function($T) mapping, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$U>();
    FSharpList__SetConsTail_3002E699<$U>(fold<$T, FSharpList<$U>>((FSharpList<$U> acc, $T x) => FSharpList__AppendConsNoTail_2B595<$U>(acc, mapping(x)), root, xs), FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

FSharpList<types.Tuple2<int, $$a>> indexed<$$a>(FSharpList<$$a> xs) => mapIndexed<$$a, types.Tuple2<int, $$a>>((int i, $$a x) => types.Tuple2(i, x), xs);

FSharpList<$U> map2<$T1, $T2, $U>($U Function($T1, $T2) mapping, FSharpList<$T1> xs, FSharpList<$T2> ys) {
    final root = FSharpList_get_Empty<$U>();
    FSharpList__SetConsTail_3002E699<$U>(fold2<$T1, $T2, FSharpList<$U>>((FSharpList<$U> acc, $T1 x, $T2 y) => FSharpList__AppendConsNoTail_2B595<$U>(acc, mapping(x, y)), root, xs, ys), FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

FSharpList<$U> mapIndexed2<$T1, $T2, $U>($U Function(int, $T1, $T2) mapping, FSharpList<$T1> xs, FSharpList<$T2> ys) {
    FSharpList<$U> loop(int i_mut, FSharpList<$U> acc_mut, FSharpList<$T1> xs_1_mut, FSharpList<$T2> ys_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final acc = acc_mut;
            final xs_1 = xs_1_mut;
            final ys_1 = ys_1_mut;
            if (FSharpList__get_IsEmpty<$T1>(xs_1) || FSharpList__get_IsEmpty<$T2>(ys_1)) {
                return acc;
            } else {
                i_mut = i + 1;
                acc_mut = FSharpList__AppendConsNoTail_2B595<$U>(acc, mapping(i, FSharpList__get_Head<$T1>(xs_1), FSharpList__get_Head<$T2>(ys_1)));
                xs_1_mut = FSharpList__get_Tail<$T1>(xs_1);
                ys_1_mut = FSharpList__get_Tail<$T2>(ys_1);
                continue loop;
            }
        }
    }
    final root = FSharpList_get_Empty<$U>();
    FSharpList__SetConsTail_3002E699<$U>(loop(0, root, xs, ys), FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

FSharpList<$U> map3<$T1, $T2, $T3, $U>($U Function($T1, $T2, $T3) mapping, FSharpList<$T1> xs, FSharpList<$T2> ys, FSharpList<$T3> zs) {
    FSharpList<$U> loop(FSharpList<$U> acc_mut, FSharpList<$T1> xs_1_mut, FSharpList<$T2> ys_1_mut, FSharpList<$T3> zs_1_mut) {
        loop:
        while (true) {
            final acc = acc_mut;
            final xs_1 = xs_1_mut;
            final ys_1 = ys_1_mut;
            final zs_1 = zs_1_mut;
            if ((FSharpList__get_IsEmpty<$T1>(xs_1) || FSharpList__get_IsEmpty<$T2>(ys_1)) || FSharpList__get_IsEmpty<$T3>(zs_1)) {
                return acc;
            } else {
                acc_mut = FSharpList__AppendConsNoTail_2B595<$U>(acc, mapping(FSharpList__get_Head<$T1>(xs_1), FSharpList__get_Head<$T2>(ys_1), FSharpList__get_Head<$T3>(zs_1)));
                xs_1_mut = FSharpList__get_Tail<$T1>(xs_1);
                ys_1_mut = FSharpList__get_Tail<$T2>(ys_1);
                zs_1_mut = FSharpList__get_Tail<$T3>(zs_1);
                continue loop;
            }
        }
    }
    final root = FSharpList_get_Empty<$U>();
    FSharpList__SetConsTail_3002E699<$U>(loop(root, xs, ys, zs), FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

types.Tuple2<FSharpList<$Result>, $State> mapFold<$T, $State, $Result>(types.Tuple2<$Result, $State> Function($State, $T) mapping, $State state, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$Result>();
    final patternInput_1 = fold<$T, types.Tuple2<FSharpList<$Result>, $State>>((types.Tuple2<FSharpList<$Result>, $State> tupledArg, $T x) {
        final patternInput = mapping(tupledArg.item2, x);
        return types.Tuple2(FSharpList__AppendConsNoTail_2B595<$Result>(tupledArg.item1, patternInput.item1), patternInput.item2);
    }, types.Tuple2(root, state), xs);
    FSharpList__SetConsTail_3002E699<$Result>(patternInput_1.item1, FSharpList_get_Empty<$Result>());
    return types.Tuple2(FSharpList__get_Tail<$Result>(root), patternInput_1.item2);
}

types.Tuple2<FSharpList<$Result>, $State> mapFoldBack<$T, $State, $Result>(types.Tuple2<$Result, $State> Function($T, $State) mapping, FSharpList<$T> xs, $State state) => mapFold<$T, $State, $Result>(($State acc, $T x) => mapping(x, acc), state, reverse<$T>(xs));

types.Some<$$a>? tryPick<$T, $$a>(types.Some<$$a>? Function($T) f, FSharpList<$T> xs) {
    types.Some<$$a>? loop(FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final xs_1 = xs_1_mut;
            if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return null;
            } else {
                final types.Some<$$a>? matchValue = f(FSharpList__get_Head<$T>(xs_1));
                if (matchValue == null) {
                    xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                    continue loop;
                } else {
                    return matchValue;
                }
            }
        }
    }
    return loop(xs);
}

$$b pick<$$a, $$b>(types.Some<$$b>? Function($$a) f, FSharpList<$$a> xs) {
    final types.Some<$$b>? matchValue = tryPick<$$a, $$b>(f, xs);
    if (matchValue == null) {
        return throw Exception(global$.SR_keyNotFoundAlt);
    } else {
        return types.value(matchValue);
    }
}

types.Some<$$a>? tryFind<$$a>(bool Function($$a) f, FSharpList<$$a> xs) => tryPick<$$a, $$a>(($$a x) {
    if (f(x)) {
        return types.Some(x);
    } else {
        return null;
    }
}, xs);

$$a find<$$a>(bool Function($$a) f, FSharpList<$$a> xs) {
    final types.Some<$$a>? matchValue = tryFind<$$a>(f, xs);
    if (matchValue == null) {
        return throw Exception(global$.SR_keyNotFoundAlt);
    } else {
        return types.value(matchValue);
    }
}

types.Some<$$a>? tryFindBack<$$a>(bool Function($$a) f, FSharpList<$$a> xs) => array_2.tryFindBack<$$a>(f, toArray<$$a>(xs));

$$a findBack<$$a>(bool Function($$a) f, FSharpList<$$a> xs) {
    final types.Some<$$a>? matchValue = tryFindBack<$$a>(f, xs);
    if (matchValue == null) {
        return throw Exception(global$.SR_keyNotFoundAlt);
    } else {
        return types.value(matchValue);
    }
}

types.Some<int>? tryFindIndex<$T>(bool Function($T) f, FSharpList<$T> xs) {
    types.Some<int>? loop(int i_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final xs_1 = xs_1_mut;
            if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return null;
            } else if (f(FSharpList__get_Head<$T>(xs_1))) {
                return types.Some(i);
            } else {
                i_mut = i + 1;
                xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                continue loop;
            }
        }
    }
    return loop(0, xs);
}

int findIndex<$$a>(bool Function($$a) f, FSharpList<$$a> xs) {
    final types.Some<int>? matchValue = tryFindIndex<$$a>(f, xs);
    if (matchValue == null) {
        return throw Exception(global$.SR_keyNotFoundAlt);
    } else {
        return types.value(matchValue);
    }
}

types.Some<int>? tryFindIndexBack<$$a>(bool Function($$a) f, FSharpList<$$a> xs) => array_2.tryFindIndexBack<$$a>(f, toArray<$$a>(xs));

int findIndexBack<$$a>(bool Function($$a) f, FSharpList<$$a> xs) {
    final types.Some<int>? matchValue = tryFindIndexBack<$$a>(f, xs);
    if (matchValue == null) {
        return throw Exception(global$.SR_keyNotFoundAlt);
    } else {
        return types.value(matchValue);
    }
}

types.Some<$T>? tryItem<$T>(int n, FSharpList<$T> xs) {
    types.Some<$T>? loop(int i_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final xs_1 = xs_1_mut;
            if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return null;
            } else if (i == n) {
                return types.Some(FSharpList__get_Head<$T>(xs_1));
            } else {
                i_mut = i + 1;
                xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                continue loop;
            }
        }
    }
    return loop(0, xs);
}

$T item<$T>(int n, FSharpList<$T> xs) => FSharpList__get_Item_Z524259A4<$T>(xs, n);

FSharpList<$T> filter<$T>(bool Function($T) f, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$T>();
    FSharpList__SetConsTail_3002E699<$T>(fold<$T, FSharpList<$T>>((FSharpList<$T> acc, $T x) {
        if (f(x)) {
            return FSharpList__AppendConsNoTail_2B595<$T>(acc, x);
        } else {
            return acc;
        }
    }, root, xs), FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

types.Tuple2<FSharpList<$T>, FSharpList<$T>> partition<$T>(bool Function($T) f, FSharpList<$T> xs) {
    final matchValue = FSharpList_get_Empty<$T>();
    final root2 = FSharpList_get_Empty<$T>();
    final root1 = matchValue;
    final patternInput_1 = fold<$T, types.Tuple2<FSharpList<$T>, FSharpList<$T>>>((types.Tuple2<FSharpList<$T>, FSharpList<$T>> tupledArg, $T x) {
        final lacc = tupledArg.item1;
        final racc = tupledArg.item2;
        if (f(x)) {
            return types.Tuple2(FSharpList__AppendConsNoTail_2B595<$T>(lacc, x), racc);
        } else {
            return types.Tuple2(lacc, FSharpList__AppendConsNoTail_2B595<$T>(racc, x));
        }
    }, types.Tuple2(root1, root2), xs);
    FSharpList__SetConsTail_3002E699<$T>(patternInput_1.item1, FSharpList_get_Empty<$T>());
    FSharpList__SetConsTail_3002E699<$T>(patternInput_1.item2, FSharpList_get_Empty<$T>());
    return types.Tuple2(FSharpList__get_Tail<$T>(root1), FSharpList__get_Tail<$T>(root2));
}

FSharpList<$U> choose<$T, $U>(types.Some<$U>? Function($T) f, FSharpList<$T> xs) {
    final root = FSharpList_get_Empty<$U>();
    FSharpList__SetConsTail_3002E699<$U>(fold<$T, FSharpList<$U>>((FSharpList<$U> acc, $T x) {
        final types.Some<$U>? matchValue = f(x);
        if (matchValue == null) {
            return acc;
        } else {
            return FSharpList__AppendConsNoTail_2B595<$U>(acc, types.value(matchValue));
        }
    }, root, xs), FSharpList_get_Empty<$U>());
    return FSharpList__get_Tail<$U>(root);
}

bool contains<$T>($T value, FSharpList<$T> xs, types.IEqualityComparer<$T> eq) => tryFindIndex<$T>(($T v) => eq.Equals(value, v), xs) != null;

FSharpList<$T> initialize<$T>(int n, $T Function(int) f) {
    final root = FSharpList_get_Empty<$T>();
    var node = root;
    for (var i = 0; i <= (n - 1); i++) {
        node = FSharpList__AppendConsNoTail_2B595<$T>(node, f(i));
    }
    FSharpList__SetConsTail_3002E699<$T>(node, FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

FSharpList<$$a> replicate<$$a>(int n, $$a x) => initialize<$$a>(n, (int _arg) => x);

$T reduce<$T>($T Function($T, $T) f, FSharpList<$T> xs) {
    if (FSharpList__get_IsEmpty<$T>(xs)) {
        return throw Exception(global$.SR_inputWasEmpty);
    } else {
        return fold<$T, $T>(f, head<$T>(xs), tail<$T>(xs));
    }
}

$T reduceBack<$T>($T Function($T, $T) f, FSharpList<$T> xs) {
    if (FSharpList__get_IsEmpty<$T>(xs)) {
        return throw Exception(global$.SR_inputWasEmpty);
    } else {
        return foldBack<$T, $T>(f, tail<$T>(xs), head<$T>(xs));
    }
}

bool forAll<$$a>(bool Function($$a) f, FSharpList<$$a> xs) => fold<$$a, bool>((bool acc, $$a x) {
    if (acc) {
        return f(x);
    } else {
        return false;
    }
}, true, xs);

bool forAll2<$$a, $$b>(bool Function($$a, $$b) f, FSharpList<$$a> xs, FSharpList<$$b> ys) => fold2<$$a, $$b, bool>((bool acc, $$a x, $$b y) {
    if (acc) {
        return f(x, y);
    } else {
        return false;
    }
}, true, xs, ys);

bool exists<$$a>(bool Function($$a) f, FSharpList<$$a> xs) => tryFindIndex<$$a>(f, xs) != null;

bool exists2<$T1, $T2>(bool Function($T1, $T2) f_mut, FSharpList<$T1> xs_mut, FSharpList<$T2> ys_mut) {
    exists2:
    while (true) {
        final f = f_mut;
        final xs = xs_mut;
        final ys = ys_mut;
        final matchValue = FSharpList__get_IsEmpty<$T1>(xs);
        final matchValue_1 = FSharpList__get_IsEmpty<$T2>(ys);
        late final int matchResult;
        if (matchValue) {
            if (matchValue_1) {
                matchResult = 0;
            } else {
                matchResult = 2;
            }
        } else if (matchValue_1) {
            matchResult = 2;
        } else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0:
                return false;
            case 1:
                if (f(FSharpList__get_Head<$T1>(xs), FSharpList__get_Head<$T2>(ys))) {
                    return true;
                } else {
                    f_mut = f;
                    xs_mut = FSharpList__get_Tail<$T1>(xs);
                    ys_mut = FSharpList__get_Tail<$T2>(ys);
                    continue exists2;
                }
            default:
                return throw Exception((global$.SR_differentLengths + '\\nParameter name: ') + 'list2');
        }
    }
}

types.Tuple2<FSharpList<$$a>, FSharpList<$$b>> unzip<$$a, $$b>(FSharpList<types.Tuple2<$$a, $$b>> xs) => foldBack<types.Tuple2<$$a, $$b>, types.Tuple2<FSharpList<$$a>, FSharpList<$$b>>>((types.Tuple2<$$a, $$b> tupledArg, types.Tuple2<FSharpList<$$a>, FSharpList<$$b>> tupledArg_1) => types.Tuple2(FSharpList_Cons_305B8EAC<$$a>(tupledArg.item1, tupledArg_1.item1), FSharpList_Cons_305B8EAC<$$b>(tupledArg.item2, tupledArg_1.item2)), xs, types.Tuple2(FSharpList_get_Empty<$$a>(), FSharpList_get_Empty<$$b>()));

types.Tuple3<FSharpList<$$a>, FSharpList<$$b>, FSharpList<$$c>> unzip3<$$a, $$b, $$c>(FSharpList<types.Tuple3<$$a, $$b, $$c>> xs) => foldBack<types.Tuple3<$$a, $$b, $$c>, types.Tuple3<FSharpList<$$a>, FSharpList<$$b>, FSharpList<$$c>>>((types.Tuple3<$$a, $$b, $$c> tupledArg, types.Tuple3<FSharpList<$$a>, FSharpList<$$b>, FSharpList<$$c>> tupledArg_1) => types.Tuple3(FSharpList_Cons_305B8EAC<$$a>(tupledArg.item1, tupledArg_1.item1), FSharpList_Cons_305B8EAC<$$b>(tupledArg.item2, tupledArg_1.item2), FSharpList_Cons_305B8EAC<$$c>(tupledArg.item3, tupledArg_1.item3)), xs, types.Tuple3(FSharpList_get_Empty<$$a>(), FSharpList_get_Empty<$$b>(), FSharpList_get_Empty<$$c>()));

FSharpList<types.Tuple2<$$a, $$b>> zip<$$a, $$b>(FSharpList<$$a> xs, FSharpList<$$b> ys) => map2<$$a, $$b, types.Tuple2<$$a, $$b>>(($$a x, $$b y) => types.Tuple2(x, y), xs, ys);

FSharpList<types.Tuple3<$$a, $$b, $$c>> zip3<$$a, $$b, $$c>(FSharpList<$$a> xs, FSharpList<$$b> ys, FSharpList<$$c> zs) => map3<$$a, $$b, $$c, types.Tuple3<$$a, $$b, $$c>>(($$a x, $$b y, $$c z) => types.Tuple3(x, y, z), xs, ys, zs);

FSharpList<$T> sortWith<$T>(int Function($T, $T) comparer, FSharpList<$T> xs) {
    final arr = toArray<$T>(xs);
    array_2.sortInPlaceWith<$T>(comparer, arr);
    return ofArray<$T>(arr);
}

FSharpList<$T> sort<$T>(FSharpList<$T> xs, types.IComparer<$T> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(x, y), xs);

FSharpList<$T> sortBy<$T, $U>($U Function($T) projection, FSharpList<$T> xs, types.IComparer<$U> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(projection(x), projection(y)), xs);

FSharpList<$T> sortDescending<$T>(FSharpList<$T> xs, types.IComparer<$T> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(x, y) * (-1), xs);

FSharpList<$T> sortByDescending<$T, $U>($U Function($T) projection, FSharpList<$T> xs, types.IComparer<$U> comparer) => sortWith<$T>(($T x, $T y) => comparer.Compare(projection(x), projection(y)) * (-1), xs);

$T sum<$T>(FSharpList<$T> xs, types.IGenericAdder<$T> adder) => fold<$T, $T>(($T acc, $T x) => adder.Add(acc, x), adder.GetZero(), xs);

$U sumBy<$T, $U>($U Function($T) f, FSharpList<$T> xs, types.IGenericAdder<$U> adder) => fold<$T, $U>(($U acc, $T x) => adder.Add(acc, f(x)), adder.GetZero(), xs);

$T maxBy<$T, $U>($U Function($T) projection, FSharpList<$T> xs, types.IComparer<$U> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(projection(y), projection(x)) > 0) {
        return y;
    } else {
        return x;
    }
}, xs);

$T max<$T>(FSharpList<$T> xs, types.IComparer<$T> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(y, x) > 0) {
        return y;
    } else {
        return x;
    }
}, xs);

$T minBy<$T, $U>($U Function($T) projection, FSharpList<$T> xs, types.IComparer<$U> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(projection(y), projection(x)) > 0) {
        return x;
    } else {
        return y;
    }
}, xs);

$T min<$T>(FSharpList<$T> xs, types.IComparer<$T> comparer) => reduce<$T>(($T x, $T y) {
    if (comparer.Compare(y, x) > 0) {
        return x;
    } else {
        return y;
    }
}, xs);

$T average<$T>(FSharpList<$T> xs, types.IGenericAverager<$T> averager) {
    var count = 0;
    final total = fold<$T, $T>(($T acc, $T x) {
        count = count + 1;
        return averager.Add(acc, x);
    }, averager.GetZero(), xs);
    return averager.DivideByInt(total, count);
}

$U averageBy<$T, $U>($U Function($T) f, FSharpList<$T> xs, types.IGenericAverager<$U> averager) {
    var count = 0;
    final total = fold<$T, $U>(($U acc, $T x) {
        count = count + 1;
        return averager.Add(acc, f(x));
    }, averager.GetZero(), xs);
    return averager.DivideByInt(total, count);
}

FSharpList<$T> permute<$T>(int Function(int) f, FSharpList<$T> xs) => ofArray<$T>(array_2.permute<$T>(f, toArray<$T>(xs)));

FSharpList<FSharpList<$T>> chunkBySize<$T>(int chunkSize, FSharpList<$T> xs) => ofArray<FSharpList<$T>>(array_2.map<List<$T>, FSharpList<$T>>((List<$T> xs_1) => ofArray<$T>(xs_1), array_2.chunkBySize<$T>(chunkSize, toArray<$T>(xs))));

FSharpList<types.Tuple2<$T1, $T2>> allPairs<$T1, $T2>(FSharpList<$T1> xs, FSharpList<$T2> ys) {
    final root = FSharpList_get_Empty<types.Tuple2<$T1, $T2>>();
    var node = root;
    iterate<$T1>(($T1 x) {
        iterate<$T2>(($T2 y) {
            node = FSharpList__AppendConsNoTail_2B595<types.Tuple2<$T1, $T2>>(node, types.Tuple2(x, y));
        }, ys);
    }, xs);
    FSharpList__SetConsTail_3002E699<types.Tuple2<$T1, $T2>>(node, FSharpList_get_Empty<types.Tuple2<$T1, $T2>>());
    return FSharpList__get_Tail<types.Tuple2<$T1, $T2>>(root);
}

FSharpList<$T> skip<$T>(int count_mut, FSharpList<$T> xs_mut) {
    skip:
    while (true) {
        final count = count_mut;
        final xs = xs_mut;
        if (count <= 0) {
            return xs;
        } else if (FSharpList__get_IsEmpty<$T>(xs)) {
            return throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'list');
        } else {
            count_mut = count - 1;
            xs_mut = FSharpList__get_Tail<$T>(xs);
            continue skip;
        }
    }
}

FSharpList<$T> skipWhile<$T>(bool Function($T) predicate_mut, FSharpList<$T> xs_mut) {
    skipWhile:
    while (true) {
        final predicate = predicate_mut;
        final xs = xs_mut;
        if (FSharpList__get_IsEmpty<$T>(xs)) {
            return xs;
        } else if (!(predicate(FSharpList__get_Head<$T>(xs)))) {
            return xs;
        } else {
            predicate_mut = predicate;
            xs_mut = FSharpList__get_Tail<$T>(xs);
            continue skipWhile;
        }
    }
}

FSharpList<$T> take<$T>(int count, FSharpList<$T> xs) {
    if (count < 0) {
        throw Exception((global$.SR_inputMustBeNonNegative + '\\nParameter name: ') + 'count');
    }
    FSharpList<$T> loop(int i_mut, FSharpList<$T> acc_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final acc = acc_mut;
            final xs_1 = xs_1_mut;
            if (i <= 0) {
                return acc;
            } else if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'list');
            } else {
                i_mut = i - 1;
                acc_mut = FSharpList__AppendConsNoTail_2B595<$T>(acc, FSharpList__get_Head<$T>(xs_1));
                xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                continue loop;
            }
        }
    }
    final root = FSharpList_get_Empty<$T>();
    FSharpList__SetConsTail_3002E699<$T>(loop(count, root, xs), FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

FSharpList<$T> takeWhile<$T>(bool Function($T) predicate, FSharpList<$T> xs) {
    FSharpList<$T> loop(FSharpList<$T> acc_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final acc = acc_mut;
            final xs_1 = xs_1_mut;
            if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return acc;
            } else if (!(predicate(FSharpList__get_Head<$T>(xs_1)))) {
                return acc;
            } else {
                acc_mut = FSharpList__AppendConsNoTail_2B595<$T>(acc, FSharpList__get_Head<$T>(xs_1));
                xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                continue loop;
            }
        }
    }
    final root = FSharpList_get_Empty<$T>();
    FSharpList__SetConsTail_3002E699<$T>(loop(root, xs), FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

FSharpList<$T> truncate<$T>(int count, FSharpList<$T> xs) {
    FSharpList<$T> loop(int i_mut, FSharpList<$T> acc_mut, FSharpList<$T> xs_1_mut) {
        loop:
        while (true) {
            final i = i_mut;
            final acc = acc_mut;
            final xs_1 = xs_1_mut;
            if (i <= 0) {
                return acc;
            } else if (FSharpList__get_IsEmpty<$T>(xs_1)) {
                return acc;
            } else {
                i_mut = i - 1;
                acc_mut = FSharpList__AppendConsNoTail_2B595<$T>(acc, FSharpList__get_Head<$T>(xs_1));
                xs_1_mut = FSharpList__get_Tail<$T>(xs_1);
                continue loop;
            }
        }
    }
    final root = FSharpList_get_Empty<$T>();
    FSharpList__SetConsTail_3002E699<$T>(loop(count, root, xs), FSharpList_get_Empty<$T>());
    return FSharpList__get_Tail<$T>(root);
}

FSharpList<$T> getSlice<$T>(types.Some<int>? startIndex, types.Some<int>? endIndex, FSharpList<$T> xs) {
    final len = length<$T>(xs);
    final index = option_1.defaultValue(0, startIndex);
    final startIndex_1 = (index < 0) ? 0 : index;
    final index_1 = option_1.defaultValue(len - 1, endIndex);
    final endIndex_1 = (index_1 >= len) ? (len - 1) : index_1;
    if (endIndex_1 < startIndex_1) {
        return FSharpList_get_Empty<$T>();
    } else {
        return take<$T>((endIndex_1 - startIndex_1) + 1, skip<$T>(startIndex_1, xs));
    }
}

types.Tuple2<FSharpList<$T>, FSharpList<$T>> splitAt<$T>(int index, FSharpList<$T> xs) {
    if (index < 0) {
        throw Exception((global$.SR_inputMustBeNonNegative + '\\nParameter name: ') + 'index');
    }
    if (index > FSharpList__get_Length<$T>(xs)) {
        throw Exception((global$.SR_notEnoughElements + '\\nParameter name: ') + 'index');
    }
    return types.Tuple2(take<$T>(index, xs), skip<$T>(index, xs));
}

$T exactlyOne<$T>(FSharpList<$T> xs) {
    if (FSharpList__get_IsEmpty<$T>(xs)) {
        return throw Exception((global$.SR_inputSequenceEmpty + '\\nParameter name: ') + 'list');
    } else if (FSharpList__get_IsEmpty<$T>(FSharpList__get_Tail<$T>(xs))) {
        return FSharpList__get_Head<$T>(xs);
    } else {
        return throw Exception((global$.SR_inputSequenceTooLong + '\\nParameter name: ') + 'list');
    }
}

types.Some<$T>? tryExactlyOne<$T>(FSharpList<$T> xs) {
    if (!(FSharpList__get_IsEmpty<$T>(xs)) && FSharpList__get_IsEmpty<$T>(FSharpList__get_Tail<$T>(xs))) {
        return types.Some(FSharpList__get_Head<$T>(xs));
    } else {
        return null;
    }
}

FSharpList<$T> where<$T>(bool Function($T) predicate, FSharpList<$T> xs) => filter<$T>(predicate, xs);

FSharpList<types.Tuple2<$T, $T>> pairwise<$T>(FSharpList<$T> xs) => ofArray<types.Tuple2<$T, $T>>(array_2.pairwise<$T>(toArray<$T>(xs)));

FSharpList<FSharpList<$T>> windowed<$T>(int windowSize, FSharpList<$T> xs) => ofArray<FSharpList<$T>>(array_2.map<List<$T>, FSharpList<$T>>((List<$T> xs_1) => ofArray<$T>(xs_1), array_2.windowed<$T>(windowSize, toArray<$T>(xs))));

FSharpList<FSharpList<$T>> splitInto<$T>(int chunks, FSharpList<$T> xs) => ofArray<FSharpList<$T>>(array_2.map<List<$T>, FSharpList<$T>>((List<$T> xs_1) => ofArray<$T>(xs_1), array_2.splitInto<$T>(chunks, toArray<$T>(xs))));

FSharpList<FSharpList<$T>> transpose<$T>(Iterable<FSharpList<$T>> lists) => ofArray<FSharpList<$T>>(array_2.map<List<$T>, FSharpList<$T>>((List<$T> xs_1) => ofArray<$T>(xs_1), array_2.transpose<$T>(array_2.map<FSharpList<$T>, List<$T>>((FSharpList<$T> xs) => toArray<$T>(xs), List.of(lists)))));

FSharpList<$T> insertAt<$T>(int index, $T y, FSharpList<$T> xs) {
    var i = -1;
    var isDone = false;
    final result = fold<$T, FSharpList<$T>>((FSharpList<$T> acc, $T x) {
        i = i + 1;
        if (i == index) {
            isDone = true;
            return FSharpList_Cons_305B8EAC<$T>(x, FSharpList_Cons_305B8EAC<$T>(y, acc));
        } else {
            return FSharpList_Cons_305B8EAC<$T>(x, acc);
        }
    }, FSharpList_get_Empty<$T>(), xs);
    return reverse<$T>(isDone ? result : (((i + 1) == index) ? FSharpList_Cons_305B8EAC<$T>(y, result) : (throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index'))));
}

FSharpList<$T> insertManyAt<$T>(int index, Iterable<$T> ys, FSharpList<$T> xs) {
    var i = -1;
    var isDone = false;
    final ys_1 = ofSeq<$T>(ys);
    final result = fold<$T, FSharpList<$T>>((FSharpList<$T> acc, $T x) {
        i = i + 1;
        if (i == index) {
            isDone = true;
            return FSharpList_Cons_305B8EAC<$T>(x, append<$T>(ys_1, acc));
        } else {
            return FSharpList_Cons_305B8EAC<$T>(x, acc);
        }
    }, FSharpList_get_Empty<$T>(), xs);
    return reverse<$T>(isDone ? result : (((i + 1) == index) ? append<$T>(ys_1, result) : (throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index'))));
}

FSharpList<$T> removeAt<$T>(int index, FSharpList<$T> xs) {
    var i = -1;
    var isDone = false;
    final ys = filter<$T>(($T _arg) {
        i = i + 1;
        if (i == index) {
            isDone = true;
            return false;
        } else {
            return true;
        }
    }, xs);
    if (!isDone) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return ys;
}

FSharpList<$T> removeManyAt<$T>(int index, int count, FSharpList<$T> xs) {
    var i = -1;
    var status = -1;
    final ys = filter<$T>(($T _arg) {
        i = i + 1;
        if (i == index) {
            status = 0;
            return false;
        } else if (i > index) {
            if (i < (index + count)) {
                return false;
            } else {
                status = 1;
                return true;
            }
        } else {
            return true;
        }
    }, xs);
    final status_1 = ((status == 0) && ((i + 1) == (index + count))) ? 1 : status;
    if (status_1 < 1) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + ((status_1 < 0) ? 'index' : 'count'));
    }
    return ys;
}

FSharpList<$T> updateAt<$T>(int index, $T y, FSharpList<$T> xs) {
    var isDone = false;
    final ys = mapIndexed<$T, $T>((int i, $T x) {
        if (i == index) {
            isDone = true;
            return y;
        } else {
            return x;
        }
    }, xs);
    if (!isDone) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return ys;
}

