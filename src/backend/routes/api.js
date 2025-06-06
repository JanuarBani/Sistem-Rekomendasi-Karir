const userPresenter = require('../presenters/UserPresenter');
const predictionPresenter = require('../presenters/PredictionPresenter');

module.exports = [
    // User routes
    {
        method: 'POST',
        path: '/api/users',
        handler: async (request, h) => {
            const result = await userPresenter.createUser(request.payload);
            return h.response(result).code(result.success ? 201 : 400);
        }
    },
    {
        method: 'GET',
        path: '/api/users/{id}',
        handler: async (request, h) => {
            const result = await userPresenter.getUser(request.params.id);
            return h.response(result).code(result.success ? 200 : 404);
        }
    },
    {
        method: 'GET',
        path: '/api/users',
        handler: async (request, h) => {
            const result = await userPresenter.getAllUsers();
            return h.response(result).code(result.success ? 200 : 500);
        }
    },

    // Prediction routes
    {
        method: 'POST',
        path: '/api/predictions',
        handler: async (request, h) => {
            const userId = request.payload.userId;
            const inputData = request.payload.inputData;
            const result = await predictionPresenter.makePrediction(inputData, userId);
            return h.response(result).code(result.success ? 201 : 400);
        }
    },
    {
        method: 'GET',
        path: '/api/users/{userId}/predictions',
        handler: async (request, h) => {
            const result = await predictionPresenter.getUserPredictions(request.params.userId);
            return h.response(result).code(result.success ? 200 : 404);
        }
    },

    // Health check route
    {
        method: 'GET',
        path: '/api/health',
        handler: (request, h) => {
            return h.response({ status: 'ok', timestamp: new Date().toISOString() }).code(200);
        }
    }
];