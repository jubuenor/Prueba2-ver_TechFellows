export interface Years {
  manual: boolean;
  years: number[];
}
export interface Country {
  [country_code: string]: string;
}

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
  id?: string;
  username: string;
  title: string;
  query: string;
  description: string;
  date?: string;
}

export interface QueryStorage {
  countries: string[];
  series: string[];
  years: Years;
}
