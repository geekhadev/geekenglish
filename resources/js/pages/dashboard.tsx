import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-6">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="/games/numbers">
                            <img src="/games/numbers.png" alt="Numbers" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="/games/alphabet">
                            <img src="/games/alphabet.png" alt="Alphabet" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/verbs.png" alt="Verbs" className="w-full h-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end pb-12 justify-center bg-gradient-to-b from-black/40 to-black/100">
                            <p className="text-white text-2xl font-bold">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/prepositions.png" alt="Prepositions" className="w-full h-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end pb-12 justify-center bg-gradient-to-b from-black/40 to-black/100">
                            <p className="text-white text-2xl font-bold">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/occupations.png" alt="Occupations" className="w-full h-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end pb-12 justify-center bg-gradient-to-b from-black/40 to-black/100">
                            <p className="text-white text-2xl font-bold">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/prepositions.png" alt="Prepositions" className="w-full h-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end pb-12 justify-center bg-gradient-to-b from-black/40 to-black/100">
                            <p className="text-white text-2xl font-bold">Coming soon</p>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
