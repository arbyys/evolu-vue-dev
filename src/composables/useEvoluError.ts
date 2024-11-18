import { ref, onUnmounted, type Ref } from 'vue';
import { useEvoluInstance } from '../evolu-provider';

export const useEvoluError = (): Ref<string | null> => {
  const evolu = useEvoluInstance();
  const error = ref<string | null>(null);

  const unsubscribe = evolu.subscribeError((err) => {
    error.value = err;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return error;
};