// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Option.dart' as option;
import './Types.dart' as types;
import './Util.dart' as util;
import './Global.dart' as global$;
import 'dart:math' as dart_math;

$$a indexNotFound<$$a>() => throw Exception('An index satisfying the predicate was not found in the collection.');

$$a differentLengths<$$a>() => throw Exception('Arrays had different lengths');

void reverseInPlace<$T>(List<$T> xs) {
    var left = 0;
    var right = 0;
    final length = xs.length;
    while (left < (length ~/ 2)) {
        right = (length - 1) - left;
        final temporary = xs[left];
        xs[left] = xs[right];
        xs[right] = temporary;
        left = left + 1;
    }
}

List<$T> append<$T>(List<$T> array1, List<$T> array2) {
    final len1 = array1.length;
    final len = len1 + array2.length;
    return List.generate(len, ((int i) {
        if (i < len1) {
            return array1[i];
        } else {
            return array2[i - len1];
        }
    }), growable: false);
}

List<$T> filter<$T>(bool Function($T) predicate, List<$T> array) => array.where(predicate).toList(growable: false);

List<$T> fill<$T>(List<$T> target, int targetIndex, int count, $T value) {
    final end_ = targetIndex + count;
    target.fillRange(targetIndex, end_, value);
    return target;
}

List<$T> getSubArray<$T>(List<$T> array, int start, int count) => array.sublist(start, (start + count));

$T last<$T>(List<$T> array) {
    if (array.isEmpty) {
        throw Exception('The input array was empty\\nParameter name: array');
    }
    return array[array.length - 1];
}

types.Some<$T>? tryLast<$T>(List<$T> array) {
    if (array.isEmpty) {
        return null;
    } else {
        return types.Some(array[array.length - 1]);
    }
}

List<$U> mapIndexed<$T, $U>($U Function(int, $T) f, List<$T> source) {
    final len = source.length;
    return List.generate(len, ((int i) => f(i, source[i])), growable: false);
}

List<$U> map<$T, $U>($U Function($T) f, List<$T> source) {
    final len = source.length;
    return List.generate(len, ((int i) => f(source[i])), growable: false);
}

List<$U> mapIndexed2<$T1, $T2, $U>($U Function(int, $T1, $T2) f, List<$T1> source1, List<$T2> source2) {
    if (source1.length != source2.length) {
        throw Exception('Arrays had different lengths');
    }
    final len = source1.length;
    return List.generate(len, ((int i) => f(i, source1[i], source2[i])), growable: false);
}

List<$U> map2<$T1, $T2, $U>($U Function($T1, $T2) f, List<$T1> source1, List<$T2> source2) {
    if (source1.length != source2.length) {
        throw Exception('Arrays had different lengths');
    }
    final len = source1.length;
    return List.generate(len, ((int i) => f(source1[i], source2[i])), growable: false);
}

List<$U> mapIndexed3<$T1, $T2, $T3, $U>($U Function(int, $T1, $T2, $T3) f, List<$T1> source1, List<$T2> source2, List<$T3> source3) {
    if ((source1.length != source2.length) || (source2.length != source3.length)) {
        throw Exception('Arrays had different lengths');
    }
    final len = source1.length;
    return List.generate(len, ((int i) => f(i, source1[i], source2[i], source3[i])), growable: false);
}

List<$U> map3<$T1, $T2, $T3, $U>($U Function($T1, $T2, $T3) f, List<$T1> source1, List<$T2> source2, List<$T3> source3) {
    if ((source1.length != source2.length) || (source2.length != source3.length)) {
        throw Exception('Arrays had different lengths');
    }
    final len = source1.length;
    return List.generate(len, ((int i) => f(source1[i], source2[i], source3[i])), growable: false);
}

types.Tuple2<List<$Result>, $State> mapFold<$T, $State, $Result>(types.Tuple2<$Result, $State> Function($State, $T) mapping, $State state, List<$T> array) {
    if (array.isEmpty) {
        return types.Tuple2(<$Result>[], state);
    } else {
        var acc = state;
        final len = array.length;
        return types.Tuple2(List.generate(len, ((int i) {
            final patternInput = mapping(acc, array[i]);
            acc = patternInput.item2;
            return patternInput.item1;
        }), growable: false), acc);
    }
}

types.Tuple2<List<$Result>, $State> mapFoldBack<$T, $State, $Result>(types.Tuple2<$Result, $State> Function($T, $State) mapping, List<$T> array, $State state) {
    if (array.isEmpty) {
        return types.Tuple2(<$Result>[], state);
    } else {
        final len = array.length;
        var acc = state;
        final res = List.generate(len, ((int i) {
            final i_1 = (len - i) - 1;
            final patternInput = mapping(array[i_1], acc);
            acc = patternInput.item2;
            return patternInput.item1;
        }), growable: false);
        reverseInPlace<$Result>(res);
        return types.Tuple2(res, acc);
    }
}

List<types.Tuple2<int, $T>> indexed<$T>(List<$T> source) {
    final len = source.length;
    return List.generate(len, ((int i) => types.Tuple2(i, source[i])), growable: false);
}

List<$T> truncate<$T>(int count, List<$T> array) {
    final e_1 = dart_math.max<int>(0, count);
    final count_1 = dart_math.min<int>(array.length, e_1);
    return array.sublist(0, count_1);
}

List<$T> concatArrays<$T>(List<List<$T>> arrays) {
    final matchValue = arrays.length;
    if (matchValue == 0) {
        return <$T>[];
    } else if (matchValue == 1) {
        return arrays[0];
    } else {
        var totalLength = 0;
        for (var idx = 0; idx <= (arrays.length - 1); idx++) {
            final arr = arrays[idx];
            totalLength = totalLength + arr.length;
        }
        if (totalLength == 0) {
            return <$T>[];
        } else {
            var curIdx = 0;
            var accLen = 0;
            var curLen = arrays[0].length;
            final len = totalLength;
            return List.generate(len, ((int i) {
                while (i >= (accLen + curLen)) {
                    curIdx = curIdx + 1;
                    accLen = accLen + curLen;
                    curLen = arrays[curIdx].length;
                }
                return arrays[curIdx][i - accLen];
            }), growable: false);
        }
    }
}

List<$T> concat<$T>(Iterable<List<$T>> arrays) => concatArrays<$T>(arrays.toList(growable: false));

List<$U> collect<$T, $U>(List<$U> Function($T) mapping, List<$T> array) => concatArrays<$U>(map<$T, List<$U>>(mapping, array));

List<$a> initialize<$a>(int count, $a Function(int) initializer) {
    if (count < 0) {
        throw Exception('The input must be non-negative\\nParameter name: count');
    }
    return List.generate(count, initializer, growable: false);
}

List<types.Tuple2<$T, $T>> pairwise<$T>(List<$T> array) {
    if (array.length < 2) {
        return <types.Tuple2<$T, $T>>[];
    } else {
        final len = array.length - 1;
        return List.generate(len, ((int i) => types.Tuple2(array[i], array[i + 1])), growable: false);
    }
}

bool contains<$T>($T value, List<$T> array) {
    bool loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i >= array.length) {
                return false;
            } else if (util.equalsDynamic(value, array[i])) {
                return true;
            } else {
                i_mut = i + 1;
                continue loop;
            }
        }
    }
    return loop(0);
}

List<$T> replicate<$T>(int count, $T initial) {
    if (count < 0) {
        throw Exception('The input must be non-negative\\nParameter name: count');
    }
    return List.generate(count, ((int _arg) => initial), growable: false);
}

List<$T> copy<$T>(List<$T> array) => array.sublist(0);

List<$T> reverse<$T>(List<$T> array) => array.reversed.toList(growable: false);

List<$State> scan<$T, $State>($State Function($State, $T) folder, $State state, List<$T> array) {
    var state_1 = state;
    final len = array.length + 1;
    return List.generate(len, ((int i) {
        if (i == 0) {
            return state_1;
        } else {
            state_1 = folder(state_1, array[i - 1]);
            return state_1;
        }
    }), growable: false);
}

List<$State> scanBack<$T, $State>($State Function($T, $State) folder, List<$T> array, $State state) {
    final len = array.length;
    var state_1 = state;
    final len_1 = len + 1;
    final res = List.generate(len_1, ((int i) {
        if (i == 0) {
            return state_1;
        } else {
            state_1 = folder(array[len - i], state_1);
            return state_1;
        }
    }), growable: false);
    reverseInPlace<$State>(res);
    return res;
}

List<$T> skip<$T>(int count, List<$T> array) {
    if (count > array.length) {
        throw Exception('count is greater than array length\\nParameter name: count');
    }
    if (count == array.length) {
        return <$T>[];
    } else {
        return array.sublist(dart_math.max<int>(count, 0));
    }
}

List<$T> skipWhile<$T>(bool Function($T) predicate, List<$T> array) {
    var count = 0;
    while ((count < array.length) && predicate(array[count])) {
        count = count + 1;
    }
    if (count == array.length) {
        return <$T>[];
    } else {
        return array.sublist(count);
    }
}

List<$T> take<$T>(int count, List<$T> array) {
    if (count < 0) {
        throw Exception('The input must be non-negative\\nParameter name: count');
    }
    if (count > array.length) {
        throw Exception('count is greater than array length\\nParameter name: count');
    }
    if (count == 0) {
        return <$T>[];
    } else {
        return array.sublist(0, count);
    }
}

List<$T> takeWhile<$T>(bool Function($T) predicate, List<$T> array) {
    var count = 0;
    while ((count < array.length) && predicate(array[count])) {
        count = count + 1;
    }
    if (count == 0) {
        return <$T>[];
    } else {
        return array.sublist(0, count);
    }
}

void addInPlace<$T>($T x, List<$T> array) {
    array.add(x);
}

void addRangeInPlace<$T>(Iterable<$T> range, List<$T> array) {
    array.addAll(range);
}

void insertRangeInPlace<$T>(int index, Iterable<$T> range, List<$T> array) {
    array.insertAll(index, range);
}

int removeAllInPlace<$T>(bool Function($T) predicate, List<$T> array) {
    final len = array.length;
    array.removeWhere(predicate);
    return len - array.length;
}

void copyTo<$T>(List<$T> source, int sourceIndex, List<$T> target, int targetIndex, int count) {
    List.copyRange(target, targetIndex, source, sourceIndex, (sourceIndex + count));
}

int indexOf<$T>(List<$T> array, $T item_1, types.Some<int>? start, types.Some<int>? count) {
    final start_1 = option.defaultValue(0, start);
    final i = array.indexOf(item_1, start_1);
    if ((count != null) && (i >= (start_1 + types.value(count)))) {
        return -1;
    } else {
        return i;
    }
}

types.Tuple2<List<$T>, List<$T>> partition<$T>(bool Function($T) f, List<$T> source) {
    final res1 = <$T>[];
    final res2 = <$T>[];
    for (var idx = 0; idx <= (source.length - 1); idx++) {
        final x = source[idx];
        if (f(x)) {
            res1.add(x);
        } else {
            res2.add(x);
        }
    }
    return types.Tuple2(res1, res2);
}

$T find<$T>(bool Function($T) predicate, List<$T> array) => array.firstWhere(predicate);

types.Some<$T>? tryFind<$T>(bool Function($T) predicate, List<$T> array) {
    try {
        return types.Some(find<$T>(predicate, array));
    } catch (matchValue) {
        return null;
    }
}

int findIndex<$T>(bool Function($T) predicate, List<$T> array) {
    final matchValue = array.indexWhere(predicate);
    if (matchValue == (-1)) {
        return indexNotFound<int>();
    } else {
        return matchValue;
    }
}

types.Some<int>? tryFindIndex<$T>(bool Function($T) predicate, List<$T> array) {
    final matchValue = array.indexWhere(predicate);
    if (matchValue == (-1)) {
        return null;
    } else {
        return types.Some(matchValue);
    }
}

$b pick<$a, $b>(types.Some<$b>? Function($a) chooser, List<$a> array) {
    $b loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i >= array.length) {
                return indexNotFound<$b>();
            } else {
                final types.Some<$b>? matchValue = chooser(array[i]);
                if (matchValue != null) {
                    return types.value(matchValue);
                } else {
                    i_mut = i + 1;
                    continue loop;
                }
            }
        }
    }
    return loop(0);
}

types.Some<$b>? tryPick<$a, $b>(types.Some<$b>? Function($a) chooser, List<$a> array) {
    types.Some<$b>? loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i >= array.length) {
                return null;
            } else {
                final types.Some<$b>? matchValue = chooser(array[i]);
                if (matchValue == null) {
                    i_mut = i + 1;
                    continue loop;
                } else {
                    return matchValue;
                }
            }
        }
    }
    return loop(0);
}

$a findBack<$a>(bool Function($a) predicate, List<$a> array) {
    $a loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i < 0) {
                return indexNotFound<$a>();
            } else if (predicate(array[i])) {
                return array[i];
            } else {
                i_mut = i - 1;
                continue loop;
            }
        }
    }
    return loop(array.length - 1);
}

types.Some<$a>? tryFindBack<$a>(bool Function($a) predicate, List<$a> array) {
    types.Some<$a>? loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i < 0) {
                return null;
            } else if (predicate(array[i])) {
                return types.Some(array[i]);
            } else {
                i_mut = i - 1;
                continue loop;
            }
        }
    }
    return loop(array.length - 1);
}

int findLastIndex<$a>(bool Function($a) predicate, List<$a> array) {
    int loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i < 0) {
                return -1;
            } else if (predicate(array[i])) {
                return i;
            } else {
                i_mut = i - 1;
                continue loop;
            }
        }
    }
    return loop(array.length - 1);
}

int findIndexBack<$a>(bool Function($a) predicate, List<$a> array) {
    int loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i < 0) {
                return indexNotFound<int>();
            } else if (predicate(array[i])) {
                return i;
            } else {
                i_mut = i - 1;
                continue loop;
            }
        }
    }
    return loop(array.length - 1);
}

types.Some<int>? tryFindIndexBack<$a>(bool Function($a) predicate, List<$a> array) {
    types.Some<int>? loop(int i_mut) {
        loop:
        while (true) {
            final i = i_mut;
            if (i < 0) {
                return null;
            } else if (predicate(array[i])) {
                return types.Some(i);
            } else {
                i_mut = i - 1;
                continue loop;
            }
        }
    }
    return loop(array.length - 1);
}

List<$U> choose<$T, $U>(types.Some<$U>? Function($T) chooser, List<$T> array) {
    final res = <$U>[];
    for (var i = 0; i <= (array.length - 1); i++) {
        final types.Some<$U>? matchValue = chooser(array[i]);
        if (matchValue != null) {
            res.add(types.value(matchValue));
        }
    }
    return res;
}

$State fold<$T, $State>($State Function($State, $T) folder, $State state, List<$T> array) {
    var state_1 = state;
    for (var idx = 0; idx <= (array.length - 1); idx++) {
        final x = array[idx];
        state_1 = folder(state_1, x);
    }
    return state_1;
}

void iterate<$T>(void Function($T) action, List<$T> array) {
    for (var i = 0; i <= (array.length - 1); i++) {
        action(array[i]);
    }
}

void iterateIndexed<$T>(void Function(int, $T) action, List<$T> array) {
    for (var i = 0; i <= (array.length - 1); i++) {
        action(i, array[i]);
    }
}

void iterate2<$T1, $T2>(void Function($T1, $T2) action, List<$T1> array1, List<$T2> array2) {
    if (array1.length != array2.length) {
        differentLengths<void>();
    }
    for (var i = 0; i <= (array1.length - 1); i++) {
        action(array1[i], array2[i]);
    }
}

void iterateIndexed2<$T1, $T2>(void Function(int, $T1, $T2) action, List<$T1> array1, List<$T2> array2) {
    if (array1.length != array2.length) {
        differentLengths<void>();
    }
    for (var i = 0; i <= (array1.length - 1); i++) {
        action(i, array1[i], array2[i]);
    }
}

bool forAll<$T>(bool Function($T) predicate, List<$T> array) => array.every(predicate);

List<$T> permute<$T>(int Function(int) f, List<$T> array) {
    final size = array.length;
    final res = array.sublist(0);
    final checkFlags = List.filled(size, 0, growable: false);
    iterateIndexed<$T>((int i, $T x_1) {
        final j = f(i);
        if ((j < 0) || (j >= size)) {
            throw Exception('Not a valid permutation');
        }
        res[j] = x_1;
        checkFlags[j] = 1;
    }, array);
    if (!(forAll<int>((int y) => 1 == y, checkFlags))) {
        throw Exception('Not a valid permutation');
    }
    return res;
}

void setSlice<$T>(List<$T> target, types.Some<int>? lower, types.Some<int>? upper, List<$T> source) {
    final lower_1 = option.defaultValue(0, lower);
    final upper_1 = option.defaultValue(-1, upper);
    final length = ((upper_1 >= 0) ? upper_1 : (target.length - 1)) - lower_1;
    for (var i = 0; i <= length; i++) {
        target[i + lower_1] = source[i];
    }
}

void sortInPlaceBy<$a, $b>($b Function($a) projection, List<$a> xs, types.IComparer<$b> comparer) {
    xs.sort(($a x, $a y) => comparer.Compare(projection(x), projection(y)));
}

void sortInPlace<$T>(List<$T> xs, types.IComparer<$T> comparer) {
    xs.sort(($T x, $T y) => comparer.Compare(x, y));
}

List<$T> sortInPlaceWith<$T>(int Function($T, $T) comparer, List<$T> xs) {
    xs.sort(comparer);
    return xs;
}

List<$T> sort<$T>(List<$T> xs, types.IComparer<$T> comparer) {
    final xs_1 = xs.sublist(0);
    xs_1.sort(($T x, $T y) => comparer.Compare(x, y));
    return xs_1;
}

List<$a> sortBy<$a, $b>($b Function($a) projection, List<$a> xs, types.IComparer<$b> comparer) => sortInPlaceWith<$a>(($a x, $a y) => comparer.Compare(projection(x), projection(y)), xs.sublist(0));

List<$T> sortDescending<$T>(List<$T> xs, types.IComparer<$T> comparer) => sortInPlaceWith<$T>(($T x, $T y) => comparer.Compare(x, y) * (-1), xs.sublist(0));

List<$a> sortByDescending<$a, $b>($b Function($a) projection, List<$a> xs, types.IComparer<$b> comparer) => sortInPlaceWith<$a>(($a x, $a y) => comparer.Compare(projection(x), projection(y)) * (-1), xs.sublist(0));

List<$T> sortWith<$T>(int Function($T, $T) comparer, List<$T> xs) => sortInPlaceWith<$T>(comparer, xs.sublist(0));

List<types.Tuple2<$T1, $T2>> allPairs<$T1, $T2>(List<$T1> xs, List<$T2> ys) {
    final len1 = xs.length;
    final len2 = ys.length;
    final len = len1 * len2;
    return List.generate(len, ((int i) => types.Tuple2(xs[i ~/ len2], ys[i.remainder(len2)])), growable: false);
}

List<$T> unfold<$T, $State>(types.Some<types.Tuple2<$T, $State>>? Function($State) generator, $State state) {
    final res = <$T>[];
    void loop($State state_1_mut) {
        loop:
        while (true) {
            final state_1 = state_1_mut;
            final types.Some<types.Tuple2<$T, $State>>? matchValue = generator(state_1);
            if (matchValue != null) {
                res.add(types.value(matchValue).item1);
                state_1_mut = types.value(matchValue).item2;
                continue loop;
            }
            break;
        }
    }
    loop(state);
    return res;
}

types.Tuple2<List<$a>, List<$b>> unzip<$a, $b>(List<types.Tuple2<$a, $b>> array) {
    final res1 = <$a>[];
    final res2 = <$b>[];
    for (var idx = 0; idx <= (array.length - 1); idx++) {
        final forLoopVar = array[idx];
        res1.add(forLoopVar.item1);
        res2.add(forLoopVar.item2);
    }
    return types.Tuple2(res1, res2);
}

types.Tuple3<List<$a>, List<$b>, List<$c>> unzip3<$a, $b, $c>(List<types.Tuple3<$a, $b, $c>> array) {
    final res1 = <$a>[];
    final res2 = <$b>[];
    final res3 = <$c>[];
    for (var idx = 0; idx <= (array.length - 1); idx++) {
        final forLoopVar = array[idx];
        res1.add(forLoopVar.item1);
        res2.add(forLoopVar.item2);
        res3.add(forLoopVar.item3);
    }
    return types.Tuple3(res1, res2, res3);
}

List<types.Tuple2<$T, $U>> zip<$T, $U>(List<$T> array1, List<$U> array2) {
    if (array1.length != array2.length) {
        differentLengths<void>();
    }
    final len = array1.length;
    return List.generate(len, ((int i) => types.Tuple2(array1[i], array2[i])), growable: false);
}

List<types.Tuple3<$T1, $T2, $T3>> zip3<$T1, $T2, $T3>(List<$T1> array1, List<$T2> array2, List<$T3> array3) {
    if ((array1.length != array2.length) || (array2.length != array3.length)) {
        differentLengths<void>();
    }
    final len = array1.length;
    return List.generate(len, ((int i) => types.Tuple3(array1[i], array2[i], array3[i])), growable: false);
}

List<List<$T>> chunkBySize<$T>(int chunkSize, List<$T> array) {
    if (chunkSize < 1) {
        throw Exception('The input must be positive.\\nParameter name: size');
    }
    if (array.isEmpty) {
        return [<$T>[]];
    } else {
        final len = array.length;
        final result = <List<$T>>[];
        for (var x = 0; x <= ((len.toDouble() / chunkSize.toDouble()).ceilToDouble().toInt() - 1); x++) {
            final start = x * chunkSize;
            final end_ = dart_math.min<int>(len, start + chunkSize);
            final slice = array.sublist(start, end_);
            result.add(slice);
        }
        return result;
    }
}

types.Tuple2<List<$T>, List<$T>> splitAt<$T>(int index, List<$T> array) {
    if ((index < 0) || (index > array.length)) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return types.Tuple2(array.sublist(0, index), array.sublist(index));
}

int compareWith<$T>(int Function($T, $T) comparer, List<$T> array1, List<$T> array2) {
    var i = 0;
    var result = 0;
    final length1 = array1.length;
    final length2 = array2.length;
    if (length1 > length2) {
        return 1;
    } else if (length1 < length2) {
        return -1;
    } else {
        while ((i < length1) && (result == 0)) {
            result = comparer(array1[i], array2[i]);
            i = i + 1;
        }
        return result;
    }
}

bool equalsWith<$T>(bool Function($T, $T) equals, List<$T> array1, List<$T> array2) {
    var i = 0;
    var result = true;
    final length1 = array1.length;
    final length2 = array2.length;
    if (length1 > length2) {
        return false;
    } else if (length1 < length2) {
        return false;
    } else {
        while ((i < length1) && result) {
            result = equals(array1[i], array2[i]);
            i = i + 1;
        }
        return result;
    }
}

$T exactlyOne<$T>(List<$T> array) {
    if (array.length == 1) {
        return array[0];
    } else if (array.isEmpty) {
        return throw Exception('The input sequence was empty\\nParameter name: array');
    } else {
        return throw Exception('Input array too long\\nParameter name: array');
    }
}

types.Some<$T>? tryExactlyOne<$T>(List<$T> array) {
    if (array.length == 1) {
        return types.Some(array[0]);
    } else {
        return null;
    }
}

$T head<$T>(List<$T> array) {
    if (array.isEmpty) {
        return throw Exception('The input array was empty\\nParameter name: array');
    } else {
        return array[0];
    }
}

types.Some<$T>? tryHead<$T>(List<$T> array) {
    if (array.isEmpty) {
        return null;
    } else {
        return types.Some(array[0]);
    }
}

List<$T> tail<$T>(List<$T> array) {
    if (array.isEmpty) {
        throw Exception('Not enough elements\\nParameter name: array');
    }
    return array.sublist(1);
}

$a item<$a>(int index, List<$a> array) => array[index];

types.Some<$T>? tryItem<$T>(int index, List<$T> array) {
    if ((index < 0) || (index >= array.length)) {
        return null;
    } else {
        return types.Some(array[index]);
    }
}

$State foldBack<$T, $State>($State Function($T, $State) folder, List<$T> array, $State state) {
    var acc = state;
    for (var i = array.length - 1; i >= 0; i--) {
        acc = folder(array[i], acc);
    }
    return acc;
}

$State fold2<$T1, $T2, $State>($State Function($State, $T1, $T2) folder, $State state, List<$T1> array1, List<$T2> array2) {
    var acc = state;
    if (array1.length != array2.length) {
        throw Exception('Arrays have different lengths');
    }
    for (var i = 0; i <= (array1.length - 1); i++) {
        acc = folder(acc, array1[i], array2[i]);
    }
    return acc;
}

$State foldBack2<$T1, $T2, $State>($State Function($T1, $T2, $State) folder, List<$T1> array1, List<$T2> array2, $State state) {
    var acc = state;
    if (array1.length != array2.length) {
        differentLengths<void>();
    }
    for (var i = array1.length - 1; i >= 0; i--) {
        acc = folder(array1[i], array2[i], acc);
    }
    return acc;
}

$T reduce<$T>($T Function($T, $T) reduction, List<$T> array) {
    final combine = reduction;
    return array.reduce(combine);
}

$T reduceBack<$T>($T Function($T, $T) reduction, List<$T> array) {
    if (array.isEmpty) {
        throw Exception('The input array was empty');
    }
    var i = array.length - 1;
    var state = array[i];
    while (i > 0) {
        i = i - 1;
        state = reduction(array[i], state);
    }
    return state;
}

bool forAll2<$a, $b>(bool Function($a, $b) predicate, List<$a> array1, List<$b> array2) => fold2<$a, $b, bool>((bool acc, $a x, $b y) {
    if (acc) {
        return predicate(x, y);
    } else {
        return false;
    }
}, true, array1, array2);

bool existsOffset<$T>(bool Function($T) predicate_mut, List<$T> array_mut, int index_mut) {
    existsOffset:
    while (true) {
        final predicate = predicate_mut;
        final array = array_mut;
        final index = index_mut;
        if (index == array.length) {
            return false;
        } else if (predicate(array[index])) {
            return true;
        } else {
            predicate_mut = predicate;
            array_mut = array;
            index_mut = index + 1;
            continue existsOffset;
        }
    }
}

bool exists<$$a>(bool Function($$a) predicate, List<$$a> array) => existsOffset<$$a>(predicate, array, 0);

bool existsOffset2<$$a, $$b>(bool Function($$a, $$b) predicate_mut, List<$$a> array1_mut, List<$$b> array2_mut, int index_mut) {
    existsOffset2:
    while (true) {
        final predicate = predicate_mut;
        final array1 = array1_mut;
        final array2 = array2_mut;
        final index = index_mut;
        if (index == array1.length) {
            return false;
        } else if (predicate(array1[index], array2[index])) {
            return true;
        } else {
            predicate_mut = predicate;
            array1_mut = array1;
            array2_mut = array2;
            index_mut = index + 1;
            continue existsOffset2;
        }
    }
}

bool exists2<$$a, $$b>(bool Function($$a, $$b) predicate, List<$$a> array1, List<$$b> array2) {
    if (array1.length != array2.length) {
        differentLengths<void>();
    }
    return existsOffset2<$$a, $$b>(predicate, array1, array2, 0);
}

$T sum<$T>(List<$T> array, types.IGenericAdder<$T> adder) {
    var acc = adder.GetZero();
    for (var i = 0; i <= (array.length - 1); i++) {
        acc = adder.Add(acc, array[i]);
    }
    return acc;
}

$T2 sumBy<$T, $T2>($T2 Function($T) projection, List<$T> array, types.IGenericAdder<$T2> adder) {
    var acc = adder.GetZero();
    for (var i = 0; i <= (array.length - 1); i++) {
        acc = adder.Add(acc, projection(array[i]));
    }
    return acc;
}

$a maxBy<$a, $b>($b Function($a) projection, List<$a> xs, types.IComparer<$b> comparer) => reduce<$a>(($a x, $a y) {
    if (comparer.Compare(projection(y), projection(x)) > 0) {
        return y;
    } else {
        return x;
    }
}, xs);

$a max<$a>(List<$a> xs, types.IComparer<$a> comparer) => reduce<$a>(($a x, $a y) {
    if (comparer.Compare(y, x) > 0) {
        return y;
    } else {
        return x;
    }
}, xs);

$a minBy<$a, $b>($b Function($a) projection, List<$a> xs, types.IComparer<$b> comparer) => reduce<$a>(($a x, $a y) {
    if (comparer.Compare(projection(y), projection(x)) > 0) {
        return x;
    } else {
        return y;
    }
}, xs);

$a min<$a>(List<$a> xs, types.IComparer<$a> comparer) => reduce<$a>(($a x, $a y) {
    if (comparer.Compare(y, x) > 0) {
        return x;
    } else {
        return y;
    }
}, xs);

$T average<$T>(List<$T> array, types.IGenericAverager<$T> averager) {
    if (array.isEmpty) {
        throw Exception('The input array was empty\\nParameter name: array');
    }
    var total = averager.GetZero();
    for (var i = 0; i <= (array.length - 1); i++) {
        total = averager.Add(total, array[i]);
    }
    return averager.DivideByInt(total, array.length);
}

$T2 averageBy<$T, $T2>($T2 Function($T) projection, List<$T> array, types.IGenericAverager<$T2> averager) {
    if (array.isEmpty) {
        throw Exception('The input array was empty\\nParameter name: array');
    }
    var total = averager.GetZero();
    for (var i = 0; i <= (array.length - 1); i++) {
        total = averager.Add(total, projection(array[i]));
    }
    return averager.DivideByInt(total, array.length);
}

List<List<$T>> windowed<$T>(int windowSize, List<$T> source) {
    if (windowSize <= 0) {
        throw Exception('windowSize must be positive');
    }
    final len_1 = dart_math.max<int>(0, (source.length - windowSize) + 1);
    return List.generate(len_1, ((int i) => source.sublist(i, ((i + windowSize) - 1) + 1)), growable: false);
}

List<List<$T>> splitInto<$T>(int chunks, List<$T> array) {
    if (chunks < 1) {
        throw Exception('The input must be positive.\\nParameter name: chunks');
    }
    if (array.isEmpty) {
        return [<$T>[]];
    } else {
        final len = array.length;
        final result = <List<$T>>[];
        final chunks_1 = dart_math.min<int>(chunks, len);
        final minChunkSize = len ~/ chunks_1;
        final chunksWithExtraItem = len.remainder(chunks_1);
        for (var i = 0; i <= (chunks_1 - 1); i++) {
            final chunkSize = (i < chunksWithExtraItem) ? (minChunkSize + 1) : minChunkSize;
            final start = (i * minChunkSize) + dart_math.min<int>(chunksWithExtraItem, i);
            final end_ = dart_math.min<int>(len, start + chunkSize);
            final slice = array.sublist(start, end_);
            result.add(slice);
        }
        return result;
    }
}

List<List<$T>> transpose<$T>(Iterable<List<$T>> arrays) {
    late final List<List<$T>> arrays_2;
    if (arrays is List<List<$T>>) {
        final arrays_1 = arrays;
        arrays_2 = arrays_1;
    } else {
        arrays_2 = List.of(arrays);
    }
    final len = arrays_2.length;
    if (len == 0) {
        return <List<$T>>[];
    } else {
        final firstArray = arrays_2[0];
        final lenInner = firstArray.length;
        if (!(forAll<List<$T>>((List<$T> a) => a.length == lenInner, arrays_2))) {
            differentLengths<void>();
        }
        return List.generate(lenInner, ((int i) => List.generate(len, ((int j) => arrays_2[j][i]), growable: false)), growable: false);
    }
}

List<$T> insertAt<$T>(int index, $T y, List<$T> xs) {
    final len = xs.length;
    if ((index < 0) || (index > len)) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    final len_1 = len + 1;
    return List.generate(len_1, ((int i) {
        if (i < index) {
            return xs[i];
        } else if (i == index) {
            return y;
        } else {
            return xs[i - 1];
        }
    }), growable: false);
}

List<$T> insertManyAt<$T>(int index, Iterable<$T> ys, List<$T> xs) {
    final len = xs.length;
    if ((index < 0) || (index > len)) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    late final List<$T> ys_2;
    if (ys is List<$T>) {
        final ys_1 = ys;
        ys_2 = ys_1;
    } else {
        ys_2 = List.of(ys);
    }
    final len2 = ys_2.length;
    final index2 = index + len2;
    final len_1 = len + len2;
    return List.generate(len_1, ((int i) {
        if (i < index) {
            return xs[i];
        } else if (i < index2) {
            return ys_2[i - index];
        } else {
            return xs[i - len2];
        }
    }), growable: false);
}

List<$T> removeAt<$T>(int index, List<$T> xs) {
    if ((index < 0) || (index >= xs.length)) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    var i = -1;
    return filter<$T>(($T _arg) {
        i = i + 1;
        return i != index;
    }, xs);
}

List<$T> removeManyAt<$T>(int index, int count, List<$T> xs) {
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

List<$T> updateAt<$T>(int index, $T y, List<$T> xs) {
    final len = xs.length;
    if ((index < 0) || (index >= len)) {
        throw Exception((global$.SR_indexOutOfBounds + '\\nParameter name: ') + 'index');
    }
    return List.generate(len, ((int i) {
        if (i == index) {
            return y;
        } else {
            return xs[i];
        }
    }), growable: false);
}

