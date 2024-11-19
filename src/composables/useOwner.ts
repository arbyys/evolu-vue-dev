import { ref, onUnmounted, type Ref } from 'vue';
import { injectEvolu } from '../evolu-provider';
import type { Owner } from '@evolu/common';

export const useOwner = (): Ref<Owner | null> => {
    const evolu = injectEvolu();
    const owner = ref<Owner | null>(evolu.getOwner());

    const unsubscribe = evolu.subscribeOwner(() => {
        owner.value = evolu.getOwner();
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return owner;
};