require('dotenv').config();

module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
    },
    cors: {
        origin: ['*'],
        credentials: true
    },
    modelPath: process.env.MODEL_PATH || '../ml-model/model_tfjs/model.json'
};