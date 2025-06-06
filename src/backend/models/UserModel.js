const db = require('../config/database');

class UserModel {
    static async createUser(name, email) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
            
            db.run(query, [name, email], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    static async getUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            
            db.get(query, [email], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async getAllUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users ORDER BY created_at DESC';
            
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
}

module.exports = UserModel;