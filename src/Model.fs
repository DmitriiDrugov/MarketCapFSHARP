module Model

open Thoth.Json

type Sparkline = {
    price: float list
}

type Coin = {
    id: string
    symbol: string
    name: string
    image: string
    current_price: float
    market_cap: float
    price_change_percentage_24h: float option
    sparkline_in_7d: Sparkline
}

module Coin =
    let decoder: Decoder<Coin> =
        Decode.object (fun get -> {
            id = get.Required.Field "id" Decode.string
            symbol = get.Required.Field "symbol" Decode.string
            name = get.Required.Field "name" Decode.string
            image = get.Required.Field "image" Decode.string
            current_price = get.Required.Field "current_price" Decode.float
            market_cap = get.Required.Field "market_cap" Decode.float
            price_change_percentage_24h = get.Optional.Field "price_change_percentage_24h" Decode.float
            sparkline_in_7d = get.Required.Field "sparkline_in_7d" (
                Decode.object (fun g -> {
                    price = g.Required.Field "price" (Decode.list Decode.float)
                })
            )
        })

    let decoderList: Decoder<Coin list> = Decode.list decoder

type SortBy =
    | Name
    | Price
    | MarketCap

type SortDirection =
    | Ascending
    | Descending

type Model = {
    Coins: Coin list
    SearchText: string
    SortBy: SortBy
    SortDirection: SortDirection
    Page: int
    ItemsPerPage: int
    SelectedCoins: Set<string>
    IsLoading: bool // <- добавлено
}

let initModel = {
    Coins = []
    SearchText = ""
    SortBy = MarketCap
    SortDirection = Descending
    Page = 0
    ItemsPerPage = 5
    SelectedCoins = Set.empty
    IsLoading = true
}