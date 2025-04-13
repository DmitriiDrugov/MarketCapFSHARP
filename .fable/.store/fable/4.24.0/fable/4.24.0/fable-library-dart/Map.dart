// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Array.dart' as array_1;
import './List.dart' as list;
import './Seq.dart' as seq;
import './Types.dart' as types;
import './Util.dart' as util;

class MapTreeLeaf$2<$Key, $Value> {
    final $Value v;
    final $Key k;
    MapTreeLeaf$2(this.k, this.v);
}

$Key MapTreeLeaf$2__get_Key<$Key, $Value>(MapTreeLeaf$2<$Key, $Value> _) => _.k;

$Value MapTreeLeaf$2__get_Value<$Key, $Value>(MapTreeLeaf$2<$Key, $Value> _) => _.v;

class MapTreeNode$2<$Key, $Value> extends MapTreeLeaf$2<$Key, $Value> {
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? right;
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? left;
    final int h;
    MapTreeNode$2($Key k, $Value v, this.left, this.right, this.h): super(k, v);
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeNode$2__get_Left<$Key, $Value>(MapTreeNode$2<$Key, $Value> _) => _.left;

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeNode$2__get_Right<$Key, $Value>(MapTreeNode$2<$Key, $Value> _) => _.right;

int MapTreeNode$2__get_Height<$Key, $Value>(MapTreeNode$2<$Key, $Value> _) => _.h;

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_empty<$Key, $Value>() => null;

int MapTreeModule_sizeAux<$Key, $Value>(int acc_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_sizeAux:
    while (true) {
        final acc = acc_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                acc_mut = MapTreeModule_sizeAux<$Key, $Value>(acc + 1, MapTreeNode$2__get_Left<$Key, $Value>(mn));
                m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                continue MapTreeModule_sizeAux;
            } else {
                return acc + 1;
            }
        } else {
            return acc;
        }
    }
}

int MapTreeModule_size<$$a, $$b>(types.Some<MapTreeLeaf$2<$$a, $$b>>? x) => MapTreeModule_sizeAux<$$a, $$b>(0, x);

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_mk<$Key, $Value>(types.Some<MapTreeLeaf$2<$Key, $Value>>? l, $Key k, $Value v, types.Some<MapTreeLeaf$2<$Key, $Value>>? r) {
    late final int hl;
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = l;
    if (m != null) {
        final m2 = types.value(m);
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            hl = MapTreeNode$2__get_Height<$Key, $Value>(mn);
        } else {
            hl = 1;
        }
    } else {
        hl = 0;
    }
    late final int hr;
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? m_1 = r;
    if (m_1 != null) {
        final m2_1 = types.value(m_1);
        if (m2_1 is MapTreeNode$2<$Key, $Value>) {
            final mn_1 = m2_1;
            hr = MapTreeNode$2__get_Height<$Key, $Value>(mn_1);
        } else {
            hr = 1;
        }
    } else {
        hr = 0;
    }
    final m_2 = (hl < hr) ? hr : hl;
    if (m_2 == 0) {
        return types.Some(MapTreeLeaf$2<$Key, $Value>(k, v));
    } else {
        return types.Some(MapTreeNode$2<$Key, $Value>(k, v, l, r, m_2 + 1));
    }
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_rebalance<$Key, $Value>(types.Some<MapTreeLeaf$2<$Key, $Value>>? t1, $Key k, $Value v, types.Some<MapTreeLeaf$2<$Key, $Value>>? t2) {
    late final int t1h;
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = t1;
    if (m != null) {
        final m2 = types.value(m);
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            t1h = MapTreeNode$2__get_Height<$Key, $Value>(mn);
        } else {
            t1h = 1;
        }
    } else {
        t1h = 0;
    }
    late final int t2h;
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? m_1 = t2;
    if (m_1 != null) {
        final m2_1 = types.value(m_1);
        if (m2_1 is MapTreeNode$2<$Key, $Value>) {
            final mn_1 = m2_1;
            t2h = MapTreeNode$2__get_Height<$Key, $Value>(mn_1);
        } else {
            t2h = 1;
        }
    } else {
        t2h = 0;
    }
    if (t2h > (t1h + 2)) {
        final matchValue = types.value(t2);
        if (matchValue is MapTreeNode$2<$Key, $Value>) {
            final t2$0027 = matchValue;
            final types.Some<MapTreeLeaf$2<$Key, $Value>>? m_2 = MapTreeNode$2__get_Left<$Key, $Value>(t2$0027);
            late final int tmp_capture;
            if (m_2 != null) {
                final m2_2 = types.value(m_2);
                if (m2_2 is MapTreeNode$2<$Key, $Value>) {
                    final mn_2 = m2_2;
                    tmp_capture = MapTreeNode$2__get_Height<$Key, $Value>(mn_2);
                } else {
                    tmp_capture = 1;
                }
            } else {
                tmp_capture = 0;
            }
            if (tmp_capture > (t1h + 1)) {
                final matchValue_1 = types.value(MapTreeNode$2__get_Left<$Key, $Value>(t2$0027));
                if (matchValue_1 is MapTreeNode$2<$Key, $Value>) {
                    final t2l = matchValue_1;
                    return MapTreeModule_mk<$Key, $Value>(MapTreeModule_mk<$Key, $Value>(t1, k, v, MapTreeNode$2__get_Left<$Key, $Value>(t2l)), MapTreeLeaf$2__get_Key<$Key, $Value>(t2l), MapTreeLeaf$2__get_Value<$Key, $Value>(t2l), MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Right<$Key, $Value>(t2l), MapTreeLeaf$2__get_Key<$Key, $Value>(t2$0027), MapTreeLeaf$2__get_Value<$Key, $Value>(t2$0027), MapTreeNode$2__get_Right<$Key, $Value>(t2$0027)));
                } else {
                    return throw Exception('internal error: Map.rebalance');
                }
            } else {
                return MapTreeModule_mk<$Key, $Value>(MapTreeModule_mk<$Key, $Value>(t1, k, v, MapTreeNode$2__get_Left<$Key, $Value>(t2$0027)), MapTreeLeaf$2__get_Key<$Key, $Value>(t2$0027), MapTreeLeaf$2__get_Value<$Key, $Value>(t2$0027), MapTreeNode$2__get_Right<$Key, $Value>(t2$0027));
            }
        } else {
            return throw Exception('internal error: Map.rebalance');
        }
    } else if (t1h > (t2h + 2)) {
        final matchValue_2 = types.value(t1);
        if (matchValue_2 is MapTreeNode$2<$Key, $Value>) {
            final t1$0027 = matchValue_2;
            final types.Some<MapTreeLeaf$2<$Key, $Value>>? m_3 = MapTreeNode$2__get_Right<$Key, $Value>(t1$0027);
            late final int tmp_capture_1;
            if (m_3 != null) {
                final m2_3 = types.value(m_3);
                if (m2_3 is MapTreeNode$2<$Key, $Value>) {
                    final mn_3 = m2_3;
                    tmp_capture_1 = MapTreeNode$2__get_Height<$Key, $Value>(mn_3);
                } else {
                    tmp_capture_1 = 1;
                }
            } else {
                tmp_capture_1 = 0;
            }
            if (tmp_capture_1 > (t2h + 1)) {
                final matchValue_3 = types.value(MapTreeNode$2__get_Right<$Key, $Value>(t1$0027));
                if (matchValue_3 is MapTreeNode$2<$Key, $Value>) {
                    final t1r = matchValue_3;
                    return MapTreeModule_mk<$Key, $Value>(MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(t1$0027), MapTreeLeaf$2__get_Key<$Key, $Value>(t1$0027), MapTreeLeaf$2__get_Value<$Key, $Value>(t1$0027), MapTreeNode$2__get_Left<$Key, $Value>(t1r)), MapTreeLeaf$2__get_Key<$Key, $Value>(t1r), MapTreeLeaf$2__get_Value<$Key, $Value>(t1r), MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Right<$Key, $Value>(t1r), k, v, t2));
                } else {
                    return throw Exception('internal error: Map.rebalance');
                }
            } else {
                return MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(t1$0027), MapTreeLeaf$2__get_Key<$Key, $Value>(t1$0027), MapTreeLeaf$2__get_Value<$Key, $Value>(t1$0027), MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Right<$Key, $Value>(t1$0027), k, v, t2));
            }
        } else {
            return throw Exception('internal error: Map.rebalance');
        }
    } else {
        return MapTreeModule_mk<$Key, $Value>(t1, k, v, t2);
    }
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_add<$Key, $Value>(types.IComparer<$Key> comparer, $Key k, $Value v, types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    if (m != null) {
        final m2 = types.value(m);
        final c = comparer.Compare(k, MapTreeLeaf$2__get_Key<$Key, $Value>(m2));
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            if (c < 0) {
                return MapTreeModule_rebalance<$Key, $Value>(MapTreeModule_add<$Key, $Value>(comparer, k, v, MapTreeNode$2__get_Left<$Key, $Value>(mn)), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn));
            } else if (c == 0) {
                return types.Some(MapTreeNode$2<$Key, $Value>(k, v, MapTreeNode$2__get_Left<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn), MapTreeNode$2__get_Height<$Key, $Value>(mn)));
            } else {
                return MapTreeModule_rebalance<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(mn), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeModule_add<$Key, $Value>(comparer, k, v, MapTreeNode$2__get_Right<$Key, $Value>(mn)));
            }
        } else if (c < 0) {
            return types.Some(MapTreeNode$2<$Key, $Value>(k, v, MapTreeModule_empty<$Key, $Value>(), m, 2));
        } else if (c == 0) {
            return types.Some(MapTreeLeaf$2<$Key, $Value>(k, v));
        } else {
            return types.Some(MapTreeNode$2<$Key, $Value>(k, v, m, MapTreeModule_empty<$Key, $Value>(), 2));
        }
    } else {
        return types.Some(MapTreeLeaf$2<$Key, $Value>(k, v));
    }
}

types.Some<$Value>? MapTreeModule_tryFind<$Key, $Value>(types.IComparer<$Key> comparer_mut, $Key k_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_tryFind:
    while (true) {
        final comparer = comparer_mut;
        final k = k_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            final c = comparer.Compare(k, MapTreeLeaf$2__get_Key<$Key, $Value>(m2));
            if (c == 0) {
                return types.Some(MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            } else if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                comparer_mut = comparer;
                k_mut = k;
                m_mut = (c < 0) ? MapTreeNode$2__get_Left<$Key, $Value>(mn) : MapTreeNode$2__get_Right<$Key, $Value>(mn);
                continue MapTreeModule_tryFind;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

$Value MapTreeModule_find<$Key, $Value>(types.IComparer<$Key> comparer, $Key k, types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    final types.Some<$Value>? matchValue = MapTreeModule_tryFind<$Key, $Value>(comparer, k, m);
    if (matchValue == null) {
        return throw Exception();
    } else {
        return types.value(matchValue);
    }
}

types.Tuple2<types.Some<MapTreeLeaf$2<$Key, $a>>?, types.Some<MapTreeLeaf$2<$Key, $a>>?> MapTreeModule_partition1<$Key, $a>(types.IComparer<$Key> comparer, bool Function($Key, $a) f, $Key k, $a v, types.Some<MapTreeLeaf$2<$Key, $a>>? _arg1_, types.Some<MapTreeLeaf$2<$Key, $a>>? _arg1__1) {
    final _arg = types.Tuple2(_arg1_, _arg1__1);
    final types.Some<MapTreeLeaf$2<$Key, $a>>? acc2 = _arg.item2;
    final types.Some<MapTreeLeaf$2<$Key, $a>>? acc1 = _arg.item1;
    if (f(k, v)) {
        return types.Tuple2(MapTreeModule_add<$Key, $a>(comparer, k, v, acc1), acc2);
    } else {
        return types.Tuple2(acc1, MapTreeModule_add<$Key, $a>(comparer, k, v, acc2));
    }
}

types.Tuple2<types.Some<MapTreeLeaf$2<$Key, $Value>>?, types.Some<MapTreeLeaf$2<$Key, $Value>>?> MapTreeModule_partitionAux<$Key, $Value>(types.IComparer<$Key> comparer_mut, bool Function($Key, $Value) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? acc__mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? acc__1_mut) {
    MapTreeModule_partitionAux:
    while (true) {
        final comparer = comparer_mut;
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? acc_ = acc__mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? acc__1 = acc__1_mut;
        final acc = types.Tuple2(acc_, acc__1);
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                final acc_1 = MapTreeModule_partitionAux<$Key, $Value>(comparer, f, MapTreeNode$2__get_Right<$Key, $Value>(mn), acc.item1, acc.item2);
                final acc_2 = MapTreeModule_partition1<$Key, $Value>(comparer, f, MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), acc_1.item1, acc_1.item2);
                comparer_mut = comparer;
                f_mut = f;
                m_mut = MapTreeNode$2__get_Left<$Key, $Value>(mn);
                acc__mut = acc_2.item1;
                acc__1_mut = acc_2.item2;
                continue MapTreeModule_partitionAux;
            } else {
                return MapTreeModule_partition1<$Key, $Value>(comparer, f, MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2), acc.item1, acc.item2);
            }
        } else {
            return acc;
        }
    }
}

types.Tuple2<types.Some<MapTreeLeaf$2<$Key, $a>>?, types.Some<MapTreeLeaf$2<$Key, $a>>?> MapTreeModule_partition<$Key, $a>(types.IComparer<$Key> comparer, bool Function($Key, $a) f, types.Some<MapTreeLeaf$2<$Key, $a>>? m) => MapTreeModule_partitionAux<$Key, $a>(comparer, f, m, MapTreeModule_empty<$Key, $a>(), MapTreeModule_empty<$Key, $a>());

types.Some<MapTreeLeaf$2<$Key, $a>>? MapTreeModule_filter1<$Key, $a>(types.IComparer<$Key> comparer, bool Function($Key, $a) f, $Key k, $a v, types.Some<MapTreeLeaf$2<$Key, $a>>? acc) {
    if (f(k, v)) {
        return MapTreeModule_add<$Key, $a>(comparer, k, v, acc);
    } else {
        return acc;
    }
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_filterAux<$Key, $Value>(types.IComparer<$Key> comparer_mut, bool Function($Key, $Value) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? acc_mut) {
    MapTreeModule_filterAux:
    while (true) {
        final comparer = comparer_mut;
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? acc = acc_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                final types.Some<MapTreeLeaf$2<$Key, $Value>>? acc_1 = MapTreeModule_filterAux<$Key, $Value>(comparer, f, MapTreeNode$2__get_Left<$Key, $Value>(mn), acc);
                final types.Some<MapTreeLeaf$2<$Key, $Value>>? acc_2 = MapTreeModule_filter1<$Key, $Value>(comparer, f, MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), acc_1);
                comparer_mut = comparer;
                f_mut = f;
                m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                acc_mut = acc_2;
                continue MapTreeModule_filterAux;
            } else {
                return MapTreeModule_filter1<$Key, $Value>(comparer, f, MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2), acc);
            }
        } else {
            return acc;
        }
    }
}

types.Some<MapTreeLeaf$2<$Key, $a>>? MapTreeModule_filter<$Key, $a>(types.IComparer<$Key> comparer, bool Function($Key, $a) f, types.Some<MapTreeLeaf$2<$Key, $a>>? m) => MapTreeModule_filterAux<$Key, $a>(comparer, f, m, MapTreeModule_empty<$Key, $a>());

types.Tuple3<$Key, $Value, types.Some<MapTreeLeaf$2<$Key, $Value>>?> MapTreeModule_spliceOutSuccessor<$Key, $Value>(types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    if (m != null) {
        final m2 = types.value(m);
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            if (MapTreeNode$2__get_Left<$Key, $Value>(mn) == null) {
                return types.Tuple3(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn));
            } else {
                final patternInput = MapTreeModule_spliceOutSuccessor<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(mn));
                return types.Tuple3(patternInput.item1, patternInput.item2, MapTreeModule_mk<$Key, $Value>(patternInput.item3, MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn)));
            }
        } else {
            return types.Tuple3(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2), MapTreeModule_empty<$Key, $Value>());
        }
    } else {
        return throw Exception('internal error: Map.spliceOutSuccessor');
    }
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_remove<$Key, $Value>(types.IComparer<$Key> comparer, $Key k, types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    if (m != null) {
        final m2 = types.value(m);
        final c = comparer.Compare(k, MapTreeLeaf$2__get_Key<$Key, $Value>(m2));
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            if (c < 0) {
                return MapTreeModule_rebalance<$Key, $Value>(MapTreeModule_remove<$Key, $Value>(comparer, k, MapTreeNode$2__get_Left<$Key, $Value>(mn)), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn));
            } else if (c == 0) {
                if (MapTreeNode$2__get_Left<$Key, $Value>(mn) == null) {
                    return MapTreeNode$2__get_Right<$Key, $Value>(mn);
                } else if (MapTreeNode$2__get_Right<$Key, $Value>(mn) == null) {
                    return MapTreeNode$2__get_Left<$Key, $Value>(mn);
                } else {
                    final patternInput = MapTreeModule_spliceOutSuccessor<$Key, $Value>(MapTreeNode$2__get_Right<$Key, $Value>(mn));
                    return MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(mn), patternInput.item1, patternInput.item2, patternInput.item3);
                }
            } else {
                return MapTreeModule_rebalance<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(mn), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeModule_remove<$Key, $Value>(comparer, k, MapTreeNode$2__get_Right<$Key, $Value>(mn)));
            }
        } else if (c == 0) {
            return MapTreeModule_empty<$Key, $Value>();
        } else {
            return m;
        }
    } else {
        return MapTreeModule_empty<$Key, $Value>();
    }
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_change<$Key, $Value>(types.IComparer<$Key> comparer, $Key k, types.Some<$Value>? Function(types.Some<$Value>?) u, types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    if (m != null) {
        final m2 = types.value(m);
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            final c = comparer.Compare(k, MapTreeLeaf$2__get_Key<$Key, $Value>(mn));
            if (c < 0) {
                return MapTreeModule_rebalance<$Key, $Value>(MapTreeModule_change<$Key, $Value>(comparer, k, u, MapTreeNode$2__get_Left<$Key, $Value>(mn)), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn));
            } else if (c == 0) {
                final types.Some<$Value>? matchValue_1 = u(types.Some(MapTreeLeaf$2__get_Value<$Key, $Value>(mn)));
                if (matchValue_1 != null) {
                    return types.Some(MapTreeNode$2<$Key, $Value>(k, types.value(matchValue_1), MapTreeNode$2__get_Left<$Key, $Value>(mn), MapTreeNode$2__get_Right<$Key, $Value>(mn), MapTreeNode$2__get_Height<$Key, $Value>(mn)));
                } else if (MapTreeNode$2__get_Left<$Key, $Value>(mn) == null) {
                    return MapTreeNode$2__get_Right<$Key, $Value>(mn);
                } else if (MapTreeNode$2__get_Right<$Key, $Value>(mn) == null) {
                    return MapTreeNode$2__get_Left<$Key, $Value>(mn);
                } else {
                    final patternInput = MapTreeModule_spliceOutSuccessor<$Key, $Value>(MapTreeNode$2__get_Right<$Key, $Value>(mn));
                    return MapTreeModule_mk<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(mn), patternInput.item1, patternInput.item2, patternInput.item3);
                }
            } else {
                return MapTreeModule_rebalance<$Key, $Value>(MapTreeNode$2__get_Left<$Key, $Value>(mn), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), MapTreeModule_change<$Key, $Value>(comparer, k, u, MapTreeNode$2__get_Right<$Key, $Value>(mn)));
            }
        } else {
            final c_1 = comparer.Compare(k, MapTreeLeaf$2__get_Key<$Key, $Value>(m2));
            if (c_1 < 0) {
                final types.Some<$Value>? matchValue_2 = u(null);
                if (matchValue_2 != null) {
                    return types.Some(MapTreeNode$2<$Key, $Value>(k, types.value(matchValue_2), MapTreeModule_empty<$Key, $Value>(), m, 2));
                } else {
                    return m;
                }
            } else if (c_1 == 0) {
                final types.Some<$Value>? matchValue_3 = u(types.Some(MapTreeLeaf$2__get_Value<$Key, $Value>(m2)));
                if (matchValue_3 != null) {
                    return types.Some(MapTreeLeaf$2<$Key, $Value>(k, types.value(matchValue_3)));
                } else {
                    return MapTreeModule_empty<$Key, $Value>();
                }
            } else {
                final types.Some<$Value>? matchValue_4 = u(null);
                if (matchValue_4 != null) {
                    return types.Some(MapTreeNode$2<$Key, $Value>(k, types.value(matchValue_4), m, MapTreeModule_empty<$Key, $Value>(), 2));
                } else {
                    return m;
                }
            }
        }
    } else {
        final types.Some<$Value>? matchValue = u(null);
        if (matchValue != null) {
            return types.Some(MapTreeLeaf$2<$Key, $Value>(k, types.value(matchValue)));
        } else {
            return m;
        }
    }
}

bool MapTreeModule_mem<$Key, $Value>(types.IComparer<$Key> comparer_mut, $Key k_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_mem:
    while (true) {
        final comparer = comparer_mut;
        final k = k_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            final c = comparer.Compare(k, MapTreeLeaf$2__get_Key<$Key, $Value>(m2));
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                if (c < 0) {
                    comparer_mut = comparer;
                    k_mut = k;
                    m_mut = MapTreeNode$2__get_Left<$Key, $Value>(mn);
                    continue MapTreeModule_mem;
                } else if (c == 0) {
                    return true;
                } else {
                    comparer_mut = comparer;
                    k_mut = k;
                    m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                    continue MapTreeModule_mem;
                }
            } else {
                return c == 0;
            }
        } else {
            return false;
        }
    }
}

void MapTreeModule_iterOpt<$Key, $Value>(void Function($Key, $Value) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_iterOpt:
    while (true) {
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                MapTreeModule_iterOpt<$Key, $Value>(f, MapTreeNode$2__get_Left<$Key, $Value>(mn));
                f(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn));
                f_mut = f;
                m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                continue MapTreeModule_iterOpt;
            } else {
                f(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        }
        break;
    }
}

void MapTreeModule_iter<$a, $b>(void Function($a, $b) f, types.Some<MapTreeLeaf$2<$a, $b>>? m) {
    MapTreeModule_iterOpt<$a, $b>(f, m);
}

types.Some<$a>? MapTreeModule_tryPickOpt<$Key, $Value, $a>(types.Some<$a>? Function($Key, $Value) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_tryPickOpt:
    while (true) {
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                final types.Some<$a>? matchValue = MapTreeModule_tryPickOpt<$Key, $Value, $a>(f, MapTreeNode$2__get_Left<$Key, $Value>(mn));
                if (matchValue == null) {
                    final types.Some<$a>? matchValue_1 = f(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn));
                    if (matchValue_1 == null) {
                        f_mut = f;
                        m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                        continue MapTreeModule_tryPickOpt;
                    } else {
                        return matchValue_1;
                    }
                } else {
                    return matchValue;
                }
            } else {
                return f(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        } else {
            return null;
        }
    }
}

types.Some<$$c>? MapTreeModule_tryPick<$$a, $$b, $$c>(types.Some<$$c>? Function($$a, $$b) f, types.Some<MapTreeLeaf$2<$$a, $$b>>? m) => MapTreeModule_tryPickOpt<$$a, $$b, $$c>(f, m);

bool MapTreeModule_existsOpt<$Key, $Value>(bool Function($Key, $Value) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_existsOpt:
    while (true) {
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                if (MapTreeModule_existsOpt<$Key, $Value>(f, MapTreeNode$2__get_Left<$Key, $Value>(mn)) || f(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn))) {
                    return true;
                } else {
                    f_mut = f;
                    m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                    continue MapTreeModule_existsOpt;
                }
            } else {
                return f(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        } else {
            return false;
        }
    }
}

bool MapTreeModule_exists<$a, $b>(bool Function($a, $b) f, types.Some<MapTreeLeaf$2<$a, $b>>? m) => MapTreeModule_existsOpt<$a, $b>(f, m);

bool MapTreeModule_forallOpt<$Key, $Value>(bool Function($Key, $Value) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_forallOpt:
    while (true) {
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                if (MapTreeModule_forallOpt<$Key, $Value>(f, MapTreeNode$2__get_Left<$Key, $Value>(mn)) && f(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn))) {
                    f_mut = f;
                    m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                    continue MapTreeModule_forallOpt;
                } else {
                    return false;
                }
            } else {
                return f(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        } else {
            return true;
        }
    }
}

bool MapTreeModule_forall<$a, $b>(bool Function($a, $b) f, types.Some<MapTreeLeaf$2<$a, $b>>? m) => MapTreeModule_forallOpt<$a, $b>(f, m);

types.Some<MapTreeLeaf$2<$Key, $Result>>? MapTreeModule_map<$Value, $Result, $Key>($Result Function($Value) f, types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    if (m != null) {
        final m2 = types.value(m);
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            final types.Some<MapTreeLeaf$2<$Key, $Result>>? l2 = MapTreeModule_map<$Value, $Result, $Key>(f, MapTreeNode$2__get_Left<$Key, $Value>(mn));
            final v2 = f(MapTreeLeaf$2__get_Value<$Key, $Value>(mn));
            final types.Some<MapTreeLeaf$2<$Key, $Result>>? r2 = MapTreeModule_map<$Value, $Result, $Key>(f, MapTreeNode$2__get_Right<$Key, $Value>(mn));
            return types.Some(MapTreeNode$2<$Key, $Result>(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), v2, l2, r2, MapTreeNode$2__get_Height<$Key, $Value>(mn)));
        } else {
            return types.Some(MapTreeLeaf$2<$Key, $Result>(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), f(MapTreeLeaf$2__get_Value<$Key, $Value>(m2))));
        }
    } else {
        return MapTreeModule_empty<$Key, $Result>();
    }
}

types.Some<MapTreeLeaf$2<$Key, $Result>>? MapTreeModule_mapiOpt<$Key, $Value, $Result>($Result Function($Key, $Value) f, types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    if (m != null) {
        final m2 = types.value(m);
        if (m2 is MapTreeNode$2<$Key, $Value>) {
            final mn = m2;
            final types.Some<MapTreeLeaf$2<$Key, $Result>>? l2 = MapTreeModule_mapiOpt<$Key, $Value, $Result>(f, MapTreeNode$2__get_Left<$Key, $Value>(mn));
            final v2 = f(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn));
            final types.Some<MapTreeLeaf$2<$Key, $Result>>? r2 = MapTreeModule_mapiOpt<$Key, $Value, $Result>(f, MapTreeNode$2__get_Right<$Key, $Value>(mn));
            return types.Some(MapTreeNode$2<$Key, $Result>(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), v2, l2, r2, MapTreeNode$2__get_Height<$Key, $Value>(mn)));
        } else {
            return types.Some(MapTreeLeaf$2<$Key, $Result>(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), f(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2))));
        }
    } else {
        return MapTreeModule_empty<$Key, $Result>();
    }
}

types.Some<MapTreeLeaf$2<$a, $c>>? MapTreeModule_mapi<$a, $b, $c>($c Function($a, $b) f, types.Some<MapTreeLeaf$2<$a, $b>>? m) => MapTreeModule_mapiOpt<$a, $b, $c>(f, m);

$a MapTreeModule_foldBackOpt<$Key, $Value, $a>($a Function($Key, $Value, $a) f_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut, $a x_mut) {
    MapTreeModule_foldBackOpt:
    while (true) {
        final f = f_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        final x = x_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                final x_1 = MapTreeModule_foldBackOpt<$Key, $Value, $a>(f, MapTreeNode$2__get_Right<$Key, $Value>(mn), x);
                final x_2 = f(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn), x_1);
                f_mut = f;
                m_mut = MapTreeNode$2__get_Left<$Key, $Value>(mn);
                x_mut = x_2;
                continue MapTreeModule_foldBackOpt;
            } else {
                return f(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2), x);
            }
        } else {
            return x;
        }
    }
}

$c MapTreeModule_foldBack<$a, $b, $c>($c Function($a, $b, $c) f, types.Some<MapTreeLeaf$2<$a, $b>>? m, $c x) => MapTreeModule_foldBackOpt<$a, $b, $c>(f, m, x);

$a MapTreeModule_foldOpt<$a, $Key, $Value>($a Function($a, $Key, $Value) f_mut, $a x_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_foldOpt:
    while (true) {
        final f = f_mut;
        final x = x_mut;
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if (m2 is MapTreeNode$2<$Key, $Value>) {
                final mn = m2;
                f_mut = f;
                x_mut = f(MapTreeModule_foldOpt<$a, $Key, $Value>(f, x, MapTreeNode$2__get_Left<$Key, $Value>(mn)), MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn));
                m_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                continue MapTreeModule_foldOpt;
            } else {
                return f(x, MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        } else {
            return x;
        }
    }
}

$a MapTreeModule_fold<$a, $b, $c>($a Function($a, $b, $c) f, $a x, types.Some<MapTreeLeaf$2<$b, $c>>? m) => MapTreeModule_foldOpt<$a, $b, $c>(f, x, m);

$a MapTreeModule_foldSectionOpt<$Key, $Value, $a>(types.IComparer<$Key> comparer, $Key lo, $Key hi, $a Function($Key, $Value, $a) f, types.Some<MapTreeLeaf$2<$Key, $Value>>? m, $a x) {
    $b foldFromTo<$b>($b Function($b) Function($Value) Function($Key) f_1_mut, types.Some<MapTreeLeaf$2<$Key, $Value>>? m_1_mut, $b x_1_mut) {
        foldFromTo:
        while (true) {
            final f_1 = f_1_mut;
            final types.Some<MapTreeLeaf$2<$Key, $Value>>? m_1 = m_1_mut;
            final x_1 = x_1_mut;
            if (m_1 != null) {
                final m2 = types.value(m_1);
                if (m2 is MapTreeNode$2<$Key, $Value>) {
                    final mn = m2;
                    final cLoKey = comparer.Compare(lo, MapTreeLeaf$2__get_Key<$Key, $Value>(mn));
                    final cKeyHi = comparer.Compare(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), hi);
                    final x_2 = (cLoKey < 0) ? foldFromTo(f_1, MapTreeNode$2__get_Left<$Key, $Value>(mn), x_1) : x_1;
                    final x_3 = ((cLoKey <= 0) && (cKeyHi <= 0)) ? ((f_1(MapTreeLeaf$2__get_Key<$Key, $Value>(mn)))(MapTreeLeaf$2__get_Value<$Key, $Value>(mn)))(x_2) : x_2;
                    if (cKeyHi < 0) {
                        f_1_mut = f_1;
                        m_1_mut = MapTreeNode$2__get_Right<$Key, $Value>(mn);
                        x_1_mut = x_3;
                        continue foldFromTo;
                    } else {
                        return x_3;
                    }
                } else if ((comparer.Compare(lo, MapTreeLeaf$2__get_Key<$Key, $Value>(m2)) <= 0) && (comparer.Compare(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), hi) <= 0)) {
                    return ((f_1(MapTreeLeaf$2__get_Key<$Key, $Value>(m2)))(MapTreeLeaf$2__get_Value<$Key, $Value>(m2)))(x_1);
                } else {
                    return x_1;
                }
            } else {
                return x_1;
            }
        }
    }
    if (comparer.Compare(lo, hi) == 1) {
        return x;
    } else {
        return foldFromTo(util.curry3(f), m, x);
    }
}

$b MapTreeModule_foldSection<$Key, $a, $b>(types.IComparer<$Key> comparer, $Key lo, $Key hi, $b Function($Key, $a, $b) f, types.Some<MapTreeLeaf$2<$Key, $a>>? m, $b x) => MapTreeModule_foldSectionOpt<$Key, $a, $b>(comparer, lo, hi, f, m, x);

list.FSharpList<types.Tuple2<$Key, $Value>> MapTreeModule_toList<$Key, $Value>(types.Some<MapTreeLeaf$2<$Key, $Value>>? m) {
    list.FSharpList<types.Tuple2<$Key, $Value>> loop(types.Some<MapTreeLeaf$2<$Key, $Value>>? m_1_mut, list.FSharpList<types.Tuple2<$Key, $Value>> acc_mut) {
        loop:
        while (true) {
            final types.Some<MapTreeLeaf$2<$Key, $Value>>? m_1 = m_1_mut;
            final acc = acc_mut;
            if (m_1 != null) {
                final m2 = types.value(m_1);
                if (m2 is MapTreeNode$2<$Key, $Value>) {
                    final mn = m2;
                    m_1_mut = MapTreeNode$2__get_Left<$Key, $Value>(mn);
                    acc_mut = list.cons(types.Tuple2(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn)), loop(MapTreeNode$2__get_Right<$Key, $Value>(mn), acc));
                    continue loop;
                } else {
                    return list.cons(types.Tuple2(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2)), acc);
                }
            } else {
                return acc;
            }
        }
    }
    return loop(m, list.empty<types.Tuple2<$Key, $Value>>());
}

void MapTreeModule_copyToArray<$a, $b>(types.Some<MapTreeLeaf$2<$a, $b>>? m, List<MapEntry<$a, $b>> arr, int i) {
    var j = i;
    MapTreeModule_iter<$a, $b>(($a x, $b y) {
        arr[j] = MapEntry(x, y);
        j = j + 1;
    }, m);
}

types.Some<MapTreeLeaf$2<$a, $b>>? MapTreeModule_ofList<$a, $b>(types.IComparer<$a> comparer, list.FSharpList<types.Tuple2<$a, $b>> l) => list.fold<types.Tuple2<$a, $b>, types.Some<MapTreeLeaf$2<$a, $b>>?>((types.Some<MapTreeLeaf$2<$a, $b>>? acc, types.Tuple2<$a, $b> tupledArg) => MapTreeModule_add<$a, $b>(comparer, tupledArg.item1, tupledArg.item2, acc), MapTreeModule_empty<$a, $b>(), l);

types.Some<MapTreeLeaf$2<$a, $b>>? MapTreeModule_mkFromEnumerator<$a, $b>(types.IComparer<$a> comparer_mut, types.Some<MapTreeLeaf$2<$a, $b>>? acc_mut, Iterator<types.Tuple2<$a, $b>> e_mut) {
    MapTreeModule_mkFromEnumerator:
    while (true) {
        final comparer = comparer_mut;
        final types.Some<MapTreeLeaf$2<$a, $b>>? acc = acc_mut;
        final e = e_mut;
        if (e.moveNext()) {
            final patternInput = e.current;
            comparer_mut = comparer;
            acc_mut = MapTreeModule_add<$a, $b>(comparer, patternInput.item1, patternInput.item2, acc);
            e_mut = e;
            continue MapTreeModule_mkFromEnumerator;
        } else {
            return acc;
        }
    }
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_ofArray<$Key, $Value>(types.IComparer<$Key> comparer, List<types.Tuple2<$Key, $Value>> arr) {
    types.Some<MapTreeLeaf$2<$Key, $Value>>? res = MapTreeModule_empty<$Key, $Value>();
    for (var idx = 0; idx <= (arr.length - 1); idx++) {
        final forLoopVar = arr[idx];
        res = MapTreeModule_add<$Key, $Value>(comparer, forLoopVar.item1, forLoopVar.item2, res);
    }
    return res;
}

types.Some<MapTreeLeaf$2<$Key, $Value>>? MapTreeModule_ofSeq<$Key, $Value>(types.IComparer<$Key> comparer, Iterable<types.Tuple2<$Key, $Value>> c) {
    if (c is List<types.Tuple2<$Key, $Value>>) {
        return MapTreeModule_ofArray<$Key, $Value>(comparer, c);
    } else if (c is list.FSharpList<types.Tuple2<$Key, $Value>>) {
        return MapTreeModule_ofList<$Key, $Value>(comparer, c);
    } else {
        final ie = c.iterator;
        try {
            return MapTreeModule_mkFromEnumerator<$Key, $Value>(comparer, MapTreeModule_empty<$Key, $Value>(), ie);
        } finally {
            if (ie is types.IDisposable) {
                types.dispose(ie);
            }
        }
    }
}

class MapTreeModule_MapIterator$2<$Key, $Value> implements types.Record {
    list.FSharpList<types.Some<MapTreeLeaf$2<$Key, $Value>>?> stack;
    bool started;
    MapTreeModule_MapIterator$2(this.stack, this.started);
}

list.FSharpList<types.Some<MapTreeLeaf$2<$Key, $Value>>?> MapTreeModule_collapseLHS<$Key, $Value>(list.FSharpList<types.Some<MapTreeLeaf$2<$Key, $Value>>?> stack_mut) {
    MapTreeModule_collapseLHS:
    while (true) {
        final stack = stack_mut;
        if (!(list.isEmpty(stack))) {
            final rest = list.tail(stack);
            final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = list.head(stack);
            if (m != null) {
                final m2 = types.value(m);
                if (m2 is MapTreeNode$2<$Key, $Value>) {
                    final mn = m2;
                    stack_mut = list.ofArrayWithTail([MapTreeNode$2__get_Left<$Key, $Value>(mn), types.Some(MapTreeLeaf$2<$Key, $Value>(MapTreeLeaf$2__get_Key<$Key, $Value>(mn), MapTreeLeaf$2__get_Value<$Key, $Value>(mn))), MapTreeNode$2__get_Right<$Key, $Value>(mn)], rest);
                    continue MapTreeModule_collapseLHS;
                } else {
                    return stack;
                }
            } else {
                stack_mut = rest;
                continue MapTreeModule_collapseLHS;
            }
        } else {
            return list.empty<types.Some<MapTreeLeaf$2<$Key, $Value>>?>();
        }
    }
}

MapTreeModule_MapIterator$2<$$a, $$b> MapTreeModule_mkIterator<$$a, $$b>(types.Some<MapTreeLeaf$2<$$a, $$b>>? m) => MapTreeModule_MapIterator$2<$$a, $$b>(MapTreeModule_collapseLHS<$$a, $$b>(list.singleton(m)), false);

$$a MapTreeModule_notStarted<$$a>() => throw Exception('enumeration not started');

$$a MapTreeModule_alreadyFinished<$$a>() => throw Exception('enumeration already finished');

MapEntry<$Key, $Value> MapTreeModule_current<$Key, $Value>(MapTreeModule_MapIterator$2<$Key, $Value> i) {
    if (i.started) {
        final matchValue = i.stack;
        if (!(list.isEmpty(matchValue))) {
            if (list.head(matchValue) != null) {
                if (types.value(list.head(matchValue)) is MapTreeNode$2<$Key, $Value>) {
                    return throw Exception('Please report error: Map iterator, unexpected stack for current');
                } else {
                    return MapEntry(MapTreeLeaf$2__get_Key<$Key, $Value>(types.value(list.head(matchValue))), MapTreeLeaf$2__get_Value<$Key, $Value>(types.value(list.head(matchValue))));
                }
            } else {
                return throw Exception('Please report error: Map iterator, unexpected stack for current');
            }
        } else {
            return MapTreeModule_alreadyFinished<MapEntry<$Key, $Value>>();
        }
    } else {
        return MapTreeModule_notStarted<MapEntry<$Key, $Value>>();
    }
}

bool MapTreeModule_moveNext<$Key, $Value>(MapTreeModule_MapIterator$2<$Key, $Value> i) {
    if (i.started) {
        final matchValue = i.stack;
        if (!(list.isEmpty(matchValue))) {
            if (list.head(matchValue) != null) {
                if (types.value(list.head(matchValue)) is MapTreeNode$2<$Key, $Value>) {
                    return throw Exception('Please report error: Map iterator, unexpected stack for moveNext');
                } else {
                    i.stack = MapTreeModule_collapseLHS<$Key, $Value>(list.tail(matchValue));
                    return !(list.isEmpty(i.stack));
                }
            } else {
                return throw Exception('Please report error: Map iterator, unexpected stack for moveNext');
            }
        } else {
            return false;
        }
    } else {
        i.started = true;
        return !(list.isEmpty(i.stack));
    }
}

class MapTreeModule_MapEnumerator$2<$a, $b> implements types.IDisposable, Iterator<MapEntry<$a, $b>> {
    final types.Some<MapTreeLeaf$2<$a, $b>>? m;
    late MapTreeModule_MapIterator$2<$a, $b> i;
    MapTreeModule_MapEnumerator$2(this.m) {
        this.i = MapTreeModule_mkIterator<$a, $b>(this.m);
    }

    @override
    MapEntry<$a, $b> get current => MapTreeModule_current<$a, $b>(this.i);
    @override
    bool moveNext() => MapTreeModule_moveNext<$a, $b>(this.i);
    @override
    void Dispose() {
    }
}

Iterator<MapEntry<$$a, $$b>> MapTreeModule_mkIEnumerator<$$a, $$b>(types.Some<MapTreeLeaf$2<$$a, $$b>>? m) => MapTreeModule_MapEnumerator$2<$$a, $$b>(m);

Iterable<MapEntry<$$a, $$b>> MapTreeModule_toSeq<$$a, $$b>(types.Some<MapTreeLeaf$2<$$a, $$b>>? s) => seq.unfold<Iterator<MapEntry<$$a, $$b>>, MapEntry<$$a, $$b>>((Iterator<MapEntry<$$a, $$b>> en_1) {
    if (en_1.moveNext()) {
        return types.Some(types.Tuple2(en_1.current, en_1));
    } else {
        return null;
    }
}, MapTreeModule_mkIEnumerator<$$a, $$b>(s));

List<MapEntry<$a, $b>> MapTreeModule_toArray<$a, $b>(types.Some<MapTreeLeaf$2<$a, $b>>? m) {
    final n = MapTreeModule_size<$a, $b>(m);
    final e = MapTreeModule_mkIEnumerator<$a, $b>(m);
    return List.generate(n, ((int _arg) {
        e.moveNext();
        return e.current;
    }), growable: false);
}

types.Tuple2<$Key, $Value> MapTreeModule_leftmost<$Key, $Value>(types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_leftmost:
    while (true) {
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if ((m2 is MapTreeNode$2<$Key, $Value>) && (MapTreeNode$2__get_Height<$Key, $Value>(m2 as MapTreeNode$2<$Key, $Value>) > 1)) {
                final nd_1 = m2 as MapTreeNode$2<$Key, $Value>;
                if (MapTreeNode$2__get_Left<$Key, $Value>(nd_1) == null) {
                    return types.Tuple2(MapTreeLeaf$2__get_Key<$Key, $Value>(nd_1), MapTreeLeaf$2__get_Value<$Key, $Value>(nd_1));
                } else {
                    m_mut = MapTreeNode$2__get_Left<$Key, $Value>(nd_1);
                    continue MapTreeModule_leftmost;
                }
            } else {
                return types.Tuple2(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        } else {
            return throw Exception();
        }
    }
}

types.Tuple2<$Key, $Value> MapTreeModule_rightmost<$Key, $Value>(types.Some<MapTreeLeaf$2<$Key, $Value>>? m_mut) {
    MapTreeModule_rightmost:
    while (true) {
        final types.Some<MapTreeLeaf$2<$Key, $Value>>? m = m_mut;
        if (m != null) {
            final m2 = types.value(m);
            if ((m2 is MapTreeNode$2<$Key, $Value>) && (MapTreeNode$2__get_Height<$Key, $Value>(m2 as MapTreeNode$2<$Key, $Value>) > 1)) {
                final nd_1 = m2 as MapTreeNode$2<$Key, $Value>;
                if (MapTreeNode$2__get_Right<$Key, $Value>(nd_1) == null) {
                    return types.Tuple2(MapTreeLeaf$2__get_Key<$Key, $Value>(nd_1), MapTreeLeaf$2__get_Value<$Key, $Value>(nd_1));
                } else {
                    m_mut = MapTreeNode$2__get_Right<$Key, $Value>(nd_1);
                    continue MapTreeModule_rightmost;
                }
            } else {
                return types.Tuple2(MapTreeLeaf$2__get_Key<$Key, $Value>(m2), MapTreeLeaf$2__get_Value<$Key, $Value>(m2));
            }
        } else {
            return throw Exception();
        }
    }
}

class FSharpMap<$Key, $Value> extends Iterable<MapEntry<$Key, $Value>> implements Comparable<FSharpMap<$Key, $Value>> {
    final types.Some<MapTreeLeaf$2<$Key, $Value>>? tree;
    final types.IComparer<$Key> comparer;
    FSharpMap(this.comparer, this.tree): super();
    @override
    int get hashCode => FSharpMap__ComputeHashCode<$Key, $Value>(this);
    @override
    bool operator ==(dynamic that) {
        if (that is FSharpMap<$Key, $Value>) {
            final that_1 = that;
            final e1 = this.iterator;
            try {
                final e2 = that_1.iterator;
                try {
                    bool loop() {
                        final m1 = e1.moveNext();
                        if (m1 == e2.moveNext()) {
                            if (!m1) {
                                return true;
                            } else {
                                final e1c = e1.current;
                                final e2c = e2.current;
                                if (util.equalsDynamic(e1c.key, e2c.key) && util.equalsDynamic(e1c.value, e2c.value)) {
                                    return loop();
                                } else {
                                    return false;
                                }
                            }
                        } else {
                            return false;
                        }
                    }
                    return loop();
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
        } else {
            return false;
        }
    }
    @override
    String toString() {
        final strings = seq.map<MapEntry<$Key, $Value>, String>((MapEntry<$Key, $Value> kv) => '(${kv.key}, ${kv.value})', this);
        return ('map [' + strings.join('; ')) + ']';
    }
    @override
    Iterator<MapEntry<$Key, $Value>> get iterator => MapTreeModule_mkIEnumerator<$Key, $Value>(this.tree);
    @override
    int compareTo(FSharpMap<$Key, $Value> m2) => seq.compareWith<MapEntry<$Key, $Value>>((MapEntry<$Key, $Value> kvp1, MapEntry<$Key, $Value> kvp2) {
        final c = this.comparer.Compare(kvp1.key, kvp2.key);
        if (c != 0) {
            return c;
        } else {
            return util.compareDynamic(kvp1.value, kvp2.value);
        }
    }, this, m2);
}

FSharpMap<$Key, $Value> FSharpMap_Empty<$Key, $Value>(types.IComparer<$Key> comparer) => FSharpMap<$Key, $Value>(comparer, MapTreeModule_empty<$Key, $Value>());

types.IComparer<$Key> FSharpMap__get_Comparer<$Key, $Value>(FSharpMap<$Key, $Value> m) => m.comparer;

types.Some<MapTreeLeaf$2<$Key, $Value>>? FSharpMap__get_Tree<$Key, $Value>(FSharpMap<$Key, $Value> m) => m.tree;

FSharpMap<$Key, $Value> FSharpMap__Add<$Key, $Value>(FSharpMap<$Key, $Value> m, $Key key, $Value value) => FSharpMap<$Key, $Value>(m.comparer, MapTreeModule_add<$Key, $Value>(m.comparer, key, value, m.tree));

FSharpMap<$Key, $Value> FSharpMap__Change<$Key, $Value>(FSharpMap<$Key, $Value> m, $Key key, types.Some<$Value>? Function(types.Some<$Value>?) f) => FSharpMap<$Key, $Value>(m.comparer, MapTreeModule_change<$Key, $Value>(m.comparer, key, f, m.tree));

bool FSharpMap__get_IsEmpty<$Key, $Value>(FSharpMap<$Key, $Value> m) => m.tree == null;

$Value FSharpMap__get_Item<$Key, $Value>(FSharpMap<$Key, $Value> m, $Key key) => MapTreeModule_find<$Key, $Value>(m.comparer, key, m.tree);

types.Some<$$a>? FSharpMap__TryPick<$Key, $Value, $$a>(FSharpMap<$Key, $Value> m, types.Some<$$a>? Function($Key, $Value) f) => MapTreeModule_tryPick<$Key, $Value, $$a>(f, m.tree);

bool FSharpMap__Exists<$Key, $Value>(FSharpMap<$Key, $Value> m, bool Function($Key, $Value) predicate) => MapTreeModule_exists<$Key, $Value>(predicate, m.tree);

FSharpMap<$Key, $Value> FSharpMap__Filter<$Key, $Value>(FSharpMap<$Key, $Value> m, bool Function($Key, $Value) predicate) => FSharpMap<$Key, $Value>(m.comparer, MapTreeModule_filter<$Key, $Value>(m.comparer, predicate, m.tree));

bool FSharpMap__ForAll<$Key, $Value>(FSharpMap<$Key, $Value> m, bool Function($Key, $Value) predicate) => MapTreeModule_forall<$Key, $Value>(predicate, m.tree);

$$a FSharpMap__Fold<$Key, $Value, $$a>(FSharpMap<$Key, $Value> m, $$a Function($Key, $Value, $$a) f, $$a acc) => MapTreeModule_foldBack<$Key, $Value, $$a>(f, m.tree, acc);

$z FSharpMap__FoldSection<$Key, $Value, $z>(FSharpMap<$Key, $Value> m, $Key lo, $Key hi, $z Function($Key, $Value, $z) f, $z acc) => MapTreeModule_foldSection<$Key, $Value, $z>(m.comparer, lo, hi, f, m.tree, acc);

void FSharpMap__Iterate<$Key, $Value>(FSharpMap<$Key, $Value> m, void Function($Key, $Value) f) {
    MapTreeModule_iter<$Key, $Value>(f, m.tree);
}

FSharpMap<$Key, $Result> FSharpMap__MapRange<$Key, $Value, $Result>(FSharpMap<$Key, $Value> m, $Result Function($Value) f) => FSharpMap<$Key, $Result>(m.comparer, MapTreeModule_map<$Value, $Result, $Key>(f, m.tree));

FSharpMap<$Key, $b> FSharpMap__Map<$Key, $Value, $b>(FSharpMap<$Key, $Value> m, $b Function($Key, $Value) f) => FSharpMap<$Key, $b>(m.comparer, MapTreeModule_mapi<$Key, $Value, $b>(f, m.tree));

types.Tuple2<FSharpMap<$Key, $Value>, FSharpMap<$Key, $Value>> FSharpMap__Partition<$Key, $Value>(FSharpMap<$Key, $Value> m, bool Function($Key, $Value) predicate) {
    final patternInput = MapTreeModule_partition<$Key, $Value>(m.comparer, predicate, m.tree);
    return types.Tuple2(FSharpMap<$Key, $Value>(m.comparer, patternInput.item1), FSharpMap<$Key, $Value>(m.comparer, patternInput.item2));
}

int FSharpMap__get_Count<$Key, $Value>(FSharpMap<$Key, $Value> m) => MapTreeModule_size<$Key, $Value>(m.tree);

bool FSharpMap__ContainsKey<$Key, $Value>(FSharpMap<$Key, $Value> m, $Key key) => MapTreeModule_mem<$Key, $Value>(m.comparer, key, m.tree);

FSharpMap<$Key, $Value> FSharpMap__Remove<$Key, $Value>(FSharpMap<$Key, $Value> m, $Key key) => FSharpMap<$Key, $Value>(m.comparer, MapTreeModule_remove<$Key, $Value>(m.comparer, key, m.tree));

Iterable<$Key> FSharpMap__get_Keys<$Key, $Value>(FSharpMap<$Key, $Value> _) => array_1.map<MapEntry<$Key, $Value>, $Key>((MapEntry<$Key, $Value> kvp) => kvp.key, MapTreeModule_toArray<$Key, $Value>(_.tree)) as Iterable<$Key>;

Iterable<$Value> FSharpMap__get_Values<$Key, $Value>(FSharpMap<$Key, $Value> _) => array_1.map<MapEntry<$Key, $Value>, $Value>((MapEntry<$Key, $Value> kvp) => kvp.value, MapTreeModule_toArray<$Key, $Value>(_.tree)) as Iterable<$Value>;

types.Tuple2<$Key, $Value> FSharpMap__get_MinKeyValue<$Key, $Value>(FSharpMap<$Key, $Value> m) => MapTreeModule_leftmost<$Key, $Value>(m.tree);

types.Tuple2<$Key, $Value> FSharpMap__get_MaxKeyValue<$Key, $Value>(FSharpMap<$Key, $Value> m) => MapTreeModule_rightmost<$Key, $Value>(m.tree);

types.Some<$Value>? FSharpMap__TryFind<$Key, $Value>(FSharpMap<$Key, $Value> m, $Key key) => MapTreeModule_tryFind<$Key, $Value>(m.comparer, key, m.tree);

list.FSharpList<types.Tuple2<$Key, $Value>> FSharpMap__ToList<$Key, $Value>(FSharpMap<$Key, $Value> m) => MapTreeModule_toList<$Key, $Value>(m.tree);

List<MapEntry<$Key, $Value>> FSharpMap__ToArray<$Key, $Value>(FSharpMap<$Key, $Value> m) => MapTreeModule_toArray<$Key, $Value>(m.tree);

int FSharpMap__ComputeHashCode<$Key, $Value>(FSharpMap<$Key, $Value> this$) {
    int combineHash(int x, int y) => ((x << 1) + y) + 631;
    var res = 0;
    final enumerator = this$.iterator;
    try {
        while (enumerator.moveNext()) {
            final activePatternResult = types.mapEntryToTuple(enumerator.current);
            res = combineHash(res, activePatternResult.item1.hashCode);
            res = combineHash(res, activePatternResult.item2.hashCode);
        }
    } finally {
        if (enumerator is types.IDisposable) {
            types.dispose(enumerator);
        }
    }
    return res;
}

bool isEmpty<$$a, $$b>(FSharpMap<$$a, $$b> table) => FSharpMap__get_IsEmpty<$$a, $$b>(table);

FSharpMap<$a, $b> add<$a, $b>($a key, $b value, FSharpMap<$a, $b> table) => FSharpMap__Add<$a, $b>(table, key, value);

FSharpMap<$a, $b> change<$a, $b>($a key, types.Some<$b>? Function(types.Some<$b>?) f, FSharpMap<$a, $b> table) => FSharpMap__Change<$a, $b>(table, key, f);

$b find<$a, $b>($a key, FSharpMap<$a, $b> table) => FSharpMap__get_Item<$a, $b>(table, key);

types.Some<$b>? tryFind<$a, $b>($a key, FSharpMap<$a, $b> table) => FSharpMap__TryFind<$a, $b>(table, key);

FSharpMap<$$a, $$b> remove<$$a, $$b>($$a key, FSharpMap<$$a, $$b> table) => FSharpMap__Remove<$$a, $$b>(table, key);

bool containsKey<$$a, $$b>($$a key, FSharpMap<$$a, $$b> table) => FSharpMap__ContainsKey<$$a, $$b>(table, key);

void iterate<$$a, $$b>(void Function($$a, $$b) action, FSharpMap<$$a, $$b> table) {
    FSharpMap__Iterate<$$a, $$b>(table, action);
}

types.Some<$$c>? tryPick<$$a, $$b, $$c>(types.Some<$$c>? Function($$a, $$b) chooser, FSharpMap<$$a, $$b> table) => FSharpMap__TryPick<$$a, $$b, $$c>(table, chooser);

$$c pick<$$a, $$b, $$c>(types.Some<$$c>? Function($$a, $$b) chooser, FSharpMap<$$a, $$b> table) {
    final types.Some<$$c>? matchValue = tryPick<$$a, $$b, $$c>(chooser, table);
    if (matchValue != null) {
        return types.value(matchValue);
    } else {
        return throw Exception();
    }
}

bool exists<$$a, $$b>(bool Function($$a, $$b) predicate, FSharpMap<$$a, $$b> table) => FSharpMap__Exists<$$a, $$b>(table, predicate);

FSharpMap<$$a, $$b> filter<$$a, $$b>(bool Function($$a, $$b) predicate, FSharpMap<$$a, $$b> table) => FSharpMap__Filter<$$a, $$b>(table, predicate);

types.Tuple2<FSharpMap<$$a, $$b>, FSharpMap<$$a, $$b>> partition<$$a, $$b>(bool Function($$a, $$b) predicate, FSharpMap<$$a, $$b> table) => FSharpMap__Partition<$$a, $$b>(table, predicate);

bool forAll<$$a, $$b>(bool Function($$a, $$b) predicate, FSharpMap<$$a, $$b> table) => FSharpMap__ForAll<$$a, $$b>(table, predicate);

FSharpMap<$$a, $$c> map<$$a, $$b, $$c>($$c Function($$a, $$b) mapping, FSharpMap<$$a, $$b> table) => FSharpMap__Map<$$a, $$b, $$c>(table, mapping);

$State fold<$Key, $T, $State>($State Function($State, $Key, $T) folder, $State state, FSharpMap<$Key, $T> table) => MapTreeModule_fold<$State, $Key, $T>(folder, state, FSharpMap__get_Tree<$Key, $T>(table));

$State foldBack<$Key, $T, $State>($State Function($Key, $T, $State) folder, FSharpMap<$Key, $T> table, $State state) => MapTreeModule_foldBack<$Key, $T, $State>(folder, FSharpMap__get_Tree<$Key, $T>(table), state);

Iterable<types.Tuple2<$$a, $$b>> toSeq<$$a, $$b>(FSharpMap<$$a, $$b> table) => seq.map<MapEntry<$$a, $$b>, types.Tuple2<$$a, $$b>>((MapEntry<$$a, $$b> kvp) => types.Tuple2(kvp.key, kvp.value), table);

$$a findKey<$$a, $$b>(bool Function($$a, $$b) predicate, FSharpMap<$$a, $$b> table) => seq.pick<MapEntry<$$a, $$b>, $$a>((MapEntry<$$a, $$b> kvp) {
    final k = kvp.key;
    if (predicate(k, kvp.value)) {
        return types.Some(k);
    } else {
        return null;
    }
}, table);

types.Some<$$a>? tryFindKey<$$a, $$b>(bool Function($$a, $$b) predicate, FSharpMap<$$a, $$b> table) => seq.tryPick<MapEntry<$$a, $$b>, $$a>((MapEntry<$$a, $$b> kvp) {
    final k = kvp.key;
    if (predicate(k, kvp.value)) {
        return types.Some(k);
    } else {
        return null;
    }
}, table);

FSharpMap<$Key, $Value> ofList<$Key, $Value>(list.FSharpList<types.Tuple2<$Key, $Value>> elements, types.IComparer<$Key> comparer) => FSharpMap<$Key, $Value>(comparer, MapTreeModule_ofSeq<$Key, $Value>(comparer, elements));

FSharpMap<$T, $$a> ofSeq<$T, $$a>(Iterable<types.Tuple2<$T, $$a>> elements, types.IComparer<$T> comparer) => FSharpMap<$T, $$a>(comparer, MapTreeModule_ofSeq<$T, $$a>(comparer, elements));

FSharpMap<$Key, $Value> ofArray<$Key, $Value>(List<types.Tuple2<$Key, $Value>> elements, types.IComparer<$Key> comparer) => FSharpMap<$Key, $Value>(comparer, MapTreeModule_ofSeq<$Key, $Value>(comparer, elements));

list.FSharpList<types.Tuple2<$$a, $$b>> toList<$$a, $$b>(FSharpMap<$$a, $$b> table) => FSharpMap__ToList<$$a, $$b>(table);

List<types.Tuple2<$$a, $$b>> toArray<$$a, $$b>(FSharpMap<$$a, $$b> table) => array_1.map<MapEntry<$$a, $$b>, types.Tuple2<$$a, $$b>>((MapEntry<$$a, $$b> kv) => types.Tuple2(kv.key, kv.value), FSharpMap__ToArray<$$a, $$b>(table));

Iterable<$K> keys<$K, $V>(FSharpMap<$K, $V> table) => FSharpMap__get_Keys<$K, $V>(table);

Iterable<$V> values<$K, $V>(FSharpMap<$K, $V> table) => FSharpMap__get_Values<$K, $V>(table);

types.Tuple2<$$a, $$b> minKeyValue<$$a, $$b>(FSharpMap<$$a, $$b> table) => FSharpMap__get_MinKeyValue<$$a, $$b>(table);

types.Tuple2<$$a, $$b> maxKeyValue<$$a, $$b>(FSharpMap<$$a, $$b> table) => FSharpMap__get_MaxKeyValue<$$a, $$b>(table);

FSharpMap<$Key, $Value> empty<$Key, $Value>(types.IComparer<$Key> comparer) => FSharpMap_Empty<$Key, $Value>(comparer);

int count<$$a, $$b>(FSharpMap<$$a, $$b> table) => FSharpMap__get_Count<$$a, $$b>(table);

