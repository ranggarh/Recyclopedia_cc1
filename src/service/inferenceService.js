const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

const predictClassification = async (image, model, classIndices) => {
  try {

    // Preprocess the image
    const imgTensor = tf.node.decodeImage(image);
    const resizedTensor = tf.image.resizeBilinear(imgTensor, [240, 240]);
    const expandedTensor = resizedTensor.expandDims();
    const normalizedTensor = expandedTensor.div(255); // Rescale to [0, 1]

    // Predict the class
    const predictions = model.predict(normalizedTensor);
    const predictionData = await predictions.data();
    const predictedClassIndex = predictionData.indexOf(
      Math.max(...predictionData)
    );
    const predictedClass = Object.keys(classIndices)[predictedClassIndex];

    return { predictedClass, predictions: predictionData };
  } catch (error) {
    throw new InputError(
      `An error occurred while predicting: ${error.message}`
    );
  }
};

module.exports = predictClassification;