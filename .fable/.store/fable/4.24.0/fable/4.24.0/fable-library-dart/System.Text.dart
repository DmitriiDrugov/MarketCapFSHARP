// ignore_for_file: camel_case_types, constant_identifier_names, non_constant_identifier_names, unnecessary_this
import './String.dart' as string;

class StringBuilder {
    late final List<String> buf;
    StringBuilder(String value, int capacity) {
        this.buf = <String>[];
        if (!(string.isNullOrEmpty(value))) {
            this.buf.add(value);
        }
    }

    @override
    String toString() => this.buf.join('');
}

StringBuilder StringBuilder_$ctor_Z524259A4(int capacity) => StringBuilder('', capacity);

StringBuilder StringBuilder_$ctor_Z721C83C5(String value) => StringBuilder(value, 16);

StringBuilder StringBuilder_$ctor() => StringBuilder('', 16);

StringBuilder StringBuilder__Append_Z721C83C5(StringBuilder x, String s) {
    x.buf.add(s);
    return x;
}

StringBuilder StringBuilder__Append_487EF8FB(StringBuilder x, String s, int startIndex, int count) {
    x.buf.add(s.substring(startIndex, startIndex + count));
    return x;
}

StringBuilder StringBuilder__Append_244C7CD6(StringBuilder x, int c) {
    x.buf.add(String.fromCharCode(c));
    return x;
}

StringBuilder StringBuilder__Append_Z524259A4(StringBuilder x, int o) {
    x.buf.add(o.toString());
    return x;
}

StringBuilder StringBuilder__Append_5E38073B(StringBuilder x, double o) {
    x.buf.add(o.toString());
    return x;
}

StringBuilder StringBuilder__Append_Z1FBCCD16(StringBuilder x, bool o) {
    x.buf.add(o.toString());
    return x;
}

StringBuilder StringBuilder__Append_4E60E31B(StringBuilder x, dynamic o) {
    x.buf.add(o.toString());
    return x;
}

StringBuilder StringBuilder__Append_Z372E4D23(StringBuilder x, List<int> cs) {
    x.buf.add(String.fromCharCodes(cs));
    return x;
}

StringBuilder StringBuilder__Append_43A65C09(StringBuilder x, StringBuilder s) {
    x.buf.add(s.toString());
    return x;
}

StringBuilder StringBuilder__AppendLine(StringBuilder x) {
    x.buf.add('\n');
    return x;
}

StringBuilder StringBuilder__AppendLine_Z721C83C5(StringBuilder x, String s) {
    x.buf.add(s);
    x.buf.add('\n');
    return x;
}

StringBuilder StringBuilder__Clear(StringBuilder x) {
    x.buf.clear();
    return x;
}

int StringBuilder__get_Chars_Z524259A4(StringBuilder x, int index) {
    var len = 0;
    var i = -1;
    while (((i + 1) < x.buf.length) && (len < index)) {
        i = i + 1;
        len = len + x.buf[i].length;
    }
    if (((index < 0) || (i < 0)) || (i >= x.buf.length)) {
        return throw Exception('Index was outside the bounds of the array');
    } else {
        final pos = (len - index) - 1;
        return x.buf[i].codeUnitAt(pos);
    }
}

void StringBuilder__set_Chars_413E0D0A(StringBuilder x, int index, int value) {
    var len = 0;
    var i = -1;
    while (((i + 1) < x.buf.length) && (len < index)) {
        i = i + 1;
        len = len + x.buf[i].length;
    }
    if (((index < 0) || (i < 0)) || (i >= x.buf.length)) {
        throw Exception('Index was outside the bounds of the array');
    } else {
        final pos = (len - index) - 1;
        x.buf[i] = (x.buf[i].substring(0, (pos - 1) + 1) + String.fromCharCode(value)) + x.buf[i].substring(pos + 1);
    }
}

StringBuilder StringBuilder__Replace_Z766F94C0(StringBuilder x, int oldValue, int newValue) {
    final oldValue_1 = String.fromCharCode(oldValue);
    final newValue_1 = String.fromCharCode(newValue);
    for (var i = x.buf.length - 1; i >= 0; i--) {
        x.buf[i] = x.buf[i].replaceAll(oldValue_1, newValue_1);
    }
    return x;
}

StringBuilder StringBuilder__Replace_Z384F8060(StringBuilder x, String oldValue, String newValue) {
    final str = x.toString().replaceAll(oldValue, newValue);
    return StringBuilder__Append_Z721C83C5(StringBuilder__Clear(x), str);
}

int StringBuilder__get_Length(StringBuilder x) {
    var len = 0;
    for (var i = x.buf.length - 1; i >= 0; i--) {
        len = len + x.buf[i].length;
    }
    return len;
}

String StringBuilder__ToString_Z37302880(StringBuilder x, int firstIndex, int length) {
    final str = x.toString();
    return str.substring(firstIndex, firstIndex + length);
}

