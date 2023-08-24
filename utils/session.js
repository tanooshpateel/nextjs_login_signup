import { withIronSession } from 'next-iron-session';

const sessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: 'your-cookie-name',
    // Other options if needed...
};

export default function withSession(handler) {
    return withIronSession(handler, sessionOptions);
}
