import pg from 'pg'
import 'dotenv/config'

export const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: +process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 10,
})

export const q = (text, params) => pool.query(text, params)
