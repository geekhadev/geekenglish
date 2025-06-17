import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const page = usePage<SharedData>();
    const { points } = page.props;
    const [pointsGlobal, setPointsGlobal] = useState(points ?? null);

    const getPointsGlobal = async () => {
        const response = await axios.get(route('points.index'));
        setPointsGlobal(response.data);
    };

    useEffect(() => {
        getPointsGlobal();

        const interval = setInterval(() => {
            getPointsGlobal();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-2">
                {pointsGlobal && (
                    <div className="flex items-center gap-2 rounded-full bg-lime-500 px-4 py-2">
                        <Trophy className="h-4 w-4 text-white" />
                        <p className="text-sm font-bold text-white">{pointsGlobal.totalPoints} global points</p>
                    </div>
                )}
            </div>
        </header>
    );
}
