import { ref, onUnmounted, watch, computed, type Ref } from 'vue';
import { injectEvolu } from '../evolu-provider';
import type { Evolu, Query, QueryResult, Row } from '@evolu/common';

/**
 * Load and subscribe to the Query, and return an object with `rows` and `row`
 * properties that are automatically updated when data changes.
 *
 * @example
 * const { rows } = useQuery(allTodos);
 * const { row } = useQuery(todoById(1));
 */
export const useQuery = <R extends Row>(
    query: Query<R>,
    options: Partial<{
        /** Without subscribing to changes. */
        readonly once: boolean;

        /** Reuse existing promise instead of loading so query will not suspense. */
        readonly promise: Promise<QueryResult<R>>;
    }> = {},
): Ref<Readonly<QueryResult<R>>> => {
    const evolu = injectEvolu();
    const data = ref<QueryResult<R>>({ row: null, rows: [] }) as Ref<Readonly<QueryResult<R>>>;

    // Load data or use given promise
    if (options?.promise) {
        options.promise.then((result) => (data.value = result));
    } else {
        evolu.loadQuery(query).then((result) => (data.value = result));
    }

    // Subscribe to query if once is not true
    if (!options?.once) {
        const unsubscribe = evolu.subscribeQuery(query)(() => {
            data.value = evolu.getQuery<R>(query);
        });

        onUnmounted(() => {
            unsubscribe();
        });
    }

    return data;
};