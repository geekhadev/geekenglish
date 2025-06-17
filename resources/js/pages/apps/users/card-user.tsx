
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
import { truncate } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Clock, Loader2, UserPlus } from 'lucide-react';
import IndicatorUserStatus from './indicator-status-user';

export default function CardUser({ user }: { user: User }) {

    const {post, processing} = useForm({
        user_id: user.id,
    })

    const handleSendFriendRequest = () => {
        post(route('users.friend-request', user.id), {
            onSuccess: () => {
                console.log('Friend request sent successfully');
            },
        });
    }

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
                <div>
                    <CardTitle>{truncate(user.name, 25)}</CardTitle>
                    <CardDescription>
                        <span>Points:</span>
                        <span>{user.points || 0}</span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="flex gap-2 justify-between">
                {user.requestFriendSendByMe === 'pending' ? (
                    <Button size="sm" className="w-full cursor-pointer" disabled={true} variant="outline">
                        <Clock className="w-4 h-4" />
                        Waiting for response
                    </Button>
                ) : (
                    <Button size="sm" className="w-full cursor-pointer" onClick={handleSendFriendRequest} disabled={processing} variant="outline">
                        {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                        {processing ? "Sending..." : "Add as friend"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
