import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export interface TranslationItem {
    value: string | number;
    translation: string;
    level?: number;
    points?: number;
}

interface TranslationGameProps {
    title: string;
    description?: string;
    items: TranslationItem[];
    getRandomItem: () => TranslationItem;
    inputPlaceholder: string;
    timeLimit?: number; // in seconds
    gameType: string; // 'number' or 'alphabet'
}

export default function TranslationGame({
    title,
    description,
    getRandomItem,
    inputPlaceholder,
    timeLimit = 10, // default value if not provided
    gameType,
}: TranslationGameProps) {
    const [currentItem, setCurrentItem] = useState<TranslationItem | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('Es correcto');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(true);
    const [hasAnswered, setHasAnswered] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(100);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const animationFrameRef = useRef<number>(0);
    const lastUpdateTimeRef = useRef<number>(0);

    const page = usePage<SharedData>();
    const { points } = page.props;

    const points_activity = points?.points_by_level.find((point_by_level) => point_by_level.activity === gameType);
    const maxStreak = points_activity?.max_streak ?? 0;
    const currentLevel = points_activity?.level ?? 0;

    const TIME_LIMIT = timeLimit;
    const TIMER_INTERVAL = 1000; // Cambiado a 1 segundo

    const successMessages = [
        '¡Excelente trabajo! 🎉',
        '¡Perfecto! Eres un genio 🌟',
        '¡Increíble! Sigues así 💪',
        '¡Lo has logrado! ¡Espectacular! 🎯',
        '¡Muy bien! ¡Eres un maestro! 👑',
        '¡Fantástico! ¡Sigue así! 🚀',
        '¡Impresionante! ¡Eres brillante! ✨',
        '¡Lo has hecho perfectamente! 🏆',
        '¡Increíble precisión! 🎯',
        '¡Eres un campeón! 🏅',
        '¡Perfecto! ¡Eres un prodigio! 🌟',
        '¡Excelente! ¡Sigues mejorando! 📈',
        '¡Asombroso! ¡Eres un maestro! 🎓',
        '¡Brillante! ¡Sigue así! 💫',
        '¡Perfecto! ¡Eres increíble! 🎉',
        '¡Excelente! ¡Eres un fenómeno! 🌠',
        '¡Fantástico! ¡Eres un genio! 🧠',
        '¡Increíble! ¡Eres un maestro! 🎯',
        '¡Perfecto! ¡Eres brillante! ✨',
        '¡Excelente! ¡Eres un campeón! 🏆',
    ];

    const failureMessages = [
        '¡No te rindas! La próxima vez será mejor 💪',
        '¡Sigue intentando! El aprendizaje es un proceso 🌱',
        '¡No te preocupes! Cada error es una oportunidad de aprender 📚',
        '¡Sigue adelante! La práctica hace al maestro 🎯',
        '¡No te desanimes! Cada intento te hace más fuerte 💫',
        '¡Sigue practicando! La constancia es la clave 🔑',
        '¡No te rindas! El éxito está a la vuelta de la esquina 🎯',
        '¡Sigue intentando! Cada error te acerca al éxito 🌟',
        '¡No te desanimes! El aprendizaje es un viaje 🚀',
        '¡Sigue adelante! La perseverancia es la clave 💪',
        '¡No te rindas! Cada intento cuenta 📈',
        '¡Sigue practicando! La mejora es constante 🎓',
        '¡No te desanimes! El progreso es gradual 🌱',
        '¡Sigue intentando! La práctica hace la perfección 🎯',
        '¡No te rindas! Cada error es una lección 📚',
        '¡Sigue adelante! El éxito está en el camino 🚀',
        '¡No te desanimes! La constancia es la clave 💫',
        '¡Sigue practicando! Cada intento te hace mejor 🌟',
        '¡No te rindas! El aprendizaje es continuo 📈',
        '¡Sigue intentando! La mejora es constante 🎓',
    ];

    const getRandomMessage = (isSuccess: boolean) => {
        const messages = isSuccess ? successMessages : failureMessages;
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const generateNewItem = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const newItem = getRandomItem();
        setCurrentItem(newItem);
        setUserAnswer('');
        setFeedback('');
        setIsCorrect(null);
        setHasAnswered(false);
        setTimeLeft(100);
        setIsTimerRunning(true);

        setTimeout(() => {
            inputRef.current?.focus();
            setIsTransitioning(false);
        }, 100);
    };

    // Efecto para generar el primer ítem
    useEffect(() => {
        generateNewItem();
    }, []);

    useEffect(() => {
        if (isTimerRunning && timeLeft > 0 && !hasAnswered && !isTransitioning) {
            const updateTimer = (timestamp: number) => {
                if (!lastUpdateTimeRef.current) {
                    lastUpdateTimeRef.current = timestamp;
                }

                const elapsed = timestamp - lastUpdateTimeRef.current;

                if (elapsed >= TIMER_INTERVAL) {
                    setTimeLeft((prev) => {
                        const newTime = prev - 100 / TIME_LIMIT;
                        if (newTime <= 0) {
                            setIsTimerRunning(false);
                            handleTimeUp();
                            return 0;
                        }
                        return newTime;
                    });
                    lastUpdateTimeRef.current = timestamp;
                }

                if (isTimerRunning && timeLeft > 0 && !hasAnswered && !isTransitioning) {
                    animationFrameRef.current = requestAnimationFrame(updateTimer);
                }
            };

            animationFrameRef.current = requestAnimationFrame(updateTimer);
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isTimerRunning, timeLeft, hasAnswered, TIME_LIMIT, isTransitioning]);

    const sendScoreToServer = async (status: 'success' | 'failure') => {
        try {
            await axios.post(route('points.store'), {
                type: 'game',
                activity: gameType,
                status: status,
                value: currentItem?.value.toString() ?? '',
                points: currentItem?.points ?? 0,
                level: currentItem?.level ?? 0,
            });
        } catch (error) {
            console.error('Error sending score:', error);
        }
    };

    const handleTimeUp = () => {
        if (!currentItem || hasAnswered || isTransitioning) return;

        setIsCorrect(false);
        setFeedback(`${getRandomMessage(false)} La respuesta correcta es: ${currentItem.translation}`);
        setHasAnswered(true);
        setIsTimerRunning(false);
        setScore((prev) => ({ ...prev, total: prev.total + 1 }));
        sendScoreToServer('failure');
    };

    const checkAnswer = () => {
        if (!currentItem || isTransitioning) return;

        if (hasAnswered) {
            generateNewItem();
            return;
        }

        const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentItem.translation.toLowerCase();
        setIsCorrect(isAnswerCorrect);
        setFeedback(isAnswerCorrect ? getRandomMessage(true) : `${getRandomMessage(false)} La respuesta correcta es: ${currentItem.translation}`);
        setHasAnswered(true);
        setIsTimerRunning(false);
        setScore((prev) => ({
            correct: isAnswerCorrect ? prev.correct + 1 : prev.correct,
            total: prev.total + 1,
        }));
        sendScoreToServer(isAnswerCorrect ? 'success' : 'failure');
    };

    // Efecto para manejar la transición después de responder
    useEffect(() => {
        let transitionTimer: NodeJS.Timeout;

        if (hasAnswered && !isTransitioning) {
            transitionTimer = setTimeout(() => {
                generateNewItem();
            }, 3000);
        }

        return () => {
            if (transitionTimer) {
                clearTimeout(transitionTimer);
            }
        };
    }, [hasAnswered, isTransitioning]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    if (!currentItem) return null;

    return (
        <div className="flex flex-col items-center w-full " style={{ minHeight: '90dvh', overflow: 'hidden' }}>

            <div className="flex w-full items-center justify-between">
                <div className="flex w-full flex-col justify-between text-balance">
                    <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
                    <p className="text-lg text-muted-foreground hidden md:block">{description}</p>
                </div>

                <div className="flex flex-col md:flex-row w-full items-end justify-end md:gap-2 text-balance text-sm md:text-lg">
                    {maxStreak > 0 && <p className="text-muted-foreground">Your record is: {maxStreak}</p>}
                    <div className="flex justify-between rounded-full bg-lime-500 p-1 md:p-2 px-3 md:px-4 font-bold text-balance text-white">
                        <p>Score: {score.correct}/{score.total} - Level: {currentLevel}</p>
                    </div>
                </div>
            </div>

            <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
                <div className="flex flex-col items-center justify-center md:justify-center md:border-r text-primary md:px-12 gap-4 mt-6 md:mt-0">
                    <h2 className="text-md text-2xl text-muted-foreground">Write the translation</h2>
                    <p className="text-balance text-8xl md:text-8xl">{currentItem.value}</p>
                </div>

                <div className="flex h-full w-full flex-col items-end justify-between gap-4">
                    <div className={`w-full md:max-w-2xl text-center text-2xl md:text-4xl text-balance md:px-12 h-full flex items-center justify-center ${isCorrect ? 'text-lime-500' : 'text-orange-500'}`}>
                        {feedback}
                    </div>

                    <div className="flex w-full items-center gap-12">
                        <div className="flex w-full items-center justify-center gap-4">
                            <div className="flex w-full flex-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={inputPlaceholder}
                                    className="min-h-18 w-full border-1 p-2 text-center text-xl md:text-2xl"
                                    disabled={hasAnswered}
                                />
                            </div>
                            <div className="flex w-36 md:w-48 flex-col justify-end text-balance">
                                <button
                                    onClick={checkAnswer}
                                    className="min-h-[67px] min-w-24 md:min-w-48 cursor-pointer border-1 px-2 md:px-6 py-2 text-lg md:text-xl font-bold hover:border-lime-500"
                                    disabled={!hasAnswered && !userAnswer.trim()}
                                >
                                    {hasAnswered ? 'Next' : 'Check'}
                                </button>
                                {!feedback && (
                                    <div className="flex w-full flex-col justify-end gap-2 text-balance">
                                        <div className="h-1 w-full rounded-full bg-gray-200">
                                            <div
                                                className={`h-full rounded-full transition-all duration-100 ${
                                                    timeLeft > 30 ? 'bg-lime-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${timeLeft}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
