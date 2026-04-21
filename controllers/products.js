const Product = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json("sucess ");
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) queryObject.company = company;

  if (name) {
    queryObject.name = { $regex: name, $option: "i" };
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  const products = await result;

  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
