const PredictionModel = require("../models/PredictionModel");
const UserModel = require("../models/UserModel");
const path = require("path");
const config = require("../config/config");

class PredictionPresenter {
  async makePrediction(inputData, userId) {
    try {
      // Validasi input data
      if (!this.validateInputData(inputData)) {
        throw new Error("Invalid input data format");
      }

      // Pastikan user exists
      const user = await UserModel.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Format input data sesuai dengan model ML
      const formattedInput = this.formatInputData(inputData);

      // Lakukan prediksi (implementasi akan disesuaikan dengan model ML)
      const predictionResult = await this.runPrediction(formattedInput);

      // Simpan hasil prediksi ke database
      const predictionId = await PredictionModel.createPrediction(
        userId,
        inputData,
        predictionResult
      );

      return {
        predictionId,
        recommendedProfessions: predictionResult.recommendedProfessions,
        confidence: predictionResult.confidence,
      };
    } catch (error) {
      console.error("Prediction error:", error);
      throw error;
    }
  }

  validateInputData(inputData) {
    // Implementasi validasi sesuai dengan kebutuhan model
    const requiredFields = [
      "Linguistic",
      "Musical",
      "Bodily",
      "LogicalMathematical",
      "SpatialVisualization",
      "Interpersonal",
      "Intrapersonal",
      "Naturalist",
    ];

    return requiredFields.every((field) => {
      return (
        inputData.hasOwnProperty(field) &&
        typeof inputData[field] === "number" &&
        inputData[field] >= 0 &&
        inputData[field] <= 20
      );
    });
  }

  formatInputData(inputData) {
    // Format input data sesuai dengan kebutuhan model ML
    return [
      inputData.Linguistic,
      inputData.Musical,
      inputData.Bodily,
      inputData["LogicalMathematical"],
      inputData["SpatialVisualization"],
      inputData.Interpersonal,
      inputData.Intrapersonal,
      inputData.Naturalist,
    ];
  }

  async runPrediction(formattedInput) {
    // Implementasi prediksi akan ditambahkan nanti
    // Untuk saat ini return dummy data
    return {
      recommendedProfessions: [
        "Software Engineer",
        "Data Scientist",
        "UI/UX Designer",
      ],
      confidence: [0.85, 0.75, 0.65],
    };
  }

  async getUserPredictions(userId) {
    try {
      const predictions = await PredictionModel.getUserPredictions(userId);
      return {
        success: true,
        data: predictions,
      };
    } catch (error) {
      console.error("Error getting user predictions:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new PredictionPresenter();
