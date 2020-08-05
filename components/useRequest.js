import { useEffect, useState, useCallback } from "react";
import useInterval from "@use-it/interval";

/* Custom hook to fetch data */
const useRequest = (promise, options, interval = null) => {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  // fetch weather
  const request = useCallback(
    async (options) => {
      let data;

      try {
        data = await promise(options);
        setState({ status: "complete", data, error: null });
      } catch (error) {
        setState({ status: "error", error, data: null });
      }
    },
    [promise]
  );

  // use-deep-compare-effect package can be used
  // run the this effect whenever options are changed.
  // we are using useMemo() in today.js to not to run
  // indefinitely.
  useEffect(() => {
    request(options);
  }, [request, options]);

  useInterval(() => {
    request(options);
  }, interval);

  return state;
};

export default useRequest;
