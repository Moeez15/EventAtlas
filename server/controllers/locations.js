import pool from '../config/database.js'

export const getAllLocations = async (_req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getLocationById = async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query('SELECT * FROM locations WHERE id = $1', [id])
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
