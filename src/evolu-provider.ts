import { provide, inject } from 'vue';
import type { Evolu } from '@evolu/common';

const EvoluSymbol = Symbol('Evolu');

export const provideEvolu = (evolu: Evolu<any>): void => {
  provide(EvoluSymbol, evolu);
};

export const useEvoluInstance = <T>(): Evolu<T> => {
  const evolu = inject(EvoluSymbol) as Evolu<T>;
  if (!evolu) {
    throw new Error('Evolu instance not found. Make sure to call `provideEvolu` at the app level.');
  }
  return evolu;
};