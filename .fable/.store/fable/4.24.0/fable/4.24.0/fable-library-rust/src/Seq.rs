pub mod Seq_ {
    use super::*;
    use crate::Array_::chunkBySize as chunkBySize_1;
    use crate::Array_::foldBack as foldBack_1;
    use crate::Array_::foldBack2 as foldBack2_1;
    use crate::Array_::map as map_1;
    use crate::Array_::mapFold as mapFold_1;
    use crate::Array_::mapFoldBack as mapFoldBack_1;
    use crate::Array_::pairwise as pairwise_1;
    use crate::Array_::permute as permute_1;
    use crate::Array_::reduceBack as reduceBack_1;
    use crate::Array_::reverse as reverse_1;
    use crate::Array_::scanBack as scanBack_1;
    use crate::Array_::sortInPlaceWith;
    use crate::Array_::splitInto as splitInto_1;
    use crate::Array_::transpose as transpose_1;
    use crate::Array_::tryFindBack as tryFindBack_1;
    use crate::Array_::tryFindIndexBack as tryFindIndexBack_1;
    use crate::Array_::windowed as windowed_1;
    use crate::Exception_::finally;
    use crate::Exception_::try_catch;
    use crate::Global_::SR::indexOutOfBounds;
    use crate::Global_::SR::inputSequenceEmpty;
    use crate::Global_::SR::inputSequenceTooLong;
    use crate::Global_::SR::keyNotFoundAlt;
    use crate::Global_::SR::notEnoughElements;
    use crate::HashMap_::add as add_2;
    use crate::HashMap_::get;
    use crate::HashMap_::new_empty as new_empty_2;
    use crate::HashMap_::set;
    use crate::HashMap_::tryGetValue;
    use crate::HashMap_::HashMap;
    use crate::HashSet_::add as add_1;
    use crate::HashSet_::new_empty as new_empty_1;
    use crate::HashSet_::new_from_enumerable;
    use crate::HashSet_::HashSet;
    use crate::List_::List;
    use crate::NativeArray_::add;
    use crate::NativeArray_::get_Count;
    use crate::NativeArray_::new_array;
    use crate::NativeArray_::new_empty;
    use crate::NativeArray_::new_from_enumerable as new_from_enumerable_1;
    use crate::NativeArray_::Array;
    use crate::Native_::compare;
    use crate::Native_::defaultOf;
    use crate::Native_::interface_cast;
    use crate::Native_::type_test;
    use crate::Native_::Any;
    use crate::Native_::Func0;
    use crate::Native_::Func1;
    use crate::Native_::Func2;
    use crate::Native_::Func3;
    use crate::Native_::Lrc;
    use crate::Native_::LrcPtr;
    use crate::Native_::MutCell;
    use crate::Seq_::ofArray as ofArray_1;
    use crate::Seq_::toArray as toArray_1;
    use crate::String_::append as append_1;
    use crate::String_::string;
    use crate::System::Collections::Generic::IEnumerable_1;
    use crate::System::Collections::Generic::IEnumerator_1;
    use crate::System::Exception;
    use crate::System::IDisposable;
    pub mod Enumerable {
        use super::*;
        use crate::List_::head as head_2;
        use crate::List_::isEmpty as isEmpty_1;
        use crate::List_::tail as tail_2;
        use crate::Native_::unbox;
        #[derive(Clone)]
        pub struct Seq<T: Clone + 'static> {
            f: Func0<LrcPtr<dyn IEnumerator_1<T>>>,
        }
        impl<T: Clone + 'static> Seq<T> {
            pub fn _ctor__673A07F2(
                f: Func0<LrcPtr<dyn IEnumerator_1<T>>>,
            ) -> LrcPtr<Seq_::Enumerable::Seq<T>> {
                let f_1;
                ();
                f_1 = f;
                ();
                LrcPtr::new(Seq_::Enumerable::Seq::<T> { f: f_1 })
            }
        }
        impl<T: Clone + 'static> core::fmt::Debug for Seq<T> {
            fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                write!(f, "{}", core::any::type_name::<Self>())
            }
        }
        impl<T: Clone + 'static> core::fmt::Display for Seq<T> {
            fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                write!(f, "{}", core::any::type_name::<Self>())
            }
        }
        impl<T: Clone + 'static> IEnumerable_1<T> for Seq<T> {
            fn GetEnumerator(&self) -> LrcPtr<dyn IEnumerator_1<T>> {
                let __self__ = self;
                (__self__.f)()
            }
        }
        #[derive(Clone)]
        pub struct Enumerator<T: Clone + 'static> {
            next: Func0<Option<T>>,
            dispose: Func0<()>,
            curr: MutCell<Option<T>>,
        }
        impl<T: Clone + 'static> Enumerator<T> {
            pub fn _ctor__5FE5556A(
                next: Func0<Option<T>>,
                dispose: Func0<()>,
            ) -> LrcPtr<Seq_::Enumerable::Enumerator<T>> {
                let next_1;
                let dispose_1;
                let curr: Option<T>;
                ();
                next_1 = next;
                dispose_1 = dispose;
                curr = None::<T>;
                ();
                LrcPtr::new(Seq_::Enumerable::Enumerator::<T> {
                    next: next_1,
                    dispose: dispose_1,
                    curr: MutCell::new(curr),
                })
            }
        }
        impl<T: Clone + 'static> core::fmt::Debug for Enumerator<T> {
            fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                write!(f, "{}", core::any::type_name::<Self>())
            }
        }
        impl<T: Clone + 'static> core::fmt::Display for Enumerator<T> {
            fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                write!(f, "{}", core::any::type_name::<Self>())
            }
        }
        impl<T: Clone + 'static> IEnumerator_1<T> for Enumerator<T> {
            fn get_Current(&self) -> T {
                let __self__ = self;
                __self__.curr.get().clone().unwrap()
            }
            fn MoveNext(&self) -> bool {
                let __self__ = self;
                __self__.curr.set((__self__.next)());
                __self__.curr.get().clone().is_some()
            }
            fn Reset(&self) {
                let __self__ = self;
                ()
            }
            fn Dispose(&self) {
                let __self__ = self;
                (__self__.dispose)()
            }
        }
        impl<T: Clone + 'static> IDisposable for Enumerator<T> {
            fn Dispose(&self) {
                let __self__ = self;
                (__self__.dispose)()
            }
        }
        pub fn fromFunction<T: Clone + 'static>(
            next: Func0<Option<T>>,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            interface_cast!(
                Seq_::Enumerable::Enumerator::_ctor__5FE5556A(next, Func0::new(move || ())),
                Lrc<dyn IEnumerator_1<T>>,
            )
        }
        pub fn fromFunctions<T: Clone + 'static>(
            next: Func0<Option<T>>,
            dispose: Func0<()>,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            interface_cast!(
                Seq_::Enumerable::Enumerator::_ctor__5FE5556A(next, dispose),
                Lrc<dyn IEnumerator_1<T>>,
            )
        }
        pub fn empty<T: Clone + 'static>() -> LrcPtr<dyn IEnumerator_1<T>> {
            Seq_::Enumerable::fromFunction(Func0::new(move || None::<T>))
        }
        pub fn singleton<T: Clone + 'static>(x: T) -> LrcPtr<dyn IEnumerator_1<T>> {
            let i: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(0_i32));
            let next = Func0::new({
                let i = i.clone();
                let x = x.clone();
                move || {
                    if (i.get().clone()) < 1_i32 {
                        i.set((i.get().clone()) + 1_i32);
                        Some(x.clone())
                    } else {
                        None::<T>
                    }
                }
            });
            Seq_::Enumerable::fromFunction(next)
        }
        pub fn ofArray<T: Clone + 'static>(arr: Array<T>) -> LrcPtr<dyn IEnumerator_1<T>> {
            let len: i32 = get_Count(arr.clone());
            let i: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(0_i32));
            let next = Func0::new({
                let arr = arr.clone();
                let i = i.clone();
                let len = len.clone();
                move || {
                    if (i.get().clone()) < (len) {
                        i.set((i.get().clone()) + 1_i32);
                        Some(arr[(i.get().clone()) - 1_i32].clone())
                    } else {
                        None::<T>
                    }
                }
            });
            Seq_::Enumerable::fromFunction(next)
        }
        pub fn ofList<T: Clone + 'static>(xs: List<T>) -> LrcPtr<dyn IEnumerator_1<T>> {
            let it: LrcPtr<MutCell<List<T>>> = LrcPtr::new(MutCell::new(xs));
            let next = Func0::new({
                let it = it.clone();
                move || {
                    if !isEmpty_1(it.get().clone()) {
                        let tail_1: List<T> = tail_2(it.get().clone());
                        let head_1: T = head_2(it.get().clone());
                        it.set(tail_1);
                        Some(head_1)
                    } else {
                        None::<T>
                    }
                }
            });
            Seq_::Enumerable::fromFunction(next)
        }
        pub fn append<T: Clone + 'static>(
            xs: LrcPtr<dyn IEnumerable_1<T>>,
            ys: LrcPtr<dyn IEnumerable_1<T>>,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            let i: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(-1_i32));
            let innerOpt: LrcPtr<MutCell<Option<LrcPtr<dyn IEnumerator_1<T>>>>> =
                LrcPtr::new(MutCell::new(None::<LrcPtr<dyn IEnumerator_1<T>>>));
            let finished: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
            let next = Func0::new({
                let finished = finished.clone();
                let i = i.clone();
                let innerOpt = innerOpt.clone();
                let xs = xs.clone();
                let ys = ys.clone();
                move || {
                    let moveNext: MutCell<bool> = MutCell::new(false);
                    while if !finished.get().clone() {
                        !moveNext.get().clone()
                    } else {
                        false
                    } {
                        match &innerOpt.get().clone() {
                            None => {
                                if (i.get().clone()) < 1_i32 {
                                    i.set((i.get().clone()) + 1_i32);
                                    {
                                        let it: LrcPtr<dyn IEnumerable_1<T>> =
                                            if (i.get().clone()) == 0_i32 {
                                                xs.clone()
                                            } else {
                                                ys.clone()
                                            };
                                        innerOpt.set(Some(it.GetEnumerator()))
                                    }
                                } else {
                                    finished.set(true)
                                }
                            }
                            Some(innerOpt_0_0) => {
                                let inner: LrcPtr<dyn IEnumerator_1<T>> = innerOpt_0_0.clone();
                                if inner.MoveNext() {
                                    moveNext.set(true)
                                } else {
                                    innerOpt.set(None::<LrcPtr<dyn IEnumerator_1<T>>>)
                                }
                            }
                        };
                    }
                    if if !finished.get().clone() {
                        moveNext.get().clone()
                    } else {
                        false
                    } {
                        Some(innerOpt.get().clone().unwrap().get_Current())
                    } else {
                        None::<T>
                    }
                }
            });
            Seq_::Enumerable::fromFunction(next)
        }
        pub fn cast<T: Clone + 'static>(
            e: LrcPtr<dyn IEnumerator_1<LrcPtr<dyn Any>>>,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            Seq_::Enumerable::fromFunction(Func0::new({
                let e = e.clone();
                move || {
                    if e.MoveNext() {
                        Some(unbox::<T>(&e.get_Current()))
                    } else {
                        None::<T>
                    }
                }
            }))
        }
        pub fn concat<T: Clone + 'static>(
            sources: LrcPtr<dyn IEnumerable_1<LrcPtr<dyn IEnumerable_1<T>>>>,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            let outerOpt: LrcPtr<
                MutCell<Option<LrcPtr<dyn IEnumerator_1<LrcPtr<dyn IEnumerable_1<T>>>>>>,
            > = LrcPtr::new(MutCell::new(
                None::<LrcPtr<dyn IEnumerator_1<LrcPtr<dyn IEnumerable_1<T>>>>>,
            ));
            let innerOpt: LrcPtr<MutCell<Option<LrcPtr<dyn IEnumerator_1<T>>>>> =
                LrcPtr::new(MutCell::new(None::<LrcPtr<dyn IEnumerator_1<T>>>));
            let finished: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
            let next = Func0::new({
                let finished = finished.clone();
                let innerOpt = innerOpt.clone();
                let outerOpt = outerOpt.clone();
                let sources = sources.clone();
                move || {
                    let moveNext: MutCell<bool> = MutCell::new(false);
                    while if !finished.get().clone() {
                        !moveNext.get().clone()
                    } else {
                        false
                    } {
                        match &outerOpt.get().clone() {
                            None => outerOpt.set(Some(sources.GetEnumerator())),
                            Some(outerOpt_0_0) => {
                                let outer: LrcPtr<dyn IEnumerator_1<LrcPtr<dyn IEnumerable_1<T>>>> =
                                    outerOpt_0_0.clone();
                                match &innerOpt.get().clone() {
                                    None => {
                                        if outer.MoveNext() {
                                            let it: LrcPtr<dyn IEnumerable_1<T>> =
                                                outer.get_Current();
                                            innerOpt.set(Some(it.GetEnumerator()))
                                        } else {
                                            finished.set(true)
                                        }
                                    }
                                    Some(innerOpt_0_0) => {
                                        let inner: LrcPtr<dyn IEnumerator_1<T>> =
                                            innerOpt_0_0.clone();
                                        if inner.MoveNext() {
                                            moveNext.set(true)
                                        } else {
                                            innerOpt.set(None::<LrcPtr<dyn IEnumerator_1<T>>>)
                                        }
                                    }
                                }
                            }
                        };
                    }
                    if if !finished.get().clone() {
                        moveNext.get().clone()
                    } else {
                        false
                    } {
                        Some(innerOpt.get().clone().unwrap().get_Current())
                    } else {
                        None::<T>
                    }
                }
            });
            Seq_::Enumerable::fromFunction(next)
        }
        pub fn enumerateThenFinally<T: Clone + 'static>(
            f: Func0<()>,
            e: LrcPtr<dyn IEnumerator_1<T>>,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            Seq_::Enumerable::fromFunctions(
                Func0::new({
                    let e = e.clone();
                    move || {
                        if e.MoveNext() {
                            Some(e.get_Current())
                        } else {
                            None::<T>
                        }
                    }
                }),
                Func0::new({
                    let e = e.clone();
                    let f = f.clone();
                    move || {
                        let __finally__ = finally(Func0::new({
                            let f = f.clone();
                            move || f()
                        }));
                        e.Dispose()
                    }
                }),
            )
        }
        pub fn generateWhileSome<T: Clone + 'static, U: Clone + 'static>(
            openf: Func0<T>,
            compute: Func1<T, Option<U>>,
            closef: Func1<T, ()>,
        ) -> LrcPtr<dyn IEnumerator_1<U>> {
            let finished: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
            let state: LrcPtr<MutCell<Option<T>>> = LrcPtr::new(MutCell::new(None::<T>));
            let dispose = Func0::new({
                let closef = closef.clone();
                let state = state.clone();
                move || match &state.get().clone() {
                    Some(state_0_0) => {
                        let x: T = state_0_0.clone();
                        {
                            let __finally__ = finally(Func0::new({
                                let state = state.clone();
                                move || state.set(None::<T>)
                            }));
                            closef(x)
                        }
                    }
                    _ => (),
                }
            });
            let next = Func0::new({
                let compute = compute.clone();
                let finished = finished.clone();
                let openf = openf.clone();
                let state = state.clone();
                move || {
                    if finished.get().clone() {
                        None::<U>
                    } else {
                        if state.get().clone().is_none() {
                            state.set(Some(openf()));
                        }
                        {
                            let res: Option<U> = compute(state.get().clone().unwrap());
                            if res.is_none() {
                                finished.set(true);
                            }
                            res
                        }
                    }
                }
            });
            Seq_::Enumerable::fromFunctions(next, dispose)
        }
        pub fn unfold<State: Clone + 'static, T: Clone + 'static>(
            f: Func1<State, Option<LrcPtr<(T, State)>>>,
            state: State,
        ) -> LrcPtr<dyn IEnumerator_1<T>> {
            let acc: LrcPtr<MutCell<State>> = LrcPtr::new(MutCell::new(state));
            let next = Func0::new({
                let acc = acc.clone();
                let f = f.clone();
                move || {
                    let matchValue: Option<LrcPtr<(T, State)>> = f(acc.get().clone());
                    match &matchValue {
                        None => None::<T>,
                        Some(matchValue_0_0) => {
                            let x: T = (matchValue_0_0).0.clone();
                            let st: State = (matchValue_0_0).1.clone();
                            acc.set(st);
                            Some(x)
                        }
                    }
                }
            });
            Seq_::Enumerable::fromFunction(next)
        }
    }
    pub fn mkSeq<T: Clone + 'static>(
        f: Func0<LrcPtr<dyn IEnumerator_1<T>>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        interface_cast!(
            Seq_::Enumerable::Seq::_ctor__673A07F2(f),
            Lrc<dyn IEnumerable_1<T>>,
        )
    }
    pub fn ofSeq<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerator_1<T>> {
        xs.GetEnumerator()
    }
    pub fn delay<T: Clone + 'static>(
        generator: Func0<LrcPtr<dyn IEnumerable_1<T>>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let generator = generator.clone();
            move || generator().GetEnumerator()
        }))
    }
    pub fn concat<T: Clone + 'static>(
        sources: LrcPtr<dyn IEnumerable_1<LrcPtr<dyn IEnumerable_1<T>>>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let sources = sources.clone();
            move || Seq_::Enumerable::concat(sources.clone())
        }))
    }
    pub fn unfold<State: Clone + 'static, T: Clone + 'static>(
        generator: Func1<State, Option<LrcPtr<(T, State)>>>,
        state: State,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let generator = generator.clone();
            let state = state.clone();
            move || Seq_::Enumerable::unfold(generator.clone(), state.clone())
        }))
    }
    pub fn empty<a: Clone + 'static>() -> LrcPtr<dyn IEnumerable_1<a>> {
        Seq_::mkSeq(Func0::new(move || Seq_::Enumerable::empty::<a>()))
    }
    pub fn singleton<T: Clone + 'static>(x: T) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let x = x.clone();
            move || Seq_::Enumerable::singleton(x.clone())
        }))
    }
    pub fn ofArray<T: Clone + 'static>(arr: Array<T>) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let arr = arr.clone();
            move || Seq_::Enumerable::ofArray(arr.clone())
        }))
    }
    pub fn ofList<T: Clone + 'static>(xs: List<T>) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let xs = xs.clone();
            move || Seq_::Enumerable::ofList(xs.clone())
        }))
    }
    pub fn generate<a: Clone + 'static, b: Clone + 'static>(
        create: Func0<a>,
        compute: Func1<a, Option<b>>,
        dispose: Func1<a, ()>,
    ) -> LrcPtr<dyn IEnumerable_1<b>> {
        Seq_::mkSeq(Func0::new({
            let compute = compute.clone();
            let create = create.clone();
            let dispose = dispose.clone();
            move || {
                Seq_::Enumerable::generateWhileSome(
                    create.clone(),
                    compute.clone(),
                    dispose.clone(),
                )
            }
        }))
    }
    pub fn generateIndexed<a: Clone + 'static, b: Clone + 'static>(
        create: Func0<a>,
        compute: Func2<i32, a, Option<b>>,
        dispose: Func1<a, ()>,
    ) -> LrcPtr<dyn IEnumerable_1<b>> {
        Seq_::mkSeq(Func0::new({
            let compute = compute.clone();
            let create = create.clone();
            let dispose = dispose.clone();
            move || {
                let i: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(-1_i32));
                Seq_::Enumerable::generateWhileSome(
                    create.clone(),
                    Func1::new({
                        let compute = compute.clone();
                        let i = i.clone();
                        move |x: a| {
                            i.set((i.get().clone()) + 1_i32);
                            compute(i.get().clone(), x)
                        }
                    }),
                    dispose.clone(),
                )
            }
        }))
    }
    pub fn append<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        ys: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let xs = xs.clone();
            let ys = ys.clone();
            move || Seq_::Enumerable::append(xs.clone(), ys.clone())
        }))
    }
    pub fn cast<a: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<LrcPtr<dyn Any>>>,
    ) -> LrcPtr<dyn IEnumerable_1<a>> {
        Seq_::mkSeq(Func0::new({
            let xs = xs.clone();
            move || Seq_::Enumerable::cast(xs.GetEnumerator())
        }))
    }
    pub fn choose<T: Clone + 'static, U: Clone + 'static>(
        chooser: Func1<T, Option<U>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::generate(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func1::new({
                let chooser = chooser.clone();
                move |e: LrcPtr<dyn IEnumerator_1<T>>| {
                    let curr: MutCell<Option<U>> = MutCell::new(None::<U>);
                    while if curr.get().clone().is_none() {
                        e.MoveNext()
                    } else {
                        false
                    } {
                        curr.set(chooser(e.get_Current()));
                    }
                    curr.get().clone()
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn compareWith<T: Clone + 'static>(
        comparer: Func2<T, T, i32>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        ys: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> i32 {
        let e1: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e1 = e1.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e1.clone())) {
                        e1.clone().Dispose();
                    }
                }
            }));
            {
                let e2: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(ys);
                {
                    let __finally__ = finally(Func0::new({
                        let e2 = e2.clone();
                        move || {
                            if type_test::<_, LrcPtr<dyn IDisposable>>(&(e2.clone())) {
                                e2.clone().Dispose();
                            }
                        }
                    }));
                    {
                        let c: MutCell<i32> = MutCell::new(0_i32);
                        let b1: MutCell<bool> = MutCell::new(e1.MoveNext());
                        let b2: MutCell<bool> = MutCell::new(e2.MoveNext());
                        while if if (c.get().clone()) == 0_i32 {
                            b1.get().clone()
                        } else {
                            false
                        } {
                            b2.get().clone()
                        } else {
                            false
                        } {
                            c.set(comparer(e1.get_Current(), e2.get_Current()));
                            if (c.get().clone()) == 0_i32 {
                                b1.set(e1.MoveNext());
                                b2.set(e2.MoveNext())
                            }
                        }
                        if (c.get().clone()) != 0_i32 {
                            c.get().clone()
                        } else {
                            if b1.get().clone() {
                                1_i32
                            } else {
                                if b2.get().clone() {
                                    -1_i32
                                } else {
                                    0_i32
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    pub fn compareTo<T: PartialOrd + Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        ys: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> i32 {
        Seq_::compareWith(Func2::new(move |e: T, e_1: T| compare(e, e_1)), xs, ys)
    }
    pub fn equals<T: PartialEq + Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        ys: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> bool {
        let e1: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e1 = e1.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e1.clone())) {
                        e1.clone().Dispose();
                    }
                }
            }));
            {
                let e2: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(ys);
                {
                    let __finally__ = finally(Func0::new({
                        let e2 = e2.clone();
                        move || {
                            if type_test::<_, LrcPtr<dyn IDisposable>>(&(e2.clone())) {
                                e2.clone().Dispose();
                            }
                        }
                    }));
                    {
                        let res: MutCell<bool> = MutCell::new(true);
                        let b1: MutCell<bool> = MutCell::new(e1.MoveNext());
                        let b2: MutCell<bool> = MutCell::new(e2.MoveNext());
                        while if if res.get().clone() {
                            b1.get().clone()
                        } else {
                            false
                        } {
                            b2.get().clone()
                        } else {
                            false
                        } {
                            res.set((e1.get_Current()) == (e2.get_Current()));
                            if res.get().clone() {
                                b1.set(e1.MoveNext());
                                b2.set(e2.MoveNext())
                            }
                        }
                        if res.get().clone() {
                            (b1.get().clone()) == (b2.get().clone())
                        } else {
                            false
                        }
                    }
                }
            }
        }
    }
    pub fn finallyEnumerable<T: Clone + 'static>(
        compensation: Func0<()>,
        restf: Func0<LrcPtr<dyn IEnumerable_1<T>>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let compensation = compensation.clone();
            let restf = restf.clone();
            move || {
                try_catch(
                    || {
                        Seq_::Enumerable::enumerateThenFinally(
                            compensation.clone(),
                            Seq_::ofSeq(restf()),
                        )
                    },
                    |ex: LrcPtr<Exception>| {
                        compensation();
                        panic!("{}", ex.get_Message(),)
                    },
                )
            }
        }))
    }
    pub fn enumerateThenFinally<T: Clone + 'static>(
        source: LrcPtr<dyn IEnumerable_1<T>>,
        compensation: Func0<()>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::finallyEnumerable(
            compensation,
            Func0::new({
                let source = source.clone();
                move || source.clone()
            }),
        )
    }
    pub fn enumerateUsing<T: IDisposable + Clone + 'static, U: Clone + 'static>(
        resource: T,
        sourceGen: Func1<T, LrcPtr<dyn IEnumerable_1<U>>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::finallyEnumerable(
            Func0::new({
                let resource = resource.clone();
                move || resource.Dispose()
            }),
            Func0::new({
                let resource = resource.clone();
                let sourceGen = sourceGen.clone();
                move || sourceGen(resource.clone())
            }),
        )
    }
    pub fn enumerateWhile<T: Clone + 'static>(
        guard: Func0<bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::concat(Seq_::unfold(
            Func1::new({
                let guard = guard.clone();
                let xs = xs.clone();
                move |i: i32| {
                    if guard() {
                        Some(LrcPtr::new((xs.clone(), (i) + 1_i32)))
                    } else {
                        None::<LrcPtr<(LrcPtr<dyn IEnumerable_1<T>>, i32)>>
                    }
                }
            }),
            0_i32,
        ))
    }
    pub fn exactlyOne<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> T {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            if e.MoveNext() {
                let v: T = e.get_Current();
                if e.MoveNext() {
                    panic!(
                        "{}",
                        append_1((inputSequenceTooLong()), string(" (Parameter \'source\')")),
                    )
                } else {
                    v
                }
            } else {
                panic!(
                    "{}",
                    append_1((inputSequenceEmpty()), string(" (Parameter \'source\')")),
                )
            }
        }
    }
    pub fn tryExactlyOne<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> Option<T> {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            if e.MoveNext() {
                let v: T = e.get_Current();
                if e.MoveNext() {
                    None::<T>
                } else {
                    Some(v)
                }
            } else {
                None::<T>
            }
        }
    }
    pub fn exists<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> bool {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            {
                let found: MutCell<bool> = MutCell::new(false);
                while if !found.get().clone() {
                    e.MoveNext()
                } else {
                    false
                } {
                    found.set(predicate(e.get_Current()));
                }
                found.get().clone()
            }
        }
    }
    pub fn exists2<T1: Clone + 'static, T2: Clone + 'static>(
        predicate: Func2<T1, T2, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> bool {
        let e1: LrcPtr<dyn IEnumerator_1<T1>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e1 = e1.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e1.clone())) {
                        e1.clone().Dispose();
                    }
                }
            }));
            {
                let e2: LrcPtr<dyn IEnumerator_1<T2>> = Seq_::ofSeq(ys);
                {
                    let __finally__ = finally(Func0::new({
                        let e2 = e2.clone();
                        move || {
                            if type_test::<_, LrcPtr<dyn IDisposable>>(&(e2.clone())) {
                                e2.clone().Dispose();
                            }
                        }
                    }));
                    {
                        let found: MutCell<bool> = MutCell::new(false);
                        while if if !found.get().clone() {
                            e1.MoveNext()
                        } else {
                            false
                        } {
                            e2.MoveNext()
                        } else {
                            false
                        } {
                            found.set(predicate(e1.get_Current(), e2.get_Current()));
                        }
                        found.get().clone()
                    }
                }
            }
        }
    }
    pub fn contains<T: core::hash::Hash + PartialEq + Clone + 'static>(
        value: T,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> bool {
        Seq_::exists(
            Func1::new({
                let value = value.clone();
                move |x: T| (x) == (value.clone())
            }),
            xs,
        )
    }
    pub fn filter<T: Clone + 'static>(
        f: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::choose(
            Func1::new({
                let f = f.clone();
                move |x: T| if f(x.clone()) { Some(x) } else { None::<T> }
            }),
            xs,
        )
    }
    pub fn tryFind<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> Option<T> {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            {
                let res: MutCell<Option<T>> = MutCell::new(None::<T>);
                while if res.get().clone().is_none() {
                    e.MoveNext()
                } else {
                    false
                } {
                    let c: T = e.get_Current();
                    if predicate(c.clone()) {
                        res.set(Some(c));
                    }
                }
                res.get().clone()
            }
        }
    }
    pub fn find<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        let matchValue: Option<T> = Seq_::tryFind(predicate, xs);
        match &matchValue {
            None => panic!("{}", keyNotFoundAlt(),),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn tryFindIndex<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> Option<i32> {
        fn inner_loop<T: Clone + 'static>(
            i: i32,
            predicate_1: Func1<T, bool>,
            e: LrcPtr<dyn IEnumerator_1<T>>,
        ) -> Option<i32> {
            let i: MutCell<i32> = MutCell::new(i);
            let predicate_1 = MutCell::new(predicate_1.clone());
            let e: MutCell<LrcPtr<dyn IEnumerator_1<T>>> = MutCell::new(e.clone());
            '_inner_loop: loop {
                break '_inner_loop (if e.get().clone().MoveNext() {
                    if predicate_1(e.get().clone().get_Current()) {
                        Some(i.get().clone())
                    } else {
                        let i_temp: i32 = (i.get().clone()) + 1_i32;
                        let predicate_1_temp = predicate_1.get().clone();
                        let e_temp: LrcPtr<dyn IEnumerator_1<T>> = e.get().clone();
                        i.set(i_temp);
                        predicate_1.set(predicate_1_temp);
                        e.set(e_temp);
                        continue '_inner_loop;
                    }
                } else {
                    None::<i32>
                });
            }
        }
        let e_1: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e_1 = e_1.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e_1.clone())) {
                        e_1.clone().Dispose();
                    }
                }
            }));
            inner_loop(0_i32, predicate, e_1.clone())
        }
    }
    pub fn findIndex<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> i32 {
        let matchValue: Option<i32> = Seq_::tryFindIndex(predicate, xs);
        match &matchValue {
            None => panic!("{}", keyNotFoundAlt(),),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn fold<State: Clone + 'static, T: Clone + 'static>(
        folder: Func2<State, T, State>,
        state: State,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> State {
        let acc: MutCell<State> = MutCell::new(state);
        {
            let enumerator: LrcPtr<dyn IEnumerator_1<T>> = xs.GetEnumerator();
            {
                let __finally__ = finally(Func0::new({
                    let enumerator = enumerator.clone();
                    move || {
                        if type_test::<_, LrcPtr<dyn IDisposable>>(&(enumerator.clone())) {
                            enumerator.clone().Dispose();
                        }
                    }
                }));
                while enumerator.MoveNext() {
                    let x: T = enumerator.get_Current();
                    acc.set(folder(acc.get().clone(), x))
                }
            }
        }
        acc.get().clone()
    }
    pub fn toArray<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> Array<T> {
        let res: Array<T> = new_empty::<T>();
        {
            let enumerator: LrcPtr<dyn IEnumerator_1<T>> = xs.GetEnumerator();
            {
                let __finally__ = finally(Func0::new({
                    let enumerator = enumerator.clone();
                    move || {
                        if type_test::<_, LrcPtr<dyn IDisposable>>(&(enumerator.clone())) {
                            enumerator.clone().Dispose();
                        }
                    }
                }));
                while enumerator.MoveNext() {
                    add(res.clone(), enumerator.get_Current());
                }
            }
        }
        res.clone()
    }
    pub fn foldBack<T: Clone + 'static, a: Clone + 'static>(
        folder: Func2<T, a, a>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        state: a,
    ) -> a {
        foldBack_1(folder, Seq_::toArray(xs), state)
    }
    pub fn fold2<State: Clone + 'static, T1: Clone + 'static, T2: Clone + 'static>(
        folder: Func3<State, T1, T2, State>,
        state: State,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> State {
        let e1: LrcPtr<dyn IEnumerator_1<T1>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e1 = e1.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e1.clone())) {
                        e1.clone().Dispose();
                    }
                }
            }));
            {
                let e2: LrcPtr<dyn IEnumerator_1<T2>> = Seq_::ofSeq(ys);
                {
                    let __finally__ = finally(Func0::new({
                        let e2 = e2.clone();
                        move || {
                            if type_test::<_, LrcPtr<dyn IDisposable>>(&(e2.clone())) {
                                e2.clone().Dispose();
                            }
                        }
                    }));
                    {
                        let acc: MutCell<State> = MutCell::new(state);
                        while if e1.MoveNext() { e2.MoveNext() } else { false } {
                            acc.set(folder(
                                acc.get().clone(),
                                e1.get_Current(),
                                e2.get_Current(),
                            ));
                        }
                        acc.get().clone()
                    }
                }
            }
        }
    }
    pub fn foldBack2<T1: Clone + 'static, T2: Clone + 'static, State: Clone + 'static>(
        folder: Func3<T1, T2, State, State>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
        state: State,
    ) -> State {
        foldBack2_1(folder, Seq_::toArray(xs), Seq_::toArray(ys), state)
    }
    pub fn forAll<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> bool {
        !Seq_::exists(
            Func1::new({
                let predicate = predicate.clone();
                move |x: T| !predicate(x)
            }),
            xs,
        )
    }
    pub fn forAll2<T1: Clone + 'static, T2: Clone + 'static>(
        predicate: Func2<T1, T2, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> bool {
        !Seq_::exists2(
            Func2::new({
                let predicate = predicate.clone();
                move |x: T1, y: T2| !predicate(x, y)
            }),
            xs,
            ys,
        )
    }
    pub fn tryFindBack<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> Option<T> {
        tryFindBack_1(predicate, Seq_::toArray(xs))
    }
    pub fn findBack<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        let matchValue: Option<T> = Seq_::tryFindBack(predicate, xs);
        match &matchValue {
            None => panic!("{}", keyNotFoundAlt(),),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn tryFindIndexBack<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> Option<i32> {
        tryFindIndexBack_1(predicate, Seq_::toArray(xs))
    }
    pub fn findIndexBack<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> i32 {
        let matchValue: Option<i32> = Seq_::tryFindIndexBack(predicate, xs);
        match &matchValue {
            None => panic!("{}", keyNotFoundAlt(),),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn tryHead<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> Option<T> {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            if e.MoveNext() {
                Some(e.get_Current())
            } else {
                None::<T>
            }
        }
    }
    pub fn head<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> T {
        let matchValue: Option<T> = Seq_::tryHead(xs);
        match &matchValue {
            None => panic!(
                "{}",
                append_1((inputSequenceEmpty()), string(" (Parameter \'source\')")),
            ),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn initialize<a: Clone + 'static>(
        count: i32,
        f: Func1<i32, a>,
    ) -> LrcPtr<dyn IEnumerable_1<a>> {
        Seq_::unfold(
            Func1::new({
                let count = count.clone();
                let f = f.clone();
                move |i: i32| {
                    if (i) < (count) {
                        Some(LrcPtr::new((f(i), (i) + 1_i32)))
                    } else {
                        None::<LrcPtr<(a, i32)>>
                    }
                }
            }),
            0_i32,
        )
    }
    pub fn initializeInfinite<a: Clone + 'static>(
        f: Func1<i32, a>,
    ) -> LrcPtr<dyn IEnumerable_1<a>> {
        Seq_::initialize(i32::MAX, f)
    }
    pub fn isEmpty<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> bool {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            !e.MoveNext()
        }
    }
    pub fn tryItem<T: Clone + 'static>(index: i32, xs: LrcPtr<dyn IEnumerable_1<T>>) -> Option<T> {
        let i: MutCell<i32> = MutCell::new(index);
        if (i.get().clone()) < 0_i32 {
            None::<T>
        } else {
            let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
            {
                let __finally__ = finally(Func0::new({
                    let e = e.clone();
                    move || {
                        if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                            e.clone().Dispose();
                        }
                    }
                }));
                {
                    while if (i.get().clone()) >= 0_i32 {
                        e.MoveNext()
                    } else {
                        false
                    } {
                        i.set((i.get().clone()) - 1_i32);
                    }
                    if (i.get().clone()) >= 0_i32 {
                        None::<T>
                    } else {
                        Some(e.get_Current())
                    }
                }
            }
        }
    }
    pub fn item<T: Clone + 'static>(index: i32, xs: LrcPtr<dyn IEnumerable_1<T>>) -> T {
        let matchValue: Option<T> = Seq_::tryItem(index, xs);
        match &matchValue {
            None => panic!(
                "{}",
                append_1((notEnoughElements()), string(" (Parameter \'index\')")),
            ),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn iterate<T: Clone + 'static>(action: Func1<T, ()>, xs: LrcPtr<dyn IEnumerable_1<T>>) {
        Seq_::fold(
            Func2::new({
                let action = action.clone();
                move |unitVar: (), x: T| action(x)
            }),
            (),
            xs,
        );
    }
    pub fn iterate2<T1: Clone + 'static, T2: Clone + 'static>(
        action: Func2<T1, T2, ()>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) {
        Seq_::fold2(
            Func3::new({
                let action = action.clone();
                move |unitVar: (), x: T1, y: T2| action(x, y)
            }),
            (),
            xs,
            ys,
        );
    }
    pub fn iterateIndexed<T: Clone + 'static>(
        action: Func2<i32, T, ()>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) {
        let value: i32 = Seq_::fold(
            Func2::new({
                let action = action.clone();
                move |i: i32, x: T| {
                    action(i, x);
                    (i) + 1_i32
                }
            }),
            0_i32,
            xs,
        );
        ()
    }
    pub fn iterateIndexed2<T1: Clone + 'static, T2: Clone + 'static>(
        action: Func3<i32, T1, T2, ()>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) {
        let value: i32 = Seq_::fold2(
            Func3::new({
                let action = action.clone();
                move |i: i32, x: T1, y: T2| {
                    action(i, x, y);
                    (i) + 1_i32
                }
            }),
            0_i32,
            xs,
            ys,
        );
        ()
    }
    pub fn tryLast<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> Option<T> {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            if e.MoveNext() {
                let acc: MutCell<T> = MutCell::new(e.get_Current());
                while e.MoveNext() {
                    acc.set(e.get_Current());
                }
                Some(acc.get().clone())
            } else {
                None::<T>
            }
        }
    }
    pub fn last<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> T {
        let matchValue: Option<T> = Seq_::tryLast(xs);
        match &matchValue {
            None => panic!(
                "{}",
                append_1((notEnoughElements()), string(" (Parameter \'source\')")),
            ),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn length<T: Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> i32 {
        let count: MutCell<i32> = MutCell::new(0_i32);
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            {
                while e.MoveNext() {
                    count.set((count.get().clone()) + 1_i32);
                }
                count.get().clone()
            }
        }
    }
    pub fn map<T: Clone + 'static, U: Clone + 'static>(
        mapping: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::generate(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func1::new({
                let mapping = mapping.clone();
                move |e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if e.MoveNext() {
                        Some(mapping(e.get_Current()))
                    } else {
                        None::<U>
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn mapIndexed<T: Clone + 'static, U: Clone + 'static>(
        mapping: Func2<i32, T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let mapping = mapping.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if e.MoveNext() {
                        Some(mapping(i, e.get_Current()))
                    } else {
                        None::<U>
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn indexed<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(i32, T)>>> {
        Seq_::mapIndexed(Func2::new(move |i: i32, x: T| LrcPtr::new((i, x))), xs)
    }
    pub fn map2<T1: Clone + 'static, T2: Clone + 'static, U: Clone + 'static>(
        mapping: Func2<T1, T2, U>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::generate(
            Func0::new({
                let xs = xs.clone();
                let ys = ys.clone();
                move || LrcPtr::new((Seq_::ofSeq(xs.clone()), Seq_::ofSeq(ys.clone())))
            }),
            Func1::new({
                let mapping = mapping.clone();
                move |tupledArg: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T1>>,
                    LrcPtr<dyn IEnumerator_1<T2>>,
                )>| {
                    let e1: LrcPtr<dyn IEnumerator_1<T1>> = tupledArg.0.clone();
                    let e2: LrcPtr<dyn IEnumerator_1<T2>> = tupledArg.1.clone();
                    if if e1.MoveNext() { e2.MoveNext() } else { false } {
                        Some(mapping(e1.get_Current(), e2.get_Current()))
                    } else {
                        None::<U>
                    }
                }
            }),
            Func1::new(
                move |tupledArg_1: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T1>>,
                    LrcPtr<dyn IEnumerator_1<T2>>,
                )>| {
                    let __finally__ = finally(Func0::new({
                        let tupledArg_1 = tupledArg_1.clone();
                        move || tupledArg_1.1.clone().Dispose()
                    }));
                    tupledArg_1.0.clone().Dispose()
                },
            ),
        )
    }
    pub fn mapIndexed2<T1: Clone + 'static, T2: Clone + 'static, U: Clone + 'static>(
        mapping: Func3<i32, T1, T2, U>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                let ys = ys.clone();
                move || LrcPtr::new((Seq_::ofSeq(xs.clone()), Seq_::ofSeq(ys.clone())))
            }),
            Func2::new({
                let mapping = mapping.clone();
                move |i: i32,
                      tupledArg: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T1>>,
                    LrcPtr<dyn IEnumerator_1<T2>>,
                )>| {
                    let e1: LrcPtr<dyn IEnumerator_1<T1>> = tupledArg.0.clone();
                    let e2: LrcPtr<dyn IEnumerator_1<T2>> = tupledArg.1.clone();
                    if if e1.MoveNext() { e2.MoveNext() } else { false } {
                        Some(mapping(i, e1.get_Current(), e2.get_Current()))
                    } else {
                        None::<U>
                    }
                }
            }),
            Func1::new(
                move |tupledArg_1: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T1>>,
                    LrcPtr<dyn IEnumerator_1<T2>>,
                )>| {
                    let __finally__ = finally(Func0::new({
                        let tupledArg_1 = tupledArg_1.clone();
                        move || tupledArg_1.1.clone().Dispose()
                    }));
                    tupledArg_1.0.clone().Dispose()
                },
            ),
        )
    }
    pub fn map3<
        T1: Clone + 'static,
        T2: Clone + 'static,
        T3: Clone + 'static,
        U: Clone + 'static,
    >(
        mapping: Func3<T1, T2, T3, U>,
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
        zs: LrcPtr<dyn IEnumerable_1<T3>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::generate(
            Func0::new({
                let xs = xs.clone();
                let ys = ys.clone();
                let zs = zs.clone();
                move || {
                    LrcPtr::new((
                        Seq_::ofSeq(xs.clone()),
                        Seq_::ofSeq(ys.clone()),
                        Seq_::ofSeq(zs.clone()),
                    ))
                }
            }),
            Func1::new({
                let mapping = mapping.clone();
                move |tupledArg: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T1>>,
                    LrcPtr<dyn IEnumerator_1<T2>>,
                    LrcPtr<dyn IEnumerator_1<T3>>,
                )>| {
                    let e1: LrcPtr<dyn IEnumerator_1<T1>> = tupledArg.0.clone();
                    let e2: LrcPtr<dyn IEnumerator_1<T2>> = tupledArg.1.clone();
                    let e3: LrcPtr<dyn IEnumerator_1<T3>> = tupledArg.2.clone();
                    if if if e1.MoveNext() { e2.MoveNext() } else { false } {
                        e3.MoveNext()
                    } else {
                        false
                    } {
                        Some(mapping(
                            e1.get_Current(),
                            e2.get_Current(),
                            e3.get_Current(),
                        ))
                    } else {
                        None::<U>
                    }
                }
            }),
            Func1::new(
                move |tupledArg_1: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T1>>,
                    LrcPtr<dyn IEnumerator_1<T2>>,
                    LrcPtr<dyn IEnumerator_1<T3>>,
                )>| {
                    let __finally__ = finally(Func0::new({
                        let tupledArg_1 = tupledArg_1.clone();
                        move || {
                            let __finally__ = finally(Func0::new({
                                let tupledArg_1 = tupledArg_1.clone();
                                move || tupledArg_1.2.clone().Dispose()
                            }));
                            tupledArg_1.1.clone().Dispose()
                        }
                    }));
                    tupledArg_1.0.clone().Dispose()
                },
            ),
        )
    }
    pub fn readOnly<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::map(Func1::new(move |x: T| x), xs)
    }
    pub fn mapFold<State: Clone + 'static, T: Clone + 'static, U: Clone + 'static>(
        mapping: Func2<State, T, LrcPtr<(U, State)>>,
        state: State,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<(LrcPtr<dyn IEnumerable_1<U>>, State)> {
        let patternInput: LrcPtr<(Array<U>, State)> = mapFold_1(mapping, state, Seq_::toArray(xs));
        LrcPtr::new((
            Seq_::readOnly(Seq_::ofArray(patternInput.0.clone())),
            patternInput.1.clone(),
        ))
    }
    pub fn mapFoldBack<T: Clone + 'static, State: Clone + 'static, U: Clone + 'static>(
        mapping: Func2<T, State, LrcPtr<(U, State)>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        state: State,
    ) -> LrcPtr<(LrcPtr<dyn IEnumerable_1<U>>, State)> {
        let patternInput: LrcPtr<(Array<U>, State)> =
            mapFoldBack_1(mapping, Seq_::toArray(xs), state);
        LrcPtr::new((
            Seq_::readOnly(Seq_::ofArray(patternInput.0.clone())),
            patternInput.1.clone(),
        ))
    }
    pub fn collect<T: Clone + 'static, U: Clone + 'static>(
        mapping: Func1<T, LrcPtr<dyn IEnumerable_1<U>>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<U>> {
        Seq_::delay(Func0::new({
            let mapping = mapping.clone();
            let xs = xs.clone();
            move || Seq_::concat(Seq_::map(mapping.clone(), xs.clone()))
        }))
    }
    pub fn cache<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        let prefix: Array<T> = new_empty::<T>();
        let enumOpt: LrcPtr<MutCell<Option<LrcPtr<dyn IEnumerator_1<T>>>>> =
            LrcPtr::new(MutCell::new(None::<LrcPtr<dyn IEnumerator_1<T>>>));
        let finished: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
        let result = Func1::new({
            let enumOpt = enumOpt.clone();
            let finished = finished.clone();
            let prefix = prefix.clone();
            let xs = xs.clone();
            move |i: i32| {
                if (i) < (get_Count(prefix.clone())) {
                    Some(LrcPtr::new((prefix[i].clone(), (i) + 1_i32)))
                } else {
                    if enumOpt.get().clone().is_none() {
                        enumOpt.set(Some(xs.GetEnumerator()));
                    }
                    if enumOpt.get().clone().is_some() && {
                        let e: LrcPtr<dyn IEnumerator_1<T>> = enumOpt.get().clone().unwrap();
                        !finished.get().clone()
                    } {
                        let e_1: LrcPtr<dyn IEnumerator_1<T>> = enumOpt.get().clone().unwrap();
                        if e_1.MoveNext() {
                            add(prefix.clone(), e_1.get_Current());
                            Some(LrcPtr::new((e_1.get_Current(), (i) + 1_i32)))
                        } else {
                            finished.set(true);
                            None::<LrcPtr<(T, i32)>>
                        }
                    } else {
                        None::<LrcPtr<(T, i32)>>
                    }
                }
            }
        });
        Seq_::unfold(result, 0_i32)
    }
    pub fn allPairs<T1: Clone + 'static, T2: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(T1, T2)>>> {
        let ysCache: LrcPtr<dyn IEnumerable_1<T2>> = Seq_::cache(ys);
        Seq_::delay(Func0::new({
            let xs = xs.clone();
            let ysCache = ysCache.clone();
            move || {
                Seq_::concat(Seq_::map(
                    Func1::new({
                        let ysCache = ysCache.clone();
                        move |x: T1| {
                            Seq_::map(
                                Func1::new({
                                    let x = x.clone();
                                    move |y: T2| LrcPtr::new((x.clone(), y))
                                }),
                                ysCache.clone(),
                            )
                        }
                    }),
                    xs.clone(),
                ))
            }
        }))
    }
    pub fn tryPick<T: Clone + 'static, a: Clone + 'static>(
        chooser: Func1<T, Option<a>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> Option<a> {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            {
                let res: MutCell<Option<a>> = MutCell::new(None::<a>);
                while if res.get().clone().is_none() {
                    e.MoveNext()
                } else {
                    false
                } {
                    res.set(chooser(e.get_Current()));
                }
                res.get().clone()
            }
        }
    }
    pub fn pick<T: Clone + 'static, a: Clone + 'static>(
        chooser: Func1<T, Option<a>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> a {
        let matchValue: Option<a> = Seq_::tryPick(chooser, xs);
        match &matchValue {
            None => panic!("{}", keyNotFoundAlt(),),
            Some(matchValue_0_0) => matchValue_0_0.clone(),
        }
    }
    pub fn reduce<T: Clone + 'static>(
        folder: Func2<T, T, T>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs);
        {
            let __finally__ = finally(Func0::new({
                let e = e.clone();
                move || {
                    if type_test::<_, LrcPtr<dyn IDisposable>>(&(e.clone())) {
                        e.clone().Dispose();
                    }
                }
            }));
            if e.MoveNext() {
                let acc: MutCell<T> = MutCell::new(e.get_Current());
                while e.MoveNext() {
                    acc.set(folder(acc.get().clone(), e.get_Current()));
                }
                acc.get().clone()
            } else {
                panic!("{}", inputSequenceEmpty(),)
            }
        }
    }
    pub fn reduceBack<T: Clone + 'static>(
        folder: Func2<T, T, T>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        let arr: Array<T> = Seq_::toArray(xs);
        if (get_Count(arr.clone())) > 0_i32 {
            reduceBack_1(folder, arr)
        } else {
            panic!("{}", inputSequenceEmpty(),)
        }
    }
    pub fn replicate<a: Clone + 'static>(n: i32, x: a) -> LrcPtr<dyn IEnumerable_1<a>> {
        Seq_::initialize(
            n,
            Func1::new({
                let x = x.clone();
                move |_arg: i32| x.clone()
            }),
        )
    }
    pub fn reverse<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let xs = xs.clone();
            move || Seq_::ofArray(reverse_1(Seq_::toArray(xs.clone())))
        }))
    }
    pub fn scan<State: Clone + 'static, T: Clone + 'static>(
        folder: Func2<State, T, State>,
        state: State,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<State>> {
        Seq_::delay(Func0::new({
            let folder = folder.clone();
            let state = state.clone();
            let xs = xs.clone();
            move || {
                let acc: LrcPtr<MutCell<State>> = LrcPtr::new(MutCell::new(state.clone()));
                Seq_::append(Seq_::singleton(state.clone()), {
                    let mapping = Func1::new({
                        let acc = acc.clone();
                        let folder = folder.clone();
                        move |x: T| {
                            acc.set(folder(acc.get().clone(), x));
                            acc.get().clone()
                        }
                    });
                    Seq_::map(mapping, xs.clone())
                })
            }
        }))
    }
    pub fn scanBack<T: Clone + 'static, State: Clone + 'static>(
        folder: Func2<T, State, State>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
        state: State,
    ) -> LrcPtr<dyn IEnumerable_1<State>> {
        Seq_::delay(Func0::new({
            let folder = folder.clone();
            let state = state.clone();
            let xs = xs.clone();
            move || {
                Seq_::ofArray(scanBack_1(
                    folder.clone(),
                    Seq_::toArray(xs.clone()),
                    state.clone(),
                ))
            }
        }))
    }
    pub fn skip<T: Clone + 'static>(
        count: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::mkSeq(Func0::new({
            let count = count.clone();
            let xs = xs.clone();
            move || {
                let e: LrcPtr<dyn IEnumerator_1<T>> = Seq_::ofSeq(xs.clone());
                for i in 1_i32..=count {
                    if !e.MoveNext() {
                        panic!(
                            "{}",
                            append_1((notEnoughElements()), string(" (Parameter \'source\')")),
                        );
                    };
                }
                e.clone()
            }
        }))
    }
    pub fn skipWhile<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let predicate = predicate.clone();
            let xs = xs.clone();
            move || {
                let skipped: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(true));
                let f = Func1::new({
                    let predicate = predicate.clone();
                    let skipped = skipped.clone();
                    move |x: T| {
                        if skipped.get().clone() {
                            skipped.set(predicate(x));
                        }
                        !skipped.get().clone()
                    }
                });
                Seq_::filter(f, xs.clone())
            }
        }))
    }
    pub fn tail<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::skip(1_i32, xs)
    }
    pub fn take<T: Clone + 'static>(
        count: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let count = count.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if (i) < (count) {
                        if !e.MoveNext() {
                            panic!(
                                "{}",
                                append_1((notEnoughElements()), string(" (Parameter \'source\')")),
                            );
                        }
                        Some(e.get_Current())
                    } else {
                        None::<T>
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn takeWhile<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::generate(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func1::new({
                let predicate = predicate.clone();
                move |e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if if e.MoveNext() {
                        predicate(e.get_Current())
                    } else {
                        false
                    } {
                        Some(e.get_Current())
                    } else {
                        None::<T>
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn truncate<T: Clone + 'static>(
        count: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let count = count.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if if (i) < (count) { e.MoveNext() } else { false } {
                        Some(e.get_Current())
                    } else {
                        None::<T>
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn zip<T1: Clone + 'static, T2: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(T1, T2)>>> {
        Seq_::map2(Func2::new(move |x: T1, y: T2| LrcPtr::new((x, y))), xs, ys)
    }
    pub fn zip3<T1: Clone + 'static, T2: Clone + 'static, T3: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T1>>,
        ys: LrcPtr<dyn IEnumerable_1<T2>>,
        zs: LrcPtr<dyn IEnumerable_1<T3>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(T1, T2, T3)>>> {
        Seq_::map3(
            Func3::new(move |x: T1, y: T2, z: T3| LrcPtr::new((x, y, z))),
            xs,
            ys,
            zs,
        )
    }
    pub fn pairwise<T: Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(T, T)>>> {
        Seq_::delay(Func0::new({
            let xs = xs.clone();
            move || Seq_::ofArray(pairwise_1(Seq_::toArray(xs.clone())))
        }))
    }
    pub fn splitInto<T: Clone + 'static>(
        chunks: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<Array<T>>> {
        Seq_::delay(Func0::new({
            let chunks = chunks.clone();
            let xs = xs.clone();
            move || Seq_::ofArray(splitInto_1(chunks, Seq_::toArray(xs.clone())))
        }))
    }
    pub fn r#where<T: Clone + 'static>(
        predicate: Func1<T, bool>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::filter(predicate, xs)
    }
    pub fn windowed<T: Clone + 'static>(
        windowSize: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<Array<T>>> {
        Seq_::delay(Func0::new({
            let windowSize = windowSize.clone();
            let xs = xs.clone();
            move || Seq_::ofArray(windowed_1(windowSize, Seq_::toArray(xs.clone())))
        }))
    }
    pub fn transpose<T: Clone + 'static>(
        xss: LrcPtr<dyn IEnumerable_1<LrcPtr<dyn IEnumerable_1<T>>>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<dyn IEnumerable_1<T>>>> {
        Seq_::delay(Func0::new({
            let xss = xss.clone();
            move || {
                Seq_::ofArray(map_1(
                    Func1::new(move |arr: Array<T>| Seq_::ofArray(arr)),
                    transpose_1(toArray_1(ofArray_1(map_1(
                        Func1::new(move |xs_1: LrcPtr<dyn IEnumerable_1<T>>| Seq_::toArray(xs_1)),
                        Seq_::toArray(xss.clone()),
                    )))),
                ))
            }
        }))
    }
    pub fn sortWith<T: Clone + 'static>(
        comparer: Func2<T, T, i32>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let comparer = comparer.clone();
            let xs = xs.clone();
            move || {
                let arr: Array<T> = Seq_::toArray(xs.clone());
                sortInPlaceWith(comparer.clone(), arr.clone());
                Seq_::ofArray(arr)
            }
        }))
    }
    pub fn sort<T: PartialOrd + Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::sortWith(Func2::new(move |e: T, e_1: T| compare(e, e_1)), xs)
    }
    pub fn sortBy<T: Clone + 'static, U: PartialOrd + Clone + 'static>(
        projection: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::sortWith(
            Func2::new({
                let projection = projection.clone();
                move |x: T, y: T| compare(projection(x), projection(y))
            }),
            xs,
        )
    }
    pub fn sortDescending<T: PartialOrd + Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::sortWith(Func2::new(move |x: T, y: T| (compare(x, y)) * -1_i32), xs)
    }
    pub fn sortByDescending<T: Clone + 'static, U: PartialOrd + Clone + 'static>(
        projection: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::sortWith(
            Func2::new({
                let projection = projection.clone();
                move |x: T, y: T| (compare(projection(x), projection(y))) * -1_i32
            }),
            xs,
        )
    }
    pub fn sum<T: core::ops::Add<Output = T> + Default + Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        Seq_::fold(Func2::new(move |acc: T, x: T| (acc) + (x)), defaultOf(), xs)
    }
    pub fn sumBy<T: Clone + 'static, U: core::ops::Add<Output = U> + Default + Clone + 'static>(
        projection: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> U {
        Seq_::fold(
            Func2::new({
                let projection = projection.clone();
                move |acc: U, x: T| (acc) + (projection(x))
            }),
            defaultOf(),
            xs,
        )
    }
    pub fn maxBy<T: Clone + 'static, U: PartialOrd + Clone + 'static>(
        projection: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        Seq_::reduce(
            Func2::new({
                let projection = projection.clone();
                move |x: T, y: T| {
                    if (projection(x.clone())) > (projection(y.clone())) {
                        x
                    } else {
                        y
                    }
                }
            }),
            xs,
        )
    }
    pub fn max<T: PartialOrd + Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> T {
        Seq_::reduce(
            Func2::new(move |x: T, y: T| if (x.clone()) > (y.clone()) { x } else { y }),
            xs,
        )
    }
    pub fn minBy<T: Clone + 'static, U: PartialOrd + Clone + 'static>(
        projection: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        Seq_::reduce(
            Func2::new({
                let projection = projection.clone();
                move |x: T, y: T| {
                    if (projection(x.clone())) < (projection(y.clone())) {
                        x
                    } else {
                        y
                    }
                }
            }),
            xs,
        )
    }
    pub fn min<T: PartialOrd + Clone + 'static>(xs: LrcPtr<dyn IEnumerable_1<T>>) -> T {
        Seq_::reduce(
            Func2::new(move |x: T, y: T| if (x.clone()) < (y.clone()) { x } else { y }),
            xs,
        )
    }
    pub fn average<
        T: core::ops::Add<Output = T>
            + core::ops::Div<Output = T>
            + From<i32>
            + Default
            + Clone
            + 'static,
    >(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> T {
        let count: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(0_i32));
        let folder = Func2::new({
            let count = count.clone();
            move |acc: T, x: T| {
                count.set((count.get().clone()) + 1_i32);
                (acc) + (x)
            }
        });
        let total: T = Seq_::fold(folder, defaultOf(), xs);
        if (count.get().clone()) == 0_i32 {
            panic!("{}", inputSequenceEmpty(),);
        }
        (total) / (T::from(count.get().clone()))
    }
    pub fn averageBy<
        T: Clone + 'static,
        U: core::ops::Add<Output = U>
            + core::ops::Div<Output = U>
            + From<i32>
            + Default
            + Clone
            + 'static,
    >(
        projection: Func1<T, U>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> U {
        let count: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(0_i32));
        let folder = Func2::new({
            let count = count.clone();
            let projection = projection.clone();
            move |acc: U, x: T| {
                count.set((count.get().clone()) + 1_i32);
                (acc) + (projection(x))
            }
        });
        let total: U = Seq_::fold(folder, defaultOf(), xs);
        if (count.get().clone()) == 0_i32 {
            panic!("{}", inputSequenceEmpty(),);
        }
        (total) / (U::from(count.get().clone()))
    }
    pub fn permute<T: Clone + 'static>(
        f: Func1<i32, i32>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let f = f.clone();
            let xs = xs.clone();
            move || Seq_::ofArray(permute_1(f.clone(), Seq_::toArray(xs.clone())))
        }))
    }
    pub fn chunkBySize<T: Clone + 'static>(
        chunkSize: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<Array<T>>> {
        Seq_::delay(Func0::new({
            let chunkSize = chunkSize.clone();
            let xs = xs.clone();
            move || Seq_::ofArray(chunkBySize_1(chunkSize, Seq_::toArray(xs.clone())))
        }))
    }
    pub fn distinct<T: core::hash::Hash + PartialEq + Clone + 'static>(
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let xs = xs.clone();
            move || {
                let hashSet: HashSet<T> = new_empty_1::<T>();
                Seq_::filter(
                    Func1::new({
                        let hashSet = hashSet.clone();
                        move |x: T| add_1(hashSet.clone(), x)
                    }),
                    xs.clone(),
                )
            }
        }))
    }
    pub fn distinctBy<T: Clone + 'static, Key: core::hash::Hash + PartialEq + Clone + 'static>(
        projection: Func1<T, Key>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let projection = projection.clone();
            let xs = xs.clone();
            move || {
                let hashSet: HashSet<Key> = new_empty_1::<Key>();
                Seq_::filter(
                    Func1::new({
                        let hashSet = hashSet.clone();
                        let projection = projection.clone();
                        move |x: T| add_1(hashSet.clone(), projection(x))
                    }),
                    xs.clone(),
                )
            }
        }))
    }
    pub fn except<T: core::hash::Hash + PartialEq + Clone + 'static>(
        itemsToExclude: LrcPtr<dyn IEnumerable_1<T>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        Seq_::delay(Func0::new({
            let itemsToExclude = itemsToExclude.clone();
            let xs = xs.clone();
            move || {
                let hashSet: HashSet<T> =
                    new_from_enumerable(ofArray_1(Seq_::toArray(itemsToExclude.clone())));
                Seq_::filter(
                    Func1::new({
                        let hashSet = hashSet.clone();
                        move |x: T| add_1(hashSet.clone(), x)
                    }),
                    xs.clone(),
                )
            }
        }))
    }
    pub fn countBy<T: Clone + 'static, Key: core::hash::Hash + PartialEq + Clone + 'static>(
        projection: Func1<T, Key>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(Key, i32)>>> {
        Seq_::delay(Func0::new({
            let projection = projection.clone();
            let xs = xs.clone();
            move || {
                let dict: HashMap<Key, i32> = new_empty_2::<Key, i32>();
                let keys: Array<Key> = new_empty::<Key>();
                {
                    let enumerator: LrcPtr<dyn IEnumerator_1<T>> = xs.GetEnumerator();
                    {
                        let __finally__ = finally(Func0::new({
                            let enumerator = enumerator.clone();
                            move || {
                                if type_test::<_, LrcPtr<dyn IDisposable>>(&(enumerator.clone())) {
                                    enumerator.clone().Dispose();
                                }
                            }
                        }));
                        while enumerator.MoveNext() {
                            let key: Key = projection(enumerator.get_Current());
                            let matchValue: LrcPtr<(bool, i32)> = {
                                let outArg: MutCell<i32> = MutCell::new(0_i32);
                                LrcPtr::new((
                                    tryGetValue(dict.clone(), key.clone(), &outArg),
                                    outArg.get().clone(),
                                ))
                            };
                            if matchValue.0.clone() {
                                set(dict.clone(), key.clone(), (matchValue.1.clone()) + 1_i32)
                            } else {
                                set(dict.clone(), key.clone(), 1_i32);
                                add(keys.clone(), key)
                            }
                        }
                    }
                }
                Seq_::ofArray(map_1(
                    Func1::new({
                        let dict = dict.clone();
                        move |key_1: Key| LrcPtr::new((key_1.clone(), get(dict.clone(), key_1)))
                    }),
                    keys.clone(),
                ))
            }
        }))
    }
    pub fn groupBy<T: Clone + 'static, Key: core::hash::Hash + PartialEq + Clone + 'static>(
        projection: Func1<T, Key>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<LrcPtr<(Key, LrcPtr<dyn IEnumerable_1<T>>)>>> {
        Seq_::delay(Func0::new({
            let projection = projection.clone();
            let xs = xs.clone();
            move || {
                let dict: HashMap<Key, Array<T>> = new_empty_2::<Key, Array<T>>();
                let keys: Array<Key> = new_empty::<Key>();
                {
                    let enumerator: LrcPtr<dyn IEnumerator_1<T>> = xs.GetEnumerator();
                    {
                        let __finally__ = finally(Func0::new({
                            let enumerator = enumerator.clone();
                            move || {
                                if type_test::<_, LrcPtr<dyn IDisposable>>(&(enumerator.clone())) {
                                    enumerator.clone().Dispose();
                                }
                            }
                        }));
                        while enumerator.MoveNext() {
                            let x: T = enumerator.get_Current();
                            let key: Key = projection(x.clone());
                            let matchValue: LrcPtr<(bool, Array<T>)> = {
                                let outArg: MutCell<Array<T>> = MutCell::new(new_empty::<T>());
                                LrcPtr::new((
                                    tryGetValue(dict.clone(), key.clone(), &outArg),
                                    outArg.get().clone(),
                                ))
                            };
                            if matchValue.0.clone() {
                                add(matchValue.1.clone(), x.clone())
                            } else {
                                add_2(
                                    dict.clone(),
                                    key.clone(),
                                    new_from_enumerable_1(ofArray_1(new_array(&[x]))),
                                );
                                add(keys.clone(), key)
                            }
                        }
                    }
                }
                Seq_::ofArray(map_1(
                    Func1::new({
                        let dict = dict.clone();
                        move |key_1: Key| {
                            LrcPtr::new((
                                key_1.clone(),
                                Seq_::ofArray({
                                    let a_1: Array<T> = get(dict.clone(), key_1);
                                    a_1
                                }),
                            ))
                        }
                    }),
                    keys.clone(),
                ))
            }
        }))
    }
    pub fn insertAt<T: Clone + 'static>(
        index: i32,
        y: T,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        let isDone: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
        if (index) < 0_i32 {
            panic!(
                "{}",
                append_1((indexOutOfBounds()), string(" (Parameter \'index\')")),
            );
        }
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let index = index.clone();
                let isDone = isDone.clone();
                let y = y.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if if if isDone.get().clone() {
                        true
                    } else {
                        (i) < (index)
                    } {
                        e.MoveNext()
                    } else {
                        false
                    } {
                        Some(e.get_Current())
                    } else {
                        if (i) == (index) {
                            isDone.set(true);
                            Some(y.clone())
                        } else {
                            if !isDone.get().clone() {
                                panic!(
                                    "{}",
                                    append_1(
                                        (indexOutOfBounds()),
                                        string(" (Parameter \'index\')")
                                    ),
                                );
                            }
                            None::<T>
                        }
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn insertManyAt<T: Clone + 'static>(
        index: i32,
        ys: LrcPtr<dyn IEnumerable_1<T>>,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        let status: LrcPtr<MutCell<i32>> = LrcPtr::new(MutCell::new(-1_i32));
        if (index) < 0_i32 {
            panic!(
                "{}",
                append_1((indexOutOfBounds()), string(" (Parameter \'index\')")),
            );
        }
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                let ys = ys.clone();
                move || LrcPtr::new((Seq_::ofSeq(xs.clone()), Seq_::ofSeq(ys.clone())))
            }),
            Func2::new({
                let index = index.clone();
                let status = status.clone();
                move |i: i32,
                      tupledArg: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T>>,
                    LrcPtr<dyn IEnumerator_1<T>>,
                )>| {
                    let e1: LrcPtr<dyn IEnumerator_1<T>> = tupledArg.0.clone();
                    let e2: LrcPtr<dyn IEnumerator_1<T>> = tupledArg.1.clone();
                    if (i) == (index) {
                        status.set(0_i32);
                    }
                    {
                        let inserted: Option<T> = if (status.get().clone()) == 0_i32 {
                            if e2.MoveNext() {
                                Some(e2.get_Current())
                            } else {
                                status.set(1_i32);
                                None::<T>
                            }
                        } else {
                            None::<T>
                        };
                        match &inserted {
                            None => {
                                if e1.MoveNext() {
                                    Some(e1.get_Current())
                                } else {
                                    if (status.get().clone()) < 1_i32 {
                                        panic!(
                                            "{}",
                                            append_1(
                                                (indexOutOfBounds()),
                                                string(" (Parameter \'index\')")
                                            ),
                                        );
                                    }
                                    None::<T>
                                }
                            }
                            Some(inserted_0_0) => Some(inserted_0_0.clone()),
                        }
                    }
                }
            }),
            Func1::new(
                move |tupledArg_1: LrcPtr<(
                    LrcPtr<dyn IEnumerator_1<T>>,
                    LrcPtr<dyn IEnumerator_1<T>>,
                )>| {
                    tupledArg_1.0.clone().Dispose();
                    tupledArg_1.1.clone().Dispose()
                },
            ),
        )
    }
    pub fn removeAt<T: Clone + 'static>(
        index: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        let isDone: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
        if (index) < 0_i32 {
            panic!(
                "{}",
                append_1((indexOutOfBounds()), string(" (Parameter \'index\')")),
            );
        }
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let index = index.clone();
                let isDone = isDone.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if if if isDone.get().clone() {
                        true
                    } else {
                        (i) < (index)
                    } {
                        e.MoveNext()
                    } else {
                        false
                    } {
                        Some(e.get_Current())
                    } else {
                        if if (i) == (index) { e.MoveNext() } else { false } {
                            isDone.set(true);
                            if e.MoveNext() {
                                Some(e.get_Current())
                            } else {
                                None::<T>
                            }
                        } else {
                            if !isDone.get().clone() {
                                panic!(
                                    "{}",
                                    append_1(
                                        (indexOutOfBounds()),
                                        string(" (Parameter \'index\')")
                                    ),
                                );
                            }
                            None::<T>
                        }
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn removeManyAt<T: Clone + 'static>(
        index: i32,
        count: i32,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        if (index) < 0_i32 {
            panic!(
                "{}",
                append_1((indexOutOfBounds()), string(" (Parameter \'index\')")),
            );
        }
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let count = count.clone();
                let index = index.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if (i) < (index) {
                        if e.MoveNext() {
                            Some(e.get_Current())
                        } else {
                            panic!(
                                "{}",
                                append_1((indexOutOfBounds()), string(" (Parameter \'index\')")),
                            )
                        }
                    } else {
                        if (i) == (index) {
                            for _i in 1_i32..=count {
                                if !e.MoveNext() {
                                    panic!(
                                        "{}",
                                        append_1(
                                            (indexOutOfBounds()),
                                            string(" (Parameter \'count\')")
                                        ),
                                    );
                                };
                            }
                        }
                        if e.MoveNext() {
                            Some(e.get_Current())
                        } else {
                            None::<T>
                        }
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
    pub fn updateAt<T: Clone + 'static>(
        index: i32,
        y: T,
        xs: LrcPtr<dyn IEnumerable_1<T>>,
    ) -> LrcPtr<dyn IEnumerable_1<T>> {
        let isDone: LrcPtr<MutCell<bool>> = LrcPtr::new(MutCell::new(false));
        if (index) < 0_i32 {
            panic!(
                "{}",
                append_1((indexOutOfBounds()), string(" (Parameter \'index\')")),
            );
        }
        Seq_::generateIndexed(
            Func0::new({
                let xs = xs.clone();
                move || Seq_::ofSeq(xs.clone())
            }),
            Func2::new({
                let index = index.clone();
                let isDone = isDone.clone();
                let y = y.clone();
                move |i: i32, e: LrcPtr<dyn IEnumerator_1<T>>| {
                    if if if isDone.get().clone() {
                        true
                    } else {
                        (i) < (index)
                    } {
                        e.MoveNext()
                    } else {
                        false
                    } {
                        Some(e.get_Current())
                    } else {
                        if if (i) == (index) { e.MoveNext() } else { false } {
                            isDone.set(true);
                            Some(y.clone())
                        } else {
                            if !isDone.get().clone() {
                                panic!(
                                    "{}",
                                    append_1(
                                        (indexOutOfBounds()),
                                        string(" (Parameter \'index\')")
                                    ),
                                );
                            }
                            None::<T>
                        }
                    }
                }
            }),
            Func1::new(move |e_1: LrcPtr<dyn IEnumerator_1<T>>| e_1.Dispose()),
        )
    }
}
