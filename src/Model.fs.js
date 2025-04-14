import { Union, Record } from "./fable_modules/fable-library-js.4.24.0/Types.js";
import { bool_type, class_type, int32_type, union_type, option_type, string_type, record_type, list_type, float64_type } from "./fable_modules/fable-library-js.4.24.0/Reflection.js";
import { list, float, string, object } from "./fable_modules/Thoth.Json.8.0.0/Decode.fs.js";
import { comparePrimitives, uncurry2 } from "./fable_modules/fable-library-js.4.24.0/Util.js";
import { empty } from "./fable_modules/fable-library-js.4.24.0/List.js";
import { empty as empty_1 } from "./fable_modules/fable-library-js.4.24.0/Set.js";

export class Sparkline extends Record {
    constructor(price) {
        super();
        this.price = price;
    }
}

export function Sparkline_$reflection() {
    return record_type("Model.Sparkline", [], Sparkline, () => [["price", list_type(float64_type)]]);
}

export class Coin extends Record {
    constructor(id, symbol, name, image, current_price, market_cap, price_change_percentage_24h, sparkline_in_7d) {
        super();
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.image = image;
        this.current_price = current_price;
        this.market_cap = market_cap;
        this.price_change_percentage_24h = price_change_percentage_24h;
        this.sparkline_in_7d = sparkline_in_7d;
    }
}

export function Coin_$reflection() {
    return record_type("Model.Coin", [], Coin, () => [["id", string_type], ["symbol", string_type], ["name", string_type], ["image", string_type], ["current_price", float64_type], ["market_cap", float64_type], ["price_change_percentage_24h", option_type(float64_type)], ["sparkline_in_7d", Sparkline_$reflection()]]);
}

export const CoinModule_decoder = (path_10) => ((v_1) => object((get$) => {
    let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7;
    return new Coin((objectArg = get$.Required, objectArg.Field("id", string)), (objectArg_1 = get$.Required, objectArg_1.Field("symbol", string)), (objectArg_2 = get$.Required, objectArg_2.Field("name", string)), (objectArg_3 = get$.Required, objectArg_3.Field("image", string)), (objectArg_4 = get$.Required, objectArg_4.Field("current_price", float)), (objectArg_5 = get$.Required, objectArg_5.Field("market_cap", float)), (objectArg_6 = get$.Optional, objectArg_6.Field("price_change_percentage_24h", float)), (objectArg_7 = get$.Required, objectArg_7.Field("sparkline_in_7d", (path_9, v) => object((g) => {
        let objectArg_8;
        return new Sparkline((objectArg_8 = g.Required, objectArg_8.Field("price", (path_8, value_8) => list(float, path_8, value_8))));
    }, path_9, v))));
}, path_10, v_1));

export const CoinModule_decoderList = (path) => ((value) => list(uncurry2(CoinModule_decoder), path, value));

export class SortBy extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Name", "Price", "MarketCap"];
    }
}

export function SortBy_$reflection() {
    return union_type("Model.SortBy", [], SortBy, () => [[], [], []]);
}

export class SortDirection extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Ascending", "Descending"];
    }
}

export function SortDirection_$reflection() {
    return union_type("Model.SortDirection", [], SortDirection, () => [[], []]);
}

export class Model extends Record {
    constructor(Coins, SearchText, SortBy, SortDirection, Page, ItemsPerPage, SelectedCoins, IsLoading) {
        super();
        this.Coins = Coins;
        this.SearchText = SearchText;
        this.SortBy = SortBy;
        this.SortDirection = SortDirection;
        this.Page = (Page | 0);
        this.ItemsPerPage = (ItemsPerPage | 0);
        this.SelectedCoins = SelectedCoins;
        this.IsLoading = IsLoading;
    }
}

export function Model_$reflection() {
    return record_type("Model.Model", [], Model, () => [["Coins", list_type(Coin_$reflection())], ["SearchText", string_type], ["SortBy", SortBy_$reflection()], ["SortDirection", SortDirection_$reflection()], ["Page", int32_type], ["ItemsPerPage", int32_type], ["SelectedCoins", class_type("Microsoft.FSharp.Collections.FSharpSet`1", [string_type])], ["IsLoading", bool_type]]);
}

export const initModel = new Model(empty(), "", new SortBy(2, []), new SortDirection(1, []), 0, 5, empty_1({
    Compare: comparePrimitives,
}), true);

