"use client";

import { useState, useRef, useEffect } from "react";
import { useLocation } from "@/lib/location/context";
import { searchCities, type City } from "@/lib/location/cities";

export default function LocationPicker() {
  const { city, isLoading, setCity, detectLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchCities(query);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSelect = (c: City) => {
    setCity(c);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-alt hover:text-text"
        aria-label={`Location: ${city.name}. Click to change.`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 opacity-50"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {isLoading ? (
          <span className="animate-pulse">Detecting...</span>
        ) : (
          <span>{city.name}</span>
        )}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`shrink-0 opacity-40 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border-light bg-white shadow-lg">
          {/* Search */}
          <div className="border-b border-border-light p-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-green focus:outline-none focus:ring-2 focus:ring-green/15"
            />
          </div>

          {/* Detect button */}
          <button
            onClick={() => {
              detectLocation();
              setOpen(false);
              setQuery("");
            }}
            className="flex w-full items-center gap-2.5 border-b border-border-light px-4 py-2.5 text-left text-sm text-green-dark transition-colors hover:bg-surface"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
            Detect my location
          </button>

          {/* City list */}
          <div className="max-h-64 overflow-y-auto py-1">
            {results.length === 0 ? (
              <div className="px-4 py-3 text-center text-sm text-text-tertiary">
                No cities found
              </div>
            ) : (
              results.map((c) => (
                <button
                  key={`${c.name}-${c.state}`}
                  onClick={() => handleSelect(c)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-surface ${
                    c.name === city.name && c.state === city.state
                      ? "font-medium text-green-dark"
                      : "text-text"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-text-tertiary">{c.state}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
