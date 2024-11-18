import { ref, watch, computed, type Ref } from 'vue';
import { useEvoluInstance } from '../evolu-provider';
import type { Evolu, QueryResult, Row } from '@evolu/common';

export const useQuery = <R extends Row>(
  queryFn: (db: any) => any // Replace `any` with specific type for db
): Ref<QueryResult<R>> => {
  const evolu = useEvoluInstance();
  const data = ref<QueryResult<R>>({ row: null, rows: [] });

  const query = computed(() => evolu.createQuery(queryFn));

  watch(
    query,
    async (query) => {
      const result = await evolu.loadQuery<R>(query);
      data.value = result;

      const unsubscribe = evolu.subscribeQuery(query)(() => {
        data.value = evolu.getQuery<R>(query);
      });

      watch(query, () => unsubscribe(), { immediate: true });
    },
    { immediate: true }
  );

  return data;
};