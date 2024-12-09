import dotenv from "dotenv";
dotenv.config({});
import app from "./app.js";
import DBConnection from "./db/db.js";

DBConnection()
  .then(
    app.listen(process.env.port || 8000, () => {
      console.log(`Listening to app at port: ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.log(`DB Connection failed: ${error.message}`);
  });
