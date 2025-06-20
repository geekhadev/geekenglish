import { type TranslationItem } from "@/components/games/TranslationGame";

export const options: TranslationItem[] = [
    { value: 'be', level: 1, points: 1, translation: 'ser' },
    { value: 'have', level: 1, points: 1, translation: 'tener' },
    { value: 'do', level: 1, points: 1, translation: 'hacer' },
    { value: 'say', level: 1, points: 1, translation: 'decir' },
    { value: 'think', level: 1, points: 1, translation: 'pensar' },
    { value: 'want', level: 1, points: 1, translation: 'querer' },
    { value: 'need', level: 1, points: 1, translation: 'necesitar' },
    { value: 'go', level: 1, points: 1, translation: 'ir' },
    { value: 'come', level: 1, points: 1, translation: 'venir' },
    { value: 'see', level: 1, points: 1, translation: 'ver' },
    { value: 'hear', level: 1, points: 1, translation: 'oír' },
    { value: 'smell', level: 1, points: 1, translation: 'oler' },
    { value: 'taste', level: 1, points: 1, translation: 'saber' },
    { value: 'touch', level: 1, points: 1, translation: 'tocar' },
    { value: 'live', level: 1, points: 1, translation: 'vivir' },
    { value: 'work', level: 1, points: 1, translation: 'trabajar' },
    { value: 'study', level: 1, points: 1, translation: 'estudiar' },
    { value: 'read', level: 1, points: 1, translation: 'leer' },
    { value: 'write', level: 1, points: 1, translation: 'escribir' },
    { value: 'speak', level: 1, points: 1, translation: 'hablar' },
    { value: 'listen', level: 1, points: 1, translation: 'escuchar' },
    { value: 'understand', level: 1, points: 1, translation: 'entender' },
    { value: 'know', level: 1, points: 1, translation: 'saber' },
    { value: 'find', level: 1, points: 1, translation: 'encontrar' },
    { value: 'make', level: 1, points: 1, translation: 'hacer' },
    { value: 'give', level: 1, points: 1, translation: 'dar' },
    { value: 'take', level: 1, points: 1, translation: 'tomar' },
    { value: 'put', level: 1, points: 1, translation: 'poner' },
]

export function getRandomOption(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
