pub mod System {
    use super::*;
    use crate::Exception_::try_catch;
    use crate::Native_::Any;
    use crate::Native_::Func0;
    use crate::Native_::LrcPtr;
    use crate::Native_::MutCell;
    use crate::String_::append;
    use crate::String_::isEmpty;
    use crate::String_::string;
    use crate::System::Collections::IEqualityComparer;
    use crate::System::Collections::IStructuralEquatable;
    use crate::System::Exception as Exception_1;
    #[derive(Clone, Debug)]
    pub struct Array {}
    impl Array {
        pub fn _ctor() -> LrcPtr<System::Array> {
            ();
            ();
            LrcPtr::new(System::Array {})
        }
    }
    impl core::fmt::Display for Array {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone, Debug)]
    pub struct Attribute {}
    impl Attribute {
        pub fn _ctor() -> LrcPtr<System::Attribute> {
            ();
            ();
            LrcPtr::new(System::Attribute {})
        }
    }
    impl core::fmt::Display for Attribute {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone, Debug)]
    pub struct Enum {}
    impl Enum {
        pub fn _ctor() -> LrcPtr<System::Enum> {
            ();
            ();
            LrcPtr::new(System::Enum {})
        }
    }
    impl core::fmt::Display for Enum {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone, Debug, Hash, PartialEq)]
    pub struct Exception {
        message: string,
    }
    impl Exception {
        pub fn _ctor__Z721C83C5(message: string) -> LrcPtr<System::Exception> {
            let message_1: string;
            ();
            message_1 = message;
            ();
            LrcPtr::new(System::Exception { message: message_1 })
        }
        pub fn _ctor() -> LrcPtr<System::Exception> {
            System::Exception::_ctor__Z721C83C5(string(""))
        }
        pub fn get_Message(&self) -> string {
            let __self__ = self;
            if isEmpty(__self__.message.clone()) {
                string("Specified argument was out of the range of valid values.")
            } else {
                __self__.message.clone()
            }
        }
        pub fn get_StackTrace(&self) -> string {
            let __self__ = self;
            string("")
        }
    }
    impl core::fmt::Display for Exception {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    impl IStructuralEquatable for Exception {
        fn Equals(&self, y: LrcPtr<dyn Any>, comparer: LrcPtr<dyn IEqualityComparer>) -> bool {
            let __self__ = self;
            false
        }
        fn GetHashCode(&self, comparer: LrcPtr<dyn IEqualityComparer>) -> i32 {
            let __self__ = self;
            0_i32
        }
    }
    #[derive(Clone, Debug)]
    pub struct InvalidOperationException {
        message: string,
    }
    impl InvalidOperationException {
        pub fn _ctor__Z721C83C5(message: string) -> LrcPtr<System::InvalidOperationException> {
            let message_1: string;
            ();
            message_1 = message;
            ();
            LrcPtr::new(System::InvalidOperationException { message: message_1 })
        }
        pub fn _ctor() -> LrcPtr<System::InvalidOperationException> {
            System::InvalidOperationException::_ctor__Z721C83C5(string(""))
        }
        pub fn get_Message(&self) -> string {
            let __self__ = self;
            if isEmpty(__self__.message.clone()) {
                string("Operation is not valid due to the current state of the object.")
            } else {
                __self__.message.clone()
            }
        }
    }
    impl core::fmt::Display for InvalidOperationException {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone, Debug)]
    pub struct ArgumentException {
        paramName: string,
        message: string,
    }
    impl ArgumentException {
        pub fn _ctor__Z384F8060(
            message: string,
            paramName: string,
        ) -> LrcPtr<System::ArgumentException> {
            let paramName_1: string;
            let message_1: string;
            ();
            message_1 = message;
            paramName_1 = paramName;
            ();
            LrcPtr::new(System::ArgumentException {
                paramName: paramName_1,
                message: message_1,
            })
        }
        pub fn _ctor() -> LrcPtr<System::ArgumentException> {
            System::ArgumentException::_ctor__Z384F8060(string(""), string(""))
        }
        pub fn _ctor__Z721C83C5(message: string) -> LrcPtr<System::ArgumentException> {
            System::ArgumentException::_ctor__Z384F8060(message, string(""))
        }
        pub fn get_Message(&self) -> string {
            let __self__ = self;
            let message: string = if isEmpty(__self__.message.clone()) {
                string("Value does not fall within the expected range.")
            } else {
                __self__.message.clone()
            };
            if isEmpty(__self__.paramName.clone()) {
                message.clone()
            } else {
                append(
                    (append(
                        (append((message), string(" (Parameter \'"))),
                        (__self__.paramName.clone()),
                    )),
                    string("\')"),
                )
            }
        }
        pub fn get_ParamName(&self) -> string {
            let __self__ = self;
            __self__.paramName.clone()
        }
    }
    impl core::fmt::Display for ArgumentException {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone, Debug)]
    pub struct ArgumentOutOfRangeException {
        paramName: string,
        message: string,
    }
    impl ArgumentOutOfRangeException {
        pub fn _ctor__Z384F8060(
            paramName: string,
            message: string,
        ) -> LrcPtr<System::ArgumentOutOfRangeException> {
            let paramName_1: string;
            let message_1: string;
            ();
            paramName_1 = paramName;
            message_1 = message;
            ();
            LrcPtr::new(System::ArgumentOutOfRangeException {
                paramName: paramName_1,
                message: message_1,
            })
        }
        pub fn _ctor() -> LrcPtr<System::ArgumentOutOfRangeException> {
            System::ArgumentOutOfRangeException::_ctor__Z384F8060(string(""), string(""))
        }
        pub fn _ctor__Z721C83C5(paramName: string) -> LrcPtr<System::ArgumentOutOfRangeException> {
            System::ArgumentOutOfRangeException::_ctor__Z384F8060(paramName, string(""))
        }
        pub fn get_Message(&self) -> string {
            let __self__ = self;
            let message: string = if isEmpty(__self__.message.clone()) {
                string("Specified argument was out of the range of valid values.")
            } else {
                __self__.message.clone()
            };
            if isEmpty(__self__.paramName.clone()) {
                message.clone()
            } else {
                append(
                    (append(
                        (append((message), string(" (Parameter \'"))),
                        (__self__.paramName.clone()),
                    )),
                    string("\')"),
                )
            }
        }
        pub fn get_ParamName(&self) -> string {
            let __self__ = self;
            __self__.paramName.clone()
        }
    }
    impl core::fmt::Display for ArgumentOutOfRangeException {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone)]
    pub enum LazyState_1<T: Clone + 'static> {
        Initial(Func0<T>),
        Success(T),
        Failure(LrcPtr<Exception_1>),
    }
    impl<T: Clone + 'static> core::fmt::Debug for LazyState_1<T> {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    impl<T: Clone + 'static> core::fmt::Display for LazyState_1<T> {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    #[derive(Clone)]
    pub struct Lazy_1<T: Clone + 'static> {
        lazyState: MutCell<LrcPtr<System::LazyState_1<T>>>,
    }
    impl<T: Clone + 'static> Lazy_1<T> {
        pub fn _ctor__Z62F44226(
            state: LrcPtr<System::LazyState_1<T>>,
            isThreadSafe: bool,
        ) -> LrcPtr<System::Lazy_1<T>> {
            let lazyState: LrcPtr<System::LazyState_1<T>>;
            ();
            lazyState = state;
            ();
            LrcPtr::new(System::Lazy_1::<T> {
                lazyState: MutCell::new(lazyState),
            })
        }
        pub fn _ctor__2B595(f: Func0<T>) -> LrcPtr<System::Lazy_1<T>> {
            System::Lazy_1::_ctor__Z62F44226(
                LrcPtr::new(System::LazyState_1::Initial::<T>(Func0::new({
                    let f = f.clone();
                    move || f()
                }))),
                true,
            )
        }
        pub fn _ctor__Z1FE5A521(f: Func0<T>, isThreadSafe: bool) -> LrcPtr<System::Lazy_1<T>> {
            System::Lazy_1::_ctor__Z62F44226(
                LrcPtr::new(System::LazyState_1::Initial::<T>(Func0::new({
                    let f = f.clone();
                    move || f()
                }))),
                isThreadSafe,
            )
        }
        pub fn get_IsValueCreated(&self) -> bool {
            let __self__ = self;
            if let System::LazyState_1::Success(_) = __self__.lazyState.get().clone().as_ref() {
                true
            } else {
                false
            }
        }
        pub fn Force(&self) -> T {
            let __self__ = self;
            let matchValue: LrcPtr<System::LazyState_1<T>> = __self__.lazyState.get().clone();
            match matchValue.as_ref() {
                System::LazyState_1::Failure(matchValue_2_0) => {
                    panic!("{}", matchValue_2_0.get_Message(),)
                }
                System::LazyState_1::Initial(matchValue_0_0) => try_catch(
                    || {
                        let v_1: T = (matchValue_0_0)();
                        __self__
                            .lazyState
                            .set(LrcPtr::new(System::LazyState_1::Success::<T>(v_1.clone())));
                        v_1
                    },
                    |e_1: LrcPtr<Exception_1>| {
                        __self__
                            .lazyState
                            .set(LrcPtr::new(System::LazyState_1::Failure::<T>(e_1.clone())));
                        ();
                        panic!("{}", e_1.get_Message(),)
                    },
                ),
                System::LazyState_1::Success(matchValue_1_0) => matchValue_1_0.clone(),
            }
        }
        pub fn get_Value(&self) -> T {
            let __self__ = self;
            __self__.Force()
        }
    }
    impl<T: Clone + 'static> core::fmt::Debug for Lazy_1<T> {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
    impl<T: Clone + 'static> core::fmt::Display for Lazy_1<T> {
        fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
            write!(f, "{}", core::any::type_name::<Self>())
        }
    }
}
