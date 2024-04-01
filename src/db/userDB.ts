import sql from '../config/postgresql.js';

export const getUsers = async () => {
    try {
        // test connect
        const users = await sql``;
        return users;
    } catch (ex) {
        console.log(ex);
        return null;
    }
};