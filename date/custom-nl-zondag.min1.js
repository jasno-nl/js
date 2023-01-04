function dataPickZondag() {
    for (var e = zondagen.length - 1; 0 <= e; e--)(new Date).getTime() >= zondagen[e] && zondagen.splice(e, 1);
    for (e = 0; e < zondagen.length - 1; e++) null !== $("[data-pick=" + zondagen[e] + "]") && ($("[data-pick=" + zondagen[e] + "]").addClass("pickadate--zondag"), $("[data-pick=" + zondagen[e] + "]").attr("title", "JASNO Sundates"), $("[data-pick=" + zondagen[e] + "]").removeClass("picker__day--disabled"));
    zondagen.sort(), null !== $("[data-pick=" + zondagen[0] + "]") ? $("#zondag").attr("data-pick", zondagen[0]) : $("button").remove(".picker__button--zondag")
}
var zondagen = [new Date(2016, 1, 21, 0, 0, 0, 0).getTime(), new Date(2016, 3, 3, 0, 0, 0, 0).getTime(), new Date(2016, 4, 16, 0, 0, 0, 0).getTime(), new Date(2016, 5, 26, 0, 0, 0, 0).getTime(), new Date(2016, 8, 11, 0, 0, 0, 0).getTime(), new Date(2016, 10, 6, 0, 0, 0, 0).getTime(), new Date(2016, 11, 18, 0, 0, 0, 0).getTime(), new Date(2017, 0, 29, 0, 0, 0, 0).getTime(), new Date(2017, 2, 12, 0, 0, 0, 0).getTime(), new Date(2017, 3, 23, 0, 0, 0, 0).getTime(), new Date(2017, 5, 5, 0, 0, 0, 0).getTime(), new Date(2017, 8, 3, 0, 0, 0, 0).getTime(), new Date(2017, 9, 15, 0, 0, 0, 0).getTime(), new Date(2017, 10, 26, 0, 0, 0, 0).getTime(), new Date(2018, 0, 28, 0, 0, 0, 0).getTime(), new Date(2018, 2, 18, 0, 0, 0, 0).getTime(), new Date(2018, 4, 27, 0, 0, 0, 0).getTime(), new Date(2018, 8, 2, 0, 0, 0, 0).getTime(), new Date(2018, 9, 14, 0, 0, 0, 0).getTime(), new Date(2018, 10, 25, 0, 0, 0, 0).getTime(), new Date(2019, 0, 27, 0, 0, 0, 0).getTime(), new Date(2019, 2, 17, 0, 0, 0, 0).getTime(), new Date(2019, 4, 26, 0, 0, 0, 0).getTime(), new Date(2019, 8, 1, 0, 0, 0, 0).getTime(), new Date(2019, 9, 13, 0, 0, 0, 0).getTime(), new Date(2019, 10, 24, 0, 0, 0, 0).getTime(), new Date(2020, 0, 12, 0, 0, 0, 0).getTime(), new Date(2020, 1, 16, 0, 0, 0, 0).getTime(), new Date(2020, 2, 22, 0, 0, 0, 0).getTime(), new Date(2020, 5, 1, 0, 0, 0, 0).getTime(), new Date(2020, 5, 28, 0, 0, 0, 0).getTime(), new Date(2020, 6, 5, 0, 0, 0, 0).getTime(), new Date(2020, 6, 26, 0, 0, 0, 0).getTime(), new Date(2020, 8, 6, 0, 0, 0, 0).getTime(), new Date(2020, 9, 4, 0, 0, 0, 0).getTime(), new Date(2020, 9, 11, 0, 0, 0, 0).getTime(), new Date(2020, 9, 18, 0, 0, 0, 0).getTime(), new Date(2020, 9, 25, 0, 0, 0, 0).getTime(), new Date(2020, 10, 29, 0, 0, 0, 0).getTime(), new Date(2021, 2, 14, 0, 0, 0, 0).getTime(), new Date(2021, 2, 28, 0, 0, 0, 0).getTime(), new Date(2021, 3, 11, 0, 0, 0, 0).getTime(), new Date(2021, 4, 30, 0, 0, 0, 0).getTime(), new Date(2021, 5, 27, 0, 0, 0, 0).getTime(), new Date(2021, 8, 19, 0, 0, 0, 0).getTime(), new Date(2021, 9, 24, 0, 0, 0, 0).getTime(), new Date(2021, 10, 21, 0, 0, 0, 0).getTime(), new Date(2021, 11, 12, 0, 0, 0, 0).getTime(), new Date(2022, 5, 12, 0, 0, 0, 0).getTime()],
    textButton = "JASNO sundates",
    zondag = "",
    format = "yyyy-dd-mm",
    appendButton = '<button id="zondag" class="picker__button--zondag" type="button">' + textButton + "</button>",
    datepicker = $("input[placeholder='Ik bezoek JASNO op*']").pickadate({
        firstDay: 1,
        min: new Date,
        max: 45,
        hiddenName: !0,
        closeOnClear: !1,
        disable: [!0, 1, 2, 3, 4, 5, 6, [2016, 1, 21],
            [2016, 3, 3],
            [2016, 3, 27, "inverted"],
            [2016, 4, 5, "inverted"],
            [2016, 4, 16],
            [2016, 5, 26],
            [2016, 8, 11],
            [2016, 10, 6],
            [2016, 11, 18],
            [2016, 11, 25, "inverted"],
            [2016, 11, 26, "inverted"],
            [2017, 0, 29],
            [2017, 2, 12],
            [2017, 3, 23],
            [2017, 8, 3],
            [2017, 9, 15],
            [2017, 10, 26],
            [2017, 11, 25, "inverted"],
            [2017, 11, 26, "inverted"],
            [2018, 0, 28],
            [2018, 2, 18],
            [2018, 4, 27],
            [2018, 2, 8],
            [2018, 9, 14],
            [2018, 10, 25],
            [2019, 0, 27],
            [2019, 2, 17],
            [2019, 4, 26],
            [2019, 8, 1],
            [2019, 9, 13],
            [2019, 10, 24],
            [2019, 11, 25, "inverted"],
            [2019, 11, 26, "inverted"],
            [2019, 11, 27, "inverted"],
            [2020, 0, 1, "inverted"],
            [2020, 0, 12],
            [2020, 1, 16],
            [2020, 2, 22],
            [2020, 5, 1],
            [2020, 5, 28],
            [2020, 6, 5],
            [2020, 6, 26],
            [2020, 8, 6],
            [2020, 9, 4],
            [2020, 9, 11],
            [2020, 9, 18],
            [2020, 9, 25],
            [2020, 10, 29],
            [2020, 11, 13],
            [2020, 11, 26, "inverted"],
            [2020, 11, 27, "inverted"],
            [2021, 0, 1, "inverted"],
            [2021, 2, 14],
            [2021, 2, 28],
            [2021, 3, 11],
            [2021, 3, 27, "inverted"],
            [2021, 4, 13, "inverted"],
            [2021, 4, 24, "inverted"],
            [2021, 4, 30],
            [2021, 5, 27],
            [2021, 8, 19],
            [2021, 9, 24],
            [2021, 10, 21],
            [2021, 11, 12],
            [2021, 11, 25, "inverted"],
            [2022, 0, 1, "inverted"],
            [2022, 5, 12],  
            [2022, 7, 6, "inverted"],  
            [2022, 7, 13, "inverted"],  
            [2022, 7, 20, "inverted"],  
            [2022, 7, 27, "inverted"]    
        ],
        onRender: function () {
            nu = (new Date).getTime(), teLaat = (new Date).setHours(0, 0, 0, 0) + 567e5, $(".picker__buttons").append(appendButton), dataPickZondag(), $(".picker__button--clear").click((function () {
                tpicker.clear()
            })), nu > teLaat && $("button").remove(".picker__button--today")
        }
    }),
    dpicker = datepicker.pickadate("picker"),
    timepicker = $("input[placeholder='Ik kom dan graag langs om*']").pickatime({
        format: "HH:i uur",
        formatSubmit: "HH:i",
        hiddenName: !0,
        min: [9, 0],
        max: [16, 30]
    }),
    tpicker = timepicker.pickatime("picker");
void 0 !== dpicker && dpicker.on("open", (function (e) {
    e = (new Date).getTime();
    var t = (new Date).setHours(0, 0, 0, 0) + 567e5;
    $(".picker__button--clear").click((function () {
        tpicker.clear()
    })), document.getElementById("zondag") && dataPickZondag(), e > t && (dpicker.set("min", 1), $("picker__button--today").addClass("picker__day--outfocus picker__day--disabled"), $("[data-pick=" + (new Date).setHours(0, 0, 0, 0) + "]").removeClass("picker__day--selected picker__day--highlighted"), $("button").remove(".picker__button--today"))
})), void 0 !== dpicker && dpicker.on("set", (function (e) {
    if (e.select && -1 != zondagen.indexOf(this.get("select").pick)) $("input[data-name='Eventtype']").val("JASNO Sundates"), $("input[data-name='Evenement']").val("Ja"), tpicker.clear(), tpicker.set("enable", !0), tpicker.set({
        interval: 30,
        min: [11, 0],
        max: [15, 0]
    }), tpicker.on("open", (function (e) {
        $("p").remove(".text-center")
    })), setTimeout(tpicker.open, 0);
    else if (new Date(e.select).getDay() && 4 === new Date(this.get("select").pick).getDay()) $("input[data-name='Eventtype']").val("Showroombezoek"), $("input[data-name='Evenement']").val("Ja"), tpicker.clear(), tpicker.set("enable", !0), tpicker.set({
        interval: 30,
        min: [9, 0],
        max: [16, 30]
    }), tpicker.on("open", (function (e) {
        $("p").remove(".text-center")
    })), setTimeout(tpicker.open, 0);
    else if (new Date(e.select).getDay() && 6 === new Date(this.get("select").pick).getDay()) $("input[data-name='Eventtype']").val("Showroombezoek"), $("input[data-name='Evenement']").val("Ja"), tpicker.clear(), tpicker.set("enable", !0), tpicker.set({
        interval: 30,
        min: [10, 0],
        max: [14, 30]
    }), tpicker.on("open", (function (e) {
        $("p").remove(".text-center")
    })), setTimeout(tpicker.open, 0);
    else if (e.select && this.get("select").pick !== (new Date).setHours(0, 0, 0, 0)) $("input[data-name='Eventtype']").val("Showroombezoek"), $("input[data-name='Evenement']").val("Ja"), tpicker.clear(), tpicker.set("enable", !0), tpicker.set({
        interval: 30,
        min: [9, 0],
        max: [16, 30]
    }), tpicker.on("open", (function (e) {
        $("p").remove(".text-center")
    })), setTimeout(tpicker.open, 0);
    else if (e.select && this.get("select").pick === (new Date).setHours(0, 0, 0, 0)) {
        e = (new Date).getTime() + 27e5;
        var t = new Date(e);
        e = t.getHours(), t = 30 * Math.ceil(t.getMinutes() / 30), $("input[data-name='Eventtype']").val("Showroombezoek"), $("input[data-name='Evenement']").val("Ja"), tpicker.clear(), tpicker.set("enable", !0), tpicker.set({
            interval: 30,
            min: [e, t],
            max: [16, 30]
        }), tpicker.on("open", (function (e) {
            $("p").remove(".text-center")
        })), setTimeout(tpicker.open, 0)
    }
}));
