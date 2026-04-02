import type { MetadataRoute } from "next";

const BASE = "https://jyotishoracles.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/services/garbhadhana`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/child-horoscopy`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/lakshmi-kataksha`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tools/transits`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/tools/chart`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
