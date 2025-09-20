declare module "get-srilanka-districts-cities" {
  export function cityList(province: string, district: string): string[][];
  export function provinceList(): string[][];
  export function getJsonofCityAndDistrict(province: string): any;
  export function getDistrictList(province: string): string[][];
}
