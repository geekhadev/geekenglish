import { type TranslationItem } from "@/components/games/TranslationGame";

export const options: TranslationItem[] = [
    { value: '0', level: 1, points: 1, translation: 'zero' },
    { value: '1', level: 1, points: 1, translation: 'one' },
    { value: '2', level: 1, points: 1, translation: 'two' },
    { value: '3', level: 1, points: 1, translation: 'three' },
    { value: '4', level: 1, points: 1, translation: 'four' },
    { value: '5', level: 1, points: 1, translation: 'five' },
    { value: '6', level: 1, points: 1, translation: 'six' },
    { value: '7', level: 1, points: 1, translation: 'seven' },
    { value: '8', level: 1, points: 1, translation: 'eight' },
    { value: '9', level: 1, points: 1, translation: 'nine' },
    { value: '10', level: 1, points: 1, translation: 'ten' },
    { value: '11', level: 1, points: 1, translation: 'eleven' },
    { value: '12', level: 1, points: 1, translation: 'twelve' },
    { value: '13', level: 1, points: 1, translation: 'thirteen' },
    { value: '14', level: 1, points: 1, translation: 'fourteen' },
    { value: '15', level: 1, points: 1, translation: 'fifteen' },
    { value: '16', level: 1, points: 1, translation: 'sixteen' },
    { value: '17', level: 1, points: 1, translation: 'seventeen' },
    { value: '18', level: 1, points: 1, translation: 'eighteen' },
    { value: '19', level: 1, points: 1, translation: 'nineteen' },
    { value: '20', level: 1, points: 1, translation: 'twenty' },
    { value: '30', level: 1, points: 1, translation: 'thirty' },
    { value: '40', level: 1, points: 1, translation: 'forty' },
    { value: '50', level: 1, points: 1, translation: 'fifty' },
    { value: '60', level: 1, points: 1, translation: 'sixty' },
    { value: '70', level: 1, points: 1, translation: 'seventy' },
    { value: '80', level: 1, points: 1, translation: 'eighty' },
    { value: '90', level: 1, points: 1, translation: 'ninety' },
    { value: '100', level: 1, points: 1, translation: 'hundred' },
];

export function getRandomOption(): TranslationItem {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
