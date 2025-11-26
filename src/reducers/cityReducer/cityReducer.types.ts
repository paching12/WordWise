import type { City } from "../../shared/types/City";

export type CityStateType = {
  cities: City[];
  isLoading: boolean;
  currentCity?: City;
  error?: string;
};
