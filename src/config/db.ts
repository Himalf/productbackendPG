import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

// Setup PostgreSQL connection
const client = new Client({
  host: process.env.DB_HOST || "localhost", // your PostgreSQL host
  user: process.env.DB_USER || "root", // your PostgreSQL username
  password: process.env.DB_PASS || "", // your PostgreSQL password
  database: process.env.DB_NAME || "ecommerce", // your PostgreSQL database
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // PostgreSQL default port
});

// Test database connection
const testConnection = async () => {
  try {
    await client.connect(); // connect to PostgreSQL
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if connection fails
  }
};

testConnection();

export default client;
