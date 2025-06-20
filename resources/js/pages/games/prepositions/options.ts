import { type TranslationItem } from "@/components/games/TranslationGame";

export const options: TranslationItem[] = [
    { value: 'in', level: 1, points: 1, translation: 'en' },
    { value: 'on', level: 1, points: 1, translation: 'sobre,en' },
    { value: 'under', level: 1, points: 1, translation: 'debajo de' },
    { value: 'over', level: 1, points: 1, translation: 'encima de' },
    { value: 'between', level: 1, points: 1, translation: 'entre' },
    { value: 'next to', level: 1, points: 1, translation: 'al lado de' },
    { value: 'behind', level: 1, points: 1, translation: 'detrás de' },
    { value: 'in front of', level: 1, points: 1, translation: 'delante de' },
    { value: 'above', level: 1, points: 1, translation: 'por encima de' },
    { value: 'below', level: 1, points: 1, translation: 'por debajo de' },
    { value: 'inside', level: 1, points: 1, translation: 'dentro de' },
    { value: 'outside', level: 1, points: 1, translation: 'fuera de' },
    { value: 'into', level: 1, points: 1, translation: 'hacia dentro de' },
    { value: 'onto', level: 1, points: 1, translation: 'hacia encima de' },
    { value: 'from', level: 1, points: 1, translation: 'desde,de' },
    { value: 'to', level: 1, points: 1, translation: 'a,hacia' },
    { value: 'at', level: 1, points: 1, translation: 'en' },
    { value: 'by', level: 1, points: 1, translation: 'por,junto a' },
    { value: 'with', level: 1, points: 1, translation: 'con' },
    { value: 'without', level: 1, points: 1, translation: 'sin' },
    { value: 'about', level: 1, points: 1, translation: 'sobre,acerca de' },
    { value: 'for', level: 1, points: 1, translation: 'para,por' },
    { value: 'during', level: 1, points: 1, translation: 'durante' },
    { value: 'after', level: 1, points: 1, translation: 'después de' },
    { value: 'before', level: 1, points: 1, translation: 'antes de' },
    { value: 'until', level: 1, points: 1, translation: 'hasta' },
    { value: 'through', level: 1, points: 1, translation: 'a través de,a través' },
    { value: 'around', level: 1, points: 1, translation: 'alrededor de' },
]

export function getRandomOption(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
