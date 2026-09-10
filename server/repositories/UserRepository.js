import { BaseRepository } from './BaseRepository.js';
import { query } from '../lib/db.js';

export class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    async findByEmail(email) {
        const res = await query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    }
}
