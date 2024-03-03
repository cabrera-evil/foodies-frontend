import sql from 'better-sqlite3'

const db = sql('meals.db')

export async function findAll() {
    return await db.prepare('SELECT * FROM meals').all()
}

export async function findBySlug(slug) {
    return await db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}