var yr2 = yr2 || {};

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
  table = state.week.forecast.map((forecast) => {
    return m("tr", [
      m("td", forecast[0]),
      m("td", forecast[1] + "°"),
      m("td", m("img", { src: yr2.formatDescription(forecast[2]) })),
    ]);
  });
  return [
    m("p.fade", "Været i " + state.today.location),
    m("table", table),
    m("p", { class: "fade updated-at" }, "Sist oppdatert: " + state.updatedAt),
  ];
};
