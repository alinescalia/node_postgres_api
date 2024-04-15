import pg from 'pg'
import 'dotenv/config.js'
const { Pool } = pg;

console.log('enviroments', process.env)

export const config = new Pool({
    user: process.env.DB_user,
    host: process.env.DB_host,
    database: process.env.DB_database,
    password: process.env.DB_password,
    port: 5432
}) 
