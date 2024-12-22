import { injectEvolu } from '../evolu-provider';
import type { Evolu, Queries, QueryResultsFromQueries, QueryResultsPromisesFromQueries, Row } from '@evolu/common';
//import { useQuery } from './useQuery';
import { useQuerySubscription } from './useQuerySubscription';

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
    }> = {}
): [...QueryResultsFromQueries<Q>, ...QueryResultsFromQueries<OQ>] => {
    const evolu = injectEvolu();
    const onceQueries = options?.once ?? [];
    const allQueries = onceQueries.length ? queries.concat(onceQueries) : queries;

    if (options?.promises) {
        options.promises.forEach(promise => {
            promise.then(result => {});
        });
    } else {
        evolu.loadQueries(allQueries);
    }

    const results = allQueries.map((query) => useQuerySubscription(query));

    return results as unknown as [...QueryResultsFromQueries<Q>, ...QueryResultsFromQueries<OQ>];
};