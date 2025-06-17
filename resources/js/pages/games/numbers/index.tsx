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
        title: 'The Numbers',
        href: '/games/numbers',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="The Numbers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TranslationGame
                    title="The Numbers"
                    description="The important thing is not how well you do it, it's trying."
                    items={options}
                    getRandomItem={getRandomOption}
                    inputPlaceholder="Write the number in English"
                    timeLimit={15}
                    gameType="number"
                />
            </div>
        </AppLayout>
    );
}
