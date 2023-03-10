import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotelController.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/", verifyAdmin, createHotel)
router.get("/find/:id", getHotel)
router.get("/", getHotels)
router.put("/:id", verifyAdmin, updateHotel)
router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router