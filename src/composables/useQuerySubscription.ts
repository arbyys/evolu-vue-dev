import { ref, watch, onUnmounted, type Ref } from 'vue';
import { useEvoluInstance } from '../evolu-provider';
import type { QueryResult, Row } from '@evolu/common';

export const useQuerySubscription = <R extends Row>(
  queryFn: (db: any) => any
): Ref<QueryResult<R>> => {
  const evolu = useEvoluInstance();
  const data = ref<QueryResult<R>>(evolu.getQuery<R>(evolu.createQuery(queryFn)));

  const unsubscribe = evolu.subscribeQuery(evolu.createQuery(queryFn))(() => {
    data.value = evolu.getQuery<R>(evolu.createQuery(queryFn));
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return data;
};