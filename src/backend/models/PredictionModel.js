const db = require('../config/database');

class PredictionModel {
    static async createPrediction(userId, inputData, predictionResult) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO predictions (user_id, input_data, prediction_result) 
                          VALUES (?, ?, ?)`;
            
            db.run(query, [userId, JSON.stringify(inputData), JSON.stringify(predictionResult)], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    static async getPredictionById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM predictions WHERE id = ?';
            
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async getUserPredictions(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC';
            
            db.all(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
}

module.exports = PredictionModel;