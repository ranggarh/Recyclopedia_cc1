const tf = require('@tensorflow/tfjs-node');

class L2 {
    static className = "L2";
  
    constructor(config) {
      return tf.regularizers.l1l2(config);
    }
  }
  tf.serialization.registerClass(L2);

async function loadModel() {
    try {
        return await tf.loadLayersModel(process.env.MODEL_URL);
    } catch (error) {
        // Menangani kesalahan saat memuat model
        console.error('Error loading the model:', error);
        throw error; // Meneruskan kembali kesalahan untuk ditangani di tempat lain jika perlu
    }
}

module.exports = loadModel;
