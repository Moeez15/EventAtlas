import express from 'express'
import { getAllEvents, getEventById, getEventsByLocation } from '../controllers/events.js'

const router = express.Router()

router.get('/events', getAllEvents)
router.get('/events/:id', getEventById)
router.get('/locations/:location_id/events', getEventsByLocation)

export default router
