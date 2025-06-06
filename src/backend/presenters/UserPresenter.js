const UserModel = require('../models/UserModel');

class UserPresenter {
    async createUser(userData) {
        try {
            // Validasi input
            if (!this.validateUserData(userData)) {
                throw new Error('Invalid user data');
            }

            // Cek apakah email sudah terdaftar
            const existingUser = await UserModel.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Buat user baru
            const userId = await UserModel.createUser(userData.name, userData.email);
            const user = await UserModel.getUserById(userId);

            return {
                success: true,
                data: user
            };

        } catch (error) {
            console.error('Create user error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getUser(userId) {
        try {
            const user = await UserModel.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            return {
                success: true,
                data: user
            };

        } catch (error) {
            console.error('Get user error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAllUsers() {
        try {
            const users = await UserModel.getAllUsers();
            return {
                success: true,
                data: users
            };

        } catch (error) {
            console.error('Get all users error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateUserData(userData) {
        // Validasi dasar untuk data user
        if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
            return false;
        }

        if (!userData.email || typeof userData.email !== 'string') {
            return false;
        }

        // Validasi format email sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            return false;
        }

        return true;
    }
}

module.exports = new UserPresenter();