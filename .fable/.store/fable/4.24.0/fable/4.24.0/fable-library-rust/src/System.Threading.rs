pub mod System {
    use super::*;
    pub mod Threading {
        use super::*;
        #[derive(Clone, Debug, Default, Hash, PartialEq, PartialOrd)]
        pub struct CancellationToken {}
        impl CancellationToken {
            pub fn new() -> System::Threading::CancellationToken {
                System::Threading::CancellationToken {}
            }
        }
        impl core::fmt::Display for CancellationToken {
            fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
                write!(f, "{}", core::any::type_name::<Self>())
            }
        }
    }
}
