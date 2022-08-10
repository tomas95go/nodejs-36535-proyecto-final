const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getCloudinaryOptions() {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    allowed_formats: ["jpg", "png"],
    folder: process.env.CLOUDINARY_FOLDER,
  };
  return options;
}

async function uploadImage(image) {
  try {
    const options = getCloudinaryOptions();
    const result = await cloudinary.uploader.upload(image, options);
    return result.secure_url;
  } catch (error) {
    throw "Hubo un error al subir la imagen";
  }
}

module.exports = { uploadImage };
