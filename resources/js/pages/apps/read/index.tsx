import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, Mic } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Apps',
        href: '/apps',
    },
    {
        title: 'Readings',
        href: '/apps/read',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reading Practice - Coming Soon" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto justify-center items-center">

                    <div className="max-w-3xl mx-auto space-y-6 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-primary/10 p-4 rounded-full">
                                <BookOpen className="h-12 w-12 text-primary" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 text-muted-foreground font-handwriting">Reading Practice - Coming Soon</h1>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
                            <p className="text-lg text-balance">
                                Próximamente implementaremos una herramienta interactiva para practicar la lectura en inglés.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2 justify-center">
                                        <Mic className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold">Reconocimiento de Voz</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Utilizarás tu micrófono para leer textos en voz alta, y nuestro sistema detectará tu pronunciación.
                                    </p>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2 justify-center">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold">Corrección en Tiempo Real</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Una IA analizará tu lectura y te proporcionará retroalimentación sobre tu pronunciación y entonación.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </AppLayout>
    );
}
