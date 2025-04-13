// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './Types.dart' as types;
import './Util.dart' as util;

abstract class FSharpChoice$2<$T1, $T2> implements types.Union, Comparable<FSharpChoice$2<$T1, $T2>> {
    final int tag;
    const FSharpChoice$2(this.tag);
}

class FSharpChoice$2_Choice1Of2<$T1, $T2> extends FSharpChoice$2<$T1, $T2> {
    final $T1 Item;
    const FSharpChoice$2_Choice1Of2(this.Item): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$2_Choice1Of2<$T1, $T2>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$2<$T1, $T2> other) {
        if (other is FSharpChoice$2_Choice1Of2<$T1, $T2>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$2_Choice2Of2<$T1, $T2> extends FSharpChoice$2<$T1, $T2> {
    final $T2 Item;
    const FSharpChoice$2_Choice2Of2(this.Item): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$2_Choice2Of2<$T1, $T2>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$2<$T1, $T2> other) {
        if (other is FSharpChoice$2_Choice2Of2<$T1, $T2>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

abstract class FSharpChoice$3<$T1, $T2, $T3> implements types.Union, Comparable<FSharpChoice$3<$T1, $T2, $T3>> {
    final int tag;
    const FSharpChoice$3(this.tag);
}

class FSharpChoice$3_Choice1Of3<$T1, $T2, $T3> extends FSharpChoice$3<$T1, $T2, $T3> {
    final $T1 Item;
    const FSharpChoice$3_Choice1Of3(this.Item): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$3_Choice1Of3<$T1, $T2, $T3>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$3<$T1, $T2, $T3> other) {
        if (other is FSharpChoice$3_Choice1Of3<$T1, $T2, $T3>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$3_Choice2Of3<$T1, $T2, $T3> extends FSharpChoice$3<$T1, $T2, $T3> {
    final $T2 Item;
    const FSharpChoice$3_Choice2Of3(this.Item): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$3_Choice2Of3<$T1, $T2, $T3>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$3<$T1, $T2, $T3> other) {
        if (other is FSharpChoice$3_Choice2Of3<$T1, $T2, $T3>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$3_Choice3Of3<$T1, $T2, $T3> extends FSharpChoice$3<$T1, $T2, $T3> {
    final $T3 Item;
    const FSharpChoice$3_Choice3Of3(this.Item): super(2);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$3_Choice3Of3<$T1, $T2, $T3>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$3<$T1, $T2, $T3> other) {
        if (other is FSharpChoice$3_Choice3Of3<$T1, $T2, $T3>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

abstract class FSharpChoice$4<$T1, $T2, $T3, $T4> implements types.Union, Comparable<FSharpChoice$4<$T1, $T2, $T3, $T4>> {
    final int tag;
    const FSharpChoice$4(this.tag);
}

class FSharpChoice$4_Choice1Of4<$T1, $T2, $T3, $T4> extends FSharpChoice$4<$T1, $T2, $T3, $T4> {
    final $T1 Item;
    const FSharpChoice$4_Choice1Of4(this.Item): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$4_Choice1Of4<$T1, $T2, $T3, $T4>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$4<$T1, $T2, $T3, $T4> other) {
        if (other is FSharpChoice$4_Choice1Of4<$T1, $T2, $T3, $T4>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$4_Choice2Of4<$T1, $T2, $T3, $T4> extends FSharpChoice$4<$T1, $T2, $T3, $T4> {
    final $T2 Item;
    const FSharpChoice$4_Choice2Of4(this.Item): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$4_Choice2Of4<$T1, $T2, $T3, $T4>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$4<$T1, $T2, $T3, $T4> other) {
        if (other is FSharpChoice$4_Choice2Of4<$T1, $T2, $T3, $T4>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$4_Choice3Of4<$T1, $T2, $T3, $T4> extends FSharpChoice$4<$T1, $T2, $T3, $T4> {
    final $T3 Item;
    const FSharpChoice$4_Choice3Of4(this.Item): super(2);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$4_Choice3Of4<$T1, $T2, $T3, $T4>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$4<$T1, $T2, $T3, $T4> other) {
        if (other is FSharpChoice$4_Choice3Of4<$T1, $T2, $T3, $T4>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$4_Choice4Of4<$T1, $T2, $T3, $T4> extends FSharpChoice$4<$T1, $T2, $T3, $T4> {
    final $T4 Item;
    const FSharpChoice$4_Choice4Of4(this.Item): super(3);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$4_Choice4Of4<$T1, $T2, $T3, $T4>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$4<$T1, $T2, $T3, $T4> other) {
        if (other is FSharpChoice$4_Choice4Of4<$T1, $T2, $T3, $T4>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

abstract class FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> implements types.Union, Comparable<FSharpChoice$5<$T1, $T2, $T3, $T4, $T5>> {
    final int tag;
    const FSharpChoice$5(this.tag);
}

class FSharpChoice$5_Choice1Of5<$T1, $T2, $T3, $T4, $T5> extends FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> {
    final $T1 Item;
    const FSharpChoice$5_Choice1Of5(this.Item): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$5_Choice1Of5<$T1, $T2, $T3, $T4, $T5>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> other) {
        if (other is FSharpChoice$5_Choice1Of5<$T1, $T2, $T3, $T4, $T5>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$5_Choice2Of5<$T1, $T2, $T3, $T4, $T5> extends FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> {
    final $T2 Item;
    const FSharpChoice$5_Choice2Of5(this.Item): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$5_Choice2Of5<$T1, $T2, $T3, $T4, $T5>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> other) {
        if (other is FSharpChoice$5_Choice2Of5<$T1, $T2, $T3, $T4, $T5>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$5_Choice3Of5<$T1, $T2, $T3, $T4, $T5> extends FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> {
    final $T3 Item;
    const FSharpChoice$5_Choice3Of5(this.Item): super(2);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$5_Choice3Of5<$T1, $T2, $T3, $T4, $T5>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> other) {
        if (other is FSharpChoice$5_Choice3Of5<$T1, $T2, $T3, $T4, $T5>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$5_Choice4Of5<$T1, $T2, $T3, $T4, $T5> extends FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> {
    final $T4 Item;
    const FSharpChoice$5_Choice4Of5(this.Item): super(3);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$5_Choice4Of5<$T1, $T2, $T3, $T4, $T5>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> other) {
        if (other is FSharpChoice$5_Choice4Of5<$T1, $T2, $T3, $T4, $T5>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$5_Choice5Of5<$T1, $T2, $T3, $T4, $T5> extends FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> {
    final $T5 Item;
    const FSharpChoice$5_Choice5Of5(this.Item): super(4);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$5_Choice5Of5<$T1, $T2, $T3, $T4, $T5>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$5<$T1, $T2, $T3, $T4, $T5> other) {
        if (other is FSharpChoice$5_Choice5Of5<$T1, $T2, $T3, $T4, $T5>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

abstract class FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> implements types.Union, Comparable<FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6>> {
    final int tag;
    const FSharpChoice$6(this.tag);
}

class FSharpChoice$6_Choice1Of6<$T1, $T2, $T3, $T4, $T5, $T6> extends FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> {
    final $T1 Item;
    const FSharpChoice$6_Choice1Of6(this.Item): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$6_Choice1Of6<$T1, $T2, $T3, $T4, $T5, $T6>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> other) {
        if (other is FSharpChoice$6_Choice1Of6<$T1, $T2, $T3, $T4, $T5, $T6>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$6_Choice2Of6<$T1, $T2, $T3, $T4, $T5, $T6> extends FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> {
    final $T2 Item;
    const FSharpChoice$6_Choice2Of6(this.Item): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$6_Choice2Of6<$T1, $T2, $T3, $T4, $T5, $T6>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> other) {
        if (other is FSharpChoice$6_Choice2Of6<$T1, $T2, $T3, $T4, $T5, $T6>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$6_Choice3Of6<$T1, $T2, $T3, $T4, $T5, $T6> extends FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> {
    final $T3 Item;
    const FSharpChoice$6_Choice3Of6(this.Item): super(2);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$6_Choice3Of6<$T1, $T2, $T3, $T4, $T5, $T6>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> other) {
        if (other is FSharpChoice$6_Choice3Of6<$T1, $T2, $T3, $T4, $T5, $T6>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$6_Choice4Of6<$T1, $T2, $T3, $T4, $T5, $T6> extends FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> {
    final $T4 Item;
    const FSharpChoice$6_Choice4Of6(this.Item): super(3);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$6_Choice4Of6<$T1, $T2, $T3, $T4, $T5, $T6>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> other) {
        if (other is FSharpChoice$6_Choice4Of6<$T1, $T2, $T3, $T4, $T5, $T6>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$6_Choice5Of6<$T1, $T2, $T3, $T4, $T5, $T6> extends FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> {
    final $T5 Item;
    const FSharpChoice$6_Choice5Of6(this.Item): super(4);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$6_Choice5Of6<$T1, $T2, $T3, $T4, $T5, $T6>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> other) {
        if (other is FSharpChoice$6_Choice5Of6<$T1, $T2, $T3, $T4, $T5, $T6>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$6_Choice6Of6<$T1, $T2, $T3, $T4, $T5, $T6> extends FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> {
    final $T6 Item;
    const FSharpChoice$6_Choice6Of6(this.Item): super(5);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$6_Choice6Of6<$T1, $T2, $T3, $T4, $T5, $T6>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$6<$T1, $T2, $T3, $T4, $T5, $T6> other) {
        if (other is FSharpChoice$6_Choice6Of6<$T1, $T2, $T3, $T4, $T5, $T6>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

abstract class FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> implements types.Union, Comparable<FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>> {
    final int tag;
    const FSharpChoice$7(this.tag);
}

class FSharpChoice$7_Choice1Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T1 Item;
    const FSharpChoice$7_Choice1Of7(this.Item): super(0);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice1Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice1Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$7_Choice2Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T2 Item;
    const FSharpChoice$7_Choice2Of7(this.Item): super(1);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice2Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice2Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$7_Choice3Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T3 Item;
    const FSharpChoice$7_Choice3Of7(this.Item): super(2);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice3Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice3Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$7_Choice4Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T4 Item;
    const FSharpChoice$7_Choice4Of7(this.Item): super(3);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice4Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice4Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$7_Choice5Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T5 Item;
    const FSharpChoice$7_Choice5Of7(this.Item): super(4);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice5Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice5Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$7_Choice6Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T6 Item;
    const FSharpChoice$7_Choice6Of7(this.Item): super(5);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice6Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice6Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

class FSharpChoice$7_Choice7Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> extends FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> {
    final $T7 Item;
    const FSharpChoice$7_Choice7Of7(this.Item): super(6);
    @override
    bool operator ==(Object other) => (other is FSharpChoice$7_Choice7Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) && util.equalsDynamic(other.Item, Item);
    @override
    int get hashCode => util.combineHashCodes([tag.hashCode, Item.hashCode]);
    @override
    int compareTo(FSharpChoice$7<$T1, $T2, $T3, $T4, $T5, $T6, $T7> other) {
        if (other is FSharpChoice$7_Choice7Of7<$T1, $T2, $T3, $T4, $T5, $T6, $T7>) {
            return util.compareDynamic(Item, other.Item);
        } else {
            return tag.compareTo(other.tag);
        }
    }
}

FSharpChoice$2<$T1, $$a> Choice_makeChoice1Of2<$T1, $$a>($T1 x) => FSharpChoice$2_Choice1Of2<$T1, $$a>(x);

FSharpChoice$2<$$a, $T2> Choice_makeChoice2Of2<$T2, $$a>($T2 x) => FSharpChoice$2_Choice2Of2<$$a, $T2>(x);

types.Some<$T1>? Choice_tryValueIfChoice1Of2<$T1, $T2>(FSharpChoice$2<$T1, $T2> x) {
    if (x.tag == /* Choice1Of2 */ 0) {
        final x_2 = x as FSharpChoice$2_Choice1Of2<$T1, $T2>;
        return types.Some(x_2.Item);
    } else {
        return null;
    }
}

types.Some<$T2>? Choice_tryValueIfChoice2Of2<$T1, $T2>(FSharpChoice$2<$T1, $T2> x) {
    if (x.tag == /* Choice2Of2 */ 1) {
        final x_2 = x as FSharpChoice$2_Choice2Of2<$T1, $T2>;
        return types.Some(x_2.Item);
    } else {
        return null;
    }
}

