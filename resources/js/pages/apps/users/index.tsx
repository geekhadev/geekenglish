import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type User } from '@/types';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apps',
        href: '/apps',
    },
    {
        title: 'Study partners',
        href: '/apps/users',
    },
];

export default function Index({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Video Comprehension - Coming Soon" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col items-center min-h-full w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col justify-between w-full text-balance">
                            <h1 className="text-3xl font-bold">Study partners</h1>
                            <p className="text-lg text-muted-foreground">
                                Find your study partners and start learning together.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 w-full text-balance">
                            <div className="flex px-4 font-bold">
                                <p>Users available: {users.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                        {users.map((user) => (
                            <>
                            <CardUser key={user.id} user={user} />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function CardUser({ user }: { user: User }) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative">
                    <Avatar className="size-14">
                        <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <UserIndicatorOnline status={true} />
                </div>
                <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>Points:</span>
                        <span>{user.points || 0}</span>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex gap-2 justify-between">
                <Button size="sm" className="w-full cursor-pointer" variant="outline">Follow</Button>
                <Button size="sm" className="w-full cursor-pointer" variant="outline">Invite to practice</Button>
            </CardFooter>
        </Card>
    )
}

function UserIndicatorOnline({ status }: { status: boolean }) {
    return (
        <div className={`text-[8pt] absolute font-bold -bottom-1 -right-1 p-1 py-0 rounded-full ${status ? 'bg-lime-400 text-lime-900' : 'bg-gray-200 text-black'}`}>
            {status ? "Online" : ""}
        </div>
    )
}
