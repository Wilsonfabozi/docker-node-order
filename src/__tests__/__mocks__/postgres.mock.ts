import { newDb } from 'pg-mem';
import { Knex } from 'knex';

export const mem = newDb();

export const postgres = mem.adapters.createKnex() as Knex;
