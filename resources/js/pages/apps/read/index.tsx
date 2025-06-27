import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Loader2, MicIcon } from 'lucide-react';
import { useRead } from './useRead';

export default function Read({ api_requests }: { api_requests: { request_count: number } }) {
    const {
        read,
        isLoading,
        feedback,
        requests,
        transcribing,
        recording,
        handleStartReading,
        handleStopRecording
    } = useRead(api_requests);

    if (isLoading) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center min-h-screen gap-4">
                    <Loader2 className="animate-spin" />
                    <div className="text-xl">Loading read...</div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Read" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex min-h-full w-full flex-col items-center">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex w-full flex-col justify-between text-balance">
                            <h1 className="text-3xl font-bold">Read</h1>
                            <p className="text-lg text-muted-foreground">Read the text for exercise your reading skills.</p>
                        </div>

                        <div className="flex w-full items-center justify-end gap-2 text-balance">
                            <p className="text-lg text-muted-foreground">AI Attempts</p>
                            <div className="flex justify-between rounded-full bg-lime-500 p-2 px-4 font-bold text-balance text-white">
                                <p>{requests}/2</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid h-full w-full grid-cols-2 gap-4">
                        <div className="flex flex-col items-start justify-center border-r text-primary px-12 gap-4">
                            <h2 className="text-xl font-bold">Read the text</h2>
                            <p className="text-lg text-muted-foreground">
                                You can try to read the text as many times as you like.
                            </p>
                            {read?.text && (
                                <div className="flex flex-col gap-6 w-full text-gray-700 text-balance">
                                    {read.text}
                                </div>
                            )}
                        </div>

                        <div className="flex h-full w-full flex-col items-end justify-between gap-4">
                            <div className="w-full max-w-2xl text-center text-xl text-balance px-12 h-full flex items-center justify-center">
                                {requests > 2 ? 'Alcanzaste el límite de intentos para hoy. Intenta mañana.' : feedback}
                            </div>

                            <div className="flex w-full items-center gap-12">
                                <div className="flex flex-col w-full items-center justify-center gap-4">
                                    <button
                                        className={cn(
                                            'h-[200px] w-[200px] flex flex-col items-center justify-center gap-2 cursor-pointer border-1 px-6 py-2 text-xl font-bold hover:border-lime-500 hover:text-lime-500 rounded-full',
                                            recording && 'bg-lime-500 hover:bg-lime-600 text-lime-100 hover:text-lime-100',
                                            transcribing && 'opacity-50 cursor-not-allowed'
                                        )}
                                        onClick={recording ? handleStopRecording : handleStartReading}
                                        disabled={transcribing}
                                    >
                                        {transcribing ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Transcribing...
                                            </>
                                        ) : recording ? (
                                            <>
                                                <MicIcon className="w-6 h-6" />
                                                Stop reading
                                            </>
                                        ) : (
                                            <>
                                                <MicIcon className="w-6 h-6" />
                                                Start reading
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-6 bottom-6 w-[120px]"></div>
                </div>
            </div>
        </AppLayout>
    );
}
