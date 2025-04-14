module View

open Feliz
open Feliz.Bulma
open Model
open Update
open System.Globalization

let tooltipContent =
    React.functionComponent (fun (coin: Coin) ->
        let qtyState = React.useState(1.0)
        let quantity, setQuantity = qtyState

        let currentValue = quantity * coin.current_price

        Html.div [
            prop.style [
                style.padding 10
                style.backgroundColor.white
                style.border (1, borderStyle.solid, color.lightGray)
                style.borderRadius 5
                style.custom ("box-shadow", "0 2px 10px rgba(0, 0, 0, 0.1)")
                style.width 250
            ]
            prop.children [
                Html.h4 [ prop.text coin.name ]
                Html.ul [
                    Html.li [
                        Html.a [
                            prop.href $"https://www.binance.com/en/trade/{coin.symbol}_USDT"
                            prop.target "_blank"
                            prop.text "Buy on Binance"
                        ]
                    ]
                    Html.li [
                        Html.a [
                            prop.href $"https://www.coinbase.com/price/{coin.id}"
                            prop.target "_blank"
                            prop.text "Buy on Coinbase"
                        ]
                    ]
                ]
                Html.hr []
                Bulma.field.div [
                    Bulma.label "Amount"
                    Bulma.control.div [
                        Html.input [
                            prop.className "input"
                            prop.type'.number
                            prop.valueOrDefault quantity
                            prop.min 0
                            prop.onChange (fun (v: float) ->
                                if v >= 0.0 then setQuantity v)
                        ]
                    ]
                ]
                Html.p [ prop.text ($"Current value: $" + currentValue.ToString("F2", CultureInfo.InvariantCulture)) ]
                match coin.price_change_percentage_24h with
                | Some change ->
                    let formatted = change.ToString("+#0.00;-#0.00", CultureInfo.InvariantCulture)
                    Html.p [ prop.text $"24h Change: {formatted}%%" ]
                | None ->
                    Html.p [ prop.text "24h Change: N/A" ]
            ]
        ]
    )

let skeletonCard =
    Html.div [
        prop.style [
            style.width 220
            style.height 260
            style.backgroundColor "#eee"
            style.borderRadius 10
            style.margin 10
            style.animationName "pulse"
            style.animationDuration (System.TimeSpan.FromSeconds 1.5)
            style.animationIterationCount.infinite
        ]
    ]

let coinCard (coin: Coin) (dispatch: Msg -> unit) (isSelected: bool) =
    let cardClass =
        if isSelected then "box has-background-info-light has-border"
        else "box has-border"

    Html.div [
        prop.className "tooltip-container"
        prop.onClick (fun _ -> dispatch (ToggleCoinSelection coin.id))
        prop.style [
            style.cursor.pointer
            style.width 220
            style.height 260
            style.display.inlineBlock
            style.position.relative
            style.padding 10
        ]
        prop.children [
            Html.div [
                prop.className cardClass
                prop.style [
                    style.height 240
                    style.display.flex
                    style.flexDirection.column
                    style.justifyContent.spaceBetween
                ]
                prop.children [
                    Bulma.media [
                        Bulma.mediaLeft [
                            Html.img [
                                prop.src coin.image
                                prop.style [ style.width 48; style.height 48 ]
                            ]
                        ]
                        Bulma.mediaContent [
                            Bulma.title.p [ prop.text (coin.symbol.ToUpper()) ]
                        ]
                    ]
                    Svg.svg [
                        svg.viewBox (0, 0, 100, 30)
                        svg.width 100
                        svg.height 30
                        svg.children [
                            Svg.polyline [
                                svg.fill "none"
                                svg.stroke "blue"
                                svg.strokeWidth 2
                                svg.points (
                                    coin.sparkline_in_7d.price
                                    |> List.mapi (fun i v ->
                                        let x = float i / float (List.length coin.sparkline_in_7d.price - 1) * 100.0
                                        let minY = List.min coin.sparkline_in_7d.price
                                        let maxY = List.max coin.sparkline_in_7d.price
                                        let y =
                                            if maxY = minY then 15.0
                                            else 30.0 - ((v - minY) / (maxY - minY) * 30.0)
                                        sprintf "%0.1f,%0.1f" x y
                                    )
                                    |> String.concat " "
                                )
                            ]
                        ]
                    ]
                    Html.div [
                        Html.p [ prop.text $"Price: ${coin.current_price}" ]
                        match coin.price_change_percentage_24h with
                        | Some change ->
                            let formatted = change.ToString("F2", CultureInfo.InvariantCulture)
                            Html.p [ prop.text $"24h Change: {formatted}%%" ]
                        | None ->
                            Html.p [ prop.text "24h Change: N/A" ]
                    ]
                ]
            ]
            Html.div [
                prop.className "tooltip-box"
                prop.style [
                    style.position.absolute
                    style.top (length.percent 0)
                    style.left (length.percent 105)
                    style.zIndex 100
                    style.backgroundColor.white
                ]
                prop.children [ tooltipContent coin ]
            ]
        ]
    ]

let pagination totalPages currentPage dispatch =
    Html.nav [
        prop.className "pagination is-centered"
        prop.children [
            Html.ul [
                prop.className "pagination-list"
                prop.children [
                    for i in 0 .. totalPages - 1 ->
                        Html.li [
                            Html.a [
                                prop.className (
                                    if i = currentPage then "pagination-link is-current"
                                    else "pagination-link")
                                prop.text (string (i + 1))
                                prop.onClick (fun _ -> dispatch (SetPage i))
                            ]
                        ]
                ]
            ]
        ]
    ]

let view (model: Model) (dispatch: Msg -> unit) =
    let filteredCoins =
        model.Coins
        |> List.filter (fun c -> c.name.ToLower().Contains(model.SearchText.ToLower()))
        |> (fun lst ->
            let sorted =
                match model.SortBy with
                | SortBy.Name -> List.sortBy (fun c -> c.name)
                | SortBy.Price -> List.sortBy (fun c -> c.current_price)
                | SortBy.MarketCap -> List.sortBy (fun c -> c.market_cap)
            match model.SortDirection with
            | Ascending -> sorted lst
            | Descending -> sorted lst |> List.rev
        )

    let start = model.Page * model.ItemsPerPage
    let pageCoins =
        filteredCoins
        |> List.skip start
        |> List.truncate model.ItemsPerPage

    let totalPages = (filteredCoins.Length + model.ItemsPerPage - 1) / model.ItemsPerPage

    Html.div [
        prop.className "container"
        prop.children [
            Html.div [
                prop.style [
                    style.display.flex
                    style.justifyContent.flexEnd
                    style.alignItems.center
                    style.marginBottom 20
                ]
                prop.children [
                    Html.img [
                        prop.src "/favicon.png"
                        prop.style [ style.width 40; style.height 40; style.marginRight 10 ]
                    ]
                    Bulma.title.h2 [
    prop.style [ style.cursor.pointer ]
    prop.onClick (fun _ -> dispatch (SetPage 0))
    prop.text "MarketCapF#"
]
                ]
            ]

            Bulma.field.div [
                Bulma.control.div [
                    Html.input [
                        prop.className "input"
                        prop.placeholder "Search..."
                        prop.value model.SearchText
                        prop.onChange (fun (v: string) -> dispatch (SetSearchText v))
                    ]
                ]
            ]

            Bulma.field.div [
                Bulma.field.hasAddons
                prop.children [
                    Bulma.control.div [
                        Html.div [
                            prop.className "select"
                            prop.children [
                                Html.select [
                                    prop.value (string model.SortBy)
                                    prop.onChange (fun (v: string) ->
                                        match v with
                                        | "Name" -> dispatch (SetSortBy SortBy.Name)
                                        | "Price" -> dispatch (SetSortBy SortBy.Price)
                                        | _ -> dispatch (SetSortBy SortBy.MarketCap)
                                    )
                                    prop.children [
                                        Html.option [ prop.value "MarketCap"; prop.text "By Market Cap" ]
                                        Html.option [ prop.value "Name"; prop.text "By Name" ]
                                        Html.option [ prop.value "Price"; prop.text "By Price" ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                    Bulma.control.div [
                        Bulma.button.button [
                            prop.text (
                                match model.SortDirection with
                                | Ascending -> "↑ Asc"
                                | Descending -> "↓ Desc"
                            )
                            prop.onClick (fun _ -> dispatch ToggleSortDirection)
                        ]
                    ]
                ]
            ]

            Html.div [
                prop.style [
                    style.display.flex
                    style.flexWrap.wrap
                    style.justifyContent.center
                    style.gap 20
                ]
                prop.children [
                    if model.IsLoading then
                        for _ in 1 .. model.ItemsPerPage do
                            skeletonCard
                    else
                        for coin in pageCoins do
                            coinCard coin dispatch (model.SelectedCoins.Contains coin.id)
                ]
            ]

            Bulma.field.div [
                Bulma.buttons [
                    Bulma.button.button [
                        prop.text "◀ Prev"
                        prop.disabled (model.Page = 0)
                        prop.onClick (fun _ -> dispatch PrevPage)
                    ]
                    Bulma.button.button [
                        prop.text "Next ▶"
                        prop.disabled ((model.Page + 1) * model.ItemsPerPage >= filteredCoins.Length)
                        prop.onClick (fun _ -> dispatch NextPage)
                    ]
                ]
            ]

            pagination totalPages model.Page dispatch

            if model.SelectedCoins.Count >= 2 then
                Html.div [
                    prop.style [
                        style.position.sticky
                        style.bottom 0
                        style.backgroundColor.white
                        style.custom ("box-shadow", "0 -2px 10px rgba(0, 0, 0, 0.1)")
                        style.padding 20
                        style.marginTop 40
                        style.overflowX.auto
                    ]
                    prop.children [
                        Bulma.title.h4 [ prop.text "Comparison" ]
                        Html.div [
                            prop.style [
                                style.display.flex
                                style.gap 20
                                style.justifyContent.center
                            ]
                            prop.children [
                                for coin in filteredCoins do
                                    if model.SelectedCoins.Contains coin.id then
                                        coinCard coin dispatch true
                            ]
                        ]
                        Bulma.button.button [
                            color.isDanger
                            prop.text "Clear Selection"
                            prop.onClick (fun _ -> dispatch ClearSelection)
                        ]
                    ]
                ]
        ]
    ]
