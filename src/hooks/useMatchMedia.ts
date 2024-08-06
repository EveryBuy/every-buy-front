import { useLayoutEffect, useState } from "react";

const mediaQueries: MediaQueries = {
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px) and (max-width: 1279px)",
  isLaptop: "(min-width: 1280px) and (max-width: 1439px)",
  isDesktop: "(min-width: 1440px)",
};
export const initialValues: MatchedMediaResult = {
  isMobile: true,
  isTablet: false,
  isLaptop: false,
  isDesktop: false,
};

export const useMatchMedia = () => {
  const [values, setValues] = useState<MatchedMediaResult>(initialValues);

  useLayoutEffect(() => {
    const updateValues = () => {
      const valuesObject = Object.keys(mediaQueries).reduce((acc, key) => {
        acc[key as keyof MediaQueries] = window.matchMedia(
          mediaQueries[key as keyof MediaQueries]
        ).matches;
        return acc;
      }, {} as MatchedMediaResult);

      if (Object.values(valuesObject).every((val) => val === false)) {
        valuesObject.isMobile = true;
      }

      setValues(valuesObject);
    };

    if (typeof window !== "undefined") {
      updateValues();
      const queries = Object.values(mediaQueries).map((query) =>
        window.matchMedia(query)
      );
      queries.forEach((query) =>
        query.addEventListener("change", updateValues)
      );
      return () =>
        queries.forEach((query) =>
          query.removeEventListener("change", updateValues)
        );
    }
  }, []);

  return values;
};
