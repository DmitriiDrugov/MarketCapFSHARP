// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Seq.dart' as seq;
import './Types.dart' as types;

types.Some<types.Tuple2<$T, $T>>? Function($T) makeRangeStepFunction<$T>($T step, $T stop, $T zero, $T Function($T, $T) add, int Function($T, $T) compare) {
    final stepComparedWithZero = compare(step, zero);
    if (stepComparedWithZero == 0) {
        throw Exception('The step of a range cannot be zero');
    }
    final stepGreaterThanZero = stepComparedWithZero > 0;
    return ($T x) {
        final comparedWithLast = compare(x, stop);
        if ((stepGreaterThanZero && (comparedWithLast <= 0)) || (!stepGreaterThanZero && (comparedWithLast >= 0))) {
            return types.Some(types.Tuple2(x, add(x, step)));
        } else {
            return null;
        }
    };
}

Iterable<$T> integralRangeStep<$T>($T start, $T step, $T stop, $T zero, $T Function($T, $T) add, int Function($T, $T) compare) {
    final stepFn = makeRangeStepFunction<$T>(step, stop, zero, add, compare);
    return seq.delay<$T>(() => seq.unfold<$T, $T>(stepFn, start));
}

Iterable<double> rangeDouble(double start, double step, double stop) => integralRangeStep<double>(start, step, stop, 0.0, (double x, double y) => x + y, (double e, double e_1) => e.compareTo(e_1));

Iterable<int> rangeInt(int start, int step, int stop) => integralRangeStep<int>(start, step, stop, 0, (int x, int y) => x + y, (int e, int e_1) => e.compareTo(e_1));

Iterable<int> rangeChar(int start, int stop) => seq.delay<int>(() => seq.unfold<int, int>((int c) {
    if (c <= stop) {
        return types.Some(types.Tuple2(c, c + 1));
    } else {
        return null;
    }
}, start));

