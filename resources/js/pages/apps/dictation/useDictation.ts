import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface DictationResponse {
    text: string;
    audio: string;
}

export const useDictation = (api_requests: { request_count: number }) => {
    const [dictation, setDictation] = useState<DictationResponse | null>(null);
    const [userInput, setUserInput] = useState('');
    const [showText, setShowText] = useState(false);
    const [audioError, setAudioError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [requests, setRequests] = useState(api_requests?.request_count || 0);

    useEffect(() => {
        setIsLoading(true);
        setAudioError(null);

        fetch('/dictation')
            .then(response => response.json())
            .then(data => {
                if (!data.audio) {
                    throw new Error('No audio URL received from API');
                }
                setDictation(data);
                if (audioRef.current) {
                    audioRef.current.playbackRate = 0.75;
                }
            })
            .catch(error => {
                console.error('Error loading dictation:', error);
                setAudioError(`Failed to load dictation: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = 0.75;
        }
    }, [dictation]);

    const handleCheckAnswer = async () => {
        setLoadingFeedback(true);

        const response = await axios.post(route('dictation.check-answer'), {
            text: dictation?.text,
            answer: userInput,
        });

        setFeedback(response.data.feedback);
        setLoadingFeedback(false);

        if (requests < 2) {
            setRequests(requests + 1);
        }
    };

    const handleClear = () => {
        setUserInput('');
    };

    return {
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
    };
}
