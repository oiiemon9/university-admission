import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'admission_bridge',
  password: 'emon1234',
  port: 5432,
});
