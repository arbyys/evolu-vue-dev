import { ref, onUnmounted, type Ref } from 'vue';
import { useEvoluInstance } from '../evolu-provider';
import type { SyncState } from '@evolu/common';

export const useSyncState = (): Ref<SyncState> => {
  const evolu = useEvoluInstance();
  const syncState = ref<SyncState>(evolu.getSyncState());

  const unsubscribe = evolu.subscribeSyncState(() => {
    syncState.value = evolu.getSyncState();
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return syncState;
};