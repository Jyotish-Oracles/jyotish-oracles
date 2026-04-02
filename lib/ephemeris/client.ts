// Swiss Ephemeris singleton initialization
// Server-only module — never import on client side

import path from "path";

let initialized = false;

export async function initEphemeris() {
  if (initialized) return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sweph: any = await import(/* webpackIgnore: true */ "sweph");

    // Set path to ephemeris data files
    const ephePath = path.join(process.cwd(), "ephe");
    sweph.set_ephe_path(ephePath);

    // Set Lahiri ayanamsa (most common for Jyotish)
    // 1 = SE_SIDM_LAHIRI
    sweph.set_sid_mode(1, 0, 0);

    initialized = true;
    console.log("[Ephemeris] Initialized with Lahiri ayanamsa, path:", ephePath);
  } catch (error) {
    console.warn(
      "[Ephemeris] sweph not available — using mock calculations.",
      error instanceof Error ? error.message : error
    );
  }
}

export function isEphemerisAvailable(): boolean {
  return initialized;
}
