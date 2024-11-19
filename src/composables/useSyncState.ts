import { ref, onUnmounted, type Ref } from 'vue';
import { injectEvolu } from '../evolu-provider';
import type { SyncState } from '@evolu/common';

export const useSyncState = (): Ref<SyncState> => {
    const evolu = injectEvolu();
    const syncState = ref<SyncState>(evolu.getSyncState());

    const unsubscribe = evolu.subscribeSyncState(() => {
        syncState.value = evolu.getSyncState();
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return syncState;
};