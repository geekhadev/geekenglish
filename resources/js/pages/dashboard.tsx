import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
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
        users: 122,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="gap-4 w-full grid grid-cols-1 md:grid-cols-3">
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border col-span-1 md:col-span-1">
                        <Link href="#">
                            <img src="/apps/practice.png" alt="Practice" className="w-full h-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end pb-12 justify-center bg-gradient-to-b from-black/40 to-black/100">
                            <p className="text-white text-2xl font-bold">Coming soon</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
                        <div className="flex flex-col">
                            <h4 className="text-2xl font-bold">Community events</h4>
                            <p className="text-sm text-muted-foreground">
                                Join events and chat with real people.
                            </p>
                        </div>
                        {events.map((event) => (
                            <Card>
                                <CardHeader className="flex">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <CardTitle className="text-xl text-balance">{event.title}</CardTitle>
                                            <CardDescription className="text-base">{event.description}</CardDescription>
                                        </div>
                                        <Button variant="outline" className="rounded-full cursor-pointer">
                                            <Calendar className="w-4 h-4" />
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
                    <p className="text-sm text-muted-foreground">
                        Play games to learn English.
                    </p>
                </div>
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
                            <img src="/games/vocabulary.png" alt="Vocabulary" className="w-full h-full object-cover" />
                        </Link>
                        <div className="absolute inset-0 flex items-end pb-12 justify-center bg-gradient-to-b from-black/40 to-black/100">
                            <p className="text-white text-2xl font-bold">Coming soon</p>
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
            <h4 className="text-sm text-muted-foreground">
                {userCount} users are going to join
            </h4>
            <div className={`flex ${space} flex-wrap`}>
                {Array.from({ length: userCount }).map((_, index) => (
                    <img
                        className="ring-background rounded-full ring-3"
                        src={`https://i.pravatar.cc/100/?val=${index}`}
                        width={size}
                        height={size}
                        alt={`User ${index}`}
                    />
                ))}
            </div>
        </div>
    )
  }
