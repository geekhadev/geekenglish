import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import TranslationGame, { type TranslationItem } from '@/components/games/TranslationGame';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/dashboard',
    },
    {
        title: 'The Alphabet',
        href: '/games/alphabet',
    },
];

const alphabetItems: TranslationItem[] = [
    { value: 'A', translation: 'ei' },
    { value: 'B', translation: 'bi' },
    { value: 'C', translation: 'si' },
    { value: 'D', translation: 'di' },
    { value: 'E', translation: 'i' },
    { value: 'F', translation: 'ef' },
    { value: 'G', translation: 'yi' },
    { value: 'H', translation: 'eich' },
    { value: 'I', translation: 'ai' },
    { value: 'J', translation: 'yei' },
    { value: 'K', translation: 'kei' },
    { value: 'L', translation: 'el' },
    { value: 'M', translation: 'em' },
    { value: 'N', translation: 'en' },
    { value: 'O', translation: 'ou' },
    { value: 'P', translation: 'pi' },
    { value: 'Q', translation: 'kiu' },
    { value: 'R', translation: 'ar' },
    { value: 'S', translation: 'es' },
    { value: 'T', translation: 'ti' },
    { value: 'U', translation: 'iu' },
    { value: 'V', translation: 'vi' },
    { value: 'W', translation: 'dabliu' },
    { value: 'X', translation: 'eks' },
    { value: 'Y', translation: 'guai' },
    { value: 'Z', translation: 'zi' }
];

function getRandomLetter(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * alphabetItems.length);
    return alphabetItems[randomIndex];
}

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="The Alphabet" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TranslationGame
                    title="The Alphabet"
                    description="Every time you make a mistake you reinforce your learning"
                    items={alphabetItems}
                    getRandomItem={getRandomLetter}
                    inputPlaceholder="Write the pronunciation"
                    timeLimit={10}
                    gameType="alphabet"
                />
            </div>
        </AppLayout>
    );
}
