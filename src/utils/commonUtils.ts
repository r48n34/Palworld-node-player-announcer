import converter from 'number-to-words';

export function numberToFormatStr(num: number) {
    const engWord = converter.toWords(num).split(" ").join("")
    return engWord.charAt(0).toUpperCase() + engWord.slice(1);
}