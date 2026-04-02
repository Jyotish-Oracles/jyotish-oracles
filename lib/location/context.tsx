"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { DEFAULT_CITY, findNearestCity, type City } from "./cities";

interface LocationState {
  city: City;
  isDetected: boolean;
  isLoading: boolean;
  setCity: (city: City) => void;
  detectLocation: () => void;
}

const LocationContext = createContext<LocationState>({
  city: DEFAULT_CITY,
  isDetected: false,
  isLoading: true,
  setCity: () => {},
  detectLocation: () => {},
});

const STORAGE_KEY = "jyotish-location";

function loadSaved(): City | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function save(city: City) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
  } catch {}
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<City>(DEFAULT_CITY);
  const [isDetected, setIsDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setCity = useCallback((c: City) => {
    setCityState(c);
    save(c);
    setIsDetected(false);
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        setCityState(nearest);
        save(nearest);
        setIsDetected(true);
        setIsLoading(false);
      },
      () => {
        // Denied or error — keep current
        setIsLoading(false);
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  }, []);

  // On mount: load saved or detect
  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setCityState(saved);
      setIsLoading(false);
    } else {
      // Try geolocation, fall back to Bangalore
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
            setCityState(nearest);
            save(nearest);
            setIsDetected(true);
            setIsLoading(false);
          },
          () => {
            // Denied — use default Bangalore
            setCityState(DEFAULT_CITY);
            save(DEFAULT_CITY);
            setIsLoading(false);
          },
          { timeout: 8000 }
        );
      } else {
        setCityState(DEFAULT_CITY);
        save(DEFAULT_CITY);
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <LocationContext.Provider value={{ city, isDetected, isLoading, setCity, detectLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
