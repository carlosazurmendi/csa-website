import * as migration_20260624_191830_initial from './20260624_191830_initial';
import * as migration_20260625_143450_m2_content_model from './20260625_143450_m2_content_model';
import * as migration_20260628_131848_m3_schema_current from './20260628_131848_m3_schema_current';
import * as migration_20260628_140000_order_idempotency from './20260628_140000_order_idempotency';
import * as migration_20260628_150000_grant_uniqueness from './20260628_150000_grant_uniqueness';

export const migrations = [
  {
    up: migration_20260624_191830_initial.up,
    down: migration_20260624_191830_initial.down,
    name: '20260624_191830_initial',
  },
  {
    up: migration_20260625_143450_m2_content_model.up,
    down: migration_20260625_143450_m2_content_model.down,
    name: '20260625_143450_m2_content_model',
  },
  {
    up: migration_20260628_131848_m3_schema_current.up,
    down: migration_20260628_131848_m3_schema_current.down,
    name: '20260628_131848_m3_schema_current'
  },
  {
    up: migration_20260628_140000_order_idempotency.up,
    down: migration_20260628_140000_order_idempotency.down,
    name: '20260628_140000_order_idempotency'
  },
  {
    up: migration_20260628_150000_grant_uniqueness.up,
    down: migration_20260628_150000_grant_uniqueness.down,
    name: '20260628_150000_grant_uniqueness'
  },
];
