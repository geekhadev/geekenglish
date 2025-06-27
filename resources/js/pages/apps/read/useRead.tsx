import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface ReadResponse {
    text: string;
}

export const useRead = (api_requests: { request_count: number }) => {
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

    return {
        read,
        isLoading,
        feedback,
        requests,
        transcribing,
        recording,
        handleStartReading,
        handleStopRecording,
    };
};
