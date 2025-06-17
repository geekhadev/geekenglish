<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPointsHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PointsController extends Controller
{
    public $activities = [
        [
            'type' => 'game',
            'name' => 'number',
            'levels' => [
                1 => 10,
                2 => 10,
                3 => 80,
                4 => -1,
            ],
        ],
        [
            'type' => 'game',
            'name' => 'alphabet',
            'levels' => [
                1 => -1,
            ],
        ],
        [
            'type' => 'game',
            'name' => 'verb',
            'levels' => [
                1 => -1,
            ],
        ],
    ];

    public function index()
    {
        $user = User::with('pointsHistory')->first();
        $pointsStats = null;

        if ($user) {
            // Get total points
            $totalPoints = $user->pointsHistory()->sum('points');

            // Get count of points by level for each activity
            $pointsByLevel = DB::table('user_points_history')
                ->selectRaw('activity, level, SUM(points) as total_points')
                ->groupBy('activity', 'level')
                ->get();

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

            foreach ($pointsByLevel as $pointByLevel) {
                foreach ($maxStreakByActivity as $maxStreak) {
                    if ($maxStreak->activity === $pointByLevel->activity) {
                        $pointByLevel->max_streak = $maxStreak->max_streak;
                    }
                }
            }

            $pointsStats = [
                'total_points' => $totalPoints,
                'points_by_level' => $pointsByLevel,
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
            'points' => 'required|integer',
            'level' => 'required|integer',
        ]);

        // Check if user has already succeeded with this value for this activity
        $alreadySucceeded = UserPointsHistory::where([
            'user_id' => $request->user()->id,
            'type' => $validated['type'],
            'activity' => $validated['activity'],
            'value' => $validated['value'],
            'level' => $validated['level'],
            'status' => 'success',
        ])->exists();

        // Only count points if it's a success and hasn't been done before
        $counted = !$alreadySucceeded;
        $points = ($validated['status'] === 'success' && $counted) ? $validated['points'] : 0;

        $request->user()->pointsHistory()->create([
            'type' => $validated['type'],
            'activity' => $validated['activity'],
            'level' => $validated['level'],
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
