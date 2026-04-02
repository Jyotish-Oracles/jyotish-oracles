"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRashiColor } from "@/lib/astro/colors";
import { NAKSHATRAS, RASHIS } from "@/lib/astro/constants";
import type { TransitSegment } from "@/lib/astro/types";

interface Props {
  segment: TransitSegment | null;
  planetName: string;
  onClose: () => void;
}

export default function TransitDetailPanel({
  segment,
  planetName,
  onClose,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap & escape
  useEffect(() => {
    if (!segment) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [segment, onClose]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = (start: string, end: string) => {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <AnimatePresence>
      {segment && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label={`Transit details for ${planetName}`}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-background shadow-xl border-l border-border-light overflow-y-auto focus:outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-border-light bg-background p-5">
              <h2 className="font-serif text-xl font-semibold">
                {planetName} Transit
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface-alt transition-colors"
                aria-label="Close detail panel"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Rashi badge */}
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold"
                  style={{
                    backgroundColor: getRashiColor(segment.rashiIndex).bg,
                    color: getRashiColor(segment.rashiIndex).text,
                  }}
                >
                  {segment.rashiName.substring(0, 2)}
                </span>
                <div>
                  <div className="font-serif text-lg font-semibold">
                    {segment.rashiName}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {RASHIS[segment.rashiIndex]?.name}
                  </div>
                </div>
                {segment.isRetrograde && (
                  <span className="ml-auto rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                    Retrograde
                  </span>
                )}
              </div>

              {/* Detail rows */}
              <div className="space-y-3 rounded-xl bg-surface p-4">
                {segment.nakshatraName && (
                  <DetailRow
                    label="Nakshatra"
                    value={segment.nakshatraName}
                  />
                )}
                {segment.nakshatraName && (
                  <DetailRow
                    label="Nakshatra Lord"
                    value={
                      NAKSHATRAS[segment.nakshatraIndex]?.lord || "—"
                    }
                  />
                )}
                {segment.padaIndex > 0 && (
                  <DetailRow
                    label="Pada"
                    value={`${segment.padaIndex + 1}`}
                  />
                )}
                <DetailRow
                  label="Ingress"
                  value={formatDate(segment.startDate)}
                />
                <DetailRow
                  label="Egress"
                  value={formatDate(segment.endDate)}
                />
                <DetailRow
                  label="Duration"
                  value={getDuration(
                    segment.startDate,
                    segment.endDate
                  )}
                />
                <DetailRow
                  label="Start Degree"
                  value={`${segment.startDegree.toFixed(2)}°`}
                  mono
                />
                <DetailRow
                  label="End Degree"
                  value={`${segment.endDegree.toFixed(2)}°`}
                  mono
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">{label}</span>
      <span
        className={`text-sm font-medium ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
