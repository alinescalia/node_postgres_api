import pg from 'pg'
const { Pool } = pg;

export const config = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'produtos',
    password: '5432',
    port: 5432
})
