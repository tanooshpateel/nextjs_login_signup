
import pool from '../../../db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) {
                console.log('User not found');
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            console.log('User:', user);
            console.log('Password Hash:', user.password);

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                console.log('Invalid password');
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ error: 'An error occurred while logging in' });
        }

    }
}


// pages/api/login.js
// import pool from '../../../db';
// import bcrypt from 'bcrypt';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { email, password } = req.body;

//         try {
//             const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//             const user = result.rows[0];

//             if (!user || !(await bcrypt.compare(password, user.password_hash))) {

//                 res.status(401).json({ error: 'Invalid email or password' });
//                 return;
//             }

//             req.session.user = user;
//             res.status(200).json({ message: 'Login successful' });
//         } catch (error) {
//             console.error('Login Error:', error);
//             res.status(500).json({ error: 'An error occurred while logging in' });
//         }
//     }
// }
