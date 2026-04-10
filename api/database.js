require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('Missing SUPABASE_DB_URL (or DATABASE_URL) in environment variables.');
}

const useSsl = (process.env.PGSSL ?? 'true').toLowerCase() !== 'false';
const ssl = useSsl ? { rejectUnauthorized: false } : false;

const pool = new Pool({
    connectionString,
    ssl
});

async function healthCheck() {
    try {
        await pool.query('SELECT 1');
        console.log('Connected to Supabase Postgres.');
    } catch (error) {
        console.error('Failed to connect to Supabase Postgres:', error.message);
        throw error;
    }
}

async function getInvoiceItems() {
    const { rows } = await pool.query(
        'SELECT name, price FROM invoiceitems ORDER BY itemid'
    );
    return rows;
}

async function addInvoiceItem(invoiceId, name, price) {
    const { rows } = await pool.query(
        'INSERT INTO invoiceitems (invoiceid, name, price) VALUES ($1, $2, $3) RETURNING itemid',
        [invoiceId, name, price]
    );
    return rows[0]?.itemid;
}

module.exports = {
    healthCheck,
    getInvoiceItems,
    addInvoiceItem
};
