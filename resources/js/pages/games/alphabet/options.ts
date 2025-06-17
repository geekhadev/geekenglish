import { type TranslationItem } from "@/components/games/TranslationGame";

export const options: TranslationItem[] = [
    { value: 'A', level: 1, points: 1, translation: 'ei' },
    { value: 'B', level: 1, points: 1, translation: 'bi' },
    { value: 'C', level: 1, points: 1, translation: 'si' },
    { value: 'D', level: 1, points: 1, translation: 'di' },
    { value: 'E', level: 1, points: 1, translation: 'i' },
    { value: 'F', level: 1, points: 1, translation: 'ef' },
    { value: 'G', level: 1, points: 1, translation: 'yi' },
    { value: 'H', level: 1, points: 1, translation: 'eich' },
    { value: 'I', level: 1, points: 1, translation: 'ai' },
    { value: 'J', level: 1, points: 1, translation: 'yei' },
    { value: 'K', level: 1, points: 1, translation: 'kei' },
    { value: 'L', level: 1, points: 1, translation: 'el' },
    { value: 'M', level: 1, points: 1, translation: 'em' },
    { value: 'N', level: 1, points: 1, translation: 'en' },
    { value: 'O', level: 1, points: 1, translation: 'ou' },
    { value: 'P', level: 1, points: 1, translation: 'pi' },
    { value: 'Q', level: 1, points: 1, translation: 'kiu' },
    { value: 'R', level: 1, points: 1, translation: 'ar' },
    { value: 'S', level: 1, points: 1, translation: 'es' },
    { value: 'T', level: 1, points: 1, translation: 'ti' },
    { value: 'U', level: 1, points: 1, translation: 'iu' },
    { value: 'V', level: 1, points: 1, translation: 'vi' },
    { value: 'W', level: 1, points: 1, translation: 'dabliu' },
    { value: 'X', level: 1, points: 1, translation: 'eks' },
    { value: 'Y', level: 1, points: 1, translation: 'guai' },
    { value: 'Z', level: 1, points: 1, translation: 'zi' },
];

export function getRandomOption(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
