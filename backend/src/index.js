
import dotenv from "dotenv"
import connectDb from "./db/index.js"
import app from "./app.js"

dotenv.config()
connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("server is running  at Port ", process.env.PORT);
        })
    }
    ).catch((err) => {
        console.log("Databse connection error ", err);
    })


