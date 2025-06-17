import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { truncate } from '@/lib/utils';
import { type User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, Clock, Loader2, UserPlus, UserX, X } from 'lucide-react';
import IndicatorUserStatus from './indicator-status-user';

export default function CardUser({ user }: { user: User }) {
    const req_rec = user.last_friend_request_by_receiver;
    const req_sen = user.last_friend_request_by_sender;
    const is_friend = user.last_friend_request_by_receiver?.status === 'accepted' || user.last_friend_request_by_sender?.status === 'accepted';
    const req_rec_is_rejected = user.last_friend_request_by_receiver?.status === 'rejected';
    const req_sen_is_rejected = user.last_friend_request_by_sender?.status === 'rejected';

    const { post, processing } = useForm({
        user_id: user.id,
    });

    const handleSendFriendRequest = () => {
        post(route('users.friend-request', user.id), {
            onSuccess: () => {
                console.log('Friend request sent successfully');
            },
        });
    };

    const handleAcceptFriendRequest = (request_id: number) => {
        post(route('users.friend-request.accept', request_id), {
            onSuccess: () => {
                console.log('Friend request accepted successfully');
            },
        });
    };

    const handleRejectFriendRequest = (request_id: number) => {
        post(route('users.friend-request.reject', request_id), {
            onSuccess: () => {
                console.log('Friend request rejected successfully');
            },
        });
    };

    const handleRemoveFriend = (request_id: number) => {
        post(route('users.friend-request.remove', request_id), {
            onSuccess: () => {
                console.log('Friend removed successfully');
            },
        });
    };

    return (
        <Card className="w-50 md:w-72">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative">
                    <Avatar className="size-14">
                        <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <IndicatorUserStatus status={true} />
                </div>
                <div className="flex flex-col gap-2">
                    <CardTitle>{truncate(user.name, 25)}</CardTitle>
                    <CardDescription>
                        <span>Points: {user.points || 0}</span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between gap-2">
                {!is_friend && req_rec?.status === 'pending' && (
                    <div className="flex w-full flex-col gap-2">
                        <p className="text-xs text-balance text-muted-foreground">
                            He wants to be your friend, if you accept him you can practice together.
                        </p>
                        <Button
                            size="sm"
                            className="w-full cursor-pointer"
                            disabled={processing}
                            variant="success"
                            onClick={() => req_rec && handleAcceptFriendRequest(req_rec.id)}
                        >
                            <Check className="h-4 w-4" />
                            Accept friend request
                        </Button>
                        <Button
                            size="sm"
                            className="w-full cursor-pointer"
                            disabled={processing}
                            variant="warning"
                            onClick={() => req_rec && handleRejectFriendRequest(req_rec.id)}
                        >
                            <X className="h-4 w-4" />
                            Reject friend request
                        </Button>
                    </div>
                )}
                {!is_friend && req_sen?.status === 'pending' && (
                    <Button size="sm" className="w-full cursor-pointer" disabled={true} variant="outline">
                        <Clock className="h-4 w-4" />
                        Solicitud enviada
                    </Button>
                )}

                {is_friend && (
                    <Button
                        size="sm"
                        className="w-full cursor-pointer"
                        disabled={processing}
                        variant="destructive"
                        onClick={() => (req_rec ? handleRemoveFriend(req_rec.id) : req_sen && handleRemoveFriend(req_sen.id))}
                    >
                        <UserX className="h-4 w-4" />
                        Remove friend
                    </Button>
                )}

                {!is_friend && !req_sen && !req_rec && (
                    <Button size="sm" className="w-full cursor-pointer" onClick={handleSendFriendRequest} disabled={processing} variant="outline">
                        {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                        {processing ? 'Sending...' : 'Add as friend'}
                    </Button>
                )}

                {(req_rec_is_rejected || req_sen_is_rejected) && (
                    <div className="flex w-full items-center justify-center gap-2 text-xs text-red-500">
                        <X className="h-4 w-4" />
                        <span className="text-balance">
                            {req_rec_is_rejected ? 'He dont want to be your friend' : 'I dont want to be your friend'}
                        </span>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
