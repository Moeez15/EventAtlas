import pool from '../config/database.js'

export const getAllEvents = async (_req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT *, (date::date - CURRENT_DATE) AS remaining FROM events ORDER BY date ASC'
        )
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query(
            'SELECT *, (date::date - CURRENT_DATE) AS remaining FROM events WHERE id = $1',
            [id]
        )
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventsByLocation = async (req, res) => {
    try {
        const { location_id } = req.params
        const { rows } = await pool.query(
            'SELECT *, (date::date - CURRENT_DATE) AS remaining FROM events WHERE location_id = $1 ORDER BY date ASC',
            [location_id]
        )
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
