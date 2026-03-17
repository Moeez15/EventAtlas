import dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env') })

import pool from './database.js'

const createTables = async () => {
    await pool.query(`
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(200) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zip VARCHAR(20) NOT NULL,
            image VARCHAR(500),
            description TEXT
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            location_id INTEGER REFERENCES locations(id),
            title VARCHAR(200) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image VARCHAR(500),
            description TEXT
        );
    `)
}

const seedData = async () => {
    await pool.query(`
        INSERT INTO locations (name, address, city, state, zip, image, description) VALUES
        ('Echo Lounge', '1776 N. Exposition Ave', 'Dallas', 'TX', '75207',
         'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
         'A beloved Dallas music venue featuring indie, rock, and alternative acts.'),
        ('House of Blues', '2200 N Lamar St', 'Dallas', 'TX', '75202',
         'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
         'World-famous music hall and restaurant serving up live entertainment nightly.'),
        ('Dos Equis Pavilion', '1818 First Ave', 'Dallas', 'TX', '75210',
         'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
         'Dallas premier outdoor amphitheater hosting major touring acts.'),
        ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219',
         'https://images.unsplash.com/photo-1540039155733-5bb30b4a2f91?w=800',
         'Dallas premier sports and entertainment arena seating over 20,000 fans.');
    `)

    await pool.query(`
        INSERT INTO events (location_id, title, date, time, image, description) VALUES
        (1, 'Night Owls Live', '2026-03-20', '20:00', 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800', 'Indie rock showcase featuring local Dallas bands.'),
        (1, 'Jazz Under the Stars', '2026-04-05', '19:30', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', 'An intimate jazz evening with the best local musicians.'),
        (1, 'Throwback Thursday', '2026-02-10', '21:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', 'Classic hits from the 80s and 90s. A night to remember!'),
        (1, 'Electronic Beats Festival', '2026-05-18', '22:00', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 'Dallas top DJs bring you the hottest electronic beats.');
    `)

    await pool.query(`
        INSERT INTO events (location_id, title, date, time, image, description) VALUES
        (2, 'Blues Brothers Night', '2026-03-25', '20:30', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', 'A tribute to the legendary Blues Brothers with full live band.'),
        (2, 'Gospel Brunch', '2026-04-12', '11:00', 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800', 'World-famous Gospel Brunch with Southern comfort food.'),
        (2, 'Rock Revival', '2026-02-28', '21:00', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800', 'Classic rock favorites performed by Dallas top tribute bands.'),
        (2, 'Latin Night', '2026-05-02', '21:00', 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800', 'Salsa, merengue, and reggaeton. Dance the night away!');
    `)

    await pool.query(`
        INSERT INTO events (location_id, title, date, time, image, description) VALUES
        (3, 'Summer Kickoff Concert', '2026-05-30', '18:00', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', 'Kick off the summer with Dallas biggest outdoor concert.'),
        (3, 'Country Roads Festival', '2026-04-20', '17:00', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', 'Two days of country music under the Texas sky.'),
        (3, 'Winter Wonderland Show', '2025-12-15', '19:00', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'Magical winter holiday spectacular with lights and music.'),
        (3, 'Hip Hop Showcase', '2026-06-14', '20:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', 'Top hip hop artists hit the stage for an unforgettable night.');
    `)

    await pool.query(`
        INSERT INTO events (location_id, title, date, time, image, description) VALUES
        (4, 'Taylor Swift: Eras Tour', '2026-04-01', '19:00', 'https://images.unsplash.com/photo-1540039155733-5bb30b4a2f91?w=800', 'The tour of a lifetime. An iconic night with Taylor Swift.'),
        (4, 'NBA Finals Watch Party', '2026-06-05', '20:00', 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800', 'Cheer on the Mavs at the biggest watch party in Dallas.'),
        (4, 'New Years Eve Bash', '2025-12-31', '22:00', 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800', 'Ring in the new year with live music and fireworks!'),
        (4, 'Beyonce Renaissance Tour', '2026-07-04', '19:30', 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800', 'An unforgettable night with Queen Bey herself!');
    `)
}

const reset = async () => {
    try {
        await createTables()
        await seedData()
        console.log('Database reset and seeded successfully!')
    } catch (error) {
        console.error('Error resetting database:', error)
    } finally {
        pool.end()
    }
}

reset()
