import { describe, expect, it, vi } from 'vitest';
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';
import * as initialSchema from '../migrations/20260923_040309_initial_schema';
import * as staffAccessControl from '../migrations/20260923_133000_staff_access_control';
import { migrations } from '../migrations/index';

describe('Database Migrations Chain & Schema Registry', () => {
  it('registers all migrations in chronological order', () => {
    expect(migrations).toHaveLength(2);
    expect(migrations[0]?.name).toBe('20260923_040309_initial_schema');
    expect(migrations[1]?.name).toBe('20260923_133000_staff_access_control');
  });

  it('validates Phase 02 initial schema migration functions', async () => {
    expect(typeof initialSchema.up).toBe('function');
    expect(typeof initialSchema.down).toBe('function');

    const mockDb = {
      execute: vi.fn().mockResolvedValue(undefined),
    };

    const mockUpArgs = { db: mockDb, payload: {}, req: {} } as unknown as MigrateUpArgs;
    const mockDownArgs = { db: mockDb, payload: {}, req: {} } as unknown as MigrateDownArgs;

    await initialSchema.up(mockUpArgs);
    expect(mockDb.execute).toHaveBeenCalledTimes(1);

    await initialSchema.down(mockDownArgs);
    expect(mockDb.execute).toHaveBeenCalledTimes(2);
  });

  it('validates Phase 03 staff access control migration functions', async () => {
    expect(typeof staffAccessControl.up).toBe('function');
    expect(typeof staffAccessControl.down).toBe('function');

    const mockDb = {
      execute: vi.fn().mockResolvedValue(undefined),
    };

    const mockUpArgs = { db: mockDb, payload: {}, req: {} } as unknown as MigrateUpArgs;
    const mockDownArgs = { db: mockDb, payload: {}, req: {} } as unknown as MigrateDownArgs;

    await staffAccessControl.up(mockUpArgs);
    expect(mockDb.execute).toHaveBeenCalledTimes(1);

    await staffAccessControl.down(mockDownArgs);
    expect(mockDb.execute).toHaveBeenCalledTimes(2);
  });
});
