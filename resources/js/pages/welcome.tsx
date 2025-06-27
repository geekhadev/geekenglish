import HeroSection from '@/components/web/hero-section-two';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Learn English">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <HeroSection />
        </>
    );
}
