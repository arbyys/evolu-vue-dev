import { ref, onUnmounted, type Ref } from 'vue';
import { injectEvolu } from '../evolu-provider';
import type { EvoluError } from '@evolu/common';

export const useEvoluError = (): Ref<EvoluError | null> => {
    const evolu = injectEvolu();
    const error = ref<EvoluError | null>(evolu.getError());

    const unsubscribe = evolu.subscribeError(() => {
        error.value = evolu.getError();
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return error;
};