import mongoose from "mongoose"; // exact package name is mongoose


const isDataBaseConnected = async () => {
    try {
        const dburl = process.env.DB_LINK; // for the save purpose we are using process.env.DB_LINK instead of hard coding the url
        await mongoose.connect(dburl);
        console.log("Connected to MongoDB from the database/db.js file");
    }
    catch (error) { // if the connection is not successful then the error will be logged in the console
        console.log("MONGO DB CONNECTION FAILED", error);
    }
}

export default isDataBaseConnected;