declare module "sweph" {
  export function set_ephe_path(path: string): void;
  export function set_sid_mode(sid_mode: number, t0: number, ayan_t0: number): void;
  export function calc_ut(
    tjd_ut: number,
    ipl: number,
    iflag: number
  ): { data: number[]; flag: number; error: string };
  export function julday(
    year: number,
    month: number,
    day: number,
    hour: number,
    gregflag: number
  ): number;
  export function revjul(
    jd: number,
    gregflag: number
  ): { year: number; month: number; day: number; hour: number };
  export function houses(
    tjd_ut: number,
    lat: number,
    lon: number,
    hsys: string
  ): {
    flag: number;
    data: {
      houses: number[];
      points: number[]; // [0]=ASC, [1]=MC, [2]=ARMC, [3]=Vertex, etc.
    };
  };
  export function get_ayanamsa_ut(tjd_ut: number): number;
}
