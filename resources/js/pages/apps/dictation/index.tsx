import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EyeIcon, Loader2 } from 'lucide-react';
import { useDictation } from './useDictation';

export default function Dictation({ api_requests }: { api_requests: { request_count: number } }) {
    const {
        dictation,
        userInput,
        showText,
        setShowText,
        audioError,
        isLoading,
        feedback,
        loadingFeedback,
        requests,
        handleCheckAnswer,
        handleClear,
        setUserInput,
        audioRef,
    } = useDictation(api_requests);

    if (isLoading) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center min-h-screen gap-4">
                    <Loader2 className="animate-spin" />
                    <div className="text-xl">Loading dictation...</div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Dictation" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex min-h-full w-full flex-col items-center">

                    <div className="flex w-full items-center justify-between">
                        <div className="flex w-full flex-col justify-between text-balance">
                            <h1 className="text-xl md:text-3xl font-bold">Dictation</h1>
                            <p className="text-lg text-muted-foreground hidden md:block">Listen to the audio and write what you hear.</p>
                        </div>

                        <div className="flex flex-col md:flex-row w-full items-center justify-end md:gap-2 text-balance text-sm md:text-lg">
                            <p className="text-muted-foreground">AI Attempts</p>
                            <div className="flex justify-between rounded-full bg-lime-500 p-1 md:p-2 px-3 md:px-4 font-bold text-balance text-white">
                                <p>{requests}/2</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-start md:justify-center md:border-r text-primary md:px-12 gap-4 mt-6 md:mt-0">
                            <h2 className="text-md md:text-xl font-bold">Listen to the Audio and write what you hear</h2>
                            <p className="text-lg text-muted-foreground hidden md:block">
                                You can repeat the audio as many times as you like. You can also watch the original text, but it's best to try writing it before watching it.
                            </p>
                            {audioError && (
                                <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-4">
                                    {audioError}
                                </div>
                            )}
                            {dictation?.audio && (
                                <div className="flex flex-col gap-4 md:gap-6 w-full">
                                    <audio
                                        ref={audioRef}
                                        controls
                                        className="w-full"
                                    >
                                        <source src={dictation.audio} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>

                                    <div className="flex">
                                        <Button onClick={() => setShowText(!showText)} variant="outline">
                                            <EyeIcon className="w-4 h-4 mr-2" />
                                            {showText ? 'Hide Text' : 'Show Text'}
                                        </Button>
                                    </div>
                                    {dictation && (
                                        <div className={cn("rounded-lg transition-all duration-300", showText && dictation ? 'opacity-100 block md:block' : 'opacity-0 hidden md:block')}>
                                            <div className="text-balance">
                                                {dictation.text}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex h-full w-full flex-col items-end justify-between gap-4">
                            <div className="w-full md:max-w-2xl text-center text-base md:text-xl text-balance md:px-12 h-full flex items-center justify-center">
                                {requests > 2 ? 'Alcanzaste el límite de intentos para hoy. Intenta mañana.' : feedback}
                            </div>

                            <div className="flex w-full items-center gap-12">
                                <div className="flex flex-col w-full items-end justify-center gap-4">
                                    <div className="flex w-full flex-1">
                                        <textarea
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            className="w-full h-32 md:h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            placeholder="Type what you hear here..."
                                        />
                                    </div>
                                    {requests < 3 && (
                                        <div className="flex text-balance gap-4">
                                            <button
                                                onClick={handleClear}
                                                className="min-h-[57px] md:min-h-[67px] cursor-pointer px-6 py-2 text-md md:text-xl font-bold hover:text-orange-500"
                                            >
                                                Reset answer
                                            </button>
                                            <button
                                                onClick={loadingFeedback ? undefined : handleCheckAnswer}
                                                disabled={loadingFeedback}
                                                className="min-h-[57px] md:min-h-[67px] flex items-center justify-center gap-2 min-w-48 cursor-pointer border-1 px-6 py-2 text-md md:text-xl font-bold hover:border-lime-500 hover:text-lime-500"
                                            >
                                                {loadingFeedback ? <Loader2 className="animate-spin" /> : ''}
                                                {loadingFeedback ? 'Checking...' : 'Check my answer'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
