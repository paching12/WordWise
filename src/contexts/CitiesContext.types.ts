import type { City } from "../shared/types/City";

export type contextTypeValue = {
  isLoading: boolean;
  cities: City[];
  currentCity?: City;
  getCity: (id: string) => void;
  createCity: (city: City) => void;
  deleteCity: (id: string) => void;
};

export type CitiesContextProvider = {
  children: React.ReactNode;
};
