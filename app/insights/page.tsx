import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Vedic astrology videos, nakshatra sound healing, and educational content from Jyotish Oracles.",
};

const CHANNEL_ID = "UCimfFtlfJbparv6EYNYUn7g";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}

async function fetchVideos(): Promise<Video[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const xml = await res.text();

    // Parse entries from Atom XML
    const entries = xml.split("<entry>").slice(1);

    return entries.map((entry) => {
      const id = extract(entry, "<yt:videoId>", "</yt:videoId>");
      const title = extract(entry, "<title>", "</title>");
      const published = extract(entry, "<published>", "</published>");
      const descRaw = extract(
        entry,
        "<media:description>",
        "</media:description>"
      );
      // Take first 200 chars of description, clean up XML entities
      const description = descRaw
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .slice(0, 200)
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\S+$/, "...");

      return {
        id,
        title,
        description,
        date: published,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    });
  } catch {
    return [];
  }
}

function extract(xml: string, startTag: string, endTag: string): string {
  const start = xml.indexOf(startTag);
  if (start === -1) return "";
  const end = xml.indexOf(endTag, start);
  if (end === -1) return "";
  return xml.slice(start + startTag.length, end);
}

function VideoCard({
  video,
  featured = false,
}: {
  video: Video;
  featured?: boolean;
}) {
  const formattedDate = new Date(video.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={featured ? "col-span-full" : "group"}>
      <Link
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        <div
          className={`overflow-hidden rounded-2xl border border-border-light bg-white transition-shadow hover:shadow-lg ${
            featured ? "" : ""
          }`}
        >
          {/* Thumbnail with play overlay */}
          <div className="relative aspect-video overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading={featured ? "eager" : "lazy"}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 text-white shadow-lg backdrop-blur-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-6 w-6"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={featured ? "p-8" : "p-5"}>
            <p className="mb-1 text-xs text-text-tertiary">{formattedDate}</p>
            <h3
              className={`mb-2 font-serif font-semibold text-text ${
                featured ? "text-2xl md:text-3xl" : "text-lg"
              }`}
            >
              {video.title}
            </h3>
            <p
              className={`leading-relaxed text-text-secondary ${
                featured ? "text-base" : "text-sm"
              }`}
            >
              {video.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default async function InsightsPage() {
  const videos = await fetchVideos();
  const [featured, ...rest] = videos;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-10 md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-green">
            Media
          </p>
          <h1 className="mb-4">From the Observatory</h1>
          <p className="max-w-[55ch] text-xl leading-relaxed text-text-secondary">
            Transit analyses, nakshatra sound healing, and reflections on the
            science of light — from our YouTube channel.
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-16 md:py-20">
        {videos.length === 0 ? (
          /* Empty / error state */
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-6 text-5xl" aria-hidden="true">
              ◎
            </div>
            <h2 className="mb-4 font-serif text-2xl font-semibold">
              Video insights coming soon
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              Visit our YouTube channel for the latest content on Vedic
              astrology, nakshatra sound healing, and classical concepts.
            </p>
            <Link
              href="https://www.youtube.com/@JyotishOracles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-dark px-8 py-4 font-semibold text-text-on-dark no-underline transition-opacity hover:opacity-90"
            >
              <YouTubeIcon />
              Visit our YouTube channel
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured video */}
            {featured && (
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Latest
                </p>
                <VideoCard video={featured} featured />
              </div>
            )}

            {/* Rest of videos */}
            {rest.length > 0 && (
              <div>
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.12em] text-green">
                  More Insights
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>

      {/* Bottom CTA */}
      <div className="border-t border-border-light bg-bg-warm">
        <Container className="py-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Stay connected
          </p>
          <h2 className="mb-4 font-serif text-2xl font-semibold">
            Subscribe for new insights
          </h2>
          <p className="mx-auto mb-6 max-w-[42ch] text-text-secondary">
            New nakshatra sound healing tracks and educational content published
            regularly.
          </p>
          <Link
            href="https://www.youtube.com/@JyotishOracles?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-dark px-8 py-4 font-semibold text-text-on-dark no-underline transition-opacity hover:opacity-90"
          >
            <YouTubeIcon />
            Subscribe on YouTube
          </Link>
        </Container>
      </div>
    </div>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-accent"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
