import fs from 'fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export async function findAll() {
    return await db.prepare('SELECT * FROM meals').all()
}

export async function findBySlug(slug) {
    return await db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const buffer = await meal.image.arrayBuffer();
    stream.write(Buffer.from(buffer), (err) => {
        if (err) throw err;
    });
    meal.image = `/images/${fileName}`;
    db.prepare('INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)').run(meal.title, meal.summary, meal.instructions, meal.image, meal.creator, meal.creator_email, meal.slug);
}