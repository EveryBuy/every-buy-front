"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormikContext } from "formik";

import { useAppSelector } from "@/redux/store";
import { selectToken } from "@/redux/auth/selectorsAuth";

import styles from "./CityAutocomplete.module.scss";
import { useDebounce } from "@/api/useDebounce";
import { searchCities } from "@/api/fetchCities";

export type CityDto = {
  id: number;
  cityName: string;
  region?: {
    id: number;
    regionName: string;
  };
};

type Props = {
  nameField?: string;
  idField?: string;
  placeholder?: string;
  minLength?: number;
  styledFieldClass?: string
};

function CityAutocomplete({
  nameField = "location",
  idField = "cityId",
  placeholder = "Вкажіть місто",
  minLength = 3,
  styledFieldClass
}: Props) {
  const token = useAppSelector(selectToken);
  const { values, setFieldValue, setFieldTouched } = useFormikContext<any>();
  const inputValue: string = values?.[nameField] ?? "";

  const [list, setList] = useState<CityDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [skipSearch, setSkipSearch] = useState(false);


  const debouncedQuery = useDebounce(inputValue, 400);
  const acRef = useRef<AbortController | null>(null);

  // форматування назви
  const labelOf = (city: CityDto) => {
    const c = (city.cityName || "").trim();
    const r = (city.region?.regionName || "").trim();
    return r ? `${c}, ${r}` : c;
  };

  const onSelectCity = (city: CityDto) => {
    // setSkipSearch(true);
    setFieldValue(nameField, labelOf(city), true);
    setFieldValue(idField, city.id, true);
    setFieldTouched(nameField, true, false);
    setOpen(false);
  };
  
  useEffect(() => {
    if (skipSearch) {
    setSkipSearch(false);
    return;
  }
  if (debouncedQuery.trim().length < minLength) {
    setList([]);
    setOpen(false);
    return;
  }
  
  if (acRef.current) {
    acRef.current.abort();
  }
  const controller = new AbortController();
  acRef.current = controller;

  (async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const data = await searchCities(
        debouncedQuery.trim(),
        token || undefined,
        controller.signal
      );
      setList(Array.isArray(data) ? data : []);
      setOpen(true);
      setHighlight(-1);

    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setErrorMsg("Помилка завантаження міст");
        setList([]);
        console.log("Помилка завантаження міст:", err);
      }
    } finally {
      setLoading(false);
    }
  })();

  return () => controller.abort();
}, [debouncedQuery, token, minLength, inputValue, skipSearch]);

  

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styledFieldClass}
        name={nameField}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setFieldValue(nameField, e.target.value, false);
        }}
        onFocus={() => {
          if (list.length > 0) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlight((h) => (h < list.length - 1 ? h + 1 : 0));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => (h > 0 ? h - 1 : list.length - 1));
          }
          if (e.key === "Enter" && highlight >= 0 && list[highlight]) {
            e.preventDefault();
            onSelectCity(list[highlight]);
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />

      {loading && <div className={styles.state}>Пошук…</div>}
      {/* {!loading && helpText && <div className={styles.state}>{helpText}</div>} */}
      {errorMsg && <div className={styles.error}>{errorMsg}</div>}

      {open && list.length > 0 && (
        <div className={styles.dropdown}>
          {list.map((city, idx) => {
            const active = idx === highlight;
            return (
              <button
                type="button"
                key={city.id}
                className={active ? styles.itemActive : styles.item}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelectCity(city)}
              >
                {labelOf(city)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CityAutocomplete;
