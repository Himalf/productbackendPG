import { RowDataPacket } from "mysql2";
import db from "../config/db"; // Import the PostgreSQL connection
export interface IProduct extends RowDataPacket {
  productId: number;
  title: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  categoryName: string;
}

class PRODUCT {
  title: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;

  constructor(
    title: string,
    price: number,
    description: string,
    image: string,
    categoryId: number
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.categoryId = categoryId;
  }

  // Insert data (PostgreSQL uses $1, $2... syntax for parameters)
  createProduct() {
    const sql = `
      INSERT INTO products (title, price, description, image, categoryId) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    return db.query(sql, [
      this.title,
      this.price,
      this.description,
      this.image,
      this.categoryId,
    ]);
  }

  // Get all products
  static async getProducts(
    limit: number = 0,
    sort: string = "asc"
  ): Promise<IProduct[]> {
    try {
      const orderBy = sort === "desc" ? "DESC" : "ASC";
      const limitClause = limit > 0 ? `LIMIT $1` : "";

      const sql = `
        SELECT products.productId, products.title, products.price, products.description, products.image, categories.categoryName 
        FROM products 
        JOIN categories ON products.categoryId = categories.categoryId
        ORDER BY products.title ${orderBy}
        ${limitClause}
      `;
      const result = await db.query(sql, [limit]); // Pass limit as an argument
      return result.rows; // PostgreSQL returns rows as an array
    } catch (error) {
      throw new Error("Failed to fetch products.");
    }
  }

  // Get Product by ID
  static async getProductById(productId: number): Promise<IProduct | null> {
    try {
      const sql = "SELECT * FROM products WHERE productId = $1";
      const result = await db.query(sql, [productId]);
      return result.rows[0] || null; // Return the first row if exists
    } catch (error) {
      throw new Error("Failed to get product by ID.");
    }
  }

  // Update product data
  async updateProduct(productId: number) {
    try {
      const sql = `
        UPDATE products 
        SET title = $1, price = $2, description = $3, image = $4, categoryId = $5 
        WHERE productId = $6
      `;
      return db.query(sql, [
        this.title,
        this.price,
        this.description,
        this.image,
        this.categoryId,
        productId,
      ]);
    } catch (error) {
      throw new Error("Failed to update product.");
    }
  }

  // Delete the product
  static async deleteProduct(productId: number) {
    try {
      const sql = "DELETE FROM products WHERE productId = $1";
      return db.query(sql, [productId]);
    } catch (error) {
      throw new Error("Failed to delete product.");
    }
  }
}

export default PRODUCT;
