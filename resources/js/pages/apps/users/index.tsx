import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';
import CardUser from './card-user';

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
    const requestFriendReceived = {
        pending: users.filter((user) => user.last_friend_request_by_receiver?.status === 'pending'),
        accepted: users.filter((user) => user.last_friend_request_by_receiver?.status === 'accepted'),
        rejected: users.filter((user) => user.last_friend_request_by_receiver?.status === 'rejected'),
    };
    const requestFriendSend = {
        pending: users.filter((user) => user.last_friend_request_by_sender?.status === 'pending'),
        accepted: users.filter((user) => user.last_friend_request_by_sender?.status === 'accepted'),
        rejected: users.filter((user) => user.last_friend_request_by_sender?.status === 'rejected'),
    };

    const friends = users.filter(
        (user) => user.last_friend_request_by_receiver?.status === 'accepted' || user.last_friend_request_by_sender?.status === 'accepted',
    );
    const otherUsers = users.filter((user) => !user.last_friend_request_by_receiver && !user.last_friend_request_by_sender);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Video Comprehension - Coming Soon" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex min-h-full w-full flex-col">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex w-full flex-col justify-between text-balance">
                            <h1 className="text-3xl font-bold">Study partners</h1>
                            <p className="text-lg text-muted-foreground">Find your study partners and start learning together.</p>
                        </div>

                        <div className="flex w-full items-center justify-end gap-2 text-balance">
                            <div className="flex px-4 font-bold">
                                <p>Users available: {users.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold">Friends</h2>
                            <p className="text-sm text-muted-foreground">Users that are your friends.</p>
                        </div>
                        {friends.length > 0 || requestFriendReceived.pending.length > 0 ? (
                            <div className="flex w-full flex-wrap gap-4">
                                {friends.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                                {requestFriendReceived.pending.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex w-full flex-wrap gap-4">
                                <p className="text-sm text-orange-500">Ops! You don't have any friends yet. But you can start adding them now.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold">Pending</h2>
                            <p className="text-sm text-muted-foreground">Users that have sent you a friend request.</p>
                        </div>
                        {requestFriendSend.pending.length > 0 ||
                        requestFriendSend.rejected.length > 0 ||
                        otherUsers.length > 0 ||
                        requestFriendReceived.rejected.length > 0 ||
                        requestFriendSend.rejected.length > 0 ? (
                            <div className="flex w-full flex-wrap gap-4">
                                {requestFriendSend.pending.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                                {requestFriendSend.rejected.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                                {otherUsers.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                                {requestFriendReceived.rejected.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                                {requestFriendSend.rejected.map((user) => (
                                    <CardUser key={user.id} user={user} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex w-full flex-wrap gap-4">
                                <p className="text-sm text-muted-foreground">No pending friend requests.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
