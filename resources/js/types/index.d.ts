import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    points?: {
        total_points: number;
        points_by_level: Array<{
            activity: string;
            level: number;
            total_points: number;
            max_streak: number;
        }>;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    points?: number;
    last_friend_request_by_receiver?: FriendRequest;
    last_friend_request_by_sender?: FriendRequest;
    [key: string]: unknown; // This allows for additional properties...
}

export interface FriendRequest {
    id: number;
    sender_id: number;
    receiver_id: number;
    status: string;
    created_at: string;
    updated_at: string;
}
