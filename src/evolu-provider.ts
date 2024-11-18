import { provide, inject } from 'vue';
import type { Evolu, EvoluSchema } from '@evolu/common';

const EvoluSymbol = Symbol('Evolu');

export const provideEvolu = (evolu: Evolu<any>): void => {
  provide(EvoluSymbol, evolu);
};

export const useEvoluInstance = <S extends EvoluSchema>(): Evolu<S> => {
  const evolu = inject(EvoluSymbol);
  if (!evolu) {
    throw new Error('Could not inject Evolu instance. Make sure to call `provideEvolu` at the app level.');
  }
  return evolu as Evolu<S>;
};