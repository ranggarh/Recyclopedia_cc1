const predictClassification = require("../service/inferenceService");
const crypto = require("crypto");

const { storeData, getDatas } = require("../service/storeData");

const postPredictHandler = async (request, h) => {
  try {
    const { image } = request.payload;

    if (!image) {
      return h
        .response({ status: "error", message: "No image provided" })
        .code(400);
    }

    const { model } = request.server.app;

    const classIndices = {
      cardboard: 0,
      glass: 1,
      metal: 2,
      paper: 3,
      plastic: 4,
    };

    const { predictedClass, predictions } = await predictClassification(
      image, // Pass image data directly
      model,
      classIndices
    );

    

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const newPrediction = {
      id,
      predictedClass,
      predictions,
      createdAt,
    };

    // await storeData(id, newPrediction);

    return h
      .response({
        status: "success",
        message: "Model predicted successfully",
        data: newPrediction,
      })
      .code(201);
  } catch (error) {
    console.error("Error predicting:", error);
    return h
      .response({ status: "error", message: "Failed to predict" })
      .code(500);
  }
};



module.exports = { postPredictHandler};