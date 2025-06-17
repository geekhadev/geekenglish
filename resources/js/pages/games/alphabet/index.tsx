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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TranslationGame
                    title="The Alphabet"
                    description="Every time you make a mistake you reinforce your learning"
                    items={options}
                    getRandomItem={getRandomOption}
                    inputPlaceholder="Write the pronunciation"
                    timeLimit={10}
                    gameType="alphabet"
                />
            </div>
        </AppLayout>
    );
}
