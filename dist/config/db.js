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
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
// Setup PostgreSQL connection
const client = new pg_1.Client({
    host: process.env.DB_HOST || "localhost", // your PostgreSQL host
    user: process.env.DB_USER || "root", // your PostgreSQL username
    password: process.env.DB_PASS || "", // your PostgreSQL password
    database: process.env.DB_NAME || "ecommerce", // your PostgreSQL database
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // PostgreSQL default port
});
// Test database connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect(); // connect to PostgreSQL
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit if connection fails
    }
});
testConnection();
exports.default = client;
