import { ref, watch, onUnmounted, type Ref } from 'vue';
import { injectEvolu } from '../evolu-provider';
import type { emptyRows, queryResultFromRows, Query, QueryResult, Row } from '@evolu/common';

/**
 * Subscribe to {@link Query} {@link QueryResult} changes and return the current value.
 * Use this for dynamic updates without triggering initial data loading.
 *
 * @example
 * const { rows } = useQuerySubscription(allTodos);
 */
const useQuerySubscription = <R extends Row>(
    query: Query<R>,
): Ref<Readonly<QueryResult<R>>> => {
    const evolu = injectEvolu();
    const data = ref<QueryResult<R>>({ row: null, rows: [] }) as Ref<Readonly<QueryResult<R>>>;

    const unsubscribe = evolu.subscribeQuery(query)(() => {
        data.value = evolu.getQuery<R>(query);
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return data;
};