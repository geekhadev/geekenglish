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
            <Head title="Numbers" />
            <div className="md:h-full py-4 px-4">
                <TranslationGame
                    title="Numbers"
                    description="The important thing is not how well you do it, it's trying."
                    items={options}
                    getRandomItem={getRandomOption}
                    inputPlaceholder="Example: two"
                    timeLimit={15}
                    gameType="number"
                />
            </div>
        </AppLayout>
    );
}
