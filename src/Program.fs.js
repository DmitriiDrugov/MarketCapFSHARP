import { ProgramModule_mkProgram, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";
import { initModel } from "./Model.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.0.0/./cmd.fs.js";
import { update, fetchCoins } from "./Update.fs.js";
import { view } from "./View.fs.js";

ProgramModule_run(Program_withReactSynchronous("root", ProgramModule_mkProgram(() => [initModel, Cmd_OfAsyncWith_perform((x_1) => {
    Cmd_OfAsync_start(x_1);
}, fetchCoins, void 0, (x) => x)], update, view)));

