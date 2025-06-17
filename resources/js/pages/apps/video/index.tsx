import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Video, HelpCircle } from 'lucide-react';

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
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto justify-center items-center">
                <div className="max-w-3xl mx-auto space-y-6 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Video className="h-12 w-12 text-primary" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 text-muted-foreground font-handwriting">Video Comprehension - Coming Soon</h1>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                        <p className="text-lg text-balance">
                            Próximamente implementaremos una herramienta interactiva para mejorar tu comprensión del inglés a través de videos y preguntas.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2 justify-center">
                                    <Video className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Videos Interactivos</h3>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Accede a una colección de videos en inglés con subtítulos y controles de reproducción para facilitar tu aprendizaje.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2 justify-center">
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
