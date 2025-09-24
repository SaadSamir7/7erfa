const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  // listting to event
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Try to load environment variables from different sources
console.log("Loading environment variables...");
console.log("Current working directory:", process.cwd());
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("RAILWAY_ENVIRONMENT:", process.env.RAILWAY_ENVIRONMENT);

// Try to load production config first (for Railway deployment)
dotenv.config({ path: "./config.production.env" });
// Then try local development config (won't override existing vars)
dotenv.config({ path: "./config.env" });

console.log("Environment variables loaded");
console.log("DATABASE defined:", !!process.env.DATABASE);
console.log("DATABASE_PASSWORD defined:", !!process.env.DATABASE_PASSWORD);
const app = require("./app");

// console.log(process.env);

// database connection
let DB;

if (process.env.DATABASE_URL) {
  // Railway managed database
  DB = process.env.DATABASE_URL;
} else if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
  // MongoDB Atlas
  DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
} else {
  console.error(
    "Neither DATABASE_URL nor DATABASE/DATABASE_PASSWORD environment variables are defined"
  );
  console.error("Please set up your database connection in Railway dashboard");
  process.exit(1);
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connetion successful!");
  });

// server

const portnumber = process.env.PORT || 3000;
console.log("Starting server...");
console.log("PORT from environment:", process.env.PORT);
console.log("Using port:", portnumber);

const server = app.listen(portnumber, "0.0.0.0", () => {
  console.log(`Server is running on port ${portnumber}`);
  console.log(`Server is listening on all interfaces (0.0.0.0:${portnumber})`);
});

process.on("unhandledRejection", (err) => {
  // listting to event
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
