import type { City } from "../shared/types/City";

export const ActionPayloadTypes = {
  CREATE_CITY: "city/created",
  DELETE_CITY: "city/deleted",
  LOAD_CITY: "cities/load",
  LOADED_CITIES: "cities/loaded",
  LOADED_CITY: "city/loaded",
  REJECTED_CITY: "cities/rejected",
} as const;

export type ActionPayloadsTypes =
  (typeof ActionPayloadTypes)[keyof typeof ActionPayloadTypes];

export type ActionContent = {
  [ActionPayloadTypes.CREATE_CITY]: City;
  [ActionPayloadTypes.DELETE_CITY]: string;
  [ActionPayloadTypes.LOAD_CITY]: undefined;
  [ActionPayloadTypes.LOADED_CITIES]: City[];
  [ActionPayloadTypes.REJECTED_CITY]: string;
  [ActionPayloadTypes.LOADED_CITY]: City;
};

export type Action = {
  [T in keyof ActionContent]: { type: T; payload: ActionContent[T] };
}[keyof ActionContent];

export type ActionReducer = Action;

/*
  - keyof typeof ActionPayloadTypes → las claves del objeto ActionPayloadTypes (p. ej. "CREATE_CITY" | "DELETE_CITY" | ...").
  - El mapeado [K in ...] : { type: ..., payload: ... } crea, para cada clave K, un tipo objeto donde:
    + type es el valor literal asociado a esa clave (gracias a as const), p. ej. "cities/created".
    + payload es el tipo definido en ActionContent[K] para esa clave (p. ej. City, string, City[], ...).
  - El }[keyof typeof ActionPayloadTypes] al final indexa ese tipo mapeado y lo transforma en una unión de todas las ramas. Es decir produce la unión discriminada:
    { type: "cities/created"; payload: City } | { type: "cities/deleted"; payload: string } | ...
  */

// export type Action = {
//   [K in keyof typeof ActionPayloadTypes]: {
//     type: (typeof ActionPayloadTypes)[K];
//     payload: ActionContent[K];
//   };
// }[keyof typeof ActionPayloadTypes];

// export type ActionReducer = Action;
