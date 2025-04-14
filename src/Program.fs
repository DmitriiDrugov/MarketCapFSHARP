module Program

open Elmish
open Elmish.React
open Model
open Update
open View

Program.mkProgram (fun _ -> initModel, Cmd.OfAsync.perform fetchCoins () id) update view
|> Program.withReactSynchronous "root"
|> Program.run
