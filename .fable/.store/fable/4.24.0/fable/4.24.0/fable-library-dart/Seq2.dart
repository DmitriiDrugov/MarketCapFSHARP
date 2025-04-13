// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './List.dart' as list;
import './Seq.dart' as seq;
import './Types.dart' as types;

Iterable<$T> distinct<$T>(Iterable<$T> xs, types.IEqualityComparer<$T> comparer) => seq.delay<$T>(() {
    final hashSet = types.setWith(comparer);
    return seq.filter<$T>(($T x) => hashSet.add(x), xs);
});

Iterable<$T> distinctBy<$T, $Key>($Key Function($T) projection, Iterable<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.delay<$T>(() {
    final hashSet = types.setWith(comparer);
    return seq.filter<$T>(($T x) => hashSet.add(projection(x)), xs);
});

Iterable<$T> except<$T>(Iterable<$T> itemsToExclude, Iterable<$T> xs, types.IEqualityComparer<$T> comparer) => seq.delay<$T>(() {
    final hashSet = types.setWith(comparer, itemsToExclude);
    return seq.filter<$T>(($T x) => hashSet.add(x), xs);
});

Iterable<types.Tuple2<$Key, int>> countBy<$T, $Key>($Key Function($T) projection, Iterable<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.delay<types.Tuple2<$Key, int>>(() {
    final dict = types.mapWith<$Key, int>(comparer);
    final keys = <$Key>[];
    final enumerator = xs.iterator;
    try {
        while (enumerator.moveNext()) {
            final key = projection(enumerator.current);
            var outArg = 0;
            final matchValue = types.Tuple2(types.tryGetValue<$Key, int>(dict, key, types.FSharpRef(() => outArg, (int v) {
                outArg = v;
            })), outArg);
            if (matchValue.item1) {
                dict[key] = matchValue.item2 + 1;
            } else {
                dict[key] = 1;
                keys.add(key);
            }
        }
    } finally {
        if (enumerator is types.IDisposable) {
            types.dispose(enumerator);
        }
    }
    return seq.map<$Key, types.Tuple2<$Key, int>>(($Key key_1) => types.Tuple2(key_1, types.getValue(dict, key_1)), keys);
});

Iterable<types.Tuple2<$Key, Iterable<$T>>> groupBy<$T, $Key>($Key Function($T) projection, Iterable<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.delay<types.Tuple2<$Key, Iterable<$T>>>(() {
    final dict = types.mapWith<$Key, List<$T>>(comparer);
    final keys = <$Key>[];
    final enumerator = xs.iterator;
    try {
        while (enumerator.moveNext()) {
            final x = enumerator.current;
            final key = projection(x);
            if (dict.containsKey(key)) {
                types.getValue(dict, key).add(x);
            } else {
                dict[key] = [x];
                keys.add(key);
            }
        }
    } finally {
        if (enumerator is types.IDisposable) {
            types.dispose(enumerator);
        }
    }
    return seq.map<$Key, types.Tuple2<$Key, Iterable<$T>>>(($Key key_1) => types.Tuple2(key_1, types.getValue(dict, key_1)), keys);
});

List<$T> Array_distinct<$T>(List<$T> xs, types.IEqualityComparer<$T> comparer) => seq.toArray<$T>(distinct<$T>(xs, comparer));

List<$T> Array_distinctBy<$T, $Key>($Key Function($T) projection, List<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.toArray<$T>(distinctBy<$T, $Key>(projection, xs, comparer));

List<$T> Array_except<$T>(Iterable<$T> itemsToExclude, List<$T> xs, types.IEqualityComparer<$T> comparer) => seq.toArray<$T>(except<$T>(itemsToExclude, xs, comparer));

List<types.Tuple2<$Key, int>> Array_countBy<$T, $Key>($Key Function($T) projection, List<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.toArray<types.Tuple2<$Key, int>>(countBy<$T, $Key>(projection, xs, comparer));

List<types.Tuple2<$Key, List<$T>>> Array_groupBy<$T, $Key>($Key Function($T) projection, List<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.toArray<types.Tuple2<$Key, List<$T>>>(seq.map<types.Tuple2<$Key, Iterable<$T>>, types.Tuple2<$Key, List<$T>>>((types.Tuple2<$Key, Iterable<$T>> tupledArg) => types.Tuple2(tupledArg.item1, seq.toArray<$T>(tupledArg.item2)), groupBy<$T, $Key>(projection, xs, comparer)));

list.FSharpList<$T> List_distinct<$T>(list.FSharpList<$T> xs, types.IEqualityComparer<$T> comparer) => seq.toList<$T>(distinct<$T>(xs, comparer));

list.FSharpList<$T> List_distinctBy<$T, $Key>($Key Function($T) projection, list.FSharpList<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.toList<$T>(distinctBy<$T, $Key>(projection, xs, comparer));

list.FSharpList<$T> List_except<$T>(Iterable<$T> itemsToExclude, list.FSharpList<$T> xs, types.IEqualityComparer<$T> comparer) => seq.toList<$T>(except<$T>(itemsToExclude, xs, comparer));

list.FSharpList<types.Tuple2<$Key, int>> List_countBy<$T, $Key>($Key Function($T) projection, list.FSharpList<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.toList<types.Tuple2<$Key, int>>(countBy<$T, $Key>(projection, xs, comparer));

list.FSharpList<types.Tuple2<$Key, list.FSharpList<$T>>> List_groupBy<$T, $Key>($Key Function($T) projection, list.FSharpList<$T> xs, types.IEqualityComparer<$Key> comparer) => seq.toList<types.Tuple2<$Key, list.FSharpList<$T>>>(seq.map<types.Tuple2<$Key, Iterable<$T>>, types.Tuple2<$Key, list.FSharpList<$T>>>((types.Tuple2<$Key, Iterable<$T>> tupledArg) => types.Tuple2(tupledArg.item1, seq.toList<$T>(tupledArg.item2)), groupBy<$T, $Key>(projection, xs, comparer)));

