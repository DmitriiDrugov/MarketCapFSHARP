pub mod System {
    use super::*;
    pub mod Collections {
        use super::*;
        pub mod Generic {
            use super::*;
            use crate::Array_::copyTo;
            use crate::Array_::fill;
            use crate::NativeArray_::add;
            use crate::NativeArray_::get_Count as get_Count_1;
            use crate::NativeArray_::new_init;
            use crate::NativeArray_::new_with_capacity;
            use crate::NativeArray_::Array;
            use crate::Native_::compare;
            use crate::Native_::getHashCode as getHashCode_1;
            use crate::Native_::getZero;
            use crate::Native_::Func0;
            use crate::Native_::Func1;
            use crate::Native_::Func2;
            use crate::Native_::LrcPtr;
            use crate::Native_::MutCell;
            use crate::Range_::rangeNumeric;
            use crate::Seq_::delay;
            use crate::Seq_::map;
            use crate::Seq_::toArray;
            use crate::String_::string;
            use crate::System::Collections::Generic::IComparer_1;
            use crate::System::Collections::Generic::IEnumerable_1;
            use crate::System::Collections::Generic::IEnumerator_1;
            use crate::System::Collections::Generic::IEqualityComparer_1;
            #[derive(Clone)]
            pub struct Comparer_1<T: Clone + 'static> {
                comparison: Func2<T, T, i32>,
            }
            impl<T: Clone + 'static> Comparer_1<T> {
                pub fn _ctor__47C913C(
                    comparison: Func2<T, T, i32>,
                ) -> LrcPtr<System::Collections::Generic::Comparer_1<T>> {
                    let comparison_1;
                    ();
                    comparison_1 = comparison;
                    ();
                    LrcPtr::new(System::Collections::Generic::Comparer_1::<T> {
                        comparison: comparison_1,
                    })
                }
                pub fn get_Default<V: PartialOrd + Clone + 'static>(
                ) -> LrcPtr<System::Collections::Generic::Comparer_1<V>> {
                    System::Collections::Generic::Comparer_1::_ctor__47C913C(Func2::new(
                        move |e: V, e_1: V| compare(e, e_1),
                    ))
                }
                pub fn Create__47C913C(
                    comparison: Func2<T, T, i32>,
                ) -> LrcPtr<System::Collections::Generic::Comparer_1<T>> {
                    System::Collections::Generic::Comparer_1::_ctor__47C913C(comparison)
                }
                pub fn Compare_5BDDA0(&self, x: T, y: T) -> i32 {
                    let __self__ = self;
                    (__self__.comparison)(x, y)
                }
            }
            impl<T: Clone + 'static> core::fmt::Debug for Comparer_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: Clone + 'static> core::fmt::Display for Comparer_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: Clone + 'static> IComparer_1<T> for Comparer_1<T> {
                fn Compare(&self, x: T, y: T) -> i32 {
                    let __self__ = self;
                    (__self__.comparison)(x, y)
                }
            }
            #[derive(Clone)]
            pub struct EqualityComparer_1<T: Clone + 'static> {
                getHashCode: Func1<T, i32>,
                equals: Func2<T, T, bool>,
            }
            impl<T: Clone + 'static> EqualityComparer_1<T> {
                pub fn _ctor__Z6EE254AB(
                    equals: Func2<T, T, bool>,
                    getHashCode: Func1<T, i32>,
                ) -> LrcPtr<System::Collections::Generic::EqualityComparer_1<T>> {
                    let getHashCode_1;
                    let equals_1;
                    ();
                    equals_1 = equals;
                    getHashCode_1 = getHashCode;
                    ();
                    LrcPtr::new(System::Collections::Generic::EqualityComparer_1::<T> {
                        getHashCode: getHashCode_1,
                        equals: equals_1,
                    })
                }
                pub fn get_Default<V: core::hash::Hash + PartialEq + Clone + 'static>(
                ) -> LrcPtr<System::Collections::Generic::EqualityComparer_1<V>> {
                    System::Collections::Generic::EqualityComparer_1::_ctor__Z6EE254AB(
                        Func2::new(move |e: V, e_1: V| (e) == (e_1)),
                        Func1::new(move |obj: V| getHashCode_1(obj)),
                    )
                }
                pub fn Create__Z6EE254AB(
                    equals: Func2<T, T, bool>,
                    getHashCode: Func1<T, i32>,
                ) -> LrcPtr<System::Collections::Generic::EqualityComparer_1<T>> {
                    System::Collections::Generic::EqualityComparer_1::_ctor__Z6EE254AB(
                        equals,
                        getHashCode,
                    )
                }
                pub fn Equals_5BDDA0(&self, x: T, y: T) -> bool {
                    let __self__ = self;
                    (__self__.equals)(x, y)
                }
                pub fn GetHashCode_2B595(&self, x: T) -> i32 {
                    let __self__ = self;
                    (__self__.getHashCode)(x)
                }
            }
            impl<T: Clone + 'static> core::fmt::Debug for EqualityComparer_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: Clone + 'static> core::fmt::Display for EqualityComparer_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: Clone + 'static> IEqualityComparer_1<T> for EqualityComparer_1<T> {
                fn Equals(&self, x: T, y: T) -> bool {
                    let __self__ = self;
                    (__self__.equals)(x, y)
                }
                fn GetHashCode(&self, x: T) -> i32 {
                    let __self__ = self;
                    (__self__.getHashCode)(x)
                }
            }
            #[derive(Clone)]
            pub struct Stack_1<T: core::hash::Hash + PartialEq + Clone + 'static> {
                contents: MutCell<Array<T>>,
                count: MutCell<i32>,
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> Stack_1<T> {
                fn _ctor__Z3B4C077E(
                    initialContents: Array<T>,
                    initialCount: i32,
                ) -> LrcPtr<System::Collections::Generic::Stack_1<T>> {
                    let contents: Array<T>;
                    let count: i32;
                    ();
                    contents = initialContents;
                    count = initialCount;
                    ();
                    LrcPtr::new(System::Collections::Generic::Stack_1::<T> {
                        contents: MutCell::new(contents),
                        count: MutCell::new(count),
                    })
                }
                pub fn _ctor__Z524259A4(
                    initialCapacity: i32,
                ) -> LrcPtr<System::Collections::Generic::Stack_1<T>> {
                    System::Collections::Generic::Stack_1::_ctor__Z3B4C077E(
                        new_init(&getZero(), initialCapacity),
                        0_i32,
                    )
                }
                pub fn _ctor() -> LrcPtr<System::Collections::Generic::Stack_1<T>> {
                    System::Collections::Generic::Stack_1::_ctor__Z524259A4(4_i32)
                }
                pub fn _ctor__BB573A(
                    xs: LrcPtr<dyn IEnumerable_1<T>>,
                ) -> LrcPtr<System::Collections::Generic::Stack_1<T>> {
                    let arr: Array<T> = toArray(xs);
                    System::Collections::Generic::Stack_1::_ctor__Z3B4C077E(
                        arr.clone(),
                        get_Count_1(arr),
                    )
                }
                pub fn Ensure_Z524259A4(&self, newSize: i32) {
                    let __self__ = self;
                    let oldSize: i32 = get_Count_1(__self__.contents.get().clone());
                    if (newSize) > (oldSize) {
                        let old: Array<T> = __self__.contents.get().clone();
                        __self__
                            .contents
                            .set(new_init(&getZero(), newSize.max((oldSize) * 2_i32)));
                        copyTo(
                            old,
                            0_i32,
                            __self__.contents.get().clone(),
                            0_i32,
                            __self__.count.get().clone(),
                        )
                    }
                }
                pub fn get_Count(&self) -> i32 {
                    let __self__ = self;
                    __self__.count.get().clone()
                }
                pub fn Pop(&self) -> T {
                    let __self__ = self;
                    __self__.count.set((__self__.count.get().clone()) - 1_i32);
                    (__self__.contents.get().clone())[__self__.count.get().clone()].clone()
                }
                pub fn Peek(&self) -> T {
                    let __self__ = self;
                    (__self__.contents.get().clone())[(__self__.count.get().clone()) - 1_i32]
                        .clone()
                }
                pub fn Contains_2B595(&self, x: T) -> bool {
                    let __self__ = self;
                    let found: MutCell<bool> = MutCell::new(false);
                    let i: MutCell<i32> = MutCell::new(0_i32);
                    while if (i.get().clone()) < (__self__.count.get().clone()) {
                        !found.get().clone()
                    } else {
                        false
                    } {
                        if (x.clone())
                            == ((__self__.contents.get().clone())[i.get().clone()].clone())
                        {
                            found.set(true)
                        } else {
                            i.set((i.get().clone()) + 1_i32)
                        };
                    }
                    found.get().clone()
                }
                pub fn TryPeek_1F3DB691(&self, result: &MutCell<T>) -> bool {
                    let __self__ = self;
                    if (__self__.count.get().clone()) > 0_i32 {
                        result.set(__self__.Peek());
                        true
                    } else {
                        false
                    }
                }
                pub fn TryPop_1F3DB691(&self, result: &MutCell<T>) -> bool {
                    let __self__ = self;
                    if (__self__.count.get().clone()) > 0_i32 {
                        result.set(__self__.Pop());
                        true
                    } else {
                        false
                    }
                }
                pub fn Push_2B595(&self, x: T) {
                    let __self__ = self;
                    __self__.Ensure_Z524259A4((__self__.count.get().clone()) + 1_i32);
                    (__self__.contents.get().clone()).get_mut()
                        [__self__.count.get().clone() as usize] = x;
                    __self__.count.set((__self__.count.get().clone()) + 1_i32)
                }
                pub fn Clear(&self) {
                    let __self__ = self;
                    __self__.count.set(0_i32);
                    fill(
                        __self__.contents.get().clone(),
                        0_i32,
                        get_Count_1(__self__.contents.get().clone()),
                        getZero(),
                    )
                }
                pub fn TrimExcess(&self) {
                    let __self__ = self;
                    if ((__self__.count.get().clone() as f64)
                        / (get_Count_1(__self__.contents.get().clone()) as f64))
                        > 0.9_f64
                    {
                        __self__.Ensure_Z524259A4(__self__.count.get().clone());
                    }
                }
                pub fn ToArray(&self) -> Array<T> {
                    let __self__ = self;
                    let res: Array<T> = new_with_capacity::<T>(__self__.count.get().clone());
                    for i in 0_i32..=(__self__.count.get().clone()) - 1_i32 {
                        add(
                            res.clone(),
                            (__self__.contents.get().clone())
                                [((__self__.count.get().clone()) - 1_i32) - (i)]
                                .clone(),
                        );
                    }
                    res.clone()
                }
                pub fn toSeq(&self) -> LrcPtr<dyn IEnumerable_1<T>> {
                    let __self__ = self;
                    let count: i32 = __self__.count.get().clone();
                    let contents: Array<T> = __self__.contents.get().clone();
                    delay(Func0::new({
                        let contents = contents.clone();
                        let count = count.clone();
                        move || {
                            map(
                                Func1::new({
                                    let contents = contents.clone();
                                    move |i: i32| contents[i].clone()
                                }),
                                rangeNumeric((count) - 1_i32, -1_i32, 0_i32),
                            )
                        }
                    }))
                }
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> core::fmt::Debug for Stack_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> core::fmt::Display for Stack_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> IEnumerable_1<T> for Stack_1<T> {
                fn GetEnumerator(&self) -> LrcPtr<dyn IEnumerator_1<T>> {
                    let __self__ = self;
                    __self__.toSeq().GetEnumerator()
                }
            }
            #[derive(Clone)]
            pub struct Queue_1<T: core::hash::Hash + PartialEq + Clone + 'static> {
                contents: MutCell<Array<T>>,
                count: MutCell<i32>,
                head: MutCell<i32>,
                tail: MutCell<i32>,
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> Queue_1<T> {
                fn _ctor__Z3B4C077E(
                    initialContents: Array<T>,
                    initialCount: i32,
                ) -> LrcPtr<System::Collections::Generic::Queue_1<T>> {
                    let contents: Array<T>;
                    let count: i32;
                    let head: i32;
                    let tail: i32;
                    ();
                    contents = initialContents;
                    count = initialCount;
                    head = 0_i32;
                    tail = if (initialCount) == (get_Count_1(contents.clone())) {
                        0_i32
                    } else {
                        initialCount
                    };
                    ();
                    LrcPtr::new(System::Collections::Generic::Queue_1::<T> {
                        contents: MutCell::new(contents),
                        count: MutCell::new(count),
                        head: MutCell::new(head),
                        tail: MutCell::new(tail),
                    })
                }
                pub fn _ctor__Z524259A4(
                    initialCapacity: i32,
                ) -> LrcPtr<System::Collections::Generic::Queue_1<T>> {
                    if (initialCapacity) < 0_i32 {
                        panic!("{}", string("capacity is less than 0"),);
                    }
                    System::Collections::Generic::Queue_1::_ctor__Z3B4C077E(
                        new_init(&getZero(), initialCapacity),
                        0_i32,
                    )
                }
                pub fn _ctor() -> LrcPtr<System::Collections::Generic::Queue_1<T>> {
                    System::Collections::Generic::Queue_1::_ctor__Z524259A4(4_i32)
                }
                pub fn _ctor__BB573A(
                    xs: LrcPtr<dyn IEnumerable_1<T>>,
                ) -> LrcPtr<System::Collections::Generic::Queue_1<T>> {
                    let arr: Array<T> = toArray(xs);
                    System::Collections::Generic::Queue_1::_ctor__Z3B4C077E(
                        arr.clone(),
                        get_Count_1(arr),
                    )
                }
                pub fn get_Count(&self) -> i32 {
                    let __self__ = self;
                    __self__.count.get().clone()
                }
                pub fn Enqueue_2B595(&self, value: T) {
                    let __self__ = self;
                    if (__self__.count.get().clone()) == (__self__.size()) {
                        __self__.ensure_Z524259A4((__self__.count.get().clone()) + 1_i32);
                    }
                    (__self__.contents.get().clone()).get_mut()
                        [__self__.tail.get().clone() as usize] = value;
                    __self__
                        .tail
                        .set(((__self__.tail.get().clone()) + 1_i32) % (__self__.size()));
                    __self__.count.set((__self__.count.get().clone()) + 1_i32)
                }
                pub fn Dequeue(&self) -> T {
                    let __self__ = self;
                    if (__self__.count.get().clone()) == 0_i32 {
                        panic!("{}", string("Queue is empty"),);
                    }
                    {
                        let value: T =
                            (__self__.contents.get().clone())[__self__.head.get().clone()].clone();
                        __self__
                            .head
                            .set(((__self__.head.get().clone()) + 1_i32) % (__self__.size()));
                        __self__.count.set((__self__.count.get().clone()) - 1_i32);
                        value
                    }
                }
                pub fn Peek(&self) -> T {
                    let __self__ = self;
                    if (__self__.count.get().clone()) == 0_i32 {
                        panic!("{}", string("Queue is empty"),);
                    }
                    (__self__.contents.get().clone())[__self__.head.get().clone()].clone()
                }
                pub fn TryDequeue_1F3DB691(&self, result: &MutCell<T>) -> bool {
                    let __self__ = self;
                    if (__self__.count.get().clone()) == 0_i32 {
                        false
                    } else {
                        result.set(__self__.Dequeue());
                        true
                    }
                }
                pub fn TryPeek_1F3DB691(&self, result: &MutCell<T>) -> bool {
                    let __self__ = self;
                    if (__self__.count.get().clone()) == 0_i32 {
                        false
                    } else {
                        result.set(__self__.Peek());
                        true
                    }
                }
                pub fn Contains_2B595(&self, x: T) -> bool {
                    let __self__ = self;
                    let found: MutCell<bool> = MutCell::new(false);
                    let i: MutCell<i32> = MutCell::new(0_i32);
                    while if (i.get().clone()) < (__self__.count.get().clone()) {
                        !found.get().clone()
                    } else {
                        false
                    } {
                        if (x.clone())
                            == ((__self__.contents.get().clone())
                                [__self__.toIndex_Z524259A4(i.get().clone())]
                            .clone())
                        {
                            found.set(true)
                        } else {
                            i.set((i.get().clone()) + 1_i32)
                        };
                    }
                    found.get().clone()
                }
                pub fn Clear(&self) {
                    let __self__ = self;
                    __self__.count.set(0_i32);
                    __self__.head.set(0_i32);
                    __self__.tail.set(0_i32);
                    fill(
                        __self__.contents.get().clone(),
                        0_i32,
                        __self__.size(),
                        getZero(),
                    )
                }
                pub fn TrimExcess(&self) {
                    let __self__ = self;
                    if ((__self__.count.get().clone() as f64)
                        / (get_Count_1(__self__.contents.get().clone()) as f64))
                        > 0.9_f64
                    {
                        __self__.ensure_Z524259A4(__self__.count.get().clone());
                    }
                }
                pub fn ToArray(&self) -> Array<T> {
                    let __self__ = self;
                    let res: Array<T> = new_with_capacity::<T>(__self__.count.get().clone());
                    for i in 0_i32..=(__self__.count.get().clone()) - 1_i32 {
                        add(
                            res.clone(),
                            (__self__.contents.get().clone())[__self__.toIndex_Z524259A4(i)]
                                .clone(),
                        );
                    }
                    res.clone()
                }
                pub fn CopyTo_Z3B4C077E(&self, target: Array<T>, start: i32) {
                    let __self__ = self;
                    let i: MutCell<i32> = MutCell::new(start);
                    for i_1 in 0_i32..=(__self__.count.get().clone()) - 1_i32 {
                        target.get_mut()[((start) + (i_1)) as usize] =
                            (__self__.contents.get().clone())[__self__.toIndex_Z524259A4(i_1)]
                                .clone();
                    }
                }
                pub fn size(&self) -> i32 {
                    let __self__ = self;
                    get_Count_1(__self__.contents.get().clone())
                }
                pub fn toIndex_Z524259A4(&self, i: i32) -> i32 {
                    let __self__ = self;
                    ((__self__.head.get().clone()) + (i)) % (__self__.size())
                }
                pub fn ensure_Z524259A4(&self, requiredSize: i32) {
                    let __self__ = self;
                    let newBuffer: Array<T> = new_init(&getZero(), requiredSize);
                    if (__self__.head.get().clone()) < (__self__.tail.get().clone()) {
                        copyTo(
                            __self__.contents.get().clone(),
                            __self__.head.get().clone(),
                            newBuffer.clone(),
                            0_i32,
                            __self__.count.get().clone(),
                        )
                    } else {
                        copyTo(
                            __self__.contents.get().clone(),
                            __self__.head.get().clone(),
                            newBuffer.clone(),
                            0_i32,
                            (__self__.size()) - (__self__.head.get().clone()),
                        );
                        copyTo(
                            __self__.contents.get().clone(),
                            0_i32,
                            newBuffer.clone(),
                            (__self__.size()) - (__self__.head.get().clone()),
                            __self__.tail.get().clone(),
                        )
                    }
                    __self__.head.set(0_i32);
                    __self__.contents.set(newBuffer);
                    __self__
                        .tail
                        .set(if (__self__.count.get().clone()) == (__self__.size()) {
                            0_i32
                        } else {
                            __self__.count.get().clone()
                        })
                }
                pub fn toSeq(&self) -> LrcPtr<dyn IEnumerable_1<T>> {
                    let __self__ = self;
                    let head: i32 = __self__.head.get().clone();
                    let count: i32 = __self__.count.get().clone();
                    let contents: Array<T> = __self__.contents.get().clone();
                    delay(Func0::new({
                        let contents = contents.clone();
                        let count = count.clone();
                        let head = head.clone();
                        move || {
                            map(
                                Func1::new({
                                    let contents = contents.clone();
                                    move |i: i32| {
                                        contents[((head) + (i)) % (get_Count_1(contents.clone()))]
                                            .clone()
                                    }
                                }),
                                rangeNumeric(0_i32, 1_i32, (count) - 1_i32),
                            )
                        }
                    }))
                }
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> core::fmt::Debug for Queue_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> core::fmt::Display for Queue_1<T> {
                fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                    write!(f, "{}", core::any::type_name::<Self>())
                }
            }
            impl<T: core::hash::Hash + PartialEq + Clone + 'static> IEnumerable_1<T> for Queue_1<T> {
                fn GetEnumerator(&self) -> LrcPtr<dyn IEnumerator_1<T>> {
                    let __self__ = self;
                    __self__.toSeq().GetEnumerator()
                }
            }
        }
    }
}
