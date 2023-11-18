export interface Country {
  [country_code: string]: string;
}
export interface Serie {
  [series_code: string]: string;
}
export interface Data {
  countries: Country;
  series: Serie;
}
