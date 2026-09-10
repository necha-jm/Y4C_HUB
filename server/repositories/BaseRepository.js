import { query } from '../lib/db.js';

export class BaseRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async readAll() {
        try {
            const res = await query(`SELECT * FROM ${this.tableName}`);
            return res.rows;
        } catch (error) {
            console.error(`Error reading from ${this.tableName}:`, error);
            throw error;
        }
    }

    async findById(id) {
        try {
            const res = await query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
            return res.rows[0];
        } catch (error) {
            console.error(`Error finding in ${this.tableName} by id ${id}:`, error);
            throw error;
        }
    }

    async create(item) {
        try {
            const keys = Object.keys(item);
            const values = Object.values(item);
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
            const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const res = await query(sql, values);
            return res.rows[0];
        } catch (error) {
            console.error(`Error creating in ${this.tableName}:`, error);
            throw error;
        }
    }

    async update(id, updatedItem) {
        try {
            const keys = Object.keys(updatedItem);
            const values = Object.values(updatedItem);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            const res = await query(sql, [...values, id]);
            return res.rows[0];
        } catch (error) {
            console.error(`Error updating in ${this.tableName} id ${id}:`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
        } catch (error) {
            console.error(`Error deleting in ${this.tableName} id ${id}:`, error);
            throw error;
        }
    }
}
