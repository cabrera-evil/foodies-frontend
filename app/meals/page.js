import MelasGrid from '../_components/meals/meals-grid';
import styles from './page.module.css'
import Link from 'next/link'
import { findAll } from '../_lib/meals';
import { Suspense } from 'react';

async function Meals() {
    const meals = await findAll();
    return (
        <MelasGrid meals={meals} />
    )
}

export default function MealsPage() {
    return (
        <>
            <header className={styles.header}>
                <h1>
                    Delicious Meals, created{' '}
                    <span className={styles.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite meal and create it by yourself!
                </p>
                <p className={styles.cta}>
                    <Link href="/meals/share">
                        Share your favorite recipe!
                    </Link>
                </p>
            </header>
            <main className={styles.main}>
                <Suspense fallback={<p className="loading">Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}
