const Product = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json("sucess ");
};
const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) queryObject.company = company;

  if (name) {
    queryObject.name = { $regex: name, $option: "i" };
  }
  const products = await Product.find(queryObject);

  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
