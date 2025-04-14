module Update

open Model
open Elmish
open Fable.SimpleHttp
open Thoth.Json
open Api  // ✅ подключаем правильный модуль, где теперь лежит decoderList

type Msg =
    | GotCoins of Result<Coin list, string>
    | SetSearchText of string
    | SetSortBy of SortBy
    | ToggleSortDirection
    | PrevPage
    | NextPage
    | ToggleCoinSelection of string
    | ClearSelection
    | SetPage of int

let apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h"

let fetchCoins () =
    async {
        do! Async.Sleep 900

        let! (statusCode, responseText) = Http.get apiUrl
        if statusCode = 200 then
            match Decode.fromString decoderList responseText with
            | Ok coins -> return GotCoins (Ok coins)
            | Error err -> return GotCoins (Error $"Decoding error: {err}")
        else
            return GotCoins (Error $"HTTP error: {statusCode}")
    }


let update (msg: Msg) (model: Model) : Model * Cmd<Msg> =
    match msg with
    | GotCoins (Ok coins) ->
        { model with Coins = coins; IsLoading = false }, Cmd.none

    | GotCoins (Error err) ->
        Browser.Dom.console.error("Failed to load coins:", err)
        { model with IsLoading = false }, Cmd.none

    | SetSearchText text ->
        { model with SearchText = text; Page = 0; IsLoading = true }, Cmd.OfAsync.perform fetchCoins () id

    | SetSortBy sortBy ->
        { model with SortBy = sortBy }, Cmd.none

    | ToggleSortDirection ->
        let newDir =
            match model.SortDirection with
            | Ascending -> Descending
            | Descending -> Ascending
        { model with SortDirection = newDir }, Cmd.none

    | PrevPage ->
        if model.Page > 0 then
            { model with Page = model.Page - 1 }, Cmd.none
        else
            model, Cmd.none

    | NextPage ->
        { model with Page = model.Page + 1 }, Cmd.none

    | SetPage page ->
        { model with Page = page }, Cmd.none

    | ToggleCoinSelection id ->
        let selected =
            if model.SelectedCoins.Contains id then
                model.SelectedCoins.Remove id
            else
                model.SelectedCoins.Add id
        { model with SelectedCoins = selected }, Cmd.none

    | ClearSelection ->
        { model with SelectedCoins = Set.empty }, Cmd.none

