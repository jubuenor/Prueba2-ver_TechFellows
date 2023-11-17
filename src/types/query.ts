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

export interface Query {
  username: string;
  title: string;
  query: string;
  description: string;
  date: string | undefined | null;
}
