import dotenv from "dotenv";
dotenv.config();
import express from "express"
const app = express();
import cors from "cors"
import routes from "./routes/defualt.route.js";
const PORT = process.env.PORT || 5000; // port number
import isDataBaseConnected from "./database/db.js";  // database connection file
// database connection
isDataBaseConnected().then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB", error);
});
// routes
app.use(cors())
app.use(express.json())
app.use("/api/auth", routes);
// server listening
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
