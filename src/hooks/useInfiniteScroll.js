import { useEffect } from "react";
import _ from "lodash";

function useInfiniteScroll(query, fn) {
  useEffect(() => {
    const scrollBottom = _.throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        fn(query, true);
      }
    }, 500);

    window.addEventListener("scroll", scrollBottom);

    return () => {
      window.removeEventListener("scroll", scrollBottom);
    };
  }, [query, fn]);
}

export default useInfiniteScroll;
