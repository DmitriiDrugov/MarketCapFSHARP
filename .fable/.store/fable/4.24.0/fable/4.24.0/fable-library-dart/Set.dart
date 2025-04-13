// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Array.dart' as array_1;
import './List.dart' as list;
import './Seq.dart' as seq;
import './Types.dart' as types;

class SetTreeLeaf$1<$T> {
    final $T k;
    SetTreeLeaf$1(this.k);
}

$T SetTreeLeaf$1__get_Key<$T>(SetTreeLeaf$1<$T> _) => _.k;

class SetTreeNode$1<$T> extends SetTreeLeaf$1<$T> {
    final types.Some<SetTreeLeaf$1<$T>>? right;
    final types.Some<SetTreeLeaf$1<$T>>? left;
    final int h;
    SetTreeNode$1($T v, this.left, this.right, this.h): super(v);
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeNode$1__get_Left<$T>(SetTreeNode$1<$T> _) => _.left;

types.Some<SetTreeLeaf$1<$T>>? SetTreeNode$1__get_Right<$T>(SetTreeNode$1<$T> _) => _.right;

int SetTreeNode$1__get_Height<$T>(SetTreeNode$1<$T> _) => _.h;

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_empty<$T>() => null;

int SetTreeModule_countAux<$T>(types.Some<SetTreeLeaf$1<$T>>? t_mut, int acc_mut) {
    SetTreeModule_countAux:
    while (true) {
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final acc = acc_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                acc_mut = SetTreeModule_countAux<$T>(SetTreeNode$1__get_Right<$T>(tn), acc + 1);
                continue SetTreeModule_countAux;
            } else {
                return acc + 1;
            }
        } else {
            return acc;
        }
    }
}

int SetTreeModule_count<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) => SetTreeModule_countAux<$$a>(s, 0);

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_mk<$T>(types.Some<SetTreeLeaf$1<$T>>? l, $T k, types.Some<SetTreeLeaf$1<$T>>? r) {
    late final int hl;
    final types.Some<SetTreeLeaf$1<$T>>? t = l;
    if (t != null) {
        final t2 = types.value(t);
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            hl = SetTreeNode$1__get_Height<$T>(tn);
        } else {
            hl = 1;
        }
    } else {
        hl = 0;
    }
    late final int hr;
    final types.Some<SetTreeLeaf$1<$T>>? t_1 = r;
    if (t_1 != null) {
        final t2_1 = types.value(t_1);
        if (t2_1 is SetTreeNode$1<$T>) {
            final tn_1 = t2_1;
            hr = SetTreeNode$1__get_Height<$T>(tn_1);
        } else {
            hr = 1;
        }
    } else {
        hr = 0;
    }
    final m = (hl < hr) ? hr : hl;
    if (m == 0) {
        return types.Some(SetTreeLeaf$1<$T>(k));
    } else {
        return types.Some(SetTreeNode$1<$T>(k, l, r, m + 1));
    }
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_rebalance<$T>(types.Some<SetTreeLeaf$1<$T>>? t1, $T v, types.Some<SetTreeLeaf$1<$T>>? t2) {
    late final int t1h;
    final types.Some<SetTreeLeaf$1<$T>>? t = t1;
    if (t != null) {
        final t2_1 = types.value(t);
        if (t2_1 is SetTreeNode$1<$T>) {
            final tn = t2_1;
            t1h = SetTreeNode$1__get_Height<$T>(tn);
        } else {
            t1h = 1;
        }
    } else {
        t1h = 0;
    }
    late final int t2h;
    final types.Some<SetTreeLeaf$1<$T>>? t_1 = t2;
    if (t_1 != null) {
        final t2_2 = types.value(t_1);
        if (t2_2 is SetTreeNode$1<$T>) {
            final tn_1 = t2_2;
            t2h = SetTreeNode$1__get_Height<$T>(tn_1);
        } else {
            t2h = 1;
        }
    } else {
        t2h = 0;
    }
    if (t2h > (t1h + 2)) {
        final matchValue = types.value(t2);
        if (matchValue is SetTreeNode$1<$T>) {
            final t2$0027 = matchValue;
            final types.Some<SetTreeLeaf$1<$T>>? t_2 = SetTreeNode$1__get_Left<$T>(t2$0027);
            late final int tmp_capture;
            if (t_2 != null) {
                final t2_3 = types.value(t_2);
                if (t2_3 is SetTreeNode$1<$T>) {
                    final tn_2 = t2_3;
                    tmp_capture = SetTreeNode$1__get_Height<$T>(tn_2);
                } else {
                    tmp_capture = 1;
                }
            } else {
                tmp_capture = 0;
            }
            if (tmp_capture > (t1h + 1)) {
                final matchValue_1 = types.value(SetTreeNode$1__get_Left<$T>(t2$0027));
                if (matchValue_1 is SetTreeNode$1<$T>) {
                    final t2l = matchValue_1;
                    return SetTreeModule_mk<$T>(SetTreeModule_mk<$T>(t1, v, SetTreeNode$1__get_Left<$T>(t2l)), SetTreeLeaf$1__get_Key<$T>(t2l), SetTreeModule_mk<$T>(SetTreeNode$1__get_Right<$T>(t2l), SetTreeLeaf$1__get_Key<$T>(t2$0027), SetTreeNode$1__get_Right<$T>(t2$0027)));
                } else {
                    return throw Exception('internal error: Set.rebalance');
                }
            } else {
                return SetTreeModule_mk<$T>(SetTreeModule_mk<$T>(t1, v, SetTreeNode$1__get_Left<$T>(t2$0027)), SetTreeLeaf$1__get_Key<$T>(t2$0027), SetTreeNode$1__get_Right<$T>(t2$0027));
            }
        } else {
            return throw Exception('internal error: Set.rebalance');
        }
    } else if (t1h > (t2h + 2)) {
        final matchValue_2 = types.value(t1);
        if (matchValue_2 is SetTreeNode$1<$T>) {
            final t1$0027 = matchValue_2;
            final types.Some<SetTreeLeaf$1<$T>>? t_3 = SetTreeNode$1__get_Right<$T>(t1$0027);
            late final int tmp_capture_1;
            if (t_3 != null) {
                final t2_4 = types.value(t_3);
                if (t2_4 is SetTreeNode$1<$T>) {
                    final tn_3 = t2_4;
                    tmp_capture_1 = SetTreeNode$1__get_Height<$T>(tn_3);
                } else {
                    tmp_capture_1 = 1;
                }
            } else {
                tmp_capture_1 = 0;
            }
            if (tmp_capture_1 > (t2h + 1)) {
                final matchValue_3 = types.value(SetTreeNode$1__get_Right<$T>(t1$0027));
                if (matchValue_3 is SetTreeNode$1<$T>) {
                    final t1r = matchValue_3;
                    return SetTreeModule_mk<$T>(SetTreeModule_mk<$T>(SetTreeNode$1__get_Left<$T>(t1$0027), SetTreeLeaf$1__get_Key<$T>(t1$0027), SetTreeNode$1__get_Left<$T>(t1r)), SetTreeLeaf$1__get_Key<$T>(t1r), SetTreeModule_mk<$T>(SetTreeNode$1__get_Right<$T>(t1r), v, t2));
                } else {
                    return throw Exception('internal error: Set.rebalance');
                }
            } else {
                return SetTreeModule_mk<$T>(SetTreeNode$1__get_Left<$T>(t1$0027), SetTreeLeaf$1__get_Key<$T>(t1$0027), SetTreeModule_mk<$T>(SetTreeNode$1__get_Right<$T>(t1$0027), v, t2));
            }
        } else {
            return throw Exception('internal error: Set.rebalance');
        }
    } else {
        return SetTreeModule_mk<$T>(t1, v, t2);
    }
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_add<$T>(types.IComparer<$T> comparer, $T k, types.Some<SetTreeLeaf$1<$T>>? t) {
    if (t != null) {
        final t2 = types.value(t);
        final c = comparer.Compare(k, SetTreeLeaf$1__get_Key<$T>(t2));
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            if (c < 0) {
                return SetTreeModule_rebalance<$T>(SetTreeModule_add<$T>(comparer, k, SetTreeNode$1__get_Left<$T>(tn)), SetTreeLeaf$1__get_Key<$T>(tn), SetTreeNode$1__get_Right<$T>(tn));
            } else if (c == 0) {
                return t;
            } else {
                return SetTreeModule_rebalance<$T>(SetTreeNode$1__get_Left<$T>(tn), SetTreeLeaf$1__get_Key<$T>(tn), SetTreeModule_add<$T>(comparer, k, SetTreeNode$1__get_Right<$T>(tn)));
            }
        } else {
            final c_1 = comparer.Compare(k, SetTreeLeaf$1__get_Key<$T>(t2));
            if (c_1 < 0) {
                return types.Some(SetTreeNode$1<$T>(k, SetTreeModule_empty<$T>(), t, 2));
            } else if (c_1 == 0) {
                return t;
            } else {
                return types.Some(SetTreeNode$1<$T>(k, t, SetTreeModule_empty<$T>(), 2));
            }
        }
    } else {
        return types.Some(SetTreeLeaf$1<$T>(k));
    }
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_balance<$T>(types.IComparer<$T> comparer, types.Some<SetTreeLeaf$1<$T>>? t1, $T k, types.Some<SetTreeLeaf$1<$T>>? t2) {
    if (t1 != null) {
        final t1$0027 = types.value(t1);
        if (t2 != null) {
            final t2$0027 = types.value(t2);
            if (t1$0027 is SetTreeNode$1<$T>) {
                final t1n = t1$0027;
                if (t2$0027 is SetTreeNode$1<$T>) {
                    final t2n = t2$0027;
                    if ((SetTreeNode$1__get_Height<$T>(t1n) + 2) < SetTreeNode$1__get_Height<$T>(t2n)) {
                        return SetTreeModule_rebalance<$T>(SetTreeModule_balance<$T>(comparer, t1, k, SetTreeNode$1__get_Left<$T>(t2n)), SetTreeLeaf$1__get_Key<$T>(t2n), SetTreeNode$1__get_Right<$T>(t2n));
                    } else if ((SetTreeNode$1__get_Height<$T>(t2n) + 2) < SetTreeNode$1__get_Height<$T>(t1n)) {
                        return SetTreeModule_rebalance<$T>(SetTreeNode$1__get_Left<$T>(t1n), SetTreeLeaf$1__get_Key<$T>(t1n), SetTreeModule_balance<$T>(comparer, SetTreeNode$1__get_Right<$T>(t1n), k, t2));
                    } else {
                        return SetTreeModule_mk<$T>(t1, k, t2);
                    }
                } else {
                    return SetTreeModule_add<$T>(comparer, k, SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2$0027), t1));
                }
            } else {
                return SetTreeModule_add<$T>(comparer, k, SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t1$0027), t2));
            }
        } else {
            return SetTreeModule_add<$T>(comparer, k, t1);
        }
    } else {
        return SetTreeModule_add<$T>(comparer, k, t2);
    }
}

types.Tuple3<types.Some<SetTreeLeaf$1<$T>>?, bool, types.Some<SetTreeLeaf$1<$T>>?> SetTreeModule_split<$T>(types.IComparer<$T> comparer, $T pivot, types.Some<SetTreeLeaf$1<$T>>? t) {
    if (t != null) {
        final t2 = types.value(t);
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            final c = comparer.Compare(pivot, SetTreeLeaf$1__get_Key<$T>(tn));
            if (c < 0) {
                final patternInput = SetTreeModule_split<$T>(comparer, pivot, SetTreeNode$1__get_Left<$T>(tn));
                return types.Tuple3(patternInput.item1, patternInput.item2, SetTreeModule_balance<$T>(comparer, patternInput.item3, SetTreeLeaf$1__get_Key<$T>(tn), SetTreeNode$1__get_Right<$T>(tn)));
            } else if (c == 0) {
                return types.Tuple3(SetTreeNode$1__get_Left<$T>(tn), true, SetTreeNode$1__get_Right<$T>(tn));
            } else {
                final patternInput_1 = SetTreeModule_split<$T>(comparer, pivot, SetTreeNode$1__get_Right<$T>(tn));
                return types.Tuple3(SetTreeModule_balance<$T>(comparer, SetTreeNode$1__get_Left<$T>(tn), SetTreeLeaf$1__get_Key<$T>(tn), patternInput_1.item1), patternInput_1.item2, patternInput_1.item3);
            }
        } else {
            final c_1 = comparer.Compare(SetTreeLeaf$1__get_Key<$T>(t2), pivot);
            if (c_1 < 0) {
                return types.Tuple3(t, false, SetTreeModule_empty<$T>());
            } else if (c_1 == 0) {
                return types.Tuple3(SetTreeModule_empty<$T>(), true, SetTreeModule_empty<$T>());
            } else {
                return types.Tuple3(SetTreeModule_empty<$T>(), false, t);
            }
        }
    } else {
        return types.Tuple3(SetTreeModule_empty<$T>(), false, SetTreeModule_empty<$T>());
    }
}

types.Tuple2<$T, types.Some<SetTreeLeaf$1<$T>>?> SetTreeModule_spliceOutSuccessor<$T>(types.Some<SetTreeLeaf$1<$T>>? t) {
    if (t != null) {
        final t2 = types.value(t);
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            if (SetTreeNode$1__get_Left<$T>(tn) == null) {
                return types.Tuple2(SetTreeLeaf$1__get_Key<$T>(tn), SetTreeNode$1__get_Right<$T>(tn));
            } else {
                final patternInput = SetTreeModule_spliceOutSuccessor<$T>(SetTreeNode$1__get_Left<$T>(tn));
                return types.Tuple2(patternInput.item1, SetTreeModule_mk<$T>(patternInput.item2, SetTreeLeaf$1__get_Key<$T>(tn), SetTreeNode$1__get_Right<$T>(tn)));
            }
        } else {
            return types.Tuple2(SetTreeLeaf$1__get_Key<$T>(t2), SetTreeModule_empty<$T>());
        }
    } else {
        return throw Exception('internal error: Set.spliceOutSuccessor');
    }
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_remove<$T>(types.IComparer<$T> comparer, $T k, types.Some<SetTreeLeaf$1<$T>>? t) {
    if (t != null) {
        final t2 = types.value(t);
        final c = comparer.Compare(k, SetTreeLeaf$1__get_Key<$T>(t2));
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            if (c < 0) {
                return SetTreeModule_rebalance<$T>(SetTreeModule_remove<$T>(comparer, k, SetTreeNode$1__get_Left<$T>(tn)), SetTreeLeaf$1__get_Key<$T>(tn), SetTreeNode$1__get_Right<$T>(tn));
            } else if (c == 0) {
                if (SetTreeNode$1__get_Left<$T>(tn) == null) {
                    return SetTreeNode$1__get_Right<$T>(tn);
                } else if (SetTreeNode$1__get_Right<$T>(tn) == null) {
                    return SetTreeNode$1__get_Left<$T>(tn);
                } else {
                    final patternInput = SetTreeModule_spliceOutSuccessor<$T>(SetTreeNode$1__get_Right<$T>(tn));
                    return SetTreeModule_mk<$T>(SetTreeNode$1__get_Left<$T>(tn), patternInput.item1, patternInput.item2);
                }
            } else {
                return SetTreeModule_rebalance<$T>(SetTreeNode$1__get_Left<$T>(tn), SetTreeLeaf$1__get_Key<$T>(tn), SetTreeModule_remove<$T>(comparer, k, SetTreeNode$1__get_Right<$T>(tn)));
            }
        } else if (c == 0) {
            return SetTreeModule_empty<$T>();
        } else {
            return t;
        }
    } else {
        return t;
    }
}

bool SetTreeModule_mem<$T>(types.IComparer<$T> comparer_mut, $T k_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut) {
    SetTreeModule_mem:
    while (true) {
        final comparer = comparer_mut;
        final k = k_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        if (t != null) {
            final t2 = types.value(t);
            final c = comparer.Compare(k, SetTreeLeaf$1__get_Key<$T>(t2));
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                if (c < 0) {
                    comparer_mut = comparer;
                    k_mut = k;
                    t_mut = SetTreeNode$1__get_Left<$T>(tn);
                    continue SetTreeModule_mem;
                } else if (c == 0) {
                    return true;
                } else {
                    comparer_mut = comparer;
                    k_mut = k;
                    t_mut = SetTreeNode$1__get_Right<$T>(tn);
                    continue SetTreeModule_mem;
                }
            } else {
                return c == 0;
            }
        } else {
            return false;
        }
    }
}

void SetTreeModule_iter<$T>(void Function($T) f_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut) {
    SetTreeModule_iter:
    while (true) {
        final f = f_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                SetTreeModule_iter<$T>(f, SetTreeNode$1__get_Left<$T>(tn));
                f(SetTreeLeaf$1__get_Key<$T>(tn));
                f_mut = f;
                t_mut = SetTreeNode$1__get_Right<$T>(tn);
                continue SetTreeModule_iter;
            } else {
                f(SetTreeLeaf$1__get_Key<$T>(t2));
            }
        }
        break;
    }
}

$a SetTreeModule_foldBackOpt<$T, $a>($a Function($T, $a) f_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut, $a x_mut) {
    SetTreeModule_foldBackOpt:
    while (true) {
        final f = f_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final x = x_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                f_mut = f;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                x_mut = f(SetTreeLeaf$1__get_Key<$T>(tn), SetTreeModule_foldBackOpt<$T, $a>(f, SetTreeNode$1__get_Right<$T>(tn), x));
                continue SetTreeModule_foldBackOpt;
            } else {
                return f(SetTreeLeaf$1__get_Key<$T>(t2), x);
            }
        } else {
            return x;
        }
    }
}

$b SetTreeModule_foldBack<$a, $b>($b Function($a, $b) f, types.Some<SetTreeLeaf$1<$a>>? m, $b x) => SetTreeModule_foldBackOpt<$a, $b>(f, m, x);

$a SetTreeModule_foldOpt<$a, $T>($a Function($a, $T) f_mut, $a x_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut) {
    SetTreeModule_foldOpt:
    while (true) {
        final f = f_mut;
        final x = x_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                f_mut = f;
                x_mut = f(SetTreeModule_foldOpt<$a, $T>(f, x, SetTreeNode$1__get_Left<$T>(tn)), SetTreeLeaf$1__get_Key<$T>(tn));
                t_mut = SetTreeNode$1__get_Right<$T>(tn);
                continue SetTreeModule_foldOpt;
            } else {
                return f(x, SetTreeLeaf$1__get_Key<$T>(t2));
            }
        } else {
            return x;
        }
    }
}

$a SetTreeModule_fold<$a, $b>($a Function($a, $b) f, $a x, types.Some<SetTreeLeaf$1<$b>>? m) => SetTreeModule_foldOpt<$a, $b>(f, x, m);

bool SetTreeModule_forall<$T>(bool Function($T) f_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut) {
    SetTreeModule_forall:
    while (true) {
        final f = f_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                if (f(SetTreeLeaf$1__get_Key<$T>(tn)) && SetTreeModule_forall<$T>(f, SetTreeNode$1__get_Left<$T>(tn))) {
                    f_mut = f;
                    t_mut = SetTreeNode$1__get_Right<$T>(tn);
                    continue SetTreeModule_forall;
                } else {
                    return false;
                }
            } else {
                return f(SetTreeLeaf$1__get_Key<$T>(t2));
            }
        } else {
            return true;
        }
    }
}

bool SetTreeModule_exists<$T>(bool Function($T) f_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut) {
    SetTreeModule_exists:
    while (true) {
        final f = f_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                if (f(SetTreeLeaf$1__get_Key<$T>(tn)) || SetTreeModule_exists<$T>(f, SetTreeNode$1__get_Left<$T>(tn))) {
                    return true;
                } else {
                    f_mut = f;
                    t_mut = SetTreeNode$1__get_Right<$T>(tn);
                    continue SetTreeModule_exists;
                }
            } else {
                return f(SetTreeLeaf$1__get_Key<$T>(t2));
            }
        } else {
            return false;
        }
    }
}

bool SetTreeModule_subset<$$a>(types.IComparer<$$a> comparer, types.Some<SetTreeLeaf$1<$$a>>? a, types.Some<SetTreeLeaf$1<$$a>>? b) => SetTreeModule_forall<$$a>(($$a x) => SetTreeModule_mem<$$a>(comparer, x, b), a);

bool SetTreeModule_properSubset<$$a>(types.IComparer<$$a> comparer, types.Some<SetTreeLeaf$1<$$a>>? a, types.Some<SetTreeLeaf$1<$$a>>? b) {
    if (SetTreeModule_forall<$$a>(($$a x) => SetTreeModule_mem<$$a>(comparer, x, b), a)) {
        return SetTreeModule_exists<$$a>(($$a x_1) => !(SetTreeModule_mem<$$a>(comparer, x_1, a)), b);
    } else {
        return false;
    }
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_filterAux<$T>(types.IComparer<$T> comparer_mut, bool Function($T) f_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut, types.Some<SetTreeLeaf$1<$T>>? acc_mut) {
    SetTreeModule_filterAux:
    while (true) {
        final comparer = comparer_mut;
        final f = f_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final types.Some<SetTreeLeaf$1<$T>>? acc = acc_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                final types.Some<SetTreeLeaf$1<$T>>? acc_1 = f(SetTreeLeaf$1__get_Key<$T>(tn)) ? SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(tn), acc) : acc;
                comparer_mut = comparer;
                f_mut = f;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                acc_mut = SetTreeModule_filterAux<$T>(comparer, f, SetTreeNode$1__get_Right<$T>(tn), acc_1);
                continue SetTreeModule_filterAux;
            } else if (f(SetTreeLeaf$1__get_Key<$T>(t2))) {
                return SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2), acc);
            } else {
                return acc;
            }
        } else {
            return acc;
        }
    }
}

types.Some<SetTreeLeaf$1<$$a>>? SetTreeModule_filter<$$a>(types.IComparer<$$a> comparer, bool Function($$a) f, types.Some<SetTreeLeaf$1<$$a>>? s) => SetTreeModule_filterAux<$$a>(comparer, f, s, SetTreeModule_empty<$$a>());

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_diffAux<$T>(types.IComparer<$T> comparer_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut, types.Some<SetTreeLeaf$1<$T>>? acc_mut) {
    SetTreeModule_diffAux:
    while (true) {
        final comparer = comparer_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final types.Some<SetTreeLeaf$1<$T>>? acc = acc_mut;
        if (acc == null) {
            return acc;
        } else if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                comparer_mut = comparer;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                acc_mut = SetTreeModule_diffAux<$T>(comparer, SetTreeNode$1__get_Right<$T>(tn), SetTreeModule_remove<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(tn), acc));
                continue SetTreeModule_diffAux;
            } else {
                return SetTreeModule_remove<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2), acc);
            }
        } else {
            return acc;
        }
    }
}

types.Some<SetTreeLeaf$1<$$a>>? SetTreeModule_diff<$$a>(types.IComparer<$$a> comparer, types.Some<SetTreeLeaf$1<$$a>>? a, types.Some<SetTreeLeaf$1<$$a>>? b) => SetTreeModule_diffAux<$$a>(comparer, b, a);

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_union<$T>(types.IComparer<$T> comparer, types.Some<SetTreeLeaf$1<$T>>? t1, types.Some<SetTreeLeaf$1<$T>>? t2) {
    if (t1 != null) {
        final t1$0027 = types.value(t1);
        if (t2 != null) {
            final t2$0027 = types.value(t2);
            if (t1$0027 is SetTreeNode$1<$T>) {
                final t1n = t1$0027;
                if (t2$0027 is SetTreeNode$1<$T>) {
                    final t2n = t2$0027;
                    if (SetTreeNode$1__get_Height<$T>(t1n) > SetTreeNode$1__get_Height<$T>(t2n)) {
                        final patternInput = SetTreeModule_split<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t1n), t2);
                        return SetTreeModule_balance<$T>(comparer, SetTreeModule_union<$T>(comparer, SetTreeNode$1__get_Left<$T>(t1n), patternInput.item1), SetTreeLeaf$1__get_Key<$T>(t1n), SetTreeModule_union<$T>(comparer, SetTreeNode$1__get_Right<$T>(t1n), patternInput.item3));
                    } else {
                        final patternInput_1 = SetTreeModule_split<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2n), t1);
                        return SetTreeModule_balance<$T>(comparer, SetTreeModule_union<$T>(comparer, SetTreeNode$1__get_Left<$T>(t2n), patternInput_1.item1), SetTreeLeaf$1__get_Key<$T>(t2n), SetTreeModule_union<$T>(comparer, SetTreeNode$1__get_Right<$T>(t2n), patternInput_1.item3));
                    }
                } else {
                    return SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2$0027), t1);
                }
            } else {
                return SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t1$0027), t2);
            }
        } else {
            return t1;
        }
    } else {
        return t2;
    }
}

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_intersectionAux<$T>(types.IComparer<$T> comparer_mut, types.Some<SetTreeLeaf$1<$T>>? b_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut, types.Some<SetTreeLeaf$1<$T>>? acc_mut) {
    SetTreeModule_intersectionAux:
    while (true) {
        final comparer = comparer_mut;
        final types.Some<SetTreeLeaf$1<$T>>? b = b_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final types.Some<SetTreeLeaf$1<$T>>? acc = acc_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                final types.Some<SetTreeLeaf$1<$T>>? acc_1 = SetTreeModule_intersectionAux<$T>(comparer, b, SetTreeNode$1__get_Right<$T>(tn), acc);
                final types.Some<SetTreeLeaf$1<$T>>? acc_2 = SetTreeModule_mem<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(tn), b) ? SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(tn), acc_1) : acc_1;
                comparer_mut = comparer;
                b_mut = b;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                acc_mut = acc_2;
                continue SetTreeModule_intersectionAux;
            } else if (SetTreeModule_mem<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2), b)) {
                return SetTreeModule_add<$T>(comparer, SetTreeLeaf$1__get_Key<$T>(t2), acc);
            } else {
                return acc;
            }
        } else {
            return acc;
        }
    }
}

types.Some<SetTreeLeaf$1<$$a>>? SetTreeModule_intersection<$$a>(types.IComparer<$$a> comparer, types.Some<SetTreeLeaf$1<$$a>>? a, types.Some<SetTreeLeaf$1<$$a>>? b) => SetTreeModule_intersectionAux<$$a>(comparer, b, a, SetTreeModule_empty<$$a>());

types.Tuple2<types.Some<SetTreeLeaf$1<$$a>>?, types.Some<SetTreeLeaf$1<$$a>>?> SetTreeModule_partition1<$$a>(types.IComparer<$$a> comparer, bool Function($$a) f, $$a k, types.Some<SetTreeLeaf$1<$$a>>? acc1, types.Some<SetTreeLeaf$1<$$a>>? acc2) {
    if (f(k)) {
        return types.Tuple2(SetTreeModule_add<$$a>(comparer, k, acc1), acc2);
    } else {
        return types.Tuple2(acc1, SetTreeModule_add<$$a>(comparer, k, acc2));
    }
}

types.Tuple2<types.Some<SetTreeLeaf$1<$T>>?, types.Some<SetTreeLeaf$1<$T>>?> SetTreeModule_partitionAux<$T>(types.IComparer<$T> comparer_mut, bool Function($T) f_mut, types.Some<SetTreeLeaf$1<$T>>? t_mut, types.Some<SetTreeLeaf$1<$T>>? acc__mut, types.Some<SetTreeLeaf$1<$T>>? acc__1_mut) {
    SetTreeModule_partitionAux:
    while (true) {
        final comparer = comparer_mut;
        final f = f_mut;
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final types.Some<SetTreeLeaf$1<$T>>? acc_ = acc__mut;
        final types.Some<SetTreeLeaf$1<$T>>? acc__1 = acc__1_mut;
        final acc = types.Tuple2(acc_, acc__1);
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                final acc_1 = SetTreeModule_partitionAux<$T>(comparer, f, SetTreeNode$1__get_Right<$T>(tn), acc.item1, acc.item2);
                final acc_4 = SetTreeModule_partition1<$T>(comparer, f, SetTreeLeaf$1__get_Key<$T>(tn), acc_1.item1, acc_1.item2);
                comparer_mut = comparer;
                f_mut = f;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                acc__mut = acc_4.item1;
                acc__1_mut = acc_4.item2;
                continue SetTreeModule_partitionAux;
            } else {
                return SetTreeModule_partition1<$T>(comparer, f, SetTreeLeaf$1__get_Key<$T>(t2), acc.item1, acc.item2);
            }
        } else {
            return acc;
        }
    }
}

types.Tuple2<types.Some<SetTreeLeaf$1<$$a>>?, types.Some<SetTreeLeaf$1<$$a>>?> SetTreeModule_partition<$$a>(types.IComparer<$$a> comparer, bool Function($$a) f, types.Some<SetTreeLeaf$1<$$a>>? s) => SetTreeModule_partitionAux<$$a>(comparer, f, s, SetTreeModule_empty<$$a>(), SetTreeModule_empty<$$a>());

$T SetTreeModule_minimumElementAux<$T>(types.Some<SetTreeLeaf$1<$T>>? t_mut, $T n_mut) {
    SetTreeModule_minimumElementAux:
    while (true) {
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final n = n_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                t_mut = SetTreeNode$1__get_Left<$T>(tn);
                n_mut = SetTreeLeaf$1__get_Key<$T>(tn);
                continue SetTreeModule_minimumElementAux;
            } else {
                return SetTreeLeaf$1__get_Key<$T>(t2);
            }
        } else {
            return n;
        }
    }
}

types.Some<$T>? SetTreeModule_minimumElementOpt<$T>(types.Some<SetTreeLeaf$1<$T>>? t) {
    if (t != null) {
        final t2 = types.value(t);
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            return types.Some(SetTreeModule_minimumElementAux<$T>(SetTreeNode$1__get_Left<$T>(tn), SetTreeLeaf$1__get_Key<$T>(tn)));
        } else {
            return types.Some(SetTreeLeaf$1__get_Key<$T>(t2));
        }
    } else {
        return null;
    }
}

$T SetTreeModule_maximumElementAux<$T>(types.Some<SetTreeLeaf$1<$T>>? t_mut, $T n_mut) {
    SetTreeModule_maximumElementAux:
    while (true) {
        final types.Some<SetTreeLeaf$1<$T>>? t = t_mut;
        final n = n_mut;
        if (t != null) {
            final t2 = types.value(t);
            if (t2 is SetTreeNode$1<$T>) {
                final tn = t2;
                t_mut = SetTreeNode$1__get_Right<$T>(tn);
                n_mut = SetTreeLeaf$1__get_Key<$T>(tn);
                continue SetTreeModule_maximumElementAux;
            } else {
                return SetTreeLeaf$1__get_Key<$T>(t2);
            }
        } else {
            return n;
        }
    }
}

types.Some<$T>? SetTreeModule_maximumElementOpt<$T>(types.Some<SetTreeLeaf$1<$T>>? t) {
    if (t != null) {
        final t2 = types.value(t);
        if (t2 is SetTreeNode$1<$T>) {
            final tn = t2;
            return types.Some(SetTreeModule_maximumElementAux<$T>(SetTreeNode$1__get_Right<$T>(tn), SetTreeLeaf$1__get_Key<$T>(tn)));
        } else {
            return types.Some(SetTreeLeaf$1__get_Key<$T>(t2));
        }
    } else {
        return null;
    }
}

$$a SetTreeModule_minimumElement<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) {
    final types.Some<$$a>? matchValue = SetTreeModule_minimumElementOpt<$$a>(s);
    if (matchValue == null) {
        return throw Exception('Set contains no elements');
    } else {
        return types.value(matchValue);
    }
}

$$a SetTreeModule_maximumElement<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) {
    final types.Some<$$a>? matchValue = SetTreeModule_maximumElementOpt<$$a>(s);
    if (matchValue == null) {
        return throw Exception('Set contains no elements');
    } else {
        return types.value(matchValue);
    }
}

class SetTreeModule_SetIterator$1<$T> implements types.Record {
    list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> stack;
    bool started;
    SetTreeModule_SetIterator$1(this.stack, this.started);
}

list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> SetTreeModule_collapseLHS<$T>(list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> stack_mut) {
    SetTreeModule_collapseLHS:
    while (true) {
        final stack = stack_mut;
        if (!(list.isEmpty(stack))) {
            final types.Some<SetTreeLeaf$1<$T>>? x = list.head(stack);
            final rest = list.tail(stack);
            if (x != null) {
                final x2 = types.value(x);
                if (x2 is SetTreeNode$1<$T>) {
                    final xn = x2;
                    stack_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(xn), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(xn))), SetTreeNode$1__get_Right<$T>(xn)], rest);
                    continue SetTreeModule_collapseLHS;
                } else {
                    return stack;
                }
            } else {
                stack_mut = rest;
                continue SetTreeModule_collapseLHS;
            }
        } else {
            return list.empty<types.Some<SetTreeLeaf$1<$T>>?>();
        }
    }
}

SetTreeModule_SetIterator$1<$$a> SetTreeModule_mkIterator<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) => SetTreeModule_SetIterator$1<$$a>(SetTreeModule_collapseLHS<$$a>(list.singleton(s)), false);

$$a SetTreeModule_notStarted<$$a>() => throw Exception('Enumeration not started');

$$a SetTreeModule_alreadyFinished<$$a>() => throw Exception('Enumeration already started');

$$a SetTreeModule_current<$$a>(SetTreeModule_SetIterator$1<$$a> i) {
    if (i.started) {
        final matchValue = i.stack;
        if (list.isEmpty(matchValue)) {
            return SetTreeModule_alreadyFinished<$$a>();
        } else if (list.head(matchValue) != null) {
            return SetTreeLeaf$1__get_Key<$$a>(types.value(list.head(matchValue)));
        } else {
            return throw Exception('Please report error: Set iterator, unexpected stack for current');
        }
    } else {
        return SetTreeModule_notStarted<$$a>();
    }
}

bool SetTreeModule_moveNext<$T>(SetTreeModule_SetIterator$1<$T> i) {
    if (i.started) {
        final matchValue = i.stack;
        if (!(list.isEmpty(matchValue))) {
            if (list.head(matchValue) != null) {
                if (types.value(list.head(matchValue)) is SetTreeNode$1<$T>) {
                    return throw Exception('Please report error: Set iterator, unexpected stack for moveNext');
                } else {
                    i.stack = SetTreeModule_collapseLHS<$T>(list.tail(matchValue));
                    return !(list.isEmpty(i.stack));
                }
            } else {
                return throw Exception('Please report error: Set iterator, unexpected stack for moveNext');
            }
        } else {
            return false;
        }
    } else {
        i.started = true;
        return !(list.isEmpty(i.stack));
    }
}

class SetTreeModule_SetEnumerator$1<$T> implements types.IDisposable, Iterator<$T> {
    final types.Some<SetTreeLeaf$1<$T>>? s;
    late SetTreeModule_SetIterator$1<$T> i;
    SetTreeModule_SetEnumerator$1(this.s) {
        this.i = SetTreeModule_mkIterator<$T>(this.s);
    }

    @override
    $T get current => SetTreeModule_current<$T>(this.i);
    @override
    bool moveNext() => SetTreeModule_moveNext<$T>(this.i);
    @override
    void Dispose() {
    }
}

Iterator<$$a> SetTreeModule_mkIEnumerator<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) => SetTreeModule_SetEnumerator$1<$$a>(s);

int SetTreeModule_compareStacks<$T>(types.IComparer<$T> comparer_mut, list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> l1_mut, list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> l2_mut) {
    SetTreeModule_compareStacks:
    while (true) {
        final comparer = comparer_mut;
        final l1 = l1_mut;
        final l2 = l2_mut;
        if (!(list.isEmpty(l1))) {
            if (!(list.isEmpty(l2))) {
                if (list.head(l2) != null) {
                    if (list.head(l1) != null) {
                        if (types.value(list.head(l1)) is SetTreeNode$1<$T>) {
                            final x1n_2 = types.value(list.head(l1)) as SetTreeNode$1<$T>;
                            if (SetTreeNode$1__get_Left<$T>(x1n_2) == null) {
                                if (types.value(list.head(l2)) is SetTreeNode$1<$T>) {
                                    final x2n_2 = types.value(list.head(l2)) as SetTreeNode$1<$T>;
                                    if (SetTreeNode$1__get_Left<$T>(x2n_2) == null) {
                                        final c = comparer.Compare(SetTreeLeaf$1__get_Key<$T>(x1n_2), SetTreeLeaf$1__get_Key<$T>(x2n_2));
                                        if (c != 0) {
                                            return c;
                                        } else {
                                            comparer_mut = comparer;
                                            l1_mut = list.cons(SetTreeNode$1__get_Right<$T>(x1n_2), list.tail(l1));
                                            l2_mut = list.cons(SetTreeNode$1__get_Right<$T>(x2n_2), list.tail(l2));
                                            continue SetTreeModule_compareStacks;
                                        }
                                    } else {
                                        late final int matchResult;
                                        late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t1_4;
                                        late final SetTreeLeaf$1<$T> x1_3;
                                        late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t2_4;
                                        late final SetTreeLeaf$1<$T> x2_3;
                                        if (!(list.isEmpty(l1))) {
                                            if (list.head(l1) != null) {
                                                matchResult = 0;
                                                t1_4 = list.tail(l1);
                                                x1_3 = types.value(list.head(l1));
                                            } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                                matchResult = 1;
                                                t2_4 = list.tail(l2);
                                                x2_3 = types.value(list.head(l2));
                                            } else {
                                                matchResult = 2;
                                            }
                                        } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                            matchResult = 1;
                                            t2_4 = list.tail(l2);
                                            x2_3 = types.value(list.head(l2));
                                        } else {
                                            matchResult = 2;
                                        }
                                        switch (matchResult) {
                                            case 0:
                                                if (x1_3 is SetTreeNode$1<$T>) {
                                                    final x1n_3 = x1_3;
                                                    comparer_mut = comparer;
                                                    l1_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x1n_3), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1n_3), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x1n_3), 0))], t1_4);
                                                    l2_mut = l2;
                                                    continue SetTreeModule_compareStacks;
                                                } else {
                                                    comparer_mut = comparer;
                                                    l1_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1_3)))], t1_4);
                                                    l2_mut = l2;
                                                    continue SetTreeModule_compareStacks;
                                                }
                                            case 1:
                                                if (x2_3 is SetTreeNode$1<$T>) {
                                                    final x2n_3 = x2_3;
                                                    comparer_mut = comparer;
                                                    l1_mut = l1;
                                                    l2_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x2n_3), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2n_3), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x2n_3), 0))], t2_4);
                                                    continue SetTreeModule_compareStacks;
                                                } else {
                                                    comparer_mut = comparer;
                                                    l1_mut = l1;
                                                    l2_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2_3)))], t2_4);
                                                    continue SetTreeModule_compareStacks;
                                                }
                                            default:
                                                return throw Exception('unexpected state in SetTree.compareStacks');
                                        }
                                    }
                                } else {
                                    final c_1 = comparer.Compare(SetTreeLeaf$1__get_Key<$T>(x1n_2), SetTreeLeaf$1__get_Key<$T>(types.value(list.head(l2))));
                                    if (c_1 != 0) {
                                        return c_1;
                                    } else {
                                        comparer_mut = comparer;
                                        l1_mut = list.cons(SetTreeNode$1__get_Right<$T>(x1n_2), list.tail(l1));
                                        l2_mut = list.cons(SetTreeModule_empty<$T>(), list.tail(l2));
                                        continue SetTreeModule_compareStacks;
                                    }
                                }
                            } else {
                                late final int matchResult_1;
                                late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t1_5;
                                late final SetTreeLeaf$1<$T> x1_4;
                                late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t2_5;
                                late final SetTreeLeaf$1<$T> x2_4;
                                if (!(list.isEmpty(l1))) {
                                    if (list.head(l1) != null) {
                                        matchResult_1 = 0;
                                        t1_5 = list.tail(l1);
                                        x1_4 = types.value(list.head(l1));
                                    } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                        matchResult_1 = 1;
                                        t2_5 = list.tail(l2);
                                        x2_4 = types.value(list.head(l2));
                                    } else {
                                        matchResult_1 = 2;
                                    }
                                } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                    matchResult_1 = 1;
                                    t2_5 = list.tail(l2);
                                    x2_4 = types.value(list.head(l2));
                                } else {
                                    matchResult_1 = 2;
                                }
                                switch (matchResult_1) {
                                    case 0:
                                        if (x1_4 is SetTreeNode$1<$T>) {
                                            final x1n_4 = x1_4;
                                            comparer_mut = comparer;
                                            l1_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x1n_4), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1n_4), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x1n_4), 0))], t1_5);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        } else {
                                            comparer_mut = comparer;
                                            l1_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1_4)))], t1_5);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        }
                                    case 1:
                                        if (x2_4 is SetTreeNode$1<$T>) {
                                            final x2n_4 = x2_4;
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x2n_4), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2n_4), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x2n_4), 0))], t2_5);
                                            continue SetTreeModule_compareStacks;
                                        } else {
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2_4)))], t2_5);
                                            continue SetTreeModule_compareStacks;
                                        }
                                    default:
                                        return throw Exception('unexpected state in SetTree.compareStacks');
                                }
                            }
                        } else if (types.value(list.head(l2)) is SetTreeNode$1<$T>) {
                            final x2n_5 = types.value(list.head(l2)) as SetTreeNode$1<$T>;
                            if (SetTreeNode$1__get_Left<$T>(x2n_5) == null) {
                                final c_2 = comparer.Compare(SetTreeLeaf$1__get_Key<$T>(types.value(list.head(l1))), SetTreeLeaf$1__get_Key<$T>(x2n_5));
                                if (c_2 != 0) {
                                    return c_2;
                                } else {
                                    comparer_mut = comparer;
                                    l1_mut = list.cons(SetTreeModule_empty<$T>(), list.tail(l1));
                                    l2_mut = list.cons(SetTreeNode$1__get_Right<$T>(x2n_5), list.tail(l2));
                                    continue SetTreeModule_compareStacks;
                                }
                            } else {
                                late final int matchResult_2;
                                late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t1_6;
                                late final SetTreeLeaf$1<$T> x1_5;
                                late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t2_6;
                                late final SetTreeLeaf$1<$T> x2_5;
                                if (!(list.isEmpty(l1))) {
                                    if (list.head(l1) != null) {
                                        matchResult_2 = 0;
                                        t1_6 = list.tail(l1);
                                        x1_5 = types.value(list.head(l1));
                                    } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                        matchResult_2 = 1;
                                        t2_6 = list.tail(l2);
                                        x2_5 = types.value(list.head(l2));
                                    } else {
                                        matchResult_2 = 2;
                                    }
                                } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                    matchResult_2 = 1;
                                    t2_6 = list.tail(l2);
                                    x2_5 = types.value(list.head(l2));
                                } else {
                                    matchResult_2 = 2;
                                }
                                switch (matchResult_2) {
                                    case 0:
                                        if (x1_5 is SetTreeNode$1<$T>) {
                                            final x1n_5 = x1_5;
                                            comparer_mut = comparer;
                                            l1_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x1n_5), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1n_5), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x1n_5), 0))], t1_6);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        } else {
                                            comparer_mut = comparer;
                                            l1_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1_5)))], t1_6);
                                            l2_mut = l2;
                                            continue SetTreeModule_compareStacks;
                                        }
                                    case 1:
                                        if (x2_5 is SetTreeNode$1<$T>) {
                                            final x2n_6 = x2_5;
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x2n_6), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2n_6), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x2n_6), 0))], t2_6);
                                            continue SetTreeModule_compareStacks;
                                        } else {
                                            comparer_mut = comparer;
                                            l1_mut = l1;
                                            l2_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2_5)))], t2_6);
                                            continue SetTreeModule_compareStacks;
                                        }
                                    default:
                                        return throw Exception('unexpected state in SetTree.compareStacks');
                                }
                            }
                        } else {
                            final c_3 = comparer.Compare(SetTreeLeaf$1__get_Key<$T>(types.value(list.head(l1))), SetTreeLeaf$1__get_Key<$T>(types.value(list.head(l2))));
                            if (c_3 != 0) {
                                return c_3;
                            } else {
                                comparer_mut = comparer;
                                l1_mut = list.tail(l1);
                                l2_mut = list.tail(l2);
                                continue SetTreeModule_compareStacks;
                            }
                        }
                    } else {
                        late final int matchResult_3;
                        late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t1_1;
                        late final SetTreeLeaf$1<$T> x1;
                        late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t2_1;
                        late final SetTreeLeaf$1<$T> x2;
                        if (!(list.isEmpty(l1))) {
                            if (list.head(l1) != null) {
                                matchResult_3 = 0;
                                t1_1 = list.tail(l1);
                                x1 = types.value(list.head(l1));
                            } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                                matchResult_3 = 1;
                                t2_1 = list.tail(l2);
                                x2 = types.value(list.head(l2));
                            } else {
                                matchResult_3 = 2;
                            }
                        } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                            matchResult_3 = 1;
                            t2_1 = list.tail(l2);
                            x2 = types.value(list.head(l2));
                        } else {
                            matchResult_3 = 2;
                        }
                        switch (matchResult_3) {
                            case 0:
                                if (x1 is SetTreeNode$1<$T>) {
                                    final x1n = x1;
                                    comparer_mut = comparer;
                                    l1_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x1n), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1n), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x1n), 0))], t1_1);
                                    l2_mut = l2;
                                    continue SetTreeModule_compareStacks;
                                } else {
                                    comparer_mut = comparer;
                                    l1_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1)))], t1_1);
                                    l2_mut = l2;
                                    continue SetTreeModule_compareStacks;
                                }
                            case 1:
                                if (x2 is SetTreeNode$1<$T>) {
                                    final x2n = x2;
                                    comparer_mut = comparer;
                                    l1_mut = l1;
                                    l2_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x2n), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2n), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x2n), 0))], t2_1);
                                    continue SetTreeModule_compareStacks;
                                } else {
                                    comparer_mut = comparer;
                                    l1_mut = l1;
                                    l2_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2)))], t2_1);
                                    continue SetTreeModule_compareStacks;
                                }
                            default:
                                return throw Exception('unexpected state in SetTree.compareStacks');
                        }
                    }
                } else if (list.head(l1) != null) {
                    late final int matchResult_4;
                    late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t1_2;
                    late final SetTreeLeaf$1<$T> x1_1;
                    late final list.FSharpList<types.Some<SetTreeLeaf$1<$T>>?> t2_2;
                    late final SetTreeLeaf$1<$T> x2_1;
                    if (!(list.isEmpty(l1))) {
                        if (list.head(l1) != null) {
                            matchResult_4 = 0;
                            t1_2 = list.tail(l1);
                            x1_1 = types.value(list.head(l1));
                        } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                            matchResult_4 = 1;
                            t2_2 = list.tail(l2);
                            x2_1 = types.value(list.head(l2));
                        } else {
                            matchResult_4 = 2;
                        }
                    } else if (!(list.isEmpty(l2)) && (list.head(l2) != null)) {
                        matchResult_4 = 1;
                        t2_2 = list.tail(l2);
                        x2_1 = types.value(list.head(l2));
                    } else {
                        matchResult_4 = 2;
                    }
                    switch (matchResult_4) {
                        case 0:
                            if (x1_1 is SetTreeNode$1<$T>) {
                                final x1n_1 = x1_1;
                                comparer_mut = comparer;
                                l1_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x1n_1), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1n_1), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x1n_1), 0))], t1_2);
                                l2_mut = l2;
                                continue SetTreeModule_compareStacks;
                            } else {
                                comparer_mut = comparer;
                                l1_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x1_1)))], t1_2);
                                l2_mut = l2;
                                continue SetTreeModule_compareStacks;
                            }
                        case 1:
                            if (x2_1 is SetTreeNode$1<$T>) {
                                final x2n_1 = x2_1;
                                comparer_mut = comparer;
                                l1_mut = l1;
                                l2_mut = list.ofArrayWithTail([SetTreeNode$1__get_Left<$T>(x2n_1), types.Some(SetTreeNode$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2n_1), SetTreeModule_empty<$T>(), SetTreeNode$1__get_Right<$T>(x2n_1), 0))], t2_2);
                                continue SetTreeModule_compareStacks;
                            } else {
                                comparer_mut = comparer;
                                l1_mut = l1;
                                l2_mut = list.ofArrayWithTail([SetTreeModule_empty<$T>(), types.Some(SetTreeLeaf$1<$T>(SetTreeLeaf$1__get_Key<$T>(x2_1)))], t2_2);
                                continue SetTreeModule_compareStacks;
                            }
                        default:
                            return throw Exception('unexpected state in SetTree.compareStacks');
                    }
                } else {
                    comparer_mut = comparer;
                    l1_mut = list.tail(l1);
                    l2_mut = list.tail(l2);
                    continue SetTreeModule_compareStacks;
                }
            } else {
                return 1;
            }
        } else if (list.isEmpty(l2)) {
            return 0;
        } else {
            return -1;
        }
    }
}

int SetTreeModule_compare<$T>(types.IComparer<$T> comparer, types.Some<SetTreeLeaf$1<$T>>? t1, types.Some<SetTreeLeaf$1<$T>>? t2) {
    if (t1 == null) {
        if (t2 == null) {
            return 0;
        } else {
            return -1;
        }
    } else if (t2 == null) {
        return 1;
    } else {
        return SetTreeModule_compareStacks<$T>(comparer, list.singleton(t1), list.singleton(t2));
    }
}

$$a SetTreeModule_choose<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) => SetTreeModule_minimumElement<$$a>(s);

list.FSharpList<$T> SetTreeModule_toList<$T>(types.Some<SetTreeLeaf$1<$T>>? t) {
    list.FSharpList<$T> loop(types.Some<SetTreeLeaf$1<$T>>? t$0027_mut, list.FSharpList<$T> acc_mut) {
        loop:
        while (true) {
            final types.Some<SetTreeLeaf$1<$T>>? t$0027 = t$0027_mut;
            final acc = acc_mut;
            if (t$0027 != null) {
                final t2 = types.value(t$0027);
                if (t2 is SetTreeNode$1<$T>) {
                    final tn = t2;
                    t$0027_mut = SetTreeNode$1__get_Left<$T>(tn);
                    acc_mut = list.cons(SetTreeLeaf$1__get_Key<$T>(tn), loop(SetTreeNode$1__get_Right<$T>(tn), acc));
                    continue loop;
                } else {
                    return list.cons(SetTreeLeaf$1__get_Key<$T>(t2), acc);
                }
            } else {
                return acc;
            }
        }
    }
    return loop(t, list.empty<$T>());
}

void SetTreeModule_copyToArray<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s, List<$$a> arr, int i) {
    var j = i;
    SetTreeModule_iter<$$a>(($$a x) {
        arr[j] = x;
        j = j + 1;
    }, s);
}

List<$$a> SetTreeModule_toArray<$$a>(types.Some<SetTreeLeaf$1<$$a>>? s) {
    final n = SetTreeModule_count<$$a>(s);
    final e = SetTreeModule_mkIEnumerator<$$a>(s);
    return List.generate(n, ((int _arg) {
        e.moveNext();
        return e.current;
    }), growable: false);
}

types.Some<SetTreeLeaf$1<$$a>>? SetTreeModule_mkFromEnumerator<$$a>(types.IComparer<$$a> comparer_mut, types.Some<SetTreeLeaf$1<$$a>>? acc_mut, Iterator<$$a> e_mut) {
    SetTreeModule_mkFromEnumerator:
    while (true) {
        final comparer = comparer_mut;
        final types.Some<SetTreeLeaf$1<$$a>>? acc = acc_mut;
        final e = e_mut;
        if (e.moveNext()) {
            comparer_mut = comparer;
            acc_mut = SetTreeModule_add<$$a>(comparer, e.current, acc);
            e_mut = e;
            continue SetTreeModule_mkFromEnumerator;
        } else {
            return acc;
        }
    }
}

types.Some<SetTreeLeaf$1<$a>>? SetTreeModule_ofArray<$a>(types.IComparer<$a> comparer, List<$a> l) => array_1.fold<$a, types.Some<SetTreeLeaf$1<$a>>?>((types.Some<SetTreeLeaf$1<$a>>? acc, $a k) => SetTreeModule_add<$a>(comparer, k, acc), SetTreeModule_empty<$a>(), l);

types.Some<SetTreeLeaf$1<$a>>? SetTreeModule_ofList<$a>(types.IComparer<$a> comparer, list.FSharpList<$a> l) => list.fold<$a, types.Some<SetTreeLeaf$1<$a>>?>((types.Some<SetTreeLeaf$1<$a>>? acc, $a k) => SetTreeModule_add<$a>(comparer, k, acc), SetTreeModule_empty<$a>(), l);

types.Some<SetTreeLeaf$1<$T>>? SetTreeModule_ofSeq<$T>(types.IComparer<$T> comparer, Iterable<$T> c) {
    if (c is List<$T>) {
        return SetTreeModule_ofArray<$T>(comparer, c);
    } else if (c is list.FSharpList<$T>) {
        return SetTreeModule_ofList<$T>(comparer, c);
    } else {
        final ie = c.iterator;
        try {
            return SetTreeModule_mkFromEnumerator<$T>(comparer, SetTreeModule_empty<$T>(), ie);
        } finally {
            if (ie is types.IDisposable) {
                types.dispose(ie);
            }
        }
    }
}

class FSharpSet<$T> extends Iterable<$T> implements Comparable<FSharpSet<$T>> {
    final types.Some<SetTreeLeaf$1<$T>>? tree;
    final types.IComparer<$T> comparer;
    FSharpSet(this.comparer, this.tree): super();
    @override
    int get hashCode => FSharpSet__ComputeHashCode<$T>(this);
    @override
    bool operator ==(dynamic that) {
        if (that is FSharpSet<$T>) {
            final that_1 = that;
            return SetTreeModule_compare<$T>(FSharpSet__get_Comparer<$T>(this), FSharpSet__get_Tree<$T>(this), FSharpSet__get_Tree<$T>(that_1)) == 0;
        } else {
            return false;
        }
    }
    @override
    String toString() {
        final strings = seq.map<$T, String>(($T x) {
            var copyOfStruct = x;
            return copyOfStruct.toString();
        }, this);
        return ('set [' + strings.join('; ')) + ']';
    }
    @override
    Iterator<$T> get iterator => SetTreeModule_mkIEnumerator<$T>(FSharpSet__get_Tree<$T>(this));
    @override
    int compareTo(FSharpSet<$T> that) => SetTreeModule_compare<$T>(FSharpSet__get_Comparer<$T>(this), FSharpSet__get_Tree<$T>(this), FSharpSet__get_Tree<$T>(that));
}

types.IComparer<$T> FSharpSet__get_Comparer<$T>(FSharpSet<$T> set$) => set$.comparer;

types.Some<SetTreeLeaf$1<$T>>? FSharpSet__get_Tree<$T>(FSharpSet<$T> set$) => set$.tree;

FSharpSet<$T> FSharpSet_Empty<$T>(types.IComparer<$T> comparer) => FSharpSet<$T>(comparer, SetTreeModule_empty<$T>());

FSharpSet<$T> FSharpSet__Add<$T>(FSharpSet<$T> s, $T value) => FSharpSet<$T>(FSharpSet__get_Comparer<$T>(s), SetTreeModule_add<$T>(FSharpSet__get_Comparer<$T>(s), value, FSharpSet__get_Tree<$T>(s)));

FSharpSet<$T> FSharpSet__Remove<$T>(FSharpSet<$T> s, $T value) => FSharpSet<$T>(FSharpSet__get_Comparer<$T>(s), SetTreeModule_remove<$T>(FSharpSet__get_Comparer<$T>(s), value, FSharpSet__get_Tree<$T>(s)));

int FSharpSet__get_Count<$T>(FSharpSet<$T> s) => SetTreeModule_count<$T>(FSharpSet__get_Tree<$T>(s));

bool FSharpSet__Contains<$T>(FSharpSet<$T> s, $T value) => SetTreeModule_mem<$T>(FSharpSet__get_Comparer<$T>(s), value, FSharpSet__get_Tree<$T>(s));

void FSharpSet__Iterate<$T>(FSharpSet<$T> s, void Function($T) x) {
    SetTreeModule_iter<$T>(x, FSharpSet__get_Tree<$T>(s));
}

$$a FSharpSet__Fold<$T, $$a>(FSharpSet<$T> s, $$a Function($T, $$a) f, $$a z) => SetTreeModule_fold<$$a, $T>(($$a x, $T z_1) => f(z_1, x), z, FSharpSet__get_Tree<$T>(s));

bool FSharpSet__get_IsEmpty<$T>(FSharpSet<$T> s) => FSharpSet__get_Tree<$T>(s) == null;

types.Tuple2<FSharpSet<$T>, FSharpSet<$T>> FSharpSet__Partition<$T>(FSharpSet<$T> s, bool Function($T) f) {
    if (FSharpSet__get_Tree<$T>(s) == null) {
        return types.Tuple2(s, s);
    } else {
        final patternInput = SetTreeModule_partition<$T>(FSharpSet__get_Comparer<$T>(s), f, FSharpSet__get_Tree<$T>(s));
        return types.Tuple2(FSharpSet<$T>(FSharpSet__get_Comparer<$T>(s), patternInput.item1), FSharpSet<$T>(FSharpSet__get_Comparer<$T>(s), patternInput.item2));
    }
}

FSharpSet<$T> FSharpSet__Filter<$T>(FSharpSet<$T> s, bool Function($T) f) {
    if (FSharpSet__get_Tree<$T>(s) == null) {
        return s;
    } else {
        return FSharpSet<$T>(FSharpSet__get_Comparer<$T>(s), SetTreeModule_filter<$T>(FSharpSet__get_Comparer<$T>(s), f, FSharpSet__get_Tree<$T>(s)));
    }
}

FSharpSet<$U> FSharpSet__Map<$T, $U>(FSharpSet<$T> s, $U Function($T) f, types.IComparer<$U> comparer) => FSharpSet<$U>(comparer, SetTreeModule_fold<types.Some<SetTreeLeaf$1<$U>>?, $T>((types.Some<SetTreeLeaf$1<$U>>? acc, $T k) => SetTreeModule_add<$U>(comparer, f(k), acc), SetTreeModule_empty<$U>(), FSharpSet__get_Tree<$T>(s)));

bool FSharpSet__Exists<$T>(FSharpSet<$T> s, bool Function($T) f) => SetTreeModule_exists<$T>(f, FSharpSet__get_Tree<$T>(s));

bool FSharpSet__ForAll<$T>(FSharpSet<$T> s, bool Function($T) f) => SetTreeModule_forall<$T>(f, FSharpSet__get_Tree<$T>(s));

FSharpSet<$T> FSharpSet_op_Subtraction<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) {
    if (FSharpSet__get_Tree<$T>(set1) == null) {
        return set1;
    } else if (FSharpSet__get_Tree<$T>(set2) == null) {
        return set1;
    } else {
        return FSharpSet<$T>(FSharpSet__get_Comparer<$T>(set1), SetTreeModule_diff<$T>(FSharpSet__get_Comparer<$T>(set1), FSharpSet__get_Tree<$T>(set1), FSharpSet__get_Tree<$T>(set2)));
    }
}

FSharpSet<$T> FSharpSet_op_Addition<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) {
    if (FSharpSet__get_Tree<$T>(set2) == null) {
        return set1;
    } else if (FSharpSet__get_Tree<$T>(set1) == null) {
        return set2;
    } else {
        return FSharpSet<$T>(FSharpSet__get_Comparer<$T>(set1), SetTreeModule_union<$T>(FSharpSet__get_Comparer<$T>(set1), FSharpSet__get_Tree<$T>(set1), FSharpSet__get_Tree<$T>(set2)));
    }
}

FSharpSet<$T> FSharpSet_Intersection<$T>(FSharpSet<$T> a, FSharpSet<$T> b) {
    if (FSharpSet__get_Tree<$T>(b) == null) {
        return b;
    } else if (FSharpSet__get_Tree<$T>(a) == null) {
        return a;
    } else {
        return FSharpSet<$T>(FSharpSet__get_Comparer<$T>(a), SetTreeModule_intersection<$T>(FSharpSet__get_Comparer<$T>(a), FSharpSet__get_Tree<$T>(a), FSharpSet__get_Tree<$T>(b)));
    }
}

FSharpSet<$T> FSharpSet_IntersectionMany<$T>(Iterable<FSharpSet<$T>> sets) => seq.reduce<FSharpSet<$T>>((FSharpSet<$T> s1, FSharpSet<$T> s2) => FSharpSet_Intersection<$T>(s1, s2), sets);

bool FSharpSet_Equality<$T>(FSharpSet<$T> a, FSharpSet<$T> b) => SetTreeModule_compare<$T>(FSharpSet__get_Comparer<$T>(a), FSharpSet__get_Tree<$T>(a), FSharpSet__get_Tree<$T>(b)) == 0;

int FSharpSet_Compare<$T>(FSharpSet<$T> a, FSharpSet<$T> b) => SetTreeModule_compare<$T>(FSharpSet__get_Comparer<$T>(a), FSharpSet__get_Tree<$T>(a), FSharpSet__get_Tree<$T>(b));

$T FSharpSet__get_Choose<$T>(FSharpSet<$T> x) => SetTreeModule_choose<$T>(FSharpSet__get_Tree<$T>(x));

$T FSharpSet__get_MinimumElement<$T>(FSharpSet<$T> x) => SetTreeModule_minimumElement<$T>(FSharpSet__get_Tree<$T>(x));

$T FSharpSet__get_MaximumElement<$T>(FSharpSet<$T> x) => SetTreeModule_maximumElement<$T>(FSharpSet__get_Tree<$T>(x));

bool FSharpSet__IsSubsetOf<$T>(FSharpSet<$T> x, FSharpSet<$T> otherSet) => SetTreeModule_subset<$T>(FSharpSet__get_Comparer<$T>(x), FSharpSet__get_Tree<$T>(x), FSharpSet__get_Tree<$T>(otherSet));

bool FSharpSet__IsSupersetOf<$T>(FSharpSet<$T> x, FSharpSet<$T> otherSet) => SetTreeModule_subset<$T>(FSharpSet__get_Comparer<$T>(x), FSharpSet__get_Tree<$T>(otherSet), FSharpSet__get_Tree<$T>(x));

bool FSharpSet__IsProperSubsetOf<$T>(FSharpSet<$T> x, FSharpSet<$T> otherSet) => SetTreeModule_properSubset<$T>(FSharpSet__get_Comparer<$T>(x), FSharpSet__get_Tree<$T>(x), FSharpSet__get_Tree<$T>(otherSet));

bool FSharpSet__IsProperSupersetOf<$T>(FSharpSet<$T> x, FSharpSet<$T> otherSet) => SetTreeModule_properSubset<$T>(FSharpSet__get_Comparer<$T>(x), FSharpSet__get_Tree<$T>(otherSet), FSharpSet__get_Tree<$T>(x));

list.FSharpList<$T> FSharpSet__ToList<$T>(FSharpSet<$T> x) => SetTreeModule_toList<$T>(FSharpSet__get_Tree<$T>(x));

List<$T> FSharpSet__ToArray<$T>(FSharpSet<$T> x) => SetTreeModule_toArray<$T>(FSharpSet__get_Tree<$T>(x));

int FSharpSet__ComputeHashCode<$T>(FSharpSet<$T> this$) {
    var res = 0;
    final enumerator = this$.iterator;
    try {
        while (enumerator.moveNext()) {
            final x_1 = enumerator.current;
            res = ((res << 1) + x_1.hashCode) + 631;
        }
    } finally {
        if (enumerator is types.IDisposable) {
            types.dispose(enumerator);
        }
    }
    return res.abs();
}

bool isEmpty<$T>(FSharpSet<$T> set$) => FSharpSet__get_IsEmpty<$T>(set$);

bool contains<$T>($T element, FSharpSet<$T> set$) => FSharpSet__Contains<$T>(set$, element);

FSharpSet<$T> add<$T>($T value, FSharpSet<$T> set$) => FSharpSet__Add<$T>(set$, value);

FSharpSet<$T> singleton<$T>($T value, types.IComparer<$T> comparer) => FSharpSet__Add<$T>(FSharpSet_Empty<$T>(comparer), value);

FSharpSet<$T> remove<$T>($T value, FSharpSet<$T> set$) => FSharpSet__Remove<$T>(set$, value);

FSharpSet<$T> union<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => FSharpSet_op_Addition<$T>(set1, set2);

FSharpSet<$T> unionMany<$T>(Iterable<FSharpSet<$T>> sets, types.IComparer<$T> comparer) => seq.fold<FSharpSet<$T>, FSharpSet<$T>>((FSharpSet<$T> x, FSharpSet<$T> y) => FSharpSet_op_Addition<$T>(x, y), FSharpSet_Empty<$T>(comparer), sets);

FSharpSet<$T> intersect<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => FSharpSet_Intersection<$T>(set1, set2);

FSharpSet<$T> intersectMany<$T>(Iterable<FSharpSet<$T>> sets) => FSharpSet_IntersectionMany<$T>(sets);

void iterate<$T>(void Function($T) action, FSharpSet<$T> set$) {
    FSharpSet__Iterate<$T>(set$, action);
}

FSharpSet<$T> empty<$T>(types.IComparer<$T> comparer) => FSharpSet_Empty<$T>(comparer);

bool forAll<$T>(bool Function($T) predicate, FSharpSet<$T> set$) => FSharpSet__ForAll<$T>(set$, predicate);

bool exists<$T>(bool Function($T) predicate, FSharpSet<$T> set$) => FSharpSet__Exists<$T>(set$, predicate);

FSharpSet<$T> filter<$T>(bool Function($T) predicate, FSharpSet<$T> set$) => FSharpSet__Filter<$T>(set$, predicate);

types.Tuple2<FSharpSet<$T>, FSharpSet<$T>> partition<$T>(bool Function($T) predicate, FSharpSet<$T> set$) => FSharpSet__Partition<$T>(set$, predicate);

$State fold<$T, $State>($State Function($State, $T) folder, $State state, FSharpSet<$T> set$) => SetTreeModule_fold<$State, $T>(folder, state, FSharpSet__get_Tree<$T>(set$));

$State foldBack<$T, $State>($State Function($T, $State) folder, FSharpSet<$T> set$, $State state) => SetTreeModule_foldBack<$T, $State>(folder, FSharpSet__get_Tree<$T>(set$), state);

FSharpSet<$U> map<$T, $U>($U Function($T) mapping, FSharpSet<$T> set$, types.IComparer<$U> comparer) => FSharpSet__Map<$T, $U>(set$, mapping, comparer);

int count<$T>(FSharpSet<$T> set$) => FSharpSet__get_Count<$T>(set$);

FSharpSet<$T> ofList<$T>(Iterable<$T> elements, types.IComparer<$T> comparer) => FSharpSet<$T>(comparer, SetTreeModule_ofSeq<$T>(comparer, elements));

FSharpSet<$T> ofArray<$T>(List<$T> array, types.IComparer<$T> comparer) => FSharpSet<$T>(comparer, SetTreeModule_ofArray<$T>(comparer, array));

list.FSharpList<$T> toList<$T>(FSharpSet<$T> set$) => FSharpSet__ToList<$T>(set$);

List<$T> toArray<$T>(FSharpSet<$T> set$) => FSharpSet__ToArray<$T>(set$);

Iterable<$T> toSeq<$T>(FSharpSet<$T> set$) => seq.map<$T, $T>(($T x) => x, set$);

FSharpSet<$T> ofSeq<$T>(Iterable<$T> elements, types.IComparer<$T> comparer) => FSharpSet<$T>(comparer, SetTreeModule_ofSeq<$T>(comparer, elements));

FSharpSet<$T> difference<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => FSharpSet_op_Subtraction<$T>(set1, set2);

bool isSubset<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => SetTreeModule_subset<$T>(FSharpSet__get_Comparer<$T>(set1), FSharpSet__get_Tree<$T>(set1), FSharpSet__get_Tree<$T>(set2));

bool isSuperset<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => SetTreeModule_subset<$T>(FSharpSet__get_Comparer<$T>(set1), FSharpSet__get_Tree<$T>(set2), FSharpSet__get_Tree<$T>(set1));

bool isProperSubset<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => SetTreeModule_properSubset<$T>(FSharpSet__get_Comparer<$T>(set1), FSharpSet__get_Tree<$T>(set1), FSharpSet__get_Tree<$T>(set2));

bool isProperSuperset<$T>(FSharpSet<$T> set1, FSharpSet<$T> set2) => SetTreeModule_properSubset<$T>(FSharpSet__get_Comparer<$T>(set1), FSharpSet__get_Tree<$T>(set2), FSharpSet__get_Tree<$T>(set1));

$T minElement<$T>(FSharpSet<$T> set$) => FSharpSet__get_MinimumElement<$T>(set$);

$T maxElement<$T>(FSharpSet<$T> set$) => FSharpSet__get_MaximumElement<$T>(set$);

