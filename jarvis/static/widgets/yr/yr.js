var yr = yr || {};

yr.formatWind = function (wind) {
  if (wind === null) {
    return "";
  }
  return wind.description + " (" + wind.speed + " m/s) fra " + wind.direction;
};

yr.formatTemperature = function (temperature) {
  if (temperature === null) {
    temperature = "-";
  }
  return temperature + "°";
};

yr.formatDescription = (description) => {
  if (description === null) description = "-";
  src = `/static/widgets/yr/weather_icons/png/` + description + `.png`;
  return src;
};

yr.view = function (vnode) {
  if (Object.keys(vnode.attrs.data).length === 0) {
    return m("p", "Waiting for data");
  }
  var state = vnode.attrs.data;
  return [
    m("p.fade", "Været i " + state.today.location),
    m("h1", yr.formatTemperature(state.today.temperature)),
    m("img", {
      src: yr.formatDescription(state.today.description),
      alt: state.today.description,
      width: "50",
    }),
    m("p.wind", yr.formatWind(state.today.wind)),
    m(
      "p.tomorrow",
      "I morgen: " + yr.formatTemperature(state.tomorrow.temperature),
      m("img.tomorrow", {
        src: yr.formatDescription(state.tomorrow.description),
        alt: "-",
      })
    ),
    m("p", { class: "fade updated-at" }, "Sist oppdatert: " + state.updatedAt),
  ];
};
