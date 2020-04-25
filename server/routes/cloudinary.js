const express = require("express");
const router = express.Router();
const { uploader, storage } = require("../cloudinary/cloudinary.config");
const cloudinary = require("cloudinary");

//Image Upload
router.post("/upload", uploader.single("imageUrl"), async (req, res, next) => {
  const imageUpload = req.file.secure_url;

  if (!req.file) {
    next(new Error("No existe ningún archivo para subir"));
    return;
  }

  return res.json({
    secure_url: imageUpload,
    status: 200,
    message: "Subida de imagen satisfactoria"
  });
});

//Image Delete
const removeCloudinaryImage = ({ public_id }) => {
  console.log(public_id);
  cloudinary.v2.uploader.destroy(public_id, (error, result) => {
    if (error) console.log(error);
  });
};

router.post("/delete", async (req, res, next) => {
  const { public_id } = req.body;
  removeCloudinaryImage({ public_id });
  res.status(200).json({ message: "Element deleted" });
});

module.exports = router;
