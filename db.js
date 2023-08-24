import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres', // Change to your PostgreSQL database user
    host: 'localhost', // Change to your PostgreSQL database host
    database: 'next_db', // Change to your PostgreSQL database name
    password: 'root', // Change to your PostgreSQL database password
    port: 5432, // Change if your PostgreSQL database port is different
});

export default pool;
