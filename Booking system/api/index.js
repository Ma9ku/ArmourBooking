import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

// Routes
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

// configs
dotenv.config()

// const objects
const app = express()

const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
})

// middlewares'
app.use(cookieParser())
app.use(express.json());
 
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", usersRoute)
app.use("/api/v1/hotels", hotelsRoute)
app.use("/api/v1/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Error raised"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
})


app.listen(8000, () => {
    connectDB();
    console.log("Server on localhost:8000")
})
