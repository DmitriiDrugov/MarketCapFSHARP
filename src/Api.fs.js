import { fromString, string, float, list, object } from "./fable_modules/Thoth.Json.8.0.0/Decode.fs.js";
import { Coin, Sparkline } from "./Model.fs.js";
import { uncurry2 } from "./fable_modules/fable-library-js.4.24.0/Util.js";
import { singleton } from "./fable_modules/fable-library-js.4.24.0/AsyncBuilder.js";
import { Http_get } from "./fable_modules/Fable.SimpleHttp.3.0.0/Http.fs.js";
import { printf, toConsole } from "./fable_modules/fable-library-js.4.24.0/String.js";

export const sparklineDecoder = (path_2) => ((v) => object((get$) => {
    let objectArg;
    return new Sparkline((objectArg = get$.Required, objectArg.Field("price", (path_1, value_1) => list(float, path_1, value_1))));
}, path_2, v));

export const coinDecoder = (path_7) => ((v) => object((get$) => {
    let objectArg, objectArg_1, objectArg_2, objectArg_3, objectArg_4, objectArg_5, objectArg_6, objectArg_7;
    return new Coin((objectArg = get$.Required, objectArg.Field("id", string)), (objectArg_1 = get$.Required, objectArg_1.Field("symbol", string)), (objectArg_2 = get$.Required, objectArg_2.Field("name", string)), (objectArg_3 = get$.Required, objectArg_3.Field("image", string)), (objectArg_4 = get$.Required, objectArg_4.Field("current_price", float)), (objectArg_5 = get$.Required, objectArg_5.Field("market_cap", float)), (objectArg_6 = get$.Optional, objectArg_6.Field("price_change_percentage_24h", float)), (objectArg_7 = get$.Required, objectArg_7.Field("sparkline_in_7d", uncurry2(sparklineDecoder))));
}, path_7, v));

export const decoderList = (path) => ((value) => list(uncurry2(coinDecoder), path, value));

export function getCoins() {
    return singleton.Delay(() => singleton.Bind(Http_get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true"), (_arg) => {
        const statusCode = _arg[0] | 0;
        if (statusCode === 200) {
            const matchValue = fromString(uncurry2(decoderList), _arg[1]);
            if (matchValue.tag === 1) {
                toConsole(printf("Decode error: %s"))(matchValue.fields[0]);
                return singleton.Return(undefined);
            }
            else {
                return singleton.Return(matchValue.fields[0]);
            }
        }
        else {
            toConsole(printf("HTTP error: %d"))(statusCode);
            return singleton.Return(undefined);
        }
    }));
}

