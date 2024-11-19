import { onUnmounted, ref, watch, type Ref } from 'vue';
import { injectEvolu } from '../evolu-provider';
import type { Evolu, QueryResult, Row, Queries, QueryResultsFromQueries, QueryResultsPromisesFromQueries } from '@evolu/common';

export const useQueries = <R extends Row, Q extends Queries<R>, OQ extends Queries<R>>(
    queries: [...Q],
    options: Partial<{
        /** Queries that should be only loaded, not subscribed to. */
        readonly once: [...OQ];

        /** Reuse existing promises instead of loading so query will not suspense. */
        readonly promises: [
            ...QueryResultsPromisesFromQueries<Q>,
            ...QueryResultsPromisesFromQueries<OQ>,
        ];
    }> = {},
//): [...QueryResultsFromQueries<Q>, ...QueryResultsFromQueries<OQ>] => {
): void => {
    const evolu = injectEvolu();
    const allQueries = !options?.once ? queries.concat() : queries;
    //const data = ref<QueryResult<R>[]>([]);

/*
    if (options?.promises) {
        options.promise.then((result) => (data.value = result));
    } else {
        evolu.loadQuery(query).then((result) => (data.value = result));
    }

    if (!options?.once) {
        //
    }


    return allQueries.map((query, i) => {
        const unsubscribe = evolu.subscribeQuery(query)(() => {
            data.value = evolu.getQuery<R>(query);
        });

        onUnmounted(() => {
            unsubscribe();
        });
    }
    ) as never;
     */
};