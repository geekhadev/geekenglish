import { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Loader2, MicIcon } from 'lucide-react';
import axios from 'axios';

interface ReadResponse {
    text: string;
}

export default function Read({ api_requests }: { api_requests: { request_count: number } }) {
    const [read, setRead] = useState<ReadResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [requests, setRequests] = useState(api_requests?.request_count || 0);
    const [recording, setRecording] = useState(false);
    const [transcribing, setTranscribing] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        setIsLoading(true);

        fetch('/read')
            .then(response => response.json())
            .then(data => {
                setRead(data);
            })
            .catch(error => {
                console.error('Error loading read:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

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

    const handleStartReading = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                await handleTranscribe(audioBlob);
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setFeedback('Error accessing microphone. Please make sure you have granted microphone permissions.');
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    const handleTranscribe = async (audioBlob: Blob) => {
        setTranscribing(true);
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.mp3');
            formData.append('text', read?.text || '');

            const response = await axios.post(route('read.check-answer'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFeedback(response.data.feedback);

            if (requests < 2) {
                setRequests(requests + 1);
            }
        } catch (error) {
            console.error('Error transcribing audio:', error);
            setFeedback('Error al transcribir el audio. Por favor, intenta de nuevo.');
        } finally {
            setTranscribing(false);
        }
    };

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
