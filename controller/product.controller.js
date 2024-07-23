const Brand = require("../model/Brand");
const productServices = require("../services/product.service");
const Product = require("../model/Products");
const fs = require('fs');
require("dotenv").config();

const imgFullPath = (imgPath) => {
  if (!imgPath || imgPath === null) return "";
  return "http://localhost:7000/" + imgPath;
};

// add product
exports.addProduct = async (req, res, next) => {

  const { shade } = req.body;
  req.shadeImage = [];

  shade.forEach((base64Img, index) => {
    const matches = base64Img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const imageBuffer = Buffer.from(matches[2], 'base64');
    const filename = `shade-${index}-${Date.now()}.png`;
    const imagePath = `uploads/${filename}`;
    fs.writeFileSync(imagePath, imageBuffer);
    req.shadeImage.push(imagePath);
  });

  try {

    const shadeImages = req.body.imgUrls || [];

    const fullShadeUrls = req.shadeImage.map(shadeImagePath => imgFullPath(shadeImagePath));
    
    const imageURLs = Object.values(shadeImages).map((item, index) => ({
      color: {
        name: item.color.name,
        clrCode: item.color.clrCode
      },
      shade: fullShadeUrls[index]
    }));    

    const result = await productServices.createProductService({
      ...req.body,
      imageURLs: imageURLs,
      img: imgFullPath(req?.file?.path)
    });
    res.status(200).json({
      success: true,
      status: "success",
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};


// add all product
module.exports.addAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.addAllProductService(req.body);
    res.json({
      message: 'Products added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.getAllProductsService();
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get all products by type
module.exports.getProductsByType = async (req, res, next) => {
  try {
    const result = await productServices.getProductTypeService(req);
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// get offer product controller
module.exports.getOfferTimerProducts = async (req, res, next) => {
  try {
    const result = await productServices.getOfferTimerProductService(req.query.type);
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get Popular Product By Type
module.exports.getPopularProductByType = async (req, res, next) => {
  console.log("150",req.params.type)
  try {
    const result = await productServices.getPopularProductServiceByType(req.params.type);
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get top rated Products
module.exports.getTopRatedProducts = async (req, res, next) => {
  try {
    const result = await productServices.getTopRatedProductService();
    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// getSingleProduct
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productServices.getProductService(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// get Related Product
exports.getRelatedProducts = async (req, res, next) => {
  try {
    const products = await productServices.getRelatedProductService(req.params.id)
    res.status(200).json({
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

// update product
exports.updateProduct = async (req, res, next) => {
  // console.log()
  try {
    const product = await productServices.updateProductService(req.params.id, req.body)
    res.send({ data: product, message: "Product updated successfully!" });
  } catch (error) {
    next(error)
  }
};

// update product
exports.reviewProducts = async (req, res, next) => {
  try {
    const products = await productServices.getReviewsProducts()
    res.status(200).json({
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
};

// update product
exports.stockOutProducts = async (req, res, next) => {
  try {
    const products = await productServices.getStockOutProducts();
    res.status(200).json({
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
};

// update product
exports.deleteProduct = async (req, res, next) => {
  console.log("201 id",req.params.id)
  try {
    await productServices.deleteProduct(req.params.id);
    res.status(200).json({
      message: 'Product delete successfully'
    })
  } catch (error) {
    next(error)
  }
};

