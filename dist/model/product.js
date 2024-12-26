"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db")); // Import the PostgreSQL connection
class PRODUCT {
    constructor(title, price, description, image, categoryId) {
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
        return db_1.default.query(sql, [
            this.title,
            this.price,
            this.description,
            this.image,
            this.categoryId,
        ]);
    }
    // Get all products
    static getProducts() {
        return __awaiter(this, arguments, void 0, function* (limit = 0, sort = "asc") {
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
                const result = yield db_1.default.query(sql, [limit]); // Pass limit as an argument
                return result.rows; // PostgreSQL returns rows as an array
            }
            catch (error) {
                throw new Error("Failed to fetch products.");
            }
        });
    }
    // Get Product by ID
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM products WHERE productId = $1";
                const result = yield db_1.default.query(sql, [productId]);
                return result.rows[0] || null; // Return the first row if exists
            }
            catch (error) {
                throw new Error("Failed to get product by ID.");
            }
        });
    }
    // Update product data
    updateProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `
        UPDATE products 
        SET title = $1, price = $2, description = $3, image = $4, categoryId = $5 
        WHERE productId = $6
      `;
                return db_1.default.query(sql, [
                    this.title,
                    this.price,
                    this.description,
                    this.image,
                    this.categoryId,
                    productId,
                ]);
            }
            catch (error) {
                throw new Error("Failed to update product.");
            }
        });
    }
    // Delete the product
    static deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM products WHERE productId = $1";
                return db_1.default.query(sql, [productId]);
            }
            catch (error) {
                throw new Error("Failed to delete product.");
            }
        });
    }
}
exports.default = PRODUCT;
