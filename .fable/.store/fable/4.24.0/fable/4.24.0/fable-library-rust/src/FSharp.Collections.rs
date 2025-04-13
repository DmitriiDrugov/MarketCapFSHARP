pub mod FSharp {
    use super::*;
    pub mod Collections {
        use super::*;
        pub mod HashIdentity {
            use super::*;
            use crate::Native_::getHashCode;
            use crate::Native_::interface_cast;
            use crate::Native_::referenceEquals;
            use crate::Native_::referenceHash;
            use crate::Native_::Func1;
            use crate::Native_::Func2;
            use crate::Native_::Lrc;
            use crate::Native_::LrcPtr;
            use crate::System::Collections::Generic::EqualityComparer_1;
            use crate::System::Collections::Generic::IEqualityComparer_1;
            pub fn FromFunctions<T: Clone + 'static>(
                hasher: Func1<T, i32>,
                equals: Func2<T, T, bool>,
            ) -> LrcPtr<dyn IEqualityComparer_1<T>> {
                interface_cast!(
                    EqualityComparer_1::Create__Z6EE254AB(equals, hasher),
                    Lrc<dyn IEqualityComparer_1<T>>,
                )
            }
            pub fn Structural<T: core::hash::Hash + PartialEq + Clone + 'static>(
            ) -> LrcPtr<dyn IEqualityComparer_1<T>> {
                interface_cast!(
                    EqualityComparer_1::Create__Z6EE254AB(
                        Func2::new(move |delegateArg: T, delegateArg_1: T| (delegateArg)
                            == (delegateArg_1)),
                        Func1::new(move |delegateArg_2: T| getHashCode(delegateArg_2))
                    ),
                    Lrc<dyn IEqualityComparer_1<T>>,
                )
            }
            pub fn Reference<T: Clone + 'static>() -> LrcPtr<dyn IEqualityComparer_1<T>> {
                interface_cast!(
                    EqualityComparer_1::Create__Z6EE254AB(
                        Func2::new(move |delegateArg: T, delegateArg_1: T| referenceEquals(
                            &delegateArg,
                            &delegateArg_1
                        )),
                        Func1::new(move |delegateArg_2: T| referenceHash(&delegateArg_2))
                    ),
                    Lrc<dyn IEqualityComparer_1<T>>,
                )
            }
        }
        pub mod ComparisonIdentity {
            use super::*;
            use crate::Native_::compare;
            use crate::Native_::interface_cast;
            use crate::Native_::Func2;
            use crate::Native_::Lrc;
            use crate::Native_::LrcPtr;
            use crate::System::Collections::Generic::Comparer_1;
            use crate::System::Collections::Generic::IComparer_1;
            pub fn FromFunction<T: Clone + 'static>(
                comparer: Func2<T, T, i32>,
            ) -> LrcPtr<dyn IComparer_1<T>> {
                interface_cast!(
                    Comparer_1::Create__47C913C(comparer),
                    Lrc<dyn IComparer_1<T>>,
                )
            }
            pub fn Structural<T: PartialOrd + Clone + 'static>() -> LrcPtr<dyn IComparer_1<T>> {
                interface_cast!(
                    Comparer_1::Create__47C913C(Func2::new(
                        move |delegateArg: T, delegateArg_1: T| compare(delegateArg, delegateArg_1)
                    )),
                    Lrc<dyn IComparer_1<T>>,
                )
            }
        }
    }
}
