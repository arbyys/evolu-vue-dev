import { ref, onUnmounted, type Ref } from 'vue';
import { useEvoluInstance } from '../evolu-provider';
import type { EvoluError } from '@evolu/common';

export const useEvoluError = (): Ref<EvoluError | null> => {
  const evolu = useEvoluInstance();
  const error = ref<EvoluError | null>(null);

  const unsubscribe = evolu.subscribeError(() => {
    error.value = evolu.getError();
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return error;
};