import { Years } from "./years";

export interface QueryCreate {
  countries: string[];
  series: string[];
  years: Years;
}

export interface Results {
  [country: string]: {
    [serie: string]: { [year: number]: number };
  };
}
