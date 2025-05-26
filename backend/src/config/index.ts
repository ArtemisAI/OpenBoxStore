 // Configuration loading (environment variables, feature flags)
import dotenv from 'dotenv';

// Load environment variables from .env file (usually in the root of the backend project)
// Ensure a .env file exists or variables are set in the environment
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const API_KEY = process.env.API_KEY;

// Example of a variable with a default value
export const NODE_ENV = process.env.NODE_ENV || 'development';