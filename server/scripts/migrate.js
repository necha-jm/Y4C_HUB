import fs from 'fs/promises';
import path from 'path';
import pool from '../lib/db.js';

async function migrate() {
    console.log('Starting migration...');
    const client = await pool.connect();

    try {
        // 1. Run init-db.sql
        const sqlPath = path.join(process.cwd(), 'server/scripts/init-db.sql');
        const sql = await fs.readFile(sqlPath, 'utf-8');
        await client.query(sql);
        console.log('Database schema initialized.');

        // 2. Load and seed Programs from programs.json
        const programsPath = path.join(process.cwd(), 'server/data/programs.json');
        try {
            const programsData = await fs.readFile(programsPath, 'utf-8');
            const programs = JSON.parse(programsData);

            for (const program of programs) {
                await client.query(
                    'INSERT INTO programs (id, title, description, activities, images) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, activities = EXCLUDED.activities, images = EXCLUDED.images',
                    [program.id, program.title, program.description, JSON.stringify(program.activities), JSON.stringify(program.images)]
                );
            }
            console.log('Programs seeded.');
        } catch (e) {
            console.warn('programs.json not found or could not be read, skipping program seed.');
        }

        // 3. Load and seed Users from users.json
        const usersPath = path.join(process.cwd(), 'server/data/users.json');
        try {
            const usersData = await fs.readFile(usersPath, 'utf-8');
            const users = JSON.parse(usersData);

            for (const user of users) {
                await client.query(
                    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
                    [user.name, user.email, user.password, user.role]
                );
            }
            console.log('Users seeded.');
        } catch (e) {
            console.warn('users.json not found or could not be read, skipping user seed.');
        }

        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        process.exit();
    }
}

migrate();
