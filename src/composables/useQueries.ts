import { ref, watch, type Ref } from 'vue';
import { useEvoluInstance } from '../evolu-provider';
import type { Evolu, QueryResult, Row } from '@evolu/common';

export const useQueries = <R extends Row>(
  queryFns: ((db: any) => any)[]
): Ref<QueryResult<R>[]> => {
  const evolu = useEvoluInstance();
  const data = ref<QueryResult<R>[]>([]);

  watch(
    queryFns,
    async (queries) => {
      const results = await Promise.all(
        queries.map((queryFn) => evolu.loadQuery<R>(evolu.createQuery(queryFn)))
      );
      data.value = results;

      const unsubscribes = queries.map((queryFn) =>
        evolu.subscribeQuery(evolu.createQuery(queryFn))(() => {
          const newResults = queries.map((qFn) =>
            evolu.getQuery<R>(evolu.createQuery(qFn))
          );
          data.value = newResults;
        })
      );

      watch(queryFns, () => unsubscribes.forEach((u) => u()), { immediate: true });
    },
    { immediate: true }
  );

  return data;
};