import TranslationGame from '@/components/games/TranslationGame';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { options, getRandomOption } from './options';

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

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="The Alphabet" />
            <div className="h-svh py-4 px-4">
                <TranslationGame
                    title="Alphabet"
                    description="Every time you make a mistake you reinforce your learning"
                    items={options}
                    getRandomItem={getRandomOption}
                    inputPlaceholder="Example: pi"
                    timeLimit={1000}
                    gameType="alphabet"
                />
            </div>
        </AppLayout>
    );
}
