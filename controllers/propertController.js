const Property = require('../models/Property');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.createProperty = async (req, res) => {
  try {
    const file = req.files.image;
    const result = await uploadToCloudinary(file.tempFilePath);
    const property = await Property.create({ ...req.body, imageUrl: result.secure_url });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
};

exports.getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ error: 'Not found' });
  res.json(property);
};
