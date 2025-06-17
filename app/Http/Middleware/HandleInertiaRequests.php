<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $pointsStats = null;
        if (isset($request->user()->id)) {
            $user = User::where('id', $request->user()->id)->with('pointsHistory')->first();

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
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ?? null,
            ],
            'points' => $pointsStats ?? 'null',
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
