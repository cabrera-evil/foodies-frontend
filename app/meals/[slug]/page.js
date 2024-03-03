import styles from './page.module.css';
import { findBySlug } from '@/app/_lib/meals';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function MealDetailsPage({ params }) {
    const meal = await findBySlug(params.slug)

    if (!meal)
        return notFound();

    return (
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={styles.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={styles.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>
                            {meal.creator}
                        </a>
                    </p>
                    <p className={styles.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main className={styles.main}>
                <p
                    className={styles.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions.replace(/\n/g, '<br />'),
                    }}
                />
            </main >
        </>
    );
}
