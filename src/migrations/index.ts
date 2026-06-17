import * as migration_20260617_014813_initial from './20260617_014813_initial';

export const migrations = [
  {
    up: migration_20260617_014813_initial.up,
    down: migration_20260617_014813_initial.down,
    name: '20260617_014813_initial'
  },
];
