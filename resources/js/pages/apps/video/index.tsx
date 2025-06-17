import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { HelpCircle, Video } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apps',
        href: '/apps',
    },
    {
        title: 'Video',
        href: '/apps/video',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Video Comprehension - Coming Soon" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto max-w-3xl space-y-6 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-primary/10 p-4">
                            <Video className="h-12 w-12 text-primary" />
                        </div>
                    </div>

                    <h1 className="mb-4 font-handwriting text-3xl font-bold text-muted-foreground">Video Comprehension - Coming Soon</h1>

                    <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <p className="text-lg text-balance">
                            Próximamente implementaremos una herramienta interactiva para mejorar tu comprensión del inglés a través de videos y
                            preguntas.
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <Video className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Videos Interactivos</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Accede a una colección de videos en inglés con subtítulos y controles de reproducción para facilitar tu
                                    aprendizaje.
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Evaluación de Comprensión</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Responde preguntas sobre el contenido del video para evaluar tu comprensión y recibir retroalimentación inmediata.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
