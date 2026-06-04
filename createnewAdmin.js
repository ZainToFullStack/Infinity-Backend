import isDataBaseConnected from "./database/db.js";
import Admin from "./model/admin.model.js";
import dotenv from "dotenv"
dotenv.config()
const newAdmincreate = async () => {
    try {

        await isDataBaseConnected();

        const newAdmin = new Admin({
            name: "Muhammad",
            email: "admin@infinitycorps.com",
            password: "strongadmin"
        })
        await newAdmin.save()
        console.log("the user is successfully registerd and detials are: ", newAdmin);
        process.exit()
    } catch (error) {
        console.log("creating Admin face error", error.message);
        process.exit(1)

    }
};
newAdmincreate()