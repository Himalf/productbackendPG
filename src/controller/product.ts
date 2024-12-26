import PRODUCT from "../model/product";
import { Request, Response } from "express";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const image = req.file?.filename || "";
    const { title, price, description, categoryId } = req.body;
    const newProduct = new PRODUCT(
      title,
      price,
      description,
      image,
      categoryId
    );
    const result = await newProduct.createProduct();
    res.status(201).json({
      result,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create product",
    });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = typeof req.query.sort === "string" ? req.query.sort : "asc";
    const products = await PRODUCT.getProducts(limit, sort);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await PRODUCT.getProductById(Number(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const updateProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const image = req.file?.filename || "";
    const { id } = req.params;
    const { title, price, description, categoryId } = req.body;
    const newProduct = new PRODUCT(
      title,
      price,
      description,
      image,
      categoryId
    );
    const result = await newProduct.updateProduct(Number(id));
    res.status(201).json({
      result,
      msg: "Data Updated successfully",
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const deleteProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteProducts = await PRODUCT.deleteProduct(Number(id));
    res.status(200).json({
      deleteProducts,
      msg: `The product with id: ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
