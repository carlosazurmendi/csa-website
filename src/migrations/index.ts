import * as migration_20260617_014813_initial from './20260617_014813_initial';
import * as migration_20260617_123044_customers_split from './20260617_123044_customers_split';
import * as migration_20260624_132220 from './20260624_132220';

export const migrations = [
  {
    up: migration_20260617_014813_initial.up,
    down: migration_20260617_014813_initial.down,
    name: '20260617_014813_initial',
  },
  {
    up: migration_20260617_123044_customers_split.up,
    down: migration_20260617_123044_customers_split.down,
    name: '20260617_123044_customers_split',
  },
  {
    up: migration_20260624_132220.up,
    down: migration_20260624_132220.down,
    name: '20260624_132220'
  },
];
