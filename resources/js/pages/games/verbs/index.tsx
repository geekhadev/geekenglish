import TranslationGame, { type TranslationItem } from '@/components/games/TranslationGame';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Games',
        href: '/dashboard',
    },
    {
        title: 'The Verbs',
        href: '/games/verbs',
    },
];

const verbWords: { [key: string]: string } = {
    be: 'ser',
    have: 'tener',
    do: 'hacer',
    say: 'decir',
    think: 'pensar',
    want: 'querer',
    need: 'necesitar',
    go: 'ir',
    come: 'venir',
    see: 'ver',
    hear: 'oír',
    smell: 'oler',
    taste: 'saber',
    touch: 'tocar',
    live: 'vivir',
    work: 'trabajar',
    study: 'estudiar',
    read: 'leer',
    write: 'escribir',
    speak: 'hablar',
    listen: 'escuchar',
    understand: 'entender',
    know: 'saber',
    find: 'encontrar',
    make: 'hacer',
    give: 'dar',
    take: 'tomar',
    put: 'poner',
};

const verbItems: TranslationItem[] = Object.entries(verbWords).map(([value, translation]) => ({
    value: value,
    translation,
}));

function getRandomVerb(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * verbItems.length);
    return verbItems[randomIndex];
}

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verbs" />
            <div className="md:h-full py-4 px-4">
                <TranslationGame
                    title="Verbs"
                    description="The important thing is not how well you do it, it's trying."
                    items={verbItems}
                    getRandomItem={getRandomVerb}
                    inputPlaceholder="Example: Caminar"
                    timeLimit={15}
                    gameType="verb"
                />
            </div>
        </AppLayout>
    );
}
