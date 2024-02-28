export default function MealDetailsPage({ params }) {
    return (
        <main>
            <h1 style={{ color: 'white', textAlign: 'center' }}>
                Meal Details {params.slug}
            </h1>
        </main>
    );
}
