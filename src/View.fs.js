import { useFeliz_React__React_useState_Static_1505, React_functionComponent_Z336EF691 } from "./fable_modules/Feliz.2.4.0/React.fs.js";
import { createElement } from "react";
import { int32ToString, comparePrimitives, equals, createObj } from "./fable_modules/fable-library-js.4.24.0/Util.js";
import { empty, collect, map as map_1, singleton, append, delay, toList } from "./fable_modules/fable-library-js.4.24.0/Seq.js";
import { skip, truncate, reverse, sortBy, max, min, length, mapIndexed, filter, map, append as append_1, ofArray, singleton as singleton_1 } from "./fable_modules/fable-library-js.4.24.0/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.4.0/./Interop.fs.js";
import { fromSeconds } from "./fable_modules/fable-library-js.4.24.0/TimeSpan.js";
import { Msg } from "./Update.fs.js";
import { printf, toText, join } from "./fable_modules/fable-library-js.4.24.0/String.js";
import { toString } from "./fable_modules/fable-library-js.4.24.0/Types.js";
import { rangeDouble } from "./fable_modules/fable-library-js.4.24.0/Range.js";
import { SortBy } from "./Model.fs.js";
import { FSharpSet__get_Count, FSharpSet__Contains } from "./fable_modules/fable-library-js.4.24.0/Set.js";

export const tooltipContent = React_functionComponent_Z336EF691((coin) => {
    let elems_2;
    const qtyState = useFeliz_React__React_useState_Static_1505(1);
    const setQuantity = qtyState[1];
    const quantity = qtyState[0];
    const currentValue = quantity * coin.current_price;
    return createElement("div", createObj(ofArray([["style", {
        padding: 10,
        backgroundColor: "#FFFFFF",
        border: (((1 + "px ") + "solid") + " ") + "#D3D3D3",
        borderRadius: 5,
        "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.1)",
        width: 250,
    }], (elems_2 = toList(delay(() => append(singleton(createElement("h4", {
        children: coin.name,
    })), delay(() => {
        let children_4, children, children_2;
        return append(singleton((children_4 = ofArray([(children = singleton_1(createElement("a", {
            href: `https://www.binance.com/en/trade/${coin.symbol}_USDT`,
            target: "_blank",
            children: "Buy on Binance",
        })), createElement("li", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        })), (children_2 = singleton_1(createElement("a", {
            href: `https://www.coinbase.com/price/${coin.id}`,
            target: "_blank",
            children: "Buy on Coinbase",
        })), createElement("li", {
            children: Interop_reactApi.Children.toArray(Array.from(children_2)),
        }))]), createElement("ul", {
            children: Interop_reactApi.Children.toArray(Array.from(children_4)),
        }))), delay(() => append(singleton(createElement("hr", {})), delay(() => {
            let elms_1, elms, value_30;
            return append(singleton((elms_1 = ofArray([createElement("label", {
                className: "label",
                children: "Amount",
            }), (elms = singleton_1(createElement("input", createObj(ofArray([["className", "input"], ["type", "number"], (value_30 = quantity, ["ref", (e) => {
                if (!(e == null) && !equals(e.value, value_30)) {
                    e.value = value_30;
                }
            }]), ["min", 0], ["onChange", (ev) => {
                const value_34 = ev.target.valueAsNumber;
                if (!(value_34 == null) && !Number.isNaN(value_34)) {
                    const v = value_34;
                    if (v >= 0) {
                        setQuantity(v);
                    }
                }
            }]])))), createElement("div", {
                className: "control",
                children: Interop_reactApi.Children.toArray(Array.from(elms)),
            }))]), createElement("div", {
                className: "field",
                children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
            }))), delay(() => append(singleton(createElement("p", {
                children: "Current value: $" + String(currentValue),
            })), delay(() => {
                const matchValue = coin.price_change_percentage_24h;
                if (matchValue == null) {
                    return singleton(createElement("p", {
                        children: "24h Change: N/A",
                    }));
                }
                else {
                    const change = matchValue;
                    const formatted = String(change);
                    return singleton(createElement("p", {
                        children: `24h Change: ${formatted}%`,
                    }));
                }
            }))));
        }))));
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
});

export const skeletonCard = createElement("div", {
    style: {
        width: 220,
        height: 260,
        backgroundColor: "#eee",
        borderRadius: 10,
        margin: 10,
        animationName: "pulse",
        animationDuration: fromSeconds(1.5) + "ms",
        animationIterationCount: "infinite",
    },
});

export function coinCard(coin, dispatch, isSelected) {
    let elems_6, elems_4, elms_2, elms, elms_1, xs_2, elements, children_3, elems_5;
    const cardClass = isSelected ? "box has-background-info-light has-border" : "box has-border";
    return createElement("div", createObj(ofArray([["className", "tooltip-container"], ["onClick", (_arg) => {
        dispatch(new Msg(6, [coin.id]));
    }], ["style", {
        cursor: "pointer",
        width: 220,
        height: 260,
        display: "inline-block",
        position: "relative",
        padding: 10,
    }], (elems_6 = [createElement("div", createObj(ofArray([["className", cardClass], ["style", {
        height: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }], (elems_4 = [(elms_2 = ofArray([(elms = singleton_1(createElement("img", {
        src: coin.image,
        style: {
            width: 48,
            height: 48,
        },
    })), createElement("div", {
        className: "media-left",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_1 = singleton_1((xs_2 = singleton_1(["children", coin.symbol.toLocaleUpperCase()]), createElement("p", createObj(toList(delay(() => append(xs_2, delay(() => singleton(["className", join(" ", append_1(singleton_1("title"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_33) => value_33, xs_2)))))]))))))))), createElement("div", {
        className: "media-content",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))]), createElement("article", {
        className: "media",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })), createElement("svg", createObj(ofArray([["viewBox", (((((0 + " ") + 0) + " ") + 100) + " ") + 30], ["width", 100], ["height", 30], (elements = singleton_1(createElement("polyline", {
        fill: "none",
        stroke: "blue",
        strokeWidth: 2,
        points: join(" ", mapIndexed((i, v_1) => {
            const x_1 = (i / (length(coin.sparkline_in_7d.price) - 1)) * 100;
            const minY_1 = min(coin.sparkline_in_7d.price, {
                Compare: comparePrimitives,
            });
            const maxY = max(coin.sparkline_in_7d.price, {
                Compare: comparePrimitives,
            });
            const y_2 = (maxY === minY_1) ? 15 : (30 - (((v_1 - minY_1) / (maxY - minY_1)) * 30));
            return toText(printf("%0.1f,%0.1f"))(x_1)(y_2);
        }, coin.sparkline_in_7d.price)),
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elements))])]))), (children_3 = toList(delay(() => append(singleton(createElement("p", {
        children: `Price: $${coin.current_price}`,
    })), delay(() => {
        const matchValue = coin.price_change_percentage_24h;
        if (matchValue == null) {
            return singleton(createElement("p", {
                children: "24h Change: N/A",
            }));
        }
        else {
            const change = matchValue;
            const formatted = String(change);
            return singleton(createElement("p", {
                children: `24h Change: ${formatted}%`,
            }));
        }
    })))), createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_3)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]))), createElement("div", createObj(ofArray([["className", "tooltip-box"], ["style", {
        position: "absolute",
        top: 0 + "%",
        left: 105 + "%",
        zIndex: 100,
        backgroundColor: "#FFFFFF",
    }], (elems_5 = [tooltipContent(coin)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_6))])])));
}

export function pagination(totalPages, currentPage, dispatch) {
    let elems_1, elems;
    return createElement("nav", createObj(ofArray([["className", "pagination is-centered"], (elems_1 = [createElement("ul", createObj(ofArray([["className", "pagination-list"], (elems = toList(delay(() => map_1((i) => {
        const children = singleton_1(createElement("a", {
            className: (i === currentPage) ? "pagination-link is-current" : "pagination-link",
            children: int32ToString(i + 1),
            onClick: (_arg) => {
                dispatch(new Msg(8, [i]));
            },
        }));
        return createElement("li", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }, rangeDouble(0, 1, totalPages - 1)))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

export function view(model, dispatch) {
    let elems_13;
    let filteredCoins;
    const lst = filter((c) => (c.name.toLocaleLowerCase().indexOf(model.SearchText.toLocaleLowerCase()) >= 0), model.Coins);
    let sorted;
    const matchValue = model.SortBy;
    sorted = ((matchValue.tag === 1) ? ((list_2) => sortBy((c_2) => c_2.current_price, list_2, {
        Compare: comparePrimitives,
    })) : ((matchValue.tag === 2) ? ((list_3) => sortBy((c_3) => c_3.market_cap, list_3, {
        Compare: comparePrimitives,
    })) : ((list_1) => sortBy((c_1) => c_1.name, list_1, {
        Compare: comparePrimitives,
    }))));
    filteredCoins = ((model.SortDirection.tag === 1) ? reverse(sorted(lst)) : sorted(lst));
    const start = (model.Page * model.ItemsPerPage) | 0;
    const pageCoins = truncate(model.ItemsPerPage, skip(start, filteredCoins));
    const totalPages = ~~(((length(filteredCoins) + model.ItemsPerPage) - 1) / model.ItemsPerPage) | 0;
    return createElement("div", createObj(ofArray([["className", "container"], (elems_13 = toList(delay(() => {
        let elems, xs_1;
        return append(singleton(createElement("div", createObj(ofArray([["style", {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
        }], (elems = [createElement("img", {
            src: "/favicon.png",
            style: {
                width: 40,
                height: 40,
                marginRight: 10,
            },
        }), (xs_1 = ofArray([["style", {
            cursor: "pointer",
        }], ["onClick", (_arg) => {
            dispatch(new Msg(8, [0]));
        }], ["children", "MarketCapF#"]]), createElement("h2", createObj(toList(delay(() => append(xs_1, delay(() => singleton(["className", join(" ", append_1(singleton_1("title"), map((arg) => toString(arg[1]), filter((tupledArg) => {
            const v = tupledArg[0];
            return v === "className";
        }, map((value_22) => value_22, xs_1)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))), delay(() => {
            let elms_1, elms;
            return append(singleton((elms_1 = singleton_1((elms = singleton_1(createElement("input", {
                className: "input",
                placeholder: "Search...",
                value: model.SearchText,
                onChange: (ev) => {
                    dispatch(new Msg(1, [ev.target.value]));
                },
            })), createElement("div", {
                className: "control",
                children: Interop_reactApi.Children.toArray(Array.from(elms)),
            }))), createElement("div", {
                className: "field",
                children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
            }))), delay(() => {
                let xs_20, elems_7, elms_2, elems_4, elems_3, elms_3, xs_15;
                return append(singleton((xs_20 = ofArray([["className", "has-addons"], (elems_7 = [(elms_2 = singleton_1(createElement("div", createObj(ofArray([["className", "select"], (elems_4 = [createElement("select", createObj(ofArray([["value", toString(model.SortBy)], ["onChange", (ev_1) => {
                    const v_2 = ev_1.target.value;
                    switch (v_2) {
                        case "Name": {
                            dispatch(new Msg(2, [new SortBy(0, [])]));
                            break;
                        }
                        case "Price": {
                            dispatch(new Msg(2, [new SortBy(1, [])]));
                            break;
                        }
                        default:
                            dispatch(new Msg(2, [new SortBy(2, [])]));
                    }
                }], (elems_3 = [createElement("option", {
                    value: "MarketCap",
                    children: "By Market Cap",
                }), createElement("option", {
                    value: "Name",
                    children: "By Name",
                }), createElement("option", {
                    value: "Price",
                    children: "By Price",
                })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])])))), createElement("div", {
                    className: "control",
                    children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
                })), (elms_3 = singleton_1((xs_15 = ofArray([["children", (model.SortDirection.tag === 1) ? "↓ Desc" : "↑ Asc"], ["onClick", (_arg_2) => {
                    dispatch(new Msg(3, []));
                }]]), createElement("button", createObj(toList(delay(() => append(xs_15, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
                    const v_3 = tupledArg_1[0];
                    return v_3 === "className";
                }, map((value_65) => value_65, xs_15)))))]))))))))), createElement("div", {
                    className: "control",
                    children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
                }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]), createElement("div", createObj(toList(delay(() => append(xs_20, delay(() => singleton(["className", join(" ", append_1(singleton_1("field"), map((arg_2) => toString(arg_2[1]), filter((tupledArg_2) => {
                    const v_4 = tupledArg_2[0];
                    return v_4 === "className";
                }, map((value_71) => value_71, xs_20)))))]))))))))), delay(() => {
                    let elems_8;
                    return append(singleton(createElement("div", createObj(ofArray([["style", {
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 20 + "px ",
                    }], (elems_8 = toList(delay(() => (model.IsLoading ? collect((matchValue_3) => singleton(skeletonCard), rangeDouble(1, 1, model.ItemsPerPage)) : map_1((coin) => coinCard(coin, dispatch, FSharpSet__Contains(model.SelectedCoins, coin.id)), pageCoins)))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_8))])])))), delay(() => {
                        let elms_5, elms_4, xs_25, xs_29;
                        return append(singleton((elms_5 = singleton_1((elms_4 = ofArray([(xs_25 = ofArray([["children", "◀ Prev"], ["disabled", model.Page === 0], ["onClick", (_arg_5) => {
                            dispatch(new Msg(4, []));
                        }]]), createElement("button", createObj(toList(delay(() => append(xs_25, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_3) => toString(arg_3[1]), filter((tupledArg_3) => {
                            const v_5 = tupledArg_3[0];
                            return v_5 === "className";
                        }, map((value_84) => value_84, xs_25)))))])))))))), (xs_29 = ofArray([["children", "Next ▶"], ["disabled", ((model.Page + 1) * model.ItemsPerPage) >= length(filteredCoins)], ["onClick", (_arg_7) => {
                            dispatch(new Msg(5, []));
                        }]]), createElement("button", createObj(toList(delay(() => append(xs_29, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_4) => toString(arg_4[1]), filter((tupledArg_4) => {
                            const v_6 = tupledArg_4[0];
                            return v_6 === "className";
                        }, map((value_91) => value_91, xs_29)))))]))))))))]), createElement("div", {
                            className: "buttons",
                            children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
                        }))), createElement("div", {
                            className: "field",
                            children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
                        }))), delay(() => append(singleton(pagination(totalPages, model.Page, dispatch)), delay(() => {
                            let elems_12, xs_35, elems_11, xs_40;
                            return (FSharpSet__get_Count(model.SelectedCoins) >= 2) ? singleton(createElement("div", createObj(ofArray([["style", {
                                position: "sticky",
                                bottom: 0,
                                backgroundColor: "#FFFFFF",
                                "box-shadow": "0 -2px 10px rgba(0, 0, 0, 0.1)",
                                padding: 20,
                                marginTop: 40,
                                overflowX: "auto",
                            }], (elems_12 = [(xs_35 = singleton_1(["children", "Comparison"]), createElement("h4", createObj(toList(delay(() => append(xs_35, delay(() => singleton(["className", join(" ", append_1(singleton_1("title"), map((arg_5) => toString(arg_5[1]), filter((tupledArg_5) => {
                                const v_7 = tupledArg_5[0];
                                return v_7 === "className";
                            }, map((value_113) => value_113, xs_35)))))])))))))), createElement("div", createObj(ofArray([["style", {
                                display: "flex",
                                gap: 20 + "px ",
                                justifyContent: "center",
                            }], (elems_11 = toList(delay(() => collect((coin_1) => (FSharpSet__Contains(model.SelectedCoins, coin_1.id) ? singleton(coinCard(coin_1, dispatch, true)) : empty()), filteredCoins))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_11))])]))), (xs_40 = ofArray([["className", "is-danger"], ["children", "Clear Selection"], ["onClick", (_arg_10) => {
                                dispatch(new Msg(7, []));
                            }]]), createElement("button", createObj(toList(delay(() => append(xs_40, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_6) => toString(arg_6[1]), filter((tupledArg_6) => {
                                const v_8 = tupledArg_6[0];
                                return v_8 === "className";
                            }, map((value_125) => value_125, xs_40)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_12))])])))) : empty();
                        }))));
                    }));
                }));
            }));
        }));
    })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_13))])])));
}

