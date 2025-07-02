// require('dotenv').config({path:'./.env'});


import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})
const app = express();

connectDB()
.then(()=>{
  app.listen(process.env.PORT||8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((err)=>{
  console.log("Mongo DB connection error!!!",err);
})










/*
import express from "express";

const app = express();

;(async () => { 
            try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME} }`, 
    );
    app.on("error", (err) => {
      console.error("Error connecting to MongoDB:", err);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})
*/
