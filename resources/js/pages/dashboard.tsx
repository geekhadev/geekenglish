import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const events = [
    {
        title: 'Sign up for the group chat about favorite colors',
        description: 'Lets talk as a group about the colors we like the most.',
        calendar: 'The event is on June 18 at 19:00 Chile',
        users: 12,
    },
    {
        title: 'The importance of drinking water',
        description: '@juancho will give a presentation on the importance of drinking water throughout the day and the effects of not doing so.',
        calendar: 'The event is on June 19 at 21:00 Colombia',
        users: 8,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="relative col-span-1 min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:col-span-1 md:min-h-min dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/apps/practice.png" alt="Practice" className="h-full w-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-black/40 to-black/100 pb-12">
                            <p className="text-2xl font-bold text-white">Coming soon</p>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-4 md:col-span-2">
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold">Community events</h4>
                            <p className="text-sm text-muted-foreground">Join events and chat with real people.</p>
                        </div>
                        {events.map((event) => (
                            <Card>
                                <CardHeader className="flex">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <CardTitle className="text-xl text-balance">{event.title}</CardTitle>
                                            <CardDescription className="text-base">{event.description}</CardDescription>
                                        </div>
                                        <Button variant="outline" className="cursor-pointer rounded-full">
                                            <Calendar className="h-4 w-4" />
                                            Join the event
                                        </Button>
                                    </div>
                                    <UsersInEvent userCount={event.users} />
                                </CardHeader>
                            </Card>
                        ))}
                        {/* <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div> */}
                    </div>
                </div>

                <div className="w-full">
                    <h4 className="text-2xl font-bold">Games</h4>
                    <p className="text-sm text-muted-foreground">Play games to learn English.</p>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-6">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="/games/numbers">
                            <img src="/games/numbers.png" alt="Numbers" className="h-full w-full object-cover" />
                        </Link>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="/games/alphabet">
                            <img src="/games/alphabet.png" alt="Alphabet" className="h-full w-full object-cover" />
                        </Link>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="/games/verbs">
                            <img src="/games/verbs.png" alt="Verbs" className="h-full w-full object-cover" />
                        </Link>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/prepositions.png" alt="Prepositions" className="h-full w-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-black/40 to-black/100 pb-12">
                            <p className="text-2xl font-bold text-white">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/occupations.png" alt="Occupations" className="h-full w-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-black/40 to-black/100 pb-12">
                            <p className="text-2xl font-bold text-white">Coming soon</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href="#">
                            <img src="/games/vocabulary.png" alt="Vocabulary" className="h-full w-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-black/40 to-black/100 pb-12">
                            <p className="text-2xl font-bold text-white">Coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function UsersInEvent({ userCount }: { userCount: number }) {
    let size = 40;
    let space = '-space-x-4';
    if (userCount < 30) {
        size = 80;
        space = '-space-x-8';
    } else if (userCount < 100) {
        size = 60;
        space = '-space-x-2';
    }

    return (
        <div className="flex flex-col gap-2">
            <h4 className="text-sm text-muted-foreground">{userCount} users are going to join</h4>
            <div className={`flex ${space} flex-wrap`}>
                {Array.from({ length: userCount }).map((_, index) => (
                    <img
                        className="rounded-full ring-3 ring-background"
                        src={`https://i.pravatar.cc/100/?val=${index}`}
                        width={size}
                        height={size}
                        alt={`User ${index}`}
                    />
                ))}
            </div>
        </div>
    );
}
