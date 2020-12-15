var yr2 = yr2 || {};

yr.formatWind = function (wind) {
  if (wind === null) {
    return "";
  }
  return wind.description + " (" + wind.speed + " m/s) fra " + wind.direction;
};

yr2.formatDescription = (description) => {
  if (description === null) description = "-";
  src = `/static/widgets/yr2/weather_icons/png/` + description + `.png`;
  return src;
};

yr2.view = function (vnode) {
  if (Object.keys(vnode.attrs.data).length === 0) {
    return m("p", "Waiting for data");
  }
  var state = vnode.attrs.data;
  table_week = state.week.forecast.map((forecast) => {
    return m("tr", [
      m("td", forecast[0]),
      m("td", forecast[1] + "°"),
      m(
        "td",
        m("img", { src: yr2.formatDescription(forecast[2].symbol_code) })
      ),
    ]);
  });
  table_today = state.today.next_hours.map((forecast) => {
    return m("tr", [
      m("td", forecast.time.substr(11, 5)),
      m("td", forecast.data.instant.details.air_temperature + "°"),
      m(
        "td",
        m("img", {
          src: yr2.formatDescription(
            forecast.data.next_1_hours.summary.symbol_code
          ),
        })
      ),
    ]);
  });
  return [
    m("p.fade", "Været i " + state.today.location),
    m(
      "header",
      m(
        "h1",
        state.today.temperature + "°    ",
        m("img.header", {
          src: yr2.formatDescription(state.today.description.symbol_code),
        })
      ),
      m("p.wind", yr.formatWind(state.today.wind))
    ),
    m(
      "table.wrap",
      m("td", m("table.today", table_today)),
      m("td", m("table.week", table_week))
    ),
    m("p", { class: "fade updated-at" }, "Sist oppdatert: " + state.updatedAt),
  ];
};
