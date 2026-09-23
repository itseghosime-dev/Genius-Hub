import * as migration_20260923_040309_initial_schema from './20260923_040309_initial_schema';
import * as migration_20260923_133000_staff_access_control from './20260923_133000_staff_access_control';

export const migrations = [
  {
    up: migration_20260923_040309_initial_schema.up,
    down: migration_20260923_040309_initial_schema.down,
    name: '20260923_040309_initial_schema',
  },
  {
    up: migration_20260923_133000_staff_access_control.up,
    down: migration_20260923_133000_staff_access_control.down,
    name: '20260923_133000_staff_access_control',
  },
];
