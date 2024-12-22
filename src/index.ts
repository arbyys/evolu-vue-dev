export { provideEvolu, injectEvolu } from './evolu-provider';
export { useQuery } from './composables/useQuery';
//export { useQueries } from './composables/useQueries';
export { useEvoluError } from './composables/useEvoluError';
export { useSyncState } from './composables/useSyncState';
export { useOwner } from './composables/useOwner';

import { Evolu, EvoluFactory, FlushSync } from "@evolu/common";
export { createEvolu } from "@evolu/common-web";
export * from "@evolu/common/public";

//export { useQuerySubscription } from './composables/useQuerySubscription';

// add export of ./evolu-provider/useEvoluInstance renamed to useEvolu

// export everything from other evolu packages