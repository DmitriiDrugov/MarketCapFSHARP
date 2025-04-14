module Api

open Fable.Core.JsInterop
open Fable.SimpleHttp
open Thoth.Json
open Model // ✅ открываем, чтобы использовать Model.Coin

let sparklineDecoder: Decoder<Sparkline> =
    Decode.object (fun get ->
        { price = get.Required.Field "price" (Decode.list Decode.float) })

let coinDecoder: Decoder<Coin> =
    Decode.object (fun get ->
        { id = get.Required.Field "id" Decode.string
          symbol = get.Required.Field "symbol" Decode.string
          name = get.Required.Field "name" Decode.string
          image = get.Required.Field "image" Decode.string
          current_price = get.Required.Field "current_price" Decode.float
          market_cap = get.Required.Field "market_cap" Decode.float
          price_change_percentage_24h = get.Optional.Field "price_change_percentage_24h" Decode.float
          sparkline_in_7d = get.Required.Field "sparkline_in_7d" sparklineDecoder })

let decoderList = Decode.list coinDecoder

let getCoins () =
    async {
        let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true"
        let! (statusCode, responseText) = Http.get url
        if statusCode = 200 then
            match Decode.fromString decoderList responseText with
            | Ok coins -> return Some coins
            | Error err -> printfn "Decode error: %s" err; return None
        else
            printfn "HTTP error: %d" statusCode
            return None
    }
