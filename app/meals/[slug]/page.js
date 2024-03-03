import styles from './page.module.css';
import { findBySlug } from '@/app/_lib/meals';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function MealDetailsPage({ params }) {
    const meal = await findBySlug(params.slug);

    if (!meal)
        return notFound();

    return (
        <MealDetailsContent meal={meal} />
    );
}

function MealDetailsContent({ meal }) {
    return (
        <Suspense fallback={<p className="loading">Fetching meal...</p>}>
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
        </Suspense>
    );
}
