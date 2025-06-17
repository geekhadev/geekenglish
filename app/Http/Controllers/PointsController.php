<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPointsHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PointsController extends Controller
{
    public function index()
    {
        $user = User::where('id', Auth::user()->id)->with('pointsHistory')->first();
        $pointsStats = null;

        if ($user) {
            // Get total points
            $totalPoints = $user->pointsHistory()->sum('points');

            // Get points by type
            $pointsByType = $user->pointsHistory()
                ->selectRaw('type, SUM(points) as total_points')
                ->groupBy('type')
                ->get();

            // Get points by activity
            $pointsByActivity = $user->pointsHistory()
                ->selectRaw('activity, SUM(points) as total_points')
                ->groupBy('activity')
                ->get();

            // Get max streak by activity
            $maxStreakByActivity = DB::table('user_points_history')
                ->selectRaw('activity, MAX(streak) as max_streak')
                ->fromSub(function ($query) use ($user) {
                    $query->selectRaw('
                        activity,
                        status,
                        created_at,
                        SUM(CASE WHEN status = \'success\' THEN 1 ELSE 0 END) OVER (
                            PARTITION BY activity, grp
                            ORDER BY created_at
                        ) as streak
                    ')
                        ->fromSub(function ($subquery) use ($user) {
                            $subquery->selectRaw('
                            *,
                            SUM(CASE WHEN status = \'success\' THEN 0 ELSE 1 END) OVER (
                                PARTITION BY activity
                                ORDER BY created_at
                            ) as grp
                        ')
                                ->from('user_points_history')
                                ->where('user_id', $user->id);
                        }, 'grouped');
                }, 'streaks')
                ->groupBy('activity')
                ->get();

            // Get recent activity
            $recentActivity = $user->pointsHistory()
                ->with('user')
                ->latest()
                ->take(10)
                ->get();

            $pointsStats = [
                'totalPoints' => $totalPoints,
                'pointsByType' => $pointsByType,
                'pointsByActivity' => $pointsByActivity,
                'maxStreakByActivity' => $maxStreakByActivity,
                'recentActivity' => $recentActivity,
            ];
        }

        return response()->json($pointsStats);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'activity' => 'required|string',
            'status' => 'required|string|in:success,failure',
            'value' => 'required|string',
        ]);

        // Get points value from point types table
        $pointType = \App\Models\PointType::where('type', $validated['type'])
            ->where('activity', $validated['activity'])
            ->first();

        if (! $pointType) {
            return response()->json(['error' => 'Point type not found'], 404);
        }

        // Check if user has already succeeded with this value for this activity
        $alreadySucceeded = UserPointsHistory::where([
            'user_id' => $request->user()->id,
            'type' => $validated['type'],
            'activity' => $validated['activity'],
            'value' => $validated['value'],
            'status' => 'success',
        ])->exists();

        // Only count points if it's a success and hasn't been done before
        $counted = !$alreadySucceeded;
        $points = ($validated['status'] === 'success' && $counted) ? $pointType->points_value : 0;

        $request->user()->pointsHistory()->create([
            'type' => $validated['type'],
            'activity' => $validated['activity'],
            'status' => $validated['status'],
            'value' => $validated['value'],
            'counted' => $counted,
            'points' => $points,
        ]);

        return response()->json([
            'message' => 'Points recorded successfully',
            'counted' => $counted,
            'points' => $points,
        ]);
    }
}
