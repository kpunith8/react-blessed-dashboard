import useInterval from "@use-it/interval";
import figlet from "figlet";
import React, { useState, useMemo } from "react";
import useRequest from "./useRequest";
import util from "util";
import weather from "weather-js";

const findWeather = util.promisify(weather.find);

const formatWeather = ([results]) => {
  const { location, current, forecast } = results;
  const degreeType = location.degreetype;
  const temperature = `${current.temperature}˚${degreeType}`;
  const conditions = current.skytext;
  const low = `${forecast[1].low}˚${degreeType}`;
  const high = `${forecast[1].high}˚${degreeType}`;

  return `${temperature} and ${conditions} (${low} → ${high})`;
};

const Today = ({
  updateInterval = 1000 * 15 * 60,
  search = "Bengaluru, IN",
  degreeType = "C",
}) => {
  const [now, setNow] = useState(new Date());
  const options = useMemo(() => ({ search, degreeType }), [search, degreeType]);
  const weather = useRequest(findWeather, options, updateInterval);

  // It re-renders the component every minute so that the date and time updates
  // use timeRef and useEffect if you don't want to use useInterval
  // from @use-it/interval
  // const timerRef = useRef(null);
  // useEffect(() => {
  //   timerRef.current = setTimeout(() => setFontIndex(fontIndex + 1), 1000);
  //   return () => clearTimeout(timerRef.current);
  // }, [fontIndex]);
  useInterval(() => {
    setNow(new Date());
  }, 1000 * 60);

  const date = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = figlet.textSync(
    now.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    { font: "Straight" }
  );

  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: "line" }}
      style={{ border: { fg: "blue" } }}
    >
      {`${date}
${time}
${
  weather.status === "loading"
    ? "Loading…"
    : weather.error
    ? `Error ${weather.error}`
    : formatWeather(weather.data)
}`}
    </box>
  );
};

export default Today;
