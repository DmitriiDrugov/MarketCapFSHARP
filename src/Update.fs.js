import { Union } from "./fable_modules/fable-library-js.4.24.0/Types.js";
import { SortDirection, Model, SortBy_$reflection, Coin_$reflection } from "./Model.fs.js";
import { int32_type, union_type, string_type, list_type } from "./fable_modules/fable-library-js.4.24.0/Reflection.js";
import { FSharpResult$2 } from "./fable_modules/fable-library-js.4.24.0/Result.js";
import { singleton } from "./fable_modules/fable-library-js.4.24.0/AsyncBuilder.js";
import { sleep } from "./fable_modules/fable-library-js.4.24.0/Async.js";
import { Http_get } from "./fable_modules/Fable.SimpleHttp.3.0.0/Http.fs.js";
import { fromString } from "./fable_modules/Thoth.Json.8.0.0/Decode.fs.js";
import { comparePrimitives, uncurry2 } from "./fable_modules/fable-library-js.4.24.0/Util.js";
import { decoderList } from "./Api.fs.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_perform } from "./fable_modules/Fable.Elmish.4.0.0/./cmd.fs.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { empty, FSharpSet__Add, FSharpSet__Remove, FSharpSet__Contains } from "./fable_modules/fable-library-js.4.24.0/Set.js";
import { some } from "./fable_modules/fable-library-js.4.24.0/Option.js";

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["GotCoins", "SetSearchText", "SetSortBy", "ToggleSortDirection", "PrevPage", "NextPage", "ToggleCoinSelection", "ClearSelection", "SetPage"];
    }
}

export function Msg_$reflection() {
    return union_type("Update.Msg", [], Msg, () => [[["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(Coin_$reflection()), string_type], FSharpResult$2, () => [[["ResultValue", list_type(Coin_$reflection())]], [["ErrorValue", string_type]]])]], [["Item", string_type]], [["Item", SortBy_$reflection()]], [], [], [], [["Item", string_type]], [], [["Item", int32_type]]]);
}

export const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h";

export function fetchCoins() {
    return singleton.Delay(() => singleton.Bind(sleep(900), () => singleton.Bind(Http_get(apiUrl), (_arg_1) => {
        const statusCode = _arg_1[0] | 0;
        const responseText = _arg_1[1];
        if (statusCode === 200) {
            const matchValue = fromString(uncurry2(decoderList), responseText);
            if (matchValue.tag === 1) {
                const err = matchValue.fields[0];
                return singleton.Return(new Msg(0, [new FSharpResult$2(1, [`Decoding error: ${err}`])]));
            }
            else {
                const coins = matchValue.fields[0];
                return singleton.Return(new Msg(0, [new FSharpResult$2(0, [coins])]));
            }
        }
        else {
            return singleton.Return(new Msg(0, [new FSharpResult$2(1, [`HTTP error: ${statusCode}`])]));
        }
    })));
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const text = msg.fields[0];
            return [new Model(model.Coins, text, model.SortBy, model.SortDirection, 0, model.ItemsPerPage, model.SelectedCoins, true), Cmd_OfAsyncWith_perform((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, fetchCoins, undefined, (x) => x)];
        }
        case 2: {
            const sortBy = msg.fields[0];
            return [new Model(model.Coins, model.SearchText, sortBy, model.SortDirection, model.Page, model.ItemsPerPage, model.SelectedCoins, model.IsLoading), Cmd_none()];
        }
        case 3: {
            const newDir = (model.SortDirection.tag === 1) ? (new SortDirection(0, [])) : (new SortDirection(1, []));
            return [new Model(model.Coins, model.SearchText, model.SortBy, newDir, model.Page, model.ItemsPerPage, model.SelectedCoins, model.IsLoading), Cmd_none()];
        }
        case 4:
            if (model.Page > 0) {
                return [new Model(model.Coins, model.SearchText, model.SortBy, model.SortDirection, model.Page - 1, model.ItemsPerPage, model.SelectedCoins, model.IsLoading), Cmd_none()];
            }
            else {
                return [model, Cmd_none()];
            }
        case 5:
            return [new Model(model.Coins, model.SearchText, model.SortBy, model.SortDirection, model.Page + 1, model.ItemsPerPage, model.SelectedCoins, model.IsLoading), Cmd_none()];
        case 8: {
            const page = msg.fields[0] | 0;
            return [new Model(model.Coins, model.SearchText, model.SortBy, model.SortDirection, page, model.ItemsPerPage, model.SelectedCoins, model.IsLoading), Cmd_none()];
        }
        case 6: {
            const id = msg.fields[0];
            const selected = FSharpSet__Contains(model.SelectedCoins, id) ? FSharpSet__Remove(model.SelectedCoins, id) : FSharpSet__Add(model.SelectedCoins, id);
            return [new Model(model.Coins, model.SearchText, model.SortBy, model.SortDirection, model.Page, model.ItemsPerPage, selected, model.IsLoading), Cmd_none()];
        }
        case 7:
            return [new Model(model.Coins, model.SearchText, model.SortBy, model.SortDirection, model.Page, model.ItemsPerPage, empty({
                Compare: comparePrimitives,
            }), model.IsLoading), Cmd_none()];
        default:
            if (msg.fields[0].tag === 1) {
                const err = msg.fields[0].fields[0];
                console.error(some("Failed to load coins:"), err);
                return [new Model(model.Coins, model.SearchText, model.SortBy, model.SortDirection, model.Page, model.ItemsPerPage, model.SelectedCoins, false), Cmd_none()];
            }
            else {
                const coins = msg.fields[0].fields[0];
                return [new Model(coins, model.SearchText, model.SortBy, model.SortDirection, model.Page, model.ItemsPerPage, model.SelectedCoins, false), Cmd_none()];
            }
    }
}

