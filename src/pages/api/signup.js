// pages/api/signup.js
import pool from '../../../db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while registering user' });
        }
    }
}
