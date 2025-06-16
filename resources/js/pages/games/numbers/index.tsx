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
        title: 'The Numbers',
        href: '/games/numbers',
    },
];

const numberWords: { [key: number]: string } = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred'
};

const numberItems: TranslationItem[] = Object.entries(numberWords).map(([value, translation]) => ({
    value: parseInt(value),
    translation
}));

function getRandomNumber(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * numberItems.length);
    return numberItems[randomIndex];
}

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="The Numbers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TranslationGame
                    title="The Numbers"
                    description="The important thing is not how well you do it, it's trying."
                    items={numberItems}
                    getRandomItem={getRandomNumber}
                    inputPlaceholder="Write the number in English"
                    timeLimit={15}
                    gameType="number"
                />
            </div>
        </AppLayout>
    );
}
