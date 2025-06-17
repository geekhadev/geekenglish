<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FriendRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('lastFriendRequestBySender', 'lastFriendRequestByReceiver')->get()->except(Auth::user()->id);

        return Inertia::render('apps/users/index', [
            'users' => $users,
        ]);
    }

    public function sendFriendRequest(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'No puedes enviarte una solicitud a ti mismo'], 400);
        }

        $existingRequest = FriendRequest::where(function ($query) use ($request, $user) {
            $query->where('sender_id', $request->user()->id)
                ->where('receiver_id', $user->id);
        })->orWhere(function ($query) use ($request, $user) {
            $query->where('sender_id', $user->id)
                ->where('receiver_id', $request->user()->id);
        })->first();

        if ($existingRequest) {
            return response()->json(['message' => 'Ya existe una solicitud de amistad entre estos usuarios'], 400);
        }

        FriendRequest::create([
            'sender_id' => $request->user()->id,
            'receiver_id' => $user->id,
            'status' => 'pending'
        ]);

        sleep(1);
    }

    public function acceptFriendRequest(Request $request, FriendRequest $requestFriend)
    {
        $requestFriend->update(['status' => 'accepted']);

        sleep(1);
    }

    public function rejectFriendRequest(Request $request, FriendRequest $requestFriend)
    {
        $requestFriend->update(['status' => 'rejected']);

        sleep(1);
    }

    public function removeFriendRequest(Request $request, FriendRequest $requestFriend)
    {
        $requestFriend->delete();

        sleep(1);
    }
}
