# @evolu/vue

First version of Evolu Vue implementation


### Todo:
- bubble "once" from `useQueries` to `useQuerySubscription`?

## Usage in app main file

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { provideEvolu } from './evolu-provider';
import { createEvolu } from '@evolu/common';

const app = createApp(App);
const evoluInstance = createEvolu();

provideEvolu(evoluInstance);

app.mount('#app');
```

## Usage in component

```html
<script setup lang="ts">
import { useQuery, useSyncState, useOwner, useEvoluInstance } from '@evolu/vue';

const evolu = useEvoluInstance();

const { data, error } = useQuery((db) => db.tableName.selectAll());

const syncState = useSyncState();

const owner = useOwner();

const addRow = async () => {
    await evolu.create('db', { name: 'new' });
};
</script>

<template>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else-if="data && data.rows.length === 0">No data found.</div>
    <p>Sync: {{ syncState }}</p>
</template>
```